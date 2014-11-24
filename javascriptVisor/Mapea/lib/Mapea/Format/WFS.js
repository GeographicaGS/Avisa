/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/GML.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: OpenLayers.Format.WFS
 * Read/Write WFS.
 *
 * Inherits from:
 *  - <OpenLayers.Format.GML>
 */
Mapea.Format.WFS = OpenLayers.Class(OpenLayers.Format.WFS, {


	 /**
	 * Method: createFeatureXML
	 *
	 * Parameters:
	 * feature - {<OpenLayers.Feature.Vector>}
	 */
	createFeatureXML: function(feature) {
		var geometryNode = this.buildGeometryNode(feature.geometry);
		geometryNode.setAttribute(
				"srsName", feature.layer.projection.getCode()
			);
		var geomContainer = this.createElementNS(this.featureNS, "feature:" + this.geometryName);
		geomContainer.appendChild(geometryNode);
		var featureContainer = this.createElementNS(this.featureNS, "feature:" + this.featureName);
		featureContainer.appendChild(geomContainer);
		for(var attr in feature.attributes) {
			var attrText = this.createTextNode(feature.attributes[attr]);
			var nodename = attr;
			if (attr.search(":") != -1) {
				nodename = attr.split(":")[1];
			}
			var attrContainer = this.createElementNS(this.featureNS, "feature:" + nodename);
			attrContainer.appendChild(attrText);
			featureContainer.appendChild(attrContainer);
		}
		return featureContainer;
	},

	/**
	 * Method: update
	 * Takes a feature, and generates a WFS-T Transaction "Update"
	 *
	 * Parameters:
	 * feature - {<OpenLayers.Feature.Vector>}
	 */
	update: function(feature) {
		//Sometimes feature attributes have not a valid value.
		this.fillDefaultValues(feature);

		if (!feature.fid) 
		{
			OpenLayers.Console.userError(OpenLayers.i18n("noFID"));
		}

		var updateNode = this.createElementNS(this.wfsns, 'wfs:Update');
		updateNode.setAttribute("typeName", this.featurePrefix + ':' + this.featureName);
		updateNode.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);

		var propertyNode = this.createElementNS(this.wfsns, 'wfs:Property');
		var nameNode = this.createElementNS(this.wfsns, 'wfs:Name');

		var txtNode = this.createTextNode(this.geometryName);
		nameNode.appendChild(txtNode);
		propertyNode.appendChild(nameNode);

		var valueNode = this.createElementNS(this.wfsns, 'wfs:Value');

		var geometryNode = this.buildGeometryNode(feature.geometry);

		if(feature.layer)
		{
			geometryNode.setAttribute("srsName", feature.layer.projection.getCode());
		}

		valueNode.appendChild(geometryNode);

		propertyNode.appendChild(valueNode);
		updateNode.appendChild(propertyNode);

		 // add in attributes
		for(var attrName in feature.attributes)
		{
			propertyNode = this.createElementNS(this.wfsns, 'wfs:Property');
			nameNode = this.createElementNS(this.wfsns, 'wfs:Name');
			nameNode.appendChild(this.createTextNode(attrName));
			propertyNode.appendChild(nameNode);
			valueNode = this.createElementNS(this.wfsns, 'wfs:Value');
			valueNode.appendChild(this.createTextNode(feature.attributes[attrName]));
			propertyNode.appendChild(valueNode);
			updateNode.appendChild(propertyNode);
		}


		var filterNode = this.createElementNS(this.ogcns, 'ogc:Filter');
		var filterIdNode = this.createElementNS(this.ogcns, 'ogc:FeatureId');
		filterIdNode.setAttribute("fid", feature.fid);
		filterNode.appendChild(filterIdNode);
		updateNode.appendChild(filterNode);

		return updateNode;
	},

	fillDefaultValues : function(feature) {
		if (!feature.layer)
			return;
		
		for(var i=0,len=feature.layer.attributes.length; i<len; i++)
		{
			/*
			 * check if the attribute is null or empty. In
			 * that case, we set the attribute value to
			 * the default
			 */
			var attrName = feature.layer.attributes[i].name;
			if ( (!feature.attributes[attrName]) || (feature.attributes[attrName] == null)
				 || (feature.attributes[attrName].length == 0) )
			{
				var attrType = this.layer.typeOf(attrName);
				if (attrType == "dateTime")
				{
					feature.attributes[attrName] = '0000-00-00T00:00:00';
				}
				else if (attrType == "date")
				{
					feature.attributes[attrName] = '0000-00-00';
				}
				else if (attrType == "time")
				{
					feature.attributes[attrName] = '00:00:00';
				}
				else if (attrType == "duration")
				{
					feature.attributes[attrName] = 'P0Y';
				}
				else if (attrType == "int" || attrType == "float" || attrType == "double" || attrType == "decimal"
					|| attrType == "short" || attrType == "byte" || attrType == "integer" || attrType == "long"
					|| attrType == "negativeInteger" || attrType == "nonNegativeInteger" || attrType == "nonPositiveInteger"
					|| attrType == "positiveInteger" || attrType == "unsignedLong" || attrType == "unsignedInt"
					|| attrType == "unsignedShort" || attrType == "unsignedByte")
				{
					feature.attributes[attrName] = 0;
				}
				else
				{
					feature.attributes[attrName] = "-";
				}
			}
		}
	},
	
	/**
     * Method: write 
     * Takes a feature list, and generates a WFS-T Transaction 
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>)} 
     */
    write: function(features) {
    
        var transaction = this.createElementNS(this.wfsns, 'wfs:Transaction');
        transaction.setAttribute("version","1.0.0");
        transaction.setAttribute("service","WFS");
        for (var i=0; i < features.length; i++) {
        	var feature = features[i];
            if (feature.fid && (feature.fid == this.layer.featureSel)) {
                this.updateFeatureFields(feature);
                feature.state = OpenLayers.State.UPDATE;
            }
            switch (feature.state) {
                case OpenLayers.State.INSERT:
                    transaction.appendChild(this.insert(feature));
                    break;
                case OpenLayers.State.UPDATE:
                    transaction.appendChild(this.update(feature));
                    break;
                case OpenLayers.State.DELETE:
                    transaction.appendChild(this.remove(feature));
                    break;
            }
        }
        
        return OpenLayers.Format.XML.prototype.write.apply(this,[transaction]);
    },
    
    /**
     * Method: updateFeatureFields 
     * TODO
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} 
     */
    updateFeatureFields : function(feature) {
        var editControl = this.layer.map.getControlsByClass("Mapea.Control.EditAttributeFeature")[0];
        if (editControl != null) {
            for (var i=0,len=editControl.layer.attributes.length; i<len; ++i) {
                var fieldName = editControl.layer.attributes[i].name;
                
                try {
                    var fieldValue = document.getElementById("idInputText_"+fieldName).value;
                    feature.attributes[ fieldName ] = fieldValue;
                } catch(error) {
                    //no attribute in data, skip
                }
            }
        }
    },

	CLASS_NAME: "Mapea.Format.WFS"
});

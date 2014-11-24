/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires
 */

/**
 * Class: Mapea.Util.WMSGetCapabilities
 * This class has the utilities to use with a 
 * WMS getCapabilities response
 *
 * Inherits from:
 *  - <>
 */
Mapea.Util.WMSGetCapabilities = OpenLayers.Class({

	/**
	 * Property: capabilities
	 * A capabilities object with information about service WMS.
	 * {Object}
	 */
	capabilities : null,
	
	/**
	 * Property: definedSRS
	 * A SRS array with information about all defined
	 * SRS in the service WMS.
	 * {Array}
	 */
	definedSRS : [],

	/**
	 * Constructor: Mapea.Util.WMSGetCapabilities
	 */
	initialize : function(capabilities) {
		this.capabilities = capabilities;
	},

	/**
	 * Method: destroy
	 */
	destroy : function() {
		this.capabilities = null;
	},

	/**
	 * Method: getBoundingBoxEnvolved
	 *
	 * Get the bbox that envolves all the
	 * layers defined in the getCapabilities document.
	 */
	getBoundingBoxEnvolved : function(srs) {
		var maxExtent = -1;

		if (this.capabilities != null) {
			var extents = this.getExtensions(srs);
			
			if (extents.length > 0) {
				// getMaxExtentEnvolved is defined in templateMapeaOL.jsp
				maxExtent = getMaxExtentEnvolved(extents); 
			}
		}

		return maxExtent;
	},
	
	getExtensions : function(srs) {
		var extents = [];
		var layers = this.getDefinedLayers(this.capabilities.layers);

		for (var i=0, ilen=layers.length; i<ilen; i++) {
			var auxExtents = this.getBBoxLayer(layers[i], srs);
			if (auxExtents != null) {
				extents.push(auxExtents);
			}
		}

		return extents;
	},

	/**
	 * Method: getBBoxLayerName
	 *
	 * Get the bbox of a layer defined
	 * in the getCapabilities document.
	 */
	getBBoxLayerName : function(layerName, srs) {
		layerName = layerName.toUpperCase();

		var extent = -1;
		var layers = this.getDefinedLayers(this.capabilities.layers);

		for (var i=0, ilen=layers.length; (i<ilen) && (extent == -1); i++) {
			var layer = layers[i];
			if ( this.hasSameName(layer.name, layerName) ) {
				var extentLayer = this.getBBoxLayer(layer, srs);
				if ( extentLayer && (extentLayer != null) ) {
					extent = extentLayer;
				}
			}
		}

		return extent;
	},	

	/**
	 * Get the layers which are not abstract (they have a name)
	 */
	getDefinedLayers : function(layers, bbox, srsArray) {
		var definedLayers = [];
		
		for (var i=0,ilen=layers.length; i<ilen; i++) {
			var layer = layers[i];
			
			/*
			 * if the layer has not bbox and srs defined
			 * we get them from the parent
			 */
			if (!layer.bboxArray) {
				layer.bboxArray = bbox;
			}			
			if (!layer.srsArray) {
				layer.srsArray = srsArray;
			}
			
			// add the defined SRS
			this.addDefinedSrs(layer.srsArray);
			this.addDefinedSrs(layer.arraySRS);
				
			if (layer.name) {
				definedLayers.push(layer);
			}
			/*
			 * the layer may have defined layers
			 * so we get all of them
			 */
			if ( layer.layers && (layer.layers.length > 0) ) {
				var auxLayers = this.getDefinedLayers(layer.layers, layer.bboxArray, layer.srsArray);
				//add all layers
				definedLayers =	definedLayers.concat(auxLayers);
			}
		}
		return definedLayers;
	},

	getBBoxLayer : function(layer, srs) {
		
		var extent = null;
		
		if (srs && (srs != null))
		{
			var srsIsDefined = (this.definedSRS.indexOf(srs) != -1);
			
			// check if the layer has SRS array
			if (srsIsDefined && (layer.srsArray || layer.srs)) {
				
				var indexSrs = layer.srsArray.indexOf(srs);
				
				// layer has a BBOX for that SRS 
				if (indexSrs != -1) {
					extent = layer.bboxArray[indexSrs];
				
				// else we check if the layer has support for that SRS
				} else {
					var srcProj, layerExtent;
					
					if (layer.bbox && layer.srs) {
						srcProj = new OpenLayers.Projection(layer.srs);
						layerExtent = layer.bbox;
						
					} else if (layer.bboxArray && (layer.bboxArray.length > 0)) {
						srcProj = new OpenLayers.Projection(layer.srsArray[0]);
						layerExtent = layer.bboxArray[0];
						
					} else {
						// gets the SRS and BBOX from their children
						if ( layer.layers && (layer.layers.length > 0) ) {
							for (var i=0,len=layer.layers.length; (i<len) && (extent==null); i++) {
								var layerChild = layer.layers[i];
								extent = this.getBBoxLayer(layerChild, srs);
							}
						}
					}
					
					/*
					 * the layer supports that SRS so
					 * we transform the BBOX
					 */
					if (layerExtent && srcProj) {
						var dstProj = new OpenLayers.Projection(srs);
						extent = layerExtent.transform(srcProj, dstProj);
					}
				}
				
			} else {
				// the layer has not support for that SRS
				var htmlMessage = "La capa <b>" + layer.name + "</b> no está disponible en el srs <i>" + srs + "</i>.";
				htmlMessage += " Los srs en los que está disponible son:";
				htmlMessage += "<ul style=\"padding-left: 40px;\">";
				for (var i=0,len=this.definedSRS.length; i<len; i++) {
					htmlMessage += "<li>" + this.definedSRS[i] + "</li>";
				}
				htmlMessage += "</ul>";
				Mapea.Util.showErrorMessage(htmlMessage);	
			}
		}
			
		return extent;
	},

	isQueryable: function(layerName) {
		var queryable = false;

		var layers = this.getDefinedLayers(this.capabilities.layers);
		for (var i=0,ilen=layers.length; i<ilen; i++) 
		{
			var layer = layers[i];
			
			if ( this.hasSameName(layer.name, layerName) )
			{
				queryable = !(!layer.options.queryable);
			}
		}
		return queryable;
	},

	hasSameName: function(layerNameCapabilities, layerName) {
			layerName = layerName.toUpperCase();
			var capLayerNSName = layerNameCapabilities.toUpperCase();
			var capLayerName = null;
			
			// we remove the space name from the layer name
			var indexCapNS = capLayerNSName.indexOf(':');
	    	if (indexCapNS != -1) capLayerName = capLayerNSName.substring(indexCapNS+1, capLayerNSName.length);

			return ( (capLayerNSName == layerName) || (capLayerName == layerName) );
	},
	
	addDefinedSrs : function(srsArray) {
		if (srsArray && (srsArray.length > 0))
		{
			for (var i=0,len = srsArray.length; i<len; i++)
			{
				var srs = srsArray[i];
				if (this.definedSRS.indexOf(srs) == -1)
					this.definedSRS.push(srs);	
			}
		}
	},

	CLASS_NAME : "Mapea.Util.WMSGetCapabilities"
});

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/WMC.js
 * @requires Mapea/Map.js
 */

/**
 * Class: Mapea.Format.WMC
 * Read and write Web Map Context documents.
 *
 * Inherits from:
 *  - <OpenLayers.Format.WMC>
 */
Mapea.Format.WMC = OpenLayers.Class(OpenLayers.Format.WMC, {

    /**
    * APIMethod: read
    * Read WMC data from a string, and return an object with map properties
    *     and a list of layers.
    *
    * Parameters:
    * data - {String} or {DOMElement} data to read/parse.
    * options - {Object} The options object must contain a map property.  If
    *     the map property is a string, it must be the id of a dom element
    *     where the new map will be placed.  If the map property is an
    *     <OpenLayers.Map>, the layers from the context document will be added
    *     to the map.
    *
    * Returns:
    * {<OpenLayers.Map>} A map based on the context.
    */
    read: function(data, options) {
        if(typeof data == "string") {
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        var root = data.documentElement;
        var version = this.version;
        if(!version) {
            version = root.getAttribute("version");
            if(!version) {
                version = this.defaultVersion;
            }
        }

        if(!this.parser || this.parser.VERSION != version) {
            var format = Mapea.Format.WMC[
                "v" + version.replace(/\./g, "_")
            ];

            if(!format) {
                throw "Can't find a WMC parser for version " +
                      version;
            }
            this.parser = new format(this.options);

        }
        var context = this.parser.read(data, options);
        var map;

        if(options.map) {
            this.context = context;
            if(options.map instanceof OpenLayers.Map) {
                map = this.mergeContextToMap(context, options.map);
            } else {
                map = this.contextToMap(context, options.map);
            }
        } else {
            // not documented as part of the API, provided as a non-API option
            map = context;
        }
        return map;
    },

    /**
    * Method: contextToMap
    * Create a map given a context object.
    *
    * Parameters:
    * context - {Object} The context object.
    * id - {String | Element} The dom element or element id that will contain
    *     the map.
    *
    * Returns:
    * {<OpenLayers.Map>} A map based on the context object.
    */
    contextToMap: function(context, id) {
    	//MDRC DEFAULT_CONTROL=NONE controls: [] 20081024
    	//MDRC Mapea.Map 20081027
        //AGG maxResolution: auto  20101027
        //AGG units: context.units 20101027

        var unitsContext=context.units;
        if(typeof unitsContext=='undefined') {
          unitsContext='m';
        }

        if(typeof context.tileSize == 'undefined') {
        	context.tileSize = new OpenLayers.Size(256,256);
        }

      var map = new Mapea.Map(id, {
            maxExtent: context.maxExtent,
            projection: context.projection,
            maxResolution: 'auto',
            units: unitsContext,
            tileSize: context.tileSize,
            controls: []
        });
      
      map.addLayers(context.layers);
      map.setCenter(
            context.bounds.getCenterLonLat(),
            map.getZoomForExtent(context.bounds, true)
      );

      return map;
    },
    /**
     * APIMethod: write
     * Write a WMC document given a map.
     *
     * Parameters:
     * obj - {<Mapea.Map> | Object} A map or context object.
     * options - {Object} Optional configuration object.
     *
     * Returns:
     * {String} A WMC document string.
     */
    write: function(obj, options) {
        if(obj.CLASS_NAME == "Mapea.Map") {
            obj = this.toContext(obj);
        }
        var version = (options && options.version) ||
                      this.version || this.defaultVersion;
        if(!this.parser || this.parser.VERSION != version) {
            var format = Mapea.Format.WMC[
                "v" + version.replace(/\./g, "_")
            ];
            if(!format) {
                throw "Can't find a WMS capabilities parser for version " +
                      version;
            }
            this.parser = new format(this.options);
        }
        var wmc = this.parser.write(obj, options);
        return wmc;
    },
    
    toContext : function(obj) {
        var context = {};
        var layers = obj.layers;
        // modified to check the class name
        //if (obj.CLASS_NAME == "OpenLayers.Map") {
        if (obj.CLASS_NAME == "Mapea.Map") {
            var metadata = obj.metadata || {};
            context.size = obj.getSize();
            context.bounds = obj.getExtent();
            context.projection = obj.projection;
            context.title = obj.title;
            context.keywords = metadata.keywords;
            context["abstract"] = metadata["abstract"];
            context.logo = metadata.logo;
            context.descriptionURL = metadata.descriptionURL;
            context.contactInformation = metadata.contactInformation;
            context.maxExtent = obj.maxExtent;
        } else {
            // copy all obj properties except the "layers" property
            OpenLayers.Util.applyDefaults(context, obj);
            if (context.layers != undefined) {
                delete(context.layers);
            }
        }

        if (context.layersContext == undefined) {
            context.layersContext = [];
        }

        // let's convert layers into layersContext object (if any)
        if (layers != undefined && OpenLayers.Util.isArray(layers)) {
            for (var i=0, len=layers.length; i<len; i++) {
                var layer = layers[i];
                if (layer instanceof OpenLayers.Layer.WMS) {
                    context.layersContext.push(this.layerToContext(layer));
                }
            }
        }
        return context;
    },

    CLASS_NAME: "Mapea.Format.WMC"
});

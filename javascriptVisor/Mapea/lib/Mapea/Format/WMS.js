/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires
 */

/**
 * Class: Mapea.Format.WMS
 * Map's layers has a new attribute 'wmsparams':
 
 * - title
 * - name
 * - description
 * - srs  //TODO: more than one SRS + BBOX
 * - bbox
 * - latlonbbox
 * - isqueryable
 * - mapurl
 * - legendurl
 * - infourl
 * NOTA: las capas WMS cuyo wmsname es null, no son accesibles mediante un getMap (sólo agrupan otras capas)
 *
 * Inherits from:
 *  - <>
 */
 Mapea.Format.WMS = OpenLayers.Class({
	/**
     * Property: map
     * {Mapea.Map} Mapea.Map object which
     * add the read layers 
     */
	map : null,
	 
    /**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.  Default is "1.1.1".
     */
    defaultVersion: "1.1.1",
    
    /**
     * APIProperty: version
     * {String} Specify a version string if one is known.
     */
    version: null,

    /**
     * Property: layerOptions
     * {Object} Default options for layers created by the parser. These
     *     options are overridden by the options which are read from the 
     *     capabilities document.
     */
    layerOptions: null, 
    
    /**
     * URL to use when a layer is created
     */
    layerUrl: null,
    
    /**
     * Property: parser
     * {Object} Instance of the versioned parser. Cached for multiple read and
     *     write calls of the same version.
     */
    parser: null,

    /**
     * Constructor: Mapea.Format.WMS
     * Create a new parser for WMS docs.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        OpenLayers.Util.extend(this, options);
        this.options = options;
    },

    /**
     * Method: read
     * Read WMS data from a string, and return an object with information about
     * the getCapabilities request.
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     *  A capabilities object with information about service WMS.
     */
    read: function(data) {
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
            var format = Mapea.Format.WMS[
                "v" + version.replace(/\./g, "_")
            ];
            if(!format) {
                throw "Can't find a WMS parser for version " +
                      version;
            }
            this.parser = new format(this.options);
        }
        var capabilities = this.parser.read(data);
        this.putLayerInfoProperties(capabilities.layers[0], capabilities);
        return capabilities;
    },
    
    /**
     * Method: putLayerInfoProperties 
     * Adds the property "capabilities" to any layerInfo
     */
    putLayerInfoProperties: function(layerinfo, capabilities){
    	if (layerinfo.layers){
    		for (var i = 0; i < layerinfo.layers.length; i++){
    			this.putLayerInfoProperties(layerinfo.layers[i], capabilities);
    		}
    	}
    	layerinfo.capabilities = capabilities;
    },
    
    /**
     * Method: Creates an OpenLayer WMS Layer from a layer information. 
     * Use the default layer options (setLayerOptions())
     * 
     * Parameters:
     * 	layerInfo- object with a WMS Layer information. It must have the propertie capabilities
     *  Is part of a capabilities object  
     *     
     * Returns:
     *  an OpenLayers Layer or null if the layerInfo has no name
     *  
     */
    createLayer: function(layerInfo){
    	var ollayer = null;
    	
       	if (layerInfo.name){  
    		var  layerparams= {
    				LAYERS: layerInfo.name,
    				TRANSPARENT: 'TRUE'					
    			};
    		    	
            var bIsBaseLayer = false;         	        	
         	if (this.map.baseLayer == null){
         		bIsBaseLayer = true;
         	}
					
			var layeroptions = {
        		visibility: true,         
	            displayInLayerSwitcher: true,
	            isBaseLayer: bIsBaseLayer,                 
	            opacity: 1       
	        }; 					
		       			 
            //apply the default options for layer creation
    		if (this.layerOptions){
    			OpenLayers.Util.applyDefaults(layeroptions, this.layerOptions);
    		}
    		//gets the URL form the capabilities or
    		var aux = layerInfo.capabilities.mapurl.href;
    		if (this.layerUrl !=null){
    			aux = this.layerUrl;
    		}
    		ollayer = new Mapea.Layer.WMS( 				//GDTEL-CHANGE
    				layerInfo.name,
    				aux,
    				layerparams,
    				layeroptions
    		);    		
    		
    		if(layerInfo.styles.length>0){
    			ollayer.styles = layerInfo.styles;
    		}
    		
    		//set wmsparams
    		ollayer.wmsparams={};
    		ollayer.wmsparams.name = layerInfo.name;
    		ollayer.wmsparams.title = layerInfo.title;
    		ollayer.wmsparams.description = layerInfo.description;
    		ollayer.wmsparams.srs = layerInfo.srs;
    		ollayer.wmsparams.bbox = layerInfo.bbox;
    		ollayer.wmsparams.latlonbbox = layerInfo.latlonbbox;
    		ollayer.wmsparams.isqueryable = layerInfo.isqueryable;
    		ollayer.wmsparams.mapurl = layerInfo.capabilities.mapurl.href;
    		if (layerInfo.capabilities.infourl){
    			ollayer.wmsparams.infourl = layerInfo.capabilities.infourl.href;
    		}
    		if (layerInfo.capabilities.legendurl){
    			ollayer.wmsparams.legendurl = layerInfo.capabilities.legendurl.href;
    		}
    	}
    	return ollayer;
    },
    
    /**
     * Method: Creates a OpenLayers WMS Layer from a information from the capabilities
     * If is not used a default projection, the maxExtent is set
     */
    addLayerToMap: function(layerInfo,map){
    	var ollayer = this.createLayer(layerInfo);
    	//If is not used a default projection, the maxExtent is set
    	if ( ollayer && !ollayer.maxExtent && map.getProjection() != "EPSG:4326"){
    		ollayer.maxExtent = layerInfo.bbox;
    	}
    	if (ollayer){
    		map.addLayer(ollayer);
    	}    	
        var layers = layerInfo.layers;
        if (layers){
        	for (var i=0;i< layers.length; i++){
        		this.addLayerToMap(layers[i],map);
        	}
        }	
    },
    
    /**
     * Method: createMap
     * Create a map given a capabilities object. 
     *
     * Parameters:
     * capabilities - {Object} The capabilities object.
     * id - {String | Element} The dom element or element id that will contain
     *     the map.
     * mapoptions - {Object} Default options for the map. If the displayProjection is not set, the base layer
     * will be created with the default projection (EPSG:4326)
     * Returns:
     * {<OpenLayers.Map>} A map based on the capabilities object.
     * 
     */
    /*createMap: function(capabilities, id, mapoptions) {
    },*/
    
    /**
     * Method: mergeMap
     * Add layers from a capabilities object to a map.
     *
     * Parameters:
     * 
     * map - {<OpenLayers.Map>} The map.
     *
     * Returns:
     * {<OpenLayers.Map>} The same map with layers added.
     */
    mergeMap: function(capabilities, map) {
    	var layers = capabilities.layers[0].layers;
        for (var i = 0; i < layers.length; i++){
        	//layers[i].capabilities = capabilities;
        	this.addLayerToMap(layers[i],map);
        }   
        return map;
    },

    /**
     * Method: Sets the default options for a layer creation
     */
    setLayerOptions: function(options){
    	this.layerOptions = options;    	
    },
   
    /**
     * Method: Sets the service WMS to do the getMap 
     * Useful when the getMap must be request on Tilecache 
     */
    setLayerUrl: function(url){
    	this.layerUrl = url;
    },

    CLASS_NAME: "Mapea.Format.WMS" 

});

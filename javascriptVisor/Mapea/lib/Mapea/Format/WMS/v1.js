/**
 * Basado en código de OpenLayers. Véase su licencia a continuación.
 */

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * _@requires OpenLayers/Format/XML.js
 */

/**
 * Class: OpenLayers.Format.WMS.v1
 * Superclass for WMS version 1 parsers.
 *
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */
Mapea.Format.WMS.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
    
    
    
    /**
     * Property: defaultStyleName
     * {String} Style name used if layer has no style param.  Default is "".
     */
    defaultStyleName: "",
    
    /**
     * Property: defaultStyleTitle
     * {String} Default style title.  Default is "Default".
     */
    defaultStyleTitle: "Default",
    
    arrayS: [],
    
    /**
     * Constructor: OpenLayers.Format.WMS.v1
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.WMS> constructor instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
    },

    /**
     * Method: read
     * Read capabilities data from a string, and return a list of layers. 
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Array} List of named layers.
     */
    read: function(data) {
        if(typeof data == "string") {
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        var root = data.documentElement;
        this.rootPrefix = root.prefix;
        var capabilities = {
            version: root.getAttribute("version")
        };
        this.runChildNodes(capabilities, root);
        
        return capabilities;
    },
    
    /**
     * Method: runChildNodes
     */
    runChildNodes: function(obj, node) {
        var children = node.childNodes;
        var childNode, processor, prefix, local;
        for(var i=0, len=children.length; i<len; ++i) {
            childNode = children[i];
            if(childNode.nodeType == 1) {            	                
                local = childNode.nodeName.split(":").pop();
                processor = this["read_" + "wms" + "_" + local];
                if(processor) {
                    processor.apply(this, [obj, childNode]);
                }
            }
        }
    },
    
    /**
     * Method: read_wms_Layer
     * 
     */
    read_wms_Layer: function(obj, node) {    	
    	//var aux = {}; 
    	
    	  var aux = {
            params: {},
            options: {
                visibility: (node.getAttribute("hidden") != "1"),
                queryable: (node.getAttribute("queryable") == "1")
                
            },
            formats: [],
            styles: []
        };
        
    	this.runChildNodes(aux, node);
    	if (!obj.layers){
    		obj.layers = [];
    		//obj.styles = [];
    	}
    	obj.layers.push(aux);
    },
    
    
    read_wms_SRS: function(layer, node) {    	
    	
        if (!layer.arraySRS){
    		layer.arraySRS = [];
    		//obj.styles = [];
    	}
 
    	if(node.nodeName == "SRS"){
    	 
    	     layer.arraySRS.push(this.getChildValue(node));
    	 
    	
    	}
    	 
    },
    
    
     read_wms_CRS: function(layer, node) {    	
    	
        if (!layer.arraySRS){
    		layer.arraySRS = [];
    		//obj.styles = [];
    	}
 
    	if(node.nodeName == "CRS"){
    	   
    	   layer.arraySRS.push(this.getChildValue(node));
    	 }
    	
    	 
    },
    

    /**
     * Method: read_wms_Service
     * 
     */
    read_wms_Service: function(capabilities, node) {
        this.runChildNodes(capabilities, node);
    },
    
    /**
     * Method: read_wms_Capability
     * 
     */
    read_wms_Capability: function(capabilities, node) {
        this.runChildNodes(capabilities, node);
    },
    
    /**
     * Method: read_wms_Request
     * request
     * 
     */
    read_wms_Request: function(capabilities, node) {    	
        this.runChildNodes(capabilities, node);      
    },
    /**
     * Method: read_wms_GetMap
     * 
     */
    read_wms_GetMap: function(capabilities, node) {
    	capabilities.mapurl={};
        this.runChildNodes(capabilities.mapurl, node);
    },
    
    /**
     * Method: read_wms_GetFeatureInfo
     * 
     */
    read_wms_GetFeatureInfo: function(capabilities, node) {
    	capabilities.infourl={};
        this.runChildNodes(capabilities.infourl, node);
    },
    /**
     * Method: read_wms_GetLegendGraphic
     * 
     */
    read_wms_GetLegendGraphic: function(capabilities, node) {
    	capabilities.legendurl={};
    	this.runChildNodes(capabilities.legendurl, node);    	
    },
    
    /**
     * Method: read_wms_DCPType
     * cdptype
     */
    read_wms_DCPType: function(obj, node) {    	
        this.runChildNodes(obj, node);
    },
    /**
     * Method: read_wms_HTTP
     * http
     */
    read_wms_HTTP: function(obj, node) {    	
        this.runChildNodes(obj, node);
    },
    /**
     * Method: read_wms_Get
     * get
     */
    read_wms_Get: function(obj, node) {
        this.runChildNodes(obj, node);
    },
        
    
    /**
     * Method: read_wms_BoundingBox
     * srs,boundingbox
     */
    read_wms_BoundingBox: function(obj, node) {
       
       // Patch add for method getBoundingBoxFromCapabilities AGG 10/05/2011
       if (!obj.srsArray){
    		obj.srsArray = [];
    		//obj.styles = [];
    	}
    	if (!obj.bboxArray){
    	     obj.bboxArray = [];
    	}
    	
        // Patch check if attribute SRS isn't defined, try gets attribute CRS AGG 12/05/2011 
        if(!node.getAttribute("SRS")){
           var check = node.getAttribute("CRS");
           if(check.indexOf('EPSG') > -1){
           obj.srsArray.push(node.getAttribute("CRS"));
           obj.srs = node.getAttribute("CRS");
           
           var checkUnits = parseFloat (node.getAttribute("minx"));
           
           //If CRS is in lon/lat change coordinates order.
           if( checkUnits >= -180 && checkUnits <= 180){
                    obj.bbox = new OpenLayers.Bounds(
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("maxy")),
            parseFloat(node.getAttribute("maxx"))
        );
        
         obj.bboxArray.push(new OpenLayers.Bounds(
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("maxy")),
            parseFloat(node.getAttribute("maxx"))
        ));
           
            }
           else{
           obj.bbox = new OpenLayers.Bounds(
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("maxx")),
            parseFloat(node.getAttribute("maxy"))
        );
        
         obj.bboxArray.push(new OpenLayers.Bounds(
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("maxx")),
            parseFloat(node.getAttribute("maxy"))
        ));
         }
        }
        
        
        }
        
        else{
           obj.srsArray.push(node.getAttribute("SRS"));
           obj.srs = node.getAttribute("SRS");
         
        
        obj.bbox = new OpenLayers.Bounds(
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("maxx")),
            parseFloat(node.getAttribute("maxy"))
        );
        
        obj.bboxArray.push(new OpenLayers.Bounds(
            parseFloat(node.getAttribute("minx")),
            parseFloat(node.getAttribute("miny")),
            parseFloat(node.getAttribute("maxx")),
            parseFloat(node.getAttribute("maxy"))
        ));}
    },
    

    
    /**
     * Method: read_wms_OnlineResource
     */
    read_wms_OnlineResource: function(obj, node) {
        var href = this.getAttributeNS(
            node, "http://www.w3.org/1999/xlink", "href"
        );
        obj.href = href;
    },
    
    /**
     * Method: read_wms_Name
     */
    read_wms_Name: function(obj, node) {
        var name = this.getChildValue(node);        
        obj.name = name;	
    },

    /**
     * Method: read_wms_Title
     */
    read_wms_Title: function(obj, node) {
        var title = this.getChildValue(node);      
        obj.title = title;
    },
  
    /**
     * Method: read_wms_Abstract
     */
    read_wms_Abstract: function(obj, node) {
        var abst = this.getChildValue(node);
        obj.description = abst;        
    },
    
    /**
     * Method: read_wms_LatLonBoundingBox
     */
    read_wms_LatLonBoundingBox: function(layer, node) {
        layer.latlonbbox = new OpenLayers.Bounds(
                parseFloat(node.getAttribute("minx")),
                parseFloat(node.getAttribute("miny")),
                parseFloat(node.getAttribute("maxx")),
                parseFloat(node.getAttribute("maxy"))
            );
    },

    /**
     * Method: read_wms_Style
     */
    read_wms_Style: function(layerInfo, node) {
        var style = {};
        this.runChildNodes(style, node);
        if (!layerInfo.styles){
        	layerInfo.styles = [];
        }
        layerInfo.styles.push(style);
    },
    
    /**
     * Method: read_wms_LegendURL
     */
    read_wms_LegendURL: function(style, node) {
        var legend = {
            width: node.getAttribute('width'),
            height: node.getAttribute('height')
        };
        var links = node.getElementsByTagName("OnlineResource");
        if(links.length > 0) {
            this.read_wms_OnlineResource(legend, links[0]);
        }
        style.legend = legend;
    },
    
    CLASS_NAME: "Mapea.Format.WMS.v1" 

});

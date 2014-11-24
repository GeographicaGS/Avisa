/**
 * @requires OpenLayers/Format/WFSCapabilities.js
 */

/**
 * Class: OpenLayers.Format.WFSCapabilities.v1
 * Abstract class not to be instantiated directly.
 *
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */



Mapea.Format.WFSCapabilities.v1 = OpenLayers.Class(
   Mapea.Format.WFSCapabilities, {

    /**
     * Constructor: OpenLayers.Format.WFSCapabilities.v1_1
     * Create an instance of one of the subclasses.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
        this.options = options;
    },

    /**
     * APIMethod: read
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
        var capabilities = {};
        var root = data.documentElement;
        this.runChildNodes(capabilities, root);
        return capabilities;
    },

    /**
     * Method: runChildNodes
     */
    runChildNodes: function(obj, node) {
    	var tag = "ows:WGS84BoundingBox";
        var children = node.childNodes;
        var childNode, processor;
        for(var i=0; i<children.length; ++i) {
            childNode = children[i];
            if(childNode.nodeType == 1) {
                if (childNode.nodeName == tag){
                   processor = this["read_cap_" + "WGS84BoundingBox"];
                }
                else{
                	processor = this["read_cap_" + childNode.nodeName];
                }
                if(processor) {
                    processor.apply(this, [obj, childNode]);
                }
            }
        }
    },

    /**
     * Method: read_cap_FeatureTypeList
     */
    read_cap_FeatureTypeList: function(request, node) {
        var featureTypeList = {
            featureTypes: []
        };
        this.runChildNodes(featureTypeList, node);
        request.featureTypeList = featureTypeList;
    },

    /**
     * Method: read_cap_FeatureType
     */
    read_cap_FeatureType: function(featureTypeList, node, parentLayer) {
        var featureType = {};
        this.runChildNodes(featureType, node);
        featureTypeList.featureTypes.push(featureType);
    },

    /**
     * Method: read_cap_Name
     */
    read_cap_Name: function(obj, node) {
        var name = this.getChildValue(node);
        if(name) {
            obj.name = name;
        }
    },

    /**
     * Method: read_cap_Title
     */
    read_cap_Title: function(obj, node) {
        var title = this.getChildValue(node);
        if(title) {
            obj.title = title;
        }
    },

    /**
     * Method: read_cap_Abstract
     */
    read_cap_Abstract: function(obj, node) {
        var abst = this.getChildValue(node);
        if(abst) {
            obj["abstract"] = abst;
        }
    },

     // AGG Method for read layer extension from capabilities
     /**
     * Method: read_cap_WGS84BoundingBox
     */
    read_cap_WGS84BoundingBox: function(obj, node) {
    	var bounds = null;
        var lowerCorner = node.getElementsByTagName('ows:LowerCorner');
        var upperCorner = node.getElementsByTagName('ows:UpperCorner');

        if ($.browser.webkit) {
        	lowerCorner = node.getElementsByTagName('LowerCorner');
        	upperCorner = node.getElementsByTagName('UpperCorner');
    	}

        var low = null;
        var upp = null;
        if(getBrowserName() == 'msie'){
           low = lowerCorner[0].text;
           upp = upperCorner[0].text;
           var arrayCordLow = low.split(" ");
           var arrayCordUp = upp.split(" ");
        }

       else{
           low = lowerCorner[0].textContent;
           upp = upperCorner[0].textContent;

       }

        var arrayCordLow = low.split(" ");
        var arrayCordUp = upp.split(" ");

        bounds = new OpenLayers.Bounds(
            parseFloat(arrayCordLow[0]),
            parseFloat(arrayCordLow[1]),
            parseFloat(arrayCordUp[0]),
            parseFloat(arrayCordUp[1]));


        obj.bbox = bounds;

    },


    CLASS_NAME: "Mapea.Format.WFSCapabilities.v1"

});
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/WMC/v1_1_0.js
 * @requires Mapea/Layer/WMS.js
 */

/**
 * Class: Mapea.Format.WMC.v1_1_0
 * Read and write WMC version 1.1.0.
 *
 * Differences between 1.1.0 and 1.0.0:
 *     - 1.1.0 Layers have optional sld:MinScaleDenominator and
 *       sld:MaxScaleDenominator
 *
 * Inherits from:
 *  - <OpenLayers.Format.WMC.v1_1_0>
 */
Mapea.Format.WMC.v1_1_0 = OpenLayers.Class(
//    OpenLayers.Format.WMC.v1_1_0, {
	  Mapea.Format.WMC.v1, {

    /**
    * Constructor: Mapea.Format.WMC.v1_1_0
    * Instances of this class are not created directly.  Use the
    *     <Mapea.Format.WMC> constructor instead.
    *
    * Parameters:
    * options - {Object} An optional object whose properties will be set on
    *     this instance.
    */
    initialize: function(options) {
        OpenLayers.Format.WMC.v1_1_0.prototype.initialize.apply(
            this, [options]
        );
    },

    /**
     * Method: read_sld_MinScaleDenominator
     * Read a sld:MinScaleDenominator node.
     *
     * Parameters:
     * layerInfo - {Object} An object representing a layer.
     * node - {Element} An element node.
     */
    read_sld_MinScaleDenominator: function(layerInfo, node) {
        layerInfo.options.maxScale = this.getChildValue(node);
    },
    
    /**
     * Method: write_wmc_Layer
     * Create a Layer node given a layer object.  This method adds elements
     *     specific to version 1.1.0.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.WMS>} Layer object.
     *
     * Returns:
     * {Element} A WMC Layer element node.
     */
    write_wmc_Layer: function(layer) {
        var node = OpenLayers.Format.WMC.v1.prototype.write_wmc_Layer.apply(
            this, [layer]
        );
        
        // min/max scale denominator elements go before the 4th element in v1
        if(layer.options.resolutions || layer.options.scales ||
           layer.options.minResolution || layer.options.maxScale) {
            var minSD = this.createElementNS(
                this.namespaces.sld, "sld:MinScaleDenominator"
            );
            minSD.appendChild(this.createTextNode(layer.maxScale.toPrecision(10)));
            node.insertBefore(minSD, node.childNodes[3]);
        }
        
        if(layer.options.resolutions || layer.options.scales ||
           layer.options.maxResolution || layer.options.minScale) {
            var maxSD = this.createElementNS(
                this.namespaces.sld, "sld:MaxScaleDenominator"
            );
            maxSD.appendChild(this.createTextNode(layer.minScale.toPrecision(10)));
            node.insertBefore(maxSD, node.childNodes[4]);
        }
        
        return node;
        
    },
    
     /**
     * Method: read_wmc_Layer
     */
    read_wmc_Layer: function(context, node) {
        var layerInfo = {
            params: this.layerParams || {},
            options: {
                visibility: (node.getAttribute("hidden") != "1"),
                queryable: (node.getAttribute("queryable") == "1")

            },
            formats: [],
            styles: []
        };
        this.runChildNodes(layerInfo, node);
        // set properties common to multiple objects on layer options/params
        layerInfo.params.isWMC = 'ok';
        layerInfo.params.layers = layerInfo.name;
        layerInfo.options.maxExtent = layerInfo.maxExtent;
        // create the layer
        var layer = this.getLayerFromInfo(layerInfo);
        context.layers.push(layer);
    },

    /**
    * Method: getLayerFromInfo
    * Create a WMS layer from a layerInfo object.
    *
    * Parameters:
    * layerInfo - {Object} An object representing a WMS layer.
    *
    * Returns:
    * {<Mapea.Layer.WMS>} A WMS layer.
    */
    getLayerFromInfo: function(layerInfo) {
        var options = layerInfo.options;
        if (this.layerOptions) {
            OpenLayers.Util.applyDefaults(options, this.layerOptions);
        }
        var layer = new Mapea.Layer.WMS(
            layerInfo.title,
            layerInfo.href,
            layerInfo.params,
            options
        );
        return layer;
    },

   /**
    * Method: read_ol_units (Context)
    */  //AGG

    read_ol_units: function(obj, node) {
        obj.units = this.getChildValue(node);
    },

    /**
     * Method: read_ol_tileSize (Context)
     * <ol:tileSize xmlns:ol="http://openlayers.org/context" width="512" height="512"/>
     */
     read_ol_tileSize: function(context, node) {
         context.tileSize = new OpenLayers.Size(
             parseFloat(node.getAttribute("width")),
             parseFloat(node.getAttribute("height"))
         );
     },

    /**
    * Method: read_ol_groupDisplayLayerSwitcher
    */
    read_ol_groupDisplayLayerSwitcher: function(layerInfo, node) {

          layerInfo.options.groupDisplayLayerSwitcher =
            (this.getChildValue(node));
    },

  	/**
    * Method: read_ol_orderInsideGroupDisplayLayerSwitcher
    */
    read_ol_orderInsideGroupDisplayLayerSwitcher: function(layerInfo, node) {
          layerInfo.options.orderInsideGroupDisplayLayerSwitcher =
            new Number(this.getChildValue(node));
    },

    /**
     * Method: read_sld_MaxScaleDenominator
     * Read a sld:MaxScaleDenominator node.
     *
     * Parameters:
     * layerInfo - {Object} An object representing a layer.
     * node - {Element} An element node.
     */
    read_sld_MaxScaleDenominator: function(layerInfo, node) {

        layerInfo.options.minScale = this.getChildValue(node);
    },

    /**
    * Method: read_wmc_Style
    */
    read_wmc_Style: function(layerInfo, node) {

        var style = {};
        this.runChildNodes(style, node);
        if(node.getAttribute("current") == "1") {
            // three style types to consider
            // 1) linked SLD
            // 2) inline SLD
            // 3) named style
            // running child nodes always gets name, optionally gets href or body

            //MDRC_STYLE_LEGEND 06102008
            if (style.legend) {
            	layerInfo.params.layerLegend = style.legend;
            }
            ////////////////////////////////////////////////
            if(style.href) {
                layerInfo.params.sld = style.href;
            } else if(style.body) {
                layerInfo.params.sld_body = style.body;
            } else {
                layerInfo.params.styles = style.name;
            }
        }
        layerInfo.styles.push(style);
    },

    /**
    * Method: write_wmc_LayerList
    * Create a LayerList node given an context object.
    *
    * Parameters:
    * context - {Object} Context object.
    *
    * Returns:
    * {Element} A WMC LayerList element node.
    */
    write_wmc_LayerList: function(context) {
        var list = this.createElementDefaultNS("LayerList");

        var layer;
        for(var i=0, len=context.layers.length; i<len; ++i) {
            layer = context.layers[i];
            if(layer instanceof Mapea.Layer.WMS) {
                list.appendChild(this.write_wmc_Layer(layer));
            }
        }

        return list;
    },

    /**
    * Method: write_wmc_LayerExtension
    * Add OpenLayers specific layer parameters to an Extension element.
    *
    * Parameters:
    * layer - {<Mapea.Layer.WMS>} A WMS layer.
    *
    * Returns:
    * {Element} A WMC Extension element (for a layer).
    */
    write_wmc_LayerExtension: function(layer) {
        var node = this.createElementDefaultNS("Extension");

        var bounds = layer.maxExtent;
        var maxExtent = this.createElementNS(
            this.namespaces.ol, "ol:maxExtent"
        );
        this.setAttributes(maxExtent, {
            minx: bounds.left.toPrecision(10),
            miny: bounds.bottom.toPrecision(10),
            maxx: bounds.right.toPrecision(10),
            maxy: bounds.top.toPrecision(10)
        });
        node.appendChild(maxExtent);

        var param = layer.params["TRANSPARENT"];
        if(param) {
            var trans = this.createElementNS(
                this.namespaces.ol, "ol:transparent"
            );
            trans.appendChild(this.createTextNode(param));
            node.appendChild(trans);
        }

        var properties = [
            "numZoomLevels", "units", "isBaseLayer",
            "opacity", "displayInLayerSwitcher", "groupDisplayLayerSwitcher", "singleTile"
        ];
        var child;
        for(var i=0, len=properties.length; i<len; ++i) {
            child = this.createOLPropertyNode(layer, properties[i]);
            if(child) {
                node.appendChild(child);
            }
        }

        return node;
    },

    CLASS_NAME: "Mapea.Format.WMC.v1_1_0"
});
/**
 * Basado en código de OpenLayers. Véase su licencia a continuación.
 */

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/WMS/v1.js
 */

/**
 * Class: OpenLayers.Format.WMS.v1_1_1
 * Read and write WMS version 1.1.1.
 *
 * Inherits from:
 *  - <OpenLayers.Format.WMS.v1>
 */
Mapea.Format.WMS.v1_1_1 = OpenLayers.Class(
    Mapea.Format.WMS.v1, {
    
    /**
     * Constant: VERSION
     * {String} 1.1.0
     */
    VERSION: "1.1.1",

    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/context
     *     http://schemas.opengis.net/context/1.1.0/context.xsd
     */
    //schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.1.0/context.xsd",
    schemaLocation: null,
    /**
     * Constructor: OpenLayers.Format.WMS.v1_1_1
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.WMS> constructor instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        Mapea.Format.WMS.v1.prototype.initialize.apply(
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
     * Method: write_wmc_Layer
     * Create a Layer node given a layer object.  This method adds elements
     *     specific to version 1.1.0.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.WMS>} Layer object.
     *
     * Returns:
     * {Element} A WMC Layer element node.
     *
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
        
    },*/

    CLASS_NAME: "Mapea.Format.WMS.v1_1_1" 

});
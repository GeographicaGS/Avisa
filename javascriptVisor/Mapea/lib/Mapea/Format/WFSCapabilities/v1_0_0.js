/**
 * @requires OpenLayers/Format/WFSCapabilities/v1.js
 */

/**
 * Class: OpenLayers.Format.WFSCapabilities/v1_0_0
 * Read WMS Capabilities version 1.0.0.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.WFSCapabilities>
 */
Mapea.Format.WFSCapabilities.v1_0_0 = OpenLayers.Class(
    Mapea.Format.WFSCapabilities.v1, {
    
    /**
     * Constructor: OpenLayers.Format.WFSCapabilities.v1_0_0
     * Create a new parser for WFS capabilities version 1.0.0.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        Mapea.Format.WFSCapabilities.v1.prototype.initialize.apply(
            this, [options]
        );
    },

    CLASS_NAME: "Mapea.Format.WFSCapabilities.v1_0_0" 

});
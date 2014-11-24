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
 * Class: OpenLayers.Format.WMS.v1_3_0
 * Read and write WMS version 1.3.0.
 *
 * Inherits from:
 *  - <OpenLayers.Format.WMS.v1>
 */
Mapea.Format.WMS.v1_3_0 = OpenLayers.Class(
    Mapea.Format.WMS.v1, {
    
    /**
     * Constant: VERSION
     * {String} 1.3.0
     */
    VERSION: "1.3.0",

    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/context
     *     http://schemas.opengis.net/context/1.1.0/context.xsd
     */
    //schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.1.0/context.xsd",
    schemaLocation: null,
    /**
     * Constructor: OpenLayers.Format.WMS.v1_3_0
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

    CLASS_NAME: "Mapea.Format.WMS.v1_3_0" 
});
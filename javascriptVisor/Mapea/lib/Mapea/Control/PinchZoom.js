/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Handler/Pinch.js
 */

/**
 * Class: Mapea.Control.PinchZoom
 * NEW: Copied from OpenLayers.Control.PinchZoom
 * OpenLayers v2.13-dev
 * (see https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Control/PinchZoom.js)
 * Inherits:
 *  - <OpenLayers.Control>
 */
Mapea.Control.PinchZoom = OpenLayers.Class(OpenLayers.Control.PinchZoom, {

	/**
     * Method: applyTransform
     * Applies the given transform to layers.
     */
    applyTransform: function(transform) {
        var style = this.map.layerContainerDiv.style;
        style['-moz-transform'] = transform;
        style['-webkit-transform'] = transform;
        //copied from OL2.13dev
        style['WebkitTransform'] = transform;        
        style['transform'] = transform;        
    },

    CLASS_NAME: "Mapea.Control.PinchZoom"

});
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Control/DrawFeature.js
 */

/**
 * Class: OpenLayers.Control.DrawUniqueFeature
 * Draws feature on a vector layer when active.
 *
 * Inherits from:
 *  - <OpenLayers.Control.DrawFeature>
 */
Mapea.Control.DrawUniqueFeature = OpenLayers.Class(OpenLayers.Control.DrawFeature, {

    /**
     * Method: drawFeature
     */
    drawFeature: function(geometry) {
    	var trewapoint_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	    trewapoint_style.fillOpacity = 0.4;
	    trewapoint_style.graphicOpacity = 1;
	    trewapoint_style.strokeWidth = 2;
		trewapoint_style.strokeColor = "#D5006E";
	    trewapoint_style.fillColor = "#D5006E";
    
        var feature = new OpenLayers.Feature.Vector(geometry, null, trewapoint_style);
        this.layer.removeFeatures(this.layer.features);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded",{feature : feature});
    },

    CLASS_NAME: "Mapea.Control.DrawUniqueFeature"
});

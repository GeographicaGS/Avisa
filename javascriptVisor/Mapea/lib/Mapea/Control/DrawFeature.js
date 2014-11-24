/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Feature/Vector.js
 */

/**
 * Class: OpenLayers.Control.DrawFeature
 * The DrawFeature control draws point, line or polygon features on a vector
 * layer when active.
 * CHANGE 2009/10/28
 * By default, attributes are associated to the feature with the value " "
 *
 * Inherits from:
 *  - <OpenLayers.Control.DrawFeature>
 */
Mapea.Control.DrawFeature = OpenLayers.Class(OpenLayers.Control.DrawFeature, {

    /**
     * Method: drawFeature
     */
    drawFeature: function(geometry) {
        var feature = new OpenLayers.Feature.Vector(geometry);
        var proceed = this.layer.events.triggerEvent(
            "sketchcomplete", {feature: feature});

        if (proceed !== false) {
            /*
             * All features draw has attributes defined to ""
             * if the type of this attribute is "String", else
             * the attribute is defined to 0
             */
            feature.layer = this.layer;
            this.layer.addAttributes(feature);
            this.layer.writer.fillDefaultValues(feature);
            feature.state = OpenLayers.State.INSERT;
            this.layer.addFeatures([feature]);
            this.featureAdded(feature);
            this.events.triggerEvent("featureadded",{feature : feature});
        }
    },

    /**
     * APIMethod: activate
     * Explicitly activates a control and it's associated
     * handler if one has been set.  Controls can be
     * deactivated by calling the deactivate() method.
     * 
     * Returns:
     * {Boolean}  True if the control was successfully activated or
     *            false if the control was already active.
     */
    activate: function() {
        this.map.uniqueSelectFeatureCtrl.deactivate();
        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },

    /**
     * APIMethod: deactivate
     * Deactivates a control and it's associated handler if any.  The exact
     * effect of this depends on the control itself.
     * 
     * Returns:
     * {Boolean} True if the control was effectively deactivated or false
     *           if the control was already inactive.
     */
    deactivate: function () {
        this.map.uniqueSelectFeatureCtrl.activate();
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },

    CLASS_NAME: "Mapea.Control.DrawFeature"
});

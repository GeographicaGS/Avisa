/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */


/**
 * @requires OpenLayers/Handler.js
 */

/**
 * Class: OpenLayers.Handler.Feature 
 * Handler to respond to mouse events related to a drawn feature.  Callbacks
 *     with the following keys will be notified of the following events
 *     associated with features: click, clickout, over, out, and dblclick.
 *
 * This handler stops event propagation for mousedown and mouseup if those
 *     browser events target features that can be selected.
 *
 * Inherits from:
 *  - <OpenLayers.Handler.Feature>
 */
Mapea.Handler.Feature = OpenLayers.Class(OpenLayers.Handler.Feature, {
    /**
     * Property: lastXY
     * {Object} The last xy coordinates where the user clicked
     */
    lastXY : null,
    
    
    /**
     * Constructor: OpenLayers.Handler.Feature
     *
     * Parameters:
     * control - {<OpenLayers.Control>} 
     * layer - {<OpenLayers.Layer.Vector>}
     * callbacks - {Object} An object with a 'over' property whos value is
     *     a function to be called when the mouse is over a feature. The 
     *     callback should expect to recieve a single argument, the feature.
     * options - {Object} 
     */
    initialize: function(control, layer, callbacks, options) {
        if (Mapea.Util.isMobile) {
            this.EVENTMAP['touchend'] = {
                'in' : 'click',
                'out' : 'clickout'
            };
        }
        OpenLayers.Handler.Feature.prototype.initialize.apply(this, [control, layer, callbacks, options]);
    },

    /**
     * Method: click
     * Handle click.  Call the "click" callback if click on a feature,
     *     or the "clickout" callback if click outside any feature.
     * 
     * Parameters:
     * evt - {Event} 
     *
     * Returns:
     * {Boolean}
     */
    click: function(evt) {
        // gets the x and y of the click event and puts it into global var
        Mapea.global.lastClickedXY = Mapea.Util.getClickedPixelFromEvent(evt);

        // return the parent value
        return OpenLayers.Handler.Feature.prototype.click.apply(this, [evt]);
    },
    
    
    /**
     * Method: handle
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} The event occurred over a relevant feature.
     */
    handle: function(evt) {
        if(this.feature && !this.feature.layer) {
            // feature has been destroyed
            this.feature = null;
        }
        var type = evt.type;
        var handled = false;
        var previouslyIn = !!(this.feature); // previously in a feature
        var click = (type == "click" || type == "dblclick" || type == "touchend");
        this.feature = this.layer.getFeatureFromEvent(evt);
        if(this.feature && !this.feature.layer) {
            // feature has been destroyed
            this.feature = null;
        }
        if(this.lastFeature && !this.lastFeature.layer) {
            // last feature has been destroyed
            this.lastFeature = null;
        }
        if(this.feature) {
            if(type === "touchend") {
                // stop the event to prevent Android Webkit from
                // "flashing" the map div
                OpenLayers.Event.stop(evt);
            }
            var inNew = (this.feature != this.lastFeature);
            if(this.geometryTypeMatches(this.feature)) {
                // in to a feature
                if(previouslyIn && inNew) {
                    // out of last feature and in to another
                    if(this.lastFeature) {
                        this.triggerCallback(type, 'out', [this.lastFeature]);
                    }
                    this.triggerCallback(type, 'in', [this.feature]);
                } else if(!previouslyIn || click) {
                    // in feature for the first time
                    this.triggerCallback(type, 'in', [this.feature]);
                }
                this.lastFeature = this.feature;
                handled = true;
            } else {
                // not in to a feature
                if(this.lastFeature && (previouslyIn && inNew || click)) {
                    // out of last feature for the first time
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                }
                // next time the mouse goes in a feature whose geometry type
                // doesn't match we don't want to call the 'out' callback
                // again, so let's set this.feature to null so that
                // previouslyIn will evaluate to false the next time
                // we enter handle. Yes, a bit hackish...
                this.feature = null;
            }
        } else {
            if(this.lastFeature && (previouslyIn || click)) {
                this.triggerCallback(type, 'out', [this.lastFeature]);
            }
        }
        return handled;
    },
    
    /**
     * Method: touchstart
     * Handle touchstart events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    touchstart: function(evt) {
        if (!OpenLayers.Event.isMultiTouch(evt)) {
            this.lastXY = evt.xy;
        }
    },
    
    /**
     * Method: touchend
     * Handle touchend events
     *
     * Parameters:
     * evt - {Event}
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    touchend: function(evt) {
        if (Mapea.Util.isMobile && !OpenLayers.Event.isMultiTouch(evt)) {
            if (evt.xy && this.lastXY) {
                var xDiff = Math.abs(this.lastXY.x - evt.xy.x);
                var yDiff = Math.abs(this.lastXY.y - evt.xy.y);
                if ((xDiff <= this.clickTolerance)
                        && (yDiff <= this.clickTolerance)) {
                    return this.mousedown(evt);
                }
            }
        }
    },

    CLASS_NAME: "Mapea.Handler.Feature"
});

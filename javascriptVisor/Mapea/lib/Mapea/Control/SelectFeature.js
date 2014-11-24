/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */


/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Feature/Vector.js
 * @requires OpenLayers/Handler/Feature.js
 * @requires OpenLayers/Layer/Vector/RootContainer.js
 */

/**
 * Class: OpenLayers.Control.SelectFeature
 * The SelectFeature control selects vector features from a given layer on 
 * click or hover. 
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control.SelectFeature, {

    clickTolerance: 100,

    disableMouseDown: !Mapea.Util.isMobile,

   /**
     * Constructor: OpenLayers.Control.SelectFeature
     * Create a new control for selecting features.
     *
     * Parameters:
     * layers - {<OpenLayers.Layer.Vector>}, or an array of vector layers. The
     *     layer(s) this control will select features from.
     * options - {Object} 
     */
    initialize: function(layers, options) {
    	options = options || {};
    	OpenLayers.Control.SelectFeature.prototype.initialize.apply(this, [layers, options]);
        
        OpenLayers.Util.extend(this, options);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
        var callbacks = {
            click: this.clickFeature,
            clickout: this.clickoutFeature
        };
        if (this.hover) {
            callbacks.over = this.overFeature;
            callbacks.out = this.outFeature;
        }
             
        this.callbacks = OpenLayers.Util.extend(callbacks, this.callbacks);
        // MAPEA_PATCH: clickTolerance added
        this.handlers = {
            feature: new Mapea.Handler.Feature(
                this, this.layer, this.callbacks,
                {geometryTypes: this.geometryTypes, clickTolerance: this.clickTolerance}
            )
        };

        // MAPEA_PATCH: disable mouse down function on selectFeatures
        if (this.disableMouseDown)
        {
            this.handlers.feature.mousedown = OpenLayers.Function.Void;
        }

        if (this.box) {
            this.handlers.box = new OpenLayers.Handler.Box(
                this, {done: this.selectBox},
                {boxDivClassName: "olHandlerBoxSelectFeature"}
            ); 
        }
    },
    
    /**
     * Method: activate
     * Activates the control.
     * 
     * Returns:
     * {Boolean} The control was effectively activated.
     */
    activate: function () {
        if (!this.active) {
            if(this.layers) {
                this.map.addLayer(this.layer);
            }
            this.handlers.feature.register = function(name, method) {
            	if (name && (name != "click"))
            	{
            		this.map.events.registerPriority(name, this, method);
            		this.map.events.registerPriority(name, this, this.setEvent);
            	}
            	else
        		{
            		this.map.events.register(name, this, method);
            		this.map.events.register(name, this, this.setEvent);
        		}
            };
            this.handlers.feature.activate();
            if(this.box && this.handlers.box) {
                this.handlers.box.activate();
            }
        }
        return OpenLayers.Control.prototype.activate.apply(
            this, arguments
        );
    },
    
    CLASS_NAME: "Mapea.Control.SelectFeature"
});

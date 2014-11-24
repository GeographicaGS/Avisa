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
 * Class: Mapea.Control.UniqueSelectFeature
 * The UniqueSelectFeature control manages all vector features from 
 * all vector layers on click or hover. 
 *
 * Inherits from:
 *  - <Mapea.Control.SelectFeature>
 */
Mapea.Control.UniqueSelectFeature = OpenLayers.Class(Mapea.Control.SelectFeature, {
    /**
     * Porperty: ratio
     * {Integer} Ratio applied to the vector root container
     */
    ratio : 1,
    
   /**
     * Constructor: Mapea.Control.UniqueSelectFeature
     * Create a new control for selecting features.
     *
     * Parameters:
     * layers - {<OpenLayers.Layer.Vector>}, or an array of vector layers. The
     *     layer(s) this control will select features from.
     * options - {Object} 
     */
    initialize: function(layers, options) {
        OpenLayers.Util.extend(this, options);
    	Mapea.Control.SelectFeature.prototype.initialize.apply(this, arguments);
        this.handlers.feature.stopDown = false;
    },

    /**
     * Method: addLayers
     * add vector layers to this control.
     *
     * Parameters:
     * layers - {<OpenLayers.Layer.Vector>}, or an array of vector layers.
     */
    addLayers: function(layers) {
        if (!OpenLayers.Util.isArray(layers)) {
            layers = [layers];
        }

        // sets layers only if the layers parameter is not empty
        if (layers.length > 0) {
            // concat all layers
            var controlLayers = [];
            
            for (var i=0, ilen=layers.length; i < ilen; i++) {
                var layer = layers[i];
                
                // add layers which have not been added yet
                var hasLayer = false;
                for (var e=0, elen=this.layers.length; (e < elen) && !hasLayer; e++) {
                    hasLayer = (layer.id == this.layers[e].id);
                }
                if (!hasLayer) {
                    controlLayers.push(layer);
                }
                
                // set the map
                if (!this.map && layer.map) {
                    this.map = controlLayer.map;
                }
            }
            
            controlLayers = controlLayers.concat(this.layers);
            
            // set the new layers
            this.setLayer(controlLayers);
            if (!this.active) {
                this.activate();
            }
        }
    },
    
    /**
     * Method: initLayer
     * Assign the layer property. If layers is an array, we need to use
     *     a RootContainer.
     *
     * Parameters:
     * layers - {<OpenLayers.Layer.Vector>}, or an array of vector layers.
     */
    initLayer: function(layers) {
        if(OpenLayers.Util.isArray(layers)) {
            this.layers = layers;
            this.layer = new OpenLayers.Layer.Vector.RootContainer(
                this.id + "_container", {
                    layers: layers,
                    ratio: this.ratio
                }
            );
        } else {
            this.layer = layers;
        }
    },
    
    CLASS_NAME: "Mapea.Control.UniqueSelectFeature"
});

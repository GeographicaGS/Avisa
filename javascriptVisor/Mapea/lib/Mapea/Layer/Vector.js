/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/Vector.js
 */

/**
 * Class: Mapea.Layer.Vector
 * Instances of OpenLayers.Layer.Vector are used to render vector data from
 *     a variety of sources. Create a new vector layer with the
 *     <Mapea.Layer.Vector> constructor.
 *
 * Inherits from:
 *  - <Mapea.Layer.Vector>
 */
Mapea.Layer.Vector = OpenLayers.Class(OpenLayers.Layer.Vector, {

    /**
     * Constructor: OpenLayers.Layer.Vector
     * Create a new vector layer
     *
     * Parameters:
     * name - {String} A name for the layer
     * options - {Object} Optional object with non-default properties to set on
     *           the layer.
     *
     * Returns:
     * {<OpenLayers.Layer.Vector>} A new vector layer
     */
    initialize: function(name, options) {

    	OpenLayers.Layer.Vector.prototype.initialize.apply(this, arguments);

        // allow user-set renderer, otherwise assign one
        if (!this.renderer || !this.renderer.supported()) {
            this.assignRenderer();
        }

        // if no valid renderer found, display error
        if (!this.renderer || !this.renderer.supported()) {
            this.renderer = null;
            this.displayError();
        }

        if (!this.styleMap) {
            this.styleMap = new OpenLayers.StyleMap();
        }

        this.features = [];
        this.selectedFeatures = [];
        this.unrenderedFeatures = {};

        // Allow for custom layer behavior
        if(this.strategies){
            for(var i=0, len=this.strategies.length; i<len; i++) {
                this.strategies[i].setLayer(this);
            }
        }

    },
    
    /**
     * APIMethod: addFeatures
     * Add Features to the layer.
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>)}
     * options - {Object}
     */
    addFeatures : function(features, options) {
    	var newFeatures = [];
    	for (var i=0,len=features.length; i<len; i++)
    	{
    		var feature = features[i];
    		//feature.setMap(this.map);
    		newFeatures.push(feature);
    	}
    	OpenLayers.Layer.Vector.prototype.addFeatures.apply(this, [newFeatures, options]);
    },

   /**
     * APIMethod: addFeatures
     * Add Features to the layer.
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>)}
     * options - {Object}
     */
    addFeaturesReverse: function(features, options) {
        if (!(OpenLayers.Util.isArray(features))) {
            features = [features];
        }

        var notify = !options || !options.silent;
        if(notify) {
            var event = {features: features};
            var ret = this.events.triggerEvent("beforefeaturesadded", event);
            if(ret === false) {
                return;
            }
            features = event.features;
        }


        for (var i=0, len=features.length; i<len; i++) {
            if (i != (features.length - 1)) {
                this.renderer.locked = true;
            } else {
                this.renderer.locked = false;
            }
            var feature = features[i];

            if (this.geometryType &&
              !(feature.geometry instanceof this.geometryType)) {
                var throwStr = OpenLayers.i18n('componentShouldBe',
                          {'geomType':this.geometryType.prototype.CLASS_NAME});
                throw throwStr;
              }

            this.features.push(feature);

            //give feature reference to its layer
            feature.layer = this;

            if (!feature.style && this.style) {
                feature.style = OpenLayers.Util.extend({}, this.style);
            }

            if (notify) {
                if(this.events.triggerEvent("beforefeatureadded",
                                            {feature: feature}) === false) {
                    continue;
                };
                this.preFeatureInsert(feature);
            }

            this.drawFeature(feature);

            if (notify) {
                this.events.triggerEvent("featureadded", {
                    feature: feature
                });
                this.onFeatureInsert(feature);
            }
        }

        if(notify) {
            this.events.triggerEvent("featuresadded", {features: features});
        }
    },

    CLASS_NAME: "Mapea.Layer.Vector"
});

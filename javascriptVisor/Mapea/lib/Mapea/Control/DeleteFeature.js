/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/** 
 * @requires OpenLayers/Control.js
 */
   
 /**
 * Class: Mapea.Control.DeleteFeature
 * The DeleteFeature control delete point, line or polygon features on a vector
 * layer when active. Create a new control with the <Mapea.Control.DeleteFeature> 
 * constructor.
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.DeleteFeature = OpenLayers.Class(OpenLayers.Control, {

	/**
    * Constructor: OpenLayers.Control.DeleteFeature
    * 
    * Parameters:
    * layer - {<OpenLayers.Layer.Vector>} 
    * options - {Object}
    */
	initialize: function(layer, options) {
    	OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        this.handler = new Mapea.Handler.Feature(this, layer, {click: this.clickFeature});
    },
              
    /**
    * Method: clickFeature
    *
    * Returns:
    * feature - {<OpenLayers.Feature.Vector>} The selected feature.
    */ 
	clickFeature: function(feature) {
	    // if feature doesn't have a fid, destroy it
	    if(feature.fid == undefined) {
	        this.layer.destroyFeatures([feature]);
	    } else {
	        feature.state = OpenLayers.State.DELETE;
	        this.layer.events.triggerEvent("afterfeaturemodified", 
	                                       {feature: feature});
	        feature.renderIntent = "select";
	        this.layer.drawFeature(feature);
	    }
	},
	
	/**
    * Method: setMap
    * Parameters:
    * map - {<Mapea.Map>} The control's map.
    */
	setMap: function(map) {
    	this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
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
    
 	CLASS_NAME: "Mapea.Control.DeleteFeature"
});
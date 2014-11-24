/* Copyright (c) 2006 MetaCarta, Inc., published under the Clear BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Control/DragFeature.js
 * @requires OpenLayers/Control/SelectFeature.js
 * @requires OpenLayers/Handler/Keyboard.js
 */

/**
 * Class: OpenLayers.Control.ModifyFeature
 * Control to modify features.  When activated, a click renders the vertices
 *     of a feature - these vertices can then be dragged.  By default, the
 *     delete key will delete the vertex under the mouse.  New features are
 *     added by dragging "virtual vertices" between vertices.  Create a new
 *     control with the <OpenLayers.Control.ModifyFeature> constructor.
 *
 * Inherits From:
 *  - <OpenLayers.Control>
 */
Mapea.Control.ModifyFeature = OpenLayers.Class(OpenLayers.Control.ModifyFeature, {

	/**
	 * Constructor: OpenLayers.Control.ModifyFeature
	 * Create a new modify feature control.
	 *
	 * Parameters:
	 * layer - {<OpenLayers.Layer.Vector>} Layer that contains features that
	 *     will be modified.
	 * options - {Object} Optional object whose properties will be set on the
	 *     control.
	 */
	initialize: function(layer, options) {
		OpenLayers.Control.ModifyFeature.prototype.initialize.apply(this, [layer, options]);
		
		var control = this;
		// configure the drag control
		var dragOptions = {
			// MAPEA: add new geometry types
			geometryTypes: ["OpenLayers.Geometry.Point","OpenLayers.Geometry.LineString","OpenLayers.Geometry.MultiLineString","OpenLayers.Geometry.MultiPolygon","OpenLayers.Geometry.Polygon"],
			snappingOptions: this.snappingOptions,
			onStart: function(feature, pixel) {
				control.dragStart.apply(control, [feature, pixel]);
			},
			onDrag: function(feature, pixel) {
				control.dragVertex.apply(control, [feature, pixel]);
			},
			onComplete: function(feature) {
				control.dragComplete.apply(control, [feature]);
			}
		};

		this.dragControl = new OpenLayers.Control.DragFeature(
			layer, dragOptions
		);
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
        return OpenLayers.Control.ModifyFeature.prototype.activate.apply(this, arguments);
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
        return OpenLayers.Control.ModifyFeature.prototype.deactivate.apply(this, arguments);
    },
	
	CLASS_NAME: "Mapea.Control.ModifyFeature"
});
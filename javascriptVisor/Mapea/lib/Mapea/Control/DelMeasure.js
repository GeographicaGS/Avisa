/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/** 
 * @requires OpenLayers/Control.js
 */
   
 /**
 * Class: Mapea.Control.DelMeasure
 * Create a wind rose to display over your main map. Create a new 
 *    wind rose with the <Mapea.Control.WindRose> constructor.
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.DelMeasure = OpenLayers.Class(OpenLayers.Control, {

	/**
    * Constructor: OpenLayers.Control.WindRose
    * 
    * Parameters:
    * options - {Object}
    */
	initialize: function(options) {
 		OpenLayers.Control.prototype.initialize.apply(this, [options]);
 	},

    /**
    * APIMethod: destroy
    */
 	destroy: function() {
 		OpenLayers.Control.prototype.destroy.apply(this, arguments);
 	},

    /**
    * Method: draw
    *
    * Returns:
    * {DOMElement} A reference to the DIV DOMElement. 
    */ 
 	draw: function() {
 		OpenLayers.Control.prototype.draw.apply(this, arguments);
 		return this.div;  		
 	},
 	
 	CLASS_NAME: "Mapea.Control.DelMeasure"
});
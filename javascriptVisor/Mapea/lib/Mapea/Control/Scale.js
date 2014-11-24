/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/** 
 * @requires OpenLayers/Control/Scale.js
 * @requires OpenLayers/Control/Panel.js
 * @requires OpenLayers/Lang.js
 * @requires Mapea/Map.js
 */

/**
 * Class: Mapea.Control.Scale Inerits from: - <OpenLayers.Control.Scale>
 */
 /* Inherits from:
 *  - <OpenLayers.Control.Scale>
 */
Mapea.Control.Scale = OpenLayers.Class(OpenLayers.Control.Scale, {
	  /**
     * Parameter: element
     * {DOMElement}
     */
    element: null,
    
    /**
     * Constructor: OpenLayers.Control.Scale
     * 
     * Parameters:
     * element - {DOMElement} 
     * options - {Object} 
     */
    initialize: function(element, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.element = OpenLayers.Util.getElement(element);        
    },

    /**
     * Method: draw
     * 
     * Returns:
     * {DOMElement}
     */    
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        if (!this.element) {
            this.element = document.createElement("div");
            this.div.appendChild(this.element);
        }
        this.map.events.register( 'moveend', this, this.updateScale);
        this.updateScale();
        return this.div;
    },
   
    /**
     * Method: updateScale
     */
    updateScale: function() {
    	var scale = this.map.getScale();
    	if (!scale) {
            return;
        }
    	if (scale >= 1000 && scale <= 950000) {
            scale = Math.round(scale / 1000)*1000;
        } else if (scale >= 950000) {
            scale = Math.round(scale / 1000000)*1000000;
        } else {
            scale = Math.round(scale);
        } 
        
        //MJMJ en OLv2.12 se detecta el lang ES y se usa
    	//this.element.innerHTML = OpenLayers.i18n("scale", {'scaleDenom':scale});
    	//heredamos de mapea:
    	this.element.innerHTML = Mapea.i18n("scale", {'scaleDenom':scale});
    }, 
    CLASS_NAME: "Mapea.Control.Scale"
});
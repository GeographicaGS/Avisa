 /* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/** 
 * @requires OpenLayers/Control.js
 */

 /**
 * Class: Mapea.Control.StatusLoader
 * Create a status loader to display while your main map is changing. Create
 *    a new status loader control with the <Mapea.Control.StatusLoader> 
 *	  constructor.
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
 Mapea.Control.StatusLoader = OpenLayers.Class(OpenLayers.Control, {
	
	/**  
    * Property: layersLoading
    * {Integer}
    */
 	layersLoading :0,

	/**
    * Constructor: OpenLayers.Control.StatusLoader
    * 
    * Parameters:
    * options - {Object}
    */
 	initialize : function(options) {
 		OpenLayers.Control.prototype.initialize.apply(this, arguments);
 	},
 	
 	/**
    * APIMethod: destroy
    */
 	destroy: function() {
 		OpenLayers.Control.prototype.destroy.apply(this, arguments);
 	},
 	
    /** 
    * Method: setMap
    *
    * Properties:
    * map - {<OpenLayers.Map>} 
    */
 	setMap : function(map) {
 		this.map = map;
 		if (this.handler) {
 			this.handler.setMap(map);
 		}

 		for ( var i = 0; i < map.layers.length; i++) {
 			var layer = map.layers[i];
 			layer.events.register("loadstart", this, function() {
 				this.layersLoading++;
 				this.element.style.display = 'block';
 			});
 			layer.events.register("loadend", this, function() {
 				if (this.layersLoading > 0)
 					this.layersLoading--;
 				if (this.layersLoading == 0) {
 					this.element.style.display = 'none';
 				}
 			});
 		}
 	},

    /**
    * Method: draw
    *
    * Returns:
    * {DOMElement} A reference to the DIV DOMElement containing the 
    *     statusLoader image.
    */  
 	draw : function() {
 		OpenLayers.Control.prototype.draw.apply(this, arguments);

 		if (!this.element) {
 			this.element = document.createElement("img");
 		 			
 			this.element.src = Mapea.Util.getImagesLocation()
 					+ "status-loader-loading.gif";
 		
 			this.element.style.display = 'none';
 			this.div.appendChild(this.element);
 		}
 		return this.div;
 	},

 	CLASS_NAME :"Mapea.Control.StatusLoader"
 });
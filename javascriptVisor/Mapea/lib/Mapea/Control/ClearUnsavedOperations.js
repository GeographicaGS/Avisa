/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 */

 /**
 * Class: Mapea.Control.ClearUnsavedOperations
 * Restore the unsaved feature's values to to the last saved values
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.ClearUnsavedOperations= OpenLayers.Class(OpenLayers.Control, {

	/**
     * Property: features_coordx
     *
     * Save the original x coordinate of feature
     */
	features_coordx: null,

	/**
     * Property: features_coordy
     *
     * Save the original y coordinate of feature
     */
	features_coordy: null,

	/**
     * Property: features_fids
     *
     * Save the original fid of feature
     */
	features_fids: null,

	/**
     * Property: featureT
     *
     * Feature Type
     */
	featureT: null,

	/**
    * Constructor: OpenLayers.Control.EditAttributeFeature
    *
    * Parameters:
    * layer - {OpenLayer.Layer.Vector}
    */
	initialize: function(layer,featureTy) {
		this.features_coordx = new Array();
		this.features_coordy = new Array();
		this.features_fids = new Array();
        this.layer = layer;
        this.featureT = featureTy;
    },

    /**
    * APIMethod: setMap
    * Parameters:
    * map - {<Mapea.map>}
    */
	setMap: function(map) {
    	this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

    /**
    * Method: clearOperations
    *
    * Undo unsaved changes
    */
 	clearOperations: function(featureT) {
    	this.layer.features = [].concat(this.layer.featuresBackup);
        this.layer.refresh();
    },

    /**
    * APIMethod: destroy
    */
 	destroy: function() {
 		OpenLayers.Control.prototype.destroy.apply(this, arguments);
 	},

 	/**
     * Method: loadCoord
     *
     * Save the original coordinates x and y
     * Parameters:
     * operation - {String}
     */
 	loadCoord: function(operation){
 		//First time modify
 		if(operation == "Modify" && this.features_coordx.length == 0){
 			for(var i=0; i<this.layer.features.length; i++){
 				//If the feature is not modified save its coordinates
 				if(this.layer.features[i].state == null){
 					if(this.featureT == "POINT"){
 						try{
 							this.features_coordx[i] = this.layer.features[i].geometry.components[0].x;
 							this.features_coordy[i] = this.layer.features[i].geometry.components[0].y;
 						}catch(err){
 							//MMV 20121203
 	 						this.features_coordx[i] = this.layer.features[i].geometry.x;
 	 						this.features_coordy[i] = this.layer.features[i].geometry.y;
 						}
 					}
 					if(this.featureT == "POLYGON"){
 						//If the feature is not modified save its coordinates and name
 						this.features_coordx[i] = new Array();
 						this.features_coordy[i] = new Array();
 						this.features_fids[i] = new Array();
 						for(var j = 0; j<this.layer.features[i].geometry.components[0].components[0].components.length; j++){
 							this.features_coordx[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].x;
 							this.features_coordy[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].y;
 							this.features_fids[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].id;
 						}
 					}
 					if(this.featureT == "LINE"){
 						//If the feature is not modified save its coordinates and name
 						this.features_coordx[i] = new Array();
 						this.features_coordy[i] = new Array();
 						this.features_fids[i] = new Array();
 						for(var j = 0; j<this.layer.features[i].geometry.components[0].components.length; j++){
 							this.features_coordx[i][j] = this.layer.features[i].geometry.components[0].components[j].x;
 							this.features_coordy[i][j] = this.layer.features[i].geometry.components[0].components[j].y;
 							this.features_fids[i][j] = this.layer.features[i].geometry.components[0].components[j].id;
 						}
 	 				}
 				}
 			}
 		}
 		else if(operation == "Save"){

 			this.features_coordx = new Array();
 			this.features_coordy = new Array();
 			this.features_fids = new Array();

 			for(var i=0; i<this.layer.features.length; i++){
 				if(this.featureT == "POINT"){
 					//If the feature is not modified save its coordinates
 					try{
 						this.features_coordx[i] = this.layer.features[i].geometry.components[0].x;
 						this.features_coordy[i] = this.layer.features[i].geometry.components[0].y;
 					}catch(err){
 						//MMV 20121203
 						this.features_coordx[i] = this.layer.features[i].geometry.x;
 						this.features_coordy[i] = this.layer.features[i].geometry.y;
 					}
 				}
 				if(this.featureT == "POLYGON"){
 					//If the feature is not modified save its coordinates and name
 					this.features_coordx[i] = new Array();
					this.features_coordy[i] = new Array();
					this.features_fids[i] = new Array();
					//Do not adds selected vertex. Existing polygons only
					if(this.layer.features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPolygon"){
						for(var j = 0; j<this.layer.features[i].geometry.components[0].components[0].components.length; j++){
							this.features_coordx[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].x;
							this.features_coordy[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].y;
							this.features_fids[i][j] = this.layer.features[i].geometry.components[0].components[0].components[j].id;
						}
					}
				}
 				if(this.featureT == "LINE"){
 					//If the feature is not modified save its coordinates and name
 					this.features_coordx[i] = new Array();
					this.features_coordy[i] = new Array();
					this.features_fids[i] = new Array();
					//Do not adds selected vertex. Existing lines only
					if(this.layer.features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.MultiLineString"){
						for(var j = 0; j<this.layer.features[i].geometry.components[0].components.length; j++){
							this.features_coordx[i][j] = this.layer.features[i].geometry.components[0].components[j].x;
							this.features_coordy[i][j] = this.layer.features[i].geometry.components[0].components[j].y;
							this.features_fids[i][j] = this.layer.features[i].geometry.components[0].components[j].id;
						}
					}
 				}
 			}
 		}
 	},

 	CLASS_NAME: "Mapea.Control.ClearUnsavedOperations"
});
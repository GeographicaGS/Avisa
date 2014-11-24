/**
 * @requires OpenLayers/Geometry/Point.js
 * @requires OpenLayers/Geometry/MultiPoint.js
 * @requires OpenLayers/Geometry/LineString.js
 * @requires OpenLayers/Geometry/MultiLineString.js
 * @requires OpenLayers/Geometry/LinearRing.js
 * @requires OpenLayers/Geometry/Polygon.js
 * @requires OpenLayers/Geometry/MultiPolygon.js
 * @requires OpenLayers/Feature/Vector.js
 * @requires OpenLayers/Control/SelectFeature.js
 */

/**
 * Class: Mapea.Layer.LayerDraw
 * <Mapea.Layer.LayerDraw> constructor.
 *
 *  
 */
Mapea.Layer.LayerDraw = OpenLayers.Class({
    
    /**  
    * Property: vectorlayer
    * {<OpenLayers.Layer.Vector>}
    */
    vectorlayer: null,

    /**
     * APIProperty: map
     * {<OpenLayers.Map>}
     */
    map: null,

    /**  
    * Property: layer_style
    * {}
    */
    layer_style: null,

    /**  
    * Property: style_point
    * {}
    */
    style_point: null,

    /**  
    * Property: style_line
    * {}
    */
    style_line: null,
    
    /**  
    * Property: style_mark
    * {}
    */
    style_mark: null,
  
    /**
    * Constructor: Mapea.Layer.LayerDraw
    * Create a new vector layer for draw.
    *
    * Parameters:
    * name - {String} A name for the layer
    * options - {Object} options Object with non-default properties to set on
    *           the layer.
    * mapParent - {<OpenLayers.Map>} map for add de new vector layer.
    * Returns:
    * {<OpenLayers.Layer.Vector>} A new vector layer
    */
    initialize: function(nameLayer, optionsLayer, mapParent) {
			    
	    this.vectorlayer = new OpenLayers.Layer.Vector(nameLayer, optionsLayer);	
	                         
        if (!mapParent || !this.vectorlayer){
			Mapea.Util.showErrorMessage("Error al inical el LayerDraw.");
	 	} else {
	 		this.map = mapParent;
         	this.map.addLayer(this.vectorlayer);
        }
    },

    /**
    * APIMethod: destroy
    * Destroy this layer
    */
    destroy: function() {
	        
		this.map.removeLayer(this.vectorlayer, false);	
        this.vectorlayer = null;		
        this.layer_style = null;
        this.style_point = null;
		this.style_mark = null;
    },
   
    /**
    * APIMethod: drawmultipoint
    * Draw multipoint on the layer. 
    * 
    * Parameters: 
    * strmultipoint - {String}
    */
    drawmultipoint: function(strmultipoint) {
		var pointlist = [];
		var arraypoint = strmultipoint.split(" ");
		var coord = null;
		var newpoint = null;
		var multipoint = null;
		var multipointfeature = null;
		
		this.initolvars();
		
		for(var p = 0; p < arraypoint.length; p++) {
			coord = arraypoint[p].split(",");
			newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
			pointlist.push(newpoint);
	 	}
		multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
		multipointfeature = new OpenLayers.Feature.Vector(multipoint,null,this.style_point);
		
		this.vectorlayer.addFeatures([multipointfeature]);
    },  

    /**
    * APIMethod: drawmultiline
    * Draw multiline on the layer.
    * 
    * Parameters: 
    * strmultipoint - {String}
    */
    drawmultiline: function(strmultipoint) {
		var linelist = [];
		var arrayline = null;
		var arraypoint = null;
		var coord = null;
		var newpoint = null;
		var multiline = null;
		var multilinefeature = null;
		
		this.initolvars();
		
		arrayline = strmultipoint.split("_");
		for(var q = 0; q < arrayline.length; q++){
			var pointlist = [];
			arraypoint = arrayline[q].split(" ");
			for(var p = 0; p < arraypoint.length; p++) {
				coord = arraypoint[p].split(",");
				newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
				pointlist.push(newpoint);
		 	}
			line = new OpenLayers.Geometry.LineString(pointlist);
			linelist.push(line);
		}
		multiline = new OpenLayers.Geometry.MultiLineString(linelist);	
		multilinefeature = new OpenLayers.Feature.Vector(multiline,null,this.style_line);
		
		vectorlayer.addFeatures([multilinefeature]);
    },   

    /**
    * APIMethod: drawmultipolygon
    * Draw multipolygon on the layer.
    * 
    * Parameters: 
    * strmultipolygon - {String}
    */
    drawmultipolygon: function(strmultipolygon) {
		var polygonlist = [];
		var arraypolygon = null;
		var arraypoint = null;
		var coord = null;
		var newpoint = null;
		var newpolygon = null;
		var multipolygon = null;
		var multipolygonfeature = null;
		
		this.initolvars();
		
		arraypolygon = strmultipolygon.split("_");
		for(var q = 0; q < arraypolygon.length; q++){
			var pointlist = [];
			arraypoint = arraypolygon[q].split(" ");
			for(var p = 0; p < arraypoint.length; p++) {
				coord = arraypoint[p].split(",");
				newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
				pointlist.push(newpoint);
		 	}
			linearring = new OpenLayers.Geometry.LinearRing(pointlist);
			newpolygon = new OpenLayers.Geometry.Polygon(linearring);
			polygonlist.push(newpolygon);
		}
		multipolygon = new OpenLayers.Geometry.MultiPolygon(polygonlist);	
		multipolygonfeature = new OpenLayers.Feature.Vector(multipolygon);
		
		this.vectorlayer.addFeatures([multipolygonfeature]);
    },       

    /**
    * APIMethod: eraseDraw
    * Erase points, lines, or polygons on the layers. The layers is not erased.
    * 
    * Parameters: 
    * strmultipolygon - {String}
    */
    eraseDraw: function() {
		this.vectorlayer.destroyFeatures();
		this.destroy();
	 },

    /**
    * APIMethod: initolvars
    * 
    * 
    * Parameters: 
    * strmultipolygon - {String}
    */
    initolvars: function() {

		if(this.layer_style == null){
			this.layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		    this.layer_style.fillOpacity = 0.2;
		    this.layer_style.graphicOpacity = 1;
		}
		
		if(this.style_point == null){
			this.style_point = OpenLayers.Util.extend({}, this.layer_style);
		    this. style_point.strokeColor = "blue";
		    this.style_point.fillColor = "blue";
		}
		
		if(this.style_line == null){
			this.style_line = OpenLayers.Util.extend({}, this.layer_style);
	        this.style_line.strokeColor = "#00FF00";
	        this.style_line.strokeWidth = 3;
			this.style_line.pointRadius = 6;
		}
		
		if(this.style_mark == null){
			this.style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		    this.style_mark.graphicWidth = 24;
		    this.style_mark.graphicHeight = 20;
		    this.style_mark.graphicXOffset = -(this.style_mark.graphicWidth/2);  // this is the default value
		    this.style_mark.graphicYOffset = -this.style_mark.graphicHeight;
		    this.style_mark.externalGraphic = "marker.png";
		}
	
     },
 
    CLASS_NAME: "Mapea.Layer.LayerDraw"
});
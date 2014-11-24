/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/WMS.js
 */

/**
 * Class: Mapea.Layer.WMS
 * Instances of Mapea.Layer.WMS are used to display data from OGC Web
 *     Mapping Services. Create a new WMS layer with the <Mapea.Layer.WMS>
 *     constructor. This class has the option for show the group's layer in
 *     the layerSwitcher.
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.WMS>
 */
Mapea.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.WMS, {
 
     /** 
     * APIProperty: groupDisplayLayerSwitcher
     * {String} Display the layer's name in the layer switcher inside a group. 
     *     Default group is none.
     *     
     */
     groupDisplayLayerSwitcher: "none",
    
     /** 
     * APIProperty: orderInsideGroupDisplayLayerSwitcher
     * {Integer} Display the layer's name in the layer switcher inside a group in this order.  
     *  	Default order is 0. 
     *     
     */
     orderInsideGroupDisplayLayerSwitcher: 0,
     
     /** HERENDADO
      * Atributo de la clase Grid.js de OpenLayers que lo machacamos
      * para hacer uso de Mapea.Tile.Image en vez de OpenLayers.Tile.Image
      */
     tileClass: Mapea.Tile.Image,
    
     /**
     * Constructor: Mapea.Layer.WMS
     * Create a new WMS layer object
     *
     * Example:
     * (code)
     * var wms = new Mapea.Layer.WMS("NASA Global Mosaic",
     *                                    "http://wms.jpl.nasa.gov/wms.cgi", 
     *                                    {layers: "modis,global_mosaic"});
     * (end)
     *
     * Parameters:
     * name - {String} A name for the layer
     * url - {String} Base url for the WMS
     *                (e.g. http://wms.jpl.nasa.gov/wms.cgi)
     * params - {Object} An object with key/value pairs representing the
     *                   GetMap query string parameters and parameter values.
     * options - {Ojbect} Hashtable of extra options to tag onto the layer
     */
     initialize: function(name, url, params, options) {    
        var newArguments = [];
        //uppercase params
        params = OpenLayers.Util.upperCaseObject(params);
        newArguments.push(name, url, params, options);
        
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
        
        OpenLayers.Layer.WMS.prototype.initialize.apply(this, newArguments);
        OpenLayers.Util.applyDefaults(
                       this.params, 
                       OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS)
                       );

        //layer is transparent        
        if (this.params.TRANSPARENT && 
            this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            
            // unless explicitly set in options, make layer an overlay
            if ( (options == null) || (!options.isBaseLayer) ) {
                this.isBaseLayer = false;
            } 
            
            // jpegs can never be transparent, so intelligently switch the 
            //  format, depending on teh browser's capabilities
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif"
                                                                 : "image/png";
            }
     
            /////PATCH_PNG_IE6y7/////
			OpenLayers.Util.getIEVersion=function(){var ieVersion="";var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("msie 6")!=-1){ieVersion="msie 6.x";}else if(ua.indexOf("msie 7")!=-1){ieVersion="msie 7.x";}else{ieVersion="other";} return ieVersion;}
			if ((OpenLayers.Util.getIEVersion()=="msie 7.x" || OpenLayers.Util.getIEVersion()=="msie 6.x") && this.params.FORMAT=="image/png"){this.params.FORMAT="image/gif";}
			///////////////////////
        }

     },    

     /**
     * Method: destroy
     * Destroy this layer
     */
     destroy: function() {
        // for now, nothing special to do here. 
        OpenLayers.Layer.WMS.prototype.destroy.apply(this, arguments);  
     },
    
     /**
     * Method: clone
     * Create a clone of this layer
     *
     * Returns:
     * {<Mapea.Layer.WMS>} An exact clone of this layer
     */
     clone: function (obj) {
        
        if (obj == null) {
            obj = new Mapea.Layer.WMS(this.name,
                                           this.url,
                                           this.params,
                                           this.options);
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.WMS.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
     },    

     /**
     * APIMethod: mergeNewParams
     * Catch changeParams and uppercase the new params to be merged in
     *     before calling changeParams on the super class.
     * 
     *     Once params have been changed, the tiles will be reloaded with
     *     the new parameters.
     * 
     * Parameters:
     * newParams - {Object} Hashtable of new params to use
     */
     mergeNewParams:function(newParams) {
        var upperParams = OpenLayers.Util.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return OpenLayers.Layer.WMS.prototype.mergeNewParams.apply(this, 
                                                             newArguments);
     },

     /** 
     * APIMethod: getFullRequestString
     * Combine the layer's url with its params and these newParams. 
     *   
     *     Add the SRS parameter from projection -- this is probably
     *     more eloquently done via a setProjection() method, but this 
     *     works for now and always.
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String} Use this as the url instead of the layer's url
     * 
     * Returns:
     * {String} 
     */
     getFullRequestString:function(newParams, altUrl) {
        /*var projectionCode = this.map.getProjection();
        this.params.SRS = (projectionCode == "none") ? null : projectionCode;
        
        return OpenLayers.Layer.WMS.prototype.getFullRequestString.apply(
                                                    this, arguments);*/        
        var projectionCode = this.map.getProjectionObject();
        var value = (projectionCode == "none") ? null : projectionCode;
        if (parseFloat(this.params.VERSION) >= 1.3) {
            this.params.CRS = value;
        } else {
            this.params.SRS = value;
        }
        
        if (typeof this.params.TRANSPARENT == "boolean") {
            newParams.TRANSPARENT = this.params.TRANSPARENT ? "TRUE" : "FALSE";
        }

        return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments);
     },
     
     /**
      * METODOS QUE ERAN HEREDADOS DE GRID.js POR WMS.js DE OL
      * QUE LO PASAMOS A WMS.js MAPEA PARA LLAMARLOS
      */
     moveTo:function(bounds, zoomChanged, dragging) {

         OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);

         bounds = bounds || this.map.getExtent();

         if (bounds != null) {
              
             // if grid is empty or zoom has changed, we *must* re-tile
             var forceReTile = !this.grid.length || zoomChanged;
             
             // total bounds of the tiles
             var tilesBounds = this.getTilesBounds();            

             // the new map resolution
             var resolution = this.map.getResolution();

             // the server-supported resolution for the new map resolution
             var serverResolution = this.getServerResolution(resolution);

             if (this.singleTile) {
                 
                 // We want to redraw whenever even the slightest part of the 
                 //  current bounds is not contained by our tile.
                 //  (thus, we do not specify partial -- its default is false)

                 if ( forceReTile ||
                      (!dragging && !tilesBounds.containsBounds(bounds))) {

                     // In single tile mode with no transition effect, we insert
                     // a non-scaled backbuffer when the layer is moved. But if
                     // a zoom occurs right after a move, i.e. before the new
                     // image is received, we need to remove the backbuffer, or
                     // an ill-positioned image will be visible during the zoom
                     // transition.

                     if(zoomChanged && this.transitionEffect !== 'resize') {
                         this.removeBackBuffer();
                     }

                     if(!zoomChanged || this.transitionEffect === 'resize') {
                         this.applyBackBuffer(serverResolution);
                     }

                     this.initSingleTile(bounds);
                 }
             } else {

                 // if the bounds have changed such that they are not even 
                 // *partially* contained by our tiles (e.g. when user has 
                 // programmatically panned to the other side of the earth on
                 // zoom level 18), then moveGriddedTiles could potentially have
                 // to run through thousands of cycles, so we want to reTile
                 // instead (thus, partial true).  
                 forceReTile = forceReTile ||
                     !tilesBounds.intersectsBounds(bounds, {
                         worldBounds: this.map.baseLayer.wrapDateLine &&
                             this.map.getMaxExtent()
                     });

                 if(resolution !== serverResolution) {
                     bounds = this.map.calculateBounds(null, serverResolution);
                     if(forceReTile) {
                         // stretch the layer div
                         var scale = serverResolution / resolution;
                         this.transformDiv(scale);
                     }
                 } else {
                     // reset the layer width, height, left, top, to deal with
                     // the case where the layer was previously transformed
                     this.div.style.width = '100%';
                     this.div.style.height = '100%';
                     this.div.style.left = '0%';
                     this.div.style.top = '0%';
                 }

                 if(forceReTile) {
                     if(zoomChanged && this.transitionEffect === 'resize') {
                         this.applyBackBuffer(serverResolution);
                     }
                     this.initGriddedTiles(bounds);
                 } else {
                     this.moveGriddedTiles();
                 }
             }
         }
     },

     initGriddedTiles:function(bounds) {
         this.clearTileQueue();

         // work out mininum number of rows and columns; this is the number of
         // tiles required to cover the viewport plus at least one for panning

         var viewSize = this.map.getSize();
         var minRows = Math.ceil(viewSize.h/this.tileSize.h) + 
                       Math.max(1, 2 * this.buffer);
         var minCols = Math.ceil(viewSize.w/this.tileSize.w) +
                       Math.max(1, 2 * this.buffer);
         
         var origin = this.getTileOrigin();
         var resolution = this.getServerResolution();
         
         var tileLayout = this.calculateGridLayout(bounds, origin, resolution);

         var tileoffsetx = Math.round(tileLayout.tileoffsetx); // heaven help us
         var tileoffsety = Math.round(tileLayout.tileoffsety);

         var tileoffsetlon = tileLayout.tileoffsetlon;
         var tileoffsetlat = tileLayout.tileoffsetlat;
         
         var tilelon = tileLayout.tilelon;
         var tilelat = tileLayout.tilelat;

         var startX = tileoffsetx; 
         var startLon = tileoffsetlon;

         var rowidx = 0;
         
         var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
         var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);

         var tileData = [], center = this.map.getCenter();
         do {
             var row = this.grid[rowidx++];
             if (!row) {
                 row = [];
                 this.grid.push(row);
             }

             tileoffsetlon = startLon;
             tileoffsetx = startX;
             var colidx = 0;
  
             do {
                 var tileBounds = 
                     new OpenLayers.Bounds(tileoffsetlon, 
                                           tileoffsetlat, 
                                           tileoffsetlon + tilelon,
                                           tileoffsetlat + tilelat);

                 var x = tileoffsetx;
                 x -= layerContainerDivLeft;

                 var y = tileoffsety;
                 y -= layerContainerDivTop;

                 var px = new OpenLayers.Pixel(x, y);
                 var tile = row[colidx++];
                 if (!tile) {
                     tile = this.addTile(tileBounds, px);
                     this.addTileMonitoringHooks(tile);
                     row.push(tile);
                 } else {
                     tile.moveTo(tileBounds, px, false);
                 }
                 var tileCenter = tileBounds.getCenterLonLat();
                 tileData.push({
                     tile: tile,
                     distance: Math.pow(tileCenter.lon - center.lon, 2) +
                         Math.pow(tileCenter.lat - center.lat, 2)
                 });
      
                 tileoffsetlon += tilelon;       
                 tileoffsetx += this.tileSize.w;
             } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer)
                      || colidx < minCols);
              
             tileoffsetlat -= tilelat;
             tileoffsety += this.tileSize.h;
         } while((tileoffsetlat >= bounds.bottom - tilelat * this.buffer)
                 || rowidx < minRows);
         
         //shave off exceess rows and colums
         this.removeExcessTiles(rowidx, colidx);

         // store the resolution of the grid
         this.gridResolution = this.getServerResolution();

         //now actually draw the tiles
         tileData.sort(function(a, b) {
             return a.distance - b.distance; 
         });
         for (var i=0, ii=tileData.length; i<ii; ++i) {
             tileData[i].tile.draw();
         }
     },
     
     addTile: function(bounds, position) {
         var tile = new this.tileClass(
             this, position, bounds, null, this.tileSize, this.tileOptions
         );
         tile.events.register("beforedraw", this, this.queueTileDraw);
         return tile;
     },
     /**
      * FIN METODOS DE GRID.js DE OL
      */

    CLASS_NAME: "Mapea.Layer.WMS"
});

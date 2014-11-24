/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control/PanZoom.js
 */

/**
 * Class: OpenLayers.Control.PanZoomBar
 *
 * Inherits from:
 *  - <OpenLayers.Control.PanZoom>
 */
Mapea.Control.PanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoomBar, {
   
	/** 
    * Method: _addZoomBar
    * 
    * Parameters:
    * location - {<OpenLayers.Pixel>} where zoombar drawing is to start.
    */
    _addZoomBar:function(centered) {
        var sliderImgLocation = Mapea.global.THEME_IMG_PATH + "slider.png";
        var id = this.id + "_" + this.map.id;
        var zoomsToEnd = this.map.getNumZoomLevels() - 1 - this.map.getZoom();
        var slider = OpenLayers.Util.createAlphaImageDiv(id,
                       centered.add(-1, zoomsToEnd * this.zoomStopHeight), 
                       {w: 20, h: 9},
                       sliderImgLocation,
                       "absolute");
        slider.style.cursor = "move";
        
        //HTML5 PATCH
        $(slider).find("img").css("position", "inherit");
        
        this.slider = slider;
        
        this.sliderEvents = new OpenLayers.Events(this, slider, null, true,
                                            {includeXY: true});
        this.sliderEvents.on({
            "touchstart": this.zoomBarDown,
            "touchmove": this.zoomBarDrag,
            "touchend": this.zoomBarUp,
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp
        });
        
        var sz = {
            w: this.zoomStopWidth,
            h: this.zoomStopHeight * this.map.getNumZoomLevels()
        };

        var barImgLocation = Mapea.global.THEME_IMG_PATH + "zoombar.png";
        sliderImgLocation
        var div = null;
        
        if (OpenLayers.Util.alphaHack()) {
            var id = this.id + "_" + this.map.id;
            div = OpenLayers.Util.createAlphaImageDiv(id, centered,
                                      {w: sz.w, h: this.zoomStopHeight},
                                      barImgLocation,
                                      "absolute", null, "crop");
            div.style.height = sz.h + "px";
        } else {
            div = OpenLayers.Util.createDiv(
                        'OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id,
                        centered,
                        sz,
                        barImgLocation);
        }
        div.style.cursor = "pointer";
        div.className = "olButton";
        this.zoombarDiv = div;
        
        this.div.appendChild(div);

        this.startTop = parseInt(div.style.top);
        this.div.appendChild(slider);

        this.map.events.register("zoomend", this, this.moveZoomBar);

        centered = centered.add(0, 
            this.zoomStopHeight * this.map.getNumZoomLevels());
        return centered; 
    },
    
    /**
     * _addButton with mapea styles
     */
    _addButton:function(id, img, xy, sz) {
        //var imgLocation = OpenLayers.Util.getImageLocation(img);
        var imgLocation = Mapea.global.THEME_IMG_PATH + img; //getThemePatch instead of getImagesLocation
        
        var btn = OpenLayers.Util.createAlphaImageDiv(
                                    this.id + "_" + id, 
                                    xy, sz, imgLocation, "absolute");
        btn.style.cursor = "pointer";
        //we want to add the outer div
        this.div.appendChild(btn);
        btn.action = id;
        btn.className = "olButton";
    
        //we want to remember/reference the outer div
        this.buttons.push(btn);
        return btn;
    },
    
    /**
     * Method: draw 
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>} 
     */
     draw: function(px) {
         var returnedDiv = OpenLayers.Control.PanZoomBar.prototype.draw.apply(this, arguments);
         Mapea.Util.resizeAllPanels(this.map);
         return returnedDiv;
     },
    
    CLASS_NAME: "Mapea.Control.PanZoomBar"
});
 
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Control/PanZoom.js
 */

/**
 * Class: OpenLayers.Control.PanZoom
 *
 * Inherits from:
 *  - <OpenLayers.Control.PanZoom>
 */
Mapea.Control.PanZoom = OpenLayers.Class(OpenLayers.Control.PanZoom, {

    /**
     * _addButton ACTUALIZADO DEL PANZOOM.js OLv2.12
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
     * --------------------------------------------
     */

    /**
     * Method: buttonDown
     *
     * Parameters:
     * evt - {Event}
     */
    buttonDown: function (evt) {
        if (!OpenLayers.Event.isLeftClick(evt)) {
            return;
        }

        switch (this.action) {
            case "panup":
                this.map.pan(0, -this.getSlideFactor("h"));
                break;
            case "pandown":
                this.map.pan(0, this.getSlideFactor("h"));
                break;
            case "panleft":
                this.map.pan(-this.getSlideFactor("w"), 0);
                break;
            case "panright":
                this.map.pan(this.getSlideFactor("w"), 0);
                break;
            case "zoomin":
                this.map.zoomIn();
                break;
            case "zoomout":
                this.map.zoomOut();
                break;
            case "zoomworld":
                this.map.zoomToMaxExtent();
                break;
        }

        OpenLayers.Event.stop(evt);
    },

    CLASS_NAME: "Mapea.Control.PanZoom"
});

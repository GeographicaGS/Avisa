/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/** 
 * @requires OpenLayers/Control/LayerSwitcher.js
 */

 /**
 * Class: Mapea.Control.LayerSwitcher
 * Create an layer switcher to display the map's layers and symbols for each layer.
 *    Create a new layer switcher map with the <Mapea.Control.LayerSwitcher> 
 *    constructor.
 *
 * Inerits from:
 *  - <OpenLayers.Control.LayerSwitcher>
 */
Mapea.Control.LayerSwitcher = OpenLayers.Class(OpenLayers.Control.LayerSwitcher, {
    /**
    * {HTMLDOM}
    * Element to divide base layers
    * from other layers
    */
    layerDivider : null,

    /**  
    * Property: activeColor
    * {String}
    */
    activeColor: "transparent",

    map : null,
    
    /**
    * Constructor: OpenLayers.Control.LayerSwitcher
    * 
    * Parameters:
    * options - {Object}
    */
    initialize: function(options) {    
        OpenLayers.Control.LayerSwitcher.prototype.initialize.apply(this, arguments);
        this.layerStates = [];
        
    },
    
     /** 
     * Method: registerEvents
     * Registers events on the popup.
     *
     * Do this in a separate function so that subclasses can 
     *   choose to override it if they wish to deal differently
     *   with mouse events
     * 
     *   Note in the following handler functions that some special
     *    care is needed to deal correctly with mousing and popups. 
     *   
     *   Because the user might select the zoom-rectangle option and
     *    then drag it over a popup, we need a safe way to allow the
     *    mousemove and mouseup events to pass through the popup when
     *    they are initiated from outside. The same procedure is needed for
     *    touchmove and touchend events.
     * 
     *   Otherwise, we want to essentially kill the event propagation
     *    for all other events, though we have to do so carefully, 
     *    without disabling basic html functionality, like clicking on 
     *    hyperlinks or drag-selecting text.
     */
     registerEvents:function() {
        this.events = new OpenLayers.Events(this, this.div, null, true);
        
        var ignoreEvent = function (evt) {
            OpenLayers.Event.stop(evt, true);
        };
        this.events.on({
            "touchstart": ignoreEvent,
            "touchmove": ignoreEvent,
            scope: this
        });
        
     },
    
    /**
     * loadContent heredado de OpenLayers 2.12
     */
    loadContents: function() {

        // configure main div
        OpenLayers.Element.addClass(this.div, "mapea-layerswitcher");

        // layers list div         
        this.layersDiv = document.createElement("div");
        this.layersDiv.id = this.id + "_LayersDiv";
        OpenLayers.Element.addClass(this.layersDiv, "mapea-layerswitcher-layerdiv");
        OpenLayers.Element.addClass(this.layersDiv, "minimized");
        (Mapea.Util.isMobile && OpenLayers.Element.addClass(this.layersDiv, "mobile"));

        // base label
        this.baseLbl = document.createElement("div");
        this.baseLbl.innerHTML = OpenLayers.i18n("Capas base");
        OpenLayers.Element.addClass(this.baseLbl, "mapea-layerswitcher-baselbl");

        // base layers
        this.baseLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.baseLayersDiv, "mapea-layerswitcher-baselayers");

        // data label
        this.dataLbl = document.createElement("div");
        this.dataLbl.innerHTML = OpenLayers.i18n("Otras capas");
        OpenLayers.Element.addClass(this.dataLbl, "mapea-layerswitcher-datalbl");
        
        // data layers
        this.dataLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.dataLayersDiv, "mapea-layerswitcher-datalayers");
        
        // ul divider
        this.layerDivider = document.createElement("ul");
        var divider = document.createElement("li");
        OpenLayers.Element.addClass(divider, "divider");
        this.layerDivider.appendChild(divider);

        if (this.ascending) {
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
            this.layersDiv.appendChild(this.layerDivider);
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
        } else {
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
        }    
 
        this.div.appendChild(this.layersDiv);
        
        // maximize button div
        this.maximizeDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.maximizeDiv, "mapea-layerswitcher-maximize");
        // img
        var maximizeImg = Mapea.Util.createImagen("blank.gif", "Mapea_Control_MaximizeDiv");
        maximizeImg.style.margin = "";
        this.maximizeDiv.appendChild(maximizeImg);
        // events
        OpenLayers.Event.observe(this.maximizeDiv, "mouseover", 
                OpenLayers.Function.bindAsEventListener(this.maximizeControl, this));
        OpenLayers.Event.observe(this.layersDiv, "mouseout", 
                OpenLayers.Function.bindAsEventListener(this.minimizeControl, this));
        
        if (Mapea.Util.isMobile) {
            OpenLayers.Event.observe(this.maximizeDiv, "touchend", 
                    OpenLayers.Function.bindAsEventListener(this.maximizeControl, this));
            OpenLayers.Event.observe(this.map.div, "touchend", 
                OpenLayers.Function.bindAsEventListener(this.minimizeControl, this));
        }
        // add into main div
        this.div.appendChild(this.maximizeDiv);

        // minimize button div
        this.minimizeDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.minimizeDiv, "mapea-layerswitcher-minimize");
        this.div.appendChild(this.minimizeDiv);
        
        this.registerEvents();
    },

    /** 
     * Method: minimizeControl
     * Hide all the contents of the control, shrink the size, 
     *     add the maximize icon
     *
     * Parameters:
     * e - {Event} 
     */
    minimizeControl : function(event) {
        if (event)
        {
            var e = event.toElement || event.relatedTarget || event.target || event.srcElement;
            
            var isFromLayerswitcher = jQuery(e).attr("fromlayerswitcher");
            
            if (e && ((e.parentNode == this.layersDiv) || (e == this.layersDiv)
                || (e.parentNode == this.baseLayersDiv) || (e == this.baseLayersDiv)
                || (e.parentNode == this.dataLayersDiv) || (e == this.dataLayersDiv)
                || (e.parentNode == this.layerDivider) || (e == this.layerDivider))
                || isFromLayerswitcher)
            {
               return true;
            }
        }
        OpenLayers.Control.LayerSwitcher.prototype.minimizeControl.apply(this, arguments);
    },
    
    /**
     * Method: showControls
     * Hide/Show all LayerSwitcher controls depending on whether we are
     *     minimized or not
     * 
     * Parameters:
     * minimize - {Boolean}
     */
    showControls: function(minimize) {

        this.maximizeDiv.style.display = minimize ? "" : "none";
        this.minimizeDiv.style.display = minimize ? "none" : "";
        var mapHeight = $(this.map.viewPortDiv).height();
        
        var ratio = (mapHeight < 450)? 0.85 : 0.75;  
        
        var h =  minimize? 0 : (mapHeight * ratio);
        jQuery(this.layersDiv).css("height", h);
        
        if (minimize) {
            OpenLayers.Element.addClass(this.layersDiv, "minimized");
        }
        else {
            OpenLayers.Element.removeClass(this.layersDiv, "minimized");
            if (jQuery.browser.msie) {
                jQuery(this.div).css("width", "20em");
            }
        }
        
//      var w =  minimize? 0 : "auto";
//      jQuery(this.layersDiv).css("width", w);
    },
    
    /** 
    * Method: redraw
    * Goes through and takes the current state of the Map and rebuilds the
    *     control to display that state. Groups base layers into a 
    *     radio-button group, lists each data layer with a checkbox and lists
    *     symbols for each layer.
    *
    * Returns: 
    * {DOMElement} A reference to the DIV DOMElement containing the control
    */  
    redraw: function() {
        //if the state hasn't changed since last redraw, no need 
        // to do anything. Just return the existing div.
        if (!this.checkRedraw()) { 
            return this.div; 
        } 

        //clear out previous layers 
        this.clearLayersArray("base");
        this.clearLayersArray("data");
        
        var containsOverlays = false;
        var containsBaseLayers = false;
        
        // Save state -- for checking layer if the map state changed.
        // We save this before redrawing, because in the process of redrawing
        // we will trigger more visibility changes, and we want to not redraw
        // and enter an infinite loop.
        this.layerStates = new Array(this.map.layers.length);
              
        for (var i = 0; i < this.map.layers.length; i++) {
            var layer = this.map.layers[i];
            this.layerStates[i] = {
                'name': layer.name, 
                'visibility': layer.visibility,
                'inRange': layer.inRange,
                'id': layer.id
            };
        }    

        var layers = this.map.layers.slice();
        if (!this.ascending) { layers.reverse(); }
         
        for( var i = 0; i < layers.length; i++) {
            var addImageInput = true;
            var imgLegend = document.createElement("img");
            var layer = layers[i];
            var baseLayer = layer.isBaseLayer;

            if (layer.displayInLayerSwitcher) {

                if (baseLayer) {
                    containsBaseLayers = true;
                    addImageInput = false;
                }
                else {
                    containsOverlays = true;
                }    

                // only check a baselayer if it is *the* baselayer, check data
                //  layers if they are visible
                var checked = (baseLayer) ? (layer == this.map.baseLayer)
                                          : layer.getVisibility();
    
                // create input element
                var inputElem;
                if (!baseLayer && Mapea.Util.isMobile) {
                    inputElem = document.createElement("div");
                    OpenLayers.Element.addClass(inputElem, "checkbox");
                }
                else {
                    inputElem = document.createElement("input");
                    inputElem.type = (baseLayer) ? "radio" : "checkbox";
                }
                
                inputElem.id = "input_" + layer.name;
                inputElem.name = (baseLayer) ? "baseLayers" : layer.name;
                inputElem.value = layer.name;
                jQuery(inputElem).attr("fromlayerswitcher", true);
                inputElem.checked = checked;
                inputElem.defaultChecked = checked;
                if (Mapea.Util.isMobile && !baseLayer && checked)
                    OpenLayers.Element.addClass(inputElem, "checked");

                if (!baseLayer && !layer.inRange) {
                    inputElem.disabled = true;
                    if (Mapea.Util.isMobile)
                        OpenLayers.Element.addClass(inputElem, "disabled");
                }
                var context = {
                    'inputElem': inputElem,
                    'layer': layer,
                    'layerSwitcher': this,
                    'imgLegend': imgLegend
                };
                OpenLayers.Event.observe(inputElem, "click", 
                    OpenLayers.Function.bindAsEventListener(this.onInputClick, context));
                if (Mapea.Util.isMobile) {
                    OpenLayers.Event.observe(inputElem, "touchend", 
                            OpenLayers.Function.bindAsEventListener(this.onInputClick, context));
                }
                
                 // AGG LOAD_SYMBOL_LAYER_20100712
                 OpenLayers.Event.observe(imgLegend, "error",
                   OpenLayers.Function.bind(this.onLegendImgError, context));      
                
                
                // create span
                var labelSpan = document.createElement("span");
                jQuery(labelSpan).attr("fromlayerswitcher", true);
                if (!baseLayer && !layer.inRange) {
                    OpenLayers.Element.addClass(labelSpan, "disabled");
                }
                labelSpan.innerHTML = layer.name;
                labelSpan.style.verticalAlign = (baseLayer) ? "bottom" 
                                                            : "baseline";
                OpenLayers.Event.observe(labelSpan, "click", 
                    OpenLayers.Function.bindAsEventListener(this.onInputClick, context));
                if (Mapea.Util.isMobile) {
                    OpenLayers.Event.observe(labelSpan, "touchend", 
                            OpenLayers.Function.bindAsEventListener(this.onInputClick, context));
                }
                
                // create line break
                var br = document.createElement("br");

                // AGG LOAD_SYMBOL_LAYER_20100712
                if (!Mapea.Util.isWFS(layer)) {
                    // MDRC LOAD_SYMBOL_LAYER_20081006
                    if (layer.params) {
                       if (layer.params.ISWMC && layer.params.LAYERLEGEND) {
                            imgLegend = document.createElement("img");
                            imgLegend.id = "img_" + layer.name;
                            imgLegend.src = layer.params.LAYERLEGEND.href;
                       }
                       else if (layer.params.ISWMC) {
                            imgLegend = document.createElement("img");
                            imgLegend.id = "img_" + layer.name;
                            imgLegend.src = Mapea.global.THEME_BLANK_IMG_PATH;
                       }
                       else {
                            var legendGraphicURL = layer.getFullRequestString({
                                REQUEST: "GetLegendGraphic",
                                LAYER: layer.params.LAYERS,
                                FORMAT: "image/png",
                                EXCEPTIONS: "application/vnd.ogc.se_xml",
                                WIDTH: "150"});
                            imgLegend = document.createElement("img");
                            imgLegend.id = "img_" + layer.name;
                            imgLegend.src = legendGraphicURL;
                       }
                    }
                    else {
                        addImageInput = false;
                    }
                }
                else {
                    addImageInput = false;
                }
                
                var groupDiv = (baseLayer) ? this.baseLayersDiv
                                           : this.dataLayersDiv;
                
                groupDiv.appendChild(inputElem);
                groupDiv.appendChild(labelSpan);

                groupDiv.appendChild(br);
                
                var groupArray = (baseLayer) ? this.baseLayers
                        : this.dataLayers;
                
                // AGG LOAD_SYMBOL_LAYER_20100712
                if (addImageInput) {
                    groupDiv.appendChild(imgLegend);
                    var br2 = document.createElement("br");
                    groupDiv.appendChild(br2);
                    groupArray.push({
                        'layer': layer,
                        'inputElem': inputElem,
                        'labelSpan': labelSpan,
                        'imgLegend': imgLegend
                    });
                }
                else {
                    groupArray.push({
                        'layer': layer,
                        'inputElem': inputElem,
                        'labelSpan': labelSpan
                    });
                }
            }
        }

        // if no overlays, dont display the overlay label
        this.dataLbl.style.display = (containsOverlays) ? "" : "none";        
        
        // if no baselayers, dont display the baselayer label
        this.baseLbl.style.display = (containsBaseLayers) ? "" : "none";
        
        // if no baselayers or overlays, dont display the divider
        this.layerDivider.style.display = (containsBaseLayers && containsOverlays) ? "" : "none";

        return this.div;
    },
    
    
    onLegendImgError: function(e) {
           
            this.imgLegend.src = Mapea.global.THEME_BLANK_IMG_PATH;
            OpenLayers.Event.stop(e);       
    },
         
         
    // When change baselayer set layer projection,extent and units
    onInputClick: function(e) {
        if (!this.inputElem.disabled) {
            if (this.inputElem.type == "radio") {
                this.inputElem.checked = true;
                var newBase = this.layer;
                var map = this.layer.map;
                newBase.projection= map.baseLayer.projection;
                newBase.maxExtent = map.baseLayer.maxExtent;
                newBase.units = map.baseLayer.units;
                
                this.layer.map.setBaseLayer(newBase);
            } else {
                if (Mapea.Util.isMobile)
                {
                    var checked = this.inputElem.checked;
                    
                    (checked)? OpenLayers.Element.removeClass(this.inputElem, "checked")
                             : OpenLayers.Element.addClass(this.inputElem, "checked");
                    
                    this.inputElem.checked = !this.inputElem.checked;
                }       
                this.layerSwitcher.updateMap();
            }
            
            if (Mapea.Util.isMobile) {
                this.layer.map.checkMobileLayerLimit(this.layer);
            }
        }
        OpenLayers.Event.stop(e);
    },
    
    /**
     * APIMethod: destroy 
     */    
    destroy: function() {
        this.layerDivider = null;

        this.activeColor = null;

        this.activatedControlsIdx.length = 0;
        OpenLayers.Control.LayerSwitcher.prototype.destroy.apply(this, arguments);
    },
    
    CLASS_NAME: "Mapea.Control.LayerSwitcher"
});
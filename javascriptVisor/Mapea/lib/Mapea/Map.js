/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Map.js
 */

/**
 * Class: Mapea.Map
 * Instances of Mapea.Map are interactive maps embedded in a web page.
 * Create a new map with the <Mapea.Map> constructor.
 * 
 * On their own maps do not provide much functionality.  To extend a map
 * it's necessary to add controls (<OpenLayers.Control>) and 
 * layers (<OpenLayers.Layer>) to the map. 
 *
 * Inherits from:
 *  - <OpenLayers.Map>
 */
Mapea.Map = OpenLayers.Class(OpenLayers.Map, {
    
    maxZIndex : 0,

    externalLayers : [],
    
    initalContext : null,

    nLayersMobile : null,
    
    leftPanel : null,

    rightPanel : null,

    auxLayer : null,
    
    lastPopupPosition : null,
    
    geosearchUrl: null,

    parameters : [],

    theme : null,

    uniqueSelectFeatureCtrl : null,
    
    /**
     * This flag is used to check if the user is editing
     * a feature to avoid the refresh map
     */
    editingFeature: false,
    
    /**
     * Constructor: Mapea.Map
     * Constructor for a new Mapea.Map instance.
     *
     * Parameters:
     * div - {String} Id of an element in your page that will contain the map.
     * options - {Object} Optional object with properties to tag onto the map.
     *
     * Examples:
     * (code)
     * // create a map with default options in an element with the id "map1"
     * var map = new Mapea.Map("map1");
     *
     * // create a map with non-default options in an element with id "map2"
     * var options = {
     *     maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * };
     * var map = new Mapea.Map("map2", options);
     * (end)
     */    
    initialize: function (div, options) {

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new OpenLayers.Size(Mapea.Map.TILE_WIDTH,
                                            Mapea.Map.TILE_HEIGHT);
        
        this.maxExtent = new OpenLayers.Bounds(-180, -90, 180, 90);
        
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
        
        // now override default options 
        OpenLayers.Util.extend(this, options);

        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");

        this.div = OpenLayers.Util.getElement(div);

        // the viewPortDiv is the outermost div we modify
        var id = this.div.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        
        this.events = new OpenLayers.Events(
           this, this.viewPortDiv, null, this.fallThrough, 
           {includeXY: true}
        );
        
        // the layerContainerDiv is the one that holds all the layers
        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.width = '100px';
        this.layerContainerDiv.style.height = '100px';
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        
        this.viewPortDiv.appendChild(this.layerContainerDiv);

        this.events = new OpenLayers.Events(this, 
                                            this.div, 
                                            this.EVENT_TYPES, 
                                            this.fallThrough);
        this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
 
        // update the map size and location before the map moves
        /* LOW EFFICIENCY
        this.events.register("movestart", this, this.updateSize);*/

        // Because Mozilla does not support the "resize" event for elements 
        // other than "window", we need to put a hack here. 
        if (OpenLayers.String.contains(navigator.appName, "Microsoft")) {
            // If IE, register the resize on the div
            this.events.register("resize", this, this.updateSize);
        } else {
            // Else updateSize on catching the window's resize
            //  Note that this is ok, as updateSize() does nothing if the 
            //  map's size has not actually changed.
            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this);
            OpenLayers.Event.observe(window, 'resize', this.updateSizeDestroy);
        }
        
        this.layers = [];
        
        if (this.controls == null) {
            if (OpenLayers.Control != null) { // running full or lite?
                this.controls = [ new OpenLayers.Control.Navigation(),
                                  new OpenLayers.Control.PanZoom(),
                                  new OpenLayers.Control.ArgParser(),
                                  new OpenLayers.Control.Attribution()
                                ];
            } else {
                this.controls = [];
            }
        }

        for(var i=0; i < this.controls.length; i++) {
            this.addControlToMap(this.controls[i]);
        }

        this.popups = [];

        // unique select feature control to manage vector layers features
        this.uniqueSelectFeatureCtrl = new Mapea.Control.UniqueSelectFeature([],
            {
                clickTolerance: (Mapea.Util.isMobile? 10 : 100),
                disableMouseDown: !Mapea.Util.isMobile,
                ratio : 2
            });
        this.addControls(this.uniqueSelectFeatureCtrl);
        this.uniqueSelectFeatureCtrl.setMap(this);
        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        
        // always call map.destroy()
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        
        /*
         * if it's a mobile device we check
         * the number of loaded layers 
         */
        if (Mapea.Util.isMobile)
        {
            this.events.on({
                zoomend: this.checkMobileLayerLimit,
                scope: this
            });
        }
    },
    
    /**
     * APIMethod: updateSize
     * This function should be called by any external code which dynamically
     *     changes the size of the map div (because mozilla wont let us catch 
     *     the "onresize" for an element)
     */
    updateSize: function() {
        /*
         * Issue mobile: if the user is editing a feature and
         * there is some popup opened
         * we do not refresh the map size
         */
        if ( !this.isEditingFeature() ) {
            // the div might have moved on the page, also
            var newSize = this.getCurrentSize();
            if (newSize && !isNaN(newSize.h) && !isNaN(newSize.w)) {
                this.events.clearMouseCache();
                var oldSize = this.getSize();
                if (oldSize == null) {
                    this.size = oldSize = newSize;
                }
                if (!newSize.equals(oldSize)) {
                    
                    // store the new size
                    this.size = newSize;
        
                    //notify layers of mapresize
                    for(var i=0, len=this.layers.length; i<len; i++) {
                        this.layers[i].onMapResize();                
                    }
        
                    var center = this.getCachedCenter();
        
                    if (this.baseLayer != null && center != null) {
                        var zoom = this.getZoom();
                        this.zoom = null;
                        this.setCenter(center, zoom);
                    }
        
                }
            }
            Mapea.Util.resizeAllPanels(this);
        }
        
    },
    
    /**
     * APIMethod: addControl
     * Add the passed over control to the map. Optionally 
     *     position the control at the given pixel.
     * 
     * Parameters:
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     */    
    addControl: function (control, px) {
//        /*
//         * Add the control If it is not a panel control
//         * and if it was not already added.         * 
//         */
//      if (control && control.CLASS_NAME)
//      {
//          var className = control.CLASS_NAME;
//          if (!/(Mapea|OpenLayers)\.Control\.Panel/i.test(className))
//          {
//              if (this.getControlsByClass(className).length > 0)
//                  return false;
//          }
//      }
        
        this.controls.push(control);
        this.addControlToMap(control, px);
    },

    /**
    * APIMethod: addLayers 
    *
    * Parameters:
    * layers - {Array(<OpenLayers.Layer>)}
    * external - {boolean} 
    */    
    addLayers: function (layers, external) {
        for (var i=0, len=layers.length; i<len; i++) {
            this.addLayer(layers[i], external);
        }
    },
    
    /**
     * APIMethod: addLayer
     *
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * external - {boolean}
     *
     * Returns:
     * {Boolean} True if the layer has been added to the map.
     * 
     * Mapea: check the limit layers if it is
     * a mobile device   
     */    
     addLayer: function (layer, external) {
         OpenLayers.Map.prototype.addLayer.apply(this, arguments);
         (Mapea.Util.isMobile && this.checkMobileLayerLimit());
         if (external == true)
         {
            this.externalLayers.push(layer);
         }
         this.recalculateMaxZIndex();
     },

     /** 
     * APIMethod: removeLayer
     * Removes a layer from the map by removing its visual element (the 
     *   layer.div property), then removing it from the map's internal list 
     *   of layers, setting the layer's map property to null. 
     * 
     *   a "removelayer" event is triggered.
     * 
     *   very worthy of mention is that simply removing a layer from a map
     *   will not cause the removal of any popups which may have been created
     *   by the layer. this is due to the fact that it was decided at some
     *   point that popups would not belong to layers. thus there is no way 
     *   for us to know here to which layer the popup belongs.
     *    
     *     A simple solution to this is simply to call destroy() on the layer.
     *     the default OpenLayers.Layer class's destroy() function
     *     automatically takes care to remove itself from whatever map it has
     *     been attached to. 
     * 
     *     The correct solution is for the layer itself to register an 
     *     event-handler on "removelayer" and when it is called, if it 
     *     recognizes itself as the layer being removed, then it cycles through
     *     its own personal list of popups, removing them from the map.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * setNewBaseLayer - {Boolean} Default is true
     */
    removeLayer: function(layer, setNewBaseLayer, external) {
        OpenLayers.Map.prototype.removeLayer.apply(this, arguments);
        if (external == true)
        {
            var idxLayerToRemove = -1;
            for (var i=0,len=this.externalLayers.length; i<len; i++)
            {
                var externalLayer = this.externalLayers[i];
                if (externalLayer.id == layer.id)
                {
                    idxLayerToRemove = i;
                    break;
                }
            }
            if (idxLayerToRemove > -1)
                this.externalLayers.splice(idxLayerToRemove, 1);
        }
        this.recalculateMaxZIndex();
    },
    
    /**
     * Method: addControlToMap
     * 
     * Parameters:
     * 
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     *
     * MAPEA: add the control into a panel
     * depending on the class name control.
     * If the control is the layerswitcher then
     * we put it out of main div
     */    
    addControlToMap: function (control, px) {
        // If a control doesn't have a div at this point, it belongs in the
        // viewport.
        control.outsideViewport = (control.div != null);
        
        // If the map has a displayProjection, and the control doesn't, set 
        // the display projection.
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }    
        
        control.setMap(this);
        var controlDiv = control.draw(px);
        if (controlDiv) {
            if(!control.outsideViewport)
            {
                controlDiv.style.zIndex = this.Z_INDEX_BASE['Control'] + this.controls.length;

                /*
                 * if the control is a panel or is NavToolBar
                 * remove the absolute position
                 */
                if (Mapea.Util.isPanel(control)
                        || /(\w*)\.Control\.NavToolBar/i.test(control.CLASS_NAME)) {
                    //TODO sin jquery
                    jQuery(controlDiv).css("position", "");
                }

                // get the panel for the control
                var panel = this.getControlPanel(control);
                if (panel) {
                    panel.appendChild( controlDiv );
                }
                else {
                    this.viewPortDiv.appendChild( controlDiv );
                }
            }
        }
        if(control.autoActivate) {
            control.activate();
        }

        if (control.autoActivate || controlDiv) {
            Mapea.Util.resizeAllPanels(this);
        }
    },

    /**
     * {Method} getControlPanel
     * Get the panel of the control if
     * it has one
     *
     * Left panel (controls):
     *  OpenLayers.Control.Panel --> MapeaMeasurePanel
     *  Mapea.Control.NavToolbar
     *  Mapea.Control.Panel --> MapeaGetFeatureInfo
     *
     * Right panel (controls):
     *  Mapea.Control.DrawFeature
     *  Mapea.Control.ModifyFeature
     *  Mapea.Control.DeleteFeature
     *  Mapea.Control.EditAttributeFeature
     */
    getControlPanel : function(control) {
        var panel;

        var leftPanelRegex = /(MapeaMeasurePanel|MapeaGetFeatureInfo)|((\w*)\.Control\.NavToolbar)/i;
        var rightPanelRegex = /customEditingToolbar/i;

        var ctrlClassName = Mapea.Util.isPanel(control)? control.displayClass : control.CLASS_NAME;
        if (leftPanelRegex.test(ctrlClassName)) {
            /* if it is the left panel then returns
             * its child */
            var leftPanel = this.getLeftPanel();
            panel = jQuery(leftPanel).find(".left-controls").get(0);
        }
        else if (rightPanelRegex.test(ctrlClassName)) {
            panel = this.getRightPanel();
        }

        return panel;
    },

    /**
     * {Method} getLeftPanel
     * Get the left panel or we create it if
     * it does not exist
     */
    getLeftPanel : function() {
        return this.leftPanel || this.createLeftPanel();
    },

    /**
     * {Method} getRightPanel
     * Get the right panel or we create it if
     * it does not exist
     */
    getRightPanel : function() {
        return this.rightPanel || this.createRightPanel("");
    },

    /**
     * {Method} createLeftPanel
     * Create the left panel and return it
     */
    createLeftPanel : function() {
        this.leftPanel = document.createElement("div");
        this.leftPanel.id = "MapeaLeftPanel_" + this.id;
        OpenLayers.Element.addClass(this.leftPanel, "left-panel");
        
        var closeOpenPanel = function(evt) {
            var isOpen = $(this.leftPanel).attr("open");
            var activeClassCSS = "MaximizeLeftBtnItemActive";
            var inactiveClassCSS = "MaximizeLeftBtnItemInactive";
            if (isOpen)
            {
                var marginLeftCss = $(this.leftPanel).attr("desplace");
                var marginLeftCss = parseInt(marginLeftCss);
                $(this.leftPanel).attr("open", false);
                $(this.leftPanel).css("margin-left", marginLeftCss);
                $(this.leftPanel).find("."+activeClassCSS)
                    .removeClass(activeClassCSS).addClass(inactiveClassCSS);
            }
            else
            {
                $(this.leftPanel).attr("open", true);
                $(this.leftPanel).css("margin-left", "0px");
                $(this.leftPanel).find("."+inactiveClassCSS)
                    .removeClass(inactiveClassCSS).addClass(activeClassCSS);
            }
            
            (evt && OpenLayers.Event.stop(evt));
        };
        
        var maximizeBtn = new OpenLayers.Control.Button({
            title:'Mostrar/olcultar herramientas',
            trigger: OpenLayers.Function.bindAsEventListener(closeOpenPanel, this),
            displayClass: 'maximizeButton MaximizeLeftBtn'
        });
        
        var maximizePanel = new OpenLayers.Control.Panel({
            id: 'maximizeLeftPanelId',
            displayClass: 'MaximizeLeftPanel'
        });
        maximizePanel.addControls([maximizeBtn]);
        this.addControl(maximizePanel);
        
        this.leftPanel.appendChild(maximizePanel.div);

        // controls container
        var controlsContainer = document.createElement("div");
        OpenLayers.Element.addClass(controlsContainer, "left-controls");
        this.leftPanel.appendChild(controlsContainer);
        
        this.viewPortDiv.appendChild( this.leftPanel );
        
        Mapea.Util.hasLeftPanel = true;
        
        // show the left tools by default
        maximizeBtn.trigger();
        
        return this.leftPanel;
    },

    /**
     * {Method} createRightPanel
     * Create the right panel and return it
     */
    createRightPanel : function() {
        this.rightPanel = document.createElement("div");
        this.rightPanel.id = "MapeaRightPanel_" + this.id;
        OpenLayers.Element.addClass(this.rightPanel, "right-panel");

        var closeOpenPanel = function(evt) {
            var isOpen = $(this.rightPanel).attr("open");
            var activeClassCSS = "MaximizeRightBtnItemActive";
            var inactiveClassCSS = "MaximizeRightBtnItemInactive";
            if (isOpen)
            {
                var marginRightCss = $(this.rightPanel).attr("desplace");
                marginRightCss = parseInt(marginRightCss);
                $(this.rightPanel).attr("open", false);
                $(this.rightPanel).css("margin-right", marginRightCss);
                if (Mapea.Util.hasContextsButton) {
                    $(".mapea-contexts-wrapper").css("right", "50px");
                }
                $(this.rightPanel).find("."+activeClassCSS)
                    .removeClass(activeClassCSS).addClass(inactiveClassCSS);
            }
            else
            {
                $(this.rightPanel).css("margin-right", "0px");
                $(this.rightPanel).attr("open", true);
                if (Mapea.Util.hasContextsButton)
                {
                    var maximizeIconWidth = $(".right-panel-maximize").width();
                    var rightPanelWidth = $(this.rightPanel).width();
                    var rightDefault = 50;
                    var rightCtxBtn = (rightPanelWidth - maximizeIconWidth) + rightDefault;
                    $(".mapea-contexts-wrapper").css("right", rightCtxBtn);
                }
                $(this.rightPanel).find("."+inactiveClassCSS)
                    .removeClass(inactiveClassCSS).addClass(activeClassCSS);
            }
            (evt && OpenLayers.Event.stop(evt));
        };

        var maximizeBtn = new OpenLayers.Control.Button({
            title:'Mostrar/olcultar herramientas de edición',
            trigger: OpenLayers.Function.bindAsEventListener(closeOpenPanel, this),
            displayClass: 'maximizeButton MaximizeRightBtn'
        });

        var maximizePanel = new OpenLayers.Control.Panel({
            id: 'maximizeRightPanelId',
            displayClass: 'MaximizeRightPanel'
        });
        maximizePanel.addControls([maximizeBtn]);
        this.addControl(maximizePanel);

        this.rightPanel.appendChild(maximizePanel.div);
        this.viewPortDiv.appendChild( this.rightPanel );
        
        Mapea.Util.hasRightPanel = true;

        return this.rightPanel;
    },
    
    /**
     * {Method} checkMobileLayerLimit
     * Limit the loaded layers on the map
     * functionOrEvent : funtion to execute
     * before show the popup
     */
    checkMobileLayerLimit : function(eventLayer) {
        if (!Mapea.Util.isMobile)
            return false;
        
        if (this.checkingLayersLimit)
            return true;
        
        var mobileLimit = this.nMobileLayers || window.nMobileLayers;
        
        if (mobileLimit) {
            // get the visible layers
            var showedLayers = this.getLayersBy('visibility', true);
            
            var kmlAllowed = true;
            var isShowedLayer = function(layerToCheck, noCheckSamelayer) {
                var IS_BASE_LAYER = layerToCheck.isBaseLayer;
                var IS_VISIBLE = (layerToCheck.inRange && layerToCheck.visibility);
                var IS_WMS_LAYER = /(\w+)\.Layer\.WMS/i.test(layerToCheck.CLASS_NAME);

                // quitamos los filtros para capas WFS ya que pensamos que no afecta al rendimiento
                /*var IS_WFS_LAYER = (/(\w+)\.Layer\.WFS/i.test(layerToCheck.CLASS_NAME)
                        && !layerToCheck.editable);*/
                var IS_WFS_LAYER = false;
                
                var isShowed = (IS_VISIBLE && !IS_BASE_LAYER && (IS_WMS_LAYER || IS_WFS_LAYER));

                // do we check if it was checked by the user?
                if (!noCheckSamelayer) {
                    // layer checked by the user
                    isShowed = isShowed && (!eventLayer || !eventLayer.CLASS_NAME || (eventLayer.id != layerToCheck.id));
                }
                
                return isShowed;
            };
            
            /*
             * check if the number layers is over the limit
             * and keep showing the layer selected by the user
             */ 
            var limit = (eventLayer && isShowedLayer(eventLayer, true))? 1 : 0;
            for (var i=0,len=showedLayers.length; i<len; i++) {
                var layer = showedLayers[i];
                if (isShowedLayer(layer)) {
                    if (limit >= mobileLimit) {
                        layer.setVisibility(false);
                    }
                    limit++;
                }   
            }
        }
    },
    
    /** 
     * Method: isEditingFeature
     * 
     * Checks if the user is editing a feature in a 
     * mobile device. That is, the user has clicked on
     * a feature (editingFeature == true), there is a
     * popup opened, the map has a EditAttributeFeature control
     * and the user is using a mobile device.
     */
    isEditingFeature: function() {
        var editing = false;
        
        editing = ( Mapea.Util.isMobile && this.editingFeature && (this.popups.length > 0) );
        editing = (editing && (this.getControlsByClass("Mapea.Control.EditAttributeFeature").length > 0)); 
        
        return editing;
    },
    
    /** 
     * Method: drawCenter
     * 
     * Centers the map and draws a feature at the position composed by
     * the coordinates especified by the user and creates a popup which shows
     * a message with the label especified by the user.
     */
    drawCenter : function(lon, lat, zoom, label, drawPinStr) {
        var drawPin = Mapea.Util.parseBoolean(drawPinStr);
        
        // center the map
        this.setCenter(new OpenLayers.LonLat(lon, lat), zoom);

        // remove previous center pins
        var auxLayer;
        if (this.hasAuxLayer()) {
            auxLayer = this._getAuxLayer();
            for (var i=0,len=auxLayer.features.length; i<len; i++) {
                var auxFeature = auxLayer.features[i];
                if (auxFeature.centerPin) {
                    this.removeFeature(auxFeature);
                }
            }
        }
        
        var styledFeature;
        // draw pin
        if (drawPin === true)
        {
            styledFeature = Mapea.Util.drawStyledFeature(lon, lat);
            styledFeature.centerPin = true;
            
            this.addFeature(styledFeature);
        }
                
        if (label)
        {
            label = OpenLayers.String.trim(label);
            if (label.length > 0)
            {
                /*
                 * if the pin was drawn then creates
                 * a SelectFeature control to manage user clicks
                 * over the center.
                 * Otherwise shows a simple popup.
                 */
                if (drawPin === true)
                {
                    var selectAuxFeatureCtrls = this.getControlsBy("id", "selectAuxFeature");
                    if (selectAuxFeatureCtrls.length == 0)
                    {
                        var labelCenter = this.getCenter(); 
                        var showLabelFn = OpenLayers.Function.bind(function() {
                            // gets the x and y of the click event
                            var clickedPixel = Mapea.Util.getClickedPixelFromEvent(window.event);
                            var mapPopup = Mapea.Util.getPopupInPixel(this, clickedPixel);
                            if (mapPopup) {
                                var htmlFinal = mapPopup.contentHTML;
                                htmlFinal += "<div class=\"popup-info-separator\">LABEL</div>";
                                htmlFinal += labelCenter;
                                
                                mapPopup.setContentHTML(htmlFinal);
                                mapPopup.setHeader('<div class="info-header">LABEL</div>');
                                mapPopup.show();
                            }
                            else {
                                mapPopup = new Mapea.Popup.FramedCloud("popup_feature",
                                        labelCenter, new OpenLayers.Size(100,50), label, null, true,
                                        function(evt) { 
                                            evt.feature = styledFeature;
                                            Mapea.Util.unselectFeature(evt);    
                                        });
                                mapPopup.setHeader('<div class="info-header">LABEL</div>');
                                mapPopup.pixelX = clickedPixel.x;
                                mapPopup.pixelY = clickedPixel.y;
                                this.addPopup(mapPopup);
                            }
                        }, this);
                        
                        this.auxLayer.events.register('featureselected', this, showLabelFn);
                        this.auxLayer.events.register('featureunselected', this, Mapea.Util.closePopup);
                        this.uniqueSelectFeatureCtrl.addLayers(this.auxLayer);
                        this.uniqueSelectFeatureCtrl.clickFeature(styledFeature);
                    }   
                }
                else
                {
                    var popup = new Mapea.Popup.FramedCloud("popup_feature",
                            this.getCenter(), new OpenLayers.Size(100,50),label, null, true);
                    this.addPopup(popup);
                }
            }
        }
    },
    
    
    removeFeature : function(feature) {
        this.removeFeatures([feature]);
    },
    
    removeFeatures : function(features) {
        this._getAuxLayer().removeFeatures(features);
    },
    
    addFeature : function(feature) {
        this.addFeatures([feature]);
    },
    
    addFeatures : function(features) {
        this._getAuxLayer().addFeatures(features);
    },
    
    hasAuxLayer : function() {
        return (this.auxLayer && (this.auxLayer != null));
    },
    
    _getAuxLayer : function() {
        if (!this.hasAuxLayer()) {
            this.auxLayer = new Mapea.Layer.Vector(Mapea.Map.VECTOR_LAYERS.AUX,
                    { displayInLayerSwitcher: false , ratio : 2});
            this.addLayer(this.auxLayer, true);
        }
        return this.auxLayer;
    },
    
    destroyAuxFeatures : function() {
        if (this.hasAuxLayer())
        {
            this.auxLayer.destroyFeatures();
            Mapea.Util.removeAllPopups(this);
        }
    },
    
    setLimitLayers : function(limit) {
        this.nMobileLayers = limit;
    },

    addParameter : function(parameter) {
        if (/Mapea\.Parameter\.Theme/i.test(parameter.CLASS_NAME)) {
            this.theme = parameter;
        }
        this.parameters.push(parameter);
        parameter.setMap(this);
    },

    addExternalLayers : function() {
        for (var i=0,len=this.externalLayers.length; i<len; i++)
        {
            var externalLayer = this.externalLayers[i];

            /*
             * do not indicate the layer is external
             * because it was added to externalLayers
             */
            this.addLayer(externalLayer);
        }
    },
    
    /**
     * APIMethod: destroy
     * Destroy this map.
     *    Note that if you are using an application which removes a container
     *    of the map from the DOM, you need to ensure that you destroy the
     *    map *before* this happens; otherwise, the page unload handler
     *    will fail because the DOM elements that map.destroy() wants
     *    to clean up will be gone. (See 
     *    http://trac.osgeo.org/openlayers/ticket/2277 for more information).
     *    This will apply to GeoExt and also to other applications which
     *    modify the DOM of the container of the OpenLayers Map.
     */
    destroy: function() {
        if (this.auxLayer != null) {
            // destroy auxiliar layer
            this.auxLayer.destroyFeatures();
            this.auxLayer.destroy();
        }

        // destroy panels
        if (this.leftPanel != null)
            OpenLayers.Element.remove(this.leftPanel);
        
        if (this.rightPanel != null)
            OpenLayers.Element.remove(this.rightPanel);

        // destroy attributes
        this.externalLayers.length = 0;
        this.initalContext = null,
        this.lastPopupPosition = null;

        OpenLayers.Map.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: setLayerZIndex
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * zIdx - {int} 
     */    
    setLayerZIndex: function (layer, zIdx) {
        var newZIndex;

        if (layer.zIndex) {
            newZIndex = layer.zIndex;
        }
        else {
            newZIndex = this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay'] + zIdx * 5 ;
        }
        layer.setZIndex(newZIndex);
        this.recalculateMaxZIndex();
    },

    /**
     * recalculates the maximum z-index
     * of all layers
     */
    recalculateMaxZIndex : function() {
        var maxZIndex = -1;
        for (var i=0, ilen = this.layers.length; i<ilen; i++) {
            var zIndex = this.layers[i].getZIndex();
            maxZIndex = Math.max(maxZIndex, zIndex);
        }
        this.maxZIndex = maxZIndex;
    },
    
    /** 
     * APIMethod: removePopup
     * 
     * Parameters:
     * popup - {<OpenLayers.Popup>}
     */
     removePopup: function(popup) {
         OpenLayers.Util.removeItem(this.popups, popup);
         if (popup.div) {
             var divContainer = this.layerContainerDiv;
             /* mobile devices it removes popup div from the parent
              * of the map div */
             if (Mapea.Util.isMobile) {
                 divContainer = this.div.parentNode;
             }
             try { divContainer.removeChild(popup.div); }
             catch (e) { } // Popups sometimes apparently get disconnected
                       // from the layerContainerDiv, and cause complaints.
         }
         popup.map = null;
     },
     
     
     /** 
      * APIMethod: pan
      * Allows user to pan by a value of screen pixels
      * 
      * Parameters:
      * dx - {Integer}
      * dy - {Integer}
      * options - {Object} Options to configure panning:
      *  - *animate* {Boolean} Use panTo instead of setCenter. Default is true.
      *  - *dragging* {Boolean} Call setCenter with dragging true.  Default is
      *    false.
      */
     pan: function(dx, dy, options) {
         Mapea.global.userPanned = true;
         OpenLayers.Map.prototype.pan.apply(this, arguments);
     },
    
    /** 
      * APIMethod: panTo
      * Allows user to pan to a new lonlat
      * If the new lonlat is in the current extent the map will slide smoothly
      * 
      * Parameters:
      * lonlat - {<OpenLayers.LonLat>}
      */
     panTo: function(lonlat) {
         if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
             if (!this.panTween) {
                 this.panTween = new OpenLayers.Tween(this.panMethod);
             }
             var center = this.getCachedCenter();

             // center will not change, don't do nothing
             if (lonlat.equals(center)) {
                 return;
             }

             var from = this.getPixelFromLonLat(center);
             var to = this.getPixelFromLonLat(lonlat);
             var vector = { x: to.x - from.x, y: to.y - from.y };
             var last = { x: 0, y: 0 };
             
             // reset user panned flag
             Mapea.global.userPanned = false;
             this.panTween.start( { x: 0, y: 0 }, vector, this.panDuration, {
                 callbacks: {
                     eachStep: OpenLayers.Function.bind(function(px) {
                         var x = px.x - last.x,
                             y = px.y - last.y;
                         this.moveByPx(x, y);
                         last.x = Math.round(px.x);
                         last.y = Math.round(px.y);
                     }, this),
                     done: OpenLayers.Function.bind(function(px) {
                         // if the user panned the map then cancel the center
                         if (!Mapea.global.userPanned) {
                             this.moveTo(lonlat);
                             this.dragging = false;
                             this.events.triggerEvent("moveend");
                         }
                     }, this)
                 }
             });
         }
         else {
             this.setCenter(lonlat);
         }
     },

    CLASS_NAME: "Mapea.Map"
});

/**
 * Constant: TILE_WIDTH
 * {Integer} 256 Default tile width (unless otherwise specified)
 */
Mapea.Map.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT
 * {Integer} 256 Default tile height (unless otherwise specified)
 */
Mapea.Map.TILE_HEIGHT = 256;
/**
 * Constant: VECTOR_LAYERS
 * {Object} Name of the default vector layers used in Mapea Map
 */
Mapea.Map.VECTOR_LAYERS = {"AUX" : "Capa auxiliar", "GPS": "gps"};
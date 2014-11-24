/**
 * Class: Mapea.Control.SearchByLocation
 * The Geolocate control wraps w3c geolocation API into control that can be
 * bound to a map, and generate events on location update
 *
 * To use this control requires to load the proj4js library if the projection
 * of the map is not EPSG:4326 or EPSG:900913.
 *
 * Inherits from:
 *  - <Mapea.Control.Geolocate>
 */
Mapea.Control.GeosearchByLocation = OpenLayers.Class(Mapea.Control.Geolocate, {
    
    /**
     * Property: geosearchLayer
     * {<Mapea.Layer.Geosearch>} Geosearch layer where execute
     * spatial searches
     */
    geosearchLayer : null,

    /**
     * Property: hiddenFields
     * {Array} Fields of the documen we want to hide
     */
    hiddenFields : ["_version_", "solrid", "keywords", "geom", "score"],

    /**
     * Property: geosearchParams
     * {Object} Parameters to send Geosearch service
     */
    geosearchParams : {
        q : '*:*',
        rows : 100,
        start : 0
    },
    
    /**
     * Property: geosearchUrl
     * {String} Url of the Geosearch service
     */
    geosearchUrl : null,

    /**
     * Property: spatialField
     * {String} Name of the spatail field
     */
    spatialField : "geom",

    /**
     * Property: distance
     * {Number} Radius of the shape which is used as spatial filter
     */
    distance : 300,
    
    /**
     * Property: wktReader
     * {<OpenLayers.Format.WKT>} WKT formated to read geometries
     */
    wktReader : null,
    
    /**
     * Property: locationButton
     * {<OpenLayers.Control.Button>} Button to activate/deactivate
     * the control
     */
    locationButton : null,
    
    /**
     * Property: showResultsButton
     * {<OpenLayers.Control.Button>} Button to show/hide the list results
     */
    showResultsButton : null,
    
    /**
     * Property: locationPanel
     * {<OpenLayers.Control.Panel>} Panel which contains the buttons
     */
    locationPanel : null,
    
    /**
     * Property: resultsDiv
     * {DOMElement} Div which wrapes the results
     */
    resultsDiv : null,
    
    /**
     * Property: resultsDiv
     * {DOMElement} Div which contains the head
     */
    resultsHeadDiv : null,

    /**
     * Property: resultsDiv
     * {DOMElement} Div which contains the results
     */
    resultsContentDiv : null,
    
    /**
     * Constructor: Mapea.Control.Geolocate
     * Creates an Mapea Control Geolocate.
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function (geosearchUrl, options) {
        this.geosearchUrl = geosearchUrl;
        
        if (!this.geosearchUrl) {
            throw "No se ha especificado la url de geobusquedas";
        }

        if (options.distance && !/\d+/.test(options.distance)) {
            throw "La distancia \"" + options.distance + "\" no es válida";
        }
        
        // read custom parameters
        var quoteIndex = geosearchUrl.indexOf("?");
        if (quoteIndex != -1) {
            var parameterString = geosearchUrl.substring(quoteIndex);
            var customParams = OpenLayers.Util.getParameters(parameterString);
            this.geosearchParams = OpenLayers.Util.applyDefaults(customParams, this.geosearchParams);
        }
        
        this.wktReader = new OpenLayers.Format.WKT();

        // calls super
        Mapea.Control.Geolocate.prototype.initialize.apply(this, [options]);
        OpenLayers.Util.extend(this, options);
    },

    /** 
     * Method: setMap
     * This method is executed when the control
     * has been added to the map
     *
     * Parameters:
     * map - {<OpenLayers.Map>} 
     */
    setMap: function(map) {
        // creates buttons and the panel
        // location button
        this.locationButton = new OpenLayers.Control.Button({
            title:'¿Qué hay cerca de mi posición?',
            eventListeners: {
                'activate': OpenLayers.Function.bind(this.activate, this),
                'deactivate': OpenLayers.Function.bind(this.deactivate, this)
            },
            displayClass: 'geosearchLocButton',
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        // show results button
        this.showResultsButton = new OpenLayers.Control.Button({
            title:'Mostrar lista de resultados',
            eventListeners: {
                'activate': OpenLayers.Function.bind(this.showResults, this),
                'deactivate': OpenLayers.Function.bind(this.hideResults, this)
            },
            displayClass: 'geosearchLocResultsButton',
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        
        // panel
        this.locationPanel = new OpenLayers.Control.Panel({
            id: 'geosearchbylocationPanelId',
            displayClass: 'geosearchLocPanel'
        });
        this.locationPanel.addControls([this.locationButton, this.showResultsButton]);
        
        // results div hide by default
        this.resultsDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.resultsDiv, "location-results");
        OpenLayers.Element.addClass(this.resultsDiv, "hide");
        
        this.resultsHeadDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.resultsHeadDiv, "head");
        if (Mapea.Util.isMobile) {
            OpenLayers.Element.addClass(this.resultsDiv, "mobile");
            OpenLayers.Event.observe(this.resultsHeadDiv, "touchend", 
                    OpenLayers.Function.bindAsEventListener(function(event){
                        this.showResultsButton.deactivate();
                        OpenLayers.Event.stop(event);
                        return false;
                    }, this));
        }
        else {
            // PC version adds close button
            var closeBtn = document.createElement("div");
            OpenLayers.Element.addClass(closeBtn, "close-btn");
            OpenLayers.Event.observe(closeBtn, "click", 
                    OpenLayers.Function.bindAsEventListener(function(event){
                        this.showResultsButton.deactivate();
                        OpenLayers.Event.stop(event);
                        return false;
                    }, this));
            this.resultsHeadDiv.appendChild(closeBtn);
        }
        
        // add head
        var backButton = document.createElement("div");
        OpenLayers.Element.addClass(backButton, "back");
        var headIcon = document.createElement("div");
        OpenLayers.Element.addClass(headIcon, "icon");
        var resultsText = document.createElement("div");
        OpenLayers.Element.addClass(resultsText, "text");
        resultsText.innerHTML = "Resultados";
        this.resultsHeadDiv.appendChild(backButton);
        this.resultsHeadDiv.appendChild(resultsText);
        this.resultsHeadDiv.appendChild(headIcon);

        this.resultsContentDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.resultsContentDiv, "content");

        // adds the panel to the map
        map.addControl(this.locationPanel);
        
        // adds the results div to the document
        this.resultsDiv.appendChild(this.resultsHeadDiv);
        this.resultsDiv.appendChild(this.resultsContentDiv);
        map.div.parentNode.appendChild(this.resultsDiv);

        // creates geosearch layer
        this.geosearchLayer = map.getLayersByClass("Mapea.Layer.Geosearch")[0];
        if (!this.geosearchLayer) {
            this.geosearchLayer = new Mapea.Layer.Geosearch({
                geosearchUrl: this.geosearchUrl,
                hiddenFields : this.hiddenFields
            }, {
                name: "Puntos de interés",
                referenceStyle : {display : "none"},
                areaStyle : {
                    fillColor: "#432FC6",
                    fillOpacity: 0.07,
                    hoverFillColor: "white",
                    hoverFillOpacity: 0.8,
                    strokeColor: "#280862",
                    strokeOpacity: 1,
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeDashstyle: "solid",
                    hoverStrokeColor: "red",
                    hoverStrokeOpacity: 1,
                    hoverStrokeWidth: 0.2,
                    pointRadius: 6,
                    hoverPointRadius: 1,
                    hoverPointUnit: "%",
                    pointerEvents: "visiblePainted",
                    cursor: "pointer",
                    fontColor: "#000000",
                    labelAlign: "cm",
                    labelOutlineColor: "white",
                    labelOutlineWidth: 3
                }
               });
            map.addLayer(this.geosearchLayer, true);
        }

        // calls super
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    
    /**
     * Method: deactivate
     * Deactivates the control.
     *
     * Returns:
     * {Boolean} The control was effectively deactivated.
     */
    deactivate : function() {
        this.showResultsButton.deactivate();
        this.geosearchLayer.clear();
        OpenLayers.Element.removeClass(this.showResultsButton.panel_div, "results");
        OpenLayers.Element.removeClass(this.locationButton.panel_div, "locating");
        return Mapea.Control.Geolocate.prototype.deactivate.apply(this, arguments);
    },
    
    /**
     * Method: onSuccess
     * This method is triggered when the geolocate
     * request has been completed successfuly
     *
     * Parameters:
     * event - {<OpenLayers.Event>} 
     */
    onSuccess : function(event) {
        // gets the WKT of the user location
        var coordinatesWKT = this.wktReader.extractGeometry(event.point);
        
        // remove previous geosearch results
        if (Mapea.Util.hasMobileGeosearchPanel
                || Mapea.Util.hasGeosearchPanel) {
            Mapea.Geosearch.CLEAR_BUTTON.click();
        }
        
        // calls geosearch by WKT
        var params = OpenLayers.Util.applyDefaults({
            sfield : this.spatialField,
            pt : coordinatesWKT,
            d : this.distance
        }, this.geosearchParams);
        this.geosearchLayer.search(params, OpenLayers.Function.bind(function(response) {
            this.onSearchSuccess(response, event);
        }, this),
        OpenLayers.Function.bind(this.onSearchError, this));
    },
    
    /**
     * Method: onError
     * This method is triggered if there was some
     * error while it was trying to execute the geolocate
     * request
     *
     * Parameters:
     * e - {<OpenLayers.Event>} 
     */
    onError : function(e) {
        this.locationButton.deactivate();
        Mapea.Util.showErrorMessage("No se ha podido obtener las coordenadas. Asegúrese de tener el GPS o la conexión a internet activa");
        this.errorCallback(e);
    },
    
    /**
     * Method: onSearchSuccess
     * This method is triggered when the geolocate
     * request has been completed successfuly
     *
     * Parameters:
     * response - {<solr response>} 
     */
    onSearchSuccess : function(response, event) {
        // gets the feature of the user location
        this.userFeature = Mapea.Util.drawStyledFeature(event.point.x,
                event.point.y, {x : event.point.x, y : event.point.y}, this.userLocationStyle);
        
        // popup header in mobile devices
        this.userFeature.attributes.keywords = ["Mi posición"];
        
        // removes all popups
        Mapea.Util.removeAllPopups(this.map);
        
        // checks if the layer has spatial results
        if (this.geosearchLayer.hasSpatialResults()) {
            // parse results
            var resultsHtml = "";
            var spatialFeatures = this.geosearchLayer.spatialFeatures;
            for ( var i = 0, ilen = spatialFeatures.length; i < ilen; i++) {
                var spatialFeature = spatialFeatures[i];
                if (spatialFeature.centerIcon) {
                    resultsHtml += Mapea.Geosearch.feature2Html(this.geosearchLayer, spatialFeature, false);
                }
            }
            jQuery(this.resultsContentDiv).html(resultsHtml);
            
            // attach events
            this.attachEventsToResults();
            
            // zoom to results
            var envolvedBbox = this.geosearchLayer.getResultsBbox();
            if (envolvedBbox && (envolvedBbox != null)) {
                this.map.zoomToExtent(envolvedBbox);
            }
        }
        else {
            /* if there were not spatial resuls then remove all features
             * and center on user location */
            this.geosearchLayer.clear();
            if (event) {
                var olCoordinates = new OpenLayers.LonLat(event.point.x, event.point.y);
                this.map.setCenter(olCoordinates, this.centerZoom);
            }
        }
        
        // show the results button
        OpenLayers.Element.addClass(this.showResultsButton.panel_div, "results");
        
        // adds the user location feature
        this.geosearchLayer.addFeatures([this.userFeature]);
        
        // hides loading gif
        OpenLayers.Element.removeClass(this.locationButton.panel_div, "locating");
    },
    
    /**
     * Method: onSearchError
     * This method is triggered if there was some
     * error while it was trying to execute the geolocate
     * request
     *
     * Parameters:
     * error - {Error} 
     */
    onSearchError : function(error) {
        this.locationButton.deactivate();
        Mapea.Util.showErrorMessage("Error al procesar la búsqueda por posición");
    },
    
    /**
     * Method: destroy
     * This method destroys this
     * object and all its attributes
     *
     */
    destroy: function() {
        // geolocation vector layer
        if(this.vectorLayer) {
            this.vectorLayer.removeAllFeatures();
            this.vectorLayer.destroy();
            this.map.removeLayer(this.vectorLayer, false);
        }
        
        // geosearch vector layer
        if(this.geosearchLayer) {
            this.geosearchLayer.removeAllFeatures();
            this.geosearchLayer.destroy();
            this.map.removeLayer(this.geosearchLayer, false);
        }
        OpenLayers.Control.Geolocate.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: showResults
     * This method shows the list results
     */
    showResults : function() {
        OpenLayers.Element.removeClass(this.resultsDiv, "hide");
        
        var headHeight = jQuery(this.resultsHeadDiv).outerHeight();
        var windowHeight = jQuery(window).height();
        var resultsDivHeight = (windowHeight*0.75) - headHeight;
        
        jQuery(this.resultsContentDiv).css("max-height", resultsDivHeight);
    },
    
    /**
     * Method: hideResults
     * This method hides the list results
     */
    hideResults : function() {
        jQuery(this.resultsContentDiv).css("max-height", 0);
        OpenLayers.Element.addClass(this.resultsDiv, "hide");
    },
    
    /**
     * Method: attachEventsToResults
     * TODO
     */
    attachEventsToResults : function() {
        var thisControl = this;
        jQuery(this.resultsContentDiv).children().each(function() {
            var obj = $(this);
            if (obj.attr("evtAdded") == null) {
                obj.attr("evtAdded", true);
                obj.click(function(e) {
                    e.preventDefault();

                    var featureId = $(this).children('#featureId').val();
                    var feature = thisControl.geosearchLayer.getFeatureById(featureId);

                    Mapea.Util.unselectAllFeatures(thisControl.map);
                    
                    thisControl.geosearchLayer.map.uniqueSelectFeatureCtrl.clickFeature(feature);
                    
                    if (feature.geomFeatureId) {
                        var geomFeature = thisControl.geosearchLayer.getFeatureById(feature.geomFeatureId);
                        thisControl.map.zoomToExtent(geomFeature.geometry.bounds);
                    }
                    
                    thisControl.showResultsButton.deactivate();
                });
            }
        });
    },

    CLASS_NAME: "Mapea.Control.GeosearchByLocation"
});
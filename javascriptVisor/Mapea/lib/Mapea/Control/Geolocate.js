/**
 * Class: Mapea.Control.Geolocate
 * The Geolocate control wraps w3c geolocation API into control that can be
 * bound to a map, and generate events on location update
 *
 * To use this control requires to load the proj4js library if the projection
 * of the map is not EPSG:4326 or EPSG:900913.
 *
 * Inherits from:
 *  - <OpenLayers.Control.Geolocate>
 */
Mapea.Control.Geolocate = OpenLayers.Class(OpenLayers.Control.Geolocate, {
    
    locationButton : null,

    locationPanel : null,

    centerZoom : 13,
    
    successCallback : OpenLayers.Function.Void,
    
    errorCallback : OpenLayers.Function.Void,
    
    uncapableCallback : OpenLayers.Function.Void,
    
    /**
     * Property: userLocationStyle
     * {Object} Style for user icon
     */
    userLocationStyle : Mapea.Util.userLocationStyle,
    
    /**
     * Property: userFeature
     * {<OpenLayers.Feature.Vector>} Feature for icon user
     * location
     */
    userFeature : null,
    
    /**
     * Constructor: Mapea.Control.Geolocate
     * Creates an Mapea Control Geolocate.
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function (options) {
        // calls super
        OpenLayers.Control.Geolocate.prototype.initialize.apply(this, arguments);
        OpenLayers.Util.extend(this, options);
        
        // registers events
        this.events.register("locationupdated", this, this.onSuccess);
        this.events.register("locationfailed", this, this.onError);
        this.events.register("locationuncapable", this, this.noSupport);
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
        // creates the button and the panel
        this.locationButton = new OpenLayers.Control.Button({
            title:'Mostrar mi ubicación',
            eventListeners: {
                'activate': OpenLayers.Function.bind(this.activate, this),
                'deactivate': OpenLayers.Function.bind(this.deactivate, this)
            },
            displayClass: 'locationButton',
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        this.locationPanel = new OpenLayers.Control.Panel({
            id: 'locationPanelId',
            displayClass: 'locationPanel'
        });
        this.locationPanel.addControls([this.locationButton]);

        // adds the panel to the map
        map.addControl(this.locationPanel);

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
        Mapea.Util.removeAllPopups(this.map);
        // removes previous user features
        if (this.userFeature) {
            this.map.removeFeature(this.userFeature);
        }
        
        // remove locating state and active state
        OpenLayers.Element.removeClass(this.locationButton.panel_div, "locating");
        OpenLayers.Element.removeClass(this.locationButton.panel_div,
                this.locationButton.displayClass.replace(/ /g, "") + "ItemActive");
        // add inactive state
        OpenLayers.Element.addClass(this.locationButton.panel_div,
                this.locationButton.displayClass.replace(/ /g, "") + "ItemInactive");
        this.locationButton.deactivate();
        return OpenLayers.Control.Geolocate.prototype.deactivate.apply(this, arguments);
    },
    
    /**
     * Method: activate
     * Activates the control.
     *
     * Returns:
     * {Boolean} The control was effectively activated.
     */
    activate : function() {
        OpenLayers.Element.addClass(this.locationButton.panel_div, "locating");
        return OpenLayers.Control.Geolocate.prototype.activate.apply(this, arguments);
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
        OpenLayers.Element.removeClass(this.locationButton.panel_div, "locating");

        // removes previous user features
        if (this.userFeature) {
            this.map.removeFeature(this.userFeature);
        }
        
        // gets the feature of the user location
        this.userFeature = Mapea.Util.drawStyledFeature(event.point.x,
                event.point.y, {x : event.point.x, y : event.point.y}, this.userLocationStyle);
        
        // popup header in mobile devices
        this.userFeature.attributes.keywords = ["Mi posición"];
        
        this.map.addFeature(this.userFeature);

        var olCoordinates = new OpenLayers.LonLat(event.point.x, event.point.y);
        this.map.setCenter(olCoordinates, this.centerZoom);
        
        this.successCallback();
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
        this.deactivate();
        Mapea.Util.showErrorMessage("No se ha podido obtener las coordenadas. Asegúrese de tener el GPS o la conexión a internet activa");
        this.errorCallback();
    },
    
     /**
     * Method: noSupport
     * This method is triggered if the browser
     * does not support the HTML5 feature
     *
     * Parameters:
     * e - {<OpenLayers.Event>} 
     */
    noSupport : function(e) {
        this.deactivate();
        Mapea.Util.showErrorMessage("Su navegador no soporta la funcionalidad de localización");
        this.uncapableCallback();
    },
    
    /**
     * Method: destroy
     * This method destroies this
     * object and all its attributes
     *
     */
    destroy: function() {
        OpenLayers.Control.Geolocate.prototype.destroy.apply(this, arguments);
    },

    CLASS_NAME: "Mapea.Control.Geolocate"
});
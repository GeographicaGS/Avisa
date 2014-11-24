/**
 * Class: Mapea.Parameter.Controls
 * This class wrappes the controls parameter to add a custom control
 * into the map
 *
 * Inherits from:
 *  - <Mapea.Parameter>
 */
Mapea.Parameter.Controls = OpenLayers.Class(Mapea.Parameter, {
    
    initialize: function(parameter) {
        Mapea.Parameter.prototype.initialize.apply(this, [parameter]);
    },
    
    applyDefault : function() {
        this.buildControls("panzoom");
    },

    applyParameter : function() {
        this.buildControls(this.parameter);
    },

    buildControls : function(controlParameter) {
        var controlsToEditionPanel = [];
        
        var controls;
        
        if (OpenLayers.Util.isArray(controlParameter))
            controls = controlParameter;
        else if ((typeof controlParameter) == "string")
            controls = controlParameter.split(",");

        for (var i=0, len=controls.length; i < len; i++)
        {
            var control = controls[i];
            control = (control || "").trim().toLowerCase();
            this.processControl(control, controlsToEditionPanel);
        }

        /*
         * If it is a mobile device we 
         * check if the navtoolbar control was
         * added. If it was not then we add the
         * Mapea.Control.TouchNavigation
         */
        if (Mapea.Util.isMobile &&
            (this.map.getControlsByClass("Mapea.Control.NavToolbar").length == 0))
        {
            this.map.addControl(new Mapea.Control.TouchNavigation({
                dragPanOptions: {enableKinetic: true}
            }));
            this.map.addControl(new OpenLayers.Control.Zoom());
        }
        
        this.buildEditionPanel(controlsToEditionPanel);

        if (!this.map.baseLayer) {
            Mapea.Util.showErrorMessage('No se ha especificado ninguna capa como baselayer');
        }
        else if (!this.isJSAPI) {
            this.map.zoomToMaxExtent();
        }
    },

    processControl : function(control, controlsToEditionPanel) {
        // disabled controls in mobile
        if (control == "panzoombar") {
            if (!Mapea.Util.isMobile) {
                this.map.addControl(new Mapea.Control.PanZoomBar());
            }
            
            // if panZoom control was added then remove it
            var panZoomCtrls = this.map.getControlsByClass("Mapea.Control.PanZoom");
            
            if (panZoomCtrls.length > 0) {
                var panZoomCtrl = panZoomCtrls[0];
                panZoomCtrl.deactivate();
                panZoomCtrl.destroy();
                this.map.removeControl(panZoomCtrl);
            }
        }
        else if (control == "panzoom") {
            if (!Mapea.Util.isMobile) {
                var panZoomCtrls = this.map.getControlsByClass("Mapea.Control.PanZoom");
                if (panZoomCtrls.length == 0) {
                    this.map.addControl(new Mapea.Control.PanZoom());
                }
            }
            // if panZoomBar control was added then remove it 
            var panZoomBarCtrls = this.map.getControlsByClass("Mapea.Control.PanZoomBar");
            if (panZoomBarCtrls.length > 0) {
                var panZoomBarCtrl = panZoomBarCtrls[0];
                panZoomBarCtrl.deactivate();
                panZoomBarCtrl.destroy();
                this.map.removeControl(panZoomBarCtrl);
            }
        }
        else if (control == "mouse") {
            if (!Mapea.Util.isMobile)
                this.map.addControl(new OpenLayers.Control.MousePosition());
        }
        else if (control == "overviewmap") {
            if (!Mapea.Util.isMobile)
                this.map.addControl(new Mapea.Control.OverviewMap({mapOptions: {projection: this.map.getProjection(), units: this.map.getUnits(), singleTile: true, maxExtent: this.map.getMaxExtent()}}));

        // enabled controls in mobile
        }
        else if (control == "layerswitcher") {
            this.map.addControl(new Mapea.Control.LayerSwitcher());     
        }
        else if (control == "navtoolbar") {
            this.map.addControl(new Mapea.Control.NavToolbar({displayClass:'olControlNavToolbar'}));
        }
        else if (control == "measurebar") {
            //TODO remove
            if (this.isJSAPI)
                createMeasurePanel_sigc(this.measureDiv,this.map);
            else
                createMeasurePanel();
        }
        else if (control == "scale") {
            this.map.addControl(new Mapea.Control.Scale());
        }
        else if (control == "scaleline") {
            this.map.addControl(new OpenLayers.Control.ScaleLine());
        }
        else if (control == "location") {
            var locationControls = this.map.getControlsByClass("Mapea.Control.Geolocate");
            if (locationControls.length == 0) {
                var locationControl = new Mapea.Control.Geolocate({
                    id: 'locate-control',
                    geolocationOptions: {
                        enableHighAccuracy: true,
                        maximumAge: 0,
                        timeout: 15000
                    },
                    centerZoom : 12,
                    successCallback : function() {
                        // TODO
                    },
                    errorCallback : function() {
                        // TODO
                    },
                    uncapableCallback : function() {
                        // TODO
                    }
                });
                this.map.addControl(locationControl);
            }
        }
        else if (control == "drawfeature") {
            if (Mapea.global.wfsLayer && (Mapea.global.wfsLayer != null)) {
                controlsToEditionPanel.push(new Mapea.Control.DrawFeature(Mapea.global.wfsLayer, Mapea.global.wfsLayer.handlerType,
                                    {
                                        title: 'Dibujar elemento',
                                        displayclass: 'MapeaControlDrawFeature',
                                        handlerOptions: {multi: Mapea.global.wfsLayer.multipleType}
                                    }));
            }
            else {
                Mapea.Util.showErrorMessage('El control "' + control + '" no se puede añadir al mapa porque no existe una capa WFS cargada.');
            }
        }
        else if (control == "modifyfeature") {
            if (Mapea.global.wfsLayer && (Mapea.global.wfsLayer != null)) {
                controlsToEditionPanel.push(new Mapea.Control.ModifyFeature(Mapea.global.wfsLayer,
                                {
                                    title: 'Modificar elemento',
                                    displayClass: 'olControlModifyFeature'
                                }));
            }
            else {
                Mapea.Util.showErrorMessage('El control "' + control + '" no se puede añadir al mapa porque no existe una capa WFS cargada.');
            }
        }
        else if (control == "deletefeature") {
            if (Mapea.global.wfsLayer && (Mapea.global.wfsLayer != null)) {
                controlsToEditionPanel.push(new Mapea.Control.DeleteFeature(Mapea.global.wfsLayer,
                                {
                                    title: 'Eliminar elemento',
                                    displayClass: 'MapeaControlDeleteFeature'
                                }));
            }
            else {
                Mapea.Util.showErrorMessage('El control "' + control + '" no se puede añadir al mapa porque no existe una capa WFS cargada.');
            }
        }
        else if (control == "editattribute") {
            if (Mapea.global.wfsLayer && (Mapea.global.wfsLayer != null)) {
                var options = {
                    title: 'Editar atributos del elemento',
                    displayClass: 'MapeaControlEditAttributeFeature'
                };
                
                //TODO remove
                if (this.isJSAPI)
                    options.savingFunctionName = "saveEditFeature_sigc";
                
                controlsToEditionPanel.push(new Mapea.Control.EditAttributeFeature(Mapea.global.wfsLayer, options));
            }
            else {
                Mapea.Util.showErrorMessage('El control "' + control + '" no se puede añadir al mapa porque no existe una capa WFS cargada.');
            }
        }
        else  {
            Mapea.Util.showErrorMessage('El control "'+ control +'" no está definido. Consulte los controles disponibles con action=getControlsAvailable.');
        }
    },

    buildEditionPanel : function(controls) {
        // Save and clear control.
        if (Mapea.global.wfsLayer && (Mapea.global.wfsLayer != null) && (controls.length > 0))
        {
            //Panel is created for edition controls
            Mapea.global.wfsLayer.editable = true;
            
            var clearOp = new OpenLayers.Control.Button({
                title:'Deshacer los cambios no salvados',
                trigger: clearUnsavedOperation,
                displayClass:'MapeaControlClearUnsavedOperations'
            });
            controls.push(clearOp);
            
            /*
             * If only the editAtribute control is selected,
             * then saved button hasn't added.
             */
            var editattributeCNRegex = /Mapea\.Control\.EditAttributeFeature/i;
            if ( (controls.length > 2) || (!editattributeCNRegex.test(controls[0].CLASS_NAME)) )
            {
                var save = new OpenLayers.Control.Button({
                    title:'Guardar elementos',
                    trigger:OpenLayers.Function.bind(Mapea.global.wfsLayer.commit, Mapea.global.wfsLayer),
                    displayClass:'olControlSaveFeatures'
                });
                controls.push(save);    
            }
            
            var panelEdition = this.createEditPanel(controls);
            this.map.addControl(panelEdition);
        }
    },

    /**
     * Method: createEditPanel
     *
     */
    createEditPanel : function(controls) {
        var panel = new OpenLayers.Control.Panel({displayClass:'customEditingToolbar', id:'editPanelId'});
        panel.addControls(controls);

        panel.onButtonClick = function(evt) {
            var clickedControl = (evt.buttonElement)? ((evt.buttonElement.className)?evt.buttonElement.className:""):"";
            clickedControl = clickedControl.toLowerCase();

            // activates the clicked control and deactivates other edit controls
            var deactivateCtrls = [];
            var activateCtrls = [];

            // drawfeature
            var drawCtrls = this.map.getControlsByClass("Mapea.Control.DrawFeature");
            if ( clickedControl.indexOf("drawfeature") != -1 ) {
                activateCtrls = activateCtrls.concat(drawCtrls);
            }
            else {
                deactivateCtrls = deactivateCtrls.concat(drawCtrls);
            }

            // deletefeature
            var deleteCtrls = this.map.getControlsByClass("Mapea.Control.DeleteFeature");
            if ( clickedControl.indexOf("deletefeature") != -1 ) {
                activateCtrls = activateCtrls.concat(deleteCtrls);
            }
            else {
                deactivateCtrls = deactivateCtrls.concat(deleteCtrls);
            }

            // modifyfeature
            var modifyCtrls = this.map.getControlsByClass("Mapea.Control.ModifyFeature");
            if ( clickedControl.indexOf("modifyfeature") != -1 ) {
                activateCtrls = activateCtrls.concat(modifyCtrls);
            }
            else {
                deactivateCtrls = deactivateCtrls.concat(modifyCtrls);
            }

            // editattribute
            var editCtrls = this.map.getControlsByClass("Mapea.Control.EditAttributeFeature");
            if ( clickedControl.indexOf("editattribute") != -1 ) {
                activateCtrls = activateCtrls.concat(editCtrls);
            }
            else {
                deactivateCtrls = deactivateCtrls.concat(editCtrls);
            }

            if ( clickedControl.indexOf("clearunsavedoperation") != -1 ) {
                clearUnsavedOperation();
            }
            else if ( clickedControl.indexOf("savefeatures") != -1 ) {
                OpenLayers.Function.bind(Mapea.global.wfsLayer.commit, Mapea.global.wfsLayer)();
            }
            else if (activateCtrls.length == 0) {
                // no clicked on edit controls so exit
                return true;
            }

            // deactivates
            for (var i = 0, ilen = deactivateCtrls.length; i < ilen; i++) {
                var deactivateCtrl = deactivateCtrls[i];
                if (deactivateCtrl && deactivateCtrl.active) {
                    deactivateCtrl.deactivate();
                }
            }

            // activates
            for (var i = 0, ilen = activateCtrls.length; i < ilen; i++) {
                var activateCtrl = activateCtrls[i];
                // if it is deactive activates the ctrl
                if (activateCtrl && !activateCtrl.active) {
                    activateCtrl.activate();
                }
                // if it is active deactivates the ctrl
                else if (activateCtrl) {
                    activateCtrl.deactivate();
                }
            }

            /****************************************
                    manages other controls
            ****************************************/
            //measure controls
            var controlsMeasure = this.map.getControlsBy("id","measurePanelId");
            if (controlsMeasure.length > 0) {
                for(var i = 0; i < controlsMeasure[0].controls.length; i++){
                    controlsMeasure[0].controls[i].deactivate();
                }
                executeDelete();
            }

            //navigation controls
            var controlsNav = this.map.getControlsByClass('Mapea.Control.NavToolbar');
            if (controlsNav.length > 0) {
                controlsNav[0].controls[0].deactivate();
                controlsNav[0].controls[1].deactivate();
            }

            //getfeatureinfo
            var controlsInfo = this.map.getControlsBy("id","infoPanelId");
            if (controlsInfo.length > 0) {
                controlsInfo[0].controls[0].deactivate();
            }

            //PanZoomBar
            var controlsPan = this.map.getControlsByClass('Mapea.Control.PanZoom');
            var controlsBar = this.map.getControlsByClass('Mapea.Control.PanZoomBar');
            if(controlsPan!=null && controlsBar!=null && controlsPan.length>0 && controlsBar.length>0){
                controlsPan[0].buttons = controlsPan[0].buttons.concat(controlsBar[0].buttons);
            }

            //LayerSwitcher
            var controlLS = this.map.getControlsByClass('Mapea.Control.LayerSwitcher');


            OpenLayers.Event.stop(evt ? evt : window.event);

            var allControls = [];
            if (controlsNav != null && controlsNav.length>0)
                allControls = allControls.concat(controlsNav[0].controls);

            if (controlsInfo != null && controlsInfo.length>0)
                allControls = allControls.concat(controlsInfo[0].controls);

            if(controlsMeasure != null && controlsMeasure.length > 0)
                allControls = allControls.concat(controlsMeasure[0].controls);

            //MJMJ PANEL OLv2.12
            var ctrl;
            var controls = this.controls.concat(allControls), button = evt.buttonElement;
            for (var i=controls.length-1; i>=0; --i) {
                if (controls[i].panel_div === button) {
                    ctrl = controls[i];
                    break;
                }
            }
        }

        return panel;
    },

    CLASS_NAME: "Mapea.Parameter.Controls"
});
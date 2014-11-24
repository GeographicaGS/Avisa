/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control/Panel.js
 * @requires OpenLayers/Control/Navigation.js
 * @requires OpenLayers/Control/ZoomBox.js
 */

/**
 * Class: Mapea.Control.NavToolbar
 *
 * Inherits from:
 *  - <OpenLayers.Control.Panel>
 */
Mapea.Control.NavToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {

    /**
     * Constructor: OpenLayers.Control.NavToolbar
     * Add our two mousedefaults controls.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be used
     *     to extend the control.
     */
    initialize: function(options) {
        OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
        this.addControls([
          //new OpenLayers.Control.Navigation(),
          new Mapea.Control.Navigation({
        	  dragPanOptions: {enableKinetic: Mapea.Util.isMobile},
              title: 'Desplazarse por el mapa'
          }),
          new OpenLayers.Control.ZoomBox({title: 'Acercar ventana'})
        ]);
    },

    /**
     * Method: draw
     * calls the default draw, and then activates mouse defaults.
     */
    draw: function() {
        var div = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
        this.controls[0].activate();
        return div;
    },

   	/**
     * Method: onButtonClick
     */
    onButtonClick: function (evt) {
    	var isNavControl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("controlnavigation") > -1));
    	var isZoomBoxControl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("controlzoombox") > -1));
    	if (isNavControl || isZoomBoxControl)
    	{
	    	//var navCtrl = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
    		var navCtrl = this.map.getControlsByClass("Mapea.Control.Navigation")[0];
	    	var zoomCtrl = this.map.getControlsByClass("OpenLayers.Control.ZoomBox")[0];
	    	
	    	var ctrlDeactive = (isNavControl)? zoomCtrl : navCtrl;
	    	var ctrlActive = (isNavControl)? navCtrl : zoomCtrl;
	    	
	    	ctrlDeactive.deactivate();    	
			if (ctrlActive.active)
			{
				ctrlActive.deactivate();
			}
			else
			{
				ctrlActive.activate();
			}
			
			//measure controls
	    	var controlsMeasure = this.map.getControlsBy("id","measurePanelId");
	    	if ( controlsMeasure.length > 0 ){
				controlsMeasure[0].controls[0].deactivate();
				controlsMeasure[0].controls[1].deactivate();
				executeDelete();
			}
			
			//getfeatureinfo control
			var controlsInfo = this.map.getControlsBy("id", "infoPanelId");
			if ( controlsInfo.length > 0 ){
				controlsInfo[0].controls[0].deactivate();
			}
			
			//edit controls
			var controlsEdit = this.map.getControlsBy("id", "editPanelId");
			if (controlsEdit.length > 0)
			{
				for (var i=0,ilen=controlsEdit[0].controls.length; i<ilen; i++ )
				{
					controlsEdit[0].controls[i].deactivate();
				}
			}

        	OpenLayers.Event.stop(evt ? evt : window.event);
        }        
    },

    CLASS_NAME: "Mapea.Control.NavToolbar"
});

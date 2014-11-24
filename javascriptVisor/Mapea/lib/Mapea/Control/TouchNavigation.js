/**
 * Class: Mapea.Control.TouchNavigation
 * The navigation control handles map browsing with touch events (dragging,
 *     double-tapping, tap with two fingers, and pinch zoom).  Create a new 
 *     control with the <OpenLayers.Control.TouchNavigation> constructor.
 */
Mapea.Control.TouchNavigation = OpenLayers.Class(OpenLayers.Control.TouchNavigation, {
    
    /**
     * Method: draw
     */
    draw: function() {
        var clickCallbacks = {
            click: this.defaultClick,
            dblclick: this.defaultDblClick
        };
        var clickOptions = OpenLayers.Util.extend({
            "double": true,
            stopDouble: true,
            pixelTolerance: 2
        }, this.clickHandlerOptions);
        this.handlers.click = new OpenLayers.Handler.Click(
            this, clickCallbacks, clickOptions
        );
        this.dragPan = new OpenLayers.Control.DragPan(
            OpenLayers.Util.extend({
                map: this.map,
                documentDrag: this.documentDrag
            }, this.dragPanOptions)
        );
        this.dragPan.draw();
        this.pinchZoom = new Mapea.Control.PinchZoom(
            OpenLayers.Util.extend({map: this.map}, this.pinchZoomOptions)
        );
    },
    
    CLASS_NAME: "Mapea.Control.TouchNavigation"
});

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: Mapea.Control.Click
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
 Mapea.Control.Click = OpenLayers.Class(OpenLayers.Control, {    
 
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.onClick,
                'dblclick': this.onDblclick 
            }, this.handlerOptions
        );
    }, 

    onClick: function(evt) {
        // console.log(evt);
    },

    onDblclick: function(evt) {  
        // console.log(evt);
    },
    
    CLASS_NAME: "Mapea.Control.Click"
});
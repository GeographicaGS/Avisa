/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 */

 /**
 * Class: Mapea.Control.EditAttributeFeature
 * Create a wind rose to display over your main map. Create a new
 *    wind rose with the <Mapea.Control.WindRose> constructor.
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.EditAttributeFeature = OpenLayers.Class(OpenLayers.Control, {

    feature: null,
    
    savingFunctionName: "saveEditFeature",

    /**
    * Constructor: OpenLayers.Control.EditAttributeFeature
    *
    * Parameters:
    * layer - {Open Layer.Layer.Vector}
    * options - {Object}
    */
    initialize: function(layer, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
                
        if (options.savingFunctionName)
            this.savingFunctionName = options.savingFunctionName;
        
        //this.handler = new Mapea.Handler.Feature(this, layer, {click: this.clickFeature});
        this.layer.events.register('featureselected', this, this.clickFeature);
        this.layer.events.register('featureunselected', this, this.clickOutFeature);
    },

   /**
    * APIMethod: setMap
    * Parameters:
    * map - {<Mapea.map>}
    */
    setMap: function(map) {
        //this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

   /**
    * Method: clickFeature
    *
    * Returns:
    * feature - {OpenLayer.Feature.Vector}
    */
    clickFeature: function(evt) {
        this.layer.map.editingFeature = true;
        
        if (!this.active) {
            return false;
        }
        
        this.feature = evt.feature;

        function bindEvent(element, eventName, fallbackEventName, eventFunction){
            if (element.attachEvent){
                element.attachEvent(eventName, eventFunction);
            }else{
                element.addEventListener(fallbackEventName, eventFunction, false);
            }
            return element;
        }

        function unbindEvent(element, eventName, fallbackEventName, eventFunction){
            if (element.detachEvent){
                element.detachEvent(eventName, eventFunction);
            }else{
                element.removeEventListener(fallbackEventName, eventFunction, false);
            }
            return element;
        }

        var index = 0;

        if (this.feature.fid != null) {

            this.layer.writer.fillDefaultValues(this.feature);

            //html for the popup of edition
            var headHTML = '<div class="info-header">Atributos del elemento</div>';
            
            var html = '<div class="divattrs"><table>';
            if (!Mapea.Util.isMobile) {
                html += '<tr><td colspan="2" align="center"><i><b>Atributos del elemento</b></i><td></tr>';
            }

            for (var i=0, len=this.layer.attributes.length; i<len; ++i) {
                var attribute = this.layer.attributes[i];
                var attributeName = attribute.name;
                var attributeType = attribute.localType;
                var attributeValue = this.feature.attributes[attributeName];

                // escapes single and double quotes
                attributeValue = attributeValue.replace(/\'/g,'&#39;'); // single quotes
                attributeValue = attributeValue.replace(/\"/g,'&#34;'); // double quotes
                html += '<tr><td>' + attributeName + ' (' + attributeType + ') </td><td><input ' + 'id="idInputText_' + attributeName + '" type="text" value="' + attributeValue + '"></input></td></tr>';
            }
            html += '<tr><td colspan=2 align="center"><div class="olControlSaveFeaturesItemInactive olButton editAttribute" title="Guardar atributos" onClick="'+this.savingFunctionName+'()"></div></tr></td>';
            html += '</table></div>';

            //The popup is created
            function unselectAttribute(e) {
                Mapea.Util.removeAllPopups(this.map);
                this.layer.map.editingFeature = false;
                if (this.feature && (this.feature.renderIntent == "select"))
                    this.layer.selectWFSFeature.unselect(this.feature);
            }

            var popup = new Mapea.Popup.FramedCloud("popup_feature",
                         this.feature.geometry.getBounds().getCenterLonLat(),
                         new OpenLayers.Size(400,300),
                         html,
                         null, true, OpenLayers.Function.bind(unselectAttribute, this), headHTML);
            popup.autoSize=false;
            this.feature.popup = popup;
            this.layer.map.addPopup(popup, true);
            
        } else {
            Mapea.Util.showInfoMessage("Debe guardar el elemento previamente.");
            this.clickOutFeature(this.feature);
        }
    },
   
    /**
     * Method: clickOutFeature
     * Remove the opened popups
     * 
     * Returns:
     * feature - {OpenLayer.Feature.Vector}
     */
    clickOutFeature: function(feature) {
        if (feature.renderIntent == "select")
            this.layer.selectWFSFeature.unselect(feature);
        
        if (this.layer.map)
        {
            var popups = this.layer.map.popups;
            for (var i=0,ilen=popups.length; i<ilen; i++)
            {
                this.layer.map.removePopup(popups[i]);
            }
        }
        
        this.layer.map.editingFeature = false;
    },

    /**
    * APIMethod: destroy
    */
    destroy: function() {
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    
    activate: function() {
        if (!this.layer.selectWFSFeature.active) {
            this.layer.selectWFSFeature.activate();
        }
        this.map.uniqueSelectFeatureCtrl.deactivate();

        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },
    
    deactivate: function() {
        if (this.layer.selectWFSFeature.active) {
            this.layer.selectWFSFeature.deactivate();
        }
        this.map.uniqueSelectFeatureCtrl.activate();

        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },

    commit: function() {
        for (var i=0,len=this.layer.attributes.length; i<len; ++i) {
            var fieldName = this.layer.attributes[i].name;
        
            try {
                this.feature.attributes[ fieldName ] = document.getElementById("idInputText_"+fieldName).value;
                
            } catch(error) {
                //no attribute in data, skip
            }       
        }
    
        this.feature.state = OpenLayers.State.UPDATE;
        this.layer.commit();
    },

    CLASS_NAME: "Mapea.Control.EditAttributeFeature"
});
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 */

 /**
 * Class: Mapea.Control.GetLayersInfo
 * Restore the unsaved feature's values to to the last saved values
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Control.GetLayersInfo = OpenLayers.Class(OpenLayers.Control, {
    
    regExs: {
        
        msNoResults: /(\s*)returned(\s*)no(\s*)results/i,

        gsNoResults: /no(\s*)features(\s*)were(\s*)found/i,

        gsResponse: /^results[\w\s\S]*\'http\:/i,

        msNewFeature: /feature(\s*)(\w+)(\s*)\:/i,

        msNewLayer: /^(\w+)_layer$/i,

        gsNewFeature: /\#newfeature\#/,

        gsFeatureMember: /^featureMember$/i,

        msFeatureMember: /^(\w+)_feature$/i,

        gsGeometry: /geom$/i,

        msGeometry: /boundedby$/i,
        
        msUnsupportedFormat : /error(.*)unsupported(.*)info\_format/i

    },

    /**
     * Property: numReqLayers
     * Number of layers is getting info. We use this
     * parameter to control when all requests have finished
     * {Integer}
     */
    numReqLayers: 0,
    
    /**
     * Property: isLoadedInfo
     * Flag to check if the info has been loaded
     * into popup. If it is, do not remove any popup
     * {Boolean}
     */
    isLoadedInfo: false,
    
    /**
     * Property: maxFeatureCount
     * Features max number to read
     */
    maxFeatureCount : 10,

    /**
     * Property: capabilities
     * A capabilities object with information about service WMS.
     * {Object}
     */
    capabilities: null,

    /**
     * Property: infoFormat
     * Format supported in the GetFeatureInfo request.
     * {Object}
     */
    infoFormat: null,

    /**
     * Property: loadingHTML
     * HTML content is added to the popup
     * before call the ajax request
     */
     loadingHTML: "<div class=\"getting-info-text\">Obteniendo informaci&oacute;n...</div><div class=\"getting-info\"></div>",

    /**
     * Property: formatHTML
     * Information of the feature.
     * {Object}
     */
    formatHTML: "",

    /**
     * Property: exceptionFormat
     * Format of the exception response.
     * {Object}
     */
    exceptionFormat: "application/vnd.ogc.se_xml",

    /**
     * Property: popup
     * Show information feature.
     * {<Mapea.Popup.FramedCloud>}
     */
    popup: null,

    /**
     * Property: previousPoup
     * Previous KML popup showed on the map
     * {<Mapea.Popup.FramedCloud>}
     */
    previousPoup : null,

    /**
    * Constructor: Mapea.Control.GetLayersInfo
    *
    * Parameters:
    * options - {Object} An optional object whose properties will be set on
    *                    the control
    * requestFormat - {String} Format of the expected server response
    *
    */
    initialize: function(requestFormat, options) {
        this.infoFormat = requestFormat;
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.handler = new OpenLayers.Handler.Click(this, {click: this.loadLayersQueryables});
    },

    /**
     * Method: returnCapabilities
     *
     * Returns:
     * Layer's Capabilities.
     */
    returnCapabilities: function(){
        return this.capabilities;
    },

    /**
     * Method: loadCapabilities
     *
     * Parameters:
     *
     */
    loadCapabilities: function(urlWMS){
        var request = OpenLayers.Request.GET({
            url: urlWMS,
            success: this.loadCapabilitiesSuccess,
            failure: function(){
                Mapea.Util.showErrorMessage("GetCapabilities: No se ha podido conectar con el servidor.");
            },
            scope: this,
            params: {service: "WMS", request: "GetCapabilities"},
            async: false
        });
    },

    /**
     * Method: loadCapabilitiesSuccess
     *
     * Parameters:
     * request - {<Request>}
     */
    loadCapabilitiesSuccess: function(request) {

        var xml = new OpenLayers.Format.XML();
        var wms = new Mapea.Format.WMS({'layerOptions': {buffer: 0}});
        var doc = null;
        //var parsererror = false;

        //If exists some error in response. In IE request._object.responseXML.documentElement = null
        /*if(request._object.responseXML.documentElement == null || request._object.responseXML.documentElement.getAttribute("parsererror") != -1){
            request.responseXML = request._object.responseXML;
            parsererror = true;
        }*/

        //Sometimes, the answer is a white page
        if (request.responseXML == null){
            Mapea.Util.showErrorMessage("Ha ocurrido un error al obtener el documento GetCapabilities.");
            return false;
        }
        //PATH_MOZILLA_ENCODING
        //En mozilla cuando el encoding del xml del getcapabilities
        //es UTF-8, el proxy devuelve mal los acentos
        var encodingXml = "UTF-8";

        var patron = /UTF|utf/i;
        var text = request.responseText;
        var searchIndice = text.search(patron);

        if (searchIndice == -1 || navigator.appName.indexOf("Explorer") != -1){
            encodingXml = "ISO-8859-1";
        }
        //FIN_PATH
        if(!request.responseXML.documentElement /*|| parsererror*/) {
            doc = xml.read(request.responseText);
        } else {
            doc = request.responseXML;
        }

        this.capabilities = wms.read(doc,{});
    },

    /**
     * Method: loadLayersQueryables
     */
    loadLayersQueryables: function(evt) {
        
        var layersQueryables = [];

        // checks if it exists a kml popup in pixelX and pixelY
        this.previousPoup = null;
        var clickEvent = window.event || this.handler.evt.xy || Mapea.global.lastClickedXY;
        if (clickEvent) {
            // gets the x and y of the click event
            var pixelX = clickEvent.layerX || clickEvent.offsetX || clickEvent.x;
            var pixelY = clickEvent.layerY || clickEvent.offsetY || clickEvent.y;

            var previousPopupPixel = Mapea.Util.getPopupInPixelXY(this.map, pixelX, pixelY, Mapea.Control.GetLayersInfo.SHOW_INFO_BUFFER);
            if (previousPopupPixel) {
                this.previousPoup = previousPopupPixel;
            }
        }
        if (!this.previousPoup) {
            Mapea.Util.unselectAllFeatures(this.map);
            Mapea.Util.removeAllPopups(this.map);
        }
        
        var numLayers = this.map.getNumLayers();
        for (var i=0; i < numLayers; i++) {
            var layer = this.map.layers[i];
            // if the layer is queryable, visible and is in range
            if (layer.queryable && layer.visibility && layer.inRange) {
                layersQueryables.push(layer);
            }
        }

        if (layersQueryables.length == 0) {
            Mapea.Util.showInfoMessage("No existen capas consultables.");
        }
        else {
            this.getInfo(layersQueryables);
        }
    },

    /**
     * Method: getInfo
     */
    getInfo: function(layersQueryables) {
        this.numReqLayers = layersQueryables.length;
        this.isLoadedInfo = false;
        this.formatHTML = "";
        
        this.createLoadingPopup();
        
        for(var i=0; i<layersQueryables.length; i++)
        {
            var layer = layersQueryables[i];
            var paramLayers = layer.params.LAYERS;
            try
            {
                var xPosition = Math.round(this.handler.down.xy.x);
                var yPosition = Math.round(this.handler.down.xy.y);
                
                var url = layer.getFullRequestString({
                            REQUEST: "GetFeatureInfo",
                            EXCEPTIONS: this.exceptionFormat,
                            BBOX: layer.map.getExtent().toBBOX(),
                            X: xPosition,
                            Y: yPosition,
                            INFO_FORMAT: this.infoFormat,
                            QUERY_LAYERS: paramLayers,
                            FEATURE_COUNT: this.maxFeatureCount,
                            WIDTH: layer.map.size.w,
                            HEIGHT: layer.map.size.h});
                url = url + "&mapeaop=wmsinfo";
                
                this.loadURL(url, '', this, this.setHTML, null, layer.name);
            }
            catch(error)
            {
                /*debug*/
                if(window.testCoords != null && typeof window.testCoords == 'function')
                {
                    window.testCoords(this.handler);
                }
                try
                {
                    /*test for mobile*/
                     var url = layer.getFullRequestString({
                                    REQUEST: "GetFeatureInfo",
                                    EXCEPTIONS: this.exceptionFormat,
                                    BBOX: layer.map.getExtent().toBBOX(),
                                    X: this.handler.first.xy.x,
                                    Y: this.handler.first.xy.y,
                                    INFO_FORMAT: this.infoFormat,
                                    QUERY_LAYERS: paramLayers,
                                    FEATURE_COUNT: this.maxFeatureCount,
                                    WIDTH: layer.map.size.w,
                                    HEIGHT: layer.map.size.h
                                });
                     
                    url = url + "&mapeaop=wmsinfo";
                    
                    /*debug fallback url*/
                    if(window.testCoords != null && typeof window.testCoords == 'function')
                    {
                        window.testCoords(url);
                    }
                    this.loadURL(url, '', this, this.setHTML, null, layer.name);
                }
                catch(error)
                {
                     if(window.testCoords != null && typeof window.testCoords == 'function')
                     {
                        window.testCoords('does not work :(');
                    }
                }
            }
        }
    },

    setHTML: function(response, layerName) {
        // a layer has been processed
        this.numReqLayers--;
        
        var html = "";
        
        if (this.infoFormat == "text/plain")
        {
            // check if there are features returned by the service
            if (!this.regExs.msNoResults.test(response.responseText) && !this.regExs.gsNoResults.test(response.responseText))
            {
                var responseText = response.responseText;


                if ( this.regExs.gsResponse.test(responseText) )
                {
                    // geoserver
                    html = this.txtToHtml_Geoserver(responseText);
                }
                else
                {
                    // mapserver
                    html = this.txtToHtml_Mapserver(responseText);              
                }               
            }

            this.formatHTML += html;
        }
        else if (this.infoFormat == "application/vnd.ogc.gml")
        {
            
            if ($.browser.msie)
            {
                if ( /FeatureCollection/i.test($(response.responseText)[1].tagName) )
                {
                    html = this.gmlToHtml_Geoserver_ie(response.responseText);
                }
                else
                {
                    html = this.gmlToHtml_Mapserver_ie(response.responseText);
                }
            }
            else
            {
                if ( /FeatureCollection/i.test($(response.responseText)[1].tagName) )
                {
                    html = this.gmlToHtml_Geoserver(response.responseText); 
                }
                else
                {
                    html = this.gmlToHtml_Mapserver(response.responseText);
                }
            }

            this.formatHTML += html;
        }
        else if (this.infoFormat == "text/html")
        {
            var getContentFromTag = function(tagName) {
                var content = "";               
                var contentDOM = document.createElement("div");
                contentDOM.innerHTML = response.responseText;
                var tags = contentDOM.getElementsByTagName(tagName);
                if (tags.length > 0)
                    content = tags[0].innerHTML;
                content = OpenLayers.String.trim(content);
                
                return content;
            };
            
            // content
            var content = "";
            content += getContentFromTag("body");
            content += getContentFromTag("div");
            content += getContentFromTag("table");
            content += getContentFromTag("b");
            content += getContentFromTag("span");
            content += getContentFromTag("input");
            content += getContentFromTag("a");
            content += getContentFromTag("img");
            content += getContentFromTag("p");
            content += getContentFromTag("ul");
            content += getContentFromTag("li");
            
            content = OpenLayers.String.trim(content);
            
            if (content.length > 0)
            {
                html = layerName+":<br/>";
                html += response.responseText;
            }
            else
            {
                // check if there was any error
                var errorContent = getContentFromTag("ServiceException");
                errorContent = $.trim(errorContent);
                if (errorContent.length > 0)
                {
                    // check if the error was Mapserver unsupported info_format type
                    if (this.regExs.msUnsupportedFormat.test(errorContent) )
                    {
                        html = layerName+" no soporta html<br/>";
                    }
                }
            }
            
            this.formatHTML += html;
        }

        // if there is some information, add the popup
        if (html.length > 0)
        {
            this.isLoadedInfo = true;
            
            var headerHTML = '<div class="info-header">' + layerName + '</div>';
            
            if (this.popup) {
                this.popup.setContentHTML(this.formatHTML);
                this.popup.setHeader(headerHTML);
                this.popup.show();
            }
            else if (this.previousPoup) {
                this.destroyLoadingPopup();
                var htmlFinal = this.previousPoup.contentHTML;
                htmlFinal += this.formatHTML;
                
                this.previousPoup.setContentHTML(htmlFinal);
                this.previousPoup.setHeader(headerHTML);
                this.previousPoup.show();
            }
        }
        else if (this.numReqLayers == 0 && !this.isLoadedInfo)
        {
            this.destroyLoadingPopup();
        }
    },

    /**
     * Function: loadURL
     * Background load a document.  For more flexibility in using XMLHttpRequest,
     *     see the <OpenLayers.Request> methods.
     *
     * Parameters:
     * uri - {String} URI of source doc
     * params - {String} or {Object} GET params. Either a string in the form
     *     "?hello=world&foo=bar" (do not forget the leading question mark)
     *     or an object in the form {'hello': 'world', 'foo': 'bar}
     * caller - {Object} object which gets callbacks
     * onComplete - {Function} Optional callback for success.  The callback
     *     will be called with this set to caller and will receive the request
     *     object as an argument.  Note that if you do not specify an onComplete
     *     function, <OpenLayers.nullHandler> will be called (which pops up a
     *     user friendly error message dialog).
     * onFailure - {Function} Optional callback for failure.  In the event of
     *     a failure, the callback will be called with this set to caller and will
     *     receive the request object as an argument.  Note that if you do not
     *     specify an onComplete function, <OpenLayers.nullHandler> will be called
     *     (which pops up a user friendly error message dialog).
     *
     * Returns:
     * {<OpenLayers.Request.XMLHttpRequest>}  The request object. To abort loading,
     *     call request.abort().
     */
    loadURL: function(uri, params, caller, onComplete, onFailure, layerName) {
        
        // define the success and failure functions
        var finalCallbackFn = (function(response) {
            
             OpenLayers.Function.bind(onComplete, this)(response, layerName);
        });
        var success = (onComplete) ? finalCallbackFn : OpenLayers.nullHandler;
        
        var failure = (onFailure) ? onFailure : OpenLayers.nullHandler;

        // execute the ajax call
        return OpenLayers.Request.GET({
            url: uri, params: params,
            success: success, failure: failure, scope: caller
        });
    },

    createLoadingPopup: function() {
        this.destroyLoadingPopup();
        
        if (this.previousPoup) {
            var htmlFinal = this.previousPoup.contentHTML;
            htmlFinal += "<div class=\"getting-info-container\">";
            htmlFinal += "<div class=\"popup-info-separator\">Información de la capa</div>";
            htmlFinal += this.loadingHTML;
            htmlFinal += "</div>";
            this.previousPoup.setContentHTML(htmlFinal);
            this.previousPoup.show();
        }
        else {
            this.popup = new Mapea.Popup.FramedCloud("popup_info",
                            this.map.getLonLatFromPixel(this.handler.evt.xy),
                            new OpenLayers.Size(400, 300),
                            this.loadingHTML,
                            null, true, OpenLayers.Function.bind(Mapea.Util.closePopup, this), this.loadingHTML);
            this.popup.setSize(new OpenLayers.Size(400, 300));
            this.popup.pixelX = this.handler.evt.xy.x;
            this.popup.pixelY = this.handler.evt.xy.y;
            this.map.addPopup(this.popup);
        }
    },

    destroyLoadingPopup: function() {
        if (this.popup && this.popup != null) {
            this.map.removePopup(this.popup);
            try
            {
                this.popup.destroy();
            }
            catch(err){}
            this.popup = null
        }
        else if (this.previousPoup) {
            // removes loading div
            var previousContent = jQuery('<div class="popup-wrapper">' + this.previousPoup.contentHTML + '</div>');
            previousContent.find("div.getting-info-container").remove();
            
            var previousContentHTML = previousContent.html();
            this.previousPoup.setContentHTML(previousContentHTML);
            this.previousPoup.show();
        }
    },

    gmlToHtml_Geoserver : function(responseText) {
        var html = "";

        var members = $(responseText).find("gml\\:featuremember");
        if (members.length > 0)
        {
            html = "<div class=\"popup-info-separator\">Información de la capa</div>";
            for (var idx = 0, idxLen=members.length; idx<idxLen; idx++)
            {
                var member = members[idx];
                var layerFeature = $(member).children();
                var attributes = layerFeature.children();

                var layerName = (layerFeature.length > 0)? layerFeature[0].tagName : "";
                
                // build the table
                html += "<table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";         
                
                for (var idx2 = 0, idxLen2=attributes.length; idx2<idxLen2; idx2++)
                {
                    var attr = attributes[idx2];
                    var attribute = $(attr);
                    if (attribute.length > 0)
                    {
                        // do not show the geometric field
                        if ( this.regExs.gsGeometry.test(attribute[0].tagName) == false)
                        {
                            html += "<tr><td><b>";
                            html += this.beautifyString(attribute[0].tagName);
                            html += "</b></td><td>";
                            html += attribute.text();
                            html += "</td></tr>";
                        }
                    }
                }
                html += "</tbody></table>";
            }
        }

        return html;
    },

    gmlToHtml_Geoserver_ie : function(responseText) {
        var html = "";

        var featureCollectionTag = $(responseText)[1];
        var features = $(featureCollectionTag).children();

        if (features.length > 1)
        {
            html = "<div class=\"popup-info-separator\">Información de la capa</div>";
            for (var idx = 0, idxLen=features.length; idx<idxLen; idx++)
            {
                var feature = features[idx];
                if (!this.regExs.msGeometry.test(feature.tagName) && this.regExs.gsFeatureMember.test(feature.tagName))
                {
                    var featureTag = $(feature);
                    var layer = featureTag.children()[0];
                    // build the table
                    html += "<table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layer.tagName)+"</td></tr>";

                    var attributes = $(layer).children();
                    for (var idx2 = 0, idxLen2=attributes.length; idx2<idxLen2; idx2++)
                    {
                        var attr = attributes[idx2];
                        var attribute = $(attr);
                        if (attribute.length > 0)
                        {
                            // do not show the geometric field
                            if ( this.regExs.gsGeometry.test(attribute[0].tagName) == false)
                            {
                                html += "<tr><td><b>";
                                html += this.beautifyString(attribute[0].tagName);
                                html += "</b></td><td>";
                                html += attribute.text();
                                html += "</td></tr>";
                            }
                        }
                    }
                    html += "</tbody></table>";
                }
            }
        }

        return html;
    },

    txtToHtml_Geoserver : function(responseText) {
        // get layer name from the header
        var layerName = responseText.replace(/[\w\s\S]*\:(\w*)\'\:[\s\S\w]*/i, "$1");

        // remove header
        responseText = responseText.replace(/[\w\s\S]*\'\:/i, "");

        responseText = responseText.replace(/---(\-*)(\n+)---(\-*)/g, "#newfeature#");

        var attrValuesString = responseText.split("\n");

        var html = "<div class=\"divinfo\"><div class=\"popup-info-separator\">Información de la capa</div>";

        // build the table
        html += "<table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";         
            
        for (var i=0, ilen=attrValuesString.length; i<ilen; i++)
        {
            var attrValueString = attrValuesString[i].trim();
            if (attrValueString.indexOf("=") != -1)
            {
                var attrValue = attrValueString.split("=");
                var attr = attrValue[0].trim();
                var value = "-";
                if (attrValue.length > 1)
                {
                    value = attrValue[1].trim();
                    if (value.length == 0 || value == "null")
                    {
                        value = "-";
                    }
                }

                if ( this.regExs.gsGeometry.test(attr) == false)
                {
                    html += "<tr><td><b>";
                    html += this.beautifyString(attr);
                    html += "</b></td><td>";
                    html += value;
                    html += "</td></tr>";
                }
            }
            else if (this.regExs.gsNewFeature.test(attrValueString))
            {
                // set new header
                html += "<tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";
            }
        }

        html += "</tbody></table></div>";

        return html;
    },

    gmlToHtml_Mapserver : function (responseText) {
        var html = "";
        var layers = $(responseText).children();
        if (layers.length > 0)
        {
            for (var idx = 0, idxLen=layers.length; idx<idxLen; idx++)
            {
                // LAYER
                var layer = layers[idx];
                var layerTag = $(layer);
                
                var layerName = (layerTag.length > 0)? layerTag[0].tagName : "";

                layerName = layerName.replace(this.regExs.msNewLayer, "$1");

                // FEATURES
                var features = layerTag.children();
                if (features.length > 0)
                {
                    html = "<div class=\"popup-info-separator\">Información de la capa</div>";
                    for (var idx2 = 0, idxLen2=features.length; idx2<idxLen2; idx2++)
                    {
                        // build the table
                        html += "<table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";
                        var feature = features[idx2];
    
                        // ATTRIBUTES
                        var attributes = $(feature).children();
                        for (var idx3 = 0, idxLen3=attributes.length; idx3<idxLen3; idx3++)
                        {
                            var attr = attributes[idx3];
                            var attribute = $(attr);
                            if (attribute.length > 0)
                            {
                                // do not show the geometric field
                                if ( this.regExs.msGeometry.test(attribute[0].tagName) == false)
                                {
                                    html += "<tr><td><b>";
                                    html += this.beautifyString(attribute[0].tagName);
                                    html += "</b></td><td>";
                                    html += attribute.text();
                                    html += "</td></tr>";
                                }
                            }
                        }
    
                        html += "</tbody></table>";
                    }
                }
            }
        }

        return html;
    },

    gmlToHtml_Mapserver_ie : function (responseText) {
        var html = "";
        var layerFound = false;
        var featureFound = false;
        var tags = $(responseText);
        var layerName = "";

        if (tags.length > 3)
        {
            for (var idx = 2, idxLen=tags.length; idx<idxLen; idx++)
            {
                var tagName = tags[idx].tagName;

                // check if is a new layer
                if ( this.regExs.msNewLayer.test(tagName) )
                {
                    layerName = tagName.replace(this.regExs.msNewLayer, "$1");
                    
                    html = "<div class=\"popup-info-separator\">Información de la capa</div>";
                    layerFound = true; // a new layer was found
                }
                else if (layerFound)
                {
                    if (this.regExs.msFeatureMember.test(tagName))
                    {
                        /*
                         * if a new feature was defined we 
                         * close the current table and create
                         * a new one
                         */
                        if (featureFound)
                        {
                            html += "</table>";
                        }
                        html += "<table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";
                        featureFound = true; // a new feture was found
                    }
                    else if (featureFound)
                    {
                        // get the sibling
                        var tagSibling = tags[idx+1];

                        /*
                         * if the tag has a tagName and it is
                         * not a ended tag ( "/tagName" ) and the
                         * sibling has not a tagName is a tag of
                         * an attribute and the sibling has its value
                         */
                        if (tagName && !/^\/(\w+)$/.test(tagName) && !tagSibling.tagName)
                        {
                            html += "<tr><td><b>";
                            html += this.beautifyString(tagName);
                            html += "</b></td><td>";
                            html += $(tagSibling).text();
                            html += "</td></tr>";
                        }
                    }                   
                }
            }
            if (html.length > 0) {
                html += "</tbody></table>";
            }
        }

        return html;
    },

    txtToHtml_Mapserver : function(responseText) {
        // remove header
        responseText = responseText.replace(/[\w\s\S]*(layer)/i, "$1");
        
        // get layer name
        var layerName = responseText.replace(/layer(\s*)\'(\w+)\'[\w\s\S]*/i, "$2");

        // remove layer name
        responseText = responseText.replace(/layer(\s*)\'(\w+)\'([\w\s\S]*)/i, "$3");

        // remove feature number
        responseText = responseText.replace(/feature(\s*)(\w*)(\s*)(\:)([\w\s\S]*)/i, "$5");

        // remove simple quotes
        responseText = responseText.replace(/\'/g,"");

        // replace the equal (=) with (;)
        responseText = responseText.replace(/\=/g,';');

        var attrValuesString = responseText.split("\n");

        var html = "";
        var htmlHeader = "<div class=\"popup-info-separator\">Información de la capa</div><table class=\"mapea-table\"><tbody><tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td></tr>";         
            
        for (var i=0, ilen=attrValuesString.length; i<ilen; i++)
        {
            var attrValueString = attrValuesString[i].trim();
            var nextAttrValueString = attrValuesString[i]? attrValuesString[i].trim() : "";
            var attrValue = attrValueString.split(";");
            var attr = attrValue[0].trim();
            var value = "-";
            if (attrValue.length > 1)
            {
                value = attrValue[1].trim();
                if (value.length == 0)
                {
                    value = "-";
                }
            }

            if (attr.length > 0)
            {
                if ( this.regExs.msNewFeature.test(attr) )
                {
                    if ((nextAttrValueString.length > 0) && !this.regExs.msNewFeature.test(nextAttrValueString))
                    {
                        // set new header
                        html += "<tr><td class=\"header\" colspan=\"3\">"+this.beautifyString(layerName)+"</td><td></td></tr>";
                    }
                }
                else
                {
                    html += "<tr><td><b>";
                    html += this.beautifyString(attr);
                    html += "</b></td><td>";
                    html += value;
                    html += "</td></tr>";
                }
            }
        }
        
        if (html.length > 0)
        {
            html = htmlHeader + html + "</tbody></table>";
        }

        return html;
    },
    
    beautifyString : function(attributeName) {
        var beautifyString = attributeName;
        
        if (beautifyString)
        {
            beautifyString = OpenLayers.String.trim(beautifyString);
            if (beautifyString.length > 0)
            {
                var idxPoints = beautifyString.indexOf(":");
                if (idxPoints != -1)
                {
                    idxPoints++;
                    beautifyString = beautifyString.substring(idxPoints, beautifyString.length);
                }
            }
        }
        return beautifyString;
    },

    CLASS_NAME: "Mapea.Control.GetLayersInfo"
});

/**
 * 10 pixel radio buffer to check popups
 * opened on the map
 */
Mapea.Control.GetLayersInfo.SHOW_INFO_BUFFER = 10;
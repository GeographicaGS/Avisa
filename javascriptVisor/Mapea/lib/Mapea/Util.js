/**
 * Namespace: Mapea
 */
//Mapea = {};

/**
 * Namespace: Control
 */
Mapea.Control = {};

/**
 * Namespace: Format
 */
Mapea.Format = {};

/**
 * Namespace: Layer
 */
Mapea.Layer = {};

/**
 * Namespace: Util
 */
Mapea.Util = {};

/**
 * Namespace: Popup
 */
Mapea.Popup = {};

/**
 * Modified script from:
 * {URL: http://detectmobilebrowsers.com/}
 */
Mapea.Util.isMobile = ((/(android|bb\d+|meego|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)|pocket|psp|series(4|6)0|symbian|treo|windows (ce|phone)|xda|xiino)/i.test(navigator.userAgent||navigator.vendor||window.opera))
        || (window.location.href.toLowerCase().indexOf('desktoptesting') > -1) );


Mapea.Util.hasSearchPanel = false;

Mapea.Util.hasMobileSearchPanel = false;

Mapea.Util.hasLeftPanel = false;

Mapea.Util.hasRightPanel = false;

Mapea.Util.hasContextsButton = false;

Mapea.Util.hasBaseLayer = false;

Mapea.Util.hasContextLoaded = false;

Mapea.Util.hasInitalContextBtn = false;

/** 
 * Function: getImagesLocation
 * 
 * Returns:
 * {String} The fully formatted image location string
 */
Mapea.Util.getImagesLocation = function() {
    return Mapea.ImgPath || (Mapea._getScriptLocation() + "img/");
};

Mapea.Util.getProxyLocation = function() {
    var proxyLocation;
    
    // script
    var scriptPath = Mapea._getScriptLocation();
    var componenteIdx = scriptPath.lastIndexOf('Componente');
    
    // window location
    var currentUrl = window.location.href;
    var slashIdx = currentUrl.lastIndexOf('/');
    
    if (componenteIdx != -1)
        proxyLocation = scriptPath.substring(0,componenteIdx) + 'proxy';
    else if (slashIdx != -1)
        proxyLocation = currentUrl.substring(0,slashIdx) + '/proxy';
    else
        proxyLocation = currentUrl + '/proxy';
    
    return proxyLocation;
};

/** 
 * Function: loadContext
 * 
 * Parameters:
 * wmc - {Mapea.Format.WMC}
 * wmcFile - {String}
 */
Mapea.Util.loadContext = function(wmc, wmcFile, divMap){
    var map;
    
    // Crear mapa
    var peticion = new OpenLayers.Ajax.Request(wmcFile, {
        asynchronous :false
    });
    
    if (peticion) {
        try {
            map = wmc.read(peticion.transport.responseText, {
                    map : divMap, controls: [new OpenLayers.Control.PanZoomBar()],
                    numZoomLevels: 16}                    
            );
                
            // Solo mostrar el mapa visible, especificado en el bounding box
            map.restrictedExtent = map.maxExtent;
            window.currentContext = wmcFile;
        }catch (err) {
            map = null;
            Mapea.Util.showErrorMessage("Error al cargar el contexto: " + err + "\n" + peticion.transport.responseText);
        }
    }
    
    return map;
};      

/** 
 * Function: changeContext
 * 
 * Parameters:
 * wmc - {Mapea.Format.WMC}
 * wmcFile - {String}
 * divMap - {String}
 */
Mapea.Util.changeContext = function(wmc, wmcFile, divMap, map){
    
    var varMap = map || window.map || window.sigcMap.map;
    
    // Crear mapa
    var peticionTmp = new OpenLayers.Ajax.Request(wmcFile, {
            asynchronous :false
    });
    
    if (peticionTmp) {
        try {
            //No return a map object because the name is context and no map. Return a context object.
            context = wmc.read(peticionTmp.transport.responseText, {
                    context : divMap, controls: [new OpenLayers.Control.PanZoomBar()],
                    numZoomLevels: 6}                    
            );
            
            Mapea.Util.removeLayers(varMap);
                   
            varMap.addLayers(context.layers);
            
            varMap.addExternalLayers();
                          
        } catch (err) {
            Mapea.Util.showErrorMessage(err);
        }
    }
};      

/** 
 * Function: removeLayers
 * 
 * Parameters:
 * currentMap - {Mapea.Map}
 */
Mapea.Util.removeLayers = function(currentMap){
    
    if (currentMap.layers != null) {
           
         if (currentMap.layers != null) {
            for (var i = currentMap.layers.length - 1; i>=0; --i) {
                //pass 'false' to destroy so that map wont try to set a new 
                // baselayer after each baselayer is removed               
               // currentMap.layers[i].destroy(false);
               currentMap.removeLayer(currentMap.layers[i],false);
            } 
            //currentMap.layers = null;
        } 
    }
};   

Mapea.Util.unselectFeature = function(evt) {
    if (evt.feature && evt.feature.layer) {
        var mapVar = evt.feature.layer.map;
        if (mapVar) {
            var selectCtrls = mapVar.getControlsByClass('OpenLayers.Control.SelectFeature');
            selectCtrls = selectCtrls.concat(mapVar.getControlsByClass('Mapea.Control.SelectFeature'));
            for (var i=0,len=selectCtrls.length; i<len; i++) {
                selectCtrls[i].clickoutFeature(evt.feature);
            }
            if (mapVar.uniqueSelectFeatureCtrl) {
                mapVar.uniqueSelectFeatureCtrl.clickoutFeature(evt.feature);
            }
        }
    }
};

Mapea.Util.unselectAllFeatures = function(map) {
    var mapVar = map || this.map || window.map || sigcMap.map;
    var selectCtrls = mapVar.getControlsByClass('OpenLayers.Control.SelectFeature');
    selectCtrls = selectCtrls.concat(mapVar.getControlsByClass('Mapea.Control.SelectFeature'));
    for (var i=0,len=selectCtrls.length; i<len; i++) {
        selectCtrls[i].unselectAll();
    }
    if (mapVar.uniqueSelectFeatureCtrl) {
        mapVar.uniqueSelectFeatureCtrl.unselectAll();
    }
};

Mapea.Util.closePopup = function(evt) {
    var mapVar = this.map || window.map || map;
    if (mapVar)
    {
        Mapea.Util.unselectAllFeatures(mapVar);
        Mapea.Util.removeAllPopups(mapVar);
    }
};

Mapea.Util.removeAllPopups = function(map) {
    while (map.popups.length > 0)
    {
        var popup = map.popups[0];
        if (popup)
        {
            map.removePopup(popup);
            popup = null
        }
    }
};

Mapea.Util.featureIconStyle = OpenLayers.Util.applyDefaults({
    graphicWidth: 42,
    graphicHeight: 48,
    graphicXOffset: -21,
    graphicYOffset: -45,
    graphicOpacity: 1,
    cursor: "pointer"
}, OpenLayers.Feature.Vector.style["default"]);

Mapea.Util.newFeatureIconStyle = OpenLayers.Util.applyDefaults({
    graphicWidth: 42,
    graphicHeight: 48,
    graphicXOffset: -21,
    graphicYOffset: -45,
    graphicOpacity: 1,
    cursor: "pointer"
}, OpenLayers.Feature.Vector.style["default"]);

Mapea.Util.userLocationStyle = OpenLayers.Util.applyDefaults({
    graphicWidth: 36,
    graphicHeight: 36,
    graphicXOffset: -18,
    graphicYOffset: -32,
    graphicOpacity: 1,
    cursor: "pointer"
}, OpenLayers.Feature.Vector.style["default"]);

Mapea.Util.drawStyledFeature = function(x, y, attributes, iconStyle) {
    var multipoint = new OpenLayers.Geometry.MultiPoint([new OpenLayers.Geometry.Point(x, y)]);
    var styledFeature = new OpenLayers.Feature.Vector(multipoint, attributes || {}, iconStyle || Mapea.Util.featureIconStyle);
    return styledFeature;
};

Mapea.Util.drawStyledMPoint = function(mpoint, attributes, iconStyle) {
    var styledFeature = new OpenLayers.Feature.Vector(mpoint, attributes || {}, iconStyle || Mapea.Util.featureIconStyle);
    return styledFeature;
};

Mapea.Util.getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
};

Mapea.Util.getUrlVar = function(name) {
    try
    {
        return Mapea.Util.getUrlVars()[name];
    }
    catch(error)
    {
         return null;
    }
};

Mapea.Util.isLayerSwitcher = function(control) {
    var layerSwitcherRegex = /(.*)layerswitcher(.*)/i;
    return layerSwitcherRegex.test(control.CLASS_NAME);
};

Mapea.Util.createImagen = function(imageName, id, position) {
    var imgFullPath = Mapea.global.THEME_IMG_PATH + imageName;
    var imgId = id || ("MapeaImageDiv" + OpenLayers.Util.createUniqueID());
    var image = OpenLayers.Util.createAlphaImageDiv(imgId, null, null, imgFullPath, position || "absolute");
    image.style.margin = "5px";

    return image;
};

Mapea.Util.isButton = function(control) {
    var buttonRegex = /(\w*)\.Control\.Button/i;
    return buttonRegex.test(control.CLASS_NAME);
};

Mapea.Util.isPanel = function(control) {
    var panelRegex = /(\w*)\.Control\.Panel/i;
    return panelRegex.test(control.CLASS_NAME);
};

/**
 * This function shows a jquery dialog
 * with the setting parameter
 */
Mapea.Util.showJQueryDialog = function(setting) {
    // checks if the jquery and mapea css have been loaded
    if (Mapea.global.jQueryCssLoaded && Mapea.global.mapeaCssLoaded) {
        var id, closeFn;
        var dialogClass = "no-close";
        if (setting && (typeof(setting)  == "string") )
        {
            closeFn = function() { jQuery( this ).dialog( "close" ); };
            id = "#" + setting;
            dialogClass += " info";
        }
        else
        {
            closeFn = function() { jQuery( this ).remove(); };
            id = "<div id=\"" + OpenLayers.Util.createUniqueID() + "\" title=\"" + setting.title + "\">";
            id += "<p>" + setting.message + "</p></div>";   
        }
        
        
        if (setting.type)
        {
            dialogClass += " " + setting.type;
        }
        
        var dialogWidthRatio = (Mapea.Util.isMobile? 0.9 : 0.4);
        var dialogWidth = jQuery(window).width() * dialogWidthRatio;
        var dialog = jQuery(id).dialog({
            modal: true,
            width: dialogWidth,
            resizable: false,
            dialogClass: dialogClass,
            open: function(event, ui) {
                jQuery(".ui-dialog.no-close").css("z-index", "10000");
                jQuery(".ui-widget-overlay").css("z-index", "9999");
            },
            buttons: [{
                text: "OK",
                click: closeFn
            }]
        });
    }
    else if (!Mapea.global.jQueryCssLoaded) {
        /* if the jquery css file has not been loaded then
         * loads it and show the dialog */
        Mapea.Util.loadCSSFile(Mapea.global.THEME_JQUERY_PATH, function() {
            Mapea.global.jQueryCssLoaded = true;
            Mapea.Util.showJQueryDialog(setting);
        });
    }
    else if (!Mapea.global.mapeaCssLoaded) {
        /* if the mapea css file has not been loaded then
         * loads it and show the dialog */
        Mapea.Util.loadCSSFile(Mapea.global.THEME_CSS_PATH, function() {
            Mapea.global.mapeaCssLoaded = true;
            Mapea.Util.showJQueryDialog(setting);       
        });
    }
};

Mapea.Util.showErrorMessage = function(errorMsg) {
    Mapea.Util.showJQueryDialog({title: "ERROR", message: errorMsg, type: "error"});
};
Mapea.Util.showInfoMessage = function(errorMsg) {
    Mapea.Util.showJQueryDialog({title: "Información", message: errorMsg, type : "info"});
};
Mapea.Util.showSuccessMessage = function(errorMsg) {
    Mapea.Util.showJQueryDialog({title: "ÉXITO", message: errorMsg, type : "success"});
};

Mapea.Util.isNullOrEmpty = function(obj) {
    var isNullOrEmpty = true;

    if (obj && (obj != null))
    {
        if ((typeof obj) == "string")
            obj = OpenLayers.String.trim(obj);
        
        isNullOrEmpty = (obj.length === 0);
    }

    return isNullOrEmpty;
};

Mapea.Util.appendDivider = function(element) {
    var divider = document.createElement("ul");
    var dividerLi = document.createElement("li");
    OpenLayers.Element.addClass(dividerLi, "divider");
    divider.appendChild(dividerLi);
    element.appendChild(divider);
};

Mapea.Util.getMapProjection = function(map) {

    var mapVar = map || this.map || window.map || sigcMap.map;

    var projection = mapVar.getProjection();
    if ((typeof projection) != "string")
        projection = projection.projCode;

    return projection;
};

Mapea.Util.objectToTable = function(obj, title, colspan) {
    var html = "<table class=\"mapea-table\"><tbody>";
    
    if (title)
    {
        html += "<tr><td class=\"header\" colspan=\""+colspan || 0+"\">"+title+"</td></tr>";
    }

    for (var attr in obj)
    {
        var value = obj[attr];
        if ((typeof value) == "string")
            value = OpenLayers.String.trim(value);
        
        if (!value || (value.length == 0))
        {
            value = "-";
        }

        html += "<tr><td><b>";
        html += attr;
        html += "</b></td><td>";
        html += value;
        html += "</td></tr>";
    }

    html += "</tbody></table>";
    
    return html;
};

Mapea.Util.parseBoolean = function(valueToParse) {
    var parsedValue;
    
    if (!valueToParse) {
        parsedValue = false;
    }
    else {
        var isBoolean = ((typeof valueToParse) == "boolean");
        var isString = ((typeof valueToParse) == "string");
        
        if (isBoolean) {
            parsedValue = valueToParse;
        }
        else if (isString) {
            parsedValue = /^true$/i.test(valueToParse);
        }
        else {
            parsedValue = false;
        }
    }
    
    return parsedValue;
};

/**
 * TODO
 * 
 */
Mapea.Util.allowDragPropagation = function(evt) {
    var propagate = true;
    
    var LAYERSWITCHER_CLASS_REGEX = /.*layerswitcher.*/i;
    var CONTEXTBTN_CLASS_REGEX = /.*mapea.*context.*/i;
    var target = evt.target || evt.toElement || evt.srcElement || evt.element ;
    if (target) {
        var jTarget = jQuery(target);
        var jTargetParent = jTarget.parent();
        
        var targetClass = jTarget.attr("class");
        var targetParentClass = jTargetParent.attr("class");
        
        propagate = (!LAYERSWITCHER_CLASS_REGEX.test(targetClass)
                && !LAYERSWITCHER_CLASS_REGEX.test(targetParentClass)
                && !CONTEXTBTN_CLASS_REGEX.test(targetClass));
    }
    return propagate;
};

/**
 * Check if the layer is a
 * WFS layer
 */
Mapea.Util.isWFS = function(layer) {
    var isWFSLayer = false;

    if (layer && layer.CLASS_NAME) {
        var wfsRegEx = /^(OpenLayers|Mapea)\.Layer\.WFS$/;
        isWFSLayer = wfsRegEx.test(layer.CLASS_NAME);
    }
    
    return isWFSLayer;
}

/**
 * gets the first popup on the
 * map whose pixelX and pixelY are
 * contained by the x and y of the click event
 * with a buffer of difference
 */
Mapea.Util.getPopupInPixelXY = function(map, pixelX, pixelY, buffer) {
    var popup;
    if (map.popups.length > 0) {
        if (!buffer) {
            buffer = 0;
        }
        for (var i=0, ilen=map.popups.length; i < ilen; i++) {
            var mapPopup = map.popups[i];
            var mapPopupX = mapPopup.pixelX;
            var mapPopupY = mapPopup.pixelY;
            var hasXY = ((mapPopupX != "undefined") && (mapPopupY != "undefined"));
            // mapPopupX is in (pixelX - buffer, pixelX + buffer)
            var innerX = ((mapPopupX > (pixelX - buffer))
                            && (mapPopupX < (pixelX + buffer)));
            // mapPopupY is in (pixelY - buffer, pixelY + buffer)
            var innerY = ((mapPopupY > (pixelY - buffer))
                            && (mapPopupY < (pixelY + buffer)));
            if (hasXY && innerX && innerY) {
                popup = mapPopup;
                break;
            }
        }
    }
    return popup;
};

/**
 * gets the first popup on the
 * map whose pixelX and pixelY are
 * contained by the x and y of the click event
 * with a buffer of difference
 */
Mapea.Util.getPopupInPixel = function(map, pixel, bufferParam) {
    var pixelX = pixel.x;
    var pixelY = pixel.y;
    var buffer = bufferParam || Mapea.Control.GetLayersInfo.SHOW_INFO_BUFFER;
    
    return Mapea.Util.getPopupInPixelXY(map, pixelX, pixelY, buffer);
};

/**
 * This function loads a css file and
 * executes a callback when the file
 * is loaded
 */
Mapea.Util.loadCSSFile = function(url, callback, time) {
    var checkingTimeDefault = 50;
    var checkingTime = time || checkingTimeDefault;

    // creates a <link> element
    var cssLinkEl = document.createElement("link");
    cssLinkEl.setAttribute("rel", "stylesheet");
    cssLinkEl.setAttribute("type", "text/css");
    cssLinkEl.setAttribute("mapeastyle", "true");
    cssLinkEl.setAttribute("href", url);

    // IE attaches event to element
    if (jQuery.browser.msie) {
        cssLinkEl.onreadystatechange = function() {
            var state = cssLinkEl.readyState;
            if (state === 'loaded' || state === 'complete') {
                cssLinkEl.onreadystatechange = null;
                callback();
            }
        };
    }

    // FF does not have any load event
    else if (jQuery.browser.mozilla) {
        var testElement = jQuery("<div class=\"test-css-load-firefox\">")
            .css("display", "none");

        testElement.appendTo(document);
 
        var intervalId = setInterval(function() {
            if ((testElement.css("height") === "500px")
                || (url == Mapea.global.THEME_JQUERY_PATH)) {
                testElement.remove();
                callback();
                clearInterval(intervalId);
            }
        }, checkingTimeDefault); 
    }

    // OPERA fires load via onload
    else if (jQuery.browser.opera) {
        cssLinkEl.onload = function () {
            callback();
        };
    }

    /* 
     CHROME and SAFARI will update document.styleSheets
     only when the file arrives
    */
    else if (jQuery.browser.webkit) {
        var cssnum = document.styleSheets.length;
        var intervalId = setInterval(function() {
            var newcssnum = document.styleSheets.length;
            if (newcssnum > cssnum) {
                var cssLoaded = false;
                for (var i=0; (i < newcssnum) && !cssLoaded; i++) {
                    var styleSheetUrl = document.styleSheets[i].href;
                    cssLoaded = (styleSheetUrl == url);
                }
                if (cssLoaded) {
                    callback();
                    clearInterval(intervalId);
                } 
            }
        }, checkingTimeDefault);
    }

    // appends the <link> to the <head>
    document.getElementsByTagName("head")[0].appendChild(cssLinkEl); 
};

/**
 * This function removes the css files
 * which have mapeastyle attribute set true
 */
Mapea.Util.removeMapeaCSSFiles = function() {
    jQuery("link[mapeastyle='true']").remove();
    Mapea.global.jQueryCssLoaded = false;
    Mapea.global.mapeaCssLoaded = false;
};

/**
 * This function establishes the theme paths
 * from the theme parameter specified
 */
Mapea.Util.setThemePaths = function(themeParameter) {
    // checks if it is a preconfigured theme
    var themeUrl, predefinedThemeUrl, definedThemes, predefinedThemesUrls;
    
    definedThemes = window.strDefinedThemes.split(",");
    predefinedThemesUrls = window.strDefinedThemesUrl.split(",");
    for (var i=0, ilen=definedThemes.length; i < ilen; i++) {
        var themeName = definedThemes[i];
        if (themeName == themeParameter) {
            predefinedThemeUrl = predefinedThemesUrls[i];
            break;
        }
    }

    if (predefinedThemeUrl != null) {
        themeUrl = predefinedThemeUrl;
    }
    else {
        /* if it is not a preconfigured theme then
         * it is a new theme url */
        themeUrl = themeParameter;
    }

    // if it has not last slash it is appended
    if (themeUrl.charAt(themeUrl.length - 1) != "/") {
        themeUrl += "/";
    }
    
    /**
     * Imports the css stlye sheet to apply
     * the defined style to the page
     */
    Mapea.global.THEME_PATH = themeUrl;
    Mapea.global.THEME_JQUERY_PATH = Mapea.global.THEME_PATH + "jquery/jquery.css";
    Mapea.global.THEME_CSS_PATH = Mapea.global.THEME_PATH + "style.css";        
    Mapea.global.THEME_IMG_PATH = Mapea.global.THEME_PATH + "images/";
    Mapea.global.THEME_BLANK_IMG_PATH = Mapea.global.THEME_IMG_PATH + "blank.gif";
    Mapea.Util.featureIconStyle.externalGraphic = Mapea.global.THEME_IMG_PATH + "search/pointer.png";
    Mapea.Util.newFeatureIconStyle.externalGraphic = Mapea.global.THEME_IMG_PATH + "search/newPointer.png";
    Mapea.Util.userLocationStyle.externalGraphic = Mapea.global.THEME_IMG_PATH + "search/user.png";
};

/**
 * TODO
 */
Mapea.Util.resizeAllPanels = function(map) {
    var mapa = map || window.map || window.sigcMap;

    if ((mapa.theme != null) && mapa.theme.isLoaded) {
        // SEARCH PANEL
        //center the search dialog
        Mapea.Util.centerSearchDialog();

        //recalculate the help div position
        Mapea.Util.relocateHelpCallejero();

        // components
        var leftPanelHtml, rightPanelHtml, layerSwitcherCtrl;

        // LEFT PANEL
        if (Mapea.Util.hasLeftPanel) {
            leftPanelHtml = jQuery(".left-panel");
            Mapea.Util.adjustPanel(leftPanelHtml, "margin-left");
        }

        // RIGHT PANEL
        if (Mapea.Util.hasRightPanel) {
            rightPanelHtml = jQuery(".right-panel");
            Mapea.Util.adjustPanel(rightPanelHtml, "margin-right");
        }

        // LAYERSWITCHER
        Mapea.Util.adjustLayerSwitcher(mapa);

        // ZOOM AND PANZOOM
        Mapea.Util.adjustZoomControls(mapa);
    }
};

/**
 * TODO
 */
Mapea.Util.adjustPanel = function(jPanel, cssProperty) {
    var iconPanel = jPanel.find(".maximizeButton");
    var iconPanelWidth = iconPanel.outerWidth();
    var panelTotalWidth = jPanel.outerWidth();
    
    // reset heights
    iconPanel.css("height", "");

    // establishes the height
    var panelTotalHeight = jPanel.outerHeight();
    iconPanel.css("height", panelTotalHeight);

    var marginLeft = panelTotalWidth - iconPanelWidth;
    jPanel.attr("desplace", -marginLeft);
    var dialogIsOpen = jPanel.attr("open");
    if (!dialogIsOpen) {
        jPanel.css(cssProperty || "margin-left", -marginLeft);
    }
    
    if (Mapea.Util.hasMobileGeosearchPanel || Mapea.Util.hasMobileSearchStreetPanel) {
        var searchMobileHeight = jQuery(".search-mobile-body").innerHeight();
        jPanel.css("top", searchMobileHeight + 6);// 6 pixel extra
    }
};

/**
 * TODO
 */
Mapea.Util.adjustLayerSwitcher = function(map) {
    var layerSwitcherCtrls = map.getControlsByClass("Mapea.Control.LayerSwitcher");
    if (layerSwitcherCtrls.length > 0) {
        var layerSwitcherCtrl = layerSwitcherCtrls[0];
        
        // top
        var top = 0;
        if (Mapea.Util.hasMobileGeosearchPanel || Mapea.Util.hasMobileSearchStreetPanel) {
            top += jQuery(".search-mobile-body").innerHeight() + 6; // 6 pixel extra
        }
        
        if (Mapea.Util.hasRightPanel) {
            top += jQuery(".right-panel").innerHeight();
        }
        jQuery(layerSwitcherCtrl.div).css("top", top);
    }
};

Mapea.Util.adjustZoomControls = function(map) {
    var leftPanelHeight = 0, mobileSearchPanelHeight = 0;

    if (Mapea.Util.hasLeftPanel) {
        leftPanelHeight = jQuery(".left-panel").outerHeight();
    }    
    if (Mapea.Util.hasMobileSearchPanel || Mapea.Util.hasSearchStreetPanel || Mapea.Util.hasGeosearchPanel) {
        mobileSearchPanelHeight = jQuery(".search-mobile-maximize").outerHeight();
    }
    else if (Mapea.Util.hasMobileGeosearchPanel || Mapea.Util.hasMobileSearchStreetPanel) {
        mobileSearchPanelHeight = jQuery(".search-mobile-body").innerHeight();
        mobileSearchPanelHeight += 6; // 6 pixel extra
    }

    var zoomControlsTop = leftPanelHeight + mobileSearchPanelHeight;

    // PanZoomBar control
    var panZoomBarCtrls = map.getControlsByClass("Mapea.Control.PanZoomBar");
    for (var i=0,len=panZoomBarCtrls.length; i<len; i++) {
        jQuery(panZoomBarCtrls[i].div).css("top",zoomControlsTop);
    }

    var panZoomCtrls = map.getControlsByClass("Mapea.Control.PanZoom");
    for (var i=0,len=panZoomCtrls.length; i<len; i++) {
        jQuery(panZoomCtrls[i].div).css("top", zoomControlsTop);
    }
        
    var zoomCtrls = map.getControlsByClass("OpenLayers.Control.Zoom");
    for (var i=0,len=zoomCtrls.length; i<len; i++) {
        jQuery(zoomCtrls[i].div).css("top", zoomControlsTop);
    }
};

/**
 * TODO
 */
Mapea.Util.centerSearchDialog = function() {
    var windowHeight = jQuery(window).height();
    var windowWidth = jQuery(window).width();
    
    if (Mapea.Util.hasSearchPanel) {
        var dialogHeight = jQuery('#mapeaIdSearch').height();
        if ( (windowHeight < (dialogHeight+10)) && $.browser.msie )
        {
            windowHeight = document.body.clientHeight;
        }
        //jQuery('#mapeaIdSearch').css("top", windowHeight-dialogHeight-10);
        jQuery('#mapeaIdSearch').css("top", windowHeight-dialogHeight);
        //jQuery("#mapeaIdSearch").css("width","530px");

        windowWidth = windowWidth/2;
        var dialogWidth = jQuery('#mapeaIdSearch').width();

        dialogWidth = dialogWidth/2;
        jQuery('#mapeaIdSearch').css("left",windowWidth-dialogWidth);
        jQuery('#mapeaIdSearch').css("z-index","1900");
    }
    else if (Mapea.Util.hasMobileSearchPanel) {
        // width
        var iconSearchWidth = jQuery(".search-mobile-maximize").innerWidth();
        
        var searchWidth = Math.min(Math.ceil(windowWidth*0.9), 500);
        
        var marginLeft = searchWidth - iconSearchWidth;
        
        jQuery(".search-mobile").css("width", searchWidth).attr("desplace", -marginLeft);
        var dialogIsOpen = jQuery('.search-mobile-maximize').attr("open");
        if (!dialogIsOpen) {
            jQuery(".search-mobile").css("margin-left", -marginLeft);
        }       
        var jSearchMobileBody = jQuery(".search-mobile-body");
        jSearchMobileBody.css("width", marginLeft);
        
        // checks if the body has applied padding...
        var mobileBodyInnerWidth = jSearchMobileBody.innerWidth();
        var paddingWidth = mobileBodyInnerWidth - marginLeft;
        jSearchMobileBody.css("width", marginLeft - paddingWidth);

        // height
        var searchHeight = Math.floor((windowHeight * 0.9) - 180);
        jQuery(".search-results").css("max-height", searchHeight);
        jQuery("#searchstreet-results").css("height", searchHeight);
        jQuery("#geosearch-results").css("height", searchHeight);

        // top
        var top = 0;
        if (Mapea.Util.hasLeftPanel) {
            top = jQuery(".left-panel").outerHeight();
        }
        jQuery(".search-mobile").css("top", top);
    }
    else if (Mapea.Util.hasGeosearchPanel) {
        // width
        var iconSearchWidth = jQuery(".search-mobile-maximize").innerWidth();
        
        var searchWidth = Math.min(Math.ceil(windowWidth*0.9), 500);
        
        var marginLeft = searchWidth - iconSearchWidth;
        
        jQuery(".search-mobile").css("width", searchWidth).attr("desplace", -marginLeft);
        var dialogIsOpen = jQuery('.search-mobile-maximize').attr("open");
        if (!dialogIsOpen) {
            jQuery(".search-mobile").css("margin-left", -marginLeft);
        }       
        var jSearchMobileBody = jQuery(".search-mobile-body");
        jSearchMobileBody.css("width", marginLeft);
        
        // checks if the body has applied padding...
        var mobileBodyInnerWidth = jSearchMobileBody.innerWidth();
        var paddingWidth = mobileBodyInnerWidth - marginLeft;
        jSearchMobileBody.css("width", marginLeft - paddingWidth);

        // height
        var searchHeight = Math.floor((windowHeight * 0.9) - 180);
        jQuery(".search-results").css("max-height", searchHeight);
        jQuery("#searchstreet-results").css("height", searchHeight);
        jQuery("#geosearch-results").css("height", searchHeight);

        // top
        var top = 0;
        if (Mapea.Util.hasLeftPanel) {
            top = jQuery(".left-panel").outerHeight();
        }
        jQuery(".search-mobile").css("top", top);
    }
    else if (Mapea.Util.hasMobileGeosearchPanel) {
        var headHeight = Mapea.Geosearch.RESULTS_HEADER_BUTTON.outerHeight();
        var resultsDivHeight = (windowHeight*0.8) - headHeight;
        Mapea.Geosearch.GEOSEARCH_CONTAINER.css("max-height", resultsDivHeight);
        if (Mapea.Geosearch.SEARCHSTREET) {
            Mapea.Geosearch.STREET_CONTAINER.css("max-height", resultsDivHeight);
            jQuery(".search-mobile.mobile .geosearchstreet-results .ui-tabs-nav li")
            .css("width", (windowWidth/2) - 2);
        }
    }
    else if (Mapea.Util.hasSearchStreetPanel) {
        // width
        var iconSearchWidth = jQuery(".search-mobile-maximize").innerWidth();
        
        var searchWidth = Math.min(Math.ceil(windowWidth*0.9), 500);
        
        var marginLeft = searchWidth - iconSearchWidth;
        
        jQuery(".search-mobile").css("width", searchWidth).attr("desplace", -marginLeft);
        var dialogIsOpen = jQuery('.search-mobile-maximize').attr("open");
        if (!dialogIsOpen) {
            jQuery(".search-mobile").css("margin-left", -marginLeft);
        }       
        var jSearchMobileBody = jQuery(".search-mobile-body");
        jSearchMobileBody.css("width", marginLeft);
        
        // checks if the body has applied padding...
        var mobileBodyInnerWidth = jSearchMobileBody.innerWidth();
        var paddingWidth = mobileBodyInnerWidth - marginLeft;
        jSearchMobileBody.css("width", marginLeft - paddingWidth);

        // height
        var searchHeight = Math.floor((windowHeight * 0.9) - 180);
        jQuery(".search-results").css("max-height", searchHeight);
        jQuery("#searchstreet-results").css("max-height", searchHeight);

        // top
        var top = 0;
        if (Mapea.Util.hasLeftPanel) {
            top = jQuery(".left-panel").outerHeight();
        }
        jQuery(".search-mobile").css("top", top);
    }
    else if (Mapea.Util.hasMobileSearchStreetPanel) {
        var headHeight = Mapea.SearchStreet.RESULTS_HEADER_BUTTON.outerHeight();
        var resultsDivHeight = (windowHeight*0.8) - headHeight;
        Mapea.SearchStreet.STREET_CONTAINER.css("max-height", resultsDivHeight);
        jQuery(".search-mobile.mobile .geosearchstreet-results .ui-tabs-nav li")
            .css("width", "100%");
    }
};

/**
 * TODO
 */
Mapea.Util.relocateHelpCallejero = function() {
    if (Mapea.Util.hasSearchPanel) {
        var searchTop = jQuery("#mapeaIdSearch").position().top;
        var searchLeft = jQuery("#mapeaIdSearch").position().left;
        var searchPanelHeight = jQuery("#mapeaIdSearch").css("height");
        searchPanelHeight = searchPanelHeight.substring(0, searchPanelHeight.length-2);
        searchPanelHeight = +searchPanelHeight;
        jQuery("#helpdiv").css("top",searchTop+searchPanelHeight).css("left",searchLeft+28);
    }
};

/**
 * Checks if the browser support a css property
 * Script from:
 * {URL: https://gist.github.com/jackfuchs/556448}
 */
Mapea.Util.supportCssProperty = function(p, rp) {
    var b = document.body || document.documentElement,
    s = b.style;
 
    // No css support detected
    if (typeof s == 'undefined') { return false; }
 
    // Tests for standard prop
    if (typeof s[p] == 'string') { return rp ? p : true; }
 
    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', 'Icab'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i=0; i<v.length; i++) {
      if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
    }
};

/**
 * gets the defined color for measure
 * paths and areas in the CSS file
 */
Mapea.Util.getMeasurePathAreaColor = function(map) {
    var color;

    // appends a div with the CSS class to map div
    var jTestDiv = jQuery("<div style=\"visibility: hidden;\" class=\"measure-path-area-color\">");
    jTestDiv.appendTo(jQuery(map.div));

    // gets its color CSS property
    color = jTestDiv.css("color");

    // removes the div
    jTestDiv.remove();

    return color;
};

/**
 * TODO
 */
Mapea.Util.buildMobileSearch = function() {
    
    $("#mapea-search-mobile").css("display", "");

    $('.search-mobile-maximize').click(function(event) {
        event.preventDefault();
        
        var isOpen = $(this).attr("open");
        if (isOpen) {
            var marginLeftCss = $("#mapea-search-mobile").attr("desplace");
            marginLeftCss = parseInt(marginLeftCss);
            $("#mapea-search-mobile").css("margin-left", marginLeftCss);
            $(this).attr("open", false);
        }
        else {
            $("#mapea-search-mobile").css("margin-left", "0px");
            $(this).attr("open", true);
            
            // we apply focus to the field if the device is not mobile
            (!Mapea.Util.isMobile && $("#idInputSearchMobile").focus());
        }       
    });

    $("#idBtnSearchMobile").click(function(event) {
        event.preventDefault();
        onBtnBuscarGeneral(htmlMobileSearchCallback, htmlGeocoderMobileProcessor,
            htmlMobileSearchCallback, htmlSearchCallejeroMobileProcessor);
    });

    $(".clear-btn").click(function(event) {
        event.preventDefault();
        $("#idInputSearchMobile").val("");
        $(".search-results").html("");
        $(".search-results-wrapper").css("display", "none");
        cleanSearchGeneralForm();
    });
    
    $(".search-results-wrapper").removeClass("hide").css("display", "none");
    $(".geosearchstreet-results").css("display", "none");
    $(".clear-btn").css("float", "left");
    $(".search-input-table td:nth-child(3)").addClass("callejero");

    Autocomplete.init('idInputSearchMobile');
    
    // gets the specified locality and city by codine
    if (Mapea.Util.filterLocality) {
        var headForm = jQuery(".search-form-locality").css("display", "block");
        Mapea.CDA.getLocalityFromCodINE(Mapea.Util.filterLocality, function(locality, city) {
            var nombreMunicipio = Mapea.Util.beautifyString(locality);
            var nombreProvincia = Mapea.Util.beautifyString(city);
            
            var headerText = "Búsquedas en " + nombreMunicipio + " (" + nombreProvincia + ")";
            headForm.html(headerText);
        }, function() {
            Mapea.Util.showErrorMessage("El código del municipio '" + Mapea.Util.filterLocality + "' no es válido");
        });
    }
    
    // hides results header
    jQuery(".search-results-header").css("display", "none");
    
    Mapea.Util.hasMobileSearchPanel = true;
};

Mapea.Util.disableVerticalScroll = function() {
    if (!Mapea.Util.disabledVerticalScroll) {
        OpenLayers.Event.observe(document, 'touchstart', function(e) {
            e.preventDefault();
            return false;
        });
        OpenLayers.Event.observe(document, 'touchmove',function(e) {
            e.preventDefault();
            return false;
        });
        Mapea.Util.disabledVerticalScroll = true;
    }
};
Mapea.Util.enableVerticalScroll = function() {
    OpenLayers.Event.stopObservingElement(document);
    Mapea.Util.disabledVerticalScroll = false;
};

Mapea.Util.beautifyString = function(rawString) {
    var beautifyString;
    
    // 1 to lower case
    beautifyString = rawString.toLowerCase();
    
    // 2 trim
    beautifyString = OpenLayers.String.trim(beautifyString);
    
    // 3 first char to upper case
    beautifyString = beautifyString.charAt(0).toUpperCase() + beautifyString.slice(1);
    
    // 4 replaces "_" by spaces
    beautifyString = beautifyString.replace(/\_/g, " ");
    
    // 5 simplifies spaces
    beautifyString = beautifyString.replace(/\s+/, " ");
    
    // 6 to camel case
    beautifyString = beautifyString.replace(/(\s\w)+/g, function(match) {
        return match.toUpperCase();
    });
    
    // 7 common words to lower case
    beautifyString = beautifyString.replace(/\s+(de|del|las?|el|los?|un|unas?|unos?|y|a|al|en)\s+/ig, function(match) {
        return match.toLowerCase();
    });
    
    return beautifyString;
};

/**
 * Get the pixel X and pixel Y from the
 * click event triggered by the user
 */
Mapea.Util.getClickedPixelFromEvent = function(event) {
    var clickedPixel = {};

    if (event) {
        // gets the x and y of the click event
        if (event.xy) {
            clickedPixel.x = event.xy.x;
            clickedPixel.y = event.xy.y;
        }
        else if (event.layerX && event.layerY) {
            clickedPixel.x = event.layerX;
            clickedPixel.y = event.layerY;
        }
        else if (jQuery.browser.msie && event.x && event.y) {
            clickedPixel.x = event.x;
            clickedPixel.y = event.y;
        }
        else if (jQuery.browser.msie && event.clientX && event.clientY) {
            clickedPixel.x = event.clientX;
            clickedPixel.y = event.clientY;
        }
        else {
            clickedPixel.x = event.offsetX;
            clickedPixel.y = event.offsetY;
        }
    }
    else if (Mapea.global.lastClickedXY) {
        // gets the x and y of the last click event
        clickedPixel.x = Mapea.global.lastClickedXY.x;
        clickedPixel.y = Mapea.global.lastClickedXY.y;
    }

    return clickedPixel;
};
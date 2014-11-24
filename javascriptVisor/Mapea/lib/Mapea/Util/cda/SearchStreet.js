/**
 * TODO
 */
Mapea.SearchStreet = {};

/**
 * TODO
 */
Mapea.SearchStreet.SEARCHING = false;

/**
 * TODO
 */
Mapea.SearchStreet.SHOW_RESULTS = false;

/**
 * TODO
 */
Mapea.SearchStreet.LAYER_NAME = "Direcciones";

/**
 * TODO
 */
Mapea.SearchStreet.FILTER_LOCALITY = null;

/**
 * TODO
 */
Mapea.SearchStreet.FILTER_CITY = null;

/**
 * TODO
 */
Mapea.SearchStreet.build = function() {
    jQuery(".search-results").css("display", "none");

    Mapea.SearchStreet.GEOCODER_STYLE = OpenLayers.Util.applyDefaults(
        {externalGraphic: Mapea.global.THEME_IMG_PATH + "search/pointerRed.png"}, Mapea.Util.featureIconStyle);
    
    // creates the streets layer
    Mapea.SearchStreet.LAYER = new Mapea.Layer.Vector(Mapea.SearchStreet.LAYER_NAME,
            { displayInLayerSwitcher: false, ratio : 2});
    map.addLayer(Mapea.SearchStreet.LAYER, true);
    
    // creates the select feature
    Mapea.SearchStreet.LAYER.events.register('featureselected', this, Mapea.SearchStreet.onFeatureSelect);
    Mapea.SearchStreet.LAYER.events.register('featureunselected', this, Mapea.Util.closePopup);
    map.uniqueSelectFeatureCtrl.addLayers(Mapea.SearchStreet.LAYER);
    
    // gets the specified locality and city by codine
    if (Mapea.Util.filterLocality) {
        var headForm = jQuery(".search-form-locality").css("display", "block");
        if (Mapea.Util.isMobile) {
            headForm.addClass("mobile");
        }
        Mapea.CDA.getLocalityFromCodINE(Mapea.Util.filterLocality, function(locality, city) {
            
            Mapea.SearchStreet.FILTER_LOCALITY = locality;
            Mapea.SearchStreet.FILTER_CITY = city;
            
            var nombreMunicipio = Mapea.Util.beautifyString(locality);
            var nombreProvincia = Mapea.Util.beautifyString(city);
            
            var headerText = "";
            if (!Mapea.Util.isMobile) {
                headerText += "Búsquedas en ";
            }
            headerText += nombreMunicipio + " (" + nombreProvincia + ")";
            
            headForm.html(headerText);
        }, function() {
            Mapea.Util.showErrorMessage("El código del municipio '" + Mapea.Util.filterLocality + "' no es válido");
        });
    }
    
    // build the interface
    if (Mapea.Util.isMobile) {
        Mapea.SearchStreet.buildMobile();
        Mapea.Util.hasMobileSearchStreetPanel = true;
    }
    else {
        Mapea.SearchStreet.buildREST();
        Mapea.Util.hasSearchStreetPanel = true;
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.buildREST = function() {
    // show the UI
    $(".help-btn").css("display", "none");
    $("#mapea-search-mobile").css("display", "");

    Mapea.SearchStreet.RESULTS_BUTTON = $(".results-btn");
    Mapea.SearchStreet.SEARCH_INPUT = $("#idInputSearchMobile");
    Mapea.SearchStreet.SEARCH_BUTTON = $("#idBtnSearchMobile");
    Mapea.SearchStreet.STREET_CONTAINER = $("#searchstreet-results");
    Mapea.SearchStreet.CLEAR_BUTTON = $(".clear-btn");
    Mapea.SearchStreet.SEARCHING_IMAGE = $("#searching");
    Mapea.SearchStreet.RESULTS_WRAPPER = $(".search-results-wrapper");

    // registers click events to show or hide the search dialog
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
            (!Mapea.Util.isMobile && Mapea.SearchStreet.SEARCH_INPUT.focus());
        }       
    });

    Mapea.SearchStreet.SEARCH_BUTTON.click(function(event) {
        event.preventDefault();
        var inputText = Mapea.SearchStreet.SEARCH_INPUT.val();
        Mapea.SearchStreet.execute(inputText);
    });

    Mapea.SearchStreet.CLEAR_BUTTON.click(Mapea.SearchStreet.clearButtonFn);
    
    Mapea.SearchStreet.RESULTS_BUTTON.click(Mapea.SearchStreet.showHideResults);
    
    Autocomplete.init('idInputSearchMobile', {
        'onselect' : Mapea.SearchStreet.selectValue,
        'onenterpress' : function(event) {
            Mapea.SearchStreet.SEARCH_BUTTON.click();
        }
    });
    // hides geosearch resutls tab
    jQuery("#geosearchtab").css("display", "none");
    
    $(".geosearchstreet-results").tabs();

    // hides results header
    jQuery(".search-results-header").css("display", "none");
};

/**
 * TODO
 */
Mapea.SearchStreet.execute = function(inputText) {
    Mapea.SearchStreet.QUERY = OpenLayers.String.trim(inputText || "");

    if (Mapea.SearchStreet.QUERY.length > 0) {
        
        // shows searching images
        Mapea.SearchStreet.showSearchingImages();

        Mapea.SearchStreet.executeGeocoder(Mapea.SearchStreet.initalizeGeocoder);
    }
    else {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de búsqueda");
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.drawGeocoderResults = function(geocoderResults) {
    // draw results
    for ( var i = 0, ilen = geocoderResults.length; i < ilen; i++) {
        var geocoderResult = geocoderResults[i];
        
        var feature = Mapea.SearchStreet.geocoderResult2Feature(geocoderResult);
        
        // clone the feature
        var clonedFeature = feature.clone();
        clonedFeature.fromGeocoder = true;

        feature.cloneId = clonedFeature.id;
        
        var html = Mapea.SearchStreet.geocoderFeature2Html(feature);
        
        Mapea.SearchStreet.STREET_CONTAINER.append(html);
        Mapea.SearchStreet.LAYER.addFeatures([feature]);
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.geocoderResult2Feature = function(geocoderResult, streetLocality, streetCity) {
    var x = geocoderResult.coordX;
    var y = geocoderResult.coordY;
    var name = geocoderResult.streetName;
    var number = geocoderResult.streetNumber;
    var codine = geocoderResult.codINE;
    var type = geocoderResult.streetType;
    var municipio = geocoderResult.municipio;
    if (municipio == null || municipio == "") {
        municipio = streetLocality
    }
    var provincia = geocoderResult.provincia;
    if (provincia == null || provincia == "") {
        provincia = streetCity
    }
    var fullStreet = type + " " + (number == 0 ? name : name + ", " + number);
    
    var featureStyle = Mapea.SearchStreet.GEOCODER_STYLE;
        
    var multipoint = new OpenLayers.Geometry.MultiPoint([new OpenLayers.Geometry.Point(x, y)]);
    var multipointfeature = new OpenLayers.Feature.Vector(multipoint, {
        "Tipo de v&iacute;a" : Mapea.Util.beautifyString(type),
        "Nombre de v&iacute;a": Mapea.Util.beautifyString(name),
        "N&uacute;mero" : Mapea.Util.beautifyString(number)
    }, featureStyle);
    
    // shows the address on the popup head
    multipointfeature.attributes["keywords"] = [fullStreet];
    
    multipointfeature.fromGeocoder = true;
    multipointfeature.attributes.municipio = Mapea.Util.beautifyString(municipio);
    multipointfeature.attributes.provincia = Mapea.Util.beautifyString(provincia);
    
    return multipointfeature;
};

/**
 * TODO
 */
Mapea.SearchStreet.geocoderFeature2Html = function(feature) {
        
    var name = feature.attributes["Nombre de v&iacute;a"];
    var number = feature.attributes["N&uacute;mero"];
    
    var type = feature.attributes["Tipo de v&iacute;a"];
    var municipio = feature.attributes.municipio;
    var provincia = feature.attributes.provincia;

    var fullStreet = type + " " + (number == 0 ? name : name + ", " + number);
    
    // initialize
    var html = '<div class="search-result street">';
        
    // full street
    html += Mapea.SearchStreet.keyValue2Html(null, fullStreet);

    // city
    var localityCity = municipio + " (" + provincia + ")";
    html += Mapea.SearchStreet.keyValue2Html(null, localityCity);
  
    // end
    html += '<input id="featureId" type="hidden" value="' + feature.id + '" />';
    html += '<input id="cloneId" type="hidden" value="' + feature.cloneId + '" />';
    html += '</div>';
    
    return html;
};

/**
 * TODO
 */
Mapea.SearchStreet.keyValue2Html = function(key, value) {
    var html = '<table class="result-table"><tr>';
    
    if (key) {
        html += '<td class="key">';
        html += key;
        html += '</td>';
    }
    html += '<td class="value">';
    html += value;
    html += '</td>';
    
    html += '</tr></table>';
    
    return html;
};

/**
 * TODO
 */
Mapea.SearchStreet.attachEventsToGeocoderResults = function() {
    Mapea.SearchStreet.STREET_CONTAINER.children('.search-result').each(function() {
        var obj = $(this);
        if (obj.attr("evtAdded") == null) {
            obj.attr("evtAdded", true);
            obj.click(function(e) {
                e.preventDefault();
                
                var featureId = $(this).children('#featureId').val();
                var clonedFeatureId = $(this).children('#cloneId').val();
                
                var feature = Mapea.SearchStreet.LAYER.getFeatureById(featureId);
                if (!feature) {
                    feature = Mapea.SearchStreet.LAYER.getFeatureById(clonedFeatureId);
                }
                feature.layer = Mapea.SearchStreet.LAYER;
                
                Mapea.Util.removeAllPopups(map);
                Mapea.Util.unselectAllFeatures(map);
                
                map.uniqueSelectFeatureCtrl.clickFeature(feature);
                
                var x = feature.geometry.getCentroid().x;
                var y = feature.geometry.getCentroid().y;
                
                var center = new OpenLayers.LonLat(x, y);
                map.setCenter(center, 14);
                
                if (Mapea.Util.isMobile) {
                    Mapea.SearchStreet.hideResults();
                }
            });
        }
    });
};

/**
 * TODO
 */
Mapea.SearchStreet.zoomResultBbox = function() {
    if (!Mapea.SearchStreet.GEOSEARCH_SEARCHING
            && !Mapea.SearchStreet.STREET_SEARCHING) {
        var lefts = [];
        var rights = [];
        var tops = [];
        var bottoms = [];
        
        var features = Mapea.SearchStreet.LAYER.features;
        
        for (var i=0,ilen=features.length; i<ilen; i++)
        {
            var feature = features[i];
            if (feature && feature.geometry)
            {
                //var bounds = features[0].geometry.getBounds();
                var bounds = feature.geometry.getBounds();
                if (bounds)
                {
                    lefts.push(bounds.left);
                    rights.push(bounds.right);
                    tops.push(bounds.top);
                    bottoms.push(bounds.bottom);
                }
            }
        }
        var maxLeft = Math.min.apply(null, lefts);
        var maxRight = Math.max.apply(null, rights);
        var maxTop = Math.max.apply(null, tops);
        var maxBottom = Math.min.apply(null, bottoms);
        
        var envolvedBbox = new OpenLayers.Bounds(maxLeft, maxBottom, maxRight, maxTop);
        if (envolvedBbox && (envolvedBbox != null)) {
            map.zoomToExtent(envolvedBbox);
        }
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.handleNormalizeResponse = function(rawResponse) {
    var normalizeResponse = {};
        
    var multiRefElements = rawResponse.getElementsByTagName("multiRef");
    if (multiRefElements.length > 0) {
        var multiRefElement = multiRefElements[0];
        var codigoPostalElement = multiRefElement.getElementsByTagName("codigoPostal")[0];
        var complementosElement = multiRefElement.getElementsByTagName("complementos")[0];
        var direccionNormalizadaElement = multiRefElement.getElementsByTagName("direccionNormalizada")[0];
        var direccionSinNormalizaElement = multiRefElement.getElementsByTagName("direccionSinNormalizar")[0];
        var municipioElement = multiRefElement.getElementsByTagName("municipio")[0];
        var nombreViaElement = multiRefElement.getElementsByTagName("nombreVia")[0];
        var numeroPortalElement = multiRefElement.getElementsByTagName("numeroPortal")[0];
        var provinciaElement = multiRefElement.getElementsByTagName("provincia")[0];
        var tipoViaElement = multiRefElement.getElementsByTagName("tipoVia")[0];
        
        normalizeResponse.codigoPostal = $(codigoPostalElement).text();
        normalizeResponse.complementos = $(complementosElement).text();
        normalizeResponse.direccionNormalizada = $(direccionNormalizadaElement).text();
        normalizeResponse.direccionSinNormalizar = $(direccionSinNormalizaElement).text();
        normalizeResponse.municipio = $(municipioElement).text();
        normalizeResponse.nombreVia = $(nombreViaElement).text();
        normalizeResponse.numeroPortal = $(numeroPortalElement).text();
        normalizeResponse.provincia = $(provinciaElement).text();
        normalizeResponse.tipoVia = $(tipoViaElement).text();
    }
    
    return normalizeResponse;
};

/**
 * TODO
 */
Mapea.SearchStreet.initalizeGeocoder = function(normalizeResponse, fromAutocomplete) {
    // get parameters
    var tipoVia = normalizeResponse.tipoVia;
    var nombreVia = normalizeResponse.nombreVia;
    var numeroPortal = normalizeResponse.numeroPortal;
    var municipio = Mapea.SearchStreet.FILTER_LOCALITY || normalizeResponse.municipio;
    var provincia = Mapea.SearchStreet.FILTER_CITY || normalizeResponse.provincia;
    var complementos = normalizeResponse.complementos;
    
    var municipioNullOrBlank = function() {
        return ((municipio == null) || (municipio.length <= 0));
    };
    
    var provinciaNullOrBlank = function() {
        return ((provincia != null) && (provincia.length <= 0));
    };
    
    /*
     * try to get the province or the city
     * from complements or from the street name
     */
    if (municipioNullOrBlank() && provinciaNullOrBlank()) {
        // from complements
        if ((complementos != null) && (complementos.length > 0)) {
            var normalizedComplements = complementos.replace(/\-/g, " ");
            normalizedComplements = OpenLayers.String.trim(normalizedComplements);
            municipio = normalizedComplements;
            
        // from street name
        }
        else {
            var REGEX_GET_PROVINCE = /(.*)(SEVILLA|HUELVA|C[AÁ]DIZ|M[AÁ]LAGA|C[OÓ]RDOBA|GRANADA|JA[EÉ]N|ALMER[IÍ]A)(.*)/i;
            var REGEX_REMOVE_PROVINCE = /(\s*)(SEVILLA|HUELVA|C[AÁ]DIZ|M[AÁ]LAGA|C[OÓ]RDOBA|GRANADA|JA[EÉ]N|ALMER[IÍ]A)(\s*)/i;
            provincia = nombreVia.replace(REGEX_GET_PROVINCE, "$2");
            nombreVia = nombreVia.replace(REGEX_REMOVE_PROVINCE, "");
        }
    }
    
    /*
     * the city and the province is the same 
     */
    if (municipioNullOrBlank()) {
        municipio = provincia;
    }
    
    /*
     * try to get the cod ine of the city
     * calling web services with diferents
     * provinces
     */
    if (provinciaNullOrBlank()) {
        Mapea.SearchStreet.geocoderMunSrs(function(results) {
            Mapea.SearchStreet.finishGeocoder(results, municipio, provincia);
        }, Mapea.SearchStreet.geocoderErrorCallback, nombreVia, numeroPortal,
        tipoVia, municipio, Mapea.Util.getMapProjection(map));
        
        return;
    }
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(results){
        Mapea.SearchStreet.finishGeocoder(results, municipio, provincia);
    }, Mapea.SearchStreet.geocoderErrorCallback, nombreVia, numeroPortal,
    tipoVia, municipio, provincia, Mapea.Util.getMapProjection(map));
};

/**
 * TODO
 */
Mapea.SearchStreet.geocoderMunSrs = function(successCallback, errorCallback, streetname, streetnumber, streettype, municipio, srs) {
    Mapea.SearchStreet.geocoderMunArray (0, [], {
        streetname : streetname,
        streetnumber : streetnumber,
        municipio : municipio,
        srs : srs,
        callbackFn : successCallback
    });
};

/**
 * TODO
 */
Mapea.SearchStreet.geocoderMunArray = function(currentIndex, results, parameters) {
    var PROVINCES = ["HUELVA", "SEVILLA", "CADIZ", "CORDOBA", "MALAGA", "JAEN", "GRANADA", "ALMERIA"];
    
    var province = PROVINCES[currentIndex];
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(rawResponse) {
        Mapea.SearchStreet.handleGeocoderMunProvResponse(rawResponse, parameters.municipio, province, function(geocoderMunProvResults) {
            results = results.concat(geocoderMunProvResults);
            currentIndex++;
            
            if (currentIndex < PROVINCES.length) {
                Mapea.SearchStreet.geocoderMunArray(currentIndex, results, parameters);
            }
            else {
                parameters.callbackFn(results);
            }
        });
    }, errorCallback, parameters.streetname, parameters.streetnumber, parameters.streettype, parameters.municipio, province, parameters.srs);
};

/**
 * TODO
 */
Mapea.SearchStreet.handleGeocoderMunProvResponse = function(rawResponse, city, province, callback) {
        
    var addresses = [];
    
    if (!OpenLayers.Util.isArray(rawResponse)) {
        
        // multiRef elements
        var multiRefElements = rawResponse.getElementsByTagName('multiRef');

        // iterate over multiRef elements
        for (var i=0, len=multiRefElements.length; i < len; i++){
            
            var multiRefElement = multiRefElements[i];

            var resultTypeElement = multiRefElement.getElementsByTagName("resultType");
            var resultType = $(resultTypeElement).text();
            
            // checks if it is a NOMATCH result
            if (!(/NOMATCH/i.test(resultType))) {
                // gets its elements
                var similarityElement = multiRefElement.getElementsByTagName("similarity");
                var streetNameElement = multiRefElement.getElementsByTagName("streetName");
                var streetNumberElement = multiRefElement.getElementsByTagName("streetNumber");
                var streetTypeElement = multiRefElement.getElementsByTagName("streetType");
                var coordXElement = multiRefElement.getElementsByTagName("coordinateX");
                var coordYElement = multiRefElement.getElementsByTagName("coordinateY");
                var rotuloElement = multiRefElement.getElementsByTagName("rotulo");
                var codINEElement = multiRefElement.getElementsByTagName("locality");
                
                // create an address object
                var direccion = new address();                  
                direccion.similarity = $(similarityElement).text();
                direccion.streetName = $(streetNameElement).text();
                direccion.streetNumber = $(streetNumberElement).text();
                direccion.streetType = $(streetTypeElement).text();
                direccion.coordX = $(coordXElement).text();
                direccion.coordY = $(coordYElement).text();
                direccion.rotulo = $(rotuloElement).text();
                direccion.codINE = $(codINEElement).text();
                
                direccion.municipio = city;
                direccion.provincia = province;
                
                // pushes it into the result array
                addresses.push(direccion);
            }
        }
        
        addresses.sort(compareSimil);
        
    } else {
        addresses = rawResponse;
    }

    callback(addresses);
};

/**
 * TODO
 */
Mapea.SearchStreet.finishGeocoder = function(response, municipio, provincia) {
    // destroy previous features
    Mapea.SearchStreet.LAYER.destroyFeatures();
    
    // removes all popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // removes previous results
    Mapea.SearchStreet.STREET_CONTAINER.html("");

    Mapea.SearchStreet.handleGeocoderMunProvResponse(response,  municipio, provincia, function(results) {
        Mapea.SearchStreet.drawGeocoderResults(results);

        Mapea.SearchStreet.STREET_SEARCHING = false;
        
        // hides searching gifs
        Mapea.SearchStreet.hideSearchingImages();
        
        if (Mapea.SearchStreet.STREET_CONTAINER.children().length > 0) {
            // attach events to results
            Mapea.SearchStreet.attachEventsToGeocoderResults();
            
            // show results button
            Mapea.SearchStreet.RESULTS_BUTTON.css("display", "");
            
            Mapea.SearchStreet.zoomResultBbox();
        }
        else { // there were not any results so shows not found message
            var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
            notFoundHtml += 'No se han encontrado direcciones para la búsqueda ';
            notFoundHtml += '"' + Mapea.SearchStreet.QUERY + '"';
            notFoundHtml += '</div></div>';
            Mapea.SearchStreet.STREET_CONTAINER.append(notFoundHtml);
        }
        
        Mapea.SearchStreet.SEARCH_INPUT.autocomplete("close");
        
        Mapea.SearchStreet.showResults();
    });
};

/**
 * TODO
 */
Mapea.SearchStreet.showResults = function() {
    if (!Mapea.SearchStreet.SHOW_RESULTS) {
        // removes popups and unselects features
        Mapea.Util.removeAllPopups(map);
        Mapea.Util.unselectAllFeatures(map);
        
        var HIDE_RESULTS_CLASS = "hide";
        Mapea.SearchStreet.RESULTS_WRAPPER.removeClass(HIDE_RESULTS_CLASS);
        Mapea.Util.centerSearchDialog();
        Mapea.SearchStreet.SHOW_RESULTS = true;
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.hideResults = function() {
    var HIDE_RESULTS_CLASS = "hide";
    Mapea.SearchStreet.RESULTS_WRAPPER.addClass(HIDE_RESULTS_CLASS);
    Mapea.SearchStreet.SHOW_RESULTS = false;
}

/**
 * TODO
 */
Mapea.SearchStreet.hideSearchingImages = function() {
    if (!Mapea.SearchStreet.STREET_SEARCHING 
            && !Mapea.SearchStreet.GEOSEARCH_SEARCHING) {
        Mapea.SearchStreet.SEARCHING_IMAGE.css("display", "none");
        Mapea.SearchStreet.SEARCH_BUTTON.css("display", "");
        Mapea.SearchStreet.SEARCH_INPUT.css("background", "");
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.showSearchingImages = function() {
    Mapea.SearchStreet.SEARCHING_IMAGE.css("display", "");
    Mapea.SearchStreet.SEARCH_BUTTON.css("display", "none");
};

/**
 * TODO
 */
Mapea.SearchStreet.executeGeocoder = function(successCallback) {
    Mapea.SearchStreet.STREET_SEARCHING = true;
    
    // normalizador + geocoder
    callejeroProxy.normalizar(function(response) {
        var normalizeResponse = Mapea.SearchStreet.handleNormalizeResponse(response);
        successCallback(normalizeResponse);
    }, Mapea.SearchStreet.geocoderErrorCallback, Mapea.SearchStreet.QUERY);
};

/**
 * TODO
 */
Mapea.SearchStreet.selectValue = function(value, fullsearch) {
    if (fullsearch) {
        // shows searching images
        Mapea.SearchStreet.showSearchingImages();
        
        Mapea.SearchStreet.initalizeGeocoder(value);
    }
};

/**************************************************/
/**
 * TODO
 */
Mapea.SearchStreet.buildMobile = function() {
    var searchPanel = document.getElementById("mapea-search-mobile");
    OpenLayers.Element.addClass(searchPanel, "mobile");
    
    $(".help-btn").css("display", "none");
    $("#mapea-search-mobile").css("display", "");

    Mapea.SearchStreet.RESULTS_HEADER_BUTTON = $(".search-results-header");
    Mapea.SearchStreet.RESULTS_BUTTON = $(".results-btn");
    Mapea.SearchStreet.SEARCH_INPUT = $("#idInputSearchMobile");
    Mapea.SearchStreet.SEARCH_BUTTON = $("#idBtnSearchMobile");
    Mapea.SearchStreet.CLEAR_BUTTON = $(".clear-btn");
    Mapea.SearchStreet.STREET_CONTAINER = $("#searchstreet-results");
    Mapea.SearchStreet.SEARCHING_IMAGE = $("#searching");
    Mapea.SearchStreet.RESULTS_WRAPPER = $(".search-results-wrapper");

    Mapea.SearchStreet.SEARCH_BUTTON.click(function(event) {
        event.preventDefault();
        var inputText = Mapea.SearchStreet.SEARCH_INPUT.val();
        Mapea.SearchStreet.executeMobile(inputText);
    });

    Mapea.SearchStreet.CLEAR_BUTTON.click(Mapea.SearchStreet.clearButtonFn);
    
    Mapea.SearchStreet.RESULTS_BUTTON.click(Mapea.SearchStreet.showHideResults);
    
    Mapea.SearchStreet.RESULTS_HEADER_BUTTON.click(function(event) {
        event.preventDefault();
        Mapea.SearchStreet.hideResults();
    });
    
    Autocomplete.init('idInputSearchMobile', {
        'onselect' : Mapea.SearchStreet.selectValue,
        'onenterpress' : function(event) {
            Mapea.SearchStreet.SEARCH_BUTTON.click();
        }
    });
    
    // hides geosearch resutls tab
    jQuery("#geosearchtab").css("display", "none");
    
    $(".geosearchstreet-results").tabs();
    
    // removes focus of the input search when users click over the map
    OpenLayers.Event.observe(map.div, "touchstart", function(event) {
        Mapea.SearchStreet.SEARCH_INPUT.blur();
    });
};

/**
 * TODO
 */
Mapea.SearchStreet.executeMobile = function(inputText) {
    Mapea.SearchStreet.QUERY = OpenLayers.String.trim(inputText || "");

    if (Mapea.SearchStreet.QUERY.length > 0) {
        
        // shows searching images
        Mapea.SearchStreet.showSearchingImages();

        Mapea.SearchStreet.executeGeocoder(Mapea.SearchStreet.initalizeGeocoderMobile);
    }
    else {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de búsqueda");
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.showFirstMobileResult = function() {
    if (!Mapea.SearchStreet.STREET_SEARCHING) {
        if (Mapea.SearchStreet.STREET_CONTAINER.children().length <= 0) {
            Mapea.SearchStreet.zoomResultBbox();
        }
        else {
            // if no results retrieved then show results panel
            Mapea.SearchStreet.showResults();
        }
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.showHideResults = function(event) {
    event.preventDefault();
    
    if (!Mapea.SearchStreet.STREET_SEARCHING) {
        if (Mapea.SearchStreet.SHOW_RESULTS) {
            Mapea.SearchStreet.hideResults();
        }
        else {
            Mapea.SearchStreet.showResults();
        }
    }
};

/**
 * TODO
 */
Mapea.SearchStreet.initalizeGeocoderMobile = function(normalizeResponse, fromAutocomplete) {
    // gets parameters
    var tipoVia = normalizeResponse.tipoVia;
    var nombreVia = normalizeResponse.nombreVia;
    var numeroPortal = normalizeResponse.numeroPortal;
    var municipio = Mapea.SearchStreet.FILTER_LOCALITY || normalizeResponse.municipio;
    var provincia = Mapea.SearchStreet.FILTER_CITY || normalizeResponse.provincia;
    var complementos = normalizeResponse.complementos;
    
    var municipioNullOrBlank = function() {
        return ((municipio == null) || (municipio.length <= 0));
    };
    
    var provinciaNullOrBlank = function() {
        return ((provincia != null) && (provincia.length <= 0));
    };
    
    /*
     * try to get the province or the city
     * from complements or from the street name
     */
    if (municipioNullOrBlank() && provinciaNullOrBlank()) {
        // from complements
        if ((complementos != null) && (complementos.length > 0)) {
            var normalizedComplements = complementos.replace(/\-/g, " ");
            normalizedComplements = OpenLayers.String.trim(normalizedComplements);
            municipio = normalizedComplements;
            
        // from street name
        }
        else {
            var REGEX_GET_PROVINCE = /(.*)(SEVILLA|HUELVA|C[AÁ]DIZ|M[AÁ]LAGA|C[OÓ]RDOBA|GRANADA|JA[EÉ]N|ALMER[IÍ]A)(.*)/i;
            var REGEX_REMOVE_PROVINCE = /(\s*)(SEVILLA|HUELVA|C[AÁ]DIZ|M[AÁ]LAGA|C[OÓ]RDOBA|GRANADA|JA[EÉ]N|ALMER[IÍ]A)(\s*)/i;
            provincia = nombreVia.replace(REGEX_GET_PROVINCE, "$2");
            nombreVia = nombreVia.replace(REGEX_REMOVE_PROVINCE, "");
        }
    }
    
    /*
     * the city and the province is the same 
     */
    if (municipioNullOrBlank()) {
        municipio = provincia;
    }
    
    /*
     * try to get the cod ine of the city
     * calling web services with diferents
     * provinces
     */
    if (provinciaNullOrBlank()) {
        Mapea.SearchStreet.geocoderMunSrs(function(results) {
            if (fromAutocomplete) {
                /*callejeroandalucia.Action.resetVectorLayer();
                callejeroandalucia.Action.resetPOIResults();
                callejeroandalucia.Action.resetAddressResults();*/
                window.alert("from autocompleter!!!");
            }
            Mapea.SearchStreet.finishGeocoderMobile(results, municipio, provincia);
        }, Mapea.SearchStreet.geocoderErrorCallback, nombreVia, numeroPortal, tipoVia,
        municipio, Mapea.Util.getMapProjection(map));
        
        return;
    }
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(results){
        Mapea.SearchStreet.finishGeocoderMobile(results, municipio, provincia);
    }, Mapea.SearchStreet.geocoderErrorCallback, nombreVia, numeroPortal, tipoVia, municipio, provincia, Mapea.Util.getMapProjection(map));
};


Mapea.SearchStreet.finishGeocoderMobile = function(response, municipio, provincia) {
    // destroy previous features
    Mapea.SearchStreet.LAYER.destroyFeatures();
    
    // removes all popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // removes previous results
    Mapea.SearchStreet.STREET_CONTAINER.html("");
    
    Mapea.SearchStreet.handleGeocoderMunProvResponse(response,  municipio, provincia, function(results) {
        Mapea.SearchStreet.drawGeocoderResults(results);

        Mapea.SearchStreet.STREET_SEARCHING = false;
        
        // hides searching gifs
        Mapea.SearchStreet.hideSearchingImages();
        
        if (Mapea.SearchStreet.STREET_CONTAINER.children().length > 0) {
            // attach events to results
            Mapea.SearchStreet.attachEventsToGeocoderResults();
            
            // 7. hide autocomplete
            Mapea.SearchStreet.SEARCH_INPUT.autocomplete("close");
            
            // show results button
            Mapea.SearchStreet.RESULTS_BUTTON.css("display", "");
            
            Mapea.SearchStreet.showFirstMobileResult();
        }
        else { // there were not any results so shows not found message
            var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
            notFoundHtml += 'No se han encontrado direcciones para la búsqueda ';
            notFoundHtml += '"' + Mapea.SearchStreet.QUERY + '"';
            notFoundHtml += '</div></div>';
            Mapea.SearchStreet.STREET_CONTAINER.append(notFoundHtml);
        }
        
        Mapea.SearchStreet.showResults();
    });
};

/**
 * TODO
 */
Mapea.SearchStreet.geocoderErrorCallback = function(error) {
    Mapea.SearchStreet.STREET_SEARCHING = false;
    Mapea.Util.showErrorMessage(error);
    Mapea.SearchStreet.hideSearchingImages();
};

/**
 * TODO
 */
Mapea.SearchStreet.clearButtonFn = function(event) {
    event.preventDefault();
    Mapea.SearchStreet.SEARCH_INPUT.val("");
    Mapea.SearchStreet.STREET_CONTAINER.html("");

    Mapea.SearchStreet.LAYER.destroyFeatures();
    
    Mapea.SearchStreet.hideResults();
    // hides results button
    Mapea.SearchStreet.RESULTS_BUTTON.css("display", "none");
    
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);
};

/**
 * TODO
 */
Mapea.SearchStreet.onFeatureSelect = function(event) {
    var feature = event.feature;
    var htmlTable = "<table class=\"mapea-table\"><tbody>";
    for (var attrName in feature.attributes) {
        if (attrName != "keywords") {
            htmlTable += "<tr><td><b>";
            htmlTable += Mapea.Util.beautifyString(attrName);
            htmlTable += "</b></td><td>";
            htmlTable += feature.attributes[attrName];
            htmlTable += "</td></tr>";
        }
    }
    htmlTable += "</tbody></table>";

    if (feature.geometry) {
        // add the header
        var headHTML;
        var keywords = feature.attributes['keywords'];
        if (keywords && (keywords.length > 0)) {
            headHTML = '<div class="geosearch-header">' + keywords[0] + '</div>';
        }
        else {
            headHTML = '<div class="geosearch-header">Punto de interés</div>';
        }
        
        var featurePosition = feature.geometry.getBounds().getCenterLonLat();

        // gets the x and y of the click event
        var clickedPixel = Mapea.Util.getClickedPixelFromEvent(window.event);
        var mapPopup = Mapea.Util.getPopupInPixel(map, clickedPixel);
        if (mapPopup) {
            var htmlFinal = mapPopup.contentHTML;
            htmlFinal += "<div class=\"popup-info-separator\">Dirección</div>";
            htmlFinal += htmlTable;
            
            mapPopup.setContentHTML(htmlFinal);
            mapPopup.show();
        }
        else {
            mapPopup = new Mapea.Popup.FramedCloud("popup_feature",
                featurePosition,
                new OpenLayers.Size(400,300),
                htmlTable,
                null, true, function(evt) {
                    evt.feature = feature;
                    Mapea.Util.unselectFeature(evt);
            }, headHTML);
            mapPopup.pixelX = clickedPixel.x;
            mapPopup.pixelY = clickedPixel.y;

            if (mapPopup.size == null) {
                mapPopup.setSize(mapPopup.contentSize);
            }
            feature.popup = mapPopup;
            map.addPopup(mapPopup);
        }
        if (Mapea.Util.isMobile) {
            map.panTo(featurePosition);
        }
    }
};
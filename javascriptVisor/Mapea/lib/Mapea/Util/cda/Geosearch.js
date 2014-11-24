/**
 * TODO
 */
Mapea.Geosearch = {};

/**
 * TODO
 */
Mapea.Geosearch.CURRENT_PAGE = 0;

/**
 * TODO
 */
Mapea.Geosearch.ROWS = 20;

/**
 * TODO
 */
Mapea.Geosearch.MAX_RESULTS = 999;

/**
 * TODO
 */
Mapea.Geosearch.GEOSEARCH_SEARCHING = false;

/**
 * TODO
 */
Mapea.Geosearch.STREET_SEARCHING = false;

/**
 * TODO
 */
Mapea.Geosearch.SHOW_RESULTS = false;

/**
 * TODO
 */
Mapea.Geosearch.USER_PARAMETERS = {};

/**
 * TODO
 */
Mapea.Geosearch.FILTER_LOCALITY = null;

/**
 * TODO
 */
Mapea.Geosearch.FILTER_CITY = null;

/**
 * TODO
 */
Mapea.Geosearch.GEOCODER_RESPONSE = null;

/**
 * TODO
 */
Mapea.Geosearch.GEOSEARCH_RESPONSE = null;

/**
 * TODO
 */
Mapea.Geosearch.build = function(geosearchParameter, operationsParameter) {
    // gets parameters from URL
    Mapea.Geosearch.URL = geosearchParameter;
    var quoteIndex = geosearchParameter.indexOf("?");
    if (quoteIndex != -1) {
        Mapea.Geosearch.URL = geosearchParameter.substring(0, quoteIndex);
        var parameterString = geosearchParameter.substring(quoteIndex);
        Mapea.Geosearch.USER_PARAMETERS = OpenLayers.Util.getParameters(parameterString);
    }

    // creates the geosearch layer
    Mapea.Geosearch.LAYER = new Mapea.Layer.Geosearch({
        geosearchUrl: Mapea.Geosearch.URL,
        hiddenFields : ["_version_", "solrid", "keywords", "geom", "score"]
    }, {name: "Resultados"});
    Mapea.Geosearch.LAYER._onSuccess = OpenLayers.Function.bind(function(response) {
            // copies the parameters
            var geosearchParamsBackup = this.geosearchParams;

            this.clear();
            
            // restores parameters
            OpenLayers.Util.extend(this.geosearchParams, geosearchParamsBackup);

            this._getResultsFromResponse(response);

            this._drawResults();

            this.refresh();
            
            this.redraw();
        }, Mapea.Geosearch.LAYER);
    map.addLayer(Mapea.Geosearch.LAYER, true);

    // check if the user specified searchstreet operation
    var searchstreetRegex = /.*\,?searchstreet\,?.*/i;
    Mapea.Geosearch.SEARCHSTREET = searchstreetRegex.test(operationsParameter);

    // data stucture to save geocoder features
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.LAYER.geocoderFeatures = [];
        jQuery(".search-results").css("display", "none");
    }
    else {
        jQuery(".geosearchstreet-results").css("display", "none");
    }
    
    Mapea.Geosearch.GEOCODER_STYLE = OpenLayers.Util.applyDefaults(
        {externalGraphic: Mapea.global.THEME_IMG_PATH + "search/pointerRed.png"}, Mapea.Util.featureIconStyle);
    
    // gets the specified locality and city by codine
    if (Mapea.Util.filterLocality && Mapea.Geosearch.SEARCHSTREET) {
        var headForm = jQuery(".search-form-locality").css("display", "block");
        Mapea.CDA.getLocalityFromCodINE(Mapea.Util.filterLocality, function(locality, city) {
            
            Mapea.Geosearch.FILTER_LOCALITY = locality;
            Mapea.Geosearch.FILTER_CITY = city;
            
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

    if (Mapea.Util.isMobile) {
        Mapea.Geosearch.buildMobile();
        Mapea.Util.hasMobileGeosearchPanel = true;
    }
    else {
        Mapea.Geosearch.buildREST();
        Mapea.Util.hasGeosearchPanel = true;
    }
};

/**
 * TODO
 */
Mapea.Geosearch.buildREST = function() {
    // show the UI
    $(".help-btn").css("display", "none");
    $("#mapea-search-mobile").css("display", "");

    Mapea.Geosearch.RESULTS_BUTTON = $(".results-btn");
    Mapea.Geosearch.SEARCH_INPUT = $("#idInputSearchMobile");
    Mapea.Geosearch.SEARCH_BUTTON = $("#idBtnSearchMobile");
    Mapea.Geosearch.CLEAR_BUTTON = $(".clear-btn");
    Mapea.Geosearch.GEOSEARCH_CONTAINER = $(".search-results");
    Mapea.Geosearch.SEARCHING_IMAGE = $("#searching");
    Mapea.Geosearch.RESULTS_WRAPPER = $(".search-results-wrapper");

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
            (!Mapea.Util.isMobile && Mapea.Geosearch.SEARCH_INPUT.focus());
        }       
    });

    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.GEOSEARCH_CONTAINER = $("#geosearch-results");
        Mapea.Geosearch.STREET_CONTAINER = $("#searchstreet-results");
    }
    
    Mapea.Geosearch.SEARCH_BUTTON.click(function(event) {
        event.preventDefault();
        var inputText = Mapea.Geosearch.SEARCH_INPUT.val();
        Mapea.Geosearch.execute(inputText);
    });

    Mapea.Geosearch.CLEAR_BUTTON.click(Mapea.Geosearch.clearButtonFn);
    
    Mapea.Geosearch.RESULTS_BUTTON.click(Mapea.Geosearch.showHideResults);
    
    if (Mapea.Geosearch.SEARCHSTREET) {
        Autocomplete.init('idInputSearchMobile', {
            'onselect' : Mapea.Geosearch.selectValue,
            'onenterpress' : function(event) {
                Mapea.Geosearch.SEARCH_BUTTON.click();
            }
        });
        $(".geosearchstreet-results").tabs();
    }
    else {
        /* if it was not specified the autocomplete
           then check when the user press enter key */
        Mapea.Geosearch.SEARCH_INPUT.keypress(function(event) {
            if (event.which == 13) {
               Mapea.Geosearch.SEARCH_BUTTON.click();
            }
        });
    }
    
    // hides results header
    jQuery(".search-results-header").css("display", "none");
};

/**
 * TODO
 */
Mapea.Geosearch.execute = function(inputText) {
    Mapea.Geosearch.QUERY = OpenLayers.String.trim(inputText || "");

    if (Mapea.Geosearch.QUERY.length > 0) {
        
       Mapea.Geosearch.initSearch();

       Mapea.Geosearch.executeGeosearch(Mapea.Geosearch.callback);
       
        if (Mapea.Geosearch.SEARCHSTREET) {
            Mapea.Geosearch.executeGeocoder(Mapea.Geosearch.initalizeGeocoder);
        }
    }
    else {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de búsqueda");
    }
};

/**
 * TODO
 */
Mapea.Geosearch.callback = function(response) {
    
    Mapea.Geosearch.GEOSEARCH_RESPONSE = response;
    
    Mapea.Geosearch.GEOSEARCH_SEARCHING = false;
    
    if (!Mapea.Geosearch.SEARCHSTREET || 
        (Mapea.Geosearch.SEARCHSTREET && !Mapea.Geosearch.STREET_SEARCHING)) {
        Mapea.Geosearch.ManageResponses();
    }
};

/**
 * TODO
 */
Mapea.Geosearch.ManageResponses = function(fromAutocomplete) {
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.ManageGeocoderResponse(Mapea.Geosearch.GEOCODER_RESPONSE.response, 
            Mapea.Geosearch.GEOCODER_RESPONSE.municipio,
            Mapea.Geosearch.GEOCODER_RESPONSE.provincia);
    }
    if (!fromAutocomplete) {
        Mapea.Geosearch.ManageGeosearchResponse(Mapea.Geosearch.GEOSEARCH_RESPONSE);
    }
    else {
        Mapea.Geosearch.GEOSEARCH_CONTAINER.html("");
    }
};

/**
 * TODO
 */
Mapea.Geosearch.ManageGeosearchResponse = function(response) {
    // 1. removes popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // 2. removes results
    Mapea.Geosearch.GEOSEARCH_CONTAINER.html("");

    Mapea.Geosearch.drawResultsFeature(false);

    // increments current page
    Mapea.Geosearch.CURRENT_PAGE += Mapea.Geosearch.ROWS;

    // 9. enable scroll pagination
    Mapea.Geosearch.enablePagination(OpenLayers.Function.Void, Mapea.Geosearch.callbackMoreResults, Mapea.Geosearch.geosearchErrorCallback);
    
    Mapea.Geosearch.checkEmptyResults();
    
    Mapea.Geosearch.hideSearchingImages();
    
    // show results button
    Mapea.Geosearch.RESULTS_BUTTON.css("display", "");
    
    // hides autocomplete
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.SEARCH_INPUT.autocomplete("close");
    }

    Mapea.Geosearch.showResults();
    
    // zoom to results BBOX
    Mapea.Geosearch.zoomResultBbox();
};

/**
 * TODO
 */
Mapea.Geosearch.ManageGeocoderResponse = function(response, municipio, provincia) {
    // removes all popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // removes previous results
    Mapea.Geosearch.STREET_CONTAINER.html("");

    Mapea.Geosearch.handleGeocoderMunProvResponse(response, municipio, provincia, function(results) {
        Mapea.Geosearch.drawGeocoderResults(results);

        // hides searching gifs
        Mapea.Geosearch.hideSearchingImages();
        
        if (Mapea.Geosearch.STREET_CONTAINER.children().length > 0) {
            // attach events to results
            Mapea.Geosearch.attachEventsToGeocoderResults();
            
            // 7. hide autocomplete
            Mapea.Geosearch.SEARCH_INPUT.autocomplete("close");
            
            // show results button
            Mapea.Geosearch.RESULTS_BUTTON.css("display", "");
            
            Mapea.Geosearch.showResults();
        }
        else { // there were not any results so shows not found message
            var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
            notFoundHtml += 'No se han encontrado direcciones para la búsqueda ';
            notFoundHtml += '"' + Mapea.Geosearch.QUERY + '"';
            notFoundHtml += '</div></div>';
            Mapea.Geosearch.STREET_CONTAINER.append(notFoundHtml);
        }
        
        Mapea.Geosearch.zoomResultBbox();
    });
};

/**
 * TODO
 */
Mapea.Geosearch.drawGeocoderResults = function(geocoderResults) {
    Mapea.Geosearch.LAYER.geocoderFeatures.length = 0;
    
    // draw results
    for ( var i = 0, ilen = geocoderResults.length; i < ilen; i++) {
        var geocoderResult = geocoderResults[i];
        
        var feature = Mapea.Geosearch.geocoderResult2Feature(geocoderResult);
        
        // clone the feature
        var clonedFeature = feature.clone();
        clonedFeature.fromGeocoder = true;

        feature.cloneId = clonedFeature.id;
        
        var html = Mapea.Geosearch.geocoderFeature2Html(feature);
        
        Mapea.Geosearch.STREET_CONTAINER.append(html);
        Mapea.Geosearch.LAYER.geocoderFeatures.push(clonedFeature);
        Mapea.Geosearch.LAYER.addFeatures([feature]);
    }
};

/**
 * Gets and puts the geosearch results in the
 * results panel of the search panel registers
 * their events and does a zoom into them
 */
Mapea.Geosearch.drawResultsFeature = function(newFeatures) {
    if (!Mapea.Geosearch.hasResults()) {
        var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
        notFoundHtml += 'No se han encontrado resultados para la búsqueda ';
        notFoundHtml += '"' + Mapea.Geosearch.QUERY + '"';
        notFoundHtml += '</div></div>';
        
        Mapea.Geosearch.GEOSEARCH_CONTAINER.append(notFoundHtml);
    }
    else {
        var geosearchFeatures;
        if (Mapea.Geosearch.LAYER.hasSpatialResults()) {
           geosearchFeatures = Mapea.Geosearch.LAYER.spatialFeatures;
        }
        else {
            geosearchFeatures = Mapea.Geosearch.LAYER.textFeatures;
        }

        Mapea.Geosearch.drawFeaturesHtml(geosearchFeatures, newFeatures);

        // registers events to results
        Mapea.Geosearch.attachEventsToGeosearchResults();
        Mapea.Geosearch.GEOSEARCH_CONTAINER.scrollTop(0);

        // zoom to results BBOX
        Mapea.Geosearch.zoomResultBbox();
    }
    
}; 

/**
 * Parses the feature information in HTML format
 * and puts it into the div results on the search panel
 */
Mapea.Geosearch.feature2Html = function(layer, feature, newFeature) {
    var html;
    if (newFeature) {
        html = '<div class="new-result">';
    }
    else {
        html = '<div class="search-result">';
    }
    html += '<div class="asterisk" title="Nuevo resultado obtenido tras la paginación"></div>';

    var hasAttributesToShow = false;
    for ( var attrName in feature.attributes) {
        //check if we must show the field
        var showField = true;
        for (var i=0,ilen=layer.hiddenFields.length; i<ilen; i++) {
            var hideField = layer.hiddenFields[i];
            if (attrName == hideField) {
                showField = false;
                break;
            }
        }
        if (showField) {
            if (hasAttributesToShow) {
                html += '<ul class="divider"><li></li></ul>';
            }
            
            var key = layer._beautifyName(attrName);
            var value = feature.attributes[attrName];
            
            html += Mapea.Geosearch.keyValue2Html(key, value);

            hasAttributesToShow = true;
        }
    }
    if (!hasAttributesToShow) {
        html += Mapea.Geosearch.keyValue2Html('Informaci&oacute;n',
                'Punto de inter&eacute;s con informaci&oacute;n espacial pero sin informaci&oacute;n alfanum&eacute;rica');
    }
    html += '<input id="featureId" type="hidden" value="' + feature.id + '"></input>';
    html += '</div>';

    return html;
};

/**
 * TODO
 */
Mapea.Geosearch.geocoderResult2Feature = function(geocoderResult, streetLocality, streetCity) {
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
    
    var featureStyle = Mapea.Geosearch.GEOCODER_STYLE;
        
    var multipoint = new OpenLayers.Geometry.MultiPoint([new OpenLayers.Geometry.Point(x, y)]);
    var multipointfeature = new OpenLayers.Feature.Vector(multipoint, {
        "Tipo de v&iacute;a" : Mapea.Geosearch.LAYER._beautifyName(type),
        "Nombre de v&iacute;a": Mapea.Geosearch.LAYER._beautifyName(name),
        "N&uacute;mero" : Mapea.Geosearch.LAYER._beautifyName(number)
    }, featureStyle);
    
    // shows the address on the popup head
    multipointfeature.attributes["keywords"] = [fullStreet];
    
    multipointfeature.fromGeocoder = true;
    multipointfeature.attributes.municipio = Mapea.Geosearch.LAYER._beautifyName(municipio);
    multipointfeature.attributes.provincia = Mapea.Geosearch.LAYER._beautifyName(provincia);
    
    return multipointfeature;
};

/**
 * TODO
 */
Mapea.Geosearch.geocoderFeature2Html = function(feature) {
        
    var name = feature.attributes["Nombre de v&iacute;a"];
    var number = feature.attributes["N&uacute;mero"];
    
    var type = feature.attributes["Tipo de v&iacute;a"];
    var municipio = feature.attributes.municipio;
    var provincia = feature.attributes.provincia;

    var fullStreet = type + " " + (number == 0 ? name : name + ", " + number);
    
    // initialize
    var html = '<div class="search-result street">';
        
    // full street
    html += Mapea.Geosearch.keyValue2Html(null, fullStreet);

    // city
    var localityCity = municipio + " (" + provincia + ")";
    html += Mapea.Geosearch.keyValue2Html(null, localityCity);
  
    // end
    html += '<input id="featureId" type="hidden" value="' + feature.id + '" />';
    html += '<input id="cloneId" type="hidden" value="' + feature.cloneId + '" />';
    html += '</div>';
    
    return html;
};

/**
 * TODO
 */
Mapea.Geosearch.keyValue2Html = function(key, value) {
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
Mapea.Geosearch.attachEventsToGeosearchResults = function() {
    Mapea.Geosearch.GEOSEARCH_CONTAINER.children().each(function() {
        var obj = $(this);
        if (obj.attr("evtAdded") == null) {
            obj.attr("evtAdded", true);
            obj.click(function(e) {
                e.preventDefault();

                var featureId = $(this).children('#featureId').val();
                var feature = Mapea.Geosearch.LAYER.getFeatureById(featureId);
                feature.layer = Mapea.Geosearch.LAYER;

                Mapea.Util.unselectAllFeatures(map);
                
                Mapea.Geosearch.LAYER.map.uniqueSelectFeatureCtrl.clickFeature(feature);
                
                if (feature.geomFeatureId) {
                    var geomFeature = Mapea.Geosearch.LAYER.getFeatureById(feature.geomFeatureId);
                    map.zoomToExtent(geomFeature.geometry.bounds);
                }
                
                if (Mapea.Util.isMobile) {
                    Mapea.Geosearch.hideResults();
                }
            });
        }
    });
};

/**
 * TODO
 */
Mapea.Geosearch.attachEventsToGeocoderResults = function() {
    Mapea.Geosearch.STREET_CONTAINER.children('.search-result').each(function() {
        var obj = $(this);
        if (obj.attr("evtAdded") == null) {
            obj.attr("evtAdded", true);
            obj.click(function(e) {
                e.preventDefault();
                
                var featureId = $(this).children('#featureId').val();
                var clonedFeatureId = $(this).children('#cloneId').val();
                
                var feature = Mapea.Geosearch.LAYER.getFeatureById(featureId);
                if (!feature) {
                    feature = Mapea.Geosearch.LAYER.getFeatureById(clonedFeatureId);
                }
                feature.layer = Mapea.Geosearch.LAYER;
                
                Mapea.Util.removeAllPopups(map);
                Mapea.Util.unselectAllFeatures(map);
                
                Mapea.Geosearch.LAYER.map.uniqueSelectFeatureCtrl.clickFeature(feature);
                
                var x = feature.geometry.getCentroid().x;
                var y = feature.geometry.getCentroid().y;
                
                var center = new OpenLayers.LonLat(x, y);
                map.setCenter(center, 14);
                
                if (Mapea.Util.isMobile) {
                    Mapea.Geosearch.hideResults();
                }
            });
        }
    });
};

/**
 * TODO
 */
Mapea.Geosearch.callbackMoreResults = function(response) {
    // draw new results html
    Mapea.Geosearch.drawFeaturesHtml(Mapea.Geosearch.LAYER.responseFeatures, true);

    // attaches events to new results
    Mapea.Geosearch.attachEventsToGeosearchResults();

    // increments current page
    Mapea.Geosearch.CURRENT_PAGE += Mapea.Geosearch.ROWS;

    // check results to disable scroll
    Mapea.Geosearch.checkEmptyResults();
    
    Mapea.Geosearch.GEOSEARCH_SEARCHING = false;
    
    // hides searching gifs
    Mapea.Geosearch.hideSearchingImages();

    // zoom to results BBOX
    Mapea.Geosearch.zoomResultBbox();
};

/**
 * TODO
 */
Mapea.Geosearch.checkEmptyResults = function() {
        
    var numResults = Mapea.Geosearch.GEOSEARCH_CONTAINER.children().length;
    var maxNumResults = 0;

    // comprobamos si hay resultados espaciales
    if (Mapea.Geosearch.LAYER.hasSpatialResults() && (Mapea.Geosearch.LAYER.spatialResults.numFound <= 0)) {
        maxNumResults = Mapea.Geosearch.LAYER.textResults.numFound;
    }
    else if (Mapea.Geosearch.LAYER.hasSpatialResults()) {
        maxNumResults = Mapea.Geosearch.LAYER.spatialResults.numFound;
    }
    else if (Mapea.Geosearch.LAYER.textResults && (Mapea.Geosearch.LAYER.textResults.numFound > 0)) {
        maxNumResults = Mapea.Geosearch.LAYER.textResults.numFound;
    }
    
    // limit the max number of results
    if (maxNumResults > Mapea.Geosearch.MAX_RESULTS) {
        maxNumResults = Mapea.Geosearch.MAX_RESULTS;
    }

    if (numResults >= maxNumResults) {
        Mapea.Geosearch.disableScrollPagination();
    }
};

/**
 * TODO
 */
Mapea.Geosearch.hasResults = function() {
    var hasResults = false;

    var hasTextResults = ((Mapea.Geosearch.LAYER.textResults != null) && (Mapea.Geosearch.LAYER.textResults.numFound > 0));
    var hasSpatialResults = Mapea.Geosearch.LAYER.hasSpatialResults();
    hasResults = (hasTextResults || hasSpatialResults);

    return hasResults;
};

/**
 * TODO
 */
Mapea.Geosearch.zoomResultBbox = function() {
    if (!Mapea.Geosearch.GEOSEARCH_SEARCHING
            && !Mapea.Geosearch.STREET_SEARCHING) {
        var lefts = [];
        var rights = [];
        var tops = [];
        var bottoms = [];
        
        var features;
        if (Mapea.Geosearch.LAYER.hasSpatialResults()) {
            features = Mapea.Geosearch.LAYER.spatialFeatures;
        }
        else {
            features = Mapea.Geosearch.LAYER.textFeatures;
        }
        if (Mapea.Geosearch.SEARCHSTREET) {
            features = features.concat(Mapea.Geosearch.LAYER.geocoderFeatures);
        }
        
        if (features.length > 0) {
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
    }
};

/**
 * TODO
 */
Mapea.Geosearch.drawFeaturesHtml = function(features, newFeatures) {
    for ( var i = 0, ilen = features.length; i < ilen; i++) {
        var feature = features[i];
        /*
         * we just want to draw the html of the center icon features
         */
        if (feature.centerIcon) {
            var html = Mapea.Geosearch.feature2Html(Mapea.Geosearch.LAYER, feature, newFeatures);
            Mapea.Geosearch.GEOSEARCH_CONTAINER.append(html);
        }
    }
};

/**
 * TODO
 */
Mapea.Geosearch.disableScrollPagination = function() {
    Mapea.Geosearch.GEOSEARCH_CONTAINER.stopScrollPagination();
    Mapea.Geosearch.MORE_RESULTS = false;
};

/**
 * TODO
 */
Mapea.Geosearch.handleNormalizeResponse = function(rawResponse) {
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
Mapea.Geosearch.initalizeGeocoder = function(normalizeResponse, fromAutocomplete) {
    // get parameters
    var tipoVia = normalizeResponse.tipoVia;
    var nombreVia = normalizeResponse.nombreVia;
    var numeroPortal = normalizeResponse.numeroPortal;
    var municipio = Mapea.Geosearch.FILTER_LOCALITY || normalizeResponse.municipio;
    var provincia = Mapea.Geosearch.FILTER_CITY || normalizeResponse.provincia;
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
        Mapea.Geosearch.geocoderMunSrs(function(results) {
            Mapea.Geosearch.finishGeocoder(results, municipio, provincia, fromAutocomplete);
        }, Mapea.Geosearch.geocoderErrorCallback, nombreVia, numeroPortal,
        tipoVia, municipio, Mapea.Util.getMapProjection(map));
        
        return;
    }
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(results){
        Mapea.Geosearch.finishGeocoder(results, municipio, provincia, fromAutocomplete);
    }, Mapea.Geosearch.geocoderErrorCallback, nombreVia, numeroPortal,
    tipoVia, municipio, provincia, Mapea.Util.getMapProjection(map));
};

/**
 * TODO
 */
Mapea.Geosearch.geocoderMunSrs = function(successCallback, errorCallback, streetname, streetnumber, streettype, municipio, srs) {
    Mapea.Geosearch.geocoderMunArray (0, [], {
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
Mapea.Geosearch.geocoderMunArray = function(currentIndex, results, parameters) {
    var PROVINCES = ["HUELVA", "SEVILLA", "CADIZ", "CORDOBA", "MALAGA", "JAEN", "GRANADA", "ALMERIA"];
    
    var province = PROVINCES[currentIndex];
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(rawResponse) {
        Mapea.Geosearch.handleGeocoderMunProvResponse(rawResponse, parameters.municipio, province, function(geocoderMunProvResults) {
            results = results.concat(geocoderMunProvResults);
            currentIndex++;
            
            if (currentIndex < PROVINCES.length) {
                Mapea.Geosearch.geocoderMunArray(currentIndex, results, parameters);
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
Mapea.Geosearch.handleGeocoderMunProvResponse = function(rawResponse, city, province, callback) {
        
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
Mapea.Geosearch.finishGeocoder = function(response, municipio, provincia, fromAutocomplete) {
           
    Mapea.Geosearch.GEOCODER_RESPONSE = {
        "response" : response,
        "municipio" : municipio,
        "provincia" : provincia
    };
    
    Mapea.Geosearch.STREET_SEARCHING = false;

    if (!Mapea.Geosearch.GEOSEARCH_SEARCHING) {
        Mapea.Geosearch.ManageResponses(fromAutocomplete);
    }
};

/**
 * TODO
 */
Mapea.Geosearch.showResults = function() {
    if (!Mapea.Geosearch.SHOW_RESULTS) {
        // removes popups and unselects features
        Mapea.Util.removeAllPopups(map);
        Mapea.Util.unselectAllFeatures(map);
        
        var HIDE_RESULTS_CLASS = "hide";
        Mapea.Geosearch.RESULTS_WRAPPER.removeClass(HIDE_RESULTS_CLASS);
        Mapea.Geosearch.SHOW_RESULTS = true;
        Mapea.Util.centerSearchDialog();
    }
};

/**
 * TODO
 */
Mapea.Geosearch.hideResults = function() {
    var HIDE_RESULTS_CLASS = "hide";
    Mapea.Geosearch.RESULTS_WRAPPER.addClass(HIDE_RESULTS_CLASS);
    Mapea.Geosearch.SHOW_RESULTS = false;
}

/**
 * TODO
 */
Mapea.Geosearch.hideSearchingImages = function() {
    if (!Mapea.Geosearch.STREET_SEARCHING 
            && !Mapea.Geosearch.GEOSEARCH_SEARCHING) {
        Mapea.Geosearch.SEARCHING_IMAGE.css("display", "none");
        Mapea.Geosearch.SEARCH_BUTTON.css("display", "");
        Mapea.Geosearch.SEARCH_INPUT.css("background", "");
    }
};

/**
 * TODO
 */
Mapea.Geosearch.showSearchingImages = function() {
    Mapea.Geosearch.SEARCHING_IMAGE.css("display", "");
    Mapea.Geosearch.SEARCH_BUTTON.css("display", "none");
};

/**
 * TODO
 */
Mapea.Geosearch.executeGeosearch = function(successCallback) {
    // 3. executes the search
    var searchParameters = {
        start : Mapea.Geosearch.CURRENT_PAGE,
        rows : Mapea.Geosearch.ROWS,
        q : Mapea.Geosearch.QUERY
    };
    searchParameters = OpenLayers.Util.applyDefaults(searchParameters, Mapea.Geosearch.USER_PARAMETERS);
    
    Mapea.Geosearch.GEOSEARCH_SEARCHING = true;
    
    // geosearch
    Mapea.Geosearch.LAYER.search(searchParameters,successCallback, Mapea.Geosearch.geosearchErrorCallback);
};

/**
 * TODO
 */
Mapea.Geosearch.executeGeocoder = function(successCallback) {
    Mapea.Geosearch.STREET_SEARCHING = true;
    
    // normalizador + geocoder
    callejeroProxy.normalizar(function(response) {
        var normalizeResponse = Mapea.Geosearch.handleNormalizeResponse(response);
        successCallback(normalizeResponse);
    }, Mapea.Geosearch.geocoderErrorCallback, Mapea.Geosearch.QUERY);
};

/**
 * TODO
 */
Mapea.Geosearch.initSearch = function() {
    // shows searching images
    Mapea.Geosearch.showSearchingImages();
    
    // disables scroll pagination
    Mapea.Geosearch.disableScrollPagination();

    // 2. resets the current page number
    Mapea.Geosearch.CURRENT_PAGE = 0;
    
    Mapea.Geosearch.SHOW_RESULTS = false;
    
    // deactivate geosearcbByLocation control
    var geosearchByLocationCtrl =  map.getControlsByClass("Mapea.Control.GeosearchByLocation")[0];
    if (geosearchByLocationCtrl && geosearchByLocationCtrl.active) {
        geosearchByLocationCtrl.deactivate();
    }
};

/**
 * TODO
 */
Mapea.Geosearch.selectValue = function(value, fullsearch) {
    if (fullsearch) {
        Mapea.Geosearch.initSearch();
        
        Mapea.Geosearch.initalizeGeocoder(value, true);
        
        // destroy previous features
        Mapea.Geosearch.LAYER.clear();
    }
};

/**************************************************/
/**
 * TODO
 */
Mapea.Geosearch.buildMobile = function() {
    var searchPanel = document.getElementById("mapea-search-mobile");
    OpenLayers.Element.addClass(searchPanel, "mobile");
    
    $(".help-btn").css("display", "none");
    $("#mapea-search-mobile").css("display", "");

    Mapea.Geosearch.RESULTS_HEADER_BUTTON = $(".search-results-header");
    Mapea.Geosearch.RESULTS_BUTTON = $(".results-btn");
    Mapea.Geosearch.SEARCH_INPUT = $("#idInputSearchMobile");
    Mapea.Geosearch.SEARCH_BUTTON = $("#idBtnSearchMobile");
    Mapea.Geosearch.CLEAR_BUTTON = $(".clear-btn");
    Mapea.Geosearch.GEOSEARCH_CONTAINER = $(".search-results");
    Mapea.Geosearch.SEARCHING_IMAGE = $("#searching");
    Mapea.Geosearch.RESULTS_WRAPPER = $(".search-results-wrapper");

    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.GEOSEARCH_CONTAINER = $("#geosearch-results");
        Mapea.Geosearch.STREET_CONTAINER = $("#searchstreet-results");
    }
    
    Mapea.Geosearch.SEARCH_BUTTON.click(function(event) {
        event.preventDefault();
        var inputText = Mapea.Geosearch.SEARCH_INPUT.val();
        Mapea.Geosearch.executeMobile(inputText);
    });

    Mapea.Geosearch.CLEAR_BUTTON.click(Mapea.Geosearch.clearButtonFn);
    
//    Mapea.Geosearch.RESULTS_BUTTON.click(function(event) {
//        event.preventDefault();
//        Mapea.Geosearch.showMobileResults();
//    });
    
    Mapea.Geosearch.RESULTS_BUTTON.click(Mapea.Geosearch.showHideResults);
    
    Mapea.Geosearch.RESULTS_HEADER_BUTTON.click(function(event) {
        event.preventDefault();
        Mapea.Geosearch.hideResults();
    });
    
    if (Mapea.Geosearch.SEARCHSTREET) {
        Autocomplete.init('idInputSearchMobile', {
            'onselect' : Mapea.Geosearch.selectValue,
            'onenterpress' : function(event) {
                Mapea.Geosearch.SEARCH_BUTTON.click();
            }
        });
        $(".geosearchstreet-results").tabs();
    }
    else {
        /* if it was not specified the autocomplete
           then check when the user press enter key */
        Mapea.Geosearch.SEARCH_INPUT.keypress(function(event) {
            if (event.which == 13) {
               event.preventDefault();
               Mapea.Geosearch.SEARCH_BUTTON.click();
            }
        });
    }
    
    // removes focus of the input search when users click over the map
    OpenLayers.Event.observe(map.div, "touchstart", function(event) {
        Mapea.Geosearch.SEARCH_INPUT.blur();
    });
};

/**
 * TODO
 */
Mapea.Geosearch.executeMobile = function(inputText) {
    Mapea.Geosearch.QUERY = OpenLayers.String.trim(inputText || "");

    if (Mapea.Geosearch.QUERY.length > 0) {
        
        Mapea.Geosearch.initSearch();

        Mapea.Geosearch.executeGeosearch(Mapea.Geosearch.callbackMobile);
        
         if (Mapea.Geosearch.SEARCHSTREET) {
             Mapea.Geosearch.executeGeocoder(Mapea.Geosearch.initalizeGeocoderMobile);
         }
    }
    else {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de búsqueda");
    }
};

Mapea.Geosearch.callbackMobile = function(response) {

    Mapea.Geosearch.GEOSEARCH_RESPONSE = response;
    
    Mapea.Geosearch.GEOSEARCH_SEARCHING = false;

    if (!Mapea.Geosearch.SEARCHSTREET || 
        (Mapea.Geosearch.SEARCHSTREET && !Mapea.Geosearch.STREET_SEARCHING)) {
        Mapea.Geosearch.ManageResponsesMobile();
    }
};

/**
 * TODO
 */
Mapea.Geosearch.ManageResponsesMobile = function(fromAutocomplete) {
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.ManageGeocoderResponseMobile(Mapea.Geosearch.GEOCODER_RESPONSE.response, 
            Mapea.Geosearch.GEOCODER_RESPONSE.municipio,
            Mapea.Geosearch.GEOCODER_RESPONSE.provincia);
    }
    if (!fromAutocomplete) {
        Mapea.Geosearch.ManageGeosearchResponseMobile(Mapea.Geosearch.GEOSEARCH_RESPONSE);
    }
    else {
        Mapea.Geosearch.GEOSEARCH_CONTAINER.html("");
    }
};

/**
 * TODO
 */
Mapea.Geosearch.ManageGeosearchResponseMobile = function(response) {
    // 1. removes popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // 2. removes results
    Mapea.Geosearch.GEOSEARCH_CONTAINER.html("");

    Mapea.Geosearch.drawResultsFeature(false);

    // increments current page
    Mapea.Geosearch.CURRENT_PAGE += Mapea.Geosearch.ROWS;

    // 9. enable scroll pagination
    Mapea.Geosearch.enablePagination(function() {
        if (!Mapea.Geosearch.GEOSEARCH_SEARCHING) {
            Mapea.Geosearch.showLoadingAsResult();
        }
    }, function(response) {
        Mapea.Geosearch.hideLoadingAsResult();
        Mapea.Geosearch.callbackMoreResults(response);
    }, Mapea.Geosearch.geosearchErrorCallback);

    Mapea.Geosearch.checkEmptyResults();
    
    Mapea.Geosearch.hideSearchingImages();
    
    // hides autocomplete
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.SEARCH_INPUT.autocomplete("close");
    }

    // show results button
    Mapea.Geosearch.RESULTS_BUTTON.css("display", "");
    
    Mapea.Geosearch.showFirstMobileResult();
    
    // zoom to results BBOX
//    Mapea.Geosearch.zoomResultBbox();
};

/**
 * TODO
 */
Mapea.Geosearch.ManageGeocoderResponseMobile = function(response, municipio, provincia) {
    // removes all popups
    Mapea.Util.removeAllPopups(map);
    Mapea.Util.unselectAllFeatures(map);

    // removes previous results
    Mapea.Geosearch.STREET_CONTAINER.html("");
    
    Mapea.Geosearch.handleGeocoderMunProvResponse(response,  municipio, provincia, function(results) {
        Mapea.Geosearch.drawGeocoderResults(results);

        // hides searching gifs
        Mapea.Geosearch.hideSearchingImages();
        
        if (Mapea.Geosearch.STREET_CONTAINER.children().length > 0) {
            // attach events to results
            Mapea.Geosearch.attachEventsToGeocoderResults();
            
            // 7. hide autocomplete
            Mapea.Geosearch.SEARCH_INPUT.autocomplete("close");
            
            // show results button
            Mapea.Geosearch.RESULTS_BUTTON.css("display", "");
            
            Mapea.Geosearch.showResults();
            
            Mapea.Geosearch.showFirstMobileResult();
        }
        else { // there were not any results so shows not found message
            var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
            notFoundHtml += 'No se han encontrado direcciones para la búsqueda ';
            notFoundHtml += '"' + Mapea.Geosearch.QUERY + '"';
            notFoundHtml += '</div></div>';
            Mapea.Geosearch.STREET_CONTAINER.append(notFoundHtml);
        }
    });
};

/**
 * TODO
 */
Mapea.Geosearch.showFirstMobileResult = function() {
    if (!Mapea.Geosearch.GEOSEARCH_SEARCHING
            && !Mapea.Geosearch.STREET_SEARCHING) {
        
        var hasSpatialFeatures = (Mapea.Geosearch.LAYER.spatialFeatures.length > 1);
        var hasTextFeatures = (Mapea.Geosearch.LAYER.textFeatures.length > 1);
        var hasStreetFeatures = (Mapea.Geosearch.SEARCHSTREET
                && (Mapea.Geosearch.STREET_CONTAINER.children().length <= 0));
        
        
        if (hasSpatialFeatures || hasTextFeatures || hasStreetFeatures) {
            Mapea.Geosearch.zoomResultBbox();
        }
        else {
            // if no results retrieved then show results panel
            Mapea.Geosearch.showResults();
        }
    }
};

/**
 * TODO
 */
Mapea.Geosearch.showHideResults = function(event) {
    event.preventDefault();
    
    if (!Mapea.Geosearch.GEOSEARCH_SEARCHING
            && !Mapea.Geosearch.STREET_SEARCHING) {
        if (Mapea.Geosearch.SHOW_RESULTS) {
            Mapea.Geosearch.hideResults();
        }
        else {
            Mapea.Geosearch.showResults();
        }
    }
};

/**
 * TODO
 */
Mapea.Geosearch.showLoadingAsResult = function() {
    var loadingResult = jQuery('<div class="loading-result">');
    Mapea.Geosearch.GEOSEARCH_CONTAINER.append(loadingResult);
};

/**
 * TODO
 */
Mapea.Geosearch.hideLoadingAsResult = function() {
    jQuery(".loading-result").remove();
};

/**
 * TODO
 */
Mapea.Geosearch.enablePagination = function(beforeLoadFn, callbackFn, errorFn) {
    Mapea.Geosearch.MORE_RESULTS = true;
    Mapea.Geosearch.GEOSEARCH_CONTAINER.scrollPagination({
        'heightOffset': 10, //px before scroll get bottom
        'beforeLoad' : beforeLoadFn,
        'loadFn' : function() {
            Mapea.Geosearch.showSearchingImages();
            
            if (!Mapea.Geosearch.GEOSEARCH_SEARCHING) {
                Mapea.Geosearch.GEOSEARCH_SEARCHING = true;
                Mapea.Geosearch.LAYER.search({
                    q: Mapea.Geosearch.LAYER.geosearchParams.q,
                    start: Mapea.Geosearch.CURRENT_PAGE,
                    rows: Mapea.Geosearch.LAYER.geosearchParams.rows,
                    threshold: Mapea.Geosearch.LAYER.geosearchParams.threshold
                }, function(response) {
                    callbackFn(response);
                }, function(error) {
                    errorFn(error);
                }, true);
            }
        }
    });
};


Mapea.Geosearch.initalizeGeocoderMobile = function(normalizeResponse, fromAutocomplete) {
    // gets parameters
    var tipoVia = normalizeResponse.tipoVia;
    var nombreVia = normalizeResponse.nombreVia;
    var numeroPortal = normalizeResponse.numeroPortal;
    var municipio = Mapea.Geosearch.FILTER_LOCALITY || normalizeResponse.municipio;
    var provincia = Mapea.Geosearch.FILTER_CITY || normalizeResponse.provincia;
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
        Mapea.Geosearch.geocoderMunSrs(function(results) {
            Mapea.Geosearch.finishGeocoderMobile(results, municipio, provincia, fromAutocomplete);
        }, Mapea.Geosearch.geocoderErrorCallback, nombreVia, numeroPortal, tipoVia,
        municipio, Mapea.Util.getMapProjection(map));
        
        return;
    }
    
    // calling the web service method geocoderMunProvSrs
    callejeroProxy.geocoderMunProvSrs(function(results){
        Mapea.Geosearch.finishGeocoderMobile(results, municipio, provincia, fromAutocomplete);
    }, Mapea.Geosearch.geocoderErrorCallback, nombreVia, numeroPortal, tipoVia, municipio, provincia, Mapea.Util.getMapProjection(map));
};


Mapea.Geosearch.finishGeocoderMobile = function(response, municipio, provincia, fromAutocomplete) {

    Mapea.Geosearch.GEOCODER_RESPONSE = {
        "response" : response,
        "municipio" : municipio,
        "provincia" : provincia
    };
    
    Mapea.Geosearch.STREET_SEARCHING = false;

    if (!Mapea.Geosearch.GEOSEARCH_SEARCHING) {
        Mapea.Geosearch.ManageResponsesMobile(fromAutocomplete);
    }
};

/**
 * TODO
 */
Mapea.Geosearch.geosearchErrorCallback = function(error) {
    Mapea.Geosearch.GEOSEARCH_SEARCHING = false;
    Mapea.Util.showErrorMessage(error);
    Mapea.Geosearch.hideSearchingImages();
    Mapea.Geosearch.hideLoadingAsResult();
};

/**
 * TODO
 */
Mapea.Geosearch.geocoderErrorCallback = function(error) {
    Mapea.Geosearch.STREET_SEARCHING = false;
    Mapea.Util.showErrorMessage(error);
    Mapea.Geosearch.hideSearchingImages();
};

/**
 * TODO
 */
Mapea.Geosearch.clearButtonFn = function(event) {
    event.preventDefault();
    Mapea.Geosearch.SEARCH_INPUT.val("");
    Mapea.Geosearch.GEOSEARCH_CONTAINER.html("");
    
    if (Mapea.Geosearch.SEARCHSTREET) {
        Mapea.Geosearch.STREET_CONTAINER.html("");
    }

    Mapea.Geosearch.disableScrollPagination();
    /* it geosearchbylocation is activate then
     * does not remove any result */
    var geosearchByLocationCtrl =  map.getControlsByClass("Mapea.Control.GeosearchByLocation")[0];
    if (!geosearchByLocationCtrl || !geosearchByLocationCtrl.active) {
        Mapea.Geosearch.LAYER.clear();
        Mapea.Util.removeAllPopups(map);
        Mapea.Util.unselectAllFeatures(map);
    }

    Mapea.Geosearch.hideResults();
    // hides results button
    Mapea.Geosearch.RESULTS_BUTTON.css("display", "none");
    
};
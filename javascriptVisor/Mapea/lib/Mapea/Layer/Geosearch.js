/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires Mapea/Layer/Vector.js
 * @requires Mapea/util/cda/CallejeroService.js
 * @requires Mapea/Layer/Vector.js
 */

/**
 * Class: Mapea.Layer.Geosearch
 * Instances of Mapea.Layer.Geosearch are used to render vector data 
 *  from a query of Geosearch. Create a new vector layer with the
 *     <Mapea.Layer.Geosearch> constructor.
 *
 * Inherits from:
 *  - <Mapea.Layer.Vector>
 */
Mapea.Layer.Geosearch = OpenLayers.Class(Mapea.Layer.Vector, {
    /**
     * {Object} Parameters sent to geosearch. They use the same
     * syntaxes than Solr queries:
     * q, wt, rows, start..
     */
    geosearchParams : {
        wt : "json"
    },
    
    /**
     * {String} Establishes the url to Geosearch
     */
    geosearchUrl: null,

    /**
     * {String} Establishes the request handler in Solr
     */
    requestHandler: null,

    /**
     * {String} Select the core which has the
     * indexed documents to search 
     */
    core: null,

    /**
     * APIProperty: name
     * {String} Name of the layer
     */
    name: "geosearch",

    /**
     * {Object} Results provided by the text search
     */
    textResults : null,
    
    /**
     * {Object} Results provided by the spatial search
     */
    spatialResults : null,
    
    /**
     * {Object} Reference results which was used by
     * the spatial search as reference
     */
    referenceResults : null,
    
    /**
     * {Integer} Number of found documents returned
     * by geosearch
     */
    numFound : 0,
    
    /**
     * {Integer} Parameter start returned
     * by geosearch
     */
    start : 0,
    
    /**
     * {Integer} Parameter rows returned by
     * geosearch
     */
    rows : 0,
    
    /**
     * {Array} Features which corresponds to
     * text results
     */
    textFeatures : [],
    
    /**
     * {Array} Features which corresponds to
     * spatial results
     */
    spatialFeatures : [],
    
    /**
     * {Array} Features which corresponds to the
     * reference results geometry
     */
    referenceFeatures : [],

    /**
     * {Array} Features which corresponds to the
     * reference results area
     */
    referenceAreaFeatures : [],
    
    /**
     * {Array} The features of the Geosearch response
     */
    responseFeatures : [],
    
    /**
     * {String} Name of the geometry field on documents
     */
    geoFieldName : "geom",
    
    /**
     * {<OpenLayers.Format.WKT>} Reader used to parse WKT geometries
     */
    WKTReader : null,
    
    /**
     * {Array} Names of the fields which won't be shown
     */
    hiddenFields: [],
    
    /**
     * {String} Name of the reference field on reference documents 
     */
    areaFieldName : "reference",

    /**
     * {Object} The feature geometry center icon style
     */
    centerIconStyle : Mapea.Util.featureIconStyle,
    
    /**
     * {Object} The new feature geometry center icon style
     * retrieved by the pagination
     */
    newCenterIconStyle : Mapea.Util.newFeatureIconStyle,
    
    /**
     * {Object} The feature geometry result style
     */
    resultStyle : {
        fillColor: "#15A135",
        fillOpacity: 0,
        hoverFillColor: "white",
        hoverFillOpacity: 0.7,
        strokeColor: "#087021",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },
    
    /**
    * {Object} The new feature geometry center icon style
    * retrieved by the pagination
    */
    newResultStyle : {
        fillColor: "#15A135",
        fillOpacity: 0,
        hoverFillColor: "white",
        hoverFillOpacity: 0.7,
        strokeColor: "#087021",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },

    /**
     * {Object} The reference feature geometry style
     */
    referenceStyle : {
        fillColor: "#432FC6",
        fillOpacity: 0.07,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#280862",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },

    /**
     * {Object} The reference feature area geometry style
     */
    areaStyle : {
        fillColor: "#FFF042",
        fillOpacity: 0.07,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#FF7700",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },
    
    ratio : 2,

    /**
     * Constructor: Mapea.Layer.Geosearch
     * Create a new geosearch layer
     *
     * Parameters:
     * config - {Object} The configuration of the geosearch layer. In this parameter
     * we can establish the core, the requestHandler, onSuccess function, styles..
     * options - {Object} Options which will be applied to {<Mapea.Layer.Vector>}
     * 
     * Returns:
     * {<Mapea.Layer.Geosearch>} A new geosearch layer with the required configuration
     * to execute searches
     * 
     * Example:
     * var geosearchLayer = new Mapea.Layer.Geosearch(
     *      {
     *          requestHandler:"/search",
     *          core:"coreName",
     *          hiddenFields: ["geom", "_version_", "solrid", "anotherfield"],
     *          onSuccess : function(response) {
     *              window.alert("search executed successfully!");
     *          }
     *      });
     */
    initialize: function(config, options) {
        var opts = options || {};
        if (opts.name) this.name = opts.name;
        if (!opts.ratio) opts.ratio = this.ratio;
        Mapea.Layer.Vector.prototype.initialize.apply(this, [this.name, opts]);

        // now override default config
        OpenLayers.Util.extend(this, config);
        
        this.WKTReader = new OpenLayers.Format.WKT();
    },

    /** 
     * Method: setMap
     * The layer has been added to the map. 
     * 
     * If there is no renderer set, the layer can't be used. Remove it.
     * Otherwise, give the renderer a reference to the map and set its size.
     * 
     * Parameters:
     * map - {<OpenLayers.Map>} 
     */
    setMap : function(map) {
        this.geosearchUrl = this.geosearchUrl || map.geosearchUrl;
        if (this.geosearchUrl == null) {
           throw "no se ha definido la URL de Geosearch";
        }
        
        Mapea.Layer.Vector.prototype.setMap.apply(this, arguments);
        
        this.events.register('featureselected', this, this._showPopupFeature);
        this.events.register('featureunselected', this, this._hidePopupFeature);
        
        map.uniqueSelectFeatureCtrl.addLayers(this);
    },

    /** 
     * Method: search
     * Sends to geosearch the parameters provided and draw the results
     * into the layer.
     * 
     * Parameters:
     *  userParams - {String} or {Object} The geosearch parameters or the
     *           search string introduced by the user
     *  callbackSuccess - {function} Callback which will be executed
     *                    if the search ran successfully
     *  callbackError - {function} Callback which will be executed
     *                  if the search had some error
     * 
     * Examples:
     *      geosearchLayer.search({q: "foo", threshold: 0.85, start: 10});
     *      geosearchLayer.search("foo");
     */
    search : function(userParams, callbackSuccess, callbackError, appendResults) {
        var params;
        if ((typeof userParams) == "string") {
            params = { q: userParams };
        }
        else {
            params = userParams;
        }
            
        // configure new params
        OpenLayers.Util.extend(this.geosearchParams, params);

        if (!this.geosearchParams.q) throw "No se ha especificado ninguna consulta";

        this.geosearchParams.srs = Mapea.Util.getMapProjection(this.map);
        
        var successFn = appendResults? this._onSuccessAppend : this._onSuccess;
        if (callbackSuccess && (callbackSuccess != null))
            successFn = function(response) {
                appendResults? this._onSuccessAppend(response) : this._onSuccess(response);
                callbackSuccess(response);
            };

        var errorFn = this._onError;
        if (callbackError && (callbackError != null)) {
            errorFn = callbackError;
        }

        Mapea.CDA.geosearch(this.geosearchUrl, this.geosearchParams, this.core, this.requestHandler, successFn, errorFn, this);
    },
    
    /** 
     * Method: _onSuccess
     * Callback executed if the search was a success.
     * 
     * Parameters:
     * response - {JSON} The geosearch response formatted in JSON
     */
    _onSuccess : function(response) {
        // copies the parameters
        var geosearchParamsBackup = this.geosearchParams;

        // remove features and results
        this.clear();

        // restores parameters
        OpenLayers.Util.extend(this.geosearchParams, geosearchParamsBackup);

        this._getResultsFromResponse(response);

        this._drawResults();

        this.refresh();
        
        this.redraw();
    },
    
    /** 
     * Method: _onSuccessAppend
     * Callback executed if the "more results" search was a success.
     * 
     * Parameters:
     * response - {JSON} The geosearch response formatted in JSON
     */
    _onSuccessAppend : function(response) {
        this._appendResultsFromResponse(response);
        
        this._drawAppendedResults(response);

        this.refresh();
        
        this.redraw();
    },

    /** 
     * Method: _onError
     * Callback executed there was any error
     * 
     * Parameters:
     * error - {String} Cause of the error
     */
     _onError : function(error) {
        Mapea.Util.showErrorMessage("Ha ocurrido un error al ejecutar la búsqueda");
     },
     
    /** 
     * Method: _getResultsFromResponse
     * Gets the JSON documents of the Geosearch response
     * 
     * Parameters:
     * response - {JSON} The geosearch response formatted in JSON
     */
     _getResultsFromResponse : function(response) {
         this.textResults = response.response;
         this.spatialResults = response.spatial_response;
         this.referenceResults = response.reference_response;
     },
     
     /** 
      * Method: _appendResultsFromResponse
      * Appends the new features from the response to the
      * existing features in the layer
      * 
      * Parameters:
      * response - {JSON} The geosearch response formatted in JSON
      */
     _appendResultsFromResponse : function(response) {
         // text response
         if (response.response)
         {
             if (this.textResults)
                 this.textResults.docs = this.textResults.docs.concat(response.response.docs);
             else
                 this.textResults = response.response;
         }
         
         // spatial response
         if (response.spatial_response)
         {
             if (this.spatialResults)
                 this.spatialResults.docs = this.spatialResults.docs.concat(response.spatial_response.docs.docs);
             else
                 this.spatialResults = response.spatial_response;
         }
     },
     
     /** 
      * Method: _drawResults
      * Draws the results into the layer
      */
     _drawResults : function() {
        if (this.spatialResults && this.spatialResults.docs && (this.spatialResults.docs.length > 0)) {
            this.numFound = this.spatialResults.numFound;
            this.start = this.spatialResults.start;
            this.rows = this.spatialResults.docs.length;
            this.spatialFeatures = this._documentsToFeatures(this.spatialResults.docs, this.resultStyle, this.centerIconStyle);
            this._referenceDocumentsToFeatures(this.referenceResults.docs);
            this.addFeatures(this.spatialFeatures);
        }
        else {
            this.numFound = this.textResults.numFound;
            this.start = this.textResults.start;
            this.rows = this.textResults.docs.length;
            this.textFeatures = this._documentsToFeatures(this.textResults.docs, this.resultStyle, this.centerIconStyle);
            this.addFeatures(this.textFeatures);
        }
     },
     
     /** 
      * Method: _drawAppendedResults
      * Draws the new results into the layer
      * 
      * Parameters:
      * response - {JSON} The geosearch response formatted in JSON
      */
     _drawAppendedResults : function(response) {
         if (response.spatial_response) {
             this.numFound = response.spatial_response.numFound;
             this.start += response.spatial_response.docs.length;
             this.rows = response.spatial_response.docs.length;
             
             this.responseFeatures = this._documentsToFeatures(response.spatial_response.docs, this.newResultStyle, this.newCenterIconStyle, true);
             this.spatialFeatures = this.spatialFeatures? this.spatialFeatures.concat(this.responseFeatures) : this.responseFeatures;
             
             // no dibujamos la referencia
             // this._referenceDocumentsToFeatures(this.referenceResults.docs);
         }
         else if (response.response) {
             this.numFound = response.response.numFound;
             this.start += response.response.docs.length;
             this.rows = response.response.docs.length;
             
             this.responseFeatures = this._documentsToFeatures(response.response.docs, this.newResultStyle, this.newCenterIconStyle, true);
             this.textFeatures = this.textFeatures? this.textFeatures.concat(this.responseFeatures) : this.responseFeatures;
         }
         
         // applies default style to the others features
         if (this.features) {
             for (var i=0, ilen=this.features.length; i < ilen; i++) {
                 var feature = this.features[i];
                 if (feature.centerIcon && feature.newFeature) {
                     feature.style = this.centerIconStyle;
                     feature.newFeature = false;
                 }
             }
         }
         
         this.addFeatures(this.responseFeatures);
     },
     
     /** 
      * Method: _documentsToFeatures
      * Parses each JSON document into <OpenLayers.Features.Vector>
      * 
      * Parameters:
      * documents - {Array(JSON)} Array of Solr documents formatted in JSON
      * featureStyle - {Object} Style to apply on the features created
      * featureCenterIconStyle - {Object} Style to apply on the center icon features
      * newFeature - {Boolean} True if the features come from a pagination
      *
      * Returns:
      * {Array<OpenLayers.Features.Vector>} Array of the parsed features.
      */
     _documentsToFeatures : function(documents, featureStyle, featureCenterIconStyle, newFeature) {
         var features = [];
         
         for (var i=0,len=documents.length; i<len; i++) {
             var document = documents[i];
             var wkTGeometry = document[this.geoFieldName];
             
             var feature = this.WKTReader.read(wkTGeometry);
             
             if(feature && OpenLayers.Util.isArray(feature))
                 feature = feature[0];
             
             if (feature) {
                // hides its geometry
                feature.style = {'display': 'none'};
                feature.attributes = document;
                feature.noPopup = true; // indicate that we don't want to add a popup
                features.push(feature);
                    
                /* 
                 * get the centroid of the feature, define 
                 * a style for it and add it to the map
                 */
                var coordX = feature.geometry.getCentroid().x;
                var coordY = feature.geometry.getCentroid().y;
                
                var styledFeature = Mapea.Util.drawStyledFeature(coordX, coordY, document, featureCenterIconStyle);
                // saves the geom feature id
                styledFeature.geomFeatureId = feature.id;
                styledFeature.centerIcon = true; //indicate that is the center icon of the feature
                styledFeature.newFeature = newFeature;
                features.push(styledFeature);
             }
         }
         
         return features;
     },

     /** 
      * Method: _referenceDocumentsToFeatures
      * Parses each JSON reference document into <OpenLayers.Features.Vector>
      * 
      * Parameters:
      * referenceDocuments - {Array(JSON)} Array of Solr documents used as spatial
      * reference in the spatial search
      */
    _referenceDocumentsToFeatures : function(referenceDocuments) {
        for (var i=0,len=referenceDocuments.length; i<len; i++)
        {
            var referenceDocument = referenceDocuments[i];
            /*
            * get the reference wkt and the
            * area wkt from the result
            */
            var wktGeometry = referenceDocument[this.geoFieldName];
            var wktReference = referenceDocument[this.areaFieldName];
             
            var referenceFeature = this.WKTReader.read(wktGeometry);
            var areaFeature = this.WKTReader.read(wktReference);
             
            if(referenceFeature && OpenLayers.Util.isArray(referenceFeature))
                referenceFeature = referenceFeature[0];

            if(areaFeature && OpenLayers.Util.isArray(areaFeature))
                areaFeature = areaFeature[0];
             
            if (referenceFeature)
            {
                referenceFeature.style = {display : 'none'};
                referenceFeature.attributes = referenceDocument;
                referenceFeature.reference = true;
                this.referenceFeatures.push(referenceFeature);
            }

            if (areaFeature)
            {
                areaFeature.style = {display : 'none'};
                areaFeature.noPopup = true;
                areaFeature.area = true;
                this.referenceAreaFeatures.push(areaFeature);
            }
        }
        this.addFeatures(this.referenceFeatures);
        this.addFeatures(this.referenceAreaFeatures);
    },

     /** 
      * Method: hasSpatialResults
      *
      * Returns:
      * {Boolean} True if the search was a spatial search
      */
    hasSpatialResults : function() {
        return (this.spatialResults && this.spatialResults.docs && (this.spatialResults.docs.length > 0));
    },

     /** 
      * Method: hideReferences
      * Hides the reference features
      */
    hideReferences : function() {
        // applies the style display="none" to the reference and area features
        for (var i=0,ilen=this.referenceFeatures.length; i<ilen; i++)
        {
            var feature = this.referenceFeatures[i];
            feature.style = {display: 'none'};
        }
        for (var i=0,ilen=this.referenceAreaFeatures.length; i<ilen; i++)
        {
            var feature = this.referenceAreaFeatures[i];
            feature.style = {display: 'none'};
        }
        this.redraw();
    },

     /** 
      * Method: showReferences
      * Shows the reference features
      */
    showReferences : function() {
        for (var i=0,ilen=this.referenceFeatures.length; i<ilen; i++)
        {
            var feature = this.referenceFeatures[i];
            feature.style = this.referenceStyle;
        }
        for (var i=0,ilen=this.referenceAreaFeatures.length; i<ilen; i++)
        {
            var feature = this.referenceAreaFeatures[i];
            feature.style = this.areaStyle;
        }
        this.redraw();
    },
    
     /** 
      * Method: _showPopupFeature
      * Show the popup for the clicked feature
      * 
      * Parameters:
      * feature - {<OpenLayers.Feature.Vector>} feature which was clicked
      * by te user
      */
    _showPopupFeature : function(evt) {
        var feature = evt.feature;
        
        if (feature.noPopup) {
            return;
        }
        var hasAttributes = false;
        var htmlTable = "<table class=\"mapea-table\"><tbody>";         
        for (var attrName in feature.attributes) {
            //check if we must show the field
            var showField = true;
            for (var i=0,ilen=this.hiddenFields.length; i<ilen; i++) {
                var hideField = this.hiddenFields[i];
                if (attrName == hideField) {
                    showField = false;
                    break;
                }                   
            }
            // shows the field
            if (showField) {
                htmlTable += "<tr><td><b>";
                htmlTable += this._beautifyName(attrName);
                htmlTable += "</b></td><td>";
                htmlTable += feature.attributes[attrName];
                htmlTable += "</td></tr>";
                
                hasAttributes = true;
            }
        }
        
        // if it does not have any attributes shows info
        if ( !hasAttributes ) {
            htmlTable += "<tr><td><b>Informaci&oacute;n</b></td><td>";
            htmlTable += "Punto de inter&eacute;s con informaci&oacute;n</br>";
            htmlTable += "espacial pero sin informaci&oacute;n alfanum&eacute;rica";
            htmlTable += "</td></tr>";
        }

        htmlTable += "</tbody></table>";

        // gets its geom feature and shows it
        if (feature.geomFeatureId) {
            var geomFeature = this.getFeatureById(feature.geomFeatureId);
            geomFeature.style = this.resultStyle;
            this.drawFeature(geomFeature);
        }

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
            var mapPopup = Mapea.Util.getPopupInPixel(this.map, clickedPixel);
            if (mapPopup) {
                var htmlFinal = mapPopup.contentHTML;
                htmlFinal += "<div class=\"popup-info-separator\">Geobúsquedas</div>";
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
                
                if (mapPopup.size == null)
                    mapPopup.setSize(mapPopup.contentSize);

                feature.popup = mapPopup;
                this.map.addPopup(mapPopup);
            }          
        }
    },

     /** 
      * Method: _hidePopupFeature
      * Hides the popup for the clicked feature
      * 
      * Parameters:
      * feature - {<OpenLayers.Feature.Vector>} feature which was clicked out
      * by te user
      */
    _hidePopupFeature : function(evt) {
        var feature = evt.feature;
        
        // hides its geometry
        if (feature.geomFeatureId) {
            var geomFeature = this.getFeatureById(feature.geomFeatureId);
            geomFeature.style = {'display': 'none'};
            this.drawFeature(geomFeature);
        }
        if (this.map) {
            Mapea.Util.removeAllPopups(this.map);
        }       
    },
    
     /** 
      * Method: _beautifyName
      * Beautifies the string
      * 
      * Parameters:
      * rawName - {String} string to beautify
      */
    _beautifyName : function(rawName) {
        return Mapea.Util.beautifyString(rawName);
    },
    
     /** 
      * Method: getResultsBbox
      * Gets the bounding box of the search results
      *
      * Returns:
      * {<OpenLayers.Bounds>} Bounding box of the results
      */
    getResultsBbox : function() {
        var lefts = [];
        var rights = [];
        var tops = [];
        var bottoms = [];
        
        // iterates over the results features
        var features = this.hasSpatialResults()? this.spatialFeatures : this.textFeatures;
        for (var i=0,ilen=features.length; i<ilen; i++)
        {
            var feature = features[i];
            if (feature && feature.geometry)
            {
                // collects the left, right, top and bottom
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

        // calculates the bbox
        var maxLeft = Math.min.apply(null, lefts);
        var maxRight = Math.max.apply(null, rights);
        var maxTop = Math.max.apply(null, tops);
        var maxBottom = Math.min.apply(null, bottoms);
        
        var resultsBBOX = new OpenLayers.Bounds(maxLeft, maxBottom, maxRight, maxTop);
        
        return resultsBBOX;
    },

    /** 
     * Method: clear
     * Remove and destroy all attributes of the layer
     */
    clear : function() {
        this.textResults = null;
        this.spatialResults = null;
        this.referenceResults = null;
        this.numFound = 0;
        this.start = 0;
        this.rows = 0;
        this.textFeatures.length = 0;
        this.spatialFeatures.length = 0;
        this.referenceFeatures.length = 0;
        this.referenceAreaFeatures.length = 0;
        this.geosearchParams = {
            wt : "json"
        };
        this.destroyFeatures();
    },

    CLASS_NAME: "Mapea.Layer.Geosearch"
});
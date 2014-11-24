/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Tile/WFS.js
 * @requires OpenLayers/Layer/Vector.js
 * @requires OpenLayers/Layer/Markers.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: Mapea.Layer.WFS
 *
 * Inherits from:
 *  - <OpenLayers.Layer.WFS>
 */
Mapea.Layer.WFS = OpenLayers.Class(OpenLayers.Layer.WFS, {
    
    handlerType : null,
    
    multipleType : false,
    
    schema: null,
    
    /**
     * APIProperty: attributesNames
     * {Array} Array with the attributes names of the layer.
     */
    attributes: [],
    
    selectWFSFeature: null,

    /**
     * APIProperty: featureSel
     * Name of selectedLayer.
     */
    featureSel: null,
    
    /**
     * Property: DEFAULT_PARAMS
     * {Object} Hashtable of default key/value parameters
     */
    DEFAULT_PARAMS: { 
        service: "WFS",
        version: Mapea.Version.WFS_GET_FEATURE,
        request: "GetFeature"
    },
    
    /**
     * Constructor: Mapea.Layer.WFS
     *
     * Parameters:
     * name - {String}
     * url - {String}
     * params - {Object}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        if (params.handlerType)
            this.handlerType = params.handlerType;
        
        if (params.multipleType)
            this.multipleType = params.multipleType;
        
        // options
        options = options || {};
        if (!options.format) {
            //options.format = Mapea.Format.WFS;
            options.format = OpenLayers.Format.WFST;
        }
        if (options.featureClass || !OpenLayers.Layer.Vector ||
            !OpenLayers.Feature.Vector) {
            this.vectorMode = false;
        }
        
        OpenLayers.Util.extend(options, {'reportError': false});

        // params
        this.params = OpenLayers.Util.applyDefaults(params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
        
        // format options
        if (!this.formatOptions) {
            this.formatOptions = {};
        }
        
        this.formatOptions.extractAttributes = options.extractAttributes;
        this.formatOptions.version = Mapea.Version.WFS_GET_FEATURE;
        this.formatOptions.featureType = this.params.typename;
        this.formatOptions.featureNS = this.params.namespace;
        
        // initialize super clase
        var newArguments = [name, options];
        OpenLayers.Layer.Vector.prototype.initialize.apply(this, newArguments);
                
        if (!this.renderer || !this.vectorMode) {
            this.vectorMode = false;
            
            if (!options.featureClass) {
                options.featureClass = OpenLayers.Feature.WFS;
            }
            OpenLayers.Layer.Markers.prototype.initialize.apply(this, newArguments);
        }

        // layer options
        if (this.params && this.params.typename && !this.options.typename) {
            this.options.typename = this.params.typename;
        }
        
        if (!this.options.geometry_column) {
            this.options.geometry_column = "G_GEOMETRY";
        }

        this.url = url;
        
        this.describeFeatureType();
    },

    /**
     * Method: moveTo
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        if (this.vectorMode) {
            OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
        } else {
            OpenLayers.Layer.Markers.prototype.moveTo.apply(this, arguments);
        }

        // don't load wfs features while dragging, wait for drag end
        if (dragging) {
            // TBD try to hide the vector layer while dragging
            // this.setVisibility(false);
            // this will probably help for panning performances
            return false;
        }

        if ( zoomChanged ) {
            if (this.vectorMode) {
                this.renderer.clear();
            }
        }

    //DEPRECATED - REMOVE IN 3.0
        // don't load data if current zoom level doesn't match
        if (this.options.minZoomLevel) {
            OpenLayers.Console.warn(OpenLayers.i18n('minZoomLevelError'));

            if (this.map.getZoom() < this.options.minZoomLevel) {
                return null;
            }
        }

        if (bounds == null) {
            bounds = this.map.getExtent();
        }

        var firstRendering = (this.tile == null);

        //does the new bounds to which we need to move fall outside of the
        // current tile's bounds?
        var outOfBounds = (!firstRendering &&
                           !this.tile.bounds.containsBounds(bounds));

        if (zoomChanged || firstRendering || (!dragging && outOfBounds)) {
            //determine new tile bounds
            var center = bounds.getCenterLonLat();
            var tileWidth = bounds.getWidth() * this.ratio;
            var tileHeight = bounds.getHeight() * this.ratio;
            var tileBounds =
                new OpenLayers.Bounds(center.lon - (tileWidth / 2),
                                      center.lat - (tileHeight / 2),
                                      center.lon + (tileWidth / 2),
                                      center.lat + (tileHeight / 2));

            //determine new tile size
            var tileSize = this.map.getSize();
            tileSize.w = tileSize.w * this.ratio;
            tileSize.h = tileSize.h * this.ratio;

            //determine new position (upper left corner of new bounds)
            var ul = new OpenLayers.LonLat(tileBounds.left, tileBounds.top);
            var pos = this.map.getLayerPxFromLonLat(ul);

            //formulate request url string
            var url = this.getFullRequestString();

            var params = null;

            // Cant combine "filter" and "BBOX". This is a cheap hack to help
            // people out who can't migrate to the WFS protocol immediately.
            var filter = this.params.filter || this.params.FILTER;
            if (filter) {
                params = {FILTER: filter};
            }
            else{
                var featureid = this.params.featureid || this.params.FEATUREID;
                if(!featureid) {
                    params = {BBOX: this.getBBOXParameter(tileBounds)};
                }
            }

            if (this.map && !this.projection.equals(this.map.getProjectionObject())) {
                var projectedBounds = tileBounds.clone();
                projectedBounds.transform(this.map.getProjectionObject(),
                                          this.projection);
                if (!filter && !featureid){
                    params.BBOX = this.getBBOXParameter(projectedBounds);
                }
            }
            
            /*
             * Checks if the version is 1.1.0 or 2.0.0
             * to put the SRS to the BBOX param
             */
            if (params && params.BBOX && (params.BBOX.length > 0))
                url += "&" + OpenLayers.Util.getParameterString(params);

            if (!this.tile) {
                this.tile = new Mapea.Tile.WFS(this, pos, tileBounds,
                                                     url, tileSize);
                this.addTileMonitoringHooks(this.tile);
                this.tile.draw();
            } else {
                if (this.vectorMode) {
                    this.destroyFeatures();
                    this.renderer.clear();
                } else {
                    this.clearMarkers();
                }
                this.removeTileMonitoringHooks(this.tile);
                this.tile.destroy();

                this.tile = null;
                this.tile = new Mapea.Tile.WFS(this, pos, tileBounds,
                                                     url, tileSize);
                this.addTileMonitoringHooks(this.tile);
                this.tile.draw();
            }
        }
    },
    
    /**
     * Method: onMapResize
     * Call the onMapResize method of the appropriate parent class.
     */
    onMapResize: function() {
        if(this.vectorMode) {
            OpenLayers.Layer.Vector.prototype.onMapResize.apply(this,
                                                                arguments);
        } else {
            OpenLayers.Layer.Markers.prototype.onMapResize.apply(this,
                                                                 arguments);
        }
    },

    /**
     * Method: display
     * Call the display method of the appropriate parent class.
     */
    display: function() {
        if(this.vectorMode) {
            OpenLayers.Layer.Vector.prototype.display.apply(this,
                                                                arguments);
        } else {
            OpenLayers.Layer.Markers.prototype.display.apply(this,
                                                                 arguments);
        }
    },

    /**
     * APIMethod: commit
     * Write out the data to a WFS server.
     */
    commit: function() {
        // checks the selected feature by the editattribute control
        if (this.selectedFeatures.length > 0) {
            this.featureSel = this.selectedFeatures[0].fid;
        }
        else {
            this.featureSel = null;
        }

        var data = this.writer.write(this.features);

        var saveBtnDiv = jQuery(".olControlSaveFeaturesItemInactive")[0];
        if (saveBtnDiv)
            OpenLayers.Element.addClass(saveBtnDiv, "saving");
        OpenLayers.Request.POST({
            url: this.url,
            data: data,
            success: function(request) {
                OpenLayers.Element.removeClass(saveBtnDiv, "saving");
                OpenLayers.Function.bind(this.commitSuccess, this)(request);
            },
            failure: this.commitFailure,
            scope: this
        });
    },

    /**
     * Method: commitSuccess
     * Called when the Ajax request returns a response
     *
     * Parameters:
     * response - {XmlNode} from server
     */
    commitSuccess: function(request){
        var response = request.responseText;
        var jxml = jQuery(response);
        
        var statusTagName = (jQuery.browser.msie? "status" : "wfs\\:status");
        var successTagName = (jQuery.browser.msie? "success" : "wfs\\:success");
        
        if (jxml.find(statusTagName).find(successTagName).length > 0)
        {
            Mapea.Util.showSuccessMessage("Se ha guardado con éxito");
        }
        else
        {
            var exceptionText = jxml.find("ServiceException").text().trim();
            var messageTagName = (jQuery.browser.msie? "Message" : "wfs\\:Message");
            if (!exceptionText || (exceptionText.length == 0)) {
                exceptionText = jxml.find(messageTagName).text().trim();
            }
            Mapea.Util.showErrorMessage(exceptionText);
        }

        this.refresh();
    },
    
    /**
     * APIMethod: refresh
     * Refreshes all the features of the layer
     * 
     * MAPEA: previusly, unselect all the features
     */
    refresh: function() {
        // MAPEA patch
        // unselect all features
        if (this.selectWFSFeature)
            this.selectWFSFeature.unselectAll();
        
        // remove all selected features from WFST controls
        var wfsCtrls = this.map.getControlsByClass("Mapea.Control.EditAttributeFeature");
        wfsCtrls = wfsCtrls.concat(this.map.getControlsByClass("Mapea.Control.DrawFeature"));
        wfsCtrls = wfsCtrls.concat(this.map.getControlsByClass("Mapea.Control.DeleteFeature"));
        wfsCtrls = wfsCtrls.concat(this.map.getControlsByClass("Mapea.Control.ModifyFeature"));
        
        for (var i=0,len=wfsCtrls.length; i<len; i++)
        {
            var wfsCtrl = wfsCtrls[i];
            if (wfsCtrl && wfsCtrl.feature)
            {
                wfsCtrl.feature = null;
                delete wfsCtrl.feature;
            }
        }
        // end MAPEA patch
        
        if (this.tile) {
            if (this.vectorMode) {
                this.renderer.clear();
                this.features.length = 0;
            } else {
                this.clearMarkers();
                this.markers.length = 0;
            }
            this.tile.draw();
        }
    },
    
    describeFeatureType: function() {
        var namespaceFeatureTye = this.options.namespace + ":" + this.options.typename;
        var request = OpenLayers.Request.GET({
            url: this.url,
            success: this.onDescribeFeatureTypeSuccess,
            failure: this.onDescribeFeatureTypeError,
            scope: this,
            params: {
                version: Mapea.Version.WFS_DESCRIBE_FEATURE_TYPE,
                service: "WFS",
                request: "DescribeFeatureType",
                typeName: namespaceFeatureTye
            },
            async: false
        });
    },
    
    onDescribeFeatureTypeSuccess: function(request) {
        var xml = new OpenLayers.Format.XML();
        var wfs = new OpenLayers.Format.WFSDescribeFeatureType();
        var doc = null;

        //Sometimes, the answer is a white page
        if (request.responseXML == null){
            Mapea.Util.showErrorMessage("Ha ocurrido un error al obtener el documento DescribeFeatureType.");
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

        if (!request.responseXML.documentElement ) {
            doc = xml.read(request.responseText);
        }
        else {
            doc = request.responseXML;
        }       

        this.schema = wfs.read(doc);
        
        this.featureNS = this.schema.targetNamespace;       
        
        this.generateAttributes();

        if (!this.writer) {
            var options = {};
            if (this.map && !this.projection.equals(this.map.getProjectionObject())) {
                options.externalProjection = this.projection;
                options.internalProjection = this.map.getProjectionObject();
            }

            this.writer = new Mapea.Format.WFS(options,this);
        }
    },
    
    onDescribeFeatureTypeError: function() {
        Mapea.Util.showErrorMessage("Error WFS: No se ha podido conectar con el servidor.");    
    },
    
    /**
     * Method: generateAttributes
     * Get the attributes from the schema.xml
     * and it splits it depending on its type 
     */
    generateAttributes: function() {
        var attributes = this.schema.featureTypes[0].properties;
        for (var i=0,ilen=attributes.length; i<ilen; i++)
        {
            var type = attributes[i].localType;
            
            if ( this.isGeometricType(type) )
            {
                this.options.geometry_column = attributes[i].name;
            }
            else
            {
                this.attributes.push(attributes[i]);
            }
        }       
    },
    
   /**
    * Method: setMap
    *
    * Parameters:
    * map - {<OpenLayers.Map>}
    */
    setMap: function(map) {
         OpenLayers.Layer.WFS.prototype.setMap.apply(this, arguments);
         
         // create the selectFeature control
         this.selectWFSFeature = new Mapea.Control.SelectFeature(Mapea.global.wfsLayer);
         this.map.addControl(this.selectWFSFeature);
    },
    
    /**
     * This method is triggered when the features
     * have been loaded into the map for first time.
     * We do a backup from the original features.
     */
    featuresLoaded: function() {
        //this.featuresBackup = [].concat(this.features);
    },

    isGeometricType: function(type) {
        type = type.toLowerCase();
        return  ( (type == "pointpropertytype") || (type == "polygonpropertytype")
                    || (type == "linestringpropertytype") || (type == "geometrypropertytype" )
                    || (type == "multisurfacepropertytype") || (type == "multilinestringpropertytype")
                    || (type == "surfacepropertytype") || (type == "geometrypropertytype")
                    || (type == "geometryarraypropertytype") || (type == "multigeometrypropertytype")
                    || (type == "multipointpropertytype") || (type == "abstractgeometricaggregatetype")
                    || (type == "pointarraypropertytype") || (type == "curvearraypropertytype")
                    || (type == "solidpropertytype") || (type == "solidarraypropertytype") );
    },

    typeOf: function(attributeName) {
        var type = null;

        for (var i=0,ilen=this.attributes.length; i < ilen; i++)
        {
            var attr = this.attributes[i];
            if ( attr.name == attributeName )
            {
                type = attr.localType;
                break;
            }
        }

        return type;
    },

    addAttributes : function(feature) {
        for (var i=0,ilen=this.attributes.length; i<ilen; i++)
        {
            var attributeName = this.attributes[i].name;
            
            feature.attributes[attributeName] = null;
        }
    },
    
    /**
     * APIMethod: getFullRequestString
     * combine the layer's url with its params and these newParams.
     *
     *    Add the srsName parameter from 'projection' -- this is probably
     *     more eloquently done via a setProjection() method, but this
     *     works for now and always.
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String} Use this as the url instead of the layer's url
     */
    getFullRequestString:function(newParams, altUrl) {
        var projectionCode = this.projection.getCode() || this.map.getProjection();
        this.params.srsName = (projectionCode == "none") ? null : projectionCode;

        return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments);
    },
    
    /**
     * Gets the BBOX parameter from the bounds
     */
    getBBOXParameter : function(bounds) {
        var bboxParameter;
        
        // projection code
        var projectionCode = Mapea.Util.getMapProjection(this.map);
        if (this.projection && this.projection.projCode)
            projectionCode = this.projection.projCode;
        
        // version
        var version110 = this.isVersion110();
        var version200 = this.isVersion200();
        
        if (this.encodeBBOX) {
            bboxParameter = bounds.toBBOX();
            if (version110 || version200) {
                bboxParameter += ("," + projectionCode);
            }
        }
        else {
            bboxParameter = bounds.toArray();
            if (version110 || version200) {
                bboxParameter.push(projectionCode);
            }
        }
        
        return bboxParameter;
    },
    
    /**
     * TODO
     */
    isVersion100 : function() {
        var version100 = false;
        if (this.params && (this.params.version || this.params.VERSION)) {
            version100 = ((this.params.version == "1.0.0") || (this.params.VERSION == "1.0.0"));
        }
        return version100;
    },
    
    /**
     * TODO
     */
    isVersion110 : function() {
        var version110 = false;
        if (this.params && (this.params.version || this.params.VERSION)) {
            version110 = ((this.params.version == "1.1.0") || (this.params.VERSION == "1.1.0"));
        }
        return version110;
    },
    
    /**
     * TODO
     */
    isVersion200 : function(params) {
        var version200 = false;
        if (this.params && (this.params.version || this.params.VERSION)) {
            version200 = ((this.params.version == "2.0.0") || (this.params.VERSION == "2.0.0"));
        }
        return version200;
    },

    CLASS_NAME: "Mapea.Layer.WFS"
});

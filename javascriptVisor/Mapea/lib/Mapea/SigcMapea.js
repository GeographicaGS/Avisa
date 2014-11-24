/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires Mapea/Util.js
 * @requires Mapea/Map.js
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/Events.js
 * @requires OpenLayers/Tween.js
 * @requires OpenLayers/Console.js
 *
 */

/**
 * Class: Mapea.SigcMapea Instances of Mapea.SigcMapea are interactive
 * maps embedded in a web page. Create a new map with the <Mapea.SigcMapea>
 * constructor.
 *
 * To define the different WMC files by default, use the three properties below.
 * You must to specific these files separates by comma <,>:
 * contexto - context name
 * url - service URL
 * title - context title to show in a button
 *
 * Inherits from: - <OpenLayers.Map>
 */
Mapea.SigcMapea = OpenLayers.Class({

 /*****************************************************************************************/
 /**/                                                                                   /**/
 /* /                          WMC FILES PROPERTIES BY DEFAULT                          /* /
 /**/                                                                                   /**/
 /**/  contexto: '${context}'                   /**/
,/**/  url: '${urlContext}'
,/**/  title: '${titleContext}' /**/
,/**/                                                                                   /**/
 /*****************************************************************************************/


    /**
    * Variables for search funcionality
    */
    swCallejero: '${swCallejero}',
    
    geosearchUrl: '${geosearchUrl}',

    strDefinedThemes: '${themes}',

    strDefinedThemesUrl: '${urlThemes}',
    
    geosearchbylocationUrl : '${geosearchbylocation}',
    
    geosearchDistance : '${geosearchDistance}',

    arrayRoadsType: null,

    arrayServicesType: null,

    arrayStreet: null,

    arrayLocality: null,

    arrayLocFromProv: null,

    arrayOu: null,

    arrayServices: null,

    arrayRoads: null,

    arrayBC: null,

    arrayAuto: null,

    layer_style : null,

    style_blue : null,

    style_green : null,

    style_mark : null,

    callejeroProxy: null,

    //vectorlayer : null,

    buttons: new Array(),
    /**
     * Property: noStringAttributes
     */
    noStringAttributes: new Array(),

    /**
     * Property: dateAttributes
     */
    dateAttributes: new Array(),

    /**
     * Property: dateTimeAttributes
     */
    dateTimeAttributes: new Array(),

    /**
     * Property: timeAttributes
     */
    timeAttributes: new Array(),

    /**
     * Property: durationAttributes
     */
    durationAttributes: new Array(),

    /**
     * Property: geomColumn
     */
    geomColumn: null,

    /**
     * Property: geomColumnDef
     */
    geomColumnDef: false,

    /**
     * Property: attributionWfsLayer
     */
    attributionWfsLayer: new Array(),

    /**
     * Property: contextBase
     */
    contextBase: {
        url: null,
        title: null
    },

    /**
     * Property: wfsLayers
     */
    wfsLayers: new Array(),

    /**
     * Property: queryableLayers
     */
    queryableLayers: new Array(),

    /**
     * Property: clearUnsavedOper
     */
    clearUnsavedOper: null,


    /**
     * Property: featureInfoGML
     */
    featureInfoGML: false,

    /**
     * Property: featureInfoAdded
     */
    featureInfoAdded: false,

    /**
     * Property: multipleType
     */
    multipleType: false,

    /**
     * Property: wmsFullArray
     */
    wmsFullArray: new Array(),

    /**
     * Property: listExtentLayers
     */
    listExtentLayers: new Array(),

    /**
     * APIProperty: ticket
     * {String} user session ticket.
     */
    ticket: null,

   /**
    * Property: contextButtonsDiv
    * {DOMElement} element that contains the buttons to change the defined contexts.
    */
    contextButtonsDiv: null,

    /**
    * Property: measureDiv
    * {DOMElement} element that contains the measure information when 'measurebar' control is activated.
    */
    measureDiv: null,

    /**
     * Property: contextUrls
     * {Array(String)} Array with the context urls.
     */
    contextUrls: new Array(),

    /**
     * Property: contextTitles
     * {Array(String)} Array with the context titles.
     */
    contextTitles: new Array(),

    /**
     * Property: strLon
     * {String} Longitude
     */
     strLon: null,

    /**
     * Property: strLat
     * {String} Latitude
     */
     strLat: null,

    /**
     * Property: editAttribute
     * {Mapea.Control.EditAttributeFeature}
     */
     editAttribute: null,

    /**
     * Property: schema
     * {Schema} .
     */
     schema: null,

    /**
     * Property: wfsreq
     * {Mapea.Util.WFSrequest}
     */
     wfsreq: null,

    /**
     * Property: typeN
     * {String}
     */
     typeN: null,
     
     /**
      * Property: featureNS
      * {String}
      */
     featureNS : null,

    /**
     * Property: strFilterfeaturesid
     * {String}
     */
     strFilterfeaturesid: null,

    /**
     * Property: layerAux
     * {String} .
     */
     layerAux: null,

    /**
     * v: featureT
     * {String} .
     */
     featureT: null,

    /**
     * Property: handlerType
     * {Function} .
     */
     handlerType: null,

    /**
     * Property: loadLayerWFST
     * {Boolean} It indicates if the wfs layer is loaded.
     */
     loadLayerWFST: false,

    /**
     * Property: kmlLayers
     * {Array(Mapea.Layer)} .
     */
    kmlLayers: new Array(),

    /**
     * Property: query
     * {Query} .
     */
    query: false,

    /**
     * Property: info
     * {Mapea.Control.GetLayersInfo} .
     */
    info: null,

    /**
     * Property: hasContextLoaded
     * {Boolean} It indicates if the context is loaded.
     */
    hasContextLoaded: false,

    /**
     * Property: hasBaseLayer
     * {Boolean} It indicates if the base layer is loaded.
     */
    hasBaseLayer: false,

    /**
     * APIProperty: map
     * {Mapea.Map} the main map to show.
     */
    map: null,

    /**
     * Property: wmc
     * { } wmc file to load.
     */
    wmc: null,

    /**
     * APIProperty: version
     * {Object} SigcMapea API version.
     */
    version: {
        v: '3.2.0',
        d: '19/03/2014'
    },

    /**
     * Property: sgcmOptionsDefault
     * {Object} SigcMapea defaults options
     */
    sgcmOptionsDefault: {
        projectionDefault: 'EPSG:23030*m',
        wmcfileDefault: ['callejerocacheado'],
        layersDefault: null,
        controlsDefault: ['panzoom'],
        centerDefault: '0,0',
        zoomDefault: '0',
        labelDefault: null,
        bboxDefault: '0,0,0,0',
        getfeautreinfoDefault: null,
        maxExtentDefault: null,
        themeDefault: 'default',
        geosearchbylocationDefault: null,
        proxyHost: Mapea.Util.getProxyLocation()
    },

    /**
     * Property: sgcmOptions
     * {Object} SigcMapea options
     */
    sgcmOptions: {
        projection: null,
        wmcfile: null,
        layers: null,
        controls: null,
        center: null,
        zoom: null,
        label: null,
        bbox: null,
        getfeautreinfo: null,
        maxExtent: null,
        theme: null,
        geosearchbylocation: null,
        proxyHost: null
    },

    /**
     * Property: error
     * {Boolean} It indicates if there are any errors.
     */
    error: false,

    /**
     * Property: sgcmDiv
     * {DOMElement} - The contaniner that the map should be rendered to.
     */
    sgcmDiv: null,

    /**
     * Method: unloadDestroy
     * Function that is called to destroy the map on page unload. stored here
     *     so that if map is manually destroyed, we can unregister this.
     */
    unloadDestroy: null,

    /**
     * Constructor: Mapea.SigcMapea
     * Constructor for a new Mapea.SigcMapea instance.There are many possible
     * ways to call the map constructor. See the examples below.
     *
     * Parameters:
     * div - {DOMElement|String} The container that the map should be rendered to.
     *                           If different than the current container, the map
     *                           viewport will be moved from the current to the new container.
     * projection - {String} Optional parameter. Set in the map options to override the default projection string
     *                       this map. Default is "EPSG:23030".
     * wmcfile - {Array(String)} Optional parameter. The WMC files to use.
     * layers - {Array(String)} Optional parameter. The layers to add to this.map.
     * controls - {Array(String)} Optional parameter. The controls to add to this.map.
     * center - {String} Optional parameter. Coordenada X,Y del punto donde se centrará en mapa. Si se especifica junto
     *                   con el parámetro zoom, se centrará a la coordenada dada al nivel de zoom especificado.
     * zoom - {Integer} Optional parameter. Especifica el nivel de zoom con el que se quiere visualizar el mapa. El máximo es 16.
     * label - {String} Optional parameter. Se usa una cadena de texto que será visualizada como html en un popup
     *                  centrado en las coordenadas especificadas por el parámetro center.
     * bbox - {String} Optional parameter. String representation of bounds object.
     * getfeatureinfo - {String} Optional parameter. Get Obtiene información asociada a cada una de las capas consultables
     *                           de la coordenada especificada. Valores = {plain|gml}
     *
     * Examples:
     * (code)
     * // create a map with default options in an element with the id "map1"
     * var map = new Mapea.SigcMapea("map1");
     *
     * // create a map with a WMC file and two wms layers in an element with the id "map2"
     * var map = new Mapea.SigcMapea({
     *     div: 'map2',
     *     projection: '23030*m',
     *     wmcfile: {'http://url/contextCallejero.xml*Callejero'},
     *     layers: {'WMS*nombre_capa_leyenda_capa1*url_servicio_capa1*nombre_capa_capa1*transparencia_capa1,tileado_capa1',
     *              'WMS*nombre_capa_leyenda_capa2*url_servicio_capa2*nombre_capa_capa2*transparencia_capa2,tileado_capa2'},
     *     controls: {'panzoombar', 'layerswitcher'}
     *     });
     *
     * // create a map with a WMC file, a WMS_FULL layer and a KML layer
        // centrada en una coordenaada y en un determinado nivel in an element
        // with the id "map3"
     * var map = new Mapea.SigcMapea({
     *     div: 'map3'
     *     wmcfile: {'http://url/contextCallejero.xml*Callejero'}
     *     layers: {'WMS_FULL*url_servicio1*tileado','KML*nombre_capa_leyenda_capa1*url_servicio_capa1*nombre_capa_capa1*extraer*atributos_capa1'},
     *     controls: {'navtoolbar','measurebar','mouse'},
     *     center: '2563214,4125421',
     *     zoom: 7
     *     });
     * (end)
     */
    initialize: function(param) {
        window.strDefinedContexts = this.contexto;
        window.strDefinedContextsUrl = this.url;
        window.srtDefinedContextsTile = this.title;
        window.strDefinedThemes = this.strDefinedThemes;
        window.strDefinedThemesUrl = this.strDefinedThemesUrl;

        this.listExtentLayers = new Array();
        this.contextUrls = new Array();
        this.contextTitles = new Array();
        this.sgcmOptions.wmcfile=null;

        // PARAMETERS START
        if(typeof(param) == 'string'){
            this.sgcmDiv = OpenLayers.Util.getElement(param);
            this.sgcmOptions.projection = this.sgcmOptionsDefault.projectionDefault;
            this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
            this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
            this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
            this.sgcmOptions.center = this.sgcmOptionsDefault.centerDefault;
            this.sgcmOptions.zoom = this.sgcmOptionsDefault.zoomDefault;
            this.sgcmOptions.label = this.sgcmOptionsDefault.labelDefault;
            this.sgcmOptions.bbox = this.sgcmOptionsDefault.bboxDefault;
            this.sgcmOptions.getfeautreinfo = this.sgcmOptionsDefault.getfeautreinfoDefault;
            this.sgcmOptions.theme = this.sgcmOptionsDefault.themeDefault;
            Mapea.Util.setThemePaths(this.sgcmOptions.theme); // load themes
            this.sgcmOptions.geosearchbylocation = this.sgcmOptionsDefault.geosearchbylocationDefault;
            this.sgcmOptions.proxyHost = this.sgcmOptionsDefault.proxyHost;
        }
        else {
            if (param.div.nodeType && param.div.nodeType == 1) {
                this.sgcmDiv = param.div;
                if(!this.sgcmDiv.id)
                    this.sgcmDiv.id = OpenLayers.Util.createUniqueID('sigcMapeaDiv_');
            }
            else {
                this.sgcmDiv = OpenLayers.Util.getElement(param.div);
            }

            //check if there is any base layers (its transparent attribute is false)
            var isBaseLayer = false;
            if(param.layers){
                var layerSize = param.layers.length;
                for(var i=0; i<layerSize; i++){
                    var layer = param.layers[i].split('*');
                    if(layer.length == 5 || layer.length == 6){
                        layer[0] = layer[0].toUpperCase();
                        if (layer[0].indexOf('WMS') != -1){
                            if (layer[4] && layer[4].toLowerCase() == 'false'){
                                isBaseLayer = true;
                                break;
                            }
                        }
                    }else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){
                        isBaseLayer = true;
                        break;
                    }
                }
            }

        // THEME =========================================================================
            if (param.theme) {
                if(typeof param.theme != 'string') {
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro theme debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.theme);
                }
                else {
                    this.sgcmOptions.theme = param.theme;
                }
            }
            else {
                this.sgcmOptions.theme = this.sgcmOptionsDefault.themeDefault;
            }
            Mapea.Util.setThemePaths(this.sgcmOptions.theme);
        // PROJECTION =========================================================================
            if(param.projection){
                if(typeof param.projection != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro projection debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.projection);
                else
                    this.sgcmOptions.projection = param.projection;
            }else{
                this.sgcmOptions.projection = this.sgcmOptionsDefault.projectionDefault;
            }
        // WMC FILE =========================================================================
            if(param.wmcfile){
                if(!OpenLayers.Util.isArray(param.wmcfile)){
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro wmcfile debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.wmcfile);
                }else if(OpenLayers.Util.isArray(param.wmcfile) && ((param.wmcfile.length == 0) || (param.wmcfile.length == 1 && param.wmcfile[0] == ''))){
                    if(!param.layers ||!isBaseLayer ){
                        this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
                    }
                }else{
                    this.sgcmOptions.wmcfile = param.wmcfile;
                }
            }else if(!param.layers || !isBaseLayer){
                this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
            }
        // LAYERS =========================================================================
            if(param.layers){
                if(!OpenLayers.Util.isArray(param.layers))
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro layers debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.layers);
                else if(OpenLayers.Util.isArray(param.layers) && ((param.layers.length == 0) || (param.layers.length == 1 && param.layers[0] == '')))
                    this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
                else
                    this.sgcmOptions.layers = param.layers;
            }else{
                //OpenLayers.Control.prototype.initialize.apply(this, arguments);
                this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
            }
        // CONTROLS =========================================================================
            if(param.controls){
                if(!OpenLayers.Util.isArray(param.controls))
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro controls debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.controls);
                else if(OpenLayers.Util.isArray(param.controls) && ((param.controls.length == 0) || (param.controls.length == 1 && param.controls[0] == '')))
                    this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
                else
                    this.sgcmOptions.controls = param.controls;
            }else{
                this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
            }
        // CENTER =========================================================================
            if(param.center){
                if(typeof param.center != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro center debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.center);
                else
                    this.sgcmOptions.center = param.center;
            }else{
                this.sgcmOptions.center = this.sgcmOptionsDefault.centerDefault;
            }
        // ZOOM =========================================================================
            if(param.zoom){
                if(isNaN(param.zoom))
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro zoom debe ser un número válido y se ha introducido el valor: '+ param.zoom);
                else
                    this.sgcmOptions.zoom = param.zoom;
            }else{
                this.sgcmOptions.zoom = this.sgcmOptionsDefault.zoomDefault;
            }
        // LABEL ================================================================================
            if(param.label){
                if(typeof param.label != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro label debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.label);
                else
                    this.sgcmOptions.label = param.label;
            }else{
                this.sgcmOptions.label = this.sgcmOptionsDefault.labelDefault;
            }
        // BBOX ==================================================================================
            if(param.bbox){
                if(typeof param.bbox != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro bbox debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.bbox);
                else
                    this.sgcmOptions.bbox = param.bbox;
            }else{
                this.sgcmOptions.bbox = this.sgcmOptionsDefault.bboxDefault;
            }
        // GETFEATUREINFO =========================================================================
            if(param.getfeatureinfo){
                if(typeof param.getfeatureinfo != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro getfeatureinfo debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.getfeatureinfo);
                else
                    this.sgcmOptions.getfeatureinfo = param.getfeatureinfo;
            }else{
                this.sgcmOptions.getfeatureinfo = this.sgcmOptionsDefault.getfeatureinfoDefault;
            }
        // GEOSEARCHBYLOCATION =========================================================================
            if (param.geosearchbylocation != null) {
                if(typeof param.geosearchbylocation != 'string') {
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro geosearchbylocation debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.geosearchbylocation);
                }
                else {
                    this.sgcmOptions.geosearchbylocation = param.geosearchbylocation;
                }
            }
            else {
                this.sgcmOptions.geosearchbylocation = this.sgcmOptionsDefault.geosearchbylocationDefault;
            }
        // PROXYHOST =========================================================================
            if(param.proxyHost){
                if(typeof param.proxyHost != 'string')
                    Mapea.Util.showErrorMessage('SigcMapea.constructor: El parámetro proxy debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.proxyHost);
                else
                    this.sgcmOptions.proxyHost = param.proxyHost;
            }else{
                this.sgcmOptions.proxyHost = this.sgcmOptionsDefault.proxyHost;
            }
        //=========================================================================================
        }

// PARAMETERS END



// STARTING MAP BUILDER

        OpenLayers.Events.prototype.includeXY = true;
        OpenLayers.ProxyHost = this.sgcmOptions.proxyHost + '?url=';

/** #################################### WMC FILE #########################################################*/
        if (this.sgcmOptions.wmcfile)
        {           
            var projectionParameter = new Mapea.Parameter.Projection(this.sgcmOptions.projection);
            
            // A new context is loaded
            var wmcfileParameter = new Mapea.Parameter.WMCFile(this.sgcmOptions.wmcfile, this.sgcmDiv.id, projectionParameter);
            wmcfileParameter.isJSAPI = true;
            wmcfileParameter.setMap();
            this.map = wmcfileParameter.map;                
                
            this.hasBaseLayer = Mapea.Util.hasBaseLayer;
            this.hasContextLoaded =  Mapea.Util.hasContextLoaded;
            
            if (!this.sgcmOptions.maxExtentDefault)
            {
                var maxExtentLayer = this.map.maxExtent;
                this.listExtentLayers.push(maxExtentLayer);
            }
        }


/**############################################# LAYERS #######################################################*/
        if(this.sgcmOptions.layers && !this.error){
            
            var projectionParameter = new Mapea.Parameter.Projection(this.sgcmOptions.projection);
            
            if(!this.hasContextLoaded)
                //a new map is created              
                this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: projectionParameter.units, maxResolution:'auto', projection: projectionParameter.srs});
            
            //layers are added to map
            var layers = this.sgcmOptions.layers;
            var layerSize = this.sgcmOptions.layers.length;
            for(var i=0; i<layerSize; i++){
                var layer = layers[i].split('*');
                if(layer.length == 5 || layer.length == 6){
                    layer[0] = layer[0].toUpperCase();

                    // WMS
                    if (layer[0].indexOf('WMS') != -1){
                        var strTransparent = false;
                        var strSingleTile = false;
                        if (layer[4]){
                            strTransparent = layer[4].toLowerCase() == 'true';
                        }
                        if (!strTransparent && !this.hasBaseLayer){
                            this.hasBaseLayer = true;
                        }

                        if (layer.length == 6){
                            if (layer[5].toLowerCase() == 'false'){
                                strSingleTile = true;
                            }
                        }

                        var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3], projectionParameter.srs);

                        if(maxExtentLayer != -1){
                        this.listExtentLayers.push(maxExtentLayer);
                        var newLayerOL = new Mapea.Layer.WMS(layer[1],layer[2],{layers: layer[3], transparent: strTransparent},{singleTile: strSingleTile, ratio: 1, queryable: this.query});

                        var QL = {id: newLayerOL.id, tagname: layer[1], url: layer[2], name: layer[3], transparent: strTransparent, tile: strSingleTile, srs: projectionParameter.srs};
                        this.queryableLayers.push(QL);

                        this.map.addLayer(newLayerOL, true);
                        }
                    // KML
                    }else if (layer[0].indexOf("KML") != -1){
                        var extractAttributes = false;

                        if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
                            extractAttributes = (layer[4].toLowerCase() == 'true');
                        }

                        var kmlLegendName = layer[1];
                        var kmlUrl = layer[2] + layer[3] + '&mapeaop=kml';

                        var newLayerOL = new Mapea.Layer.GML(kmlLegendName, kmlUrl, {format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}, ratio: 2});
                        this.map.addLayer(newLayerOL, true);

                        if (extractAttributes){
                            newLayerOL.events.register('featureselected', this, onFeatureSelect);
                            newLayerOL.events.register('featureunselected', this, onFeatureUnselect);
                            this.kmlLayers.push(newLayerOL);
                        }

                    // WFS
                    }else if (layer[0].indexOf('WFST') != -1){


                         //In a called to the mapea only can defined a wfst layer for editing.
                        layer[4] = layer[4].toUpperCase();
                        if (layer[4] == "POINT"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Point;
                            this.multipleType = false;
                        }else if (layer[4] == "LINE"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Path;
                            this.multipleType = false;
                        }else if (layer[4] == "POLYGON"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Polygon;
                            this.multipleType = false;
                        }else if (layer[4] == "MPOINT"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Point;
                            this.multipleType = true;
                        }else if (layer[4] == "MPOLYGON"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Polygon;
                            this.multipleType = true;
                        }else if (layer[4] == "MLINE"){
                            this.loadLayerWFST = true;
                            this.handlerType = OpenLayers.Handler.Path;
                            this.multipleType = true;
                        }else{
                            Mapea.Util.showErrorMessage('Error: El tipo de capa WFS no se reconoce. Los tipos disponibles son: POINT, LINE, POLYGON.');
                            this.error = true;
                        }
                        this.featureT = layer[4];
                        if(layer.length >= 6){
                            this.layerAux = layer[3].substring(layer[3].indexOf(':')+1);
                            var FeaturesidNames = layer[5].split('-');
                            this.strFilterfeaturesid = ',featureid: ' + this.layerAux + "." + FeaturesidNames[0];
                            for (var index = 1; index < FeaturesidNames.length; index++){
                                this.strFilterfeaturesid = this.strFilterfeaturesid + ',' + this.layerAux + '.' + FeaturesidNames[index];
                            }
                            this.strFilterfeaturesid = this.strFilterfeaturesid+"'";

                        }
                        else{
                            this.strFilterfeaturesid = '';
                        }

                        //typeName can not contain Namespace id.
                        var begin = layer[3].indexOf(':');
                        if (begin != -1) {
                            this.typeN = layer[3].substring(begin + 1);
                            this.featureNS = layer[3].substring(0, begin);
                        }
                        else {
                             this.typeN = layer[3];
                        }
                        
                        if (this.loadLayerWFST){
                            this.wfsreq = new Mapea.Util.WFSrequest(layer[2],layer[3]);
                            this.wfsreq.requestLayers();
                            this.schema = this.wfsreq.getSchema();
            /**************************************************************************************/
                            this.attributionWfsLayer = new Array();
                            var noStringAttributes = new Array();
                            this.dateAttributes = new Array();
                            this.dateTimeAttributes = new Array();
                            this.timeAttributes = new Array();
                            this.durationAttributes = new Array();
                            var type = null;
                            this.geomColumnDef = false;
                            // Insert into the vector the names of feature's attributes
                            for(i=0;i<this.schema.featureTypes[0].properties.length;i++){
                                type = this.schema.featureTypes[0].properties[i].localType;
                                if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType"){
                                    this.attributionWfsLayer.push(this.schema.featureTypes[0].properties[i].name);
                                    if(type == "dateTime"){
                                        this.dateTimeAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                    }
                                    else if(type == "date"){
                                        this.dateAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                    }
                                    else if(type == "time"){
                                        this.timeAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                    }
                                    else if(type == "duration"){
                                        this.durationAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                    }
                                }
                                else{
                                    //Save the name of geometry column
                                    this.geomColumnDef = true;
                                    this.geomColumn = this.schema.featureTypes[0].properties[i].name;
                                }
                                //Check if the attribute's type is integer.
                                if(this.schema.featureTypes[0].properties[i].localType == "int" || this.schema.featureTypes[0].properties[i].localType == "float" || this.schema.featureTypes[0].properties[i].localType == "double" || this.schema.featureTypes[0].properties[i].localType == "decimal"
                                    || this.schema.featureTypes[0].properties[i].localType == "short" || this.schema.featureTypes[0].properties[i].localType == "byte" || this.schema.featureTypes[0].properties[i].localType == "integer" || this.schema.featureTypes[0].properties[i].localType == "long"
                                    || this.schema.featureTypes[0].properties[i].localType == "negativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonNegativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonPositiveInteger" || this.schema.featureTypes[0].properties[i].localType == "positiveInteger"
                                    || this.schema.featureTypes[0].properties[i].localType == "unsignedLong" || this.schema.featureTypes[0].properties[i].localType == "unsignedInt" || this.schema.featureTypes[0].properties[i].localType == "unsignedShort" || this.schema.featureTypes[0].properties[i].localType == "unsignedByte"){
                                    this.noStringAttributes.push(this.schema.featureTypes[0].properties[i].name)
                                }
                            }
            /*************************************************************************************/
                            var maxExtentLayer = getBoundingBoxFromCapabilitiesWFS(layer[2],layer[3], projectionParameter.srs);
                            if( maxExtentLayer != -1){
                                this.listExtentLayers.push(maxExtentLayer);
                            }

                            Mapea.global.wfsLayer = new Mapea.Layer.WFS(layer[1],layer[2], 
                                        {typename: this.typeN + this.strFilterfeaturesid, handlerType: this.handlerType, multipleType: this.multipleType},
                                        {typename: this.typeN, extractAttributes: true, namespace: this.featureNS});
                            
                            if(maxExtentLayer != -1){
                                this.map.addLayer(Mapea.global.wfsLayer, true);
                            }
                        }
                    }else{
                        Mapea.Util.showErrorMessage('Error: El tipo de layer ('+ layers[0] + ') no está soportado. Consulte los servicios disponibles con action=getServicesAvailable.');
                        this.error = true;
                    }

                }
                // format: WMS_FULL-urlService-singletile(optional)
                else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){
                    this.hasBaseLayer = true;
                    var strSingleTile = 'false';
                    if (layer.length == 3){
                        if (layer[2] == 'false'){
                            strSingleTile = 'true';
                        }
                    }

                    var wmsFull = new Mapea.Util.WMSfull(this.map, layer[1] + '&mapeaop=wmsfull');
                    wmsFull.setOptions({singleTile: strSingleTile});
                    var maxExtentLayer = wmsFull.getBoundingBoxEnvolved(layer[1], projectionParameter.srs);
                    if( maxExtentLayer != -1){
                    this.listExtentLayers.push(maxExtentLayer);
                    wmsFull.addServiceToMap();
                    this.wmsFullArray.push(wmsFull);}
                }
                // new format Mapea 3.2.0. Dynamic KML
                else if ((layer.length == 4) && layer[0].contains("KML")) {
                    var extractAttributes = false;

                    if (layer[3].toLowerCase() == 'true' || layer[3].toLowerCase() == 'false'){
                        extractAttributes = (layer[3].toLowerCase() == 'true');
                    }

                    var kmlLegendName = layer[1];
                    var kmlUrl = layer[2] + '&mapeaop=kml';

                    var newLayerOL = new Mapea.Layer.GML(kmlLegendName, kmlUrl, {format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}, ratio: 2});
                    this.map.addLayer(newLayerOL, true);

                    if (extractAttributes){
                        newLayerOL.events.register('featureselected', this, onFeatureSelect);
                        newLayerOL.events.register('featureunselected', this, onFeatureUnselect);
                        this.kmlLayers.push(newLayerOL);
                    }
                }
                else {
                    Mapea.Util.showErrorMessage('Error: El formato del layer (' + layers[i] + ') no se reconoce.');
                    this.error = true;
                }
            }
        }
/**-----------------------------------------------------------------------------------------------------------*/
        var maxExtentEnvolved=getMaxExtentEnvolved(this.listExtentLayers);
        this.map.baseLayer.maxExtent = maxExtentEnvolved;
        this.map.setOptions({maxExtent: maxExtentEnvolved});
        this.map.setOptions({restrictedExtent: maxExtentEnvolved});

        // Reset layers resolutions
        for (i=0;i<this.map.getNumLayers();i++){
            var layer = this.map.layers[i];
//          if(!layer.isBaseLayer){
                layer.projection = this.map.baseLayer.projection;
                layer.maxExtent = this.map.baseLayer.maxExtent;
                layer.units = this.map.baseLayer.units;
//          }
            layer.initResolutions();
        }
/**-----------------------------------------------------------------------------------------------------------*/

        //KML select feature
        this.map.uniqueSelectFeatureCtrl.addLayers(this.kmlLayers);

/**############################################# CONTROLS ####################################################*/
        if(this.sgcmOptions.controls && !this.error){
            var controlsParameter = new Mapea.Parameter.Controls(this.sgcmOptions.controls);
            controlsParameter.isJSAPI = true; //TODO remove
            this.map.addParameter(controlsParameter);
            
            if(this.hasBaseLayer)
                this.map.zoomToMaxExtent();
        }

/**######################################## GETFEATUREINFO #############################################*/
        if(this.sgcmOptions.getfeatureinfo){
            this.addGetfeatureinfo(this.sgcmOptions.getfeatureinfo);
        }
        
        this.map.geosearchUrl = "${geosearchUrl}";
        Mapea.Util.resizeAllPanels(this.map);

/**############################################# CENTER, LABEL, ZOOM ##############################################*/
        if (!this.error) {
            if (this.sgcmOptions.center && (this.sgcmOptions.center != this.sgcmOptionsDefault.centerDefault))
            {
                var strCoords;
                var drawPin = false;
                
                var coordsPin = this.sgcmOptions.center.split('*');
                if (coordsPin.length == 2)
                {
                    strCoords = coordsPin[0];
                    drawPin = (OpenLayers.String.trim(coordsPin[1].toLowerCase()) == "true");
                }
                else if (coordsPin.length == 1)
                {
                    strCoords = coordsPin[0];
                }
                else
                {
                    strCoords = "";
                    Mapea.Util.showErrorMessage('El formato del parámetro <b><i>center</i></b> es erróneo');
                }
                
                var latLon = strCoords.split(",");
                
                if (latLon.length == 2){
                    this.strLon = latLon[0];
                    this.strLat = latLon[1];
                    
                    var centerLabel = (this.sgcmOptions.label)? (this.sgcmOptions.label) : null;
                    var centerZoom = ((this.sgcmOptions.zoom != null) && (this.sgcmOptions.zoom != this.sgcmOptionsDefault.zoomDefault))? this.sgcmOptions.zoom : null;
                    this.map.drawCenter(this.strLon, this.strLat, centerZoom, centerLabel, drawPin);                    
                }
                else
                {
                    Mapea.Util.showErrorMessage('El formato del parámetro <b><i>center</i></b> es erróneo');
                }
            }
            else
            {
                if (this.sgcmOptions.label)
                {
                    this.addLabel(this.sgcmOptions.label);
                }
                
                if ((this.sgcmOptions.zoom != null) && (this.sgcmOptions.zoom != this.sgcmOptionsDefault.zoomDefault))
                {
                    this.map.zoomTo(this.sgcmOptions.zoom);
                }
            }
        }
        

/**############################################# BBOX #################################################*/
        if(this.sgcmOptions.bbox != this.sgcmOptionsDefault.bboxDefault){
            var bounding = this.sgcmOptions.bbox.split(",");
            if (bounding.length == 4 ){
                var minX = bounding[0];
                var minY = bounding[1];
                var maxX = bounding[2];
                var maxY = bounding[3];

                this.map.zoomToExtent(new OpenLayers.Bounds(minX, minY, maxX, maxY));
            }
        }

/**############################################# THEME ##############################################*/
        if (this.sgcmOptions.theme) {
            this.setTheme(this.sgcmOptions.theme);
        }
        
/**###################################### GEOSEARCHBYLOCATION #########################################*/
        if (this.sgcmOptions.geosearchbylocation != null) {
            var geosearchUrlDistance = this.sgcmOptions.geosearchbylocation.split("*");
            this.addGeosearchByLocation(geosearchUrlDistance[0], geosearchUrlDistance[1]);
        }
    },

// MAP BUILDER END

    /********************************************************/
    /*                                                      */
    /*                 Adding Functions                     */
    /*                                                      */
    /*    The following functions, all publicly exposed     */
    /*     in the API, allow us to add some properties      */
    /*                                                      */
    /*                                                      */
    /********************************************************/

   /**
    * Method: addControls
    * Parameters:
    * controls - {Array(String)}
    */
    addControls: function(controls){
        if(!controls || controls == ''){
            Mapea.Util.showErrorMessage('SigcMapea.addControls: Debe introducir un control.');
            return;
        }
        if(!OpenLayers.Util.isArray(controls)){
            Mapea.Util.showErrorMessage('SigcMapea.addControls: El parámetro controls debe ser un Array de String.');
            return;
        }
        
        var controlsParameter = new Mapea.Parameter.Controls(controls);
        controlsParameter.isJSAPI = true; //TODO remove
        this.map.addParameter(controlsParameter);
            
        // Label
        if(!(this.sgcmOptions.label == null)){
            var lonlat = this.sgcmOptions.center.split(',');
            this.strLon = lonlat[0];
            this.strLat = lonlat[1];
            var popup = new Mapea.Popup.FramedCloud('popup_feature',new OpenLayers.LonLat(lonlat[0],lonlat[1]),new OpenLayers.Size(100,50),this.sgcmOptions.label,null, true);
            this.map.addPopup(popup);
        }
    },

    /**
     * Method: addLayers
     *
     */
    addLayers: function(layers){
        if(!layers || layers == ''){
            Mapea.Util.showErrorMessage('SigcMapea.addLayers: Debe introducir, al menos, una capa.');
            return;
        }
        if(!OpenLayers.Util.isArray(layers)){
            Mapea.Util.showErrorMessage('SigcMapea.addLayers: El parámetro layers debe ser un Array de String.');
            return;
        }
        
        var projectionParameter = new Mapea.Parameter.Projection(this.sgcmOptions.projection);
        
        var srs = projectionParameter.srs;
        if(!this.hasBaseLayer){
            //A new map is created.
            if( projUn.length == 2 )
                this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: projUn[1].toLowerCase(), maxResolution:'auto', projection: projUn[0]});
            else
                this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: 'UNDEFINED', maxResolution:'auto', projection: 'UNDEFINED'});
        }
        var layerSize = layers.length;
        for(var i=0; i<layerSize; i++){
            var layer = layers[i].split('*');
            if(layer.length == 5 || layer.length == 6){ //Layer is extern typeLayer-legendname-urlLayer-nameLayer-baselayer-singletile
                layer[0] = layer[0].toUpperCase();
                if (layer[0].indexOf('WMS') != -1){
                    var strTransparent = false;
                    var strSingleTile = false;
                    if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
                        strTransparent = layer[4].toLowerCase() == 'true';
                    }
                    if (!strTransparent){
                        if (!this.hasBaseLayer){
                            this.hasBaseLayer = true;
                        }
                    }

                    if (layer.length == 6){
                        if (layer[5].toLowerCase() == 'false'){
                            strSingleTile = true;
                        }
                    }

                    var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3],srs);
                    if(maxExtentLayer != -1){
                    this.listExtentLayers.push(maxExtentLayer);
                    var newLayerOL = new Mapea.Layer.WMS(layer[1],layer[2],{layers: layer[3], transparent: strTransparent},{singleTile: strSingleTile, ratio: 1, queryable: this.query});

                    var QL = {id: newLayerOL.id, tagname: layer[1], url: layer[2], name: layer[3], transparent: strTransparent, tile: strSingleTile, srs: srs};
                    this.queryableLayers.push(QL);

                    this.map.addLayer(newLayerOL, true);
                    }
                }else if (layer[0].indexOf('KML') != -1){
                    var extractAttributes = false;

                    if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
                        extractAttributes = (layer[4].toLowerCase() == 'true');
                    }

                    var kmlLegendName = layer[1];
                    var kmlUrl = layer[2] + layer[3] + '&mapeaop=kml';
                    var newLayerOL = new Mapea.Layer.GML(kmlLegendName, kmlUrl, {format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}, ratio: 2});
                    this.map.addLayer(newLayerOL, true);

                    if (extractAttributes) {
                        //Feature info activate.
                        newLayerOL.events.register('featureselected', this, onFeatureSelect);
                        newLayerOL.events.register('featureunselected', this, onFeatureUnselect);
                        this.kmlLayers.push(newLayerOL);
                    }
                }else if (layer[0].indexOf('WFST') != -1){
                     //In a called to the mapea only can defined a wfst layer for editing.
                    layer[4] = layer[4].toUpperCase();

                    if (layer[4] == "POINT"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Point;
                        this.multipleType = false;
                    }else if (layer[4] == "LINE"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Path;
                        this.multipleType = false;
                    }else if (layer[4] == "POLYGON"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Polygon;
                        this.multipleType = false;
                    }else if (layer[4] == "MPOINT"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Point;
                        this.multipleType = true;
                    }else if (layer[4] == "MPOLYGON"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Polygon;
                        this.multipleType = true;
                    }else if (layer[4] == "MLINE"){
                        this.loadLayerWFST = true;
                        this.handlerType = OpenLayers.Handler.Path;
                        this.multipleType = true;
                    }else{
                        Mapea.Util.showErrorMessage('Error: El tipo de capa WFS no se reconoce. Los tipos disponibles son: POINT, LINE, POLYGON.');
                        this.error = true;
                    }
                    this.featureT = layer[4];
                    if(layer.length >= 6){
                        this.layerAux = layer[3].substring(layer[3].indexOf(':')+1);
                        var FeaturesidNames = layer[5].split('-');
                        this.strFilterfeaturesid = ',featureid: ' + this.layerAux + "." + FeaturesidNames[0];
                        for (var index = 1; index < FeaturesidNames.length; index++){
                            this.strFilterfeaturesid = this.strFilterfeaturesid + ',' + this.layerAux + '.' + FeaturesidNames[index];
                        }
                        this.strFilterfeaturesid = this.strFilterfeaturesid+"'";

                    }
                    else{
                        this.strFilterfeaturesid = '';
                    }

                    //typeName can not contain Namespace id.
                    var begin = layer[3].indexOf(':');
                    if (begin != -1) {
                        this.typeN = layer[3].substring(begin + 1);
                        this.featureNS = layer[3].substring(0, begin);
                     }
                     else {
                         this.typeN = layer[3];
                     }
                    
                    if (this.loadLayerWFST){
                        this.wfsreq = new Mapea.Util.WFSrequest(layer[2],layer[3]);
                        this.wfsreq.requestLayers();
                        this.schema = this.wfsreq.getSchema();
        /**************************************************************************************/
                        this.attributionWfsLayer = new Array();
                        var noStringAttributes = new Array();
                        this.dateAttributes = new Array();
                        this.dateTimeAttributes = new Array();
                        this.timeAttributes = new Array();
                        this.durationAttributes = new Array();
                        var type = null;
                        this.geomColumnDef = false;
                        // Insert into the vector the names of feature's attributes
                        for(i=0;i<this.schema.featureTypes[0].properties.length;i++){
                            type = this.schema.featureTypes[0].properties[i].localType;
                            if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType"){
                                this.attributionWfsLayer.push(this.schema.featureTypes[0].properties[i].name);
                                if(type == "dateTime"){
                                    this.dateTimeAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                }
                                else if(type == "date"){
                                    this.dateAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                }
                                else if(type == "time"){
                                    this.timeAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                }
                                else if(type == "duration"){
                                    this.durationAttributes.push(this.schema.featureTypes[0].properties[i].name);
                                }
                            }
                            else{
                                //Save the name of geometry column
                                this.geomColumnDef = true;
                                this.geomColumn = this.schema.featureTypes[0].properties[i].name;
                            }
                            //Check if the attribute's type is integer.
                            if(this.schema.featureTypes[0].properties[i].localType == "int" || this.schema.featureTypes[0].properties[i].localType == "float" || this.schema.featureTypes[0].properties[i].localType == "double" || this.schema.featureTypes[0].properties[i].localType == "decimal"
                                || this.schema.featureTypes[0].properties[i].localType == "short" || this.schema.featureTypes[0].properties[i].localType == "byte" || this.schema.featureTypes[0].properties[i].localType == "integer" || this.schema.featureTypes[0].properties[i].localType == "long"
                                || this.schema.featureTypes[0].properties[i].localType == "negativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonNegativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonPositiveInteger" || this.schema.featureTypes[0].properties[i].localType == "positiveInteger"
                                || this.schema.featureTypes[0].properties[i].localType == "unsignedLong" || this.schema.featureTypes[0].properties[i].localType == "unsignedInt" || this.schema.featureTypes[0].properties[i].localType == "unsignedShort" || this.schema.featureTypes[0].properties[i].localType == "unsignedByte"){
                                this.noStringAttributes.push(this.schema.featureTypes[0].properties[i].name)
                            }
                        }
        /*************************************************************************************/
                            var maxExtentLayer = getBoundingBoxFromCapabilitiesWFS(layer[2],layer[3],srs);
                            if (maxExtentLayer != -1) {
                                this.listExtentLayers.push(maxExtentLayer);
                            }
                            
                        Mapea.global.wfsLayer = new Mapea.Layer.WFS(layer[1],layer[2], 
                            {typename: this.typeN + this.strFilterfeaturesid, handlerType: this.handlerType, multipleType: this.multipleType},
                            {typename: this.typeN, extractAttributes: true, namespace: this.featureNS});

                        if (maxExtentLayer != -1) {
                            this.map.addLayer(Mapea.global.wfsLayer, true);
                        }
                    }
                }else{
                    Mapea.Util.showErrorMessage('Error: El tipo de layer ('+ layers[0] + ') no está soportado. Consulte los servicios disponibles con action=getServicesAvailable.');
                    this.error = true;
                }

            }else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){ //Format: WMS_FULL-urlService-singletile(optional)
                this.hasBaseLayer = true;
                var strSingleTile = 'false';
                if (layer.length == 3){
                    if (layer[2] == 'false'){
                        strSingleTile = 'true';
                    }
                }

                var wmsFull = new Mapea.Util.WMSfull(this.map, layer[1] + '&mapeaop=wmsfull');
                wmsFull.setOptions({singleTile: strSingleTile});
                var maxExtentLayer = wmsFull.getBoundingBoxEnvolved(layer[1],srs);
                if( maxExtentLayer != -1){
                this.listExtentLayers.push(maxExtentLayer);
                wmsFull.addServiceToMap();
                this.wmsFullArray.push(wmsFull);}
            }
            // new format Mapea 3.2.0. Dynamic KML
            else if ((layer.length == 4) && layer[0].contains("KML")) {
               var extractAttributes = false;

                if (layer[3].toLowerCase() == 'true' || layer[3].toLowerCase() == 'false'){
                    extractAttributes = (layer[3].toLowerCase() == 'true');
                }

                var kmlLegendName = layer[1];
                var kmlUrl = layer[2] + '&mapeaop=kml';
                var newLayerOL = new Mapea.Layer.GML(kmlLegendName, kmlUrl, {format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}, ratio: 2});
                this.map.addLayer(newLayerOL, true);

                if (extractAttributes) {
                    //Feature info activate.
                    newLayerOL.events.register('featureselected', this, onFeatureSelect);
                    newLayerOL.events.register('featureunselected', this, onFeatureUnselect);
                    this.kmlLayers.push(newLayerOL);
                }
            }
            else {
                Mapea.Util.showErrorMessage('Error: El formato del layer (' + layers[i] + ') no se reconoce.');
                this.error = true;
            }
        }

/**-----------------------------------------------------------------------------------------------------------*/
        var extentAnt = this.map.getExtent();
        var maxExtentEnvolved=getMaxExtentEnvolved(this.listExtentLayers);
        this.map.baseLayer.maxExtent = maxExtentEnvolved;
        this.map.setOptions({maxExtent: maxExtentEnvolved});
        this.map.setOptions({restrictedExtent: maxExtentEnvolved});

        // Reset layers resolutions
        for (i=0;i<this.map.getNumLayers();i++){
            var layer = this.map.layers[i];
//          if(!layer.isBaseLayer){
                layer.projection = this.map.baseLayer.projection;
                layer.maxExtent = this.map.baseLayer.maxExtent;
                layer.units = this.map.baseLayer.units;
//          }
            layer.initResolutions();
        }


            /**MJMJ_20120328 error en el zoom tras ayadir capas
            this.map.fractionalZoom = true;*/
            this.map.zoomToExtent(extentAnt);
            //this.map.fractionalZoom = false;


/**-----------------------------------------------------------------------------------------------------------*/
        //KML select feature
        this.map.uniqueSelectFeatureCtrl.addLayers(this.kmlLayers);
    },

    /**
     *
     * Method: addWmcfiles
     */
     addWmcfiles: function(wmcfiles){
        if(!wmcfiles || wmcfiles == ''){
            Mapea.Util.showErrorMessage('SigcMapea.addWmcfiles: Debe introducir, al menos, un archivo WMC.');
            return;
        }
        if(!OpenLayers.Util.isArray(wmcfiles)){
            Mapea.Util.showErrorMessage('SigcMapea.addWmcfiles: El parámetro wmcfiles debe ser un Array de String.');
            return;
        }
        
        var projectionParameter = new Mapea.Parameter.Projection(this.sgcmOptions.projection);
        
        // A new context is loaded
        var wmcfileParameter = new Mapea.Parameter.WMCFile(wmcfiles, this.sgcmDiv.id, projectionParameter);
        wmcfileParameter.isJSAPI = true;
        wmcfileParameter.buildInitialContext = true;
        this.map.addParameter(wmcfileParameter);
    },

    /**
     *
     * Method: addLabel
     */
    addLabel: function(text){
        if(!text || text == ''){
            Mapea.Util.showErrorMessage('SigcMapea.addLabel: Debe introducir el texto a mostrar.');
            return;
        }
        this.sgcmOptions.label = text;
        var lonlat = new Array();
        if(this.sgcmOptions.center != this.sgcmOptionsDefault.centerDefault){
            lonlat = this.sgcmOptions.center.split(',');
            this.strLon = lonlat[0];
            this.strLat = lonlat[1];
        }
        else{
            lonlat = this.map.getCenter();
            this.strLon = lonlat.lon;
            this.strLat = lonlat.lat;
        }
        var popup = new Mapea.Popup.FramedCloud('popup_feature',new OpenLayers.LonLat(this.strLon,this.strLat),new OpenLayers.Size(100,50),text,null, true);
        this.map.addPopup(popup);
    },
    
    /**
     * Method: addGeosearchByLocation
     * 
     * Parameters:
     * url - {String}
     * distance - {Number}
     */
     addGeosearchByLocation: function(url, distance) {
         // gets the url
         var geosearchUrl = url || this.geosearchbylocationUrl;
         geosearchUrl = OpenLayers.String.trim(geosearchUrl);
         
         // gets the distance
         var geoDistance = distance || this.geosearchDistance;
         try {
             geoDistance = parseFloat(geoDistance);
             if (Number.isNaN(geoDistance)) {
                 Mapea.Util.showErrorMessage("El valor del parámetro distancia '" + distance + "' no es un número válido.");
                 return false;
             }
         }
         catch(err) {
             Mapea.Util.showErrorMessage("El valor del parámetro distancia '" + distance + "' no es un número válido.");
             return false;
         }

         // creates and adds the control to the map
         var geosearchLocationCtrl = new Mapea.Control.GeosearchByLocation(geosearchUrl, {
             distance: geoDistance
         });
         this.map.addControl(geosearchLocationCtrl);
     },

    /**
     *
     * Method: getOlmap
     */
    getOlmap: function(){
        return this.map;
    },

    /**
     *
     * Method: getVersion
     */
    getVersion: function(){
        return this.version;
    },



      /********************************************************/
      /*                                                      */
      /*                  Setting Functions                   */
      /*                                                      */
      /*    The following functions, all publicly exposed     */
      /*    in the API, allow us to set some properties       */
      /*                                                      */
      /********************************************************/

    /**
     *
     * Method: setBbox
     */
    setBbox: function(xmin,ymin,xmax,ymax){
        if(!xmin || !ymin || !xmax || !ymax){
            Mapea.Util.showErrorMessage('SigcMapea.setBbox: se deben de especificar xmin, ymin, xmax e ymax para modificar el bbox del mapa');
        }else{
            this.sgcmOptions.bbox = xmin+','+ymin+','+xmax+','+ymax;
            this.map.zoomToExtent(new OpenLayers.Bounds(xmin,ymin,xmax,ymax));
        }
    },

    /**
     *
     * Method: setCenter
     */
    setCenter: function(x, y, zoom, drawPin){
        if(!x || !y){
            Mapea.Util.showErrorMessage('SigcMapea.setCenter: se deben de especificar x e y para modificar el centro del mapa');
            return;
        }else if(isNaN(x) || isNaN(y)){
            Mapea.Util.showErrorMessage('SigcMapea.setCenter: x e y deben ser coordenadas.');
            return;
        }
        this.sgcmOptions.center = x + ',' + y;
        this.strLon = x;
        this.strLat = y;
        this.sgcmOptions.zoom = zoom;
        
        var latLon = this.sgcmOptions.center.split(",");
        
        if (latLon.length == 2){
            this.strLon = latLon[0];
            this.strLat = latLon[1];
            
            var centerLabel = (this.sgcmOptions.label)? (this.sgcmOptions.label) : null;
            var centerZoom = (this.sgcmOptions.zoom && (this.sgcmOptions.zoom != this.sgcmOptionsDefault.zoomDefault))? this.sgcmOptions.zoom : null;
            this.map.drawCenter(this.strLon, this.strLat, centerZoom, centerLabel, drawPin);                    
        }
    },

    /**
     *
     * Method: setTicket
     */
    setTicket: function(ticket){
        this.ticket = ticket;
        OpenLayers.ProxyHost = this.sgcmOptions.proxyHost + '?ticket='+this.ticket+'&url=';
    },

    /**
     *
     * Method: addGetfeatureinfo
     */
    addGetfeatureinfo: function(format){
        /**if(activate){*/
            if(!format || (format.indexOf('plain') != -1)){
                if(this.map.getControlsBy('id','infoPanelId').length>0){
                    var ctrlLayerInfo = this.map.getControlsBy('id','infoPanelId')[0];
                    ctrlLayerInfo.deactivate();
                    this.map.removeControl(ctrlLayerInfo);
                    this.info = new Mapea.Control.GetLayersInfo('text/plain',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }else{
                    this.info = new Mapea.Control.GetLayersInfo('text/plain',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }
            }else if(format && (format.indexOf('gml') != -1)){
                if(this.map.getControlsBy('id','infoPanelId').length>0){
                    var ctrlLayerInfo = this.map.getControlsBy('id','infoPanelId')[0];
                    ctrlLayerInfo.deactivate();
                    this.map.removeControl(ctrlLayerInfo);
                    this.info = new Mapea.Control.GetLayersInfo('application/vnd.ogc.gml',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }else{
                    this.info = new Mapea.Control.GetLayersInfo('application/vnd.ogc.gml',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }
            } else if(format && (format.indexOf('html') != -1)){
                if(this.map.getControlsBy('id','infoPanelId').length>0){
                    var ctrlLayerInfo = this.map.getControlsBy('id','infoPanelId')[0];
                    ctrlLayerInfo.deactivate();
                    this.map.removeControl(ctrlLayerInfo);
                    this.info = new Mapea.Control.GetLayersInfo('text/html',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }else{
                    this.info = new Mapea.Control.GetLayersInfo('text/html',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
                    createInfoPanel_sigc(this.info,this.map,this.featureInfoGML);
                    checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers);
                    this.featureInfoAdded = true;
                }
            } else if(format){
                Mapea.Util.showErrorMessage('El formato solicitado para la información no está disponible. Inténtelo utilizando gml, plain o html.');
            }
    },

    /**
     *
     * Method: setZoom
     */
    setZoom: function(zoomlevel){
        if(zoomlevel == null){
            Mapea.Util.showErrorMessage('SigcMapea.setZoom: Debe especificar el nivel de zoom.');
            return;
        }else if(isNaN(zoomlevel)){
            Mapea.Util.showErrorMessage('SigcMapea.setZoom: Debe especificar un nivel de zoom válido.');
            return;
        }
        this.sgcmOptions.zoom = zoomlevel;
        this.map.zoomTo(zoomlevel);
    },

    /**
     *
     * Method: addEventHandler
     */
    addEventHandler: function(type,callback_function){
        if(!type){
            Mapea.Util.showErrorMessage('SigcMapea.addEventHandler: Debe especificar el tipo de evento a añadir sobre el mapa.');
            return;
        }else if(!callback_function){
            Mapea.Util.showErrorMessage('SigcMapea.addEventHandler: Debe especificar la función de llamada que realizará el evento.');
            return;
        }else if(typeof callback_function != 'function'){
            Mapea.Util.showErrorMessage('SigcMapea.addEventHandler: La función introducida no es una función.');
            return;
        }
        this.map.events.register(type, this.map, callback_function);
    },


    /**
     *
     * Method: getRoadType
     */

     getRoadType: function(callback){

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayRoadsType = null;
        obtenerTiposViaSigc(callback);

     },

    /**
     *
     * Method: getLocalityFromProv
     */
     getLocalityFromProv: function(codProv, callback){
        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayLocFromProv = null;
        obtenerMunicipiosSigc(codProv, callback);
     },


    /**
     *
     * Method: getServiceType
     */

     getServiceType: function(callback){
        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayServicesType = null;
        obtenerTiposServiciosSigc(callback);

      },

    /**
     *
     * Method: searchStreet
     */

     searchStreet: function(type,name,number,locality, callback, projection){

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayStreet = null;
        obtenerDireccionesSigc(name, number, type, locality, callback, projection);
      },


     /**
     *
     * Method: searchStreetLocProv
     */

     searchStreetLocProv: function(type, name, number, localityName, province, callback, projection) {

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayStreet = null;
        obtenerDireccionesMunProvSigc(name, number, type, localityName, province, callback, projection);
     },


     /**
     *
     * Method: searchService
     */

     searchService: function(codINE, cadena, codProv, callback, projection){

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayServices = null;
        localizarServiciosSigc(codINE, cadena, codProv, callback, projection);

     },

     /**
     *
     * Method: searchOrganizationalUnit
     */

     searchOrganizationalUnit: function(codINE,cadena,codProv, callback, projection){

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayOu = null;
        localizarSedesSigc(codINE,cadena,codProv, callback, projection);

     },


     /**
     *
     * Method: searchLocality
     */

     searchLocality: function(name, callback, projection) {

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayLocality = null;
        localizarNucleosSigc(name, callback, projection);

     },

     /**
     *
     * Method: searchRoad
     */
     searchRoad: function(cadena,pk,callback, projection){

        callejeroProxy = new IMPL_CallejeroService();
        callejeroProxy.synchronous = !callback;
        callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
        this.arrayRoads = null;
        localizarCarreterasSigc(cadena,pk, callback, projection);

     },

     /**
      * Method: buscarCallejero
      */
     buscarCallejero: function(cadena, callback, locality, projection){

            callejeroProxy = new IMPL_CallejeroService();
            callejeroProxy.synchronous = !callback;
            callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
            this.arrayBC = null;
            busquedaCallejeroSigc(cadena, callback, locality, projection);
     },

     /**
      * Method: geosearch 
      * Este método consume la API REST de Geosearch (SOLR)
      */
      geosearch : function(params, url, callback) {
          var geosearchParams;
          if ((typeof params) == "string") {
              geosearchParams = { q : params };
          }
          else {
              geosearchParams = params;
          }
          
          if (!geosearchParams.srs) {
              geosearchParams.srs = Mapea.Util.getMapProjection(this.map);
          }
          
          var searchUrl = url || this.map.geosearchUrl;

          Mapea.CDA.geosearch(searchUrl, geosearchParams, null, null, callback, function(){ Mapea.Util.showErrorMessage("Error al ejecutar la búsqueda: '"+geosearchParams.q+"'");}, this);
      },

     /**
      * Method: buscarCallejero
      */
     autocompletarDireccion: function(cadena, limit, callback, locality){
            callejeroProxy = new IMPL_CallejeroService();
            callejeroProxy.synchronous = !callback;
            callejeroProxy.url = this.sgcmOptions.proxyHost + '?url=' + this.swCallejero;
            this.arrayAuto = null;
            autocompleterSigc(cadena, limit, callback, locality);
     },

    /**
     *
     * Method: removeEventHandler
     */
    removeEventHandler: function(type){
        if(!type){
            Mapea.Util.showErrorMessage('SigcMapea.removeEventHandler: Debe especificar el tipo de evento a eliminar del mapa.');
        }
        this.map.events.remove(type);
    },

    /**
     * Method: setTheme
     * removes the previous theme and
     * establishes the new one
     * 
     * theme - {String} url or predefined name of the
     * theme which will be applied
     */
    setTheme: function(theme) {
        var themeParameter = new Mapea.Parameter.Theme(theme);
        this.map.addParameter(themeParameter);
    },

    CLASS_NAME: "Mapea.SigcMapea"
});

/**
 * Method: getQueryable_sigc
 *
 */
function getQueryable_sigc(layerInfo,url,layerName){

    layerInfo.loadCapabilities(url);
    var capabilities = layerInfo.returnCapabilities();

    var NumLayers = capabilities.layers[0].layers.length;
    var layers = capabilities.layers[0];

    for(var i=0; i<NumLayers; i++){
        if(layers.layers[i].name == layerName){
            if(typeof(layers.layers[i].layers) == 'undefined')
                return true; // Is not dataset
            else{ //Search in the tree leaves
                for(var j=0; j<layers.layers[i].layers.length; j++){
                    if(layers.layers[i].layers[j].options.queryable == true)
                        return true;
                }
            }
            return false; // All leaves are not queryable
        }
        //Search in sub-layers
        else{
            if(typeof (layers.layers[i].layers) != 'undefined'){
                for(var j=0; j<layers.layers[i].layers.length; j++){
                    if(layers.layers[i].layers[j].name == layerName){
                        return layers.layers[i].layers[j].options.queryable;
                    }
                }
            }
        }
    }
 }

 /**
 * Method: executeAction
 *
 */
 function executeAction(element) {
    for(key in measureControls)
    {
        var control = measureControls[key];

        if( element == key ) {
            control.activate();
        }else {
            control.deactivate();
        }
    }

    var element = document.getElementById('idMeasure');
    if ( element && (element != null) )
        element.innerHTML = "";
 }

 /**
 * Method: executeDelete
 *
 */
function executeDelete(map) {

    var controlsMeasure = map.getControlsBy("id","measurePanelId");

    if ( controlsMeasure.length > 0 ){

            controlsMeasure[0].controls[0].deactivate();
            controlsMeasure[0].controls[1].deactivate();

        }

    var element = document.getElementById('idMeasure');
    if ( element && (element != null) )
        element.innerHTML = "";
    controlsMeasure[0].controls[2].deactivate();
 }

 /**
 * Method: handleMeasurements
 *
 */
 function handleMeasurements(event) {
    var geometry = event.geometry;
    var units = event.units;
    var order = event.order;
    var measure = event.measure;
    var element = document.getElementById('idMeasure');
    var out = "";
    if(order == 1) {
        out += "Longitud: " + measure.toFixed(3) + " " + units;
    } else {
        out += "Superficie: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
    }
    element.innerHTML = out;
 }

 /**
  * Method: generaAtributos
  *
  */
  function generaAtributos(objeto, attributionWfsLayer,geomColumnDef,noStringAttributes,dateAttributes,dateTimeAttributes,timeAttributes,durationAttributes){

    attributionWfsLayer = [];
    var noStringAttributes = [];
    dateAttributes = [];
    dateTimeAttributes = [];
    timeAttributes = [];
    durationAttributes = [];
    var type = null;
    geomColumnDef = false;
    // Insert into the vector the names of feature's attributes
    for(i=0;i<objeto.featureTypes[0].properties.length;i++){
        type = objeto.featureTypes[0].properties[i].localType;
        //Add new geometry types. Added from http://schemas.opengis.net/gml/3.2.1. Added on 23-11-2011
        if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType" && type != "SurfacePropertyType"
            && type != "GeometryPropertyType" && type != "GeometryArrayPropertyType" && type != "MultiGeometryPropertyType" && type != "MultiPointPropertyType" && type != "AbstractGeometricAggregateType" && type != "PointArrayPropertyType"
            && type != "CurveArrayPropertyType" && type != "SolidPropertyType" && type != "SolidArrayPropertyType"){
            attributionWfsLayer.push(objeto.featureTypes[0].properties[i].name);
            if(type == "dateTime"){
                dateTimeAttributes.push(objeto.featureTypes[0].properties[i].name);
            }
            else if(type == "date"){
                dateAttributes.push(objeto.featureTypes[0].properties[i].name);
            }
            else if(type == "time"){
                timeAttributes.push(objeto.featureTypes[0].properties[i].name);
            }
            else if(type == "duration"){
                durationAttributes.push(objeto.featureTypes[0].properties[i].name);
            }
        }
        else{
            //Save the name of geometry column
            this.geomColumnDef = true;
            geomColumn = objeto.featureTypes[0].properties[i].name;
        }
        //Check if the attribute's type is integer.
        if(objeto.featureTypes[0].properties[i].localType == "int" || objeto.featureTypes[0].properties[i].localType == "float" || objeto.featureTypes[0].properties[i].localType == "double" || objeto.featureTypes[0].properties[i].localType == "decimal"
            || objeto.featureTypes[0].properties[i].localType == "short" || objeto.featureTypes[0].properties[i].localType == "byte" || objeto.featureTypes[0].properties[i].localType == "integer" || objeto.featureTypes[0].properties[i].localType == "long"
            || objeto.featureTypes[0].properties[i].localType == "negativeInteger" || objeto.featureTypes[0].properties[i].localType == "nonNegativeInteger" || objeto.featureTypes[0].properties[i].localType == "nonPositiveInteger" || objeto.featureTypes[0].properties[i].localType == "positiveInteger"
            || objeto.featureTypes[0].properties[i].localType == "unsignedLong" || objeto.featureTypes[0].properties[i].localType == "unsignedInt" || objeto.featureTypes[0].properties[i].localType == "unsignedShort" || objeto.featureTypes[0].properties[i].localType == "unsignedByte"){
            noStringAttributes.push(objeto.featureTypes[0].properties[i].name)
        }
    }
 }

/**
  * Method: createInfoPanel_sigc
  *
  */
  function createInfoPanel_sigc(info, map, infoFeatureGML) {
      var activo = false;
      var infoPanel;

      var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo', id:'infoPanelId'});
      
      //MJMJ onclick remove from OLv2.12:
        //infoPanel.onClick = function(ctrl, evt){
        //REMOVED onButtonClick from info panel. Cb function is "disabledButtonClickInfoPanel"
        infoPanel.onButtonClick = function(evt) {
            var isGetFeatureCtrl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("getlayersinfo") > -1));
            if (isGetFeatureCtrl)
            {
                var controlInfo = map.getControlsByClass("Mapea.Control.GetLayersInfo")[0];
                if (controlInfo.active)
                {
                    controlInfo.deactivate();
                }
                else
                {
                    controlInfo.activate();
                }

                //navigation controls
                var controlsNav = map.getControlsByClass('Mapea.Control.NavToolbar');
                if ( controlsNav.length > 0 ){
                    controlsNav[0].controls[0].deactivate();
                    controlsNav[0].controls[1].deactivate();
                }

                //measure controls
                var controlsMeasure = map.getControlsBy("id","measurePanelId");
                if ( controlsMeasure.length > 0 ){
                    controlsMeasure[0].controls[0].deactivate();
                    controlsMeasure[0].controls[1].deactivate();
                    document.getElementById('idMeasure').innerHTML = "";
                }

                //edit controls
                var controlsEdit = map.getControlsBy("id", "editPanelId");
                if (controlsEdit.length > 0)
                {
                    for (var i=0,ilen=controlsEdit[0].controls.length; i<ilen; i++ )
                    {
                        controlsEdit[0].controls[i].deactivate();
                    }
                }
            }

            OpenLayers.Event.stop(evt ? evt : window.event);
        };

        infoPanel.addControls(info);
        map.addControl(infoPanel);
 }

function extendEventButtonFunction(map){
    if(map!=null){
        var control = map.getControlsByClass('OpenLayers.Control.NavToolbar');

        if( control.length > 0 ) {
            OpenLayers.Util.extend( control[0].controls[0], {
                activate: function () {
                    executeAction( "no" );
                    if( this.active ) {
                        return false;
                    }

                    if( this.handler ) {
                        this.handler.activate();
                    }

                    this.active = true;
                    this.events.triggerEvent("activate");
                    return true;
                }
            });

            OpenLayers.Util.extend( control[0].controls[1], {
                activate: function () {
                    executeAction( "no" );
                    if( this.active ) {
                        return false;
                    }

                    if( this.handler ) {
                        this.handler.activate();
                    }

                    this.active = true;
                    this.events.triggerEvent("activate");
                    return true;
                }
            });
        }}
}


function createMeasurePanel_sigc(measureDiv, map) {
    if(!measureDiv){
        measureDiv = OpenLayers.Util.createDiv('idMeasure');
        measureDiv.className = 'olControlMeasurePosition';
        measureDiv.style.display = "none";
    }
    var zIndex = map.Z_INDEX_BASE['Control'] + map.controls.length;
    measureDiv.style.zIndex = zIndex;
    map.viewPortDiv.appendChild(measureDiv);
    var deleMeasure= new Mapea.Control.DelMeasure({id:'deleteMeasures', title: 'Eliminar medidas', displayClass: 'olControlDeleteMeasure'});
    var measurePanel = new OpenLayers.Control.Panel({displayClass:'MapeaMeasurePanel',id:'measurePanelId'});

    //MJMJ onclick remove from OLv2.12:
    //measurePanel.onClick = function(ctrl, evt){
    measurePanel.onButtonClick = function(evt)
    {
        var isMeasureDistCtrl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("controlmeasuredist") > -1));
        var isMeasurePerCtrl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("controlmeasureper") > -1));
        var isMeasureDelCtrl = (evt.buttonElement.className && /olcontroldelete(feature|measure)/i.test(evt.buttonElement.className));

        if (!isMeasureDistCtrl && !isMeasurePerCtrl && !isMeasureDelCtrl) return true;

        //navigation controls
        var controlsNav = map.getControlsByClass('Mapea.Control.NavToolbar');
        if ( controlsNav.length > 0 ){
            controlsNav[0].controls[0].deactivate();
            controlsNav[0].controls[1].deactivate();
        }

        //info control
        var controlsInfo = map.getControlsBy("id","infoPanelId");
        if ( controlsInfo.length > 0 ){
            controlsInfo[0].controls[0].deactivate();
        }

        //edit controls
        var controlsEdit = map.getControlsBy("id", "editPanelId");
        if (controlsEdit.length > 0)
        {
            for (var i=0,ilen=controlsEdit[0].controls.length; i<ilen; i++ )
            {
                controlsEdit[0].controls[i].deactivate();
            }
        }

        OpenLayers.Event.stop(evt ? evt : window.event);
        if (isMeasureDelCtrl)
        {
            executeDelete(map);
        }
        else
        {
            var ctrl = (isMeasureDistCtrl)? map.getControlsBy("id", "measureDist")[0] : map.getControlsBy("id", "measurePer")[0];
            if (ctrl)
            {
                if (ctrl.active)
                {
                    ctrl.deactivate();
                }
                else
                {
                    ctrl.activate();
                    if(ctrl.id == "measureDist"){
                        executeAction( "line" );
                    }
                    else if( ctrl.id == "measurePer" )
                    {
                        executeAction( "polygon" );
                    }
                }
            }
        }
    };

    var styleColor = "#5092f4";
    var sketchSymbolizers = {
            "Point": {
                pointRadius: 6,
                graphicName: "circle",
                fillColor: styleColor,
                fillOpacity: 0.3,
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: styleColor
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: styleColor,
                strokeDashstyle: "none"
            },
            "Polygon": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: styleColor,
                fillColor: styleColor,
                fillOpacity: 0.5
            }
        };

    var style = new OpenLayers.Style();
    style.addRules([new OpenLayers.Rule({symbolizer: sketchSymbolizers})]);

    var styleMapa = new OpenLayers.StyleMap({"default": style});

    measureControls = {
        line: new OpenLayers.Control.Measure(
            OpenLayers.Handler.Path, {
                id:'measureDist',
                displayClass: "olControlMeasureDist",
                persist: true,
                handlerOptions: {
                    layerOptions: {
                        styleMap: styleMapa,
                        zIndex : map.maxZIndex + 1
                    }
                }
            }
        ),
        polygon: new OpenLayers.Control.Measure(
            OpenLayers.Handler.Polygon, {
                id:'measurePer',
                displayClass: "olControlMeasurePer",
                persist: true,
                handlerOptions: {
                    layerOptions: {
                        styleMap: styleMapa,
                        zIndex : map.maxZIndex + 1
                    }
                }
            }
        )
    };

    var controlMeasure;
    for(var key in measureControls) {
        controlMeasure = measureControls[key];
        controlMeasure.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });
        measurePanel.addControls( controlMeasure );

    }
    measurePanel.addControls (deleMeasure);
    map.addControl( measurePanel );
}

function getMaxExtentEnvolved(list){
    var lefts = new Array();
    var rights = new Array();
    var tops = new Array();
    var bottoms = new Array();


    for(var i=0;i<list.length;i++){
     lefts.push(list[i].left);
      rights.push(list[i].right);
       tops.push(list[i].top);
        bottoms.push(list[i].bottom);
     }

     var sortLeft= lefts.sort(sortNumber);
     var sortBottom= bottoms.sort(sortNumber);
     var sortRight= rights.sort(sortNumber);
     var sortTop= tops.sort(sortNumber);
     var newLeft = sortLeft[0];
     var newBottom = sortBottom[0];
     var newRight = sortRight[rights.length-1];


     var newTop = sortTop[tops.length-1];
     var bounds = new OpenLayers.Bounds(newLeft,newBottom,newRight,newTop);

     return bounds;
}

/**
* Method: getBoundingBoxFromCapabilitiesWFS
*
*/
function getBoundingBoxFromCapabilitiesWFS(url,featureName,srs){

  var cont= new Mapea.Util.WFSGetCapabilities("1.1.0");
  cont.loadCapabilities(url);
  var capabilities = cont.returnCapabilities();

  if(capabilities == null){

    return -1;

  }

  else {

      var numFeatureTypes  = capabilities.featureTypeList.featureTypes.length;
      featureName = featureName.toUpperCase();
      var featureTypeList = capabilities.featureTypeList;

      for( var i = 0; i < numFeatureTypes;i++){

        if(featureTypeList.featureTypes[i].name.toUpperCase() == featureName){

           if(featureTypeList.featureTypes[i].bbox){

                var srcProj = new OpenLayers.Projection("EPSG:4326");
                var dstProj = new OpenLayers.Projection(srs);
                var extent = featureTypeList.featureTypes[i].bbox;
                var newExtent = extent.transform(srcProj,dstProj);
                return newExtent;

           }
           else{
              return -1;
           }
        }
      }
    }
}


/**
* Method: getBoundingBoxFromCapabilities
*
*/

function getBoundingBoxFromCapabilities(url,layerName,srs){

    var cont= new Mapea.Util.ReadMaxExtent(url);
    cont.loadCapabilities(url);
    var capabilities = cont.returnCapabilities();
    var NumLayers = capabilities.layers[0].layers.length;
    var layers = capabilities.layers[0];

    if(layers.name == layerName) {

      if((layers.arraySRS.indexOf(srs) == -1)&&(layers.arraySRS[0].indexOf(srs) == -1)){
         Mapea.Util.showErrorMessage("La capa " + layerName + " no se encuentra disponible en: " + srs);
         return -1;
      }

      if(layers.srsArray){

      var find = layers.srsArray.indexOf(srs);

      if(find > -1){
         return layers.bboxArray[find];
      }
      else {
        var srcProj = new OpenLayers.Projection(layers.srsArray[0]);
        var dstProj = new OpenLayers.Projection(srs);
        var extent = layers.bboxArray[0];
        var newExtent = extent.transform(srcProj,dstProj);
        return newExtent;
      }

      }
      else{
         var auxiliar = getBoundingDataset(layers,srs);
         return auxiliar;
      }
    }

   else{

    for(var i=0; i<NumLayers; i++){
        if(layers.layers[i].name == layerName){

                   var checkArraySRS = layers.layers[i].arraySRS;

                   if( checkArraySRS == undefined){
                       checkArraySRS = layers.arraySRS;
                   }


                   if((checkArraySRS.indexOf(srs) == -1)&&(checkArraySRS[0].indexOf(srs) == -1)){
                    Mapea.Util.showErrorMessage("La capa " + layerName + " no se encuentra disponible en: " + srs);
                    return -1;
                   }


               //dataset
            if(typeof (layers.layers[i].layers) != "undefined"){
                var find=false;

                // defined srs
                if(layers.layers[i].srsArray){
                  var NumSRS = layers.layers[i].srsArray.length;
                  for(var k=0; i<NumSRS; k++){
                     // match srs
                     if(layers.layers[i].srsArray[k] == srs){
                       find=true;
                       return layers.layers[i].bboxArray[k];
                       }
                    }

                 }

                 // no defined srs || no match srs
                 if(find==false){

                 var numChilds = layers.layers[i].layers.length;

                 for (var h=0; h<numChilds;h++){
                     var aux = new Array();
                     var arraySRS = layers.layers[i].layers[h].srsArray;
                     if (arraySRS == undefined){
                            arraySRS = layers.srsArray;
                       }
                     var srsFound = arraySRS.indexOf(srs);

                          if(srsFound > -1 ){
                           var bboxReturn = layers.layers[i].layers[h].bboxArray;

                          if( bboxReturn == undefined){
                           bboxReturn = layers.bboxArray;
                          }

                        var extent = bboxReturn[srsFound];
                        aux.push(extent);
                       }
                        else{
                           var srcProj = new OpenLayers.Projection(arraySRS[0]);
                           var dstProj = new OpenLayers.Projection(srs);
                           var bboxAux = layers.layers[i].layers[h].bboxArray;
                           if( bboxAux == undefined){
                               bboxAux = layers.bboxArray;
                           }
                           var extent = bboxAux[0];
                           var newExtent = extent.transform(srcProj,dstProj);
                           aux.push(extent);
                        }

                 }


                      var dev = getMaxExtentEnvolved(aux);
                      return dev;
                 }

             }

              //layer
           else{
              var arraySRS = layers.layers[i].srsArray;
              if (arraySRS == undefined){
                            arraySRS = layers.srsArray;
                       }

             var srsFound = arraySRS.indexOf(srs);


                  if(srsFound > -1 ){

                           var bboxReturn = layers.layers[i].bboxArray;

                          if( bboxReturn == undefined){
                           bboxReturn = layers.bboxArray;
                          }

                           var extent = bboxReturn[srsFound];

                           return extent;
                  }
                  else{
                           var srcProj = new OpenLayers.Projection(arraySRS[0]);
                           var dstProj = new OpenLayers.Projection(srs);
                           var bboxAux = layers.layers[i].bboxArray;
                           if( bboxAux == undefined){
                               bboxAux = layers.bboxArray;
                           }
                           var extent = bboxAux[0];
                           var newExtent = extent.transform(srcProj,dstProj);
                           return newExtent;
                  }
           }

 }
        //Search in sub-layers
        else{
            //layer
            if(typeof (layers.layers[i].layers) != "undefined"){
                for(var j=0; j<layers.layers[i].layers.length; j++){


                    if(layers.layers[i].layers[j].name == layerName){

                      var checkArraySRS = layers.layers[i].layers[j].arraySRS;

                      if( checkArraySRS == undefined){
                        checkArraySRS = layers.arraySRS;
                      }

                        if((checkArraySRS.indexOf(srs) == -1)&&(checkArraySRS[0].indexOf(srs) == -1)){
                            Mapea.Util.showErrorMessage("La capa " + layerName + " no se encuentra disponible en: " + srs);
                            return -1;
                        }


                       var arraySRS = layers.layers[i].layers[j].srsArray;
                       if (arraySRS == undefined){
                            arraySRS = layers.srsArray;
                       }
                       var srsFound = arraySRS.indexOf(srs);

                       if(srsFound > -1 ){
                           var bboxReturn = layers.layers[i].layers[j].bboxArray;

                          if( bboxReturn == undefined){
                           bboxReturn = layers.bboxArray;
                          }

                        return bboxReturn[srsFound];
                       }
                   else{
                           var srcProj = new OpenLayers.Projection(arraySRS[0]);
                           var dstProj = new OpenLayers.Projection(srs)
                           var bboxAux = layers.layers[i].layers[j].bboxArray;
                           if( bboxAux == undefined){
                               bboxAux = layers.bboxArray;
                           }
                           var extent = bboxAux[0];
                           var newExtent = extent.transform(srcProj,dstProj);
                           return newExtent;
                  }
                }
              }
            }
        }
    }
  }
}


/**
* Method: getBoundingDataset
*
*/


function getBoundingDataset(layers,srs){

var NumLayers=layers.length;
var srsDataset = new Array();

for(var i=0; i<NumLayers; i++){


            if(typeof (layers.layers[i].layers) != "undefined"){
                var find=false;

                // srs definded
                if(layers.layers[i].srsArray){
                  var NumSRS = layers.layers[i].srsArray.length;
                  for(var k=0; i<NumSRS; k++){
                     // match srs
                     if(layers.layers[i].srsArray[k] == srs){
                       find=true;
                       srsDataset.push(layers.layers[i].bboxArray[k]);
                       }
                    }

                 }


                 if(find==false){

                 var numChilds = layers.layers[i].layers.length;

                  for (var h=0; h<numChilds;h++){
                     var aux = new Array();
                     var arraySRS = layers.layers[i].layers[h].srsArray;
                     if (arraySRS == undefined){
                            arraySRS = layers.srsArray;
                       }
                     var srsFound = arraySRS.indexOf(srs);

                          if(srsFound > -1 ){
                           var bboxReturn = layers.layers[i].layers[h].bboxArray;

                          if( bboxReturn == undefined){
                           bboxReturn = layers.bboxArray;
                          }

                        var extent = bboxReturn[srsFound];
                        aux.push(extent);
                       }
                        else{
                           var srcProj = new OpenLayers.Projection(arraySRS[0]);
                           var dstProj = new OpenLayers.Projection(srs);
                           var bboxAux = layers.layers[i].layers[h].bboxArray;
                           if( bboxAux == undefined){
                               bboxAux = layers.bboxArray;
                           }
                           var extent = bboxAux[0];
                           var newExtent = extent.transform(srcProj,dstProj);
                           aux.push(extent);
                        }

                 }



                      var dev = getMaxExtentEnvolved(aux);
                      srsDataset.push(dev);
                 }

             }

           else{

           var arraySRS = layers.layers[i].srsArray;
              if (arraySRS == undefined){
                            arraySRS = layers.srsArray;
                       }

             var srsFound = arraySRS.indexOf(srs);


                  if(srsFound > -1 ){

                           var bboxReturn = layers.layers[i].bboxArray;

                          if( bboxReturn == undefined){
                           bboxReturn = layers.bboxArray;
                          }

                           var extent = bboxReturn[srsFound];

                          srsDataset.push(extent);
                  }
                  else{
                           var srcProj = new OpenLayers.Projection(arraySRS[0]);
                           var dstProj = new OpenLayers.Projection(srs);
                           var bboxAux = layers.layers[i].bboxArray;
                           if( bboxAux == undefined){
                               bboxAux = layers.bboxArray;
                           }
                           var extent = bboxAux[0];
                           var newExtent = extent.transform(srcProj,dstProj);
                           srsDataset.push(newExtent);
                  }


           }



    }
    var devSrsDataset = getMaxExtentEnvolved(srsDataset);
    return devSrsDataset;
}


function sortNumber(a,b){
    return a - b;
}

function checkQueriesLayers(map,info,queryableLayers,listExtentLayers){
    var query = '';
    for(var i=0; i<queryableLayers.length; i++){
        var QL = queryableLayers[i];
        var layer = map.getLayersBy('id', QL.id)[0];

        map.removeLayer(layer);
        query = getQueryable_sigc(info,QL.url+'?mapeaop=wmsinfo', QL.name);

        var maxExtentLayer = getBoundingBoxFromCapabilities(QL.url,QL.name, QL.srs);
        if(maxExtentLayer != -1){
            listExtentLayers.push(maxExtentLayer);

            var newLayerOL = new Mapea.Layer.WMS(QL.tagname,QL.url,{layers: QL.name, transparent: QL.transparent},{singleTile: QL.tile, ratio: 1, queryable: query});
            map.addLayer(newLayerOL, true);
        }
    }

/**-----------------------------------------------------------------------------------------------------------*/
    var maxExtentEnvolved=getMaxExtentEnvolved(listExtentLayers);
    map.baseLayer.maxExtent = maxExtentEnvolved;
    map.setOptions({maxExtent: maxExtentEnvolved});
    map.setOptions({restrictedExtent: maxExtentEnvolved});

    // Reset layers resolutions
    for (i=0;i<map.getNumLayers();i++){
        var layer = map.layers[i];
//      if(!layer.isBaseLayer){
            layer.projection = map.baseLayer.projection;
            layer.maxExtent = map.baseLayer.maxExtent;
            layer.units = map.baseLayer.units;
//      }
        layer.initResolutions();
    }
    
    map.zoomToMaxExtent();
/**-----------------------------------------------------------------------------------------------------------*/
}

function asociarContenidos_sigc(){
    var feature = sigcMap.editAttribute.feature;

    //GUARDAR LOS VALORES INTRODUCIDOS EN EL POPUP
    for(var i=0, len=sigcMap.attributionWfsLayer.length; i<len; ++i) {
        var fieldName = sigcMap.attributionWfsLayer[i];
        try{
            feature.attributes[ fieldName ] = document.getElementById("idInputText_"+fieldName).value;
        }catch(error){
            //no attribute in data, skip
        }
        feature.state = OpenLayers.State.UPDATE;
    }
    Mapea.global.wfsLayer.commit();

    function unselectAttribute(){
        if(sigcMap.editAttribute != null){
            sigcMap.editAttribute.feature.renderIntent = "default";
            sigcMap.editAttribute.feature.layer.drawFeature(sigcMap.editAttribute.feature, sigcMap.editAttribute.feature.renderIntent);
        }
    }
    sigcMap.map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
}

function clearUnsavedOperation() {
    OpenLayers.Function.bind(Mapea.global.wfsLayer.refresh, Mapea.global.wfsLayer)();
}

function saveEditFeature_sigc() {
    var editControl = sigcMap.map.getControlsByClass("Mapea.Control.EditAttributeFeature")[0];
    var editFeature = editControl.feature;
    
    for (var i=0,len=editControl.layer.attributes.length; i<len; ++i) {
        var fieldName = editControl.layer.attributes[i].name;
        
        try {
            var fieldValue = document.getElementById("idInputText_"+fieldName).value;
            editFeature.attributes[ fieldName ] = fieldValue;
        } catch(error) {
            //no attribute in data, skip
        }       
    }
    
    editFeature.state = OpenLayers.State.UPDATE;
    editControl.layer.commit();

    sigcMap.map.removePopup(editFeature.popup);
    editFeature.popup.destroy();
    editFeature.popup = null;
}

/**
 * Constant: TILE_WIDTH
 * {Integer} 256 Default tile width (unless otherwise specified)
 */
Mapea.SigcMapea.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT {Integer} 256 Default tile height (unless otherwise
 * specified)
 */
Mapea.SigcMapea.TILE_HEIGHT = 256;
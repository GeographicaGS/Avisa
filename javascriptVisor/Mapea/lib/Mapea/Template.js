//----------------------------------------------------------//
// --------------------- Global var js ---------------------//
//----------------------------------------------------------//
var onlySearchCallejero = true;
var map = null;
var wmc = null;
var strName = null;
var measureControls = null;
//MAPEAEDITA
var wfsreq = null;
var schema = null;
var noStrAttributes = null;
var geomColumn = null;
var geomColumnDef = null;
var featureT = null;
var measureControls = null;
var query = null;
var wfsLoad = false;
//AGG - ADD WMS_FULL TO ADDLAYERSEXTERN - 20110516
var wmsFullArray = [];
var index = 0;
var kmlLayers = [];
//AGG - LAYERS EXTENT ARRAY
var listExtentLayers = [];
var errorLayer = [];
//AGG - SEARCH VARIABLES 20110711
var callejeroProxy = null;
var arrayVias = null;
var arrayTiposServicios = null;
var arrayServicios = null;
var arrayMun = null;
var arrayDir = null;
var arrayNuc = null;
var arraySedes = null;
var arrayRoads = null;
var tipoViaSelected = null;
var tipoServicioSelected  = null;
var provinciaSelected = null;
var provinciaSedeSelected = null;
var municipioSelected = null;
var municipioSedeSelected = null;
var nombreCalle = null;
var nombreSede = null;
var numeroCalle = null;
var nombreNucleo = null;
var nombreCarretera = null;
var pk = null;
var layer_style = null;
var style_blue = null;
var style_green = null;
var style_mark = null;
//var vectorlayer = null;
var selectControlCalle = null;
var animatingCallejeroHelp = false;
var helpDisplayed = false;
var firstActiveTab = null;
var activeTabsClassName = [];
var onlySearchCallejero = true;
var callejeroProxy = new IMPL_CallejeroService();

// IE  support for Array.indexOf
if (!Array.indexOf)
{
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0),len=this.length; i < len; i++)
        {
            if (this[i] == obj)
            {
                return i;
            }
        }
        return -1;
    }
}


/**** Funtions for viewer ****/

/**
* Method: onFeatureSelect
*
*/
function onFeatureSelect(evt) {
    var selectedFeature = evt.feature;
    
    var tableHeader = "<div class=\"kml-info\"><table class=\"mapea-table\"><tbody>";
    var tableBody = "";
    var tableFoot = "</tbody></table></div>";
    
    // name
    var kmlName = selectedFeature.attributes["name"];
    if ((typeof kmlName) == "string") {
        kmlName = OpenLayers.String.trim(kmlName);
    }
    if (!kmlName || (kmlName.length == 0)) {
        kmlName = "-";
    }

    // description
    var kmlDescription = selectedFeature.attributes["description"];
    if ((typeof kmlDescription) == "string") {
        kmlDescription = OpenLayers.String.trim(kmlDescription);
    }
    if (!kmlDescription || (kmlDescription.length == 0)) {
        kmlDescription = "-";
    }

    // 
    var headerHTML;
    if (Mapea.Util.isMobile) {
        headerHTML = '<div class="kml-header">' + kmlName + '</div>';
        tableBody += "<tr><td>"+ kmlDescription + "</td></tr>";
    }
    else {
        tableBody += "<tr><td class=\"header\">"+ kmlName + "</td></tr>";
        tableBody += "<tr><td>"+ kmlDescription + "</td></tr>";
    }

    if (tableBody) {
        
        var pixelX = -Mapea.Control.GetLayersInfo.SHOW_INFO_BUFFER;
        var pixelY = -Mapea.Control.GetLayersInfo.SHOW_INFO_BUFFER;

        var htmlPopup = tableHeader + tableBody + tableFoot;

        /*
         * gets the first popup on the
         * map whose pixelX and pixelY are
         * contained by the x and y of the click event
         * with a SHOW_INFO_BUFFER of difference.
         */
        var previousPopup;
        
        // gets the x and y of the click event
        var clickedPixel = Mapea.Util.getClickedPixelFromEvent(window.event);
        var mapPopup = Mapea.Util.getPopupInPixel(this.map, clickedPixel);
        if (mapPopup && mapPopup.id && (mapPopup.id == "popup_info")) {
            previousPopup = mapPopup;
        }
        
        if (previousPopup) {
            var htmlFinal = previousPopup.contentHTML;
            htmlFinal += "<div class=\"popup-info-separator\">KML</div>";
            htmlFinal += htmlPopup;
            
            previousPopup.setContentHTML(htmlFinal);
            previousPopup.show();
        }
        else {
            var closePopupFn = function(evt) {
               evt.feature = selectedFeature;
                Mapea.Util.unselectFeature(evt);
                Mapea.Util.removeAllPopups(this.map); 
            };
            var popup = new Mapea.Popup.FramedCloud("popup_kml",
                        selectedFeature.geometry.getBounds().getCenterLonLat(),
                        new OpenLayers.Size(400,300),
                        htmlPopup,
                        null, true, OpenLayers.Function.bind(closePopupFn, this), headerHTML);
            popup.pixelX = clickedPixel.x;
            popup.pixelY = clickedPixel.y;
            selectedFeature.popup = popup;
            this.map.addPopup(popup);
        }
    }
}

/**
* Method: onFeatureUnselect
*
*/
function onFeatureUnselect(evt) {
    Mapea.Util.removeAllPopups(this.map);
}

/**
* Method: getQueryable
*
*/
function getQueryable(url, layerName) {

    var queryable = false;

    // capabilities parser
    var parser = new Mapea.Util.ReadMaxExtent(url);
    parser.loadCapabilities(url);

    // capabilities
    var capabilities = parser.returnCapabilities();
    if(capabilities != null)
    {
        var wmsGC = new Mapea.Util.WMSGetCapabilities(capabilities);
        queryable = wmsGC.isQueryable(layerName);
    }

    return queryable;
}

/**
* Method: extendEventButtonFunction
*
*/
function extendEventButtonFunction() {
    if(map!=null){

    var control = map.getControlsByClass('OpenLayers.Control.NavToolbar');

    if( control.length > 0 ) {
        OpenLayers.Util.extend( control[0].controls[0], {
            activate: function () {
                executeAction( "no" );
                /*this.dragPan.activate();
                if( this.zoomWheelEnabled ) {
                    this.handlers.wheel.activate();
                }
                this.handlers.click.activate();
                this.zoomBox.activate();
                return OpenLayers.Control.prototype.activate.apply( this, arguments );*/
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

function createMeasurePanel() {
    var deleMeasure= new Mapea.Control.DelMeasure({id:'deleteMeasures', title: 'Eliminar medidas', displayClass:'olControlDeleteMeasure'});
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
            executeDelete();
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
    style.addRules([
        new OpenLayers.Rule({symbolizer: sketchSymbolizers})
    ]);

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
                },
                title: 'Medir distancia (doble click para finalizar medición)'
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
                },
                title: 'Medir área (doble click para finalizar medición)'
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
    measurePanel.addControls(deleMeasure);
    map.addControl( measurePanel );
}

function createGetInfoButton() {
    var getinfoButton = new OpenLayers.Control.Button({
        title:'Información de las capas',
        trigger: OpenLayers.Function.bind(function(){
            var infoCtrls = map.getControlsByClass("Mapea.Control.GetLayersInfo");
            if (infoCtrls.lengt > 0)
            {
                if (infoCtrls[0].active)
                {
                    infoCtrls[0].deactivate();
                    OpenLayers.Element.removeClass(infoCtrls[0].div, "MapeaControlGetLayersInfoItemActive");
                    OpenLayers.Element.addClass(infoCtrls[0].div, "MapeaControlGetLayersInfoItemInactive");
                }
                else
                {
                    infoCtrls[0].activate();
                    OpenLayers.Element.removeClass(infoCtrls[0].div, "MapeaControlGetLayersInfoItemInactive");
                    OpenLayers.Element.addClass(infoCtrls[0].div, "MapeaControlGetLayersInfoItemActive");
                }
            }
        }, this),
        displayClass:'MapeaControlGetLayersInfoItemInactive olButton'
    });

    map.addControl(getinfoButton);
}

function createInfoPanel(getInfoControl) {
   var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo', id:'infoPanelId'});

    //MJMJ onclick remove from OLv2.12:
    //infoPanel.onClick = function(ctrl, evt){
    //REMOVED onButtonClick from info panel. Cb function is "disabledButtonClickInfoPanel"
    infoPanel.onButtonClick = function(evt) {
        var isGetFeatureCtrl = (evt.buttonElement.className && (evt.buttonElement.className.toLowerCase().indexOf("getlayersinfo") > -1));
        if (isGetFeatureCtrl)
        {
            var controlInfo = map.getControlsByClass("Mapea.Control.GetLayersInfo")[0];
            if (controlInfo.active) {
                controlInfo.deactivate();
            }
            else {
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
                executeDelete();
            }

            //edit controls
            var controlsEdit = map.getControlsBy("id", "editPanelId");
            if (controlsEdit.length > 0) {
                for (var i=0,ilen=controlsEdit[0].controls.length; i<ilen; i++ ) {
                    controlsEdit[0].controls[i].deactivate();
                }
            }
        }

        OpenLayers.Event.stop(evt ? evt : window.event);
    };

    infoPanel.addControls([getInfoControl]);
    map.addControl(infoPanel);
}


/**
* Method: executeAction
*
*/
function executeAction( element ) {
    for( key in measureControls )
    {
        var control = measureControls[key];

        if( element == key ) {
            control.activate();
        }else {
            control.deactivate();
        }
    }

    var element = document.getElementById('idMeasure');
    element.innerHTML = "";
}

/**
* Method: executeDelete
*
*/
function executeDelete() {
    var mapa = map || sigcMap.map;
    var controlsMeasure = mapa.getControlsBy("id","measurePanelId");

    if ( controlsMeasure.length > 0 ){

            controlsMeasure[0].controls[0].deactivate();
            controlsMeasure[0].controls[1].deactivate();

        }

    var element = document.getElementById('idMeasure');
    $(element).css("display", "none");
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
    $(element).css("display", "");
    var out = "";
    if(order == 1) {
        out += "Longitud: " + measure.toFixed(3) + " " + units;
    } else {
        out += "Superficie: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
    }
    element.innerHTML = out;
}


/**** Funtions for editions ****/
  
/**
 * function to save a feature after editing
 */
function saveEditFeature() {
    var editControl = map.getControlsByClass("Mapea.Control.EditAttributeFeature")[0];
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

    map.removePopup(editFeature.popup);
    editFeature.popup.destroy();
    editFeature.popup = null;
}


/**
* Method: getBoundingBoxFromCapabilitiesWFS
*
*/
function getBoundingBoxFromCapabilitiesWFS(url,featureName,srs){

    var cont= new Mapea.Util.WFSGetCapabilities();
    cont.loadCapabilities(url);
    var capabilities = cont.returnCapabilities();

    if(capabilities == null)
    {
        return -1;
    }

  else {

      var numFeatureTypes  = capabilities.featureTypeList.featureTypes.length;
      featureName = featureName.toUpperCase();
      var featureTypeList = capabilities.featureTypeList;

      for( var i = 0; i < numFeatureTypes;i++)
      {
        // MJMJ_20130114 check if the feature has a name
        var hasFeatureName = (featureTypeList.featureTypes[i].name && featureTypeList.featureTypes[i].name != null);

        if (hasFeatureName && (featureTypeList.featureTypes[i].name.toUpperCase() == featureName) )
        {
           if(featureTypeList.featureTypes[i].bbox)
           {
                var srcProj = new OpenLayers.Projection("EPSG:4326");
                var dstProj = new OpenLayers.Projection(srs);
                var extent = featureTypeList.featureTypes[i].bbox;
                var newExtent = extent.transform(srcProj,dstProj);
                return newExtent;
           }
           else
           {
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

function getBoundingBoxFromCapabilities(url, layerName, srs){
    var extent = -1;

    // capabilities parser
    var parser = new Mapea.Util.ReadMaxExtent(url);
    parser.loadCapabilities(url);

    // capabilities
    var capabilities = parser.returnCapabilities();
    if(capabilities != null)
    {
        var wmsGC = new Mapea.Util.WMSGetCapabilities(capabilities);
        extent = wmsGC.getBBoxLayerName(layerName, srs);
    }

    return extent;
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


function sortNumber(a,b)
{
return a - b;
}


/**
* Method: getMaxExtentEnvolved
*
*/


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


function setZindex() {
    $("#searchResult2").parent().css("z-index","2100");
}

function clearUnsavedOperation() {
    OpenLayers.Function.bind(Mapea.global.wfsLayer.refresh, Mapea.global.wfsLayer)();
}

function redirectToApkBuilder() {
    var buildApkUrl = "android/buildapk.html?url=";
    var regExMapeaUrl = /(\/\w*mapea\w*\/)(.*)$/i;
    var regExBuildApk1 = /(.*)(&action=buildapk)(.*)/i;
    var regExBuildApk2 = /(.*)(action=buildapk)(.*)/i;
    var currentUrl = window.location.href;

    var regExFinal;
    if (regExBuildApk1.test(currentUrl))
    {
        regExFinal = regExBuildApk1;
    }
    else if (regExBuildApk2.test(currentUrl))
    {
        regExFinal = regExBuildApk2;
    }

    var mapeaUrlParam = currentUrl.replace(regExFinal, "$1$3");
    var mapeaUrl = currentUrl.replace(regExMapeaUrl, "$1");
    var toUrl = mapeaUrl + buildApkUrl + mapeaUrlParam;
    window.location.href = toUrl;
}
/*********************************************************************
** Funcion que implementa un filtro numerico
**********************************************************************/
function filterNumeric(x){
    var filtro = "0123456789.";
    var cadena = x.value;
    var ok = filtro.indexOf(cadena.charAt(cadena.length-1));
    while(ok == -1 && cadena.length>0){
        cadena = cadena.substring(0,cadena.length-1);
        ok = filtro.indexOf(cadena.charAt(cadena.length-1));
    }
    x.value = cadena;
}

/*********************************************************************
** Funcion que implementa un filtro de caracteres
**********************************************************************/
function filterCharacter(x){
    var letras="abcdefghyjklmnñopqrstuvwxyz-";
     var texto = x.value;
    texto = texto.toLowerCase();
    for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
        return 1;
            }
   }
   return 0;
}

/*********************************************************************
** Funcion que implementa un filtro de symbols
**********************************************************************/
function filterSymbols(x){
    var letras="º\ª|!\"@#·~$½%¬&{/[]()}=?¿*+";
     var texto = x.value;
    texto = texto.toLowerCase();
    for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
        return 1;
            }
   }
   return 0;
}

function filterSymbolsCallejero(x){
    var letras="º\ª|!\"@#·~$½%¬&{/[]}=?¿*+<>";
    var texto = x.value;
    texto = texto.toLowerCase();
    for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
        return 1;
            }
   }
   return 0;
}


/*********************************************************************
** Funcion que carga selects de servicios
**********************************************************************/

function loadTiposServicios(){

    obtenerTiposServicios();
    if (document.getElementById("idSelectServicios")) {
        loadTiposServiciosAux();
    }
}


function loadTiposServiciosAux(){
   if(arrayTiposServicios == null){
        setTimeout("loadTiposServiciosAux()",100);
    }
    else{
        var selectTipo = document.getElementById("idSelectServicios");
        for ( var i = 0; i < arrayTiposServicios.length; i++){
                var aux = arrayTiposServicios[i];
            selectTipo.options[i+1]=new Option(aux.codigo,aux.nombre);
        }
        
        arrayTiposServicios = null;
    }

}

/*********************************************************************
** Funcion que carga selects de tipos de via
**********************************************************************/

function loadTiposVia(){

    obtenerTiposVia();
    var selectVias = document.getElementById("idSelectTipoVia");
    if (selectVias) {
        selectVias.options[0]=new Option("..."," ");
        loadTiposViaAux();
    }
}

function loadTiposViaAux(){
    if(arrayVias == null){
        setTimeout("loadTiposViaAux()",100);
    }else{

        var selectVias = document.getElementById("idSelectTipoVia");

        for ( var i = 0; i < arrayVias.length; i++){

            selectVias.options[i+1]=new Option(arrayVias[i],arrayVias[i]);

            }
        arrayVias = null;
    }
}


/*********************************************************************
** Funcion que carga selects de municipios
**********************************************************************/

function loadMunicipios(provinciaSelected){
    obtenerMunicipios(provinciaSelected);
    loadMunicipiosAux();
 }


function loadMunicipiosSede(provinciaSelected){
    obtenerMunicipios(provinciaSelected);
    loadMunicipiosAuxSede();
 }


 function loadMunicipiosServicio(provinciaSelected){
    obtenerMunicipios(provinciaSelected);
    loadMunicipiosAuxServicio();
 }


function loadMunicipiosAux(){
    if(arrayMun == null){
        setTimeout("loadMunicipiosAux()",100);
    }else{
        var selectMun = document.getElementById("idSelectMunicipio");
        for ( var i = 0; i < arrayMun.length; i++){
            var aux = arrayMun[i];
            selectMun.options[i+1]=new Option(aux.name,aux.codINE);
            }
        arrayMun = null;
    }
}

function loadMunicipiosAuxSede(){
    if(arrayMun == null){
        setTimeout("loadMunicipiosAuxSede()",100);
    }else{
        var selectMun = document.getElementById("idSelectMunicipioSede");
        for ( var i = 0; i < arrayMun.length; i++){
            var aux = arrayMun[i];
            selectMun.options[i+1]=new Option(aux.name,aux.codINE);
            }
        arrayMun = null;
    }
}


function loadMunicipiosAuxServicio(){
    if(arrayMun == null){
        setTimeout("loadMunicipiosAuxServicio()",100);
    }else{
        var selectMun = document.getElementById("idSelectMunicipioServicio");
        for ( var i = 0; i < arrayMun.length; i++){
            var aux = arrayMun[i];
            selectMun.options[i+1]=new Option(aux.name,aux.codINE);
            }
        arrayMun = null;
    }
}




/*********************************************************************
** Funcion que obtiene los par�metros del formulario y lanza la busqueda
**********************************************************************/

function onBtnBuscarCallejero() {
    if( tipoViaSelected != null){

    if (municipioSelected != "" && municipioSelected != null && provinciaSelected != "00" && provinciaSelected != null)
    {
        nombreCalle = document.getElementById("idInputTextVia").value;

        if (nombreCalle != "")
        {
            numeroCalle = document.getElementById("idInputTextNumero").value;
            var projection = Mapea.Util.getMapProjection();
            var callback = function(response) {
                muestraDirecciones('callejero', response);
            };
            obtenerDirecciones(nombreCalle, numeroCalle, tipoViaSelected, municipioSelected, projection, callback);
        }
        else
        {
            Mapea.Util.showInfoMessage("Debe introducir un nombre de calle.");
        }
    }
    else
    {
        Mapea.Util.showInfoMessage("Debe seleccionar provincia y municipio del desplegable.");
    }
    }
    else{
             Mapea.Util.showInfoMessage("Debe seleccionar un tipo de v\xEDa del desplegable.");
    }
}

function onBtnBuscarSedes() {
    if (municipioSedeSelected != "" && municipioSedeSelected != null && provinciaSedeSelected != "00" && provinciaSedeSelected != null)
    {
        nombreSede = document.getElementById("idInputTextSede").value;

        if (nombreSede != "")
        {
            var projection = Mapea.Util.getMapProjection();
            var callback = function(response) {
                muestraDirecciones('sedes', response);
            };
            localizarSedes(municipioSedeSelected, nombreSede, provinciaSedeSelected, projection, callback);
        }
        else
        {
            Mapea.Util.showInfoMessage("Debe introducir una cadena de b\xFAsqueda.");
        }
    }
    else
    {
        Mapea.Util.showInfoMessage("Debe seleccionar provincia y municipio del desplegable.");
    }
}

function onBtnBuscarServicios() {
    if (typeof municipioServicioSelected != 'undefined' && municipioServicioSelected != "" && municipioServicioSelected != null && typeof provinciaServicioSelected != 'undefined' && provinciaServicioSelected != "00" && provinciaServicioSelected != null)
    {
        if (typeof tipoServicioSelected != 'undefined' && tipoServicioSelected != "")
        {
            var projection = Mapea.Util.getMapProjection();
            var callback = function(response) {
                muestraDirecciones('servicios', response);
            };
            localizarServicios(municipioServicioSelected, tipoServicioSelected, provinciaServicioSelected, projection, callback);
        }
        else
        {
            Mapea.Util.showInfoMessage("Debe selecccionar un tipo de servicio.");
        }
    }
    else
    {
        Mapea.Util.showInfoMessage("Debe seleccionar provincia y municipio del desplegable.");
    }
}


function onBtnBuscarNucleos() {
    nombreNucleo = document.getElementById("idInputPoblacion").value;

    if (nombreNucleo != "")
    {
        var projection = Mapea.Util.getMapProjection();
        var callback = function(response) {
            muestraDirecciones('nucleos', response);
        };
        localizarNucleos(nombreNucleo, projection, callback);
    }
    else
    {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de b\xFAsqueda.");
    }
}

function onBtnBuscarCarreteras() {
    nombreCarretera = document.getElementById("idInputCarreteras").value;
    pk = document.getElementById("idInputpk").value;

    if (nombreCarretera != "")
    {

        var projection = Mapea.Util.getMapProjection();
        var callback = function(response) {
            muestraDirecciones('carreteras', response);
        };
        localizarCarreteras(nombreCarretera,pk, projection, callback);
    }
    else
    {
        Mapea.Util.showInfoMessage("Debe introducir una cadena de b\xFAsqueda.");
    }
}

function onBtnBuscarGeneral(geocoderCallback, geocoderProcessor, busquedaGeneralCallback, busquedaGeneralProcessor) {

    //abortamos autocompletar
    if ((window.callejeroProxy != null) && (window.callejeroProxy.client != null) && (window.callejeroProxy.client.req !=null))
    {
        $('#searchquery').css("background", "");
        window.callejeroProxy.client.req.abort();
    }
    Autocomplete.close();

    var inputTextQuery = Autocomplete.field[0];

    if(filterSymbolsCallejero(inputTextQuery) == 1)
    {
        alert('Debe introducir una cadena de búsqueda válida.');
    }
    else
    {
        Autocomplete.millisecEnter = (new Date()).getTime();

        var queryGeneral = Autocomplete.field.val();

        if (queryGeneral != "")
        {
            //$('#idInputSearchCallejero').autocomplete("close");

            queryGeneral = queryGeneral.trim();

            if ( Autocomplete.searchString == queryGeneral) {

                Autocomplete.streetNumber = Autocomplete.getNumberFromInput(queryGeneral);

                if(Autocomplete.selectedIndex != -1) {
                    /*al ser la misma cadena que la del completador,
                    si se selecciono una opcion, obtenemos el array normalizado
                    previamente guardao en arrayResultNorm*/
                    var selected = Autocomplete.arrayResultNorm[Autocomplete.selectedIndex];
                    selected = selected.split(',');

                    var number = '';
                    if (selected.length == 6)
                        number = selected[5];
                    var municipio = selected[3];
                    var provincia = selected[4];

                    var processorCb;
                    if (geocoderProcessor)
                    {
                        processorCb = (function(results, cb) {
                            geocoderProcessor(results, cb, municipio, provincia);
                        });
                    }
                    var finalCbFn = function() {
                        $("#idBtnSearchMobile").css("display", "");
                        $("#searching").css("display", "none");
                        var fnCb = geocoderCallback || (function(results) {
                            procesaBusquedaGeneral(results, municipio, provincia);
                            Autocomplete.searching = 0;
                        });
                        fnCb.apply(window, arguments);
                    };
                    $("#idBtnSearchMobile").css("display", "none");
                    $("#searching").css("display", "");                 
                    locateSelectedStreet(selected[0], selected[1], number, selected[2], finalCbFn, processorCb);
                }
            }
            else
            {
                var projection = Mapea.Util.getMapProjection();
                var finalCbFn = function() {
                    $("#idBtnSearchMobile").css("display", "");
                    $("#searching").css("display", "none");
                    var cbFn = busquedaGeneralCallback || procesaBusquedaGeneral;
                    cbFn.apply(window, arguments);
                }; 
                $("#idBtnSearchMobile").css("display", "none");
                $("#searching").css("display", "");
                busquedaGeneral(queryGeneral, finalCbFn, busquedaGeneralProcessor, Mapea.Util.filterLocality, projection);
            }
        }
        else
        {
            window.Mapea.Util.showInfoMessage("Debe introducir una cadena de b\xFAsqueda.");
        }
    }

}

function procesaBusquedaGeneral(results,municipio,provincia) {
    $('#searchResult2').dialog('destroy');

    if($.browser.msie){
        $('#searchResult2').dialog({
            open: function(){
                $(this).parent().css("left", "0px");
                $('.ui-dialog :button').blur();
            },
            autoOpen: false,
            width: 670,
            height: 'auto',
            modal: false,
            resizable: true,
            draggable: true,
            position: 'top'
        });
    }else{
        $('#searchResult2').dialog({
            autoOpen: false,
            width: 650,
            height: 'auto',
            modal: false,
            resizable: true,
            draggable: true,
            position: 'top',
            open : function( event, ui ) {
                $('.ui-dialog :button').blur();
            }
        });
    }

    //Funcion modificada y optimizada para JQuery, incluye paginacion de resultados
   var total= results.length;

   //En searchCallejero NO plegamos el panel
    /*if (total > 0)
        $('#mapeaSearchToggle').click();*/

    var resxpage = 10;
    var pages = Math.ceil(total/resxpage);
    if(pages == 0) pages = 1;

    var content = '<div id="mapeaSearchPages">';
    content += '<table id="mapeaResultsTable" class="contenido_tabla" cellpadding="2" cellspacing="0" style="width: 100%;">';
    content += "<thead><tr><td><b>Tipo</b></td><td><b>Descripci&oacute;n 1</b></td><td><b>Descripci&oacute;n 2</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";

    for ( var i = 0; i < total; i++) {

        var result = results[i];

        if(result instanceof address)
        {
            var stock = new Array(result.streetType,result.streetName,result.streetNumber,result.coordX,result.coordY,result.codINE, result.municipio, result.provincia);
            var addressType = stock[0];
            var streetName = stock[1];
            var streetNo = stock[2];
            if (streetNo == "777777" || streetNo == "999999" || streetNo == "0"){
                streetNo = result.rotulo;
                if(result.rotulo == ""){
                    streetNo = "-";
                }
            }
            var coords = stock[3] +","+stock[4];
            var coordINE = stock[5];
            var locality = stock[6];
            if (locality == null || locality == '')
                locality = municipio;
            var province = stock[7];
            if (province == null || province == '')
                province = provincia;
            content += "<tr><td>Vía</td><td>"+addressType+" "+streetName+" "+streetNo+"</td><td>"+locality+"("+province+")</td><td align=\"center\"><a href=\"javascript:localizarConInformacion('"+coords+"','"+streetName+"','"+coordINE+"','"+addressType+"','"+streetNo+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(result instanceof servicio)
        {
            var alias = result.alias;
            var municipio = result.municipio;
            var x = result.x;
            var y = result.y;
            var coords = x +","+ y;
            content += "<tr><td>Servicio</td><td>"+alias+"</td><td>"+municipio+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacionServicios('"+coords+"','"+alias+"','"+municipio+"','','')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(result instanceof sede)
        {
            var direccion = result.direccion;
            var municipio = result.municipio ;
            var nombre = result.nombre ;
            var numero = result.numero ;
            if (numero == "777777" || numero == "999999" || numero == "0") {
                numero = "-";
            }
            var organismo = result.organismo;
            var unidadorganizativa = result.unidadorganizativa;
            var x = result.x ;
            var y = result.y ;
            var coords = x +","+ y;
            content += "<tr><td>Sede</td><td>"+nombre+" "+direccion+" "+numero+" "+"("+municipio+")</td><td>"+unidadorganizativa+"("+organismo+")</td><td align=\"center\"><a href=\"javascript:localizarConInformacionSede('"+coords+"','"+direccion+"','"+unidadorganizativa+"','"+nombre+"','"+numero+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(result instanceof nucleo)
        {
            var extension = result.extent;
            var id = result.idnucleo;
            var municipio = result.municipio;
            var nombre = result.nombre;
            var province = result.provincia;
            var tipoNucleo = result.tipo;
            if (tipoNucleo == ""){
                tipoNucleo = "-";
            }
            content += "<tr><td>N&uacute;cleo</td><td>"+nombre+"("+tipoNucleo+")</td><td>"+municipio+"("+province+")</td><td align=\"center\"><a href=\"javascript:centrarNucleo('"+extension+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(result instanceof road)
        {
            var carretera = result.carretera;
            var pk = result.pk;
            var provincia = result.provincia;
            var x = result.x;
            var y = result.y;
            var coords = x +","+ y;
            var nombre = carretera + ",km " + pk;
            content += "<tr><td>Carretera</td><td>"+nombre+"</td><td>"+provincia+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacionServicios('"+coords+"','"+nombre+"','"+provincia+"','','')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
    }

            content += '</tbody></table>';

            //content += '<div id="mapeaPaginas"></div>';
            content += '</div>';

            // Anyadimos el contenido
            $('#searchResult2').html(content);

            $('.mapeaCloseModal').click(function(){
        //$('#searchResult2').dialog('close');
        //$('#searchResult2').dialog( "destroy" );
            });

            // Anyadimos enlace a ultima busqueda
            var lastQueryTrigger = $('#mapeaIdSearch').find('a.lastQueryTrigger');
            if( lastQueryTrigger.length == 0 ){
        $('#mapeaSearchToggle').after('<a href="javascript:void(0);" class="lastQueryTrigger" title="Mostrar &uacute;ltima consulta"><img src=\"' + Mapea.global.THEME_IMG_PATH + 'list.jpg\" alt=\"Mostrar &uacute;ltima consulta\" /></a>');
        $('a.lastQueryTrigger').click(function(){
            /*  $('#searchResult2').dialog({ height: 'auto' });*/
            $('#searchResult2').dialog('destroy');

            if($.browser.msie){
                    $('#searchResult2').dialog({
                        open: function(){
                            $(this).parent().css("left", "0px");
                            $('.ui-dialog :button').blur();
                        },
                        autoOpen: false,
                        width: 670,
                        height:'auto',
                        modal: false,
                        resizable: true,
                        draggable: true,
                        position: 'top'
                    });

            }else{
                $('#searchResult2').dialog({
                    autoOpen: false,
                    width: 650,
                    height:'auto',
                    modal: false,
                    resizable: true,
                    draggable: true,
                    position: 'top',
                    open : function( event, ui ) {
                        $('.ui-dialog :button').blur();
                    }
                });
            }

            $('#searchResult2').dialog('open');
            var open = $('#mapeaSearchToggle').hasClass("mapeaSearchToggle-open");
                if(open === true){
                    $('#mapeaSearchToggle').click();
                }
        });
            }

    // Activamos la paginacion
    $('#searchResult2').dialog('open');
    $('#mapeaResultsTable').dataTable({"bSort": false,"aLengthMenu": [[10]]});
    $('#mapeaResultsTable').css('width','');
    if($.browser.msie){
        $("#searchResult2").css("height","auto");
        $("#mapeaSearchPages div[class*='dataTables_']").css("height","auto").css("width","auto");
    } else {
        $("#searchResult2").css("height","");
    }
}

function locateSelectedStreet(tipoVia, name, number, codIne, fnCb, processorCb)
{
     if ((window.callejeroProxy != null) && (window.callejeroProxy.client != null) && (window.callejeroProxy.client.req !=null))
     {
        Autocomplete.field.css('background', ''); //abortamos autocompletar
        window.callejeroProxy.client.req.abort(); //abortamos llamada
     }

    var callback = function(rawResponse) {
        var processor = processorCb || obtenerDireccionesResponseAsync;
        processor(rawResponse, fnCb);
    };

    // new CallejeroWS API
    var projection = Mapea.Util.getMapProjection();
    codIne = Mapea.Util.filterLocality || codIne;
    callejeroProxy.geocoderListSrs(callback, errorCallback, name, number, tipoVia, codIne, projection);
}

/*********************************************************************
** Funcion encargada de mostrar los resultados de la busqueda
**********************************************************************/

function muestraDirecciones(tipo, response) {

    $('#searchResult2').dialog('destroy');
    if($.browser.msie){
        $('#searchResult2').dialog({
            autoOpen: false,
            width: 470,
            height:470,
            modal: false,
            resizable: true,
            draggable: true,
            position: 'top',
            open : function( event, ui ) {
                $('.ui-dialog :button').blur();
            }
        });
    }else{
        $('#searchResult2').dialog({
            autoOpen: false,
            width: 450,
            height:350,
            modal: false,
            resizable: true,
            draggable: true,
            position: [350, 250],
            open : function( event, ui ) {
                $('.ui-dialog :button').blur();
            }
        });
    }   

    //Funcion modificada y optimizada para JQuery, incluye paginacion de resultados

    //Plegamos el panel de busqueda
    $('#mapeaSearchToggle').click();

    var total= response.length;
    var resxpage = 10;
    var pages = Math.ceil(total/resxpage);
    if (pages == 0) pages = 1;
    
    var content = '<div id="mapeaSearchPages">';

        content += '<table id="mapeaResultsTable" class="contenido_tabla" cellpadding="2" cellspacing="0">';
    if(tipo == "callejero"){
        content += "<thead><tr><td><b>Tipo v&iacute;a</b></td><td><b>Nombre v&iacute;a</b></td><td><b>Nº</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";
    }
    else if(tipo == "nucleos"){
        content += "<thead><tr><td><b>Nombre n&uacute;cleo</b></td><td><b>Municipio</b></td><td><b>Tipo n&uacute;cleo</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";
    }
    else if(tipo == "sedes"){
        content += "<thead><tr><td><b>Nombre</b></td><td><b>Nombre v&iacute;a</b></td><td><b>Nº</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";
    }
    else if(tipo == "servicios"){
        content += "<thead><tr><td><b>Nombre</b></td><td><b>Municipio</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";
    }
    else if(tipo == "carreteras"){
        content += "<thead><tr><td><b>Carretera</b></td><td><b>Provincia</b></td><td><b>Punto kilom&eacute;trico</b></td><td width=\"30\">&nbsp;</td></tr></thead><tbody>";
    }

    if( tipo == "callejero" && total > 0){
            var direccion = response[0];
            var stock = new Array(direccion.streetType,direccion.streetName,direccion.streetNumber,direccion.coordX,direccion.coordY,direccion.codINE);
            var addressType = stock[0];
            var streetName = stock[1];
            var streetNo = stock[2];
            if (streetNo == "777777" || streetNo == "999999" || streetNo == "0"){
                streetNo = direccion.rotulo;
                if(direccion.rotulo == ""){
                streetNo = "-";
                }
            }
            var coords = stock[3] +","+stock[4];
            var coordINE = stock[5];
            localizarConInformacion(coords,streetName,coordINE,addressType,streetNo);
    }

    for ( var i = 0; i < total; i++) {
        if(tipo == "callejero"){
            var direccion = response[i];
            var stock = new Array(direccion.streetType,direccion.streetName,direccion.streetNumber,direccion.coordX,direccion.coordY,direccion.codINE);
            var addressType = stock[0];
            var streetName = stock[1];
            var streetNo = stock[2];
            if (streetNo == "777777" || streetNo == "999999" || streetNo == "0"){
                streetNo = direccion.rotulo;
                if(direccion.rotulo == ""){
                streetNo = "-";
                }
            }
            var coords = stock[3] +","+stock[4];
            var coordINE = stock[5];
            content += "<tr><td>"+addressType+"</td><td>"+streetName+"</td><td>"+streetNo+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacion('"+coords+"','"+streetName+"','"+coordINE+"','"+addressType+"','"+streetNo+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(tipo == "nucleos") {
            var nucleo = response[i];
            var extension = nucleo.extent;
            var id = nucleo.idnucleo;
            var municipio = nucleo.municipio;
            var nombre = nucleo.nombre;
            var tipoNucleo = nucleo.tipo;
            if (tipoNucleo == ""){
                tipoNucleo = "-";
            }
            content += "<tr><td>"+nombre+"</td><td>"+municipio+"</td><td>"+tipoNucleo+"</td><td align=\"center\"><a href=\"javascript:centrarNucleo('"+extension+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if(tipo == "sedes"){
            var sedx = response[i];
            var direccion = sedx.direccion;
            var municipio = sedx.municipio ;
            var nombre = sedx.nombre ;
            var numero = sedx.numero ;
            if(numero == "0"){
                numero = "-";
            }
            var organismo = sedx.organismo;
            var unidadorganizativa = sedx.unidadorganizativa;
            var x = sedx.x ;
            var y = sedx.y ;
            var coords = x +","+ y;
            content += "<tr><td>"+nombre+"</td><td>"+direccion+"</td><td>"+numero+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacionSede('"+coords+"','"+direccion+"','"+unidadorganizativa+"','"+nombre+"','"+numero+"')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if (tipo == "servicios"){
            var serx = response[i];
            var alias = serx.alias;
            var municipio = serx.municipio;
            var x = serx.x;
            var y = serx.y;
            var coords = x +","+ y;
            content += "<tr><td>"+alias+"</td><td>"+municipio+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacionServicios('"+coords+"','"+alias+"','"+municipio+"','','')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
        else if (tipo == "carreteras"){
            var serx = response[i];
            var carretera = serx.carretera;
            var pk = serx.pk;
            var provincia = serx.provincia;
            var x = serx.x;
            var y = serx.y;
            var coords = x +","+ y;
            var nombre = carretera + ",km " + pk;
            content += "<tr><td>"+carretera+"</td><td>"+provincia+"</td><td>"+pk+"</td><td align=\"center\"><a href=\"javascript:localizarConInformacionServicios('"+coords+"','"+nombre+"','"+provincia+"','','')\" class=\"mapeaCloseModal\" title=\"Situar en el mapa\"><img src=\"" + Mapea.global.THEME_IMG_PATH + "search/ping.png\" alt=\"Situar en el mapa\" /></a></td></tr>";
        }
    }
    
    content += '</tbody></table></div>';

    // Anyadimos el contenido
    $('#searchResult2').html(content);

    // Anyadimos enlace a ultima busqueda
    var lastQueryTrigger = $('#mapeaIdSearch').find('a.lastQueryTrigger');
    if( lastQueryTrigger.length == 0 ){
        $('#mapeaSearchToggle').after('<a href="javascript:void(0);" class="lastQueryTrigger" title="Mostrar &uacute;ltima consulta"><img src=\"' + Mapea.global.THEME_IMG_PATH + 'list.jpg\" alt=\"Mostrar &uacute;ltima consulta\" /></a>');
        $('a.lastQueryTrigger').click(function() {
            $('#searchResult2').dialog('destroy');
            if($.browser.msie){
                $('#searchResult2').dialog({
                    autoOpen: false,
                    width: 470,
                    height:'auto',
                    modal: false,
                    resizable: true,
                    draggable: true,
                    position: 'top',
                    open : function( event, ui ) {
                        $('.ui-dialog :button').blur();
                    }
                });
            }else{
                $('#searchResult2').dialog({
                    autoOpen: false,
                    width: 450,
                    height:'auto',
                    modal: false,
                    resizable: true,
                    draggable: true,
                    position: [350, 250],
                    open : function( event, ui ) {
                        $('.ui-dialog :button').blur();
                    }
                });
            }
            $('#searchResult2').dialog('open');
            var open = $('#mapeaSearchToggle').hasClass("mapeaSearchToggle-open");
            if (open === true) {
                $('#mapeaSearchToggle').click();
            }
        });
    }

    // Activamos la paginacion
    $('#searchResult2').dialog('open');

    $('#mapeaResultsTable').dataTable({"bSort": false,"aLengthMenu": [[10]]});

    $('#searchResult2').dialog('widget').css('top', '5%').css('left', '32%');
}




/*********************************************************************
** Funcion que recoge el evento de cambio en el combo de tipo de via
**********************************************************************/
function onChangeTipoVia(objeto)
{
    var indice = objeto.selectedIndex;
    tipoViaSelected = objeto.options[indice].value;

}



function onChangeServicio(objeto)
{
    var indice = objeto.selectedIndex;
    tipoServicioSelected = objeto.options[indice].value;

}


/*********************************************************************
** Funcion que recoge el evento de cambio en el combo de provincias y
** carga el combo de municipios.
**********************************************************************/
function onChangeProvincia(objeto)
{
    var indice = objeto.selectedIndex;
    provinciaSelected = objeto.options[indice].value;
    var currentBrowser = getBrowserName();

    if (provinciaSelected == "00")
    {
        document.getElementById('idSelectMunicipio').selectedIndex="0";
        document.getElementById('idSelectMunicipio').options.length= 1;
        municipioSelected="";
    }
    else{
        loadMunicipios(provinciaSelected);
    }
}


function onChangeProvinciaSede(objeto)
{
    var indice = objeto.selectedIndex;
    provinciaSedeSelected = objeto.options[indice].value;
    var currentBrowser = getBrowserName();

    if (provinciaSedeSelected == "00")
    {
        document.getElementById('idSelectMunicipioSede').selectedIndex="0";
        document.getElementById('idSelectMunicipioSede').options.length= 1;
        municipioSedeSelected="";
    }
    else{
        loadMunicipiosSede(provinciaSedeSelected);
    }
}


function onChangeProvinciaServicio(objeto)
{
    var indice = objeto.selectedIndex;
    provinciaServicioSelected = objeto.options[indice].value;
    var currentBrowser = getBrowserName();

    if (provinciaServicioSelected == "00")
    {
        document.getElementById('idSelectMunicipioServicio').selectedIndex="0";
        document.getElementById('idSelectMunicipioServicio').options.length= 1;
        municipioServicioSelected="";
    }
    else{
        loadMunicipiosServicio(provinciaServicioSelected);
    }
}


/*********************************************************************
** Funcion que recoge el evento de cambio en el combo de municipio
**********************************************************************/
function onChangeMunicipio(objeto)
{
    var indice = objeto.selectedIndex;
    municipioSelected = objeto.options[indice].value;

}

function onChangeMunicipioSede(objeto)
{
    var indice = objeto.selectedIndex;
    municipioSedeSelected = objeto.options[indice].value;

}

function onChangeMunicipioServicio(objeto)
{
    var indice = objeto.selectedIndex;
    municipioServicioSelected = objeto.options[indice].value;

}


/*********************************************************************
** Funcion que oculta popup
**********************************************************************/

function ocultaPopup() {
    document.getElementById("ventana_popup").style.display="none";
    var elTabla = document.getElementById("idTable");
    if ( elTabla != null){
        document.getElementById("idTable").style.display="none";
    }
}


/*********************************************************************
** Funcion que centra y dibuja la direccion resultante de la busqueda
**********************************************************************/

function localizarConInformacion(coords, nombre, localidad, tipoVia, numero) {
    document.getElementById("ventana_popup").style.display="none";

    if (coords == "," || coords == "0.0,0.0")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geom\xE9trica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars();
        drawmultipoint(coords,nombre,localidad,tipoVia,numero); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}

function localizarConInformacionSede(coords,direccion,unidadorganizativa,nombre,numero){
    document.getElementById("ventana_popup").style.display="none";

    if (coords == ",")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geom\xE9trica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars();
        drawmultipointSede(coords,direccion,unidadorganizativa,nombre,numero); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}


function localizarConInformacionServicios(coords,alias,municipio,auxA,auxB){
    document.getElementById("ventana_popup").style.display="none";

    if (coords == ",")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geom\xE9trica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars();
        drawmultipointServicio(coords,alias,municipio); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}


/*********************************************************************
** Funcion que centra el nucleo de poblacion obtenido en la busqueda
**********************************************************************/

function centrarNucleo(extension){
    document.getElementById("ventana_popup").style.display="none";

    if (extension == "" || extension == null)
    {
        Mapea.Util.showErrorMessage("No existe referencia geom\xE9trica");
    }
    else{
        var coords = extension.split(",");
        var minx = coords [1];
        var maxx = coords [0];
        var miny = coords [3];
        var maxy = coords [2];

        var boundsglobal = new OpenLayers.Bounds(minx, miny, maxx, maxy);
    
        map.zoomToExtent(boundsglobal);
    }
}


/*********************************************************************
** Se inicializan las variables y la capa vector para dibujar punto
**********************************************************************/

function initolvars(map) {
    var mapVar = map || window.map;

    if (!Mapea.global.CDALayer) {
        Mapea.global.CDALayer = new Mapea.Layer.Vector("Resultados", { displayInLayerSwitcher: false, ratio: 2});
        mapVar.addLayer(Mapea.global.CDALayer, true);
        Mapea.global.CDALayer.events.register('featureunselected', this, Mapea.Util.closePopup);
        Mapea.global.CDALayer.events.register('featureselected', this, onFeatureSelectCalle);
        mapVar.uniqueSelectFeatureCtrl.addLayers(Mapea.global.CDALayer);
    }
    else {
        //map.setLayerIndex(map.auxLayer, map.getNumLayers()-1 );
        eraselayer(mapVar);
    }
}


function drawmultipoint(strmultipoint,nombre,localidad,tipoVia,numero){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars();

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint,{"tipoVia": tipoVia, "nombreCalle": nombre, "numero": numero});

    Mapea.global.CDALayer.addFeatures([multipointfeature]);
}


function drawmultipointSede(strmultipoint,direccion,unidadorganizativa,nombre,numero){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars();

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint, {"nombre": nombre, "direccion": direccion, "numero": numero, "unidadorganizativa": unidadorganizativa});

    Mapea.global.CDALayer.addFeatures([multipointfeature]);


}


function drawmultipointServicio(strmultipoint,alias,municipio){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars();

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint,{"alias": alias, "municipio": municipio});
    
    Mapea.global.CDALayer.addFeatures([multipointfeature]);
}




/**
 * Funci�n que borra la capa vector
 *
 * @author Guadaltel - jenriquesoriano
 */
function eraselayer(map){
    if (Mapea.global.CDALayer){
        Mapea.Util.closePopup();
        Mapea.global.CDALayer.destroyFeatures();
        puntoX = "undefined";
        puntoY = "undefined";
    }
}



/**
* Method: onFeatureSelect
*
*/
function onFeatureSelectCalle(event, map) {
    var mapVar = map || window.map;

    var feature = event.feature;
    selectedFeature = feature;
    
    var html = null;
    
    var objtToTable = {};
    
    for(var i in feature.attributes){
         if (i == "tipoVia" ){
             objtToTable["Tipo de V&iacute;a"] = feature.attributes[i];
         }else if ( i == "nombreCalle"){
             objtToTable["Nombre de la V&iacute;a"] = feature.attributes[i];
         }else if ( i == "nombre"){
             objtToTable["Nombre"] = feature.attributes[i];
         }else if ( i == "direccion"){
             objtToTable["Nombre de la V&iacute;a"] = feature.attributes[i];
         }else if ( i == "numero"){
             objtToTable["N&uacute;mero"] = feature.attributes[i];
         }
         else if ( i == "unidadorganizativa"){
             objtToTable["Unidad Organizativa"] = feature.attributes[i];
         }
         else if ( i == "alias"){
             objtToTable["Nombre"] = feature.attributes[i];
         }
         else if ( i == "municipio"){
             objtToTable["Localidad"] = feature.attributes[i];
         }
         else if ( i == "html"){
            html = feature.attributes[i];
         }
    }
    if (html == null)
        html = Mapea.Util.objectToTable(objtToTable);
    

    // gets the x and y of the click event
    var clickedPixel = Mapea.Util.getClickedPixelFromEvent(window.event);
    var mapPopup = Mapea.Util.getPopupInPixel(mapVar, clickedPixel);
    if (mapPopup) {
        var htmlFinal = mapPopup.contentHTML;
        htmlFinal += "<div class=\"popup-info-separator\">Dirección</div>";
        htmlFinal += html;
        
        mapPopup.setContentHTML(htmlFinal);
        mapPopup.show();
    }
    else {
        mapPopup = new Mapea.Popup.FramedCloud("popup_feature",
                    feature.geometry.getBounds().getCenterLonLat(),
                    new OpenLayers.Size(400,300),
                    html,
                    null, true, function(evt) { 
                        evt.feature = feature;
                        Mapea.Util.unselectFeature(evt);    
        });
        mapPopup.pixelX = clickedPixel.x;
        mapPopup.pixelY = clickedPixel.y;

        feature.popup = mapPopup;
        mapVar.addPopup(mapPopup);
    }
}

/**
* Method: onFeatureUnselect
*
*/
function onFeatureUnselectCalle(feature) {
    map.removePopup(feature.popup);
    //feature.popup.destroy();
    //feature.popup = null;
}


function cleanStreetForm(){

    eraselayer(map);
    document.getElementById('idSelectTipoVia').selectedIndex="0";
    document.getElementById('idSelectMunicipio').selectedIndex="0";
    document.getElementById('idSelectProvincia').selectedIndex="0";
    document.getElementById('idInputTextVia').value='';
    document.getElementById('idInputTextNumero').value='';

}

function cleanOuForm(){

    eraselayer(map);
    document.getElementById('idSelectMunicipioSede').selectedIndex="0";
    document.getElementById('idSelectProvinciaSede').selectedIndex="0";
    document.getElementById('idInputTextSede').value='';

}

function cleanLocalityForm(){

    document.getElementById('idInputPoblacion').value='';

}

function cleanServiceForm(){

    eraselayer(map);
    document.getElementById('idSelectServicios').selectedIndex="0";
    document.getElementById('idSelectMunicipioServicio').selectedIndex="0";
    document.getElementById('idSelectProvinciaServicio').selectedIndex="0";

}

function cleanRoadForm(){

    eraselayer(map);
    document.getElementById('idInputCarreteras').value='';
    document.getElementById('idInputpk').value='';

}

function cleanSearchGeneralForm() {
    if ( (($.browser.msie) && (Autocomplete.field.css("background") != "") || !($.browser.msie)) ) {
            eraselayer(map);
            document.getElementById('idInputSearchCallejero').value='';
    }
}


function localizarConInformacionSigc(coords,nombre,localidad,tipoVia,numero){
    //document.getElementById("ventana_popup").style.display="none";

    if (coords == "," || coords == "0.0,0.0")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geométrica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars(sigcMap.map);
        drawmultipointSigc(coords,nombre,localidad,tipoVia,numero); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        sigcMap.map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}

function localizarConInformacionSedeSigc(coords,direccion,unidadorganizativa,nombre,numero){
    //document.getElementById("ventana_popup").style.display="none";

    if (coords == ",")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geométrica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars(sigcMap.map);
        drawmultipointSedeSigc(coords,direccion,unidadorganizativa,nombre,numero); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        sigcMap.map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}


function localizarConInformacionServiciosSigc(coords,alias,municipio,auxA,auxB){
    //document.getElementById("ventana_popup").style.display="none";

    if (coords == ",")
    {
        Mapea.Util.showErrorMessage("Calle sin referencia geométrica");
    }
    else{
        var coord = coords.split(",");
        var x = parseFloat(coord[0]);
        var y = parseFloat(coord[1]);
        
        var puntoX=coord[0];
        var puntoY=coord[1];
        
        initolvars(sigcMap.map);
        drawmultipointServicioSigc(coords,alias,municipio); //jenriquesoriano - para incluir archivo de utilidades de mapbuilder

        sigcMap.map.setCenter(new OpenLayers.LonLat(puntoX, puntoY), 14);//MDRC_PATCH_PINTADO_FIREFOX
    }
}


/*********************************************************************
** Funcion que centra el nucleo de poblacion obtenido en la busqueda
**********************************************************************/

function centrarNucleoSigc(extension){
    //document.getElementById("ventana_popup").style.display="none";

    if (extension == "" || extension == null)
    {
        Mapea.Util.showErrorMessage("No existe referencia geométrica");
    }
    else{
        var coords = extension.split(",");
        var minx = coords [1];
        var maxx = coords [0];
        var miny = coords [3];
        var maxy = coords [2];

        var boundsglobal = new OpenLayers.Bounds(minx, miny, maxx, maxy);
        
        sigcMap.map.zoomToExtent(boundsglobal);
    }
}


/*********************************************************************
** Se inicializan las variables y la capa vector para dibujar punto
**********************************************************************/

function drawmultipointSigc(strmultipoint,nombre,localidad,tipoVia,numero){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars(sigcMap.map);

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint,{"tipoVia": tipoVia, "nombreCalle": nombre, "numero": numero});

    Mapea.global.CDALayer.addFeatures([multipointfeature]);
}


function drawmultipointSedeSigc(strmultipoint,direccion,unidadorganizativa,nombre,numero){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars(sigcMap.map);

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint,{"nombre": nombre, "direccion": direccion, "numero": numero, "unidadorganizativa": unidadorganizativa});

    Mapea.global.CDALayer.addFeatures([multipointfeature]);


}


function drawmultipointServicioSigc(strmultipoint,alias,municipio){
    var pointlist = [];
    var arraypoint = strmultipoint.split(" ");
    var coord = null;
    var newpoint = null;
    var multipoint = null;
    var multipointfeature = null;

    initolvars(sigcMap.map);

    for(var p = 0; p < arraypoint.length; p++) {
        coord = arraypoint[p].split(",");
        newpoint = new OpenLayers.Geometry.Point(coord[0], coord[1]);
        pointlist.push(newpoint);
    }
    multipoint = new OpenLayers.Geometry.MultiPoint(pointlist);
    multipointfeature = Mapea.Util.drawStyledMPoint(multipoint,{"alias": alias, "municipio": municipio});

    Mapea.global.CDALayer.addFeatures([multipointfeature]);
}



/**
* Method: onFeatureSelect
*
*/
function onFeatureSelectCalleSigc(evt) {
    onFeatureSelectCalle(evt, sigcMap.map);
}

/**
* Method: onFeatureUnselect
*
*/
function onFeatureUnselectCalleSigc(feature) {
    sigcMap.map.removePopup(feature.popup);
    //feature.popup.destroy();
    //feature.popup = null;
}



/**
 * ===============================================
 */
var drawRestSearchControls = function(operationsParam) {
    // Tabs
    // Ocultamos tabs y mostramos solo la que interese
    $('#mapeaIdSearch li').hide();
    $('#mapeaIdSearch div[id*="tabs-"]').hide();

    var operations = operationsParam.split(",");

    var searchCallejeroOp = false;
    var searchStreetOp = false;
    var searchOldOp = false;
    for (var i=0, ctrlLen=operations.length; i< ctrlLen; i++) {
        var operation = operations[i].toLowerCase();
        if(operation == "searchstreet") {
            addTab("searchstreet");
            searchStreetOp = true;
        }
        else if(operation == "searchlocality") {
            addTab("searchlocality");
            searchOldOp = true;
        }
        else if(operation == "searchorganizationalunit") {
            addTab("searchou");
            searchOldOp = true;
        }
        else if(operation.indexOf("searchservice") != -1) {
            addTab("searchservices");
            searchOldOp = true;
        }
        else if(operation == "searchroad") {
            addTab("searchroad");
            searchOldOp = true;
        }
        else if (operation == "searchcallejero") {
            addTab("searchcallejero");
            searchCallejeroOp = true;
        }
        else {
            Mapea.Util.showErrorMessage("El valor del parámetro options no coincide con ninguno de los disponibles. Consulte el parámetro getOperationsAvailable");
        }
    }

    /* mobile devices just show searchcallejero or
     * searchstreet operations */
    if (Mapea.Util.isMobile) {
        if (searchCallejeroOp) {
            Mapea.Util.buildMobileSearch();
        }
        else if (searchStreetOp) {
            Mapea.SearchStreet.build();
        }
    }
    else if (searchCallejeroOp && !searchOldOp) {
        Mapea.Util.buildMobileSearch();
    }
    else if (searchStreetOp && !searchOldOp) {
        Mapea.SearchStreet.build();
    }
    // old operations
    else if (searchOldOp) {
        /* if loads old operations and searchcallejero
         * then initializes autocomplete and events */
        if (searchCallejeroOp) {
            Autocomplete.init('idInputSearchCallejero');
            $("#btn_help").click(function(event){
                event.preventDefault();
                if (animatingCallejeroHelp)
                    return false;
                
                animatingCallejeroHelp = true;
                
                if (!helpDisplayed) {
                    showHelpCallejero();
                    
                } else {
                    hideHelpCallejero();
                }
                
            });
        }

        $('#searchResult2').dialog({
            autoOpen: false,
            width: (jQuery.browser.msie)? 670 : 650,
            height: 'auto',
            modal: false,
            resizable: true,
            draggable: true,
            position: 'top',
            open : function( event, ui ) {
                $('.ui-dialog :button').blur();
            }
        });

        $('#mapeaIdSearch').tabs({ active: window.firstActiveTab});

        $('#mapeaIdSearch').on( "tabsactivate", function(event, ui) {
            $('#mapeaSearchToggle').removeClass("mapeaSearchToggle-closed");
            $('#mapeaSearchToggle').addClass("mapeaSearchToggle-open");
            window.lastSelectedTab = ui.newPanel;
        });
        
        $('#mapeaIdSearch').draggable({
            containment: 'window',
            start: function(event, ui) {
                Autocomplete.close();
                $("#helpdiv").css("display","none");
                helpDisplayed = false;
            }
        });

        $('#mapeaSearchToggle').click(function() {
            var open = $(this).hasClass("mapeaSearchToggle-open");
            if (!window.lastSelectedTab)
                window.lastSelectedTab = $("#mapeaIdSearch>.tab-content[aria-hidden='false']");
            
            if (open === true) {
                $(window.lastSelectedTab).hide();
                $(this).removeClass("mapeaSearchToggle-open");
                $(this).addClass("mapeaSearchToggle-closed");
            }
            else {
                $(window.lastSelectedTab).show();
                $(this).removeClass("mapeaSearchToggle-closed");
                $(this).addClass("mapeaSearchToggle-open");
            }

        });
        
        $("#mapeaIdSearch").css("display","");
        $("#mapeaIdSearch").css("position","absolute");
        
        loadTiposVia();
        loadTiposServicios();
        
        Mapea.Util.hasSearchPanel = true;
    }
};

function htmlMobileSearchCallback(html) {
    if (html && OpenLayers.Util.isArray(html)) {
        html = html.join("");
        OpenLayers.String.trim(html);
    }
    
    var resultsContainer = jQuery(".search-results");
    if (!html || (html.length == 0)) {
        var notFoundHtml = '<div class="no-result"><div class="geosearch-value">';
        notFoundHtml += 'No se han encontrado resultados.</div></div>';
        
        resultsContainer.html(notFoundHtml);
    }
    else {
        resultsContainer.html(html);
        $(".search-result").click(function(event) {
            var jResult = $(this);
            var featureHtml = jResult.html();
            var x, y;
            try {
                x = parseFloat(jResult.find("#x").val());
                y = parseFloat(jResult.find("#y").val());
            }
            catch(err) {}

            if (!x || !y) {
                var bbox = jResult.find("#bbox").val();
                if (bbox && bbox.length > 0) {
                    initolvars();
                    bbox = bbox.replace(/#/g, ",");
                    centrarNucleo(bbox);
                }
                else {
                    window.Mapea.Util.showErrorMessage("Este resultado no posee referencia geom\xE9trica");
                }
            }
            else {
                var newpoint = new OpenLayers.Geometry.Point(x, y);
                
                initolvars();
                var multipoint = new OpenLayers.Geometry.MultiPoint([newpoint]);
                var multipointfeature = Mapea.Util.drawStyledMPoint(multipoint, {"html" : featureHtml});
                Mapea.global.CDALayer.addFeatures([multipointfeature]);

                map.setCenter(new OpenLayers.LonLat(x, y), 14);//MDRC_PATCH_PINTADO_FIREFOX
            }
        });
    }
    resultsContainer.css("display", "block");
    jQuery(".search-results-wrapper").css("display", "");
}

function htmlGeocoderMobileProcessor(rawResponse, callback, municipio, provincia) {
    var html = "";

    var nombres = rawResponse.getElementsByTagName('multiRef');
    var divider = '<ul><li class="divider"></li></ul>';
    if ($.browser.msie) // IE
    {
        for(var i = 0; i < nombres.length; i++)
        {
            var args = nombres[i].childNodes;   
            var address = {
                similarity : args[8].text,
                streetName : args[9].text,
                streetNumber : args[10].text,
                streetType : args[11].text,
                coordX : args[0].text,
                coordY : args[1].text,
                rotulo : args[7].text,
                codINE : args[3].text,
                matchLevel : args[6].text,
                municipio : municipio,
                provincia : provincia
            };          

            html += divider + address2Html(address);
        }
    }
    else // FF, CH, OPERA ...
    {
        for(var i = 0; i < nombres.length; i++)
        {
            var args = nombres[i].childNodes;
            var address = {
                similarity : args[8].textContent,
                streetName : args[9].textContent,
                streetNumber : args[10].textContent,
                streetType : args[11].textContent,
                coordX : args[0].textContent,
                coordY : args[1].textContent,
                rotulo : args[7].textContent,
                codINE : args[3].textContent,
                matchLevel : args[6].textContent,
                municipio : municipio,
                provincia : provincia
            };

            html += divider + address2Html(address);
        }
    }
    callback(html);
}

function htmlSearchCallejeroMobileProcessor(query, rawResponse, callback) {
    var divider = '<ul><li class="divider"></li></ul>';

    var calculaExtension = function(rawResponse, referencia){
        var extension = "";
        $(rawResponse).find(referencia).each(function(){
            var childrens = $(this).children();
            extension = $(childrens[0]).text()+'#'+$(childrens[1]).text()+'#'+$(childrens[2]).text()+'#'+$(childrens[3]).text();
        });
        return extension;
    };

    var results = [];
    var rejects = [];
    var tags = rawResponse.getElementsByTagName('multiRef');
    var umbral = 0;

    if (query.indexOf(',') != -1)
        query = query.split(',')[0];

    for(var i=0, nl = tags.length; i<nl; i++)
    {   
        var similarity;
        var similarityString = '';
        var htmlResult = "";
        
        var type = tags[i].getAttribute('xsi:type');
        if (type == null) {
            type = tags[i].getAttribute('type');
        }
        if (type!=null)
        {
            var args = tags[i].childNodes;

            var ipuntos = type.indexOf(':');
            type = type.substring(ipuntos+1, type.length);

            var obj = null;
            switch(type)
            {
            case 'GeocoderCallejero':
                similarity = $(args[10]).text();
                similarityString = $(args[11]).text();
                var streetName = $(args[11]).text();
                var streetNumber = $(args[12]).text();
                var streetType = $(args[13]).text();
                var coordX = $(args[1]).text();
                var coordY = $(args[2]).text();
                var rotulo = $(args[9]).text();
                var codINE = $(args[4]).text();
                var provincia = $(args[0]).text();
                var municipio = $(args[5]).text();

                var fullAddress = "";
                if (streetType)
                    fullAddress += streetType + " ";

                if (streetName)
                    fullAddress += streetName;
                
                if (streetNumber && (streetNumber != "0"))
                    fullAddress += ", " + streetNumber;
                fullAddress = $.trim(fullAddress);
                
                var munProv = "";
                if (municipio)
                    munProv = municipio;
                
                if (provincia)
                    munProv += " (" + provincia + ")";

                similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
                var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, query);
                similarity = parseFloat(similarity) + points;

                htmlResult = divider + '<div class="search-result address">';
                htmlResult += '<div class="result-title"><span>' + fullAddress + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + codINE + '</span></div>';
                htmlResult += '<div class="result-subtitle important"><span>' + munProv + '</span></div>';
                htmlResult += '<input id="similarity" type="hidden" value="' + similarity + '" />';
                htmlResult += '<input id="x" type="hidden" value="' + coordX + '" />';
                htmlResult += '<input id="y" type="hidden" value="' + coordY + '" />';
                htmlResult += '</div></div>';
                break;

            case 'NucleoCallejero':
                if(args.length == 6)
                {
                    var extent = calculaExtension(rawResponse,$(args[0].attributes[0]).val());
                    var idnucleo = $(args[1]).text();
                    var municipio = $(args[2]).text();
                    var nombre = $(args[3]).text();
                    var provincia = $(args[4]).text();
                    var tipo = $(args[5]).text();
                    similarityString = $(args[3]).text();
                    similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
                    var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, query);
                    similarity = parseFloat(similarity) + points;

                    htmlResult = divider + '<div class="search-result locality">';
                    htmlResult += '<div class="result-title"><span>' + municipio + '</span></div>';
                    htmlResult += '<div class="result-subtitle"><span>' + provincia + '</span></div>';
                    htmlResult += '<div class="result-subtitle"><span>' + tipo + '</span></div>';
                    htmlResult += '<input id="similarity" type="hidden" value="' + similarity + '" />';
                    htmlResult += '<input id="bbox" type="hidden" value="' + extent + '" />';
                    htmlResult += '</div></div>';
                }
                break;

            case 'PuntoKilometrico':
                var carretera = $(args[0]).text();
                var pk = $(args[1]).text();
                var provincia = $(args[2]).text();
                var x = $(args[3]).text();
                var y = $(args[4]).text();
                similarityString = $(args[0]).text();
                similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
                var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, query);
                similarity = parseFloat(similarity) + points;

                htmlResult = divider + '<div class="search-result road">';
                htmlResult += '<div class="result-title"><span>' + carretera + '</span></div>';
                htmlResult += '<div class="result-subtitle important"><span>Km ' + pk + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + provincia + '</span></div>';
                htmlResult += '<input id="similarity" type="hidden" value="' + similarity + '" />';
                htmlResult += '<input id="x" type="hidden" value="' + x + '" />';
                htmlResult += '<input id="y" type="hidden" value="' + y + '" />';
                htmlResult += '</div></div>';
                break;

            case 'Servicio':
                var alias = $(args[0]).text();
                var municipio = $(args[1]).text();
                var x = $(args[2]).text();
                var y = $(args[3]).text();
                similarity = 1;

                htmlResult = divider + '<div class="search-result service">';
                htmlResult += '<div class="result-title"><span>' + alias + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + municipio + '</span></div>';
                htmlResult += '<input id="similarity" type="hidden" value="' + similarity + '" />';
                htmlResult += '<input id="x" type="hidden" value="' + x + '" />';
                htmlResult += '<input id="y" type="hidden" value="' + y + '" />';
                htmlResult += '</div></div>';
                break;

            case 'Sede':
                var direccion = $(args[0]).text();
                var municipio = $(args[1]).text();
                var nombre = $(args[2]).text();
                var numero = $(args[3]).text();
                var organismo = $(args[4]).text();
                var unidadorganizativa = $(args[5]).text();
                var x = $(args[6]).text();
                var y = $(args[7]).text();
                similarityString = $(args[2]).text();
                similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
                var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, query);
                similarity = parseFloat(similarity) + points;
                
                var fullAddress = direccion;
                if (numero && (numero != "0"))
                    fullAddress += ", " + numero;
                
                fullAddress = $.trim(fullAddress);

                htmlResult = divider + '<div class="search-result orgunit">';
                htmlResult += '<div class="result-title"><span>' + nombre + '</span></div>';
                htmlResult += '<div class="result-subtitle important"><span>' + organismo + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + fullAddress + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + unidadorganizativa + '</span></div>';
                htmlResult += '<div class="result-subtitle"><span>' + municipio + '</span></div>';
                htmlResult += '<input id="similarity" type="hidden" value="' + similarity + '" />';
                htmlResult += '<input id="x" type="hidden" value="' + x + '" />';
                htmlResult += '<input id="y" type="hidden" value="' + y + '" />';
                htmlResult += '</div></div>';
                break;
            }

            if (htmlResult && (htmlResult.length > 0))
            {
                if (similarity >= umbral)
                {
                    results.push(htmlResult);
                }
                else
                {
                    rejects.push(htmlResult);
                }
            }
        }
    }
    if (results.length == 0)
        results = new Array().concat(rejects);

    results.sort(function(a, b){
        var s1 = -1;
        var ss1 = $(a).find("#similarity").val();
        if (ss1)
            s1 = parseFloat(ss1);

        var s2 = -1;
        var ss2 = $(b).find("#similarity").val();
        if (ss2)
            s2 = parseFloat(ss2);

        if (s1 < s2) { return 1;}
        if (s1 > s2) { return -1;}
        return 0;
    });

    if (callback != null)
    {
        callback(results);
    }
}

function address2Html(address) {
    // full address
    var fullAddress = "";
    if (address.streetType)
        fullAddress += address.streetType + " ";

    if (address.streetName)
        fullAddress += address.streetName;
    
    if (address.streetNumber && (address.streetNumber != "0"))
        fullAddress += ", " + address.streetNumber;
    fullAddress = $.trim(fullAddress);

    // municipio provincia
    var munProv = "";
    if (address.municipio)
        munProv += address.municipio + " ";

    if (address.provincia)
        munProv += "(" + address.provincia + ")";
    munProv = $.trim(munProv);

    var html = '<div class="search-result address">';   
    html += '<div class="result-icon"></div>';
    html += '<div class="result-title"><span>' + fullAddress + '</span></div>';
    html += '<div class="result-subtitle"><span>' + address.codINE + '</span></div>';
    html += '<div class="result-subtitle"><span>' + munProv + '</span></div>';
    html += '<input id="x" type="hidden" value="' + address.coordX + '" />';
    html += '<input id="y" type="hidden" value="' + address.coordY + '" />';
    html += '</div></div>';
        
    return html;
}

function createPlaceHolderIE(id) {
    var jQueryElement = $("#"+id);
    var placeHolder = jQueryElement.attr("placeholder");
    jQueryElement.css("color","#999");
    jQueryElement.val(placeHolder);
    jQueryElement.focus(function(event){
        var oldVal = $(this).val();
        if (oldVal == placeHolder) {
            $(this).css("color","#000");
            $(this).val("");
        }
    });
    jQueryElement.blur(function(event){
        if ($(this).val().length <= 0) {
            $(this).css("color","#999");
            $(this).val(placeHolder);
        }
    });
}

function showHelpCallejero() {
    Mapea.Util.relocateHelpCallejero();
    $("#helpdiv").show("blind", null, 500,function(){ //done
        animatingCallejeroHelp = false;
    });
    helpDisplayed = true;
}

function hideHelpCallejero() {
    $("#helpdiv").hide("blind", null, 500,function(){ //done
        animatingCallejeroHelp = false;
    });
    helpDisplayed = false;
}

function addTab(tabClass){
    activeTabsClassName.push(tabClass);
    $('#mapeaIdSearch li[class*="control-'+tabClass+'"]').show();
    $('#mapeaIdSearch div[class*="control-'+tabClass+'"]').show();

    // Seleccionamos la pestanya correcta
    var tabs = $('#mapeaIdSearch').find("li");
    for(var i = 0; i < tabs.length; i++){
        if($(tabs[i]).hasClass("control-"+tabClass)){
            if(window.firstActiveTab == null){
                window.firstActiveTab = i;
            }
        }
    }
}

/**
 * Defines a the namespace CDA which will contain
 * the new search methods
 */
Mapea.CDA = {};

/**
 * Method: search
 * {function} Low level search method. It is an
 * static method that configures and executes a low level search
 * using the Geosearch REST API
 */
Mapea.CDA.geosearch = function(geosearchUrl, parameters, core, requestHandler, onSuccess, onError, executionScope) {
    var geosearchRequestUrl = geosearchUrl;
    if (core != null) {
        geosearchRequestUrl += "/" + core;
    }
    if (requestHandler != null) {
        geosearchRequestUrl += requestHandler;
    }
    var geosearchRequestParameters = OpenLayers.Util.getParameterString(parameters);
    var finalUrl = OpenLayers.Util.urlAppend(geosearchRequestUrl, geosearchRequestParameters) + "&mapeaop=geosearch";

    var requestParameters = {
        url: finalUrl,
        success: function(response) {
            var jsonFormat = new OpenLayers.Format.JSON();
            var jResponse;
            try {
                jResponse = jsonFormat.read(response.responseText);
                OpenLayers.Function.bind(onSuccess, executionScope)(jResponse);
            }
            catch(err) {
                onError(err);
            }
        },
        failure: onError,
        scope: executionScope,
        requestHeaders: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    };

    OpenLayers.Request.GET(requestParameters);
};

/**
 * Method: getLocalityFromCodINE
 * 
 * {function} Gets the locality and the city
 * from the specified COD INE
 */
Mapea.CDA.getLocalityFromCodINE = function(codine, onSuccess, onError) {
    callejeroProxy.comprobarCodIne(function(response) {
        var multiRefElements = response.getElementsByTagName("multiRef");
        if (multiRefElements.length > 0) {
            var multiRefElement = multiRefElements[0];
            var localityElement = multiRefElement.getElementsByTagName("nombreMunicipio")[0];
            var cityElement = multiRefElement.getElementsByTagName("nombreProvincia")[0];
            
            var locality = jQuery(localityElement).text();
            var city = jQuery(cityElement).text();
            
            onSuccess(locality, city);
        }
        else {
            headForm = jQuery(".search-form-locality").css("display", "none");
            onError("El código \"" + codine + "\" no pertenece a ningún municipio.");
        }
    }, onError, codine);
};
/*********************************************************************
** Funcion localizarCarreteras
**********************************************************************/


function localizarCarreteras(cadenaBusqueda, pk, srs, callback) {
	callejeroProxy.localizarCarreterasSrs(function(response){
		localizarCarreterasResponse(response, callback);
	}, errorCallback,cadenaBusqueda,pk,"1", "1", "-1", srs);
}


function localizarCarreterasResponse(response, callback) {

	var arrayRoads = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			var roadaux = new road();
			
			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes;
				
				
				roadaux.carretera = args[0].text;
				roadaux.pk = args[1].text;
			 roadaux.provincia = args[2].text;
			 roadaux.x = args[3].text;
			 roadaux.y = args[4].text;
				
				arrayRoads.push(roadaux);
				
			}
			else{
				var args = nombres[i].childNodes;
				
				roadaux.carretera = args[0].textContent;
				roadaux.pk = args[1].textContent;
			 roadaux.provincia = args[2].textContent;
			 roadaux.x = args[3].textContent;
			 roadaux.y = args[4].textContent;
				
				arrayRoads.push(roadaux);
				
		}
	}
	arrayRoads.sort(compareRoad);
	(callback && (callback(arrayRoads)));
}


/*********************************************************************
** Funcion obtenerTiposServicios
**********************************************************************/


function obtenerTiposServicios(){
  
  callejeroProxy.obtenerTiposServicios(obtenerTiposServiciosResponse,errorCallback);

}

function obtenerTiposServiciosResponse(response) {

	arrayTiposServicios = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			var args = nombres[i].childNodes;
			var tipSer = new tipoServicio();
			
			if(getBrowserName() == 'msie'){
				tipSer.codigo = args[0].text;
				tipSer.nombre = args[1].text;
				 arrayTiposServicios.push(tipSer);
			}
			else{
				tipSer.codigo = args[0].textContent;
				tipSer.nombre = args[1].textContent;
				arrayTiposServicios.push(tipSer);
		}
	}
	arrayTiposServicios.sort(compareSede);
}


/*********************************************************************
** Funcion obtenerTiposVias
**********************************************************************/

function obtenerTiposVia(){
  
  callejeroProxy.obtenerTiposVia(obtenerTiposViaResponse,errorCallback);

}

function obtenerTiposViaResponse(response) {

	arrayVias = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			
			if(getBrowserName() == 'msie'){
				arrayVias.push(nombres[i].text);
			}
			else{
				arrayVias.push(nombres[i].textContent);
		}
	}
	arrayVias.sort();

}


/*********************************************************************
** Funcion localizarNucleos
**********************************************************************/

function localizarNucleos(cadenaBusqueda, srs, callback) {
	callejeroProxy.localizarNucleosSrs(function(response) {
		localizarNucleosResponse(response, callback);
	}, errorCallback,cadenaBusqueda,"1", "1", "-1", srs);
}

function localizarNucleosResponse(response, callback) {

	var arrayNuc = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			var nucleop = new nucleo();
			
			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes;
				
				if(args.length == 5){
				nucleop.extent = calculaExtension(response,args[0].attributes[0].text);
				nucleop.idnucleo = args[1].text;
			 nucleop.municipio = args[2].text;
			 nucleop.nombre = args[3].text;
			 nucleop.tipo = args[4].text;
				
				arrayNuc.push(nucleop);
				}
			}
			else{
				var args = nombres[i].childNodes;
				
				if(args.length == 5){
				nucleop.extent = calculaExtension(response,args[0].attributes[0].textContent);
				nucleop.idnucleo = args[1].textContent;
			 nucleop.municipio = args[2].textContent;
			 nucleop.nombre = args[3].textContent;
			 nucleop.tipo = args[4].textContent;
				
				arrayNuc.push(nucleop);
				}
		}
	}
	arrayNuc.sort(compareSede);
	(callback && callback(arrayNuc));
}



function calculaExtension(response,referencia){

  var extension = "";
  var nombres = response.getElementsByTagName('multiRef');
	
	for(var i = 0; i < nombres.length; i++){
			
			if(getBrowserName() == 'msie'){
				var aux = "#" + nombres[i].attributes[0].nodeValue; 
				
				if(aux == referencia){
					 extension = nombres[i].childNodes[0].text + ',' + nombres[i].childNodes[1].text + ',' + nombres[i].childNodes[2].text + ',' + nombres[i].childNodes[3].text;
				}
				 
				
			}
			else{
				var aux = "#" + nombres[i].attributes[0].nodeValue; 
				
				if(aux == referencia){
					extension = nombres[i].childNodes[0].textContent + ',' + nombres[i].childNodes[1].textContent + ',' + nombres[i].childNodes[2].textContent + ',' + nombres[i].childNodes[3].textContent;
				}
	 }
	
	
}
	return extension;
}

/*********************************************************************
** Funcion obtenerMunicipios
**********************************************************************/


function obtenerMunicipios(codProv){

callejeroProxy.obtenerMunicipios(obtenerMunicipiosResponse,errorCallback,codProv);

}


function obtenerMunicipiosResponse(response) {

	arrayMun = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			var muni = new municipio();
			
			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes;
				muni.name = args[2].text;
				muni.codINE = args[0].text;
				
				arrayMun.push(muni);
			}
			else{
				var args = nombres[i].childNodes;
				muni.name = args[2].textContent;
				muni.codINE = args[0].textContent;
				
				arrayMun.push(muni);
		}
	}
	arrayMun.sort(compareMuni);

}


/*********************************************************************
** Funcion obtenerDirecciones
**********************************************************************/

function obtenerDirecciones(streetname, streetnumber, streettype, locality, srs, callback) {
	callejeroProxy.geocoderListSrs(function(response){
		obtenerDireccionesResponse(response, callback);
	}, errorCallback,streetname, streetnumber, streettype, locality, srs);

}


function obtenerDireccionesResponse(response, callback) {

	var arrayDir = [];
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			
			var direccion = new address();
			
			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes;
				direccion.similarity = args[8].text;
				direccion.streetName = args[9].text;
				direccion.streetNumber = args[10].text;
				direccion.streetType = args[11].text;
				direccion.coordX = args[0].text;
				direccion.coordY = args[1].text;
				direccion.rotulo = args[7].text;
				direccion.codINE = args[3].text;
				
				arrayDir.push(direccion);
			}
			else{
				var args = nombres[i].childNodes;
				direccion.similarity = args[8].textContent;
				direccion.streetName = args[9].textContent;
				direccion.streetNumber = args[10].textContent;
				direccion.streetType = args[11].textContent;
				direccion.coordX = args[0].textContent;
				direccion.coordY = args[1].textContent;
				direccion.rotulo = args[7].textContent;
				direccion.codINE = args[3].textContent;
				
				
				arrayDir.push(direccion);
		}
	}
	arrayDir.sort(compareSimil);

	(callback && callback(arrayDir));

}

function obtenerDireccionesResponseAsync(response, callback) {

	var arrayResult = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){

			var direccion = new address();

			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes;
				direccion.similarity = args[8].text;
				direccion.streetName = args[9].text;
				direccion.streetNumber = args[10].text;
				direccion.streetType = args[11].text;
				direccion.coordX = args[0].text;
				direccion.coordY = args[1].text;
				direccion.rotulo = args[7].text;
				direccion.codINE = args[3].text;
				//MJMJ_20120510_AIADIDO NUEVO CAMPO PARA MONITORIZAR LA SEMEJANZA
				direccion.matchLevel = args[6].text;

				arrayResult.push(direccion);
			}
			else{
				var args = nombres[i].childNodes;
				direccion.similarity = args[8].textContent;
				direccion.streetName = args[9].textContent;
				direccion.streetNumber = args[10].textContent;
				direccion.streetType = args[11].textContent;
				direccion.coordX = args[0].textContent;
				direccion.coordY = args[1].textContent;
				direccion.rotulo = args[7].textContent;
				direccion.codINE = args[3].textContent;
				//MJMJ_20120510_AIADIDO NUEVO CAMPO PARA MONITORIZAR LA SEMEJANZA
				direccion.matchLevel = args[6].textContent;

				arrayResult.push(direccion);
		}
	}
	arrayResult.sort(compareSimil);
	callback(arrayResult);
}

/*********************************************************************
** Funcion localizarSedes
**********************************************************************/

function localizarSedes(codine, cadenaBusqueda, codProv, srs, callback){

	  callejeroProxy.localizarSedesSrs(function(response){
	  	localizarSedesResponse(response, callback);
	  }, errorCallback, codine, cadenaBusqueda, codProv, "1", "1", "-1", srs);

}

function localizarSedesResponse(response, callback){

	var arraySedes = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
			
		var sed = new sede();
		
		if(getBrowserName() == 'msie')
		{
			var args = nombres[i].childNodes; 
			sed.direccion = args[0].text;
			sed.municipio = args[1].text;
			sed.nombre = args[2].text;
			sed.numero = args[3].text;;
			sed.organismo = args[4].text;
			sed.unidadorganizativa = args[5].text;
			sed.x = args[6].text;
			sed.y = args[7].text;
			arraySedes.push(sed);
		}
	  	else{
			var args = nombres[i].childNodes;
			sed.direccion = args[0].textContent;
			sed.municipio = args[1].textContent;
		 	sed.nombre = args[2].textContent;
		 	sed.numero = args[3].textContent;
		 	sed.organismo = args[4].textContent;
		 	sed.unidadorganizativa = args[5].textContent;
		 	sed.x = args[6].textContent;
		 	sed.y = args[7].textContent;
		 	arraySedes.push(sed);
	  }

	}
	arraySedes.sort(compareSede);
	(callback && callback(arraySedes));
}


/*********************************************************************
** Funcion localizarServicios
**********************************************************************/


function localizarServicios(codine, codTipoServicio, codProv, srs, callback) {
	callejeroProxy.localizarServiciosSrs(function(response){
		localizarServiciosResponse(response, callback);
	}, errorCallback, codine, codTipoServicio, codProv, "1", "1", "-1", srs);
}

function localizarServiciosResponse(response, callback) {


	var arrayServicios = new Array();
	var nombres = response.getElementsByTagName('multiRef');
	 
	for(var i = 0; i < nombres.length; i++){
			
			var ser = new servicio();
			
			if(getBrowserName() == 'msie'){
				var args = nombres[i].childNodes; 
				  ser.alias = args[0].text;
			 ser.municipio = args[1].text;
			 ser.x = args[2].text;
			 ser.y = args[3].text;
			arrayServicios.push(ser);
			}
		  else{
				var args = nombres[i].childNodes;
				ser.alias = args[0].textContent;
			 ser.municipio = args[1].textContent;
			 ser.x = args[2].textContent;
			 ser.y = args[3].textContent;
			arrayServicios.push(ser);
		  }

		}
	  arrayServicios.sort(compareServicios);
	  (callback && (callback(arrayServicios)));
}

function busquedaGeneral(query, fnCb, processorCb, codIne, srs) {
	var callback = function(rawResults) {
		var processor = processorCb || busquedaGeneralResponse;
		processor(query, rawResults, fnCb);
	};

	callejeroProxy.buscarCallejeroSrsMunicipio(callback,function(errorNum, errorText) {
			Mapea.Util.showErrorMessage(errorText);
	}, query, codIne, srs);
}

function busquedaGeneralResponse(query, response, callback) {
	
	var calculaExtension = function(response, referencia){
		var extension = "";
		$(response).find(referencia).each(function(){
			extension = $($(this).children()[0]).text()+','+$($(this).children()[1]).text()+','+$($(this).children()[2]).text()+','+$($(this).children()[3]).text();
		});
		return extension;
	};

	var results = [];
	var rejects = [];
	var tags = response.getElementsByTagName('multiRef');
	var browserName = getBrowserName();
	var similarityString = '';
	var umbral = 0;

	if (query.indexOf(',') != -1)
		query = query.split(',')[0];

	for(var i=0, nl = tags.length; i<nl; i++)
	{
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
				obj = new address();
				obj.similarity = $(args[10]).text();
				obj.streetName = $(args[11]).text();
				obj.streetNumber = $(args[12]).text();
				obj.streetType = $(args[13]).text();
				obj.coordX = $(args[1]).text();
				obj.coordY = $(args[2]).text();
				obj.rotulo = $(args[9]).text();
				obj.codINE = $(args[4]).text();
				obj.provincia = $(args[0]).text();
				obj.municipio = $(args[5]).text();
				similarityString = $(args[11]).text();
				break;

			case 'NucleoCallejero':
				obj = new nucleo();
				if(args.length == 6)
				{
					obj.extent = calculaExtension(response,$(args[0].attributes[0]).val());
					obj.idnucleo = $(args[1]).text();
					obj.municipio = $(args[2]).text();
					obj.nombre = $(args[3]).text();
					obj.provincia = $(args[4]).text();
					obj.tipo = $(args[5]).text();

					similarityString = $(args[3]).text();//+" "+$(args[2]).text()+" "+$(args[4]).text();
					obj.similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
				}
				break;

			case 'PuntoKilometrico':
				obj = new road();
				obj.carretera = $(args[0]).text();
				obj.pk = $(args[1]).text();
				obj.provincia = $(args[2]).text();
				obj.x = $(args[3]).text();
				obj.y = $(args[4]).text();

				similarityString = $(args[0]).text();//+" "+$(args[2]).text();
				obj.similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
				break;

			case 'Servicio':
				obj = new servicio();
				obj.alias = $(args[0]).text();
				obj.municipio = $(args[1]).text();
				obj.x = $(args[2]).text();
				obj.y = $(args[3]).text();
				/**MJMJ Si encontramos servicio, lo mostramos siempre
					 var similarityString = $(args[0]).text();//+" "+$(args[1]).text();
						obj.similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');*/
				obj.similarity = 1;
				break;

			case 'Sede':
				obj = new sede();
				obj.direccion = $(args[0]).text();
				obj.municipio = $(args[1]).text();
				obj.nombre = $(args[2]).text();
				obj.numero = $(args[3]).text();
				obj.organismo = $(args[4]).text();
				obj.unidadorganizativa = $(args[5]).text();
				obj.x = $(args[6]).text();
				obj.y = $(args[7]).text();

				similarityString = $(args[2]).text();//+" "+$(args[5]).text()+" "+$(args[1]).text();
				obj.similarity = LetterPairSimilarity.calculaParecido(query, similarityString, '', '', '', '');
				break;
			}

			if (obj!=null) {

				/**MJMJ_AUMENTA SIMILITUD SI CONTIENE LA PALABRA ****/
				if (similarityString != null)
				{
					var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, query);
					obj.similarity = parseFloat(obj.similarity) + points;
				}
				/****************************************/

				if (obj.similarity >= umbral) {
					results.push(obj);
				}
				else {
					rejects.push(obj);
				}
			}
		}
	}
	if (results.length == 0)
		results = new Array().concat(rejects);

	results.sort(compareObj);

	if (callback != null)
	{
		callback(results);
	}
}

function errorCallback(errorNum, errorText){

	Mapea.Util.showErrorMessage(errorText);
	
}


/*********************************************************************
** Funcion constructora tipos de datos
**********************************************************************/

function address(){

 this.streetName = "";
 this.streetNumber = "";
 this.similarity = "";
 this.streetType = "";
 this.coordX = "";
 this.coordY = "";
 this.rotulo = "";
 this.codINE = "";

}


function municipio(){

	 this.name = "";
	 this.codINE = "";

}

function sede(){

	this.direccion = "";
	this.municipio = "";
	this.nombre = "";
	this.numero = "";
	this.organismo = "";
	this.unidadorganizativa = "";
	this.x = "";
	this.y = "";

}


function tipoServicio(){

	this.codigo = "";
	this.nombre = "";

}


function nucleo(){

	this.extent = "";
	this.idnucleo = "";
	this.municipio = "";
	this.nombre = "";
	this.tipo = "";
}

function servicio(){
	
	this.alias = "";
	this.municipio = "";
	this.x = "";
	this.y = "";

}

function road(){

	this.carretera = "";
	this.pk = "";
	this.provincia = "";
	this.x = "";
	this.y = ""; 
 
}
/*********************************************************************
** Funcion comparadora para ordenar arrays de resultados
**********************************************************************/

function compareMuni(a, b) {

		var nameA = a.name.toLowerCase( );
		var nameB = b.name.toLowerCase( );
		if (nameA < nameB) {return -1}
		if (nameA > nameB) {return 1}
		return 0;
}


function compareSede(a, b) {
	
		var nameA = a.nombre.toLowerCase( );
		var nameB = b.nombre.toLowerCase( );
		if (nameA < nameB) {return -1}
		if (nameA > nameB) {return 1}
		return 0;
}

function compareServicios(a, b) {
	
		var nameA = a.alias.toLowerCase( );
		var nameB = b.alias.toLowerCase( );
		if (nameA < nameB) {return -1}
		if (nameA > nameB) {return 1}
		return 0;
}

function compareSimil(a, b) {

	var comp = b.similarity - a.similarity;
	
	if (comp == 0){
	  
	  var nameA = a.streetName.toLowerCase( );
	  var nameB = b.streetName.toLowerCase( );
		if (nameA < nameB) {return -1}
		if (nameA > nameB) {return 1}
		return 0;
	}
	
	else {
	
		return comp;
	}

}

function compareRoad(a, b) {
	
		var nameA = a.carretera.toLowerCase( );
		var nameB = b.carretera.toLowerCase( );
		if (nameA < nameB) {return -1}
		else if (nameA > nameB) {return 1}
		else
		{ return a.pk - b.pk} 
}


/*********************************************************************
** Funcion que comprueba el nombre del navegador.
**********************************************************************/
function getBrowserName(){
	var browserName="";
	var ua = navigator.userAgent.toLowerCase();
	
	if(ua.indexOf("opera") != -1) {
		browserName="opera";
	}else if(ua.indexOf("msie")!=-1){
		browserName="msie";
	}else if(ua.indexOf("safari")!=-1){
		browserName="safari";
	}else if(ua.indexOf("mozilla")!=-1){
		if(ua.indexOf("firefox")!=-1){
			browserName="firefox";
		}else{	
			browserName="mozilla";
		}
	}
	
	return browserName;
}
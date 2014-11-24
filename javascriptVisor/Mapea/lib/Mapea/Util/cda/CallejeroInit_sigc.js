/*********************************************************************
** Funcion localizarCarreteras
**********************************************************************/
var callejeroInitCb = null;

function autocompleterSigc(cadena, limit, cb, locality)
{
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;

	callejeroProxy.autocompletarDireccionMunicipio(autocompleterSigcResponse, errorCallback, cadena, limit, locality);
}

function autocompleterSigcResponse(response)
{
	var tags = response.getElementsByTagName('autocompletarDireccionMunicipioReturn');

	sigcMap.arrayAuto = new Array();
	var browserName = getBrowserName();

	for(var i=0, nl = tags.length; i<nl; i++)
	{
		var type = tags[i].getAttribute('xsi:type');
		if (type == null) {
			type = tags[i].getAttribute('type');
		}
		if(type!=null)
		{
			var ipuntos = type.indexOf(':');
			type = type.substring(ipuntos+1, type.length);

			if (type!=null && type == 'string')
			{
				var street = "";

				if(browserName == 'msie')
				{
					street = tags[i].text;
				}
				else
				{
					street = tags[i].textContent;
				}

				if (street!=null)
					sigcMap.arrayAuto.push(street);
			}
		}
	}

   if(callejeroInitCb!=null)
   {
	   eval(callejeroInitCb)(sigcMap.arrayAuto);
	   callejeroInitCb = null;
   }
}

function busquedaCallejeroSigc(cadena, cb, locality, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;

	sigcMap.querySearch = cadena;
	callejeroProxy.buscarCallejeroSrsMunicipio(busquedaCallejeroSigcResponse,errorCallback, cadena, locality, srs);
}

function busquedaCallejeroSigcResponse(response) {

	sigcMap.arrayBC = new Array();
	var rejects = new Array();
	var tags = response.getElementsByTagName('multiRef');
	var browserName = getBrowserName();
	var querySearchString = sigcMap.querySearch;
	var similarityString = '';
	var umbral = 0;

	if (window.similarityUmbral != null)
		umbral = window.similarityUmbral;


	if (querySearchString.indexOf(',') != -1)
		querySearchString = querySearchString.split(',')[0];

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

			if(browserName == 'msie')
			{
				switch(type)
				{
				case 'GeocoderCallejero':
					obj = new address();
					obj.similarity = args[10].text;
			   	 	obj.streetName = args[11].text;
			   	 	obj.streetNumber = args[12].text;
			   	 	obj.streetType = args[13].text;
			   	 	obj.coordX = args[1].text;
			   	 	obj.coordY = args[2].text;
			   	 	obj.rotulo = args[9].text;
			   	 	obj.codINE = args[4].text;
			   	 	obj.provincia = args[0].text;
			   	 	obj.municipio = args[5].text;
			   	 	similarityString = args[11].text;
					break;

				case 'NucleoCallejero':
					obj = new nucleo();
					if(args.length == 6)
		   	 		{
		   	 			obj.extent = calculaExtension(response,args[0].attributes[0].text);
				   	 	obj.idnucleo = args[1].text;
			   	 		obj.municipio = args[2].text;
			   	 		obj.nombre = args[3].text;
			   	 		obj.provincia = args[4].text;
			   	 		obj.tipo = args[5].text;

			   	 		similarityString = args[3].text;//+" "+args[2].text+" "+args[4].text;
			   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');
		   	 		}
					break;

				case 'PuntoKilometrico':
					obj = new road();
					obj.carretera = args[0].text;
					obj.pk = args[1].text;
					obj.provincia = args[2].text;
					obj.x = args[3].text;
					obj.y = args[4].text;

					similarityString = args[0].text;//+" "+args[2].text;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');

					break;

				case 'Servicio':
					obj = new servicio();
					obj.alias = args[0].text;
					obj.municipio = args[1].text;
					obj.x = args[2].text;
					obj.y = args[3].text;
					/**MJMJ Si encontramos servicio, lo mostramos siempre
					var similarityString = args[0].text;//+" "+args[1].text;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');	*/

					obj.similarity = 1;

					break;

				case 'Sede':
					obj = new sede();
					obj.direccion = args[0].text;
					obj.municipio = args[1].text;
					obj.nombre = args[2].text;
					obj.numero = args[3].text;;
					obj.organismo = args[4].text;
					obj.unidadorganizativa = args[5].text;
					obj.x = args[6].text;
					obj.y = args[7].text;

					similarityString = args[2].text;//+" "+args[5].text+" "+args[1].text;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');

					break;
				}
			}
			else
			{
				switch(type)
				{
				case 'GeocoderCallejero':
					obj = new address();
					obj.similarity = args[10].textContent;
			   	 	obj.streetName = args[11].textContent;
			   	 	obj.streetNumber = args[12].textContent;
			   	 	obj.streetType = args[13].textContent;
			   	 	obj.coordX = args[1].textContent;
			   	 	obj.coordY = args[2].textContent;
			   	 	obj.rotulo = args[9].textContent;
			   	 	obj.codINE = args[4].textContent;
			   	 	obj.provincia = args[0].textContent;
			   	 	obj.municipio = args[5].textContent;
			   	 	similarityString = args[11].textContent;
					break;

				case 'NucleoCallejero':
					obj = new nucleo();
					if(args.length == 6)
		   	 		{
						obj.extent = calculaExtension(response,args[0].attributes[0].textContent);
				   	 	obj.idnucleo = args[1].textContent;
			   	 		obj.municipio = args[2].textContent;
			   	 		obj.nombre = args[3].textContent;
			   	 		obj.provincia = args[4].textContent;
			   	 		obj.tipo = args[5].textContent;

				   	 	similarityString = args[3].textContent;//+" "+args[2].textContent+" "+args[4].textContent;
			   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');
		   	 		}
					break;

				case 'PuntoKilometrico':
					obj = new road();
					obj.carretera = args[0].textContent;
			   	 	obj.pk = args[1].textContent;
			   	 	obj.provincia = args[2].textContent;
			   		obj.x = args[3].textContent;
			   		obj.y = args[4].textContent;

			   		similarityString = args[0].textContent;//+" "+args[2].textContent;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');
					break;

				case 'Servicio':
					obj = new servicio();
					obj.alias = args[0].textContent;
				    obj.municipio = args[1].textContent;
				    obj.x = args[2].textContent;
				    obj.y = args[3].textContent;
				    /**MJMJ Si encontramos servicio, lo mostramos siempre
				    var similarityString = args[0].textContent;//+" "+args[1].textContent;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');*/
				    obj.similarity = 1;
				    break;

				case 'Sede':
					obj = new sede();
					obj.direccion = args[0].textContent;
				    obj.municipio = args[1].textContent;
				    obj.nombre = args[2].textContent;
				    obj.numero = args[3].textContent;
				    obj.organismo = args[4].textContent;
				    obj.unidadorganizativa = args[5].textContent;
				    obj.x = args[6].textContent;
				    obj.y = args[7].textContent;

				    similarityString = args[2].textContent;//+" "+args[5].textContent+" "+args[1].textContent;
		   	 		obj.similarity = LetterPairSimilarity.calculaParecido(querySearchString, similarityString, '', '', '', '');
				    break;
				}
			}

			if (obj!=null) {

				/**MJMJ_AUMENTA SIMILITUD SI CONTIENE LA PALABRA ****/
				if (similarityString != null)
				{
					var points = LetterPairSimilarity.calculaParecidoContenido(similarityString, querySearchString);
					obj.similarity = parseFloat(obj.similarity) + points;
				}
				/****************************************/

				if (obj.similarity >= umbral) {
					sigcMap.arrayBC.push(obj);
				}
				else {
					rejects.push(obj);
				}
			}
		}
	}
	if (sigcMap.arrayBC.length == 0)
		sigcMap.arrayBC = new Array().concat(rejects);

	sigcMap.arrayBC.sort(compareObj);
	sigcMap.querySearch = null;

   if(callejeroInitCb!=null)
   {
	   eval(callejeroInitCb)(sigcMap.arrayBC);
	   callejeroInitCb = null;
   }

}

var geosearchSigc = function(cadena, start, limit, core, requestHandler, srs, locality, threshold, callback) {
	sigcMap.querySearch = cadena;
	callejeroProxy.geosearch(function(response){
		geosearchSigcResponse(response, callback);
	}, errorCallback, cadena, start, limit, core, requestHandler, srs, locality, threshold);
};

var geosearchSigcResponse = function(response, callback) {
	
	// intialize the geosearchResult
	var geosearchResult = {
		textResults : [],
		spatialResults : [],
		referenceResults : []
	};
	
	var jxml = $(response);
	
	// status code
	var statusCodeTags = jxml.find("statusCode");
	if (statusCodeTags.length > 0)
		geosearchResult.statusCode = $(statusCodeTags[0]).text();
	
	// spatial
	var spatialTags = jxml.find("spatial");
	if (spatialTags.length > 0)
		geosearchResult.spatial = ($(spatialTags[0]).text().trim().toLowerCase() == "true");
	
	// textNumFound
	var textNumFoundTags = jxml.find("textNumFound");
	if (textNumFoundTags.length > 0)
		geosearchResult.textNumFound = $(textNumFoundTags[0]).text();
	
	// spatialNumFound
	var spatialNumFoundTags = jxml.find("spatialNumFound");
	if (spatialNumFoundTags.length > 0)
		geosearchResult.spatialNumFound = $(spatialNumFoundTags[0]).text();
	
	// referenceNumFound
	var referenceNumFoundTags = jxml.find("referenceNumFound");
	if (referenceNumFoundTags.length > 0)
		geosearchResult.referenceNumFound = $(referenceNumFoundTags[0]).text();

	var textResultsTags = jxml.find("textResults");
	var spatialResultsTags = jxml.find("spatialResults");
	var referenceResultsTags = jxml.find("referenceResults");

	// get the hrefs of textResults
	var textHrefs = [];
	for (var i=0,ilength=textResultsTags.length; i<ilength; i++)
	{
		var hrefTag = $(textResultsTags[i]).attr("href");
		if (  hrefTag && (hrefTag != null) && (hrefTag != "") )
		{
			textHrefs.push(hrefTag);
		}
	}		

	// get the hrefs of spatialResults
	var spatialHrefs = [];
	for (var i=0,ilength=spatialResultsTags.length; i<ilength; i++)
	{
		var hrefTag = $(spatialResultsTags[i]).attr("href");
		if (  hrefTag && (hrefTag != null) && (hrefTag != "") )
		{
			spatialHrefs.push(hrefTag);
		}
	}

	// get the hrefs of referenceResults
	var referenceHrefs = [];
	for (var i=0,ilength=referenceResultsTags.length; i<ilength; i++)
	{
		var hrefTag = $(referenceResultsTags[i]).attr("href");
		if (  hrefTag && (hrefTag != null) && (hrefTag != "") )
		{
			referenceHrefs.push(hrefTag);
		}
	}

	// build the textResults
	geosearchResult.textResults = getGeodocumentsByHrefs(textHrefs, jxml);	
	
	// build the spatialResults
	geosearchResult.spatialResults = getGeodocumentsByHrefs(spatialHrefs, jxml);
	
	// build the referenceResults
	geosearchResult.referenceResults = getGeodocumentsByHrefs(referenceHrefs, jxml);
	
	// execute callback
	(callback && callback.apply(this, [geosearchResult]));
};

/*private*/
function getGeodocumentsByHrefs(hrefs, jxml) {
	
	var geoDocuments = [];
	
	// build the results
	for (var i=0,ilength=hrefs.length; i<ilength; i++)
	{
		//var geoDocument = {};
		var geoDocument = {
			keys: [],
			values: [],
			geometric: false
		};
		
		// get the id
		var href = hrefs[i];

		// get the geometric attribute and the fields of the result
		geoDocument.geometric = jxml.find(href).find("geometric").text();
		
		var fieldsHref = jxml.find(href).find("fields").attr("href");
		
		var keys = jxml.find(fieldsHref).find("item").find("key");
		var values = jxml.find(fieldsHref).find("item").find("value");
		
		for (var e=0,elength=keys.length; e<elength; e++)
		{
			var key = $(keys[e]).text();
			var value = $(values[e]).text();
			
			/* más ineficiente el recorrerlo */
			// geoDocument[keyTag.textContent] = valueTag.textContent;
			geoDocument.keys.push(key);
			geoDocument.values.push(value);
		}

		// add the geoDocument into geosearchResult
		geoDocuments.push(geoDocument);
	}
	
	return geoDocuments;
}


function localizarCarreterasSigc(cadenaBusqueda, pk, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
	callejeroProxy.localizarCarreterasSrs(localizarCarreterasSigcResponse,errorCallback,cadenaBusqueda,pk,"1", "1", "-1", srs);
}


function localizarCarreterasSigcResponse(response) {

	sigcMap.arrayRoads = new Array();
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

   	 		sigcMap.arrayRoads.push(roadaux);

   	 	}
   	 	else{
   	 		var args = nombres[i].childNodes;

   	 		roadaux.carretera = args[0].textContent;
   			roadaux.pk = args[1].textContent;
		    roadaux.provincia = args[2].textContent;
		    roadaux.x = args[3].textContent;
		    roadaux.y = args[4].textContent;

   	 		sigcMap.arrayRoads.push(roadaux);

		}
	}
   sigcMap.arrayRoads.sort(compareRoad);

   if(callejeroInitCb!=null)
   {
	   eval(callejeroInitCb)(sigcMap.arrayRoads);
	   callejeroInitCb = null;
   }

}
/*********************************************************************
** Funcion obtenerTiposServicios
**********************************************************************/


function obtenerTiposServiciosSigc(callback){

  callejeroProxy.obtenerTiposServicios(function(response){
  	obtenerTiposServiciosResponseSigc(response, callback);
  }, errorCallback);

}

function obtenerTiposServiciosResponseSigc(response, callback) {

	sigcMap.arrayServicesType = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
   	 	var args = nombres[i].childNodes;
   	 	var tipSer = new tipoServicio();

   	 	if(getBrowserName() == 'msie'){
   	 		tipSer.codigo = args[0].text;
   	 		tipSer.nombre = args[1].text;
   	 	    sigcMap.arrayServicesType.push(tipSer);
   	 	}
   	 	else{
   	 		tipSer.codigo = args[0].textContent;
   	 		tipSer.nombre = args[1].textContent;
   	 		sigcMap.arrayServicesType.push(tipSer);
		}
	}
	sigcMap.arrayServicesType.sort(compareSede);
	(callback && callback(sigcMap.arrayServicesType));
}


/*********************************************************************
** Funcion obtenerTiposVias
**********************************************************************/

function obtenerTiposViaSigc(callback){

  callejeroProxy.obtenerTiposVia(function(response){
  	obtenerTiposViaResponseSigc(response, callback);
  }, errorCallback);

}

function obtenerTiposViaResponseSigc(response, callback) {

	sigcMap.arrayRoadsType = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){

   	 	if(getBrowserName() == 'msie'){
   	 		sigcMap.arrayRoadsType.push(nombres[i].text);
   	 	}
   	 	else{
   	 		sigcMap.arrayRoadsType.push(nombres[i].textContent);
		}
	}
	sigcMap.arrayRoadsType.sort();
	(callback && callback(sigcMap.arrayRoadsType));
}


/*********************************************************************
** Funcion localizarNucleos
**********************************************************************/

function localizarNucleosSigc(cadenaBusqueda, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
	callejeroProxy.localizarNucleosSrs(localizarNucleosResponseSigc,errorCallback,cadenaBusqueda,"1", "1", "-1", srs);

}

function localizarNucleosResponseSigc(response) {

	sigcMap.arrayLocality = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
   	 	var nucleop = new nucleo();

   	 	if(getBrowserName() == 'msie'){
   	 		var args = nombres[i].childNodes;

   	 		if(args.length == 5){
   	 		nucleop.extent = args[0].text;
   			nucleop.idnucleo = args[1].text;
		    nucleop.municipio = args[2].text;
		    nucleop.nombre = args[3].text;
		    nucleop.tipo = args[4].text;

   	 		sigcMap.arrayLocality.push(nucleop);
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

   	 		sigcMap.arrayLocality.push(nucleop);
   	 		}
		}
	}
   sigcMap.arrayLocality.sort(compareSede);

   if(callejeroInitCb!=null)
   {
	   eval(callejeroInitCb)(sigcMap.arrayLocality);
	   callejeroInitCb = null;
   }

}



function calculaExtension(response,referencia){

  var extension = "";
  var nombres = response.getElementsByTagName('multiRef');
  var browserName = getBrowserName();
  var targetId = referencia.substring(1, referencia.length);

  for(var i = 0, nl = nombres.length; i < nl; i++)
  {
	  var currentId = "";
	  if(browserName == 'msie') {
		  if(nombres[i].getAttribute('id')!= null)
		  {
			  currentId = nombres[i].getAttribute('id');
		  }
	  }
	  else {
		  if(nombres[i].attributes['id']!= null)
		  {
			  currentId = nombres[i].attributes['id'];
		  }
	  }

	  if(browserName == 'msie')
	  {
		  if(currentId == targetId)
		  {
			extension = nombres[i].childNodes[0].text + ',' + nombres[i].childNodes[1].text + ',' + nombres[i].childNodes[2].text + ',' + nombres[i].childNodes[3].text;
		  }
	  }
	  else
	  {
		  if(currentId.textContent == targetId)
		  {
			extension = nombres[i].childNodes[0].textContent + ',' + nombres[i].childNodes[1].textContent + ',' + nombres[i].childNodes[2].textContent + ',' + nombres[i].childNodes[3].textContent;
		  }
	  }
  }
   return extension;
}

/*********************************************************************
** Funcion obtenerMunicipios
**********************************************************************/


function obtenerMunicipiosSigc(codProv, cb){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
	callejeroProxy.obtenerMunicipios(obtenerMunicipiosResponseSigc,errorCallback,codProv);
}


function obtenerMunicipiosResponseSigc(response) {

	sigcMap.arrayLocFromProv = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
   	 	var muni = new municipio();

   	 	if(getBrowserName() == 'msie'){
   	 		var args = nombres[i].childNodes;
   	 		muni.name = args[2].text;
   	 		muni.codINE = args[0].text;

   	 		sigcMap.arrayLocFromProv.push(muni);
   	 	}
   	 	else{
   	 		var args = nombres[i].childNodes;
   	 		muni.name = args[2].textContent;
   	 		muni.codINE = args[0].textContent;

   	 		sigcMap.arrayLocFromProv.push(muni);
		}
	}
	sigcMap.arrayLocFromProv.sort(compareMuni);

	if(callejeroInitCb!=null)
	{
		eval(callejeroInitCb)(sigcMap.arrayLocFromProv);
		callejeroInitCb = null;
	}

}

/*********************************************************************
** Funcion obtenerCodINE
**********************************************************************/


function obtenerCodINESigc(successCallback, errCallback, provincia, municipio){

	callejeroProxy.obtenerCodINE(successCallback,errCallback,provincia,municipio);
}

/*function obtenerCodINEResponseSigc(response) {

	sigcMap.arrayLocFromProv = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){
   	 	var muni = new municipio();

   	 	if(getBrowserName() == 'msie'){
   	 		var args = nombres[i].childNodes;
   	 		muni.name = args[2].text;
   	 		muni.codINE = args[0].text;

   	 		sigcMap.arrayLocFromProv.push(muni);
   	 	}
   	 	else{
   	 		var args = nombres[i].childNodes;
   	 		muni.name = args[2].textContent;
   	 		muni.codINE = args[0].textContent;

   	 		sigcMap.arrayLocFromProv.push(muni);
		}
	}
	sigcMap.arrayLocFromProv.sort(compareMuni);

}*/

/*********************************************************************
** Funcion obtenerDirecciones
**********************************************************************/

function obtenerDireccionesSigc(streetname, streetnumber, streettype, locality, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
	
	callejeroProxy.geocoderListSrs(obtenerDireccionesResponseSigc,errorCallback,streetname, streetnumber, streettype, locality, srs);
}


function obtenerDireccionesResponseSigc(response) {

	sigcMap.arrayStreet = new Array();
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

   	 		sigcMap.arrayStreet.push(direccion);
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


   	 		sigcMap.arrayStreet.push(direccion);
		}
	}
	sigcMap.arrayStreet.sort(compareSimil);

	if(callejeroInitCb!=null)
	{
	   eval(callejeroInitCb)(sigcMap.arrayStreet);
	   callejeroInitCb = null;
	}

}

/*********************************************************************
** Funcion obtenerDireccionesMunProv
**********************************************************************/

function obtenerDireccionesMunProvSigc(streetname, streetnumber, streettype, municipio, provincia, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
	callejeroProxy.geocoderMunProvSrs(obtenerDireccionesMunProvResponseSigc,errorCallback,streetname, streetnumber, streettype, municipio, provincia, srs);
}


function obtenerDireccionesMunProvResponseSigc(response) {

	sigcMap.arrayStreet = new Array();
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

   	 		sigcMap.arrayStreet.push(direccion);
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


   	 		sigcMap.arrayStreet.push(direccion);
		}
	}
	sigcMap.arrayStreet.sort(compareSimil);
	if(callejeroInitCb!=null)
	{
	   eval(callejeroInitCb)(sigcMap.arrayStreet);
	   callejeroInitCb = null;
	}

}

/*********************************************************************
** Funcion localizarSedes
**********************************************************************/

function localizarSedesSigc(codine, cadenaBusqueda, codProv, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
    callejeroProxy.localizarSedesSrs(localizarSedesResponseSigc, errorCallback, codine, cadenaBusqueda, codProv, "1", "1", "-1", srs);

}

function localizarSedesResponseSigc(response){


    sigcMap.arrayOu = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){

   	 	var sed = new sede();

   	 	if(getBrowserName() == 'msie'){
   	 	   var args = nombres[i].childNodes;
   	 	     sed.direccion = args[0].text;
			 sed.municipio = args[1].text;
			 sed.nombre = args[2].text;
			 sed.numero = args[3].text;;
			 sed.organismo = args[4].text;
			 sed.unidadorganizativa = args[5].text;
			 sed.x = args[6].text;
			 sed.y = args[7].text;
			 sigcMap.arrayOu.push(sed);
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
		    sigcMap.arrayOu.push(sed);
        }

	}
    sigcMap.arrayOu.sort(compareSede);

     if(callejeroInitCb!=null)
     {
  	   eval(callejeroInitCb)(sigcMap.arrayOu);
  	   callejeroInitCb = null;
     }

}


/*********************************************************************
** Funcion localizarServicios
**********************************************************************/


function localizarServiciosSigc(codine, codTipoServicio, codProv, cb, srs){
	if (cb!=null)
		callejeroInitCb = cb;
	else
		callejeroInitCb = null;
    callejeroProxy.localizarServiciosSrs(localizarServiciosResponseSigc, errorCallback, codine, codTipoServicio, codProv, "1", "1", "-1", srs);

}

function localizarServiciosResponseSigc(response){

    sigcMap.arrayServices = new Array();
	var nombres = response.getElementsByTagName('multiRef');

	for(var i = 0; i < nombres.length; i++){

   	 	var ser = new servicio();

   	 	if(getBrowserName() == 'msie'){
   	 	   var args = nombres[i].childNodes;
   	 	     ser.alias = args[0].text;
			 ser.municipio = args[1].text;
			 ser.x = args[2].text;
			 ser.y = args[3].text;
			sigcMap.arrayServices.push(ser);
   	 	}
        else{
            var args = nombres[i].childNodes;
            ser.alias = args[0].textContent;
			 ser.municipio = args[1].textContent;
			 ser.x = args[2].textContent;
			 ser.y = args[3].textContent;
			sigcMap.arrayServices.push(ser);
        }

		}
     sigcMap.arrayServices.sort(compareServicios);

     if(callejeroInitCb!=null)
     {
  	   eval(callejeroInitCb)(sigcMap.arrayServices);
  	   callejeroInitCb = null;
  	   //TODO MJMJ
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
 this.municipio = "";
 this.provincia = "";

}


function municipio(){

	 this.name = "";
 	 this.codINE = "";
 	 this.similarity = "";
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
   this.similarity = "";

}


function tipoServicio(){

   this.codigo = "";
   this.nombre = "";
   this.similarity = "";

}


function nucleo(){

   this.extent = "";
   this.idnucleo = "";
   this.municipio = "";
   this.nombre = "";
   this.tipo = "";
   this.provincia = "";
   this.similarity = "";

}

function servicio(){

   this.alias = "";
   this.municipio = "";
   this.x = "";
   this.y = "";
   this.similarity = "";

}

function road(){

   this.carretera = "";
   this.pk = "";
   this.provincia = "";
   this.x = "";
   this.y = "";
   this.similarity = "";

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

/**function compareObj(a, b)
{
	if(a instanceof address)
	{
		if(b instanceof address)
		{
			if (a.similarity < b.similarity) { return 1;}
			else if (a.similarity > b.similarity) { return -1;}
			else { return 0;}
		}
		else
		{
			return -1;
		}
	}
	else if(a instanceof servicio)
	{
		if(b instanceof servicio)
		{
			if (a.alias < b.alias) { return -1;}
			else if (a.alias > b.alias) { return 1;}
			else { return 0;}
		}
		else
		{
			return 1;
		}
	}
	else if(a instanceof sede)
	{
		if(b instanceof servicio)
		{
			return -1;
		}
		else if(b instanceof sede)
		{
			if (a.nombre < b.nombre) { return -1;}
			else if (a.nombre > b.nombre) { return 1;}
			else { return 0;}
		}
		else
		{
			return 1;
		}
	}
	else if(a instanceof nucleo)
	{
		if(b instanceof address)
		{
			return 1;
		}
		else if(b instanceof nucleo)
		{
			if (a.nombre < b.nombre) { return -1;}
			else if (a.nombre > b.nombre) { return 1;}
			else { return 0;}
		}
		else
		{
			return -1;
		}
	}
	else if(a instanceof road)
	{
		if(b instanceof road)
		{
			if (a.carretera < b.carretera) { return -1;}
			else if (a.carretera > b.carretera) { return 1;}
			else { return 0;}
		}
		else if(b instanceof sede || b instanceof servicio)
		{
			return -1;
		}
		else
		{
			return 1;
		}
	}
}*/

function compareObj(a, b)
{
	var s1 = a.similarity;
	var s2 = b.similarity;
	var name1 = '';
	var name2 = '';

	if(a instanceof address)
	{
		name1 = a.streetName;
	}
	else if(a instanceof servicio)
	{
		name1 = a.alias;
	}
	else if(a instanceof sede)
	{
		name1 = a.nombre;
	}
	else if(a instanceof nucleo)
	{
		name1 = a.nombre;
	}
	else if(a instanceof road)
	{
		name1 = a.carretera;
	}


	if(b instanceof address)
	{
		name2 = b.streetName;
	}
	else if(b instanceof servicio)
	{
		name2 = b.alias;
	}
	else if(b instanceof sede)
	{
		name2 = b.nombre;
	}
	else if(b instanceof nucleo)
	{
		name2 = b.nombre;
	}
	if(b instanceof road)
	{
		name2 = b.carretera;
	}


	if (s1 < s2) { return 1;}
	if (s1 > s2) { return -1;}
	if (name1 < name2) {return -1}
	if (name1 > name2) {return 1}
	return 0;
}

/*********************************************************************
** Funcion que comprueba el nombre del navegador.
**********************************************************************/
function getBrowserName(){
	var browserName="";
	var ua=navigator.userAgent.toLowerCase();

	if(ua.indexOf("opera")!=-1){
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
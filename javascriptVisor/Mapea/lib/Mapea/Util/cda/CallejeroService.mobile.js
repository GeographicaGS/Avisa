//
// Definitions for schema: http://exception.callejero.juntadeandalucia.es
//  file:/home/manueljmorillo/Escritorio/callejero.wsdl#types4
//
//
// Constructor for XML Schema item {http://exception.callejero.juntadeandalucia.es}CallejerosWSException
//
function TNS3_CallejerosWSException () {
    this.typeMarker = 'TNS3_CallejerosWSException';
}

//
// Serialize {http://exception.callejero.juntadeandalucia.es}CallejerosWSException
//
function TNS3_CallejerosWSException_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS3_CallejerosWSException.prototype.serialize = TNS3_CallejerosWSException_serialize;

function TNS3_CallejerosWSException_deserialize (cxfjsutils, element) {
    var newobject = new TNS4_CallejerosWSException();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    return newobject;
}

// Javascript for {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}CallejeroService
function IMPL_CallejeroService () {
    this.jsutils = new CxfApacheOrgUtil();
    this.jsutils.interfaceObject = this;
    this.synchronous = false;
    this.url = null;
    this.client = null;
    this.response = null;
    this.globalElementSerializers = [];
    this.globalElementDeserializers = [];
    this.globalElementSerializers['{http://exception.callejero.juntadeandalucia.es}CallejerosWSException'] = TNS3_CallejerosWSException_serialize;
    this.globalElementDeserializers['{http://exception.callejero.juntadeandalucia.es}CallejerosWSException'] = TNS3_CallejerosWSException_deserialize;
}

function IMPL_autocompletarDireccionMunicipio_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.autocompletarDireccionMunicipio_onsuccess = IMPL_autocompletarDireccionMunicipio_op_onsuccess;

function IMPL_autocompletarDireccionMunicipio_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.autocompletarDireccionMunicipio_onerror = IMPL_autocompletarDireccionMunicipio_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}autocompletarDireccionMunicipio
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_autocompletarDireccionMunicipio_op(successCallback, errorCallback, input, limit, codine) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(3);
    args[0] = input;
    args[1] = limit;
    args[2] = codine;
    xml = this.autocompletarDireccionMunicipioRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.autocompletarDireccionMunicipio_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.autocompletarDireccionMunicipio_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.autocompletarDireccionMunicipio = IMPL_autocompletarDireccionMunicipio_op;

function IMPL_autocompletarDireccionMunicipioRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:autocompletarDireccionMunicipio>';
    // block for local variables
    {
     xml = xml + '<input>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</input>';
    }
    // block for local variables
    {
     xml = xml + '<limit>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</limit>';
    }
    // block for local variables
    {
     xml = xml + '<codine>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</codine>';
    }
    xml = xml + '</jns0:autocompletarDireccionMunicipio>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.autocompletarDireccionMunicipioRequest_serializeInput = IMPL_autocompletarDireccionMunicipioRequest_serializeInput;

function IMPL_autocompletarDireccionMunicipioResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_geocoderListSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.geocoderListSrs_onsuccess = IMPL_geocoderListSrs_op_onsuccess;

function IMPL_geocoderListSrs_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.geocoderListSrs_onerror = IMPL_geocoderListSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}geocoderListSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderListSrs_op(successCallback, errorCallback, streetname, streetnumber, streettype, locality, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = locality;
    args[4] = srs;
    xml = this.geocoderListSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderListSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderListSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderListSrs = IMPL_geocoderListSrs_op;

function IMPL_geocoderListSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderListSrs>';
    // block for local variables
    {
     xml = xml + '<streetname>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</streetname>';
    }
    // block for local variables
    {
     xml = xml + '<streetnumber>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</streetnumber>';
    }
    // block for local variables
    {
     xml = xml + '<streettype>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</streettype>';
    }
    // block for local variables
    {
     xml = xml + '<locality>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</locality>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:geocoderListSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderListSrsRequest_serializeInput = IMPL_geocoderListSrsRequest_serializeInput;

function IMPL_geocoderListSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_buscarCallejeroSrsMunicipio_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.buscarCallejeroSrsMunicipio_onsuccess = IMPL_buscarCallejeroSrsMunicipio_op_onsuccess;

function IMPL_buscarCallejeroSrsMunicipio_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.buscarCallejeroSrsMunicipio_onerror = IMPL_buscarCallejeroSrsMunicipio_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}buscarCallejeroSrsMunicipio
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_buscarCallejeroSrsMunicipio_op(successCallback, errorCallback, query, codine, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(3);
    args[0] = query;
    args[1] = codine;
    args[2] = srs;
    xml = this.buscarCallejeroSrsMunicipioRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.buscarCallejeroSrsMunicipio_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.buscarCallejeroSrsMunicipio_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.buscarCallejeroSrsMunicipio = IMPL_buscarCallejeroSrsMunicipio_op;

function IMPL_buscarCallejeroSrsMunicipioRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:buscarCallejeroSrsMunicipio>';
    // block for local variables
    {
     xml = xml + '<query>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</query>';
    }
    // block for local variables
    {
     xml = xml + '<codine>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</codine>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:buscarCallejeroSrsMunicipio>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.buscarCallejeroSrsMunicipioRequest_serializeInput = IMPL_buscarCallejeroSrsMunicipioRequest_serializeInput;

function IMPL_buscarCallejeroSrsMunicipioResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_geosearch_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.geosearch_onsuccess = IMPL_geosearch_op_onsuccess;

function IMPL_geosearch_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.geosearch_onerror = IMPL_geosearch_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}geosearch
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geosearch_op(successCallback, errorCallback, query, start, limit, core, requestHandler, srs, locality, threshold) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(8);
    args[0] = query;
    args[1] = start;
    args[2] = limit;
    args[3] = core;
    args[4] = requestHandler;
    args[5] = srs;
    args[6] = locality;
    args[7] = threshold;
    xml = this.geosearchRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geosearch_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geosearch_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geosearch = IMPL_geosearch_op;

function IMPL_geosearchRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geosearch>';
    // block for local variables
    {
     xml = xml + '<query>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</query>';
    }
    // block for local variables
    {
     xml = xml + '<start>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</start>';
    }
    // block for local variables
    {
     xml = xml + '<limit>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</limit>';
    }
    // block for local variables
    {
     xml = xml + '<core>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</core>';
    }
    // block for local variables
    {
     xml = xml + '<requestHandler>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</requestHandler>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</srs>';
    }
    // block for local variables
    {
     xml = xml + '<locality>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[6]);
     xml = xml + '</locality>';
    }
    // block for local variables
    {
     xml = xml + '<threshold>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[7]);
     xml = xml + '</threshold>';
    }
    xml = xml + '</jns0:geosearch>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geosearchRequest_serializeInput = IMPL_geosearchRequest_serializeInput;

function IMPL_geosearchResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_GeosearchResult_deserialize (cxfjsutils, partElement);

    return returnObject;
}

function IMPL_CallejeroService_IMPL_callejero () {
  this.url = 'http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero';
}

function IMPL_normalizar_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.normalizar_onsuccess = IMPL_normalizar_op_onsuccess;

function IMPL_normalizar_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.normalizar_onerror = IMPL_normalizar_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}normalizar
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_normalizar_op(successCallback, errorCallback, cadena) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = cadena;
    xml = this.normalizarRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.normalizar_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.normalizar_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.normalizar = IMPL_normalizar_op;

function IMPL_normalizarRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:normalizar>';
    // block for local variables
    {
     xml = xml + '<cadena>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</cadena>';
    }
    xml = xml + '</jns0:normalizar>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.normalizarRequest_serializeInput = IMPL_normalizarRequest_serializeInput;

function IMPL_normalizarResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_Address_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_geocoderMunProvSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.geocoderMunProvSrs_onsuccess = IMPL_geocoderMunProvSrs_op_onsuccess;

function IMPL_geocoderMunProvSrs_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.geocoderMunProvSrs_onerror = IMPL_geocoderMunProvSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}geocoderMunProvSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderMunProvSrs_op(successCallback, errorCallback, streetname, streetnumber, streettype, municipio, provincia, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(6);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = municipio;
    args[4] = provincia;
    args[5] = srs;
    xml = this.geocoderMunProvSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderMunProvSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderMunProvSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderMunProvSrs = IMPL_geocoderMunProvSrs_op;

function IMPL_geocoderMunProvSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderMunProvSrs>';
    // block for local variables
    {
     xml = xml + '<streetname>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</streetname>';
    }
    // block for local variables
    {
     xml = xml + '<streetnumber>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</streetnumber>';
    }
    // block for local variables
    {
     xml = xml + '<streettype>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</streettype>';
    }
    // block for local variables
    {
     xml = xml + '<municipio>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</municipio>';
    }
    // block for local variables
    {
     xml = xml + '<provincia>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</provincia>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:geocoderMunProvSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderMunProvSrsRequest_serializeInput = IMPL_geocoderMunProvSrsRequest_serializeInput;

function IMPL_geocoderMunProvSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_comprobarCodIne_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.comprobarCodIne_onsuccess = IMPL_comprobarCodIne_op_onsuccess;

function IMPL_comprobarCodIne_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

IMPL_CallejeroService.prototype.comprobarCodIne_onerror = IMPL_comprobarCodIne_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}comprobarCodIne
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_comprobarCodIne_op(successCallback, errorCallback, codigo) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = codigo;
    xml = this.comprobarCodIneRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.comprobarCodIne_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.comprobarCodIne_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.comprobarCodIne = IMPL_comprobarCodIne_op;

function IMPL_comprobarCodIneRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:comprobarCodIne>';
    // block for local variables
    {
     xml = xml + '<codigo>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</codigo>';
    }
    xml = xml + '</jns0:comprobarCodIne>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.comprobarCodIneRequest_serializeInput = IMPL_comprobarCodIneRequest_serializeInput;

function IMPL_comprobarCodIneResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

IMPL_CallejeroService_IMPL_callejero.prototype = new IMPL_CallejeroService;


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

function IMPL_getCentralOfficeByBuilding_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getCentralOfficeByBuilding_onsuccess = IMPL_getCentralOfficeByBuilding_op_onsuccess;

function IMPL_getCentralOfficeByBuilding_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getCentralOfficeByBuilding_onerror = IMPL_getCentralOfficeByBuilding_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getCentralOfficeByBuilding
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getCentralOfficeByBuilding_op(successCallback, errorCallback, id_building) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = id_building;
    xml = this.getCentralOfficeByBuildingRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getCentralOfficeByBuilding_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getCentralOfficeByBuilding_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getCentralOfficeByBuilding = IMPL_getCentralOfficeByBuilding_op;

function IMPL_getCentralOfficeByBuildingRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getCentralOfficeByBuilding>';
    // block for local variables
    {
     xml = xml + '<id_building>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_building>';
    }
    xml = xml + '</jns0:getCentralOfficeByBuilding>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getCentralOfficeByBuildingRequest_serializeInput = IMPL_getCentralOfficeByBuildingRequest_serializeInput;

function IMPL_getCentralOfficeByBuildingResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_CentralOfficeModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getAllProvinces_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getAllProvinces_onsuccess = IMPL_getAllProvinces_op_onsuccess;

function IMPL_getAllProvinces_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getAllProvinces_onerror = IMPL_getAllProvinces_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getAllProvinces
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}boolean
//
function IMPL_getAllProvinces_op(successCallback, errorCallback, orderAsc) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = orderAsc;
    xml = this.getAllProvincesRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getAllProvinces_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getAllProvinces_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getAllProvinces = IMPL_getAllProvinces_op;

function IMPL_getAllProvincesRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getAllProvinces>';
    // block for local variables
    {
     xml = xml + '<orderAsc>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</orderAsc>';
    }
    xml = xml + '</jns0:getAllProvinces>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getAllProvincesRequest_serializeInput = IMPL_getAllProvincesRequest_serializeInput;

function IMPL_getAllProvincesResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_obtenerTiposVia_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.obtenerTiposVia_onsuccess = IMPL_obtenerTiposVia_op_onsuccess;

function IMPL_obtenerTiposVia_op_onerror(client) {
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

IMPL_CallejeroService.prototype.obtenerTiposVia_onerror = IMPL_obtenerTiposVia_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}obtenerTiposVia
// - bare operation. Parameters:
//
function IMPL_obtenerTiposVia_op(successCallback, errorCallback) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(0);
    xml = this.obtenerTiposViaRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.obtenerTiposVia_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.obtenerTiposVia_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.obtenerTiposVia = IMPL_obtenerTiposVia_op;

function IMPL_obtenerTiposViaRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:obtenerTiposVia>';
    xml = xml + '</jns0:obtenerTiposVia>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.obtenerTiposViaRequest_serializeInput = IMPL_obtenerTiposViaRequest_serializeInput;

function IMPL_obtenerTiposViaResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_localizarSedesSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.localizarSedesSrs_onsuccess = IMPL_localizarSedesSrs_op_onsuccess;

function IMPL_localizarSedesSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarSedesSrs_onerror = IMPL_localizarSedesSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}localizarSedesSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_localizarSedesSrs_op(successCallback, errorCallback, codine, cadenaBusqueda, codProv, cantidadRegistros, pagina, total, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(7);
    args[0] = codine;
    args[1] = cadenaBusqueda;
    args[2] = codProv;
    args[3] = cantidadRegistros;
    args[4] = pagina;
    args[5] = total;
    args[6] = srs;
    xml = this.localizarSedesSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarSedesSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarSedesSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarSedesSrs = IMPL_localizarSedesSrs_op;

function IMPL_localizarSedesSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarSedesSrs>';
    // block for local variables
    {
     xml = xml + '<codine>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</codine>';
    }
    // block for local variables
    {
     xml = xml + '<cadenaBusqueda>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</cadenaBusqueda>';
    }
    // block for local variables
    {
     xml = xml + '<codProv>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</codProv>';
    }
    // block for local variables
    {
     xml = xml + '<cantidadRegistros>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</cantidadRegistros>';
    }
    // block for local variables
    {
     xml = xml + '<pagina>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</pagina>';
    }
    // block for local variables
    {
     xml = xml + '<total>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</total>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[6]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:localizarSedesSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarSedesSrsRequest_serializeInput = IMPL_localizarSedesSrsRequest_serializeInput;

function IMPL_localizarSedesSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getParentsOrganizationalUnit_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getParentsOrganizationalUnit_onsuccess = IMPL_getParentsOrganizationalUnit_op_onsuccess;

function IMPL_getParentsOrganizationalUnit_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getParentsOrganizationalUnit_onerror = IMPL_getParentsOrganizationalUnit_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getParentsOrganizationalUnit
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getParentsOrganizationalUnit_op(successCallback, errorCallback, id_uo) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = id_uo;
    xml = this.getParentsOrganizationalUnitRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getParentsOrganizationalUnit_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getParentsOrganizationalUnit_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getParentsOrganizationalUnit = IMPL_getParentsOrganizationalUnit_op;

function IMPL_getParentsOrganizationalUnitRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getParentsOrganizationalUnit>';
    // block for local variables
    {
     xml = xml + '<id_uo>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_uo>';
    }
    xml = xml + '</jns0:getParentsOrganizationalUnit>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getParentsOrganizationalUnitRequest_serializeInput = IMPL_getParentsOrganizationalUnitRequest_serializeInput;

function IMPL_getParentsOrganizationalUnitResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_comprobarTipoCarretera_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.comprobarTipoCarretera_onsuccess = IMPL_comprobarTipoCarretera_op_onsuccess;

function IMPL_comprobarTipoCarretera_op_onerror(client) {
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

IMPL_CallejeroService.prototype.comprobarTipoCarretera_onerror = IMPL_comprobarTipoCarretera_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}comprobarTipoCarretera
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_comprobarTipoCarretera_op(successCallback, errorCallback, tipoCarretera) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = tipoCarretera;
    xml = this.comprobarTipoCarreteraRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.comprobarTipoCarretera_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.comprobarTipoCarretera_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.comprobarTipoCarretera = IMPL_comprobarTipoCarretera_op;

function IMPL_comprobarTipoCarreteraRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:comprobarTipoCarretera>';
    // block for local variables
    {
     xml = xml + '<tipoCarretera>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</tipoCarretera>';
    }
    xml = xml + '</jns0:comprobarTipoCarretera>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.comprobarTipoCarreteraRequest_serializeInput = IMPL_comprobarTipoCarreteraRequest_serializeInput;

function IMPL_comprobarTipoCarreteraResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_obtenerMunicipios_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.obtenerMunicipios_onsuccess = IMPL_obtenerMunicipios_op_onsuccess;

function IMPL_obtenerMunicipios_op_onerror(client) {
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

IMPL_CallejeroService.prototype.obtenerMunicipios_onerror = IMPL_obtenerMunicipios_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}obtenerMunicipios
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_obtenerMunicipios_op(successCallback, errorCallback, codprov) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = codprov;
    xml = this.obtenerMunicipiosRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.obtenerMunicipios_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.obtenerMunicipios_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.obtenerMunicipios = IMPL_obtenerMunicipios_op;

function IMPL_obtenerMunicipiosRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:obtenerMunicipios>';
    // block for local variables
    {
     xml = xml + '<codprov>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</codprov>';
    }
    xml = xml + '</jns0:obtenerMunicipios>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.obtenerMunicipiosRequest_serializeInput = IMPL_obtenerMunicipiosRequest_serializeInput;

function IMPL_obtenerMunicipiosResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getBuildingSrs_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getBuildingSrs_onsuccess = IMPL_getBuildingSrs_op_onsuccess;

function IMPL_getBuildingSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getBuildingSrs_onerror = IMPL_getBuildingSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getBuildingSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getBuildingSrs_op(successCallback, errorCallback, nombre_via, provincia, num_portal, tipo_via, nombre, municipio, distrito_postal, letra_portal, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(9);
    args[0] = nombre_via;
    args[1] = provincia;
    args[2] = num_portal;
    args[3] = tipo_via;
    args[4] = nombre;
    args[5] = municipio;
    args[6] = distrito_postal;
    args[7] = letra_portal;
    args[8] = srs;
    xml = this.getBuildingSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getBuildingSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getBuildingSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getBuildingSrs = IMPL_getBuildingSrs_op;

function IMPL_getBuildingSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getBuildingSrs>';
    // block for local variables
    {
     xml = xml + '<nombre_via>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</nombre_via>';
    }
    // block for local variables
    {
     xml = xml + '<provincia>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</provincia>';
    }
    // block for local variables
    {
     xml = xml + '<num_portal>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</num_portal>';
    }
    // block for local variables
    {
     xml = xml + '<tipo_via>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</tipo_via>';
    }
    // block for local variables
    {
     xml = xml + '<nombre>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</nombre>';
    }
    // block for local variables
    {
     xml = xml + '<municipio>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</municipio>';
    }
    // block for local variables
    {
     xml = xml + '<distrito_postal>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[6]);
     xml = xml + '</distrito_postal>';
    }
    // block for local variables
    {
     xml = xml + '<letra_portal>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[7]);
     xml = xml + '</letra_portal>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[8]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:getBuildingSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getBuildingSrsRequest_serializeInput = IMPL_getBuildingSrsRequest_serializeInput;

function IMPL_getBuildingSrsResponse_deserializeResponse(cxfjsutils, partElement) {
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
function IMPL_localizarCarreterasSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.localizarCarreterasSrs_onsuccess = IMPL_localizarCarreterasSrs_op_onsuccess;

function IMPL_localizarCarreterasSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarCarreterasSrs_onerror = IMPL_localizarCarreterasSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}localizarCarreterasSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_localizarCarreterasSrs_op(successCallback, errorCallback, cadenaBusqueda, pK, cantidadRegistros, pagina, total, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(6);
    args[0] = cadenaBusqueda;
    args[1] = pK;
    args[2] = cantidadRegistros;
    args[3] = pagina;
    args[4] = total;
    args[5] = srs;
    xml = this.localizarCarreterasSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarCarreterasSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarCarreterasSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarCarreterasSrs = IMPL_localizarCarreterasSrs_op;

function IMPL_localizarCarreterasSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarCarreterasSrs>';
    // block for local variables
    {
     xml = xml + '<cadenaBusqueda>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</cadenaBusqueda>';
    }
    // block for local variables
    {
     xml = xml + '<pK>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</pK>';
    }
    // block for local variables
    {
     xml = xml + '<cantidadRegistros>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</cantidadRegistros>';
    }
    // block for local variables
    {
     xml = xml + '<pagina>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</pagina>';
    }
    // block for local variables
    {
     xml = xml + '<total>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</total>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:localizarCarreterasSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarCarreterasSrsRequest_serializeInput = IMPL_localizarCarreterasSrsRequest_serializeInput;

function IMPL_localizarCarreterasSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getAllTypeOrganitazionalUnit_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getAllTypeOrganitazionalUnit_onsuccess = IMPL_getAllTypeOrganitazionalUnit_op_onsuccess;

function IMPL_getAllTypeOrganitazionalUnit_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getAllTypeOrganitazionalUnit_onerror = IMPL_getAllTypeOrganitazionalUnit_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getAllTypeOrganitazionalUnit
// - bare operation. Parameters:
//
function IMPL_getAllTypeOrganitazionalUnit_op(successCallback, errorCallback) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(0);
    xml = this.getAllTypeOrganitazionalUnitRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getAllTypeOrganitazionalUnit_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getAllTypeOrganitazionalUnit_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getAllTypeOrganitazionalUnit = IMPL_getAllTypeOrganitazionalUnit_op;

function IMPL_getAllTypeOrganitazionalUnitRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getAllTypeOrganitazionalUnit>';
    xml = xml + '</jns0:getAllTypeOrganitazionalUnit>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getAllTypeOrganitazionalUnitRequest_serializeInput = IMPL_getAllTypeOrganitazionalUnitRequest_serializeInput;

function IMPL_getAllTypeOrganitazionalUnitResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getTypeOrganitazionalUnit_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getTypeOrganitazionalUnit_onsuccess = IMPL_getTypeOrganitazionalUnit_op_onsuccess;

function IMPL_getTypeOrganitazionalUnit_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getTypeOrganitazionalUnit_onerror = IMPL_getTypeOrganitazionalUnit_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getTypeOrganitazionalUnit
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getTypeOrganitazionalUnit_op(successCallback, errorCallback, id_tipo) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = id_tipo;
    xml = this.getTypeOrganitazionalUnitRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getTypeOrganitazionalUnit_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getTypeOrganitazionalUnit_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getTypeOrganitazionalUnit = IMPL_getTypeOrganitazionalUnit_op;

function IMPL_getTypeOrganitazionalUnitRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getTypeOrganitazionalUnit>';
    // block for local variables
    {
     xml = xml + '<id_tipo>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_tipo>';
    }
    xml = xml + '</jns0:getTypeOrganitazionalUnit>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getTypeOrganitazionalUnitRequest_serializeInput = IMPL_getTypeOrganitazionalUnitRequest_serializeInput;

function IMPL_getTypeOrganitazionalUnitResponse_deserializeResponse(cxfjsutils, partElement) {
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
function IMPL_getOrganitazionalUnit_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getOrganitazionalUnit_onsuccess = IMPL_getOrganitazionalUnit_op_onsuccess;

function IMPL_getOrganitazionalUnit_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getOrganitazionalUnit_onerror = IMPL_getOrganitazionalUnit_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getOrganitazionalUnit
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getOrganitazionalUnit_op(successCallback, errorCallback, id_tipo, nombre, id_padre, provincia, municipio) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = id_tipo;
    args[1] = nombre;
    args[2] = id_padre;
    args[3] = provincia;
    args[4] = municipio;
    xml = this.getOrganitazionalUnitRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getOrganitazionalUnit_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getOrganitazionalUnit_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getOrganitazionalUnit = IMPL_getOrganitazionalUnit_op;

function IMPL_getOrganitazionalUnitRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getOrganitazionalUnit>';
    // block for local variables
    {
     xml = xml + '<id_tipo>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_tipo>';
    }
    // block for local variables
    {
     xml = xml + '<nombre>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</nombre>';
    }
    // block for local variables
    {
     xml = xml + '<id_padre>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</id_padre>';
    }
    // block for local variables
    {
     xml = xml + '<provincia>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</provincia>';
    }
    // block for local variables
    {
     xml = xml + '<municipio>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</municipio>';
    }
    xml = xml + '</jns0:getOrganitazionalUnit>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getOrganitazionalUnitRequest_serializeInput = IMPL_getOrganitazionalUnitRequest_serializeInput;

function IMPL_getOrganitazionalUnitResponse_deserializeResponse(cxfjsutils, partElement) {
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
function IMPL_geocoderInversoSrs_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.geocoderInversoSrs_onsuccess = IMPL_geocoderInversoSrs_op_onsuccess;

function IMPL_geocoderInversoSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoderInversoSrs_onerror = IMPL_geocoderInversoSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}geocoderInversoSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}double
// - type {http://www.w3.org/2001/XMLSchema}double
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderInversoSrs_op(successCallback, errorCallback, x, y, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(3);
    args[0] = x;
    args[1] = y;
    args[2] = srs;
    xml = this.geocoderInversoSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderInversoSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderInversoSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderInversoSrs = IMPL_geocoderInversoSrs_op;

function IMPL_geocoderInversoSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderInversoSrs>';
    // block for local variables
    {
     xml = xml + '<x>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</x>';
    }
    // block for local variables
    {
     xml = xml + '<y>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</y>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:geocoderInversoSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderInversoSrsRequest_serializeInput = IMPL_geocoderInversoSrsRequest_serializeInput;

function IMPL_geocoderInversoSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_GeocoderResult_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_localizarServiciosSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.localizarServiciosSrs_onsuccess = IMPL_localizarServiciosSrs_op_onsuccess;

function IMPL_localizarServiciosSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarServiciosSrs_onerror = IMPL_localizarServiciosSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}localizarServiciosSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_localizarServiciosSrs_op(successCallback, errorCallback, codine, codTipoServicio, codProv, cantidadRegistros, pagina, total, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(7);
    args[0] = codine;
    args[1] = codTipoServicio;
    args[2] = codProv;
    args[3] = cantidadRegistros;
    args[4] = pagina;
    args[5] = total;
    args[6] = srs;
    xml = this.localizarServiciosSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarServiciosSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarServiciosSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarServiciosSrs = IMPL_localizarServiciosSrs_op;

function IMPL_localizarServiciosSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarServiciosSrs>';
    // block for local variables
    {
     xml = xml + '<codine>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</codine>';
    }
    // block for local variables
    {
     xml = xml + '<codTipoServicio>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</codTipoServicio>';
    }
    // block for local variables
    {
     xml = xml + '<codProv>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</codProv>';
    }
    // block for local variables
    {
     xml = xml + '<cantidadRegistros>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</cantidadRegistros>';
    }
    // block for local variables
    {
     xml = xml + '<pagina>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</pagina>';
    }
    // block for local variables
    {
     xml = xml + '<total>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[5]);
     xml = xml + '</total>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[6]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:localizarServiciosSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarServiciosSrsRequest_serializeInput = IMPL_localizarServiciosSrsRequest_serializeInput;

function IMPL_localizarServiciosSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getGeosearchCores_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getGeosearchCores_onsuccess = IMPL_getGeosearchCores_op_onsuccess;

function IMPL_getGeosearchCores_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getGeosearchCores_onerror = IMPL_getGeosearchCores_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getGeosearchCores
// - bare operation. Parameters:
//
function IMPL_getGeosearchCores_op(successCallback, errorCallback) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(0);
    xml = this.getGeosearchCoresRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getGeosearchCores_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getGeosearchCores_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getGeosearchCores = IMPL_getGeosearchCores_op;

function IMPL_getGeosearchCoresRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getGeosearchCores>';
    xml = xml + '</jns0:getGeosearchCores>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getGeosearchCoresRequest_serializeInput = IMPL_getGeosearchCoresRequest_serializeInput;

function IMPL_getGeosearchCoresResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getCentralOfficeSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getCentralOfficeSrs_onsuccess = IMPL_getCentralOfficeSrs_op_onsuccess;

function IMPL_getCentralOfficeSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getCentralOfficeSrs_onerror = IMPL_getCentralOfficeSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getCentralOfficeSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getCentralOfficeSrs_op(successCallback, errorCallback, id_CentralOffice, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(2);
    args[0] = id_CentralOffice;
    args[1] = srs;
    xml = this.getCentralOfficeSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getCentralOfficeSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getCentralOfficeSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getCentralOfficeSrs = IMPL_getCentralOfficeSrs_op;

function IMPL_getCentralOfficeSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getCentralOfficeSrs>';
    // block for local variables
    {
     xml = xml + '<id_CentralOffice>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_CentralOffice>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:getCentralOfficeSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getCentralOfficeSrsRequest_serializeInput = IMPL_getCentralOfficeSrsRequest_serializeInput;

function IMPL_getCentralOfficeSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_CentralOfficeModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_comprobarTipoVia_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.comprobarTipoVia_onsuccess = IMPL_comprobarTipoVia_op_onsuccess;

function IMPL_comprobarTipoVia_op_onerror(client) {
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

IMPL_CallejeroService.prototype.comprobarTipoVia_onerror = IMPL_comprobarTipoVia_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}comprobarTipoVia
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_comprobarTipoVia_op(successCallback, errorCallback, tipoVia) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = tipoVia;
    xml = this.comprobarTipoViaRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.comprobarTipoVia_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.comprobarTipoVia_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.comprobarTipoVia = IMPL_comprobarTipoVia_op;

function IMPL_comprobarTipoViaRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:comprobarTipoVia>';
    // block for local variables
    {
     xml = xml + '<tipoVia>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</tipoVia>';
    }
    xml = xml + '</jns0:comprobarTipoVia>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.comprobarTipoViaRequest_serializeInput = IMPL_comprobarTipoViaRequest_serializeInput;

function IMPL_comprobarTipoViaResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_obtenerTiposServicios_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.obtenerTiposServicios_onsuccess = IMPL_obtenerTiposServicios_op_onsuccess;

function IMPL_obtenerTiposServicios_op_onerror(client) {
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

IMPL_CallejeroService.prototype.obtenerTiposServicios_onerror = IMPL_obtenerTiposServicios_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}obtenerTiposServicios
// - bare operation. Parameters:
//
function IMPL_obtenerTiposServicios_op(successCallback, errorCallback) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(0);
    xml = this.obtenerTiposServiciosRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.obtenerTiposServicios_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.obtenerTiposServicios_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.obtenerTiposServicios = IMPL_obtenerTiposServicios_op;

function IMPL_obtenerTiposServiciosRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:obtenerTiposServicios>';
    xml = xml + '</jns0:obtenerTiposServicios>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.obtenerTiposServiciosRequest_serializeInput = IMPL_obtenerTiposServiciosRequest_serializeInput;

function IMPL_obtenerTiposServiciosResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_getParentsLevel1_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getParentsLevel1_onsuccess = IMPL_getParentsLevel1_op_onsuccess;

function IMPL_getParentsLevel1_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getParentsLevel1_onerror = IMPL_getParentsLevel1_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getParentsLevel1
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}boolean
//
function IMPL_getParentsLevel1_op(successCallback, errorCallback, orderAsc) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = orderAsc;
    xml = this.getParentsLevel1Request_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getParentsLevel1_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getParentsLevel1_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getParentsLevel1 = IMPL_getParentsLevel1_op;

function IMPL_getParentsLevel1Request_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getParentsLevel1>';
    // block for local variables
    {
     xml = xml + '<orderAsc>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</orderAsc>';
    }
    xml = xml + '</jns0:getParentsLevel1>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getParentsLevel1Request_serializeInput = IMPL_getParentsLevel1Request_serializeInput;

function IMPL_getParentsLevel1Response_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
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
function IMPL_localizarNucleosSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.localizarNucleosSrs_onsuccess = IMPL_localizarNucleosSrs_op_onsuccess;

function IMPL_localizarNucleosSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarNucleosSrs_onerror = IMPL_localizarNucleosSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}localizarNucleosSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_localizarNucleosSrs_op(successCallback, errorCallback, cadenaBusqueda, cantidadRegistros, pagina, total, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = cadenaBusqueda;
    args[1] = cantidadRegistros;
    args[2] = pagina;
    args[3] = total;
    args[4] = srs;
    xml = this.localizarNucleosSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarNucleosSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarNucleosSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarNucleosSrs = IMPL_localizarNucleosSrs_op;

function IMPL_localizarNucleosSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarNucleosSrs>';
    // block for local variables
    {
     xml = xml + '<cadenaBusqueda>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</cadenaBusqueda>';
    }
    // block for local variables
    {
     xml = xml + '<cantidadRegistros>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</cantidadRegistros>';
    }
    // block for local variables
    {
     xml = xml + '<pagina>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[2]);
     xml = xml + '</pagina>';
    }
    // block for local variables
    {
     xml = xml + '<total>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[3]);
     xml = xml + '</total>';
    }
    // block for local variables
    {
     xml = xml + '<srs>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[4]);
     xml = xml + '</srs>';
    }
    xml = xml + '</jns0:localizarNucleosSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarNucleosSrsRequest_serializeInput = IMPL_localizarNucleosSrsRequest_serializeInput;

function IMPL_localizarNucleosSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}

function IMPL_getChildrenOrganitazionalUnit_op_onsuccess(client, responseXml) {
   (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getChildrenOrganitazionalUnit_onsuccess = IMPL_getChildrenOrganitazionalUnit_op_onsuccess;

function IMPL_getChildrenOrganitazionalUnit_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getChildrenOrganitazionalUnit_onerror = IMPL_getChildrenOrganitazionalUnit_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getChildrenOrganitazionalUnit
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getChildrenOrganitazionalUnit_op(successCallback, errorCallback, id_uo) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = id_uo;
    xml = this.getChildrenOrganitazionalUnitRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getChildrenOrganitazionalUnit_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getChildrenOrganitazionalUnit_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getChildrenOrganitazionalUnit = IMPL_getChildrenOrganitazionalUnit_op;

function IMPL_getChildrenOrganitazionalUnitRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getChildrenOrganitazionalUnit>';
    // block for local variables
    {
     xml = xml + '<id_uo>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_uo>';
    }
    xml = xml + '</jns0:getChildrenOrganitazionalUnit>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getChildrenOrganitazionalUnitRequest_serializeInput = IMPL_getChildrenOrganitazionalUnitRequest_serializeInput;

function IMPL_getChildrenOrganitazionalUnitResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
}
function IMPL_obtenerCodINE_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.obtenerCodINE_onsuccess = IMPL_obtenerCodINE_op_onsuccess;

function IMPL_obtenerCodINE_op_onerror(client) {
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

IMPL_CallejeroService.prototype.obtenerCodINE_onerror = IMPL_obtenerCodINE_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}obtenerCodINE
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_obtenerCodINE_op(successCallback, errorCallback, provincia, municipio) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(2);
    args[0] = provincia;
    args[1] = municipio;
    xml = this.obtenerCodINERequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.obtenerCodINE_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.obtenerCodINE_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.obtenerCodINE = IMPL_obtenerCodINE_op;

function IMPL_obtenerCodINERequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:obtenerCodINE>';
    // block for local variables
    {
     xml = xml + '<provincia>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</provincia>';
    }
    // block for local variables
    {
     xml = xml + '<municipio>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[1]);
     xml = xml + '</municipio>';
    }
    xml = xml + '</jns0:obtenerCodINE>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.obtenerCodINERequest_serializeInput = IMPL_obtenerCodINERequest_serializeInput;

function IMPL_obtenerCodINEResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnText = cxfjsutils.getNodeText(partElement);
    var returnObject = returnText;
    return returnObject;
}
function IMPL_geocoderSrs_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.geocoderSrs_onsuccess = IMPL_geocoderSrs_op_onsuccess;

function IMPL_geocoderSrs_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoderSrs_onerror = IMPL_geocoderSrs_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}geocoderSrs
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderSrs_op(successCallback, errorCallback, streetname, streetnumber, streettype, locality, srs) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = locality;
    args[4] = srs;
    xml = this.geocoderSrsRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderSrs_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderSrs_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderSrs = IMPL_geocoderSrs_op;

function IMPL_geocoderSrsRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderSrs>';
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
    xml = xml + '</jns0:geocoderSrs>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderSrsRequest_serializeInput = IMPL_geocoderSrsRequest_serializeInput;

function IMPL_geocoderSrsResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
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
function IMPL_getVersion_op_onsuccess(client, responseXml) {
    (client.user_onsuccess && client.user_onsuccess(responseXml));
}

IMPL_CallejeroService.prototype.getVersion_onsuccess = IMPL_getVersion_op_onsuccess;

function IMPL_getVersion_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getVersion_onerror = IMPL_getVersion_op_onerror;

//
// Operation {http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero}getVersion
// - bare operation. Parameters:
//
function IMPL_getVersion_op(successCallback, errorCallback) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(0);
    xml = this.getVersionRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getVersion_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getVersion_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getVersion = IMPL_getVersion_op;

function IMPL_getVersionRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getVersion>';
    xml = xml + '</jns0:getVersion>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getVersionRequest_serializeInput = IMPL_getVersionRequest_serializeInput;

function IMPL_getVersionResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_Version_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_CallejeroService_IMPL_callejero () {
  this.url = 'http://clientes.guadaltel.es/desarrollo/CallejeroWS/services/callejero';
}
IMPL_CallejeroService_IMPL_callejero.prototype = new IMPL_CallejeroService;
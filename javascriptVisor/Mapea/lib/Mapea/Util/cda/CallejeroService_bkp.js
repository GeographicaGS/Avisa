//
// Definitions for schema: http://util.sig.guadaltel.com
//  file:/home/manueljmorillo/Escritorio/bueno_.wsdd#types3
//
//
// Constructor for XML Schema item {http://util.sig.guadaltel.com}BBox
//
function TNS2_BBox () {
    this.typeMarker = 'TNS2_BBox';
    this._XMax = 0.0;
    this._XMin = 0.0;
    this._YMax = 0.0;
    this._YMin = 0.0;
}

//
// accessor is TNS2_BBox.prototype.getXMax
// element get for XMax
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for XMax
// setter function is is TNS2_BBox.prototype.setXMax
//
function TNS2_BBox_getXMax() { return this._XMax;}

TNS2_BBox.prototype.getXMax = TNS2_BBox_getXMax;

function TNS2_BBox_setXMax(value) { this._XMax = value;}

TNS2_BBox.prototype.setXMax = TNS2_BBox_setXMax;
//
// accessor is TNS2_BBox.prototype.getXMin
// element get for XMin
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for XMin
// setter function is is TNS2_BBox.prototype.setXMin
//
function TNS2_BBox_getXMin() { return this._XMin;}

TNS2_BBox.prototype.getXMin = TNS2_BBox_getXMin;

function TNS2_BBox_setXMin(value) { this._XMin = value;}

TNS2_BBox.prototype.setXMin = TNS2_BBox_setXMin;
//
// accessor is TNS2_BBox.prototype.getYMax
// element get for YMax
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for YMax
// setter function is is TNS2_BBox.prototype.setYMax
//
function TNS2_BBox_getYMax() { return this._YMax;}

TNS2_BBox.prototype.getYMax = TNS2_BBox_getYMax;

function TNS2_BBox_setYMax(value) { this._YMax = value;}

TNS2_BBox.prototype.setYMax = TNS2_BBox_setYMax;
//
// accessor is TNS2_BBox.prototype.getYMin
// element get for YMin
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for YMin
// setter function is is TNS2_BBox.prototype.setYMin
//
function TNS2_BBox_getYMin() { return this._YMin;}

TNS2_BBox.prototype.getYMin = TNS2_BBox_getYMin;

function TNS2_BBox_setYMin(value) { this._YMin = value;}

TNS2_BBox.prototype.setYMin = TNS2_BBox_setYMin;
//
// Serialize {http://util.sig.guadaltel.com}BBox
//
function TNS2_BBox_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     xml = xml + '<XMax>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._XMax);
     xml = xml + '</XMax>';
    }
    // block for local variables
    {
     xml = xml + '<XMin>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._XMin);
     xml = xml + '</XMin>';
    }
    // block for local variables
    {
     xml = xml + '<YMax>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._YMax);
     xml = xml + '</YMax>';
    }
    // block for local variables
    {
     xml = xml + '<YMin>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._YMin);
     xml = xml + '</YMin>';
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS2_BBox.prototype.serialize = TNS2_BBox_serialize;

function TNS2_BBox_deserialize (cxfjsutils, element) {
    var newobject = new TNS2_BBox();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing XMax');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setXMax(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing XMin');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setXMin(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing YMax');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setYMax(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing YMin');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setYMin(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Definitions for schema: http://dto.callejero.juntadeandalucia.es
//  file:/home/manueljmorillo/Escritorio/bueno_.wsdd#types1
//
//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}CentralOfficeModelWS
//
function TNS1_CentralOfficeModelWS () {
    this.typeMarker = 'TNS1_CentralOfficeModelWS';
    this._building = null;
    this._fechaAlta = null;
    this._horario = null;
    this._id_edificio = null;
    this._id_sede = null;
    this._id_unidad = null;
    this._observaciones = null;
    this._organizationUnit = null;
}

//
// accessor is TNS1_CentralOfficeModelWS.prototype.getBuilding
// element get for building
// - element type is {http://dto.callejero.juntadeandalucia.es}BuildingModelWS
// - required element
// - nillable
//
// element set for building
// setter function is is TNS1_CentralOfficeModelWS.prototype.setBuilding
//
function TNS1_CentralOfficeModelWS_getBuilding() { return this._building;}

TNS1_CentralOfficeModelWS.prototype.getBuilding = TNS1_CentralOfficeModelWS_getBuilding;

function TNS1_CentralOfficeModelWS_setBuilding(value) { this._building = value;}

TNS1_CentralOfficeModelWS.prototype.setBuilding = TNS1_CentralOfficeModelWS_setBuilding;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getFechaAlta
// element get for fechaAlta
// - element type is {http://www.w3.org/2001/XMLSchema}dateTime
// - required element
// - nillable
//
// element set for fechaAlta
// setter function is is TNS1_CentralOfficeModelWS.prototype.setFechaAlta
//
function TNS1_CentralOfficeModelWS_getFechaAlta() { return this._fechaAlta;}

TNS1_CentralOfficeModelWS.prototype.getFechaAlta = TNS1_CentralOfficeModelWS_getFechaAlta;

function TNS1_CentralOfficeModelWS_setFechaAlta(value) { this._fechaAlta = value;}

TNS1_CentralOfficeModelWS.prototype.setFechaAlta = TNS1_CentralOfficeModelWS_setFechaAlta;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getHorario
// element get for horario
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for horario
// setter function is is TNS1_CentralOfficeModelWS.prototype.setHorario
//
function TNS1_CentralOfficeModelWS_getHorario() { return this._horario;}

TNS1_CentralOfficeModelWS.prototype.getHorario = TNS1_CentralOfficeModelWS_getHorario;

function TNS1_CentralOfficeModelWS_setHorario(value) { this._horario = value;}

TNS1_CentralOfficeModelWS.prototype.setHorario = TNS1_CentralOfficeModelWS_setHorario;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getId_edificio
// element get for id_edificio
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_edificio
// setter function is is TNS1_CentralOfficeModelWS.prototype.setId_edificio
//
function TNS1_CentralOfficeModelWS_getId_edificio() { return this._id_edificio;}

TNS1_CentralOfficeModelWS.prototype.getId_edificio = TNS1_CentralOfficeModelWS_getId_edificio;

function TNS1_CentralOfficeModelWS_setId_edificio(value) { this._id_edificio = value;}

TNS1_CentralOfficeModelWS.prototype.setId_edificio = TNS1_CentralOfficeModelWS_setId_edificio;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getId_sede
// element get for id_sede
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_sede
// setter function is is TNS1_CentralOfficeModelWS.prototype.setId_sede
//
function TNS1_CentralOfficeModelWS_getId_sede() { return this._id_sede;}

TNS1_CentralOfficeModelWS.prototype.getId_sede = TNS1_CentralOfficeModelWS_getId_sede;

function TNS1_CentralOfficeModelWS_setId_sede(value) { this._id_sede = value;}

TNS1_CentralOfficeModelWS.prototype.setId_sede = TNS1_CentralOfficeModelWS_setId_sede;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getId_unidad
// element get for id_unidad
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_unidad
// setter function is is TNS1_CentralOfficeModelWS.prototype.setId_unidad
//
function TNS1_CentralOfficeModelWS_getId_unidad() { return this._id_unidad;}

TNS1_CentralOfficeModelWS.prototype.getId_unidad = TNS1_CentralOfficeModelWS_getId_unidad;

function TNS1_CentralOfficeModelWS_setId_unidad(value) { this._id_unidad = value;}

TNS1_CentralOfficeModelWS.prototype.setId_unidad = TNS1_CentralOfficeModelWS_setId_unidad;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getObservaciones
// element get for observaciones
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for observaciones
// setter function is is TNS1_CentralOfficeModelWS.prototype.setObservaciones
//
function TNS1_CentralOfficeModelWS_getObservaciones() { return this._observaciones;}

TNS1_CentralOfficeModelWS.prototype.getObservaciones = TNS1_CentralOfficeModelWS_getObservaciones;

function TNS1_CentralOfficeModelWS_setObservaciones(value) { this._observaciones = value;}

TNS1_CentralOfficeModelWS.prototype.setObservaciones = TNS1_CentralOfficeModelWS_setObservaciones;
//
// accessor is TNS1_CentralOfficeModelWS.prototype.getOrganizationUnit
// element get for organizationUnit
// - element type is {http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS
// - required element
// - nillable
//
// element set for organizationUnit
// setter function is is TNS1_CentralOfficeModelWS.prototype.setOrganizationUnit
//
function TNS1_CentralOfficeModelWS_getOrganizationUnit() { return this._organizationUnit;}

TNS1_CentralOfficeModelWS.prototype.getOrganizationUnit = TNS1_CentralOfficeModelWS_getOrganizationUnit;

function TNS1_CentralOfficeModelWS_setOrganizationUnit(value) { this._organizationUnit = value;}

TNS1_CentralOfficeModelWS.prototype.setOrganizationUnit = TNS1_CentralOfficeModelWS_setOrganizationUnit;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}CentralOfficeModelWS
//
function TNS1_CentralOfficeModelWS_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._building == null) {
      xml = xml + '<building xsi:nil=\'true\'/>';
     } else {
      xml = xml + this._building.serialize(cxfjsutils, 'building', null);
     }
    }
    // block for local variables
    {
     if (this._fechaAlta == null) {
      xml = xml + '<fechaAlta xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<fechaAlta>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._fechaAlta);
      xml = xml + '</fechaAlta>';
     }
    }
    // block for local variables
    {
     if (this._horario == null) {
      xml = xml + '<horario xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<horario>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._horario);
      xml = xml + '</horario>';
     }
    }
    // block for local variables
    {
     if (this._id_edificio == null) {
      xml = xml + '<id_edificio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_edificio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_edificio);
      xml = xml + '</id_edificio>';
     }
    }
    // block for local variables
    {
     if (this._id_sede == null) {
      xml = xml + '<id_sede xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_sede>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_sede);
      xml = xml + '</id_sede>';
     }
    }
    // block for local variables
    {
     if (this._id_unidad == null) {
      xml = xml + '<id_unidad xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_unidad>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_unidad);
      xml = xml + '</id_unidad>';
     }
    }
    // block for local variables
    {
     if (this._observaciones == null) {
      xml = xml + '<observaciones xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<observaciones>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._observaciones);
      xml = xml + '</observaciones>';
     }
    }
    // block for local variables
    {
     if (this._organizationUnit == null) {
      xml = xml + '<organizationUnit xsi:nil=\'true\'/>';
     } else {
      xml = xml + this._organizationUnit.serialize(cxfjsutils, 'organizationUnit', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_CentralOfficeModelWS.prototype.serialize = TNS1_CentralOfficeModelWS_serialize;

function TNS1_CentralOfficeModelWS_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_CentralOfficeModelWS();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing building');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     item = TNS1_BuildingModelWS_deserialize(cxfjsutils, curElement);
    }
    newobject.setBuilding(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing fechaAlta');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setFechaAlta(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing horario');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setHorario(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_edificio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_edificio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_sede');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_sede(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_unidad');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_unidad(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing observaciones');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setObservaciones(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing organizationUnit');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     item = TNS1_OrganizationalUnitModelWS_deserialize(cxfjsutils, curElement);
    }
    newobject.setOrganizationUnit(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}BuildingModel
//
function TNS1_BuildingModel () {
    this.typeMarker = 'TNS1_BuildingModel';
    this._coordX = 0.0;
    this._coordY = 0.0;
    this._distritoPostal = null;
    this._fechaBaja = null;
    this._idEdificio = null;
    this._letraPortal = null;
    this._municipio = null;
    this._nombre = null;
    this._numPortal = null;
    this._provincia = null;
    this._tipoVia = null;
    this._via = null;
}

//
// accessor is TNS1_BuildingModel.prototype.getCoordX
// element get for coordX
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coordX
// setter function is is TNS1_BuildingModel.prototype.setCoordX
//
function TNS1_BuildingModel_getCoordX() { return this._coordX;}

TNS1_BuildingModel.prototype.getCoordX = TNS1_BuildingModel_getCoordX;

function TNS1_BuildingModel_setCoordX(value) { this._coordX = value;}

TNS1_BuildingModel.prototype.setCoordX = TNS1_BuildingModel_setCoordX;
//
// accessor is TNS1_BuildingModel.prototype.getCoordY
// element get for coordY
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coordY
// setter function is is TNS1_BuildingModel.prototype.setCoordY
//
function TNS1_BuildingModel_getCoordY() { return this._coordY;}

TNS1_BuildingModel.prototype.getCoordY = TNS1_BuildingModel_getCoordY;

function TNS1_BuildingModel_setCoordY(value) { this._coordY = value;}

TNS1_BuildingModel.prototype.setCoordY = TNS1_BuildingModel_setCoordY;
//
// accessor is TNS1_BuildingModel.prototype.getDistritoPostal
// element get for distritoPostal
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for distritoPostal
// setter function is is TNS1_BuildingModel.prototype.setDistritoPostal
//
function TNS1_BuildingModel_getDistritoPostal() { return this._distritoPostal;}

TNS1_BuildingModel.prototype.getDistritoPostal = TNS1_BuildingModel_getDistritoPostal;

function TNS1_BuildingModel_setDistritoPostal(value) { this._distritoPostal = value;}

TNS1_BuildingModel.prototype.setDistritoPostal = TNS1_BuildingModel_setDistritoPostal;
//
// accessor is TNS1_BuildingModel.prototype.getFechaBaja
// element get for fechaBaja
// - element type is {http://www.w3.org/2001/XMLSchema}dateTime
// - required element
// - nillable
//
// element set for fechaBaja
// setter function is is TNS1_BuildingModel.prototype.setFechaBaja
//
function TNS1_BuildingModel_getFechaBaja() { return this._fechaBaja;}

TNS1_BuildingModel.prototype.getFechaBaja = TNS1_BuildingModel_getFechaBaja;

function TNS1_BuildingModel_setFechaBaja(value) { this._fechaBaja = value;}

TNS1_BuildingModel.prototype.setFechaBaja = TNS1_BuildingModel_setFechaBaja;
//
// accessor is TNS1_BuildingModel.prototype.getIdEdificio
// element get for idEdificio
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for idEdificio
// setter function is is TNS1_BuildingModel.prototype.setIdEdificio
//
function TNS1_BuildingModel_getIdEdificio() { return this._idEdificio;}

TNS1_BuildingModel.prototype.getIdEdificio = TNS1_BuildingModel_getIdEdificio;

function TNS1_BuildingModel_setIdEdificio(value) { this._idEdificio = value;}

TNS1_BuildingModel.prototype.setIdEdificio = TNS1_BuildingModel_setIdEdificio;
//
// accessor is TNS1_BuildingModel.prototype.getLetraPortal
// element get for letraPortal
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for letraPortal
// setter function is is TNS1_BuildingModel.prototype.setLetraPortal
//
function TNS1_BuildingModel_getLetraPortal() { return this._letraPortal;}

TNS1_BuildingModel.prototype.getLetraPortal = TNS1_BuildingModel_getLetraPortal;

function TNS1_BuildingModel_setLetraPortal(value) { this._letraPortal = value;}

TNS1_BuildingModel.prototype.setLetraPortal = TNS1_BuildingModel_setLetraPortal;
//
// accessor is TNS1_BuildingModel.prototype.getMunicipio
// element get for municipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for municipio
// setter function is is TNS1_BuildingModel.prototype.setMunicipio
//
function TNS1_BuildingModel_getMunicipio() { return this._municipio;}

TNS1_BuildingModel.prototype.getMunicipio = TNS1_BuildingModel_getMunicipio;

function TNS1_BuildingModel_setMunicipio(value) { this._municipio = value;}

TNS1_BuildingModel.prototype.setMunicipio = TNS1_BuildingModel_setMunicipio;
//
// accessor is TNS1_BuildingModel.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_BuildingModel.prototype.setNombre
//
function TNS1_BuildingModel_getNombre() { return this._nombre;}

TNS1_BuildingModel.prototype.getNombre = TNS1_BuildingModel_getNombre;

function TNS1_BuildingModel_setNombre(value) { this._nombre = value;}

TNS1_BuildingModel.prototype.setNombre = TNS1_BuildingModel_setNombre;
//
// accessor is TNS1_BuildingModel.prototype.getNumPortal
// element get for numPortal
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for numPortal
// setter function is is TNS1_BuildingModel.prototype.setNumPortal
//
function TNS1_BuildingModel_getNumPortal() { return this._numPortal;}

TNS1_BuildingModel.prototype.getNumPortal = TNS1_BuildingModel_getNumPortal;

function TNS1_BuildingModel_setNumPortal(value) { this._numPortal = value;}

TNS1_BuildingModel.prototype.setNumPortal = TNS1_BuildingModel_setNumPortal;
//
// accessor is TNS1_BuildingModel.prototype.getProvincia
// element get for provincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for provincia
// setter function is is TNS1_BuildingModel.prototype.setProvincia
//
function TNS1_BuildingModel_getProvincia() { return this._provincia;}

TNS1_BuildingModel.prototype.getProvincia = TNS1_BuildingModel_getProvincia;

function TNS1_BuildingModel_setProvincia(value) { this._provincia = value;}

TNS1_BuildingModel.prototype.setProvincia = TNS1_BuildingModel_setProvincia;
//
// accessor is TNS1_BuildingModel.prototype.getTipoVia
// element get for tipoVia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipoVia
// setter function is is TNS1_BuildingModel.prototype.setTipoVia
//
function TNS1_BuildingModel_getTipoVia() { return this._tipoVia;}

TNS1_BuildingModel.prototype.getTipoVia = TNS1_BuildingModel_getTipoVia;

function TNS1_BuildingModel_setTipoVia(value) { this._tipoVia = value;}

TNS1_BuildingModel.prototype.setTipoVia = TNS1_BuildingModel_setTipoVia;
//
// accessor is TNS1_BuildingModel.prototype.getVia
// element get for via
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for via
// setter function is is TNS1_BuildingModel.prototype.setVia
//
function TNS1_BuildingModel_getVia() { return this._via;}

TNS1_BuildingModel.prototype.getVia = TNS1_BuildingModel_getVia;

function TNS1_BuildingModel_setVia(value) { this._via = value;}

TNS1_BuildingModel.prototype.setVia = TNS1_BuildingModel_setVia;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}BuildingModel
//
function TNS1_BuildingModel_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     xml = xml + '<coordX>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coordX);
     xml = xml + '</coordX>';
    }
    // block for local variables
    {
     xml = xml + '<coordY>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coordY);
     xml = xml + '</coordY>';
    }
    // block for local variables
    {
     if (this._distritoPostal == null) {
      xml = xml + '<distritoPostal xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<distritoPostal>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._distritoPostal);
      xml = xml + '</distritoPostal>';
     }
    }
    // block for local variables
    {
     if (this._fechaBaja == null) {
      xml = xml + '<fechaBaja xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<fechaBaja>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._fechaBaja);
      xml = xml + '</fechaBaja>';
     }
    }
    // block for local variables
    {
     if (this._idEdificio == null) {
      xml = xml + '<idEdificio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<idEdificio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idEdificio);
      xml = xml + '</idEdificio>';
     }
    }
    // block for local variables
    {
     if (this._letraPortal == null) {
      xml = xml + '<letraPortal xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<letraPortal>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._letraPortal);
      xml = xml + '</letraPortal>';
     }
    }
    // block for local variables
    {
     if (this._municipio == null) {
      xml = xml + '<municipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<municipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._municipio);
      xml = xml + '</municipio>';
     }
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._numPortal == null) {
      xml = xml + '<numPortal xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<numPortal>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._numPortal);
      xml = xml + '</numPortal>';
     }
    }
    // block for local variables
    {
     if (this._provincia == null) {
      xml = xml + '<provincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<provincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._provincia);
      xml = xml + '</provincia>';
     }
    }
    // block for local variables
    {
     if (this._tipoVia == null) {
      xml = xml + '<tipoVia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipoVia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipoVia);
      xml = xml + '</tipoVia>';
     }
    }
    // block for local variables
    {
     if (this._via == null) {
      xml = xml + '<via xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<via>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._via);
      xml = xml + '</via>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_BuildingModel.prototype.serialize = TNS1_BuildingModel_serialize;

function TNS1_BuildingModel_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_BuildingModel();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coordX');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoordX(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coordY');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoordY(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing distritoPostal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setDistritoPostal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing fechaBaja');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setFechaBaja(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idEdificio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setIdEdificio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing letraPortal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setLetraPortal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing municipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing numPortal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNumPortal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing provincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipoVia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipoVia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing via');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setVia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}NucleoPoblacion
//
function TNS1_NucleoPoblacion () {
    this.typeMarker = 'TNS1_NucleoPoblacion';
    this._extent = null;
    this._idNucleo = 0;
    this._municipio = null;
    this._nombre = null;
    this._tipo = null;
}

//
// accessor is TNS1_NucleoPoblacion.prototype.getExtent
// element get for extent
// - element type is {http://util.sig.guadaltel.com}BBox
// - required element
// - nillable
//
// element set for extent
// setter function is is TNS1_NucleoPoblacion.prototype.setExtent
//
function TNS1_NucleoPoblacion_getExtent() { return this._extent;}

TNS1_NucleoPoblacion.prototype.getExtent = TNS1_NucleoPoblacion_getExtent;

function TNS1_NucleoPoblacion_setExtent(value) { this._extent = value;}

TNS1_NucleoPoblacion.prototype.setExtent = TNS1_NucleoPoblacion_setExtent;
//
// accessor is TNS1_NucleoPoblacion.prototype.getIdNucleo
// element get for idNucleo
// - element type is {http://www.w3.org/2001/XMLSchema}int
// - required element
//
// element set for idNucleo
// setter function is is TNS1_NucleoPoblacion.prototype.setIdNucleo
//
function TNS1_NucleoPoblacion_getIdNucleo() { return this._idNucleo;}

TNS1_NucleoPoblacion.prototype.getIdNucleo = TNS1_NucleoPoblacion_getIdNucleo;

function TNS1_NucleoPoblacion_setIdNucleo(value) { this._idNucleo = value;}

TNS1_NucleoPoblacion.prototype.setIdNucleo = TNS1_NucleoPoblacion_setIdNucleo;
//
// accessor is TNS1_NucleoPoblacion.prototype.getMunicipio
// element get for municipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for municipio
// setter function is is TNS1_NucleoPoblacion.prototype.setMunicipio
//
function TNS1_NucleoPoblacion_getMunicipio() { return this._municipio;}

TNS1_NucleoPoblacion.prototype.getMunicipio = TNS1_NucleoPoblacion_getMunicipio;

function TNS1_NucleoPoblacion_setMunicipio(value) { this._municipio = value;}

TNS1_NucleoPoblacion.prototype.setMunicipio = TNS1_NucleoPoblacion_setMunicipio;
//
// accessor is TNS1_NucleoPoblacion.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_NucleoPoblacion.prototype.setNombre
//
function TNS1_NucleoPoblacion_getNombre() { return this._nombre;}

TNS1_NucleoPoblacion.prototype.getNombre = TNS1_NucleoPoblacion_getNombre;

function TNS1_NucleoPoblacion_setNombre(value) { this._nombre = value;}

TNS1_NucleoPoblacion.prototype.setNombre = TNS1_NucleoPoblacion_setNombre;
//
// accessor is TNS1_NucleoPoblacion.prototype.getTipo
// element get for tipo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipo
// setter function is is TNS1_NucleoPoblacion.prototype.setTipo
//
function TNS1_NucleoPoblacion_getTipo() { return this._tipo;}

TNS1_NucleoPoblacion.prototype.getTipo = TNS1_NucleoPoblacion_getTipo;

function TNS1_NucleoPoblacion_setTipo(value) { this._tipo = value;}

TNS1_NucleoPoblacion.prototype.setTipo = TNS1_NucleoPoblacion_setTipo;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}NucleoPoblacion
//
function TNS1_NucleoPoblacion_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._extent == null) {
      xml = xml + '<extent xsi:nil=\'true\'/>';
     } else {
      xml = xml + this._extent.serialize(cxfjsutils, 'extent', null);
     }
    }
    // block for local variables
    {
     xml = xml + '<idNucleo>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._idNucleo);
     xml = xml + '</idNucleo>';
    }
    // block for local variables
    {
     if (this._municipio == null) {
      xml = xml + '<municipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<municipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._municipio);
      xml = xml + '</municipio>';
     }
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._tipo == null) {
      xml = xml + '<tipo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipo);
      xml = xml + '</tipo>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_NucleoPoblacion.prototype.serialize = TNS1_NucleoPoblacion_serialize;

function TNS1_NucleoPoblacion_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_NucleoPoblacion();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing extent');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     item = TNS2_BBox_deserialize(cxfjsutils, curElement);
    }
    newobject.setExtent(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idNucleo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setIdNucleo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing municipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Version
//
function TNS1_Version () {
    this.typeMarker = 'TNS1_Version';
    this._fecha = null;
    this._version = null;
}

//
// accessor is TNS1_Version.prototype.getFecha
// element get for fecha
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for fecha
// setter function is is TNS1_Version.prototype.setFecha
//
function TNS1_Version_getFecha() { return this._fecha;}

TNS1_Version.prototype.getFecha = TNS1_Version_getFecha;

function TNS1_Version_setFecha(value) { this._fecha = value;}

TNS1_Version.prototype.setFecha = TNS1_Version_setFecha;
//
// accessor is TNS1_Version.prototype.getVersion
// element get for version
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for version
// setter function is is TNS1_Version.prototype.setVersion
//
function TNS1_Version_getVersion() { return this._version;}

TNS1_Version.prototype.getVersion = TNS1_Version_getVersion;

function TNS1_Version_setVersion(value) { this._version = value;}

TNS1_Version.prototype.setVersion = TNS1_Version_setVersion;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Version
//
function TNS1_Version_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._fecha == null) {
      xml = xml + '<fecha xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<fecha>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._fecha);
      xml = xml + '</fecha>';
     }
    }
    // block for local variables
    {
     if (this._version == null) {
      xml = xml + '<version xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<version>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._version);
      xml = xml + '</version>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Version.prototype.serialize = TNS1_Version_serialize;

function TNS1_Version_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Version();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing fecha');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setFecha(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing version');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setVersion(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}TipoVia
//
function TNS1_TipoVia () {
    this.typeMarker = 'TNS1_TipoVia';
    this._nombre = null;
}

//
// accessor is TNS1_TipoVia.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_TipoVia.prototype.setNombre
//
function TNS1_TipoVia_getNombre() { return this._nombre;}

TNS1_TipoVia.prototype.getNombre = TNS1_TipoVia_getNombre;

function TNS1_TipoVia_setNombre(value) { this._nombre = value;}

TNS1_TipoVia.prototype.setNombre = TNS1_TipoVia_setNombre;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}TipoVia
//
function TNS1_TipoVia_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_TipoVia.prototype.serialize = TNS1_TipoVia_serialize;

function TNS1_TipoVia_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_TipoVia();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}TypeOfOrganizationalUnitModel
//
function TNS1_TypeOfOrganizationalUnitModel () {
    this.typeMarker = 'TNS1_TypeOfOrganizationalUnitModel';
    this._idTipo = null;
    this._tipo = null;
}

//
// accessor is TNS1_TypeOfOrganizationalUnitModel.prototype.getIdTipo
// element get for idTipo
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for idTipo
// setter function is is TNS1_TypeOfOrganizationalUnitModel.prototype.setIdTipo
//
function TNS1_TypeOfOrganizationalUnitModel_getIdTipo() { return this._idTipo;}

TNS1_TypeOfOrganizationalUnitModel.prototype.getIdTipo = TNS1_TypeOfOrganizationalUnitModel_getIdTipo;

function TNS1_TypeOfOrganizationalUnitModel_setIdTipo(value) { this._idTipo = value;}

TNS1_TypeOfOrganizationalUnitModel.prototype.setIdTipo = TNS1_TypeOfOrganizationalUnitModel_setIdTipo;
//
// accessor is TNS1_TypeOfOrganizationalUnitModel.prototype.getTipo
// element get for tipo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipo
// setter function is is TNS1_TypeOfOrganizationalUnitModel.prototype.setTipo
//
function TNS1_TypeOfOrganizationalUnitModel_getTipo() { return this._tipo;}

TNS1_TypeOfOrganizationalUnitModel.prototype.getTipo = TNS1_TypeOfOrganizationalUnitModel_getTipo;

function TNS1_TypeOfOrganizationalUnitModel_setTipo(value) { this._tipo = value;}

TNS1_TypeOfOrganizationalUnitModel.prototype.setTipo = TNS1_TypeOfOrganizationalUnitModel_setTipo;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}TypeOfOrganizationalUnitModel
//
function TNS1_TypeOfOrganizationalUnitModel_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._idTipo == null) {
      xml = xml + '<idTipo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<idTipo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idTipo);
      xml = xml + '</idTipo>';
     }
    }
    // block for local variables
    {
     if (this._tipo == null) {
      xml = xml + '<tipo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipo);
      xml = xml + '</tipo>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_TypeOfOrganizationalUnitModel.prototype.serialize = TNS1_TypeOfOrganizationalUnitModel_serialize;

function TNS1_TypeOfOrganizationalUnitModel_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_TypeOfOrganizationalUnitModel();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idTipo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setIdTipo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Servicio
//
function TNS1_Servicio () {
    this.typeMarker = 'TNS1_Servicio';
    this._alias = null;
    this._nombreMunicipio = null;
    this._x = 0.0;
    this._y = 0.0;
}

//
// accessor is TNS1_Servicio.prototype.getAlias
// element get for alias
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for alias
// setter function is is TNS1_Servicio.prototype.setAlias
//
function TNS1_Servicio_getAlias() { return this._alias;}

TNS1_Servicio.prototype.getAlias = TNS1_Servicio_getAlias;

function TNS1_Servicio_setAlias(value) { this._alias = value;}

TNS1_Servicio.prototype.setAlias = TNS1_Servicio_setAlias;
//
// accessor is TNS1_Servicio.prototype.getNombreMunicipio
// element get for nombreMunicipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombreMunicipio
// setter function is is TNS1_Servicio.prototype.setNombreMunicipio
//
function TNS1_Servicio_getNombreMunicipio() { return this._nombreMunicipio;}

TNS1_Servicio.prototype.getNombreMunicipio = TNS1_Servicio_getNombreMunicipio;

function TNS1_Servicio_setNombreMunicipio(value) { this._nombreMunicipio = value;}

TNS1_Servicio.prototype.setNombreMunicipio = TNS1_Servicio_setNombreMunicipio;
//
// accessor is TNS1_Servicio.prototype.getX
// element get for x
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for x
// setter function is is TNS1_Servicio.prototype.setX
//
function TNS1_Servicio_getX() { return this._x;}

TNS1_Servicio.prototype.getX = TNS1_Servicio_getX;

function TNS1_Servicio_setX(value) { this._x = value;}

TNS1_Servicio.prototype.setX = TNS1_Servicio_setX;
//
// accessor is TNS1_Servicio.prototype.getY
// element get for y
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for y
// setter function is is TNS1_Servicio.prototype.setY
//
function TNS1_Servicio_getY() { return this._y;}

TNS1_Servicio.prototype.getY = TNS1_Servicio_getY;

function TNS1_Servicio_setY(value) { this._y = value;}

TNS1_Servicio.prototype.setY = TNS1_Servicio_setY;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Servicio
//
function TNS1_Servicio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._alias == null) {
      xml = xml + '<alias xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<alias>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._alias);
      xml = xml + '</alias>';
     }
    }
    // block for local variables
    {
     if (this._nombreMunicipio == null) {
      xml = xml + '<nombreMunicipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombreMunicipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombreMunicipio);
      xml = xml + '</nombreMunicipio>';
     }
    }
    // block for local variables
    {
     xml = xml + '<x>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._x);
     xml = xml + '</x>';
    }
    // block for local variables
    {
     xml = xml + '<y>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._y);
     xml = xml + '</y>';
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Servicio.prototype.serialize = TNS1_Servicio_serialize;

function TNS1_Servicio_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Servicio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing alias');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setAlias(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombreMunicipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombreMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing x');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setX(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing y');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setY(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}TipoServicio
//
function TNS1_TipoServicio () {
    this.typeMarker = 'TNS1_TipoServicio';
    this._codigo = null;
    this._nombre = null;
}

//
// accessor is TNS1_TipoServicio.prototype.getCodigo
// element get for codigo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for codigo
// setter function is is TNS1_TipoServicio.prototype.setCodigo
//
function TNS1_TipoServicio_getCodigo() { return this._codigo;}

TNS1_TipoServicio.prototype.getCodigo = TNS1_TipoServicio_getCodigo;

function TNS1_TipoServicio_setCodigo(value) { this._codigo = value;}

TNS1_TipoServicio.prototype.setCodigo = TNS1_TipoServicio_setCodigo;
//
// accessor is TNS1_TipoServicio.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_TipoServicio.prototype.setNombre
//
function TNS1_TipoServicio_getNombre() { return this._nombre;}

TNS1_TipoServicio.prototype.getNombre = TNS1_TipoServicio_getNombre;

function TNS1_TipoServicio_setNombre(value) { this._nombre = value;}

TNS1_TipoServicio.prototype.setNombre = TNS1_TipoServicio_setNombre;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}TipoServicio
//
function TNS1_TipoServicio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._codigo == null) {
      xml = xml + '<codigo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<codigo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._codigo);
      xml = xml + '</codigo>';
     }
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_TipoServicio.prototype.serialize = TNS1_TipoServicio_serialize;

function TNS1_TipoServicio_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_TipoServicio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing codigo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setCodigo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}TipoCarretera
//
function TNS1_TipoCarretera () {
    this.typeMarker = 'TNS1_TipoCarretera';
    this._nombre = null;
}

//
// accessor is TNS1_TipoCarretera.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_TipoCarretera.prototype.setNombre
//
function TNS1_TipoCarretera_getNombre() { return this._nombre;}

TNS1_TipoCarretera.prototype.getNombre = TNS1_TipoCarretera_getNombre;

function TNS1_TipoCarretera_setNombre(value) { this._nombre = value;}

TNS1_TipoCarretera.prototype.setNombre = TNS1_TipoCarretera_setNombre;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}TipoCarretera
//
function TNS1_TipoCarretera_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_TipoCarretera.prototype.serialize = TNS1_TipoCarretera_serialize;

function TNS1_TipoCarretera_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_TipoCarretera();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}GeocoderResult
//
function TNS1_GeocoderResult () {
    this.typeMarker = 'TNS1_GeocoderResult';
    this._coordinateX = 0.0;
    this._coordinateY = 0.0;
    this._letra = null;
    this._locality = null;
    this._matchLevel = null;
    this._noMatchInfo = null;
    this._resultType = null;
    this._rotulo = null;
    this._similarity = 0.0;
    this._streetName = null;
    this._streetNumber = 0;
    this._streetType = null;
}

//
// accessor is TNS1_GeocoderResult.prototype.getCoordinateX
// element get for coordinateX
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coordinateX
// setter function is is TNS1_GeocoderResult.prototype.setCoordinateX
//
function TNS1_GeocoderResult_getCoordinateX() { return this._coordinateX;}

TNS1_GeocoderResult.prototype.getCoordinateX = TNS1_GeocoderResult_getCoordinateX;

function TNS1_GeocoderResult_setCoordinateX(value) { this._coordinateX = value;}

TNS1_GeocoderResult.prototype.setCoordinateX = TNS1_GeocoderResult_setCoordinateX;
//
// accessor is TNS1_GeocoderResult.prototype.getCoordinateY
// element get for coordinateY
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coordinateY
// setter function is is TNS1_GeocoderResult.prototype.setCoordinateY
//
function TNS1_GeocoderResult_getCoordinateY() { return this._coordinateY;}

TNS1_GeocoderResult.prototype.getCoordinateY = TNS1_GeocoderResult_getCoordinateY;

function TNS1_GeocoderResult_setCoordinateY(value) { this._coordinateY = value;}

TNS1_GeocoderResult.prototype.setCoordinateY = TNS1_GeocoderResult_setCoordinateY;
//
// accessor is TNS1_GeocoderResult.prototype.getLetra
// element get for letra
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for letra
// setter function is is TNS1_GeocoderResult.prototype.setLetra
//
function TNS1_GeocoderResult_getLetra() { return this._letra;}

TNS1_GeocoderResult.prototype.getLetra = TNS1_GeocoderResult_getLetra;

function TNS1_GeocoderResult_setLetra(value) { this._letra = value;}

TNS1_GeocoderResult.prototype.setLetra = TNS1_GeocoderResult_setLetra;
//
// accessor is TNS1_GeocoderResult.prototype.getLocality
// element get for locality
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for locality
// setter function is is TNS1_GeocoderResult.prototype.setLocality
//
function TNS1_GeocoderResult_getLocality() { return this._locality;}

TNS1_GeocoderResult.prototype.getLocality = TNS1_GeocoderResult_getLocality;

function TNS1_GeocoderResult_setLocality(value) { this._locality = value;}

TNS1_GeocoderResult.prototype.setLocality = TNS1_GeocoderResult_setLocality;
//
// accessor is TNS1_GeocoderResult.prototype.getMatchLevel
// element get for matchLevel
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for matchLevel
// setter function is is TNS1_GeocoderResult.prototype.setMatchLevel
//
function TNS1_GeocoderResult_getMatchLevel() { return this._matchLevel;}

TNS1_GeocoderResult.prototype.getMatchLevel = TNS1_GeocoderResult_getMatchLevel;

function TNS1_GeocoderResult_setMatchLevel(value) { this._matchLevel = value;}

TNS1_GeocoderResult.prototype.setMatchLevel = TNS1_GeocoderResult_setMatchLevel;
//
// accessor is TNS1_GeocoderResult.prototype.getNoMatchInfo
// element get for noMatchInfo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for noMatchInfo
// setter function is is TNS1_GeocoderResult.prototype.setNoMatchInfo
//
function TNS1_GeocoderResult_getNoMatchInfo() { return this._noMatchInfo;}

TNS1_GeocoderResult.prototype.getNoMatchInfo = TNS1_GeocoderResult_getNoMatchInfo;

function TNS1_GeocoderResult_setNoMatchInfo(value) { this._noMatchInfo = value;}

TNS1_GeocoderResult.prototype.setNoMatchInfo = TNS1_GeocoderResult_setNoMatchInfo;
//
// accessor is TNS1_GeocoderResult.prototype.getResultType
// element get for resultType
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for resultType
// setter function is is TNS1_GeocoderResult.prototype.setResultType
//
function TNS1_GeocoderResult_getResultType() { return this._resultType;}

TNS1_GeocoderResult.prototype.getResultType = TNS1_GeocoderResult_getResultType;

function TNS1_GeocoderResult_setResultType(value) { this._resultType = value;}

TNS1_GeocoderResult.prototype.setResultType = TNS1_GeocoderResult_setResultType;
//
// accessor is TNS1_GeocoderResult.prototype.getRotulo
// element get for rotulo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for rotulo
// setter function is is TNS1_GeocoderResult.prototype.setRotulo
//
function TNS1_GeocoderResult_getRotulo() { return this._rotulo;}

TNS1_GeocoderResult.prototype.getRotulo = TNS1_GeocoderResult_getRotulo;

function TNS1_GeocoderResult_setRotulo(value) { this._rotulo = value;}

TNS1_GeocoderResult.prototype.setRotulo = TNS1_GeocoderResult_setRotulo;
//
// accessor is TNS1_GeocoderResult.prototype.getSimilarity
// element get for similarity
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for similarity
// setter function is is TNS1_GeocoderResult.prototype.setSimilarity
//
function TNS1_GeocoderResult_getSimilarity() { return this._similarity;}

TNS1_GeocoderResult.prototype.getSimilarity = TNS1_GeocoderResult_getSimilarity;

function TNS1_GeocoderResult_setSimilarity(value) { this._similarity = value;}

TNS1_GeocoderResult.prototype.setSimilarity = TNS1_GeocoderResult_setSimilarity;
//
// accessor is TNS1_GeocoderResult.prototype.getStreetName
// element get for streetName
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for streetName
// setter function is is TNS1_GeocoderResult.prototype.setStreetName
//
function TNS1_GeocoderResult_getStreetName() { return this._streetName;}

TNS1_GeocoderResult.prototype.getStreetName = TNS1_GeocoderResult_getStreetName;

function TNS1_GeocoderResult_setStreetName(value) { this._streetName = value;}

TNS1_GeocoderResult.prototype.setStreetName = TNS1_GeocoderResult_setStreetName;
//
// accessor is TNS1_GeocoderResult.prototype.getStreetNumber
// element get for streetNumber
// - element type is {http://www.w3.org/2001/XMLSchema}int
// - required element
//
// element set for streetNumber
// setter function is is TNS1_GeocoderResult.prototype.setStreetNumber
//
function TNS1_GeocoderResult_getStreetNumber() { return this._streetNumber;}

TNS1_GeocoderResult.prototype.getStreetNumber = TNS1_GeocoderResult_getStreetNumber;

function TNS1_GeocoderResult_setStreetNumber(value) { this._streetNumber = value;}

TNS1_GeocoderResult.prototype.setStreetNumber = TNS1_GeocoderResult_setStreetNumber;
//
// accessor is TNS1_GeocoderResult.prototype.getStreetType
// element get for streetType
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for streetType
// setter function is is TNS1_GeocoderResult.prototype.setStreetType
//
function TNS1_GeocoderResult_getStreetType() { return this._streetType;}

TNS1_GeocoderResult.prototype.getStreetType = TNS1_GeocoderResult_getStreetType;

function TNS1_GeocoderResult_setStreetType(value) { this._streetType = value;}

TNS1_GeocoderResult.prototype.setStreetType = TNS1_GeocoderResult_setStreetType;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}GeocoderResult
//
function TNS1_GeocoderResult_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     xml = xml + '<coordinateX>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coordinateX);
     xml = xml + '</coordinateX>';
    }
    // block for local variables
    {
     xml = xml + '<coordinateY>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coordinateY);
     xml = xml + '</coordinateY>';
    }
    // block for local variables
    {
     if (this._letra == null) {
      xml = xml + '<letra xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<letra>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._letra);
      xml = xml + '</letra>';
     }
    }
    // block for local variables
    {
     if (this._locality == null) {
      xml = xml + '<locality xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<locality>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._locality);
      xml = xml + '</locality>';
     }
    }
    // block for local variables
    {
     if (this._matchLevel == null) {
      xml = xml + '<matchLevel xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<matchLevel>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._matchLevel);
      xml = xml + '</matchLevel>';
     }
    }
    // block for local variables
    {
     if (this._noMatchInfo == null) {
      xml = xml + '<noMatchInfo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<noMatchInfo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._noMatchInfo);
      xml = xml + '</noMatchInfo>';
     }
    }
    // block for local variables
    {
     if (this._resultType == null) {
      xml = xml + '<resultType xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<resultType>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._resultType);
      xml = xml + '</resultType>';
     }
    }
    // block for local variables
    {
     if (this._rotulo == null) {
      xml = xml + '<rotulo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<rotulo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._rotulo);
      xml = xml + '</rotulo>';
     }
    }
    // block for local variables
    {
     xml = xml + '<similarity>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._similarity);
     xml = xml + '</similarity>';
    }
    // block for local variables
    {
     if (this._streetName == null) {
      xml = xml + '<streetName xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<streetName>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._streetName);
      xml = xml + '</streetName>';
     }
    }
    // block for local variables
    {
     xml = xml + '<streetNumber>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._streetNumber);
     xml = xml + '</streetNumber>';
    }
    // block for local variables
    {
     if (this._streetType == null) {
      xml = xml + '<streetType xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<streetType>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._streetType);
      xml = xml + '</streetType>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_GeocoderResult.prototype.serialize = TNS1_GeocoderResult_serialize;

function TNS1_GeocoderResult_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_GeocoderResult();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coordinateX');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoordinateX(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coordinateY');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoordinateY(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing letra');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setLetra(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing locality');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setLocality(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing matchLevel');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMatchLevel(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing noMatchInfo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNoMatchInfo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing resultType');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setResultType(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing rotulo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setRotulo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing similarity');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setSimilarity(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing streetName');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setStreetName(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing streetNumber');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setStreetNumber(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing streetType');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setStreetType(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Address
//
function TNS1_Address () {
    this.typeMarker = 'TNS1_Address';
    this._codigoPostal = 0;
    this._complementos = null;
    this._direccionNormalizada = null;
    this._direccionSinNormalizar = null;
    this._municipio = null;
    this._nombreVia = null;
    this._numeroPortal = null;
    this._provincia = null;
    this._tipoVia = null;
}

//
// accessor is TNS1_Address.prototype.getCodigoPostal
// element get for codigoPostal
// - element type is {http://www.w3.org/2001/XMLSchema}int
// - required element
//
// element set for codigoPostal
// setter function is is TNS1_Address.prototype.setCodigoPostal
//
function TNS1_Address_getCodigoPostal() { return this._codigoPostal;}

TNS1_Address.prototype.getCodigoPostal = TNS1_Address_getCodigoPostal;

function TNS1_Address_setCodigoPostal(value) { this._codigoPostal = value;}

TNS1_Address.prototype.setCodigoPostal = TNS1_Address_setCodigoPostal;
//
// accessor is TNS1_Address.prototype.getComplementos
// element get for complementos
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for complementos
// setter function is is TNS1_Address.prototype.setComplementos
//
function TNS1_Address_getComplementos() { return this._complementos;}

TNS1_Address.prototype.getComplementos = TNS1_Address_getComplementos;

function TNS1_Address_setComplementos(value) { this._complementos = value;}

TNS1_Address.prototype.setComplementos = TNS1_Address_setComplementos;
//
// accessor is TNS1_Address.prototype.getDireccionNormalizada
// element get for direccionNormalizada
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for direccionNormalizada
// setter function is is TNS1_Address.prototype.setDireccionNormalizada
//
function TNS1_Address_getDireccionNormalizada() { return this._direccionNormalizada;}

TNS1_Address.prototype.getDireccionNormalizada = TNS1_Address_getDireccionNormalizada;

function TNS1_Address_setDireccionNormalizada(value) { this._direccionNormalizada = value;}

TNS1_Address.prototype.setDireccionNormalizada = TNS1_Address_setDireccionNormalizada;
//
// accessor is TNS1_Address.prototype.getDireccionSinNormalizar
// element get for direccionSinNormalizar
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for direccionSinNormalizar
// setter function is is TNS1_Address.prototype.setDireccionSinNormalizar
//
function TNS1_Address_getDireccionSinNormalizar() { return this._direccionSinNormalizar;}

TNS1_Address.prototype.getDireccionSinNormalizar = TNS1_Address_getDireccionSinNormalizar;

function TNS1_Address_setDireccionSinNormalizar(value) { this._direccionSinNormalizar = value;}

TNS1_Address.prototype.setDireccionSinNormalizar = TNS1_Address_setDireccionSinNormalizar;
//
// accessor is TNS1_Address.prototype.getMunicipio
// element get for municipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for municipio
// setter function is is TNS1_Address.prototype.setMunicipio
//
function TNS1_Address_getMunicipio() { return this._municipio;}

TNS1_Address.prototype.getMunicipio = TNS1_Address_getMunicipio;

function TNS1_Address_setMunicipio(value) { this._municipio = value;}

TNS1_Address.prototype.setMunicipio = TNS1_Address_setMunicipio;
//
// accessor is TNS1_Address.prototype.getNombreVia
// element get for nombreVia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombreVia
// setter function is is TNS1_Address.prototype.setNombreVia
//
function TNS1_Address_getNombreVia() { return this._nombreVia;}

TNS1_Address.prototype.getNombreVia = TNS1_Address_getNombreVia;

function TNS1_Address_setNombreVia(value) { this._nombreVia = value;}

TNS1_Address.prototype.setNombreVia = TNS1_Address_setNombreVia;
//
// accessor is TNS1_Address.prototype.getNumeroPortal
// element get for numeroPortal
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for numeroPortal
// setter function is is TNS1_Address.prototype.setNumeroPortal
//
function TNS1_Address_getNumeroPortal() { return this._numeroPortal;}

TNS1_Address.prototype.getNumeroPortal = TNS1_Address_getNumeroPortal;

function TNS1_Address_setNumeroPortal(value) { this._numeroPortal = value;}

TNS1_Address.prototype.setNumeroPortal = TNS1_Address_setNumeroPortal;
//
// accessor is TNS1_Address.prototype.getProvincia
// element get for provincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for provincia
// setter function is is TNS1_Address.prototype.setProvincia
//
function TNS1_Address_getProvincia() { return this._provincia;}

TNS1_Address.prototype.getProvincia = TNS1_Address_getProvincia;

function TNS1_Address_setProvincia(value) { this._provincia = value;}

TNS1_Address.prototype.setProvincia = TNS1_Address_setProvincia;
//
// accessor is TNS1_Address.prototype.getTipoVia
// element get for tipoVia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipoVia
// setter function is is TNS1_Address.prototype.setTipoVia
//
function TNS1_Address_getTipoVia() { return this._tipoVia;}

TNS1_Address.prototype.getTipoVia = TNS1_Address_getTipoVia;

function TNS1_Address_setTipoVia(value) { this._tipoVia = value;}

TNS1_Address.prototype.setTipoVia = TNS1_Address_setTipoVia;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Address
//
function TNS1_Address_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     xml = xml + '<codigoPostal>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._codigoPostal);
     xml = xml + '</codigoPostal>';
    }
    // block for local variables
    {
     if (this._complementos == null) {
      xml = xml + '<complementos xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<complementos>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._complementos);
      xml = xml + '</complementos>';
     }
    }
    // block for local variables
    {
     if (this._direccionNormalizada == null) {
      xml = xml + '<direccionNormalizada xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<direccionNormalizada>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._direccionNormalizada);
      xml = xml + '</direccionNormalizada>';
     }
    }
    // block for local variables
    {
     if (this._direccionSinNormalizar == null) {
      xml = xml + '<direccionSinNormalizar xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<direccionSinNormalizar>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._direccionSinNormalizar);
      xml = xml + '</direccionSinNormalizar>';
     }
    }
    // block for local variables
    {
     if (this._municipio == null) {
      xml = xml + '<municipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<municipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._municipio);
      xml = xml + '</municipio>';
     }
    }
    // block for local variables
    {
     if (this._nombreVia == null) {
      xml = xml + '<nombreVia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombreVia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombreVia);
      xml = xml + '</nombreVia>';
     }
    }
    // block for local variables
    {
     if (this._numeroPortal == null) {
      xml = xml + '<numeroPortal xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<numeroPortal>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._numeroPortal);
      xml = xml + '</numeroPortal>';
     }
    }
    // block for local variables
    {
     if (this._provincia == null) {
      xml = xml + '<provincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<provincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._provincia);
      xml = xml + '</provincia>';
     }
    }
    // block for local variables
    {
     if (this._tipoVia == null) {
      xml = xml + '<tipoVia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipoVia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipoVia);
      xml = xml + '</tipoVia>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Address.prototype.serialize = TNS1_Address_serialize;

function TNS1_Address_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Address();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing codigoPostal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setCodigoPostal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing complementos');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setComplementos(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing direccionNormalizada');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setDireccionNormalizada(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing direccionSinNormalizar');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setDireccionSinNormalizar(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing municipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombreVia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombreVia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing numeroPortal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNumeroPortal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing provincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipoVia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipoVia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Municipio
//
function TNS1_Municipio () {
    this.typeMarker = 'TNS1_Municipio';
    this._idMunicipio = null;
    this._idProvincia = null;
    this._nombreMunicipio = null;
    this._nombreProvincia = null;
}

//
// accessor is TNS1_Municipio.prototype.getIdMunicipio
// element get for idMunicipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for idMunicipio
// setter function is is TNS1_Municipio.prototype.setIdMunicipio
//
function TNS1_Municipio_getIdMunicipio() { return this._idMunicipio;}

TNS1_Municipio.prototype.getIdMunicipio = TNS1_Municipio_getIdMunicipio;

function TNS1_Municipio_setIdMunicipio(value) { this._idMunicipio = value;}

TNS1_Municipio.prototype.setIdMunicipio = TNS1_Municipio_setIdMunicipio;
//
// accessor is TNS1_Municipio.prototype.getIdProvincia
// element get for idProvincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for idProvincia
// setter function is is TNS1_Municipio.prototype.setIdProvincia
//
function TNS1_Municipio_getIdProvincia() { return this._idProvincia;}

TNS1_Municipio.prototype.getIdProvincia = TNS1_Municipio_getIdProvincia;

function TNS1_Municipio_setIdProvincia(value) { this._idProvincia = value;}

TNS1_Municipio.prototype.setIdProvincia = TNS1_Municipio_setIdProvincia;
//
// accessor is TNS1_Municipio.prototype.getNombreMunicipio
// element get for nombreMunicipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombreMunicipio
// setter function is is TNS1_Municipio.prototype.setNombreMunicipio
//
function TNS1_Municipio_getNombreMunicipio() { return this._nombreMunicipio;}

TNS1_Municipio.prototype.getNombreMunicipio = TNS1_Municipio_getNombreMunicipio;

function TNS1_Municipio_setNombreMunicipio(value) { this._nombreMunicipio = value;}

TNS1_Municipio.prototype.setNombreMunicipio = TNS1_Municipio_setNombreMunicipio;
//
// accessor is TNS1_Municipio.prototype.getNombreProvincia
// element get for nombreProvincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombreProvincia
// setter function is is TNS1_Municipio.prototype.setNombreProvincia
//
function TNS1_Municipio_getNombreProvincia() { return this._nombreProvincia;}

TNS1_Municipio.prototype.getNombreProvincia = TNS1_Municipio_getNombreProvincia;

function TNS1_Municipio_setNombreProvincia(value) { this._nombreProvincia = value;}

TNS1_Municipio.prototype.setNombreProvincia = TNS1_Municipio_setNombreProvincia;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Municipio
//
function TNS1_Municipio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._idMunicipio == null) {
      xml = xml + '<idMunicipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<idMunicipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idMunicipio);
      xml = xml + '</idMunicipio>';
     }
    }
    // block for local variables
    {
     if (this._idProvincia == null) {
      xml = xml + '<idProvincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<idProvincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idProvincia);
      xml = xml + '</idProvincia>';
     }
    }
    // block for local variables
    {
     if (this._nombreMunicipio == null) {
      xml = xml + '<nombreMunicipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombreMunicipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombreMunicipio);
      xml = xml + '</nombreMunicipio>';
     }
    }
    // block for local variables
    {
     if (this._nombreProvincia == null) {
      xml = xml + '<nombreProvincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombreProvincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombreProvincia);
      xml = xml + '</nombreProvincia>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Municipio.prototype.serialize = TNS1_Municipio_serialize;

function TNS1_Municipio_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Municipio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idMunicipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setIdMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idProvincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setIdProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombreMunicipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombreMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombreProvincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombreProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Province
//
function TNS1_Province () {
    this.typeMarker = 'TNS1_Province';
    this._nombre = null;
}

//
// accessor is TNS1_Province.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_Province.prototype.setNombre
//
function TNS1_Province_getNombre() { return this._nombre;}

TNS1_Province.prototype.getNombre = TNS1_Province_getNombre;

function TNS1_Province_setNombre(value) { this._nombre = value;}

TNS1_Province.prototype.setNombre = TNS1_Province_setNombre;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Province
//
function TNS1_Province_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Province.prototype.serialize = TNS1_Province_serialize;

function TNS1_Province_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Province();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS
//
function TNS1_OrganizationalUnitModelWS () {
    this.typeMarker = 'TNS1_OrganizationalUnitModelWS';
    this._id_padre = null;
    this._id_tipo = null;
    this._id_unidad = null;
    this._nombre = null;
    this._padre = null;
    this._sede = null;
    this._tipo = null;
}

//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getId_padre
// element get for id_padre
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_padre
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setId_padre
//
function TNS1_OrganizationalUnitModelWS_getId_padre() { return this._id_padre;}

TNS1_OrganizationalUnitModelWS.prototype.getId_padre = TNS1_OrganizationalUnitModelWS_getId_padre;

function TNS1_OrganizationalUnitModelWS_setId_padre(value) { this._id_padre = value;}

TNS1_OrganizationalUnitModelWS.prototype.setId_padre = TNS1_OrganizationalUnitModelWS_setId_padre;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getId_tipo
// element get for id_tipo
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_tipo
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setId_tipo
//
function TNS1_OrganizationalUnitModelWS_getId_tipo() { return this._id_tipo;}

TNS1_OrganizationalUnitModelWS.prototype.getId_tipo = TNS1_OrganizationalUnitModelWS_getId_tipo;

function TNS1_OrganizationalUnitModelWS_setId_tipo(value) { this._id_tipo = value;}

TNS1_OrganizationalUnitModelWS.prototype.setId_tipo = TNS1_OrganizationalUnitModelWS_setId_tipo;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getId_unidad
// element get for id_unidad
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_unidad
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setId_unidad
//
function TNS1_OrganizationalUnitModelWS_getId_unidad() { return this._id_unidad;}

TNS1_OrganizationalUnitModelWS.prototype.getId_unidad = TNS1_OrganizationalUnitModelWS_getId_unidad;

function TNS1_OrganizationalUnitModelWS_setId_unidad(value) { this._id_unidad = value;}

TNS1_OrganizationalUnitModelWS.prototype.setId_unidad = TNS1_OrganizationalUnitModelWS_setId_unidad;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setNombre
//
function TNS1_OrganizationalUnitModelWS_getNombre() { return this._nombre;}

TNS1_OrganizationalUnitModelWS.prototype.getNombre = TNS1_OrganizationalUnitModelWS_getNombre;

function TNS1_OrganizationalUnitModelWS_setNombre(value) { this._nombre = value;}

TNS1_OrganizationalUnitModelWS.prototype.setNombre = TNS1_OrganizationalUnitModelWS_setNombre;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getPadre
// element get for padre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for padre
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setPadre
//
function TNS1_OrganizationalUnitModelWS_getPadre() { return this._padre;}

TNS1_OrganizationalUnitModelWS.prototype.getPadre = TNS1_OrganizationalUnitModelWS_getPadre;

function TNS1_OrganizationalUnitModelWS_setPadre(value) { this._padre = value;}

TNS1_OrganizationalUnitModelWS.prototype.setPadre = TNS1_OrganizationalUnitModelWS_setPadre;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getSede
// element get for sede
// - element type is {http://dto.callejero.juntadeandalucia.es}CentralOfficeModelWS
// - required element
// - nillable
//
// element set for sede
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setSede
//
function TNS1_OrganizationalUnitModelWS_getSede() { return this._sede;}

TNS1_OrganizationalUnitModelWS.prototype.getSede = TNS1_OrganizationalUnitModelWS_getSede;

function TNS1_OrganizationalUnitModelWS_setSede(value) { this._sede = value;}

TNS1_OrganizationalUnitModelWS.prototype.setSede = TNS1_OrganizationalUnitModelWS_setSede;
//
// accessor is TNS1_OrganizationalUnitModelWS.prototype.getTipo
// element get for tipo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipo
// setter function is is TNS1_OrganizationalUnitModelWS.prototype.setTipo
//
function TNS1_OrganizationalUnitModelWS_getTipo() { return this._tipo;}

TNS1_OrganizationalUnitModelWS.prototype.getTipo = TNS1_OrganizationalUnitModelWS_getTipo;

function TNS1_OrganizationalUnitModelWS_setTipo(value) { this._tipo = value;}

TNS1_OrganizationalUnitModelWS.prototype.setTipo = TNS1_OrganizationalUnitModelWS_setTipo;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS
//
function TNS1_OrganizationalUnitModelWS_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._id_padre == null) {
      xml = xml + '<id_padre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_padre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_padre);
      xml = xml + '</id_padre>';
     }
    }
    // block for local variables
    {
     if (this._id_tipo == null) {
      xml = xml + '<id_tipo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_tipo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_tipo);
      xml = xml + '</id_tipo>';
     }
    }
    // block for local variables
    {
     if (this._id_unidad == null) {
      xml = xml + '<id_unidad xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_unidad>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_unidad);
      xml = xml + '</id_unidad>';
     }
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._padre == null) {
      xml = xml + '<padre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<padre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._padre);
      xml = xml + '</padre>';
     }
    }
    // block for local variables
    {
     if (this._sede == null) {
      xml = xml + '<sede xsi:nil=\'true\'/>';
     } else {
      xml = xml + this._sede.serialize(cxfjsutils, 'sede', null);
     }
    }
    // block for local variables
    {
     if (this._tipo == null) {
      xml = xml + '<tipo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipo);
      xml = xml + '</tipo>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_OrganizationalUnitModelWS.prototype.serialize = TNS1_OrganizationalUnitModelWS_serialize;

function TNS1_OrganizationalUnitModelWS_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_OrganizationalUnitModelWS();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_padre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_padre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_tipo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_tipo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_unidad');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_unidad(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing padre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setPadre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing sede');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     item = TNS1_CentralOfficeModelWS_deserialize(cxfjsutils, curElement);
    }
    newobject.setSede(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}BuildingModelWS
//
function TNS1_BuildingModelWS () {
    this.typeMarker = 'TNS1_BuildingModelWS';
    this._coord_x = 0.0;
    this._coord_y = 0.0;
    this._distrito = null;
    this._id_edificio = null;
    this._municipio = null;
    this._nombre_via = null;
    this._num_portal = null;
    this._provincia = null;
    this._tipo_via = null;
}

//
// accessor is TNS1_BuildingModelWS.prototype.getCoord_x
// element get for coord_x
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coord_x
// setter function is is TNS1_BuildingModelWS.prototype.setCoord_x
//
function TNS1_BuildingModelWS_getCoord_x() { return this._coord_x;}

TNS1_BuildingModelWS.prototype.getCoord_x = TNS1_BuildingModelWS_getCoord_x;

function TNS1_BuildingModelWS_setCoord_x(value) { this._coord_x = value;}

TNS1_BuildingModelWS.prototype.setCoord_x = TNS1_BuildingModelWS_setCoord_x;
//
// accessor is TNS1_BuildingModelWS.prototype.getCoord_y
// element get for coord_y
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for coord_y
// setter function is is TNS1_BuildingModelWS.prototype.setCoord_y
//
function TNS1_BuildingModelWS_getCoord_y() { return this._coord_y;}

TNS1_BuildingModelWS.prototype.getCoord_y = TNS1_BuildingModelWS_getCoord_y;

function TNS1_BuildingModelWS_setCoord_y(value) { this._coord_y = value;}

TNS1_BuildingModelWS.prototype.setCoord_y = TNS1_BuildingModelWS_setCoord_y;
//
// accessor is TNS1_BuildingModelWS.prototype.getDistrito
// element get for distrito
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for distrito
// setter function is is TNS1_BuildingModelWS.prototype.setDistrito
//
function TNS1_BuildingModelWS_getDistrito() { return this._distrito;}

TNS1_BuildingModelWS.prototype.getDistrito = TNS1_BuildingModelWS_getDistrito;

function TNS1_BuildingModelWS_setDistrito(value) { this._distrito = value;}

TNS1_BuildingModelWS.prototype.setDistrito = TNS1_BuildingModelWS_setDistrito;
//
// accessor is TNS1_BuildingModelWS.prototype.getId_edificio
// element get for id_edificio
// - element type is {http://www.w3.org/2001/XMLSchema}long
// - required element
// - nillable
//
// element set for id_edificio
// setter function is is TNS1_BuildingModelWS.prototype.setId_edificio
//
function TNS1_BuildingModelWS_getId_edificio() { return this._id_edificio;}

TNS1_BuildingModelWS.prototype.getId_edificio = TNS1_BuildingModelWS_getId_edificio;

function TNS1_BuildingModelWS_setId_edificio(value) { this._id_edificio = value;}

TNS1_BuildingModelWS.prototype.setId_edificio = TNS1_BuildingModelWS_setId_edificio;
//
// accessor is TNS1_BuildingModelWS.prototype.getMunicipio
// element get for municipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for municipio
// setter function is is TNS1_BuildingModelWS.prototype.setMunicipio
//
function TNS1_BuildingModelWS_getMunicipio() { return this._municipio;}

TNS1_BuildingModelWS.prototype.getMunicipio = TNS1_BuildingModelWS_getMunicipio;

function TNS1_BuildingModelWS_setMunicipio(value) { this._municipio = value;}

TNS1_BuildingModelWS.prototype.setMunicipio = TNS1_BuildingModelWS_setMunicipio;
//
// accessor is TNS1_BuildingModelWS.prototype.getNombre_via
// element get for nombre_via
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre_via
// setter function is is TNS1_BuildingModelWS.prototype.setNombre_via
//
function TNS1_BuildingModelWS_getNombre_via() { return this._nombre_via;}

TNS1_BuildingModelWS.prototype.getNombre_via = TNS1_BuildingModelWS_getNombre_via;

function TNS1_BuildingModelWS_setNombre_via(value) { this._nombre_via = value;}

TNS1_BuildingModelWS.prototype.setNombre_via = TNS1_BuildingModelWS_setNombre_via;
//
// accessor is TNS1_BuildingModelWS.prototype.getNum_portal
// element get for num_portal
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for num_portal
// setter function is is TNS1_BuildingModelWS.prototype.setNum_portal
//
function TNS1_BuildingModelWS_getNum_portal() { return this._num_portal;}

TNS1_BuildingModelWS.prototype.getNum_portal = TNS1_BuildingModelWS_getNum_portal;

function TNS1_BuildingModelWS_setNum_portal(value) { this._num_portal = value;}

TNS1_BuildingModelWS.prototype.setNum_portal = TNS1_BuildingModelWS_setNum_portal;
//
// accessor is TNS1_BuildingModelWS.prototype.getProvincia
// element get for provincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for provincia
// setter function is is TNS1_BuildingModelWS.prototype.setProvincia
//
function TNS1_BuildingModelWS_getProvincia() { return this._provincia;}

TNS1_BuildingModelWS.prototype.getProvincia = TNS1_BuildingModelWS_getProvincia;

function TNS1_BuildingModelWS_setProvincia(value) { this._provincia = value;}

TNS1_BuildingModelWS.prototype.setProvincia = TNS1_BuildingModelWS_setProvincia;
//
// accessor is TNS1_BuildingModelWS.prototype.getTipo_via
// element get for tipo_via
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for tipo_via
// setter function is is TNS1_BuildingModelWS.prototype.setTipo_via
//
function TNS1_BuildingModelWS_getTipo_via() { return this._tipo_via;}

TNS1_BuildingModelWS.prototype.getTipo_via = TNS1_BuildingModelWS_getTipo_via;

function TNS1_BuildingModelWS_setTipo_via(value) { this._tipo_via = value;}

TNS1_BuildingModelWS.prototype.setTipo_via = TNS1_BuildingModelWS_setTipo_via;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}BuildingModelWS
//
function TNS1_BuildingModelWS_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     xml = xml + '<coord_x>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coord_x);
     xml = xml + '</coord_x>';
    }
    // block for local variables
    {
     xml = xml + '<coord_y>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._coord_y);
     xml = xml + '</coord_y>';
    }
    // block for local variables
    {
     if (this._distrito == null) {
      xml = xml + '<distrito xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<distrito>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._distrito);
      xml = xml + '</distrito>';
     }
    }
    // block for local variables
    {
     if (this._id_edificio == null) {
      xml = xml + '<id_edificio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<id_edificio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._id_edificio);
      xml = xml + '</id_edificio>';
     }
    }
    // block for local variables
    {
     if (this._municipio == null) {
      xml = xml + '<municipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<municipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._municipio);
      xml = xml + '</municipio>';
     }
    }
    // block for local variables
    {
     if (this._nombre_via == null) {
      xml = xml + '<nombre_via xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre_via>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre_via);
      xml = xml + '</nombre_via>';
     }
    }
    // block for local variables
    {
     if (this._num_portal == null) {
      xml = xml + '<num_portal xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<num_portal>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._num_portal);
      xml = xml + '</num_portal>';
     }
    }
    // block for local variables
    {
     if (this._provincia == null) {
      xml = xml + '<provincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<provincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._provincia);
      xml = xml + '</provincia>';
     }
    }
    // block for local variables
    {
     if (this._tipo_via == null) {
      xml = xml + '<tipo_via xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<tipo_via>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._tipo_via);
      xml = xml + '</tipo_via>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_BuildingModelWS.prototype.serialize = TNS1_BuildingModelWS_serialize;

function TNS1_BuildingModelWS_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_BuildingModelWS();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coord_x');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoord_x(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing coord_y');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setCoord_y(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing distrito');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setDistrito(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing id_edificio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseInt(value);
    }
    newobject.setId_edificio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing municipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre_via');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre_via(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing num_portal');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNum_portal(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing provincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing tipo_via');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setTipo_via(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}Sede
//
function TNS1_Sede () {
    this.typeMarker = 'TNS1_Sede';
    this._direccion = null;
    this._municipio = null;
    this._nombre = null;
    this._numero = null;
    this._organismo = null;
    this._unidadOrganizativa = null;
    this._x = 0.0;
    this._y = 0.0;
}

//
// accessor is TNS1_Sede.prototype.getDireccion
// element get for direccion
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for direccion
// setter function is is TNS1_Sede.prototype.setDireccion
//
function TNS1_Sede_getDireccion() { return this._direccion;}

TNS1_Sede.prototype.getDireccion = TNS1_Sede_getDireccion;

function TNS1_Sede_setDireccion(value) { this._direccion = value;}

TNS1_Sede.prototype.setDireccion = TNS1_Sede_setDireccion;
//
// accessor is TNS1_Sede.prototype.getMunicipio
// element get for municipio
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for municipio
// setter function is is TNS1_Sede.prototype.setMunicipio
//
function TNS1_Sede_getMunicipio() { return this._municipio;}

TNS1_Sede.prototype.getMunicipio = TNS1_Sede_getMunicipio;

function TNS1_Sede_setMunicipio(value) { this._municipio = value;}

TNS1_Sede.prototype.setMunicipio = TNS1_Sede_setMunicipio;
//
// accessor is TNS1_Sede.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for nombre
// setter function is is TNS1_Sede.prototype.setNombre
//
function TNS1_Sede_getNombre() { return this._nombre;}

TNS1_Sede.prototype.getNombre = TNS1_Sede_getNombre;

function TNS1_Sede_setNombre(value) { this._nombre = value;}

TNS1_Sede.prototype.setNombre = TNS1_Sede_setNombre;
//
// accessor is TNS1_Sede.prototype.getNumero
// element get for numero
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for numero
// setter function is is TNS1_Sede.prototype.setNumero
//
function TNS1_Sede_getNumero() { return this._numero;}

TNS1_Sede.prototype.getNumero = TNS1_Sede_getNumero;

function TNS1_Sede_setNumero(value) { this._numero = value;}

TNS1_Sede.prototype.setNumero = TNS1_Sede_setNumero;
//
// accessor is TNS1_Sede.prototype.getOrganismo
// element get for organismo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for organismo
// setter function is is TNS1_Sede.prototype.setOrganismo
//
function TNS1_Sede_getOrganismo() { return this._organismo;}

TNS1_Sede.prototype.getOrganismo = TNS1_Sede_getOrganismo;

function TNS1_Sede_setOrganismo(value) { this._organismo = value;}

TNS1_Sede.prototype.setOrganismo = TNS1_Sede_setOrganismo;
//
// accessor is TNS1_Sede.prototype.getUnidadOrganizativa
// element get for unidadOrganizativa
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for unidadOrganizativa
// setter function is is TNS1_Sede.prototype.setUnidadOrganizativa
//
function TNS1_Sede_getUnidadOrganizativa() { return this._unidadOrganizativa;}

TNS1_Sede.prototype.getUnidadOrganizativa = TNS1_Sede_getUnidadOrganizativa;

function TNS1_Sede_setUnidadOrganizativa(value) { this._unidadOrganizativa = value;}

TNS1_Sede.prototype.setUnidadOrganizativa = TNS1_Sede_setUnidadOrganizativa;
//
// accessor is TNS1_Sede.prototype.getX
// element get for x
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for x
// setter function is is TNS1_Sede.prototype.setX
//
function TNS1_Sede_getX() { return this._x;}

TNS1_Sede.prototype.getX = TNS1_Sede_getX;

function TNS1_Sede_setX(value) { this._x = value;}

TNS1_Sede.prototype.setX = TNS1_Sede_setX;
//
// accessor is TNS1_Sede.prototype.getY
// element get for y
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for y
// setter function is is TNS1_Sede.prototype.setY
//
function TNS1_Sede_getY() { return this._y;}

TNS1_Sede.prototype.getY = TNS1_Sede_getY;

function TNS1_Sede_setY(value) { this._y = value;}

TNS1_Sede.prototype.setY = TNS1_Sede_setY;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}Sede
//
function TNS1_Sede_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._direccion == null) {
      xml = xml + '<direccion xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<direccion>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._direccion);
      xml = xml + '</direccion>';
     }
    }
    // block for local variables
    {
     if (this._municipio == null) {
      xml = xml + '<municipio xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<municipio>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._municipio);
      xml = xml + '</municipio>';
     }
    }
    // block for local variables
    {
     if (this._nombre == null) {
      xml = xml + '<nombre xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._numero == null) {
      xml = xml + '<numero xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<numero>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._numero);
      xml = xml + '</numero>';
     }
    }
    // block for local variables
    {
     if (this._organismo == null) {
      xml = xml + '<organismo xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<organismo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._organismo);
      xml = xml + '</organismo>';
     }
    }
    // block for local variables
    {
     if (this._unidadOrganizativa == null) {
      xml = xml + '<unidadOrganizativa xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<unidadOrganizativa>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._unidadOrganizativa);
      xml = xml + '</unidadOrganizativa>';
     }
    }
    // block for local variables
    {
     xml = xml + '<x>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._x);
     xml = xml + '</x>';
    }
    // block for local variables
    {
     xml = xml + '<y>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._y);
     xml = xml + '</y>';
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_Sede.prototype.serialize = TNS1_Sede_serialize;

function TNS1_Sede_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_Sede();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing direccion');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setDireccion(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing municipio');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setMunicipio(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNombre(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing numero');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setNumero(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing organismo');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setOrganismo(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing unidadOrganizativa');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setUnidadOrganizativa(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing x');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setX(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing y');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setY(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://dto.callejero.juntadeandalucia.es}PuntoKilometrico
//
function TNS1_PuntoKilometrico () {
    this.typeMarker = 'TNS1_PuntoKilometrico';
    this._carretera = null;
    this._pk = null;
    this._provincia = null;
    this._x = 0.0;
    this._y = 0.0;
}

//
// accessor is TNS1_PuntoKilometrico.prototype.getCarretera
// element get for carretera
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for carretera
// setter function is is TNS1_PuntoKilometrico.prototype.setCarretera
//
function TNS1_PuntoKilometrico_getCarretera() { return this._carretera;}

TNS1_PuntoKilometrico.prototype.getCarretera = TNS1_PuntoKilometrico_getCarretera;

function TNS1_PuntoKilometrico_setCarretera(value) { this._carretera = value;}

TNS1_PuntoKilometrico.prototype.setCarretera = TNS1_PuntoKilometrico_setCarretera;
//
// accessor is TNS1_PuntoKilometrico.prototype.getPk
// element get for pk
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for pk
// setter function is is TNS1_PuntoKilometrico.prototype.setPk
//
function TNS1_PuntoKilometrico_getPk() { return this._pk;}

TNS1_PuntoKilometrico.prototype.getPk = TNS1_PuntoKilometrico_getPk;

function TNS1_PuntoKilometrico_setPk(value) { this._pk = value;}

TNS1_PuntoKilometrico.prototype.setPk = TNS1_PuntoKilometrico_setPk;
//
// accessor is TNS1_PuntoKilometrico.prototype.getProvincia
// element get for provincia
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - nillable
//
// element set for provincia
// setter function is is TNS1_PuntoKilometrico.prototype.setProvincia
//
function TNS1_PuntoKilometrico_getProvincia() { return this._provincia;}

TNS1_PuntoKilometrico.prototype.getProvincia = TNS1_PuntoKilometrico_getProvincia;

function TNS1_PuntoKilometrico_setProvincia(value) { this._provincia = value;}

TNS1_PuntoKilometrico.prototype.setProvincia = TNS1_PuntoKilometrico_setProvincia;
//
// accessor is TNS1_PuntoKilometrico.prototype.getX
// element get for x
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for x
// setter function is is TNS1_PuntoKilometrico.prototype.setX
//
function TNS1_PuntoKilometrico_getX() { return this._x;}

TNS1_PuntoKilometrico.prototype.getX = TNS1_PuntoKilometrico_getX;

function TNS1_PuntoKilometrico_setX(value) { this._x = value;}

TNS1_PuntoKilometrico.prototype.setX = TNS1_PuntoKilometrico_setX;
//
// accessor is TNS1_PuntoKilometrico.prototype.getY
// element get for y
// - element type is {http://www.w3.org/2001/XMLSchema}double
// - required element
//
// element set for y
// setter function is is TNS1_PuntoKilometrico.prototype.setY
//
function TNS1_PuntoKilometrico_getY() { return this._y;}

TNS1_PuntoKilometrico.prototype.getY = TNS1_PuntoKilometrico_getY;

function TNS1_PuntoKilometrico_setY(value) { this._y = value;}

TNS1_PuntoKilometrico.prototype.setY = TNS1_PuntoKilometrico_setY;
//
// Serialize {http://dto.callejero.juntadeandalucia.es}PuntoKilometrico
//
function TNS1_PuntoKilometrico_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._carretera == null) {
      xml = xml + '<carretera xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<carretera>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._carretera);
      xml = xml + '</carretera>';
     }
    }
    // block for local variables
    {
     if (this._pk == null) {
      xml = xml + '<pk xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<pk>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._pk);
      xml = xml + '</pk>';
     }
    }
    // block for local variables
    {
     if (this._provincia == null) {
      xml = xml + '<provincia xsi:nil=\'true\'/>';
     } else {
      xml = xml + '<provincia>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._provincia);
      xml = xml + '</provincia>';
     }
    }
    // block for local variables
    {
     xml = xml + '<x>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._x);
     xml = xml + '</x>';
    }
    // block for local variables
    {
     xml = xml + '<y>';
     xml = xml + cxfjsutils.escapeXmlEntities(this._y);
     xml = xml + '</y>';
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

TNS1_PuntoKilometrico.prototype.serialize = TNS1_PuntoKilometrico_serialize;

function TNS1_PuntoKilometrico_deserialize (cxfjsutils, element) {
    var newobject = new TNS1_PuntoKilometrico();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing carretera');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setCarretera(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing pk');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setPk(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing provincia');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = value;
    }
    newobject.setProvincia(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing x');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setX(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing y');
    var value = null;
    if (!cxfjsutils.isElementNil(curElement)) {
     value = cxfjsutils.getNodeText(curElement);
     item = parseFloat(value);
    }
    newobject.setY(item);
    var item = null;
    if (curElement != null) {
     curElement = cxfjsutils.getNextElementSibling(curElement);
    }
    return newobject;
}

//
// Definitions for schema: http://xml.apache.org/xml-soap
//  file:/home/manueljmorillo/Escritorio/bueno_.wsdd#types5
//
//
// Constructor for XML Schema item {http://xml.apache.org/xml-soap}Vector
//
function APACHESOAP_Vector () {
    this.typeMarker = 'APACHESOAP_Vector';
    this._item = [];
}

//
// accessor is APACHESOAP_Vector.prototype.getItem
// element get for item
// - element type is {http://www.w3.org/2001/XMLSchema}anyType
// - required element
// - array
//
// element set for item
// setter function is is APACHESOAP_Vector.prototype.setItem
//
function APACHESOAP_Vector_getItem() { return this._item;}

APACHESOAP_Vector.prototype.getItem = APACHESOAP_Vector_getItem;

function APACHESOAP_Vector_setItem(value) { this._item = value;}

APACHESOAP_Vector.prototype.setItem = APACHESOAP_Vector_setItem;
//
// Serialize {http://xml.apache.org/xml-soap}Vector
//
function APACHESOAP_Vector_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        var anyHolder = this._item[ax];
        var anySerializer;
        var typeAttr = '';
        if (anyHolder != null) {
         if (!anyHolder.raw) {
          anySerializer = cxfjsutils.interfaceObject.globalElementSerializers[anyHolder.qname];
         }
         if (anyHolder.xsiType) {
          var typePrefix = 'cxfjst2';
          var typeAttr = 'xmlns:' + typePrefix + '=\'' + anyHolder.namespaceURI + '\'';
          typeAttr = typeAttr + ' xsi:type=\'' + typePrefix + ':' + anyHolder.localName + '\'';
         }
         if (anySerializer) {
          xml = xml + this._item[ax].serialize(cxfjsutils, 'item', typeAttr);
         } else {
          xml = xml + '<item ' + typeAttr + '>';
          if (!anyHolder.raw) {
           xml = xml + cxfjsutils.escapeXmlEntities(this._item[ax]);
          } else {
           xml = xml + anyHolder.xml;
          }
          xml = xml + '</item>';
         }
        } else {
         xml = xml + '<item xsi:nil=\'true\'/>';
        }
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

APACHESOAP_Vector.prototype.serialize = APACHESOAP_Vector_serialize;

function APACHESOAP_Vector_deserialize (cxfjsutils, element) {
    var newobject = new APACHESOAP_Vector();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = org_apache_cxf_deserialize_anyType(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Definitions for schema: http://exception.callejero.juntadeandalucia.es
//  file:/home/manueljmorillo/Escritorio/bueno_.wsdd#types4
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
    var newobject = new TNS3_CallejerosWSException();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    return newobject;
}

//
// Definitions for schema: http://localhost:7070/CallejeroWS/services/callejero
//  file:/home/manueljmorillo/Escritorio/bueno_.wsdd#types2
//
//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_anyType
//
function IMPL_ArrayOf_xsd_anyType () {
    this.typeMarker = 'IMPL_ArrayOf_xsd_anyType';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_xsd_anyType.prototype.getItem
// element get for item
// - element type is {http://www.w3.org/2001/XMLSchema}anyType
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_xsd_anyType.prototype.setItem
//
function IMPL_ArrayOf_xsd_anyType_getItem() { return this._item;}

IMPL_ArrayOf_xsd_anyType.prototype.getItem = IMPL_ArrayOf_xsd_anyType_getItem;

function IMPL_ArrayOf_xsd_anyType_setItem(value) { this._item = value;}

IMPL_ArrayOf_xsd_anyType.prototype.setItem = IMPL_ArrayOf_xsd_anyType_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_anyType
//
function IMPL_ArrayOf_xsd_anyType_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        var anyHolder = this._item[ax];
        var anySerializer;
        var typeAttr = '';
        if (anyHolder != null) {
         if (!anyHolder.raw) {
          anySerializer = cxfjsutils.interfaceObject.globalElementSerializers[anyHolder.qname];
         }
         if (anyHolder.xsiType) {
          var typePrefix = 'cxfjst3';
          var typeAttr = 'xmlns:' + typePrefix + '=\'' + anyHolder.namespaceURI + '\'';
          typeAttr = typeAttr + ' xsi:type=\'' + typePrefix + ':' + anyHolder.localName + '\'';
         }
         if (anySerializer) {
          xml = xml + this._item[ax].serialize(cxfjsutils, 'item', typeAttr);
         } else {
          xml = xml + '<item ' + typeAttr + '>';
          if (!anyHolder.raw) {
           xml = xml + cxfjsutils.escapeXmlEntities(this._item[ax]);
          } else {
           xml = xml + anyHolder.xml;
          }
          xml = xml + '</item>';
         }
        } else {
         xml = xml + '<item xsi:nil=\'true\'/>';
        }
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_xsd_anyType.prototype.serialize = IMPL_ArrayOf_xsd_anyType_serialize;

function IMPL_ArrayOf_xsd_anyType_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_xsd_anyType();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = org_apache_cxf_deserialize_anyType(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_NucleoPoblacion
//
function IMPL_ArrayOf_tns1_NucleoPoblacion () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_NucleoPoblacion';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_NucleoPoblacion.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}NucleoPoblacion
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_NucleoPoblacion.prototype.setItem
//
function IMPL_ArrayOf_tns1_NucleoPoblacion_getItem() { return this._item;}

IMPL_ArrayOf_tns1_NucleoPoblacion.prototype.getItem = IMPL_ArrayOf_tns1_NucleoPoblacion_getItem;

function IMPL_ArrayOf_tns1_NucleoPoblacion_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_NucleoPoblacion.prototype.setItem = IMPL_ArrayOf_tns1_NucleoPoblacion_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_NucleoPoblacion
//
function IMPL_ArrayOf_tns1_NucleoPoblacion_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_NucleoPoblacion.prototype.serialize = IMPL_ArrayOf_tns1_NucleoPoblacion_serialize;

function IMPL_ArrayOf_tns1_NucleoPoblacion_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_NucleoPoblacion();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_NucleoPoblacion_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_OrganizationalUnitModelWS
//
function IMPL_ArrayOf_tns1_OrganizationalUnitModelWS () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_OrganizationalUnitModelWS';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_OrganizationalUnitModelWS.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_OrganizationalUnitModelWS.prototype.setItem
//
function IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_getItem() { return this._item;}

IMPL_ArrayOf_tns1_OrganizationalUnitModelWS.prototype.getItem = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_getItem;

function IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_OrganizationalUnitModelWS.prototype.setItem = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_OrganizationalUnitModelWS
//
function IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_OrganizationalUnitModelWS.prototype.serialize = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_serialize;

function IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_OrganizationalUnitModelWS();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_OrganizationalUnitModelWS_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Municipio
//
function IMPL_ArrayOf_tns1_Municipio () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_Municipio';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_Municipio.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}Municipio
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_Municipio.prototype.setItem
//
function IMPL_ArrayOf_tns1_Municipio_getItem() { return this._item;}

IMPL_ArrayOf_tns1_Municipio.prototype.getItem = IMPL_ArrayOf_tns1_Municipio_getItem;

function IMPL_ArrayOf_tns1_Municipio_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_Municipio.prototype.setItem = IMPL_ArrayOf_tns1_Municipio_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Municipio
//
function IMPL_ArrayOf_tns1_Municipio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_Municipio.prototype.serialize = IMPL_ArrayOf_tns1_Municipio_serialize;

function IMPL_ArrayOf_tns1_Municipio_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_Municipio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_Municipio_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TypeOfOrganizationalUnitModel
//
function IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}TypeOfOrganizationalUnitModel
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel.prototype.setItem
//
function IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_getItem() { return this._item;}

IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel.prototype.getItem = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_getItem;

function IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel.prototype.setItem = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TypeOfOrganizationalUnitModel
//
function IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel.prototype.serialize = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_serialize;

function IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_TypeOfOrganizationalUnitModel_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_string
//
function IMPL_ArrayOf_xsd_string () {
    this.typeMarker = 'IMPL_ArrayOf_xsd_string';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_xsd_string.prototype.getItem
// element get for item
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_xsd_string.prototype.setItem
//
function IMPL_ArrayOf_xsd_string_getItem() { return this._item;}

IMPL_ArrayOf_xsd_string.prototype.getItem = IMPL_ArrayOf_xsd_string_getItem;

function IMPL_ArrayOf_xsd_string_setItem(value) { this._item = value;}

IMPL_ArrayOf_xsd_string.prototype.setItem = IMPL_ArrayOf_xsd_string_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_string
//
function IMPL_ArrayOf_xsd_string_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + '<item>';
        xml = xml + cxfjsutils.escapeXmlEntities(this._item[ax]);
        xml = xml + '</item>';
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_xsd_string.prototype.serialize = IMPL_ArrayOf_xsd_string_serialize;

function IMPL_ArrayOf_xsd_string_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_xsd_string();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       value = cxfjsutils.getNodeText(curElement);
       arrayItem = value;
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_BuildingModel
//
function IMPL_ArrayOf_tns1_BuildingModel () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_BuildingModel';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_BuildingModel.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}BuildingModel
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_BuildingModel.prototype.setItem
//
function IMPL_ArrayOf_tns1_BuildingModel_getItem() { return this._item;}

IMPL_ArrayOf_tns1_BuildingModel.prototype.getItem = IMPL_ArrayOf_tns1_BuildingModel_getItem;

function IMPL_ArrayOf_tns1_BuildingModel_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_BuildingModel.prototype.setItem = IMPL_ArrayOf_tns1_BuildingModel_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_BuildingModel
//
function IMPL_ArrayOf_tns1_BuildingModel_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_BuildingModel.prototype.serialize = IMPL_ArrayOf_tns1_BuildingModel_serialize;

function IMPL_ArrayOf_tns1_BuildingModel_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_BuildingModel();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_BuildingModel_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoCarretera
//
function IMPL_ArrayOf_tns1_TipoCarretera () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_TipoCarretera';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_TipoCarretera.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}TipoCarretera
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_TipoCarretera.prototype.setItem
//
function IMPL_ArrayOf_tns1_TipoCarretera_getItem() { return this._item;}

IMPL_ArrayOf_tns1_TipoCarretera.prototype.getItem = IMPL_ArrayOf_tns1_TipoCarretera_getItem;

function IMPL_ArrayOf_tns1_TipoCarretera_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_TipoCarretera.prototype.setItem = IMPL_ArrayOf_tns1_TipoCarretera_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoCarretera
//
function IMPL_ArrayOf_tns1_TipoCarretera_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_TipoCarretera.prototype.serialize = IMPL_ArrayOf_tns1_TipoCarretera_serialize;

function IMPL_ArrayOf_tns1_TipoCarretera_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_TipoCarretera();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_TipoCarretera_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoServicio
//
function IMPL_ArrayOf_tns1_TipoServicio () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_TipoServicio';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_TipoServicio.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}TipoServicio
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_TipoServicio.prototype.setItem
//
function IMPL_ArrayOf_tns1_TipoServicio_getItem() { return this._item;}

IMPL_ArrayOf_tns1_TipoServicio.prototype.getItem = IMPL_ArrayOf_tns1_TipoServicio_getItem;

function IMPL_ArrayOf_tns1_TipoServicio_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_TipoServicio.prototype.setItem = IMPL_ArrayOf_tns1_TipoServicio_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoServicio
//
function IMPL_ArrayOf_tns1_TipoServicio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_TipoServicio.prototype.serialize = IMPL_ArrayOf_tns1_TipoServicio_serialize;

function IMPL_ArrayOf_tns1_TipoServicio_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_TipoServicio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_TipoServicio_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Sede
//
function IMPL_ArrayOf_tns1_Sede () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_Sede';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_Sede.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}Sede
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_Sede.prototype.setItem
//
function IMPL_ArrayOf_tns1_Sede_getItem() { return this._item;}

IMPL_ArrayOf_tns1_Sede.prototype.getItem = IMPL_ArrayOf_tns1_Sede_getItem;

function IMPL_ArrayOf_tns1_Sede_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_Sede.prototype.setItem = IMPL_ArrayOf_tns1_Sede_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Sede
//
function IMPL_ArrayOf_tns1_Sede_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_Sede.prototype.serialize = IMPL_ArrayOf_tns1_Sede_serialize;

function IMPL_ArrayOf_tns1_Sede_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_Sede();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_Sede_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Province
//
function IMPL_ArrayOf_tns1_Province () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_Province';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_Province.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}Province
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_Province.prototype.setItem
//
function IMPL_ArrayOf_tns1_Province_getItem() { return this._item;}

IMPL_ArrayOf_tns1_Province.prototype.getItem = IMPL_ArrayOf_tns1_Province_getItem;

function IMPL_ArrayOf_tns1_Province_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_Province.prototype.setItem = IMPL_ArrayOf_tns1_Province_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Province
//
function IMPL_ArrayOf_tns1_Province_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_Province.prototype.serialize = IMPL_ArrayOf_tns1_Province_serialize;

function IMPL_ArrayOf_tns1_Province_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_Province();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_Province_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_PuntoKilometrico
//
function IMPL_ArrayOf_tns1_PuntoKilometrico () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_PuntoKilometrico';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_PuntoKilometrico.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}PuntoKilometrico
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_PuntoKilometrico.prototype.setItem
//
function IMPL_ArrayOf_tns1_PuntoKilometrico_getItem() { return this._item;}

IMPL_ArrayOf_tns1_PuntoKilometrico.prototype.getItem = IMPL_ArrayOf_tns1_PuntoKilometrico_getItem;

function IMPL_ArrayOf_tns1_PuntoKilometrico_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_PuntoKilometrico.prototype.setItem = IMPL_ArrayOf_tns1_PuntoKilometrico_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_PuntoKilometrico
//
function IMPL_ArrayOf_tns1_PuntoKilometrico_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_PuntoKilometrico.prototype.serialize = IMPL_ArrayOf_tns1_PuntoKilometrico_serialize;

function IMPL_ArrayOf_tns1_PuntoKilometrico_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_PuntoKilometrico();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_PuntoKilometrico_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_GeocoderResult
//
function IMPL_ArrayOf_tns1_GeocoderResult () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_GeocoderResult';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_GeocoderResult.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}GeocoderResult
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_GeocoderResult.prototype.setItem
//
function IMPL_ArrayOf_tns1_GeocoderResult_getItem() { return this._item;}

IMPL_ArrayOf_tns1_GeocoderResult.prototype.getItem = IMPL_ArrayOf_tns1_GeocoderResult_getItem;

function IMPL_ArrayOf_tns1_GeocoderResult_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_GeocoderResult.prototype.setItem = IMPL_ArrayOf_tns1_GeocoderResult_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_GeocoderResult
//
function IMPL_ArrayOf_tns1_GeocoderResult_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_GeocoderResult.prototype.serialize = IMPL_ArrayOf_tns1_GeocoderResult_serialize;

function IMPL_ArrayOf_tns1_GeocoderResult_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_GeocoderResult();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_GeocoderResult_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Servicio
//
function IMPL_ArrayOf_tns1_Servicio () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_Servicio';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_Servicio.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}Servicio
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_Servicio.prototype.setItem
//
function IMPL_ArrayOf_tns1_Servicio_getItem() { return this._item;}

IMPL_ArrayOf_tns1_Servicio.prototype.getItem = IMPL_ArrayOf_tns1_Servicio_getItem;

function IMPL_ArrayOf_tns1_Servicio_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_Servicio.prototype.setItem = IMPL_ArrayOf_tns1_Servicio_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Servicio
//
function IMPL_ArrayOf_tns1_Servicio_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_Servicio.prototype.serialize = IMPL_ArrayOf_tns1_Servicio_serialize;

function IMPL_ArrayOf_tns1_Servicio_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_Servicio();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_Servicio_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoVia
//
function IMPL_ArrayOf_tns1_TipoVia () {
    this.typeMarker = 'IMPL_ArrayOf_tns1_TipoVia';
    this._item = [];
}

//
// accessor is IMPL_ArrayOf_tns1_TipoVia.prototype.getItem
// element get for item
// - element type is {http://dto.callejero.juntadeandalucia.es}TipoVia
// - required element
// - array
//
// element set for item
// setter function is is IMPL_ArrayOf_tns1_TipoVia.prototype.setItem
//
function IMPL_ArrayOf_tns1_TipoVia_getItem() { return this._item;}

IMPL_ArrayOf_tns1_TipoVia.prototype.getItem = IMPL_ArrayOf_tns1_TipoVia_getItem;

function IMPL_ArrayOf_tns1_TipoVia_setItem(value) { this._item = value;}

IMPL_ArrayOf_tns1_TipoVia.prototype.setItem = IMPL_ArrayOf_tns1_TipoVia_setItem;
//
// Serialize {http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoVia
//
function IMPL_ArrayOf_tns1_TipoVia_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._item != null) {
      for (var ax = 0;ax < this._item.length;ax ++) {
       if (this._item[ax] == null) {
        xml = xml + '<item/>';
       } else {
        xml = xml + this._item[ax].serialize(cxfjsutils, 'item', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

IMPL_ArrayOf_tns1_TipoVia.prototype.serialize = IMPL_ArrayOf_tns1_TipoVia_serialize;

function IMPL_ArrayOf_tns1_TipoVia_deserialize (cxfjsutils, element) {
    var newobject = new IMPL_ArrayOf_tns1_TipoVia();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing item');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item')) {
     item = [];
     do  {
      var arrayItem;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = TNS1_TipoVia_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'item'));
     newobject.setItem(item);
     var item = null;
    }
    return newobject;
}

//
// Definitions for service: {http://localhost:7070/CallejeroWS/services/callejero}CallejeroServiceService
//

// Javascript for {http://localhost:7070/CallejeroWS/services/callejero}CallejeroService

function IMPL_CallejeroService () {
    this.jsutils = new CxfApacheOrgUtil();
    this.jsutils.interfaceObject = this;
    this.synchronous = false;
    this.url = null;
    this.client = null;
    this.response = null;
    this.globalElementSerializers = [];
    this.globalElementDeserializers = [];
    this.globalElementSerializers['{http://util.sig.guadaltel.com}BBox'] = TNS2_BBox_serialize;
    this.globalElementDeserializers['{http://util.sig.guadaltel.com}BBox'] = TNS2_BBox_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}CentralOfficeModelWS'] = TNS1_CentralOfficeModelWS_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}CentralOfficeModelWS'] = TNS1_CentralOfficeModelWS_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}BuildingModel'] = TNS1_BuildingModel_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}BuildingModel'] = TNS1_BuildingModel_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}NucleoPoblacion'] = TNS1_NucleoPoblacion_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}NucleoPoblacion'] = TNS1_NucleoPoblacion_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Version'] = TNS1_Version_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Version'] = TNS1_Version_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}TipoVia'] = TNS1_TipoVia_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}TipoVia'] = TNS1_TipoVia_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}TypeOfOrganizationalUnitModel'] = TNS1_TypeOfOrganizationalUnitModel_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}TypeOfOrganizationalUnitModel'] = TNS1_TypeOfOrganizationalUnitModel_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Servicio'] = TNS1_Servicio_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Servicio'] = TNS1_Servicio_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}TipoServicio'] = TNS1_TipoServicio_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}TipoServicio'] = TNS1_TipoServicio_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}TipoCarretera'] = TNS1_TipoCarretera_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}TipoCarretera'] = TNS1_TipoCarretera_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}GeocoderResult'] = TNS1_GeocoderResult_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}GeocoderResult'] = TNS1_GeocoderResult_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Address'] = TNS1_Address_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Address'] = TNS1_Address_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Municipio'] = TNS1_Municipio_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Municipio'] = TNS1_Municipio_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Province'] = TNS1_Province_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Province'] = TNS1_Province_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS'] = TNS1_OrganizationalUnitModelWS_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}OrganizationalUnitModelWS'] = TNS1_OrganizationalUnitModelWS_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}BuildingModelWS'] = TNS1_BuildingModelWS_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}BuildingModelWS'] = TNS1_BuildingModelWS_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}Sede'] = TNS1_Sede_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}Sede'] = TNS1_Sede_deserialize;
    this.globalElementSerializers['{http://dto.callejero.juntadeandalucia.es}PuntoKilometrico'] = TNS1_PuntoKilometrico_serialize;
    this.globalElementDeserializers['{http://dto.callejero.juntadeandalucia.es}PuntoKilometrico'] = TNS1_PuntoKilometrico_deserialize;
    this.globalElementSerializers['{http://xml.apache.org/xml-soap}Vector'] = APACHESOAP_Vector_serialize;
    this.globalElementDeserializers['{http://xml.apache.org/xml-soap}Vector'] = APACHESOAP_Vector_deserialize;
    this.globalElementSerializers['{http://exception.callejero.juntadeandalucia.es}CallejerosWSException'] = TNS3_CallejerosWSException_serialize;
    this.globalElementDeserializers['{http://exception.callejero.juntadeandalucia.es}CallejerosWSException'] = TNS3_CallejerosWSException_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_anyType'] = IMPL_ArrayOf_xsd_anyType_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_anyType'] = IMPL_ArrayOf_xsd_anyType_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_NucleoPoblacion'] = IMPL_ArrayOf_tns1_NucleoPoblacion_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_NucleoPoblacion'] = IMPL_ArrayOf_tns1_NucleoPoblacion_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_OrganizationalUnitModelWS'] = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_OrganizationalUnitModelWS'] = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Municipio'] = IMPL_ArrayOf_tns1_Municipio_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Municipio'] = IMPL_ArrayOf_tns1_Municipio_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TypeOfOrganizationalUnitModel'] = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TypeOfOrganizationalUnitModel'] = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_string'] = IMPL_ArrayOf_xsd_string_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_xsd_string'] = IMPL_ArrayOf_xsd_string_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_BuildingModel'] = IMPL_ArrayOf_tns1_BuildingModel_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_BuildingModel'] = IMPL_ArrayOf_tns1_BuildingModel_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoCarretera'] = IMPL_ArrayOf_tns1_TipoCarretera_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoCarretera'] = IMPL_ArrayOf_tns1_TipoCarretera_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoServicio'] = IMPL_ArrayOf_tns1_TipoServicio_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoServicio'] = IMPL_ArrayOf_tns1_TipoServicio_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Sede'] = IMPL_ArrayOf_tns1_Sede_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Sede'] = IMPL_ArrayOf_tns1_Sede_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Province'] = IMPL_ArrayOf_tns1_Province_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Province'] = IMPL_ArrayOf_tns1_Province_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_PuntoKilometrico'] = IMPL_ArrayOf_tns1_PuntoKilometrico_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_PuntoKilometrico'] = IMPL_ArrayOf_tns1_PuntoKilometrico_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_GeocoderResult'] = IMPL_ArrayOf_tns1_GeocoderResult_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_GeocoderResult'] = IMPL_ArrayOf_tns1_GeocoderResult_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Servicio'] = IMPL_ArrayOf_tns1_Servicio_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_Servicio'] = IMPL_ArrayOf_tns1_Servicio_deserialize;
    this.globalElementSerializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoVia'] = IMPL_ArrayOf_tns1_TipoVia_serialize;
    this.globalElementDeserializers['{http://localhost:7070/CallejeroWS/services/callejero}ArrayOf_tns1_TipoVia'] = IMPL_ArrayOf_tns1_TipoVia_deserialize;
}

function IMPL_getAllProvinces_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getAllProvincesResponse_deserializeResponse');
     responseObject = IMPL_getAllProvincesResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getAllProvinces
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
    xml = cxfjsutils.beginSoap11Message("");
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
    var returnObject = IMPL_ArrayOf_tns1_Province_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_geocoderInverso_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_geocoderInversoResponse_deserializeResponse');
     responseObject = IMPL_geocoderInversoResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.geocoderInverso_onsuccess = IMPL_geocoderInverso_op_onsuccess;

function IMPL_geocoderInverso_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoderInverso_onerror = IMPL_geocoderInverso_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}geocoderInverso
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}double
// - type {http://www.w3.org/2001/XMLSchema}double
//
function IMPL_geocoderInverso_op(successCallback, errorCallback, x, y) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(2);
    args[0] = x;
    args[1] = y;
    xml = this.geocoderInversoRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderInverso_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderInverso_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderInverso = IMPL_geocoderInverso_op;

function IMPL_geocoderInversoRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderInverso>';
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
    xml = xml + '</jns0:geocoderInverso>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderInversoRequest_serializeInput = IMPL_geocoderInversoRequest_serializeInput;

function IMPL_geocoderInversoResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_GeocoderResult_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_buscarCallejero_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_buscarCallejeroResponse_deserializeResponse');
     responseObject = IMPL_buscarCallejeroResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.buscarCallejero_onsuccess = IMPL_buscarCallejero_op_onsuccess;

function IMPL_buscarCallejero_op_onerror(client) {
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

IMPL_CallejeroService.prototype.buscarCallejero_onerror = IMPL_buscarCallejero_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}buscarCallejero
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_buscarCallejero_op(successCallback, errorCallback, query) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = query;
    xml = this.buscarCallejeroRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.buscarCallejero_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.buscarCallejero_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.buscarCallejero = IMPL_buscarCallejero_op;

function IMPL_buscarCallejeroRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:buscarCallejero>';
    // block for local variables
    {
     xml = xml + '<query>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</query>';
    }
    xml = xml + '</jns0:buscarCallejero>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.buscarCallejeroRequest_serializeInput = IMPL_buscarCallejeroRequest_serializeInput;

function IMPL_buscarCallejeroResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_xsd_anyType_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getCentralOfficeByBuilding_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
    /**
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getCentralOfficeByBuildingResponse_deserializeResponse');
     responseObject = IMPL_getCentralOfficeByBuildingResponse_deserializeResponse(this.jsutils, element);
     */
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getCentralOfficeByBuilding
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
function IMPL_getBuilding_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getBuildingResponse_deserializeResponse');
     responseObject = IMPL_getBuildingResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.getBuilding_onsuccess = IMPL_getBuilding_op_onsuccess;

function IMPL_getBuilding_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getBuilding_onerror = IMPL_getBuilding_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getBuilding
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getBuilding_op(successCallback, errorCallback, nombre_via, provincia, num_portal, tipo_via, nombre, municipio, distrito_postal, letra_portal) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(8);
    args[0] = nombre_via;
    args[1] = provincia;
    args[2] = num_portal;
    args[3] = tipo_via;
    args[4] = nombre;
    args[5] = municipio;
    args[6] = distrito_postal;
    args[7] = letra_portal;
    xml = this.getBuildingRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getBuilding_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getBuilding_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getBuilding = IMPL_getBuilding_op;

function IMPL_getBuildingRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getBuilding>';
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
    xml = xml + '</jns0:getBuilding>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getBuildingRequest_serializeInput = IMPL_getBuildingRequest_serializeInput;

function IMPL_getBuildingResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_BuildingModel_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_localizarServicios_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_localizarServiciosResponse_deserializeResponse');
     responseObject = IMPL_localizarServiciosResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.localizarServicios_onsuccess = IMPL_localizarServicios_op_onsuccess;

function IMPL_localizarServicios_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarServicios_onerror = IMPL_localizarServicios_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}localizarServicios
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_localizarServicios_op(successCallback, errorCallback, codine, codTipoServicio, codProv, cantidadRegistros, pagina, total) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(6);
    args[0] = codine;
    args[1] = codTipoServicio;
    args[2] = codProv;
    args[3] = cantidadRegistros;
    args[4] = pagina;
    args[5] = total;
    xml = this.localizarServiciosRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarServicios_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarServicios_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarServicios = IMPL_localizarServicios_op;

function IMPL_localizarServiciosRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarServicios>';
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
    xml = xml + '</jns0:localizarServicios>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarServiciosRequest_serializeInput = IMPL_localizarServiciosRequest_serializeInput;

function IMPL_localizarServiciosResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_Servicio_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_obtenerTiposServicios_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_obtenerTiposServiciosResponse_deserializeResponse');
     responseObject = IMPL_obtenerTiposServiciosResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}obtenerTiposServicios
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TipoServicio_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_obtenerMunicipios_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_obtenerMunicipiosResponse_deserializeResponse');
     responseObject = IMPL_obtenerMunicipiosResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}obtenerMunicipios
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_Municipio_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getChildrenOrganitazionalUnit_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getChildrenOrganitazionalUnitResponse_deserializeResponse');
     responseObject = IMPL_getChildrenOrganitazionalUnitResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getChildrenOrganitazionalUnit
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_localizarSedes_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_localizarSedesResponse_deserializeResponse');
     responseObject = IMPL_localizarSedesResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.localizarSedes_onsuccess = IMPL_localizarSedes_op_onsuccess;

function IMPL_localizarSedes_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarSedes_onerror = IMPL_localizarSedes_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}localizarSedes
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_localizarSedes_op(successCallback, errorCallback, codine, cadenaBusqueda, codProv, cantidadRegistros, pagina, total) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(6);
    args[0] = codine;
    args[1] = cadenaBusqueda;
    args[2] = codProv;
    args[3] = cantidadRegistros;
    args[4] = pagina;
    args[5] = total;
    xml = this.localizarSedesRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarSedes_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarSedes_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarSedes = IMPL_localizarSedes_op;

function IMPL_localizarSedesRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarSedes>';
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
    xml = xml + '</jns0:localizarSedes>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarSedesRequest_serializeInput = IMPL_localizarSedesRequest_serializeInput;

function IMPL_localizarSedesResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_Sede_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getCentralOffice_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getCentralOfficeResponse_deserializeResponse');
     responseObject = IMPL_getCentralOfficeResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.getCentralOffice_onsuccess = IMPL_getCentralOffice_op_onsuccess;

function IMPL_getCentralOffice_op_onerror(client) {
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

IMPL_CallejeroService.prototype.getCentralOffice_onerror = IMPL_getCentralOffice_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getCentralOffice
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_getCentralOffice_op(successCallback, errorCallback, id_CentralOffice) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = id_CentralOffice;
    xml = this.getCentralOfficeRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getCentralOffice_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getCentralOffice_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.getCentralOffice = IMPL_getCentralOffice_op;

function IMPL_getCentralOfficeRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:getCentralOffice>';
    // block for local variables
    {
     xml = xml + '<id_CentralOffice>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</id_CentralOffice>';
    }
    xml = xml + '</jns0:getCentralOffice>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.getCentralOfficeRequest_serializeInput = IMPL_getCentralOfficeRequest_serializeInput;

function IMPL_getCentralOfficeResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = TNS1_CentralOfficeModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_comprobarTipoVia_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_comprobarTipoViaResponse_deserializeResponse');
     responseObject = IMPL_comprobarTipoViaResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}comprobarTipoVia
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TipoVia_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getParentsLevel1_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getParentsLevel1Response_deserializeResponse');
     responseObject = IMPL_getParentsLevel1Response_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getParentsLevel1
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_geocoderList_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_geocoderListResponse_deserializeResponse');
     responseObject = IMPL_geocoderListResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.geocoderList_onsuccess = IMPL_geocoderList_op_onsuccess;

function IMPL_geocoderList_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoderList_onerror = IMPL_geocoderList_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}geocoderList
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderList_op(successCallback, errorCallback, streetname, streetnumber, streettype, locality) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(4);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = locality;
    xml = this.geocoderListRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderList_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderList_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderList = IMPL_geocoderList_op;

function IMPL_geocoderListRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderList>';
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
    xml = xml + '</jns0:geocoderList>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderListRequest_serializeInput = IMPL_geocoderListRequest_serializeInput;

function IMPL_geocoderListResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_GeocoderResult_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getParentsOrganizationalUnit_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getParentsOrganizationalUnitResponse_deserializeResponse');
     responseObject = IMPL_getParentsOrganizationalUnitResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getParentsOrganizationalUnit
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_geocoder_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_geocoderResponse_deserializeResponse');
     responseObject = IMPL_geocoderResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.geocoder_onsuccess = IMPL_geocoder_op_onsuccess;

function IMPL_geocoder_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoder_onerror = IMPL_geocoder_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}geocoder
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoder_op(successCallback, errorCallback, streetname, streetnumber, streettype, locality) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(4);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = locality;
    xml = this.geocoderRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoder_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoder_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoder = IMPL_geocoder_op;

function IMPL_geocoderRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoder>';
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
    xml = xml + '</jns0:geocoder>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderRequest_serializeInput = IMPL_geocoderRequest_serializeInput;

function IMPL_geocoderResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_xsd_string_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_obtenerTiposVia_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_obtenerTiposViaResponse_deserializeResponse');
     responseObject = IMPL_obtenerTiposViaResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}obtenerTiposVia
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TipoVia_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_test_op_onsuccess(client) {
    if (client.user_onsuccess) {
     var responseObject = null;
     client.user_onsuccess(responseObject);
    }
}

IMPL_CallejeroService.prototype.test_onsuccess = IMPL_test_op_onsuccess;

function IMPL_test_op_onerror(client) {
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

IMPL_CallejeroService.prototype.test_onerror = IMPL_test_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}test
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_test_op(successCallback, errorCallback, cadena) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = cadena;
    xml = this.testRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.test_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.test_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.test = IMPL_test_op;

function IMPL_testRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:test>';
    // block for local variables
    {
     xml = xml + '<cadena>';
     xml = xml + cxfjsutils.escapeXmlEntities(args[0]);
     xml = xml + '</cadena>';
    }
    xml = xml + '</jns0:test>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.testRequest_serializeInput = IMPL_testRequest_serializeInput;

function IMPL_localizarCarreteras_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_localizarCarreterasResponse_deserializeResponse');
     responseObject = IMPL_localizarCarreterasResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.localizarCarreteras_onsuccess = IMPL_localizarCarreteras_op_onsuccess;

function IMPL_localizarCarreteras_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarCarreteras_onerror = IMPL_localizarCarreteras_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}localizarCarreteras
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_localizarCarreteras_op(successCallback, errorCallback, cadenaBusqueda, pK, cantidadRegistros, pagina, total) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = cadenaBusqueda;
    args[1] = pK;
    args[2] = cantidadRegistros;
    args[3] = pagina;
    args[4] = total;
    xml = this.localizarCarreterasRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarCarreteras_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarCarreteras_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarCarreteras = IMPL_localizarCarreteras_op;

function IMPL_localizarCarreterasRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarCarreteras>';
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
    xml = xml + '</jns0:localizarCarreteras>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarCarreterasRequest_serializeInput = IMPL_localizarCarreterasRequest_serializeInput;

function IMPL_localizarCarreterasResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_PuntoKilometrico_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getTypeOrganitazionalUnit_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getTypeOrganitazionalUnitResponse_deserializeResponse');
     responseObject = IMPL_getTypeOrganitazionalUnitResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getTypeOrganitazionalUnit
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getOrganitazionalUnit_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getOrganitazionalUnitResponse_deserializeResponse');
     responseObject = IMPL_getOrganitazionalUnitResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getOrganitazionalUnit
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_OrganizationalUnitModelWS_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_comprobarTipoCarretera_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_comprobarTipoCarreteraResponse_deserializeResponse');
     responseObject = IMPL_comprobarTipoCarreteraResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}comprobarTipoCarretera
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TipoCarretera_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_obtenerCodINE_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_obtenerCodINEResponse_deserializeResponse');
     responseObject = IMPL_obtenerCodINEResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}obtenerCodINE
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
function IMPL_getVersion_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getVersionResponse_deserializeResponse');
     responseObject = IMPL_getVersionResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getVersion
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
function IMPL_normalizar_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_normalizarResponse_deserializeResponse');
     responseObject = IMPL_normalizarResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}normalizar
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
function IMPL_localizarNucleos_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_localizarNucleosResponse_deserializeResponse');
     responseObject = IMPL_localizarNucleosResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.localizarNucleos_onsuccess = IMPL_localizarNucleos_op_onsuccess;

function IMPL_localizarNucleos_op_onerror(client) {
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

IMPL_CallejeroService.prototype.localizarNucleos_onerror = IMPL_localizarNucleos_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}localizarNucleos
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_localizarNucleos_op(successCallback, errorCallback, cadenaBusqueda, cantidadRegistros, pagina, total) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(4);
    args[0] = cadenaBusqueda;
    args[1] = cantidadRegistros;
    args[2] = pagina;
    args[3] = total;
    xml = this.localizarNucleosRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.localizarNucleos_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.localizarNucleos_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.localizarNucleos = IMPL_localizarNucleos_op;

function IMPL_localizarNucleosRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:localizarNucleos>';
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
    xml = xml + '</jns0:localizarNucleos>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.localizarNucleosRequest_serializeInput = IMPL_localizarNucleosRequest_serializeInput;

function IMPL_localizarNucleosResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_NucleoPoblacion_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_comprobarCodIne_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_comprobarCodIneResponse_deserializeResponse');
     responseObject = IMPL_comprobarCodIneResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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
// Operation {http://localhost:7070/CallejeroWS/services/callejero}comprobarCodIne
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_Municipio_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_getAllTypeOrganitazionalUnit_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_getAllTypeOrganitazionalUnitResponse_deserializeResponse');
     responseObject = IMPL_getAllTypeOrganitazionalUnitResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
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


/****************************************** AUTOCOMPLETAR **************************************************************/
function IMPL_autocompletarDireccion_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /*var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_autocompletarDireccionResponse_deserializeResponse');
     responseObject = IMPL_autocompletarDireccionResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.autocompletarDireccion_onsuccess = IMPL_autocompletarDireccion_op_onsuccess;

function IMPL_autocompletarDireccion_op_onerror(client) {
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

IMPL_CallejeroService.prototype.autocompletarDireccion_onerror = IMPL_autocompletarDireccion_op_onerror;

//
// Operation {http://manueljmorillo:7070/CallejeroWS/services/callejero}autocompletarDireccion
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}int
//
function IMPL_autocompletarDireccion_op(successCallback, errorCallback, input, limit) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(2);
    args[0] = input;
    args[1] = limit;
    xml = this.autocompletarDireccionRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.autocompletarDireccion_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.autocompletarDireccion_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.autocompletarDireccion = IMPL_autocompletarDireccion_op;

function IMPL_autocompletarDireccionRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://manueljmorillo:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:autocompletarDireccion>';
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
    xml = xml + '</jns0:autocompletarDireccion>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.autocompletarDireccionRequest_serializeInput = IMPL_autocompletarDireccionRequest_serializeInput;

function IMPL_autocompletarDireccionResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_xsd_string_deserialize (cxfjsutils, partElement);

    return returnObject;
}
/*************************************************************************************************/

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}getAllTypeOrganitazionalUnit
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
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
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
    var returnObject = IMPL_ArrayOf_tns1_TypeOfOrganizationalUnitModel_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_geocoderMunProv_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     /**var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling IMPL_geocoderMunProvResponse_deserializeResponse');
     responseObject = IMPL_geocoderMunProvResponse_deserializeResponse(this.jsutils, element);*/
     client.user_onsuccess(responseXml);
    }
}

IMPL_CallejeroService.prototype.geocoderMunProv_onsuccess = IMPL_geocoderMunProv_op_onsuccess;

function IMPL_geocoderMunProv_op_onerror(client) {
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

IMPL_CallejeroService.prototype.geocoderMunProv_onerror = IMPL_geocoderMunProv_op_onerror;

//
// Operation {http://localhost:7070/CallejeroWS/services/callejero}geocoderMunProv
// - bare operation. Parameters:
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
// - type {http://www.w3.org/2001/XMLSchema}string
//
function IMPL_geocoderMunProv_op(successCallback, errorCallback, streetname, streetnumber, streettype, municipio, provincia) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(5);
    args[0] = streetname;
    args[1] = streetnumber;
    args[2] = streettype;
    args[3] = municipio;
    args[4] = provincia;
    xml = this.geocoderMunProvRequest_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.geocoderMunProv_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.geocoderMunProv_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

IMPL_CallejeroService.prototype.geocoderMunProv = IMPL_geocoderMunProv_op;

function IMPL_geocoderMunProvRequest_serializeInput(cxfjsutils, args) {
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://localhost:7070/CallejeroWS/services/callejero' ");
    xml = xml + '<jns0:geocoderMunProv>';
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
    xml = xml + '</jns0:geocoderMunProv>';
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

IMPL_CallejeroService.prototype.geocoderMunProvRequest_serializeInput = IMPL_geocoderMunProvRequest_serializeInput;

function IMPL_geocoderMunProvResponse_deserializeResponse(cxfjsutils, partElement) {
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    partElement = cxfjsutils.getFirstElementChild(partElement);
    cxfjsutils.trace('rpc element: ' + cxfjsutils.traceElementName(partElement));
    var returnObject = IMPL_ArrayOf_tns1_GeocoderResult_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function IMPL_CallejeroService_IMPL_callejero () {
  this.url = 'http://localhost:7070/CallejeroWS/services/callejero';
}
IMPL_CallejeroService_IMPL_callejero.prototype = new IMPL_CallejeroService;

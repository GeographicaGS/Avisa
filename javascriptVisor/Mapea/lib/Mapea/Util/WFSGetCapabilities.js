/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers.Format.WFSCapabilities
 */

 /**
 * Class: Mapea.Control.ClearUnsavedOperations
 * Restore the unsaved feature's values to to the last saved values
 *
 * Inerits from:
 *  - <OpenLayers.Control>
 */
Mapea.Util.WFSGetCapabilities = OpenLayers.Class({

	/**
     * Property: capabilities
     * A capabilities object with information about service WMS.
     * {Object}
     */
    capabilities: null,

   /**
     * Property: exceptionFormat
     * Format of the exception response.
     * {Object}
     */
    exceptionFormat: "application/vnd.ogc.se_xml",

     /**
     * Property: urlWMS
     * Url WMS service
     * {<String>}
     */
    urlWMS: null,

    /**
     * Property: wfsVersion
     * version of the WFS capabilities response
     * {<String>}
     */
    wfsVersion : "1.1.0",

	/**
    * Constructor: Mapea.Util.WFSGetCapabilities
    *
    * Parameters:
    * options - {Object} An optional object whose properties will be set on
    *                    the control
    * requestFormat - {String} Format of the expected server response
    *
    */
	initialize: function(version) {
		this.wfsVersion = version || Mapea.Version.WFS_GET_CAPABILITIES;
    },

    /**
     * Method: returnCapabilities
     *
     * Returns:
     * Layer's Capabilities.
     */
    returnCapabilities: function(){
    	return this.capabilities;
    },

    /**
     * Method: loadCapabilities
     *
     * Parameters:
     *
     */
    loadCapabilities: function(urlWMS){
    	var request = OpenLayers.Request.GET({
		    url: urlWMS,
		    success: this.loadCapabilitiesSuccess,
		    failure: function(){
                Mapea.Util.showErrorMessage("GetCapabilities: No se ha podido conectar con el servidor.");
            },
		    scope: this,
		    params: {service: "WFS", request: "GetCapabilities", version: this.wfsVersion},
		    async: false
		});
	},

    /**
     * Method: loadCapabilitiesSuccess
     *
     * Parameters:
     * request - {<Request>}
     */
    loadCapabilitiesSuccess: function(request) {

    	var xml = new OpenLayers.Format.XML();
		var doc = null;
		//var parsererror = false;

		//If exists some error in response. In IE request._object.responseXML.documentElement = null
		/*if(request._object.responseXML.documentElement == null || request._object.responseXML.documentElement.getAttribute("parsererror") != -1){
			request.responseXML = request._object.responseXML;
			parsererror = true;
		}*/

		//Sometimes, the answer is a white page
		if (request.responseXML == null){
			Mapea.Util.showErrorMessage("Ha ocurrido un error al obtener el documento GetCapabilities.");
			this.capabilities = null;
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
		if(!request.responseXML.documentElement /*|| parsererror*/) {
			doc = xml.read(request.responseText);
        } else {
            doc = request.responseXML;
        }
        var CAPformat = new Mapea.Format.WFSCapabilities();
        this.capabilities = CAPformat.read(doc);

    },


    /**
     * Function: loadURL
     * Background load a document.  For more flexibility in using XMLHttpRequest,
     *     see the <OpenLayers.Request> methods.
     *
     * Parameters:
     * uri - {String} URI of source doc
     * params - {String} or {Object} GET params. Either a string in the form
     *     "?hello=world&foo=bar" (do not forget the leading question mark)
     *     or an object in the form {'hello': 'world', 'foo': 'bar}
     * caller - {Object} object which gets callbacks
     * onComplete - {Function} Optional callback for success.  The callback
     *     will be called with this set to caller and will receive the request
     *     object as an argument.  Note that if you do not specify an onComplete
     *     function, <OpenLayers.nullHandler> will be called (which pops up a
     *     user friendly error message dialog).
     * onFailure - {Function} Optional callback for failure.  In the event of
     *     a failure, the callback will be called with this set to caller and will
     *     receive the request object as an argument.  Note that if you do not
     *     specify an onComplete function, <OpenLayers.nullHandler> will be called
     *     (which pops up a user friendly error message dialog).
     *
     * Returns:
     * {<OpenLayers.Request.XMLHttpRequest>}  The request object. To abort loading,
     *     call request.abort().
     */
    loadURL: function(uri, params, caller, onComplete, onFailure) {

        var success = (onComplete) ? onComplete : OpenLayers.nullHandler;
        var failure = (onFailure) ? onFailure : OpenLayers.nullHandler;

        return OpenLayers.Request.GET({
            url: uri, params: params,
            success: success, failure: failure, scope: caller
        });
    },

 	CLASS_NAME: "Mapea.Util.WFSGetCapabilities"
});
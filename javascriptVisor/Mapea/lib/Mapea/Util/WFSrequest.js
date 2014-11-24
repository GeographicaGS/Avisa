/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires
 */

/**
 * Class: Mapea.Util.WFSrequest
 * This class extracts layers from a WFS request.
 *
 * Inherits from:
 *  - <>
 */
Mapea.Util.WFSrequest = OpenLayers.Class({


    /**
     * Property: urlWFS
     * Url WFS service
     * {<String>}
     */
    urlWFS: null,

    /**
     * Property: typeName
     * Name of WFS layer
     * {<String>}
     */
    typeName: null,

    /**
     * Property: schema
     * xsd response
     * {<Object>}
     */
    schema: null,


    /**
     * Constructor: Mapea.Util.WFSrequest
     */
    initialize: function(url,typeN) {
    	if (url != null){
    		this.urlWFS = url;
    	}
    	if (typeN != null){
    		this.typeName = typeN;
    	}
    },

    /**
     * Method: destroy
     */
    destroy: function() {
    },

    /**
     * Method: setUrl
     *
     * Parameters:
     * url - {<String>}
     */
    setUrl: function(url) {
    	this.url = urlWFS;
    },

    /**
     * Method: setType
     *
     * Parameters:
     * typeN - {<String>}
     */
    setType: function(typeN) {
    	this.typeName = typeN;
    },

    /**
     * Method: getSchema
     */
    getSchema: function() {
    	return this.schema;
    },

    /**
     * Method: requestLayers
     *
     * Parameters:
     *
     */
    requestLayers: function(){
    	var request = OpenLayers.Request.GET({
		    url: this.urlWFS,
		    success: this.requestLayersSuccess,
		    failure: function(){
                Mapea.Util.showErrorMessage("Error WFS: No se ha podido conectar con el servidor.");
            },
		    scope: this,
		    params: {version: "1.1.0",service: "WFS", request: "DescribeFeatureType", typeName: this.typeName},
		    async: false
		});
	},

    /**
     * Method: requestLayersSuccess
     *
     * Parameters:
     * request - {<Request>}
     */
	requestLayersSuccess: function(request) {

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

		if(!request.responseXML.documentElement ) {
			doc = xml.read(request.responseText);
        } else {
            doc = request.responseXML;
            this.schema = wfs.read(doc);
        }

		return this.schema;
    },


    CLASS_NAME: "Mapea.Util.WFSrequest"
});

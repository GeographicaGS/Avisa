/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires
 */

/**
 * Class: Mapea.Util.WMSfull
 * This class add to the map a full wms service.
 *
 * Inherits from:
 *  - <>
 */
Mapea.Util.WMSfull = OpenLayers.Class({

	/**
	 * Property: map
	 * {Mapea.map}
	 */
	map : null,

	/**
	 * Property: urlWMS
	 * Url WMS service
	 * {<String>}
	 */
	urlWMS : null,

	/**
	 * Property: capabilities
	 * A capabilities object with information about service WMS.
	 * {Object}
	 */
	capabilities : null,

	/**
	 * Property: layerOptions
	 * Sets the options for a layers creation.
	 * {Object}
	 */
	layerOptions : null,

	/**
	 * Constructor: Mapea.Util.WMSfull
	 */
	initialize : function(map, url) {
		if (map != null) {
			this.map = map;
		}
		if (url != null) {
			this.urlWMS = url;
		}
	},

	/**
	 * Method: destroy
	 */
	destroy : function() {
	},

	/**
	 * Method: setMap
	 *
	 * Parameters:
	 * map - {<OpenLayers.Map>}
	 */
	setMap : function(map) {
		this.map = map;
	},

	/**
	 * Method: setUrl
	 *
	 * Parameters:
	 * url - {<String>}
	 */
	setUrl : function(url) {
		this.url = urlWMS;
	},

	/**
	 * Method: setOptions
	 *
	 * Parameters:
	 * options - {Object}
	 */
	setOptions : function(options) {
		this.layerOptions = options;
	},

	/**
	 * Method: loadCapabilities
	 *
	 * Parameters:
	 *
	 */
	loadCapabilities : function() {
		var request = OpenLayers.Request
				.GET({
					url : this.urlWMS,
					success : this.loadCapabilitiesSuccess,
					failure : function() {
						Mapea.Util.showErrorMessage("GetCapabilities: No se ha podido conectar con el servidor.");
					},
					scope : this,
					params : {
						service : "WMS",
						request : "GetCapabilities"
					},
					async : false
				});
	},

	/**
	 * Method: loadCapabilitiesSuccess
	 *
	 * Parameters:
	 * request - {<Request>}
	 */
	loadCapabilitiesSuccess : function(request) {

		var xml = new OpenLayers.Format.XML();
		var wms = new Mapea.Format.WMS({
			'layerOptions' : {
				buffer : 0
			}
		});
		var doc = null;

		//Sometimes, the answer is a white page
		if (request.responseXML == null) {
			Mapea.Util.showErrorMessage("Ha ocurrido un error al obtener el documento GetCapabilities.");
			return false;
		}

		//PATH_MOZILLA_ENCODING
		//En mozilla cuando el encoding del xml del getcapabilities
		//es UTF-8, el proxy devuelve mal los acentos
		var encodingXml = "UTF-8";

		var patron = /UTF|utf/i;
		var text = request.responseText;
		var searchIndice = text.search(patron);

		if (searchIndice == -1
				|| navigator.appName.indexOf("Explorer") != -1) {
			encodingXml = "ISO-8859-1";
		}
		//FIN_PATH

		if (!request.responseXML.documentElement) {
			doc = xml.read(request.responseText);
		} else {
			doc = request.responseXML;
		}

		this.capabilities = wms.read(doc, {});

	},

	/**
	 * Method: addServiceToMap
	 *
	 * Parameters:
	 *  - {}
	 */
	addServiceToMap : function() {

		if (this.urlWMS != null) {
			this.loadCapabilities();
		}

		if (this.map != null && this.capabilities != null) {
			this.addLayers(this.capabilities);
		}

	},

	/**
	 * Method: addLayers
	 *
	 * Parameters:
	 *  - {}
	 */
	addLayers : function() {

		var wmsFormat = new Mapea.Format.WMS({map: this.map});
		wmsFormat.setLayerOptions(this.layerOptions);

		var layersRootNode = this.capabilities.layers[0];
		var layersNode = layersRootNode.layers;
		for ( var i = 0; i < layersNode.length; i++) {
			if (layersNode[i].layers) {
				for ( var j = 0; j < layersNode[i].layers.length; j++) {
					var layerinfo = layersNode[i].layers[j];
					var newlayer = wmsFormat.createLayer(layerinfo);

					if (newlayer) {
						var query = layerinfo.options.queryable;
						newlayer.addOptions({
							queryable : query
						});
						newlayer.setVisibility(true);
						this.map.addLayer(newlayer, true);
					}
				}
			} else {
				var layerinfo = layersNode[i];
				var newlayer = wmsFormat.createLayer(layerinfo);

				if (newlayer) {
					var query = layerinfo.options.queryable;
					newlayer.addOptions({
						queryable : query
					});
					newlayer.setVisibility(true);
					this.map.addLayer(newlayer, true);
				}
			}
		}
	},

	getBoundingBoxEnvolved : function(urlServer, srs) {
		this.urlWMS = urlServer;
		if (this.urlWMS != null) {
			this.loadCapabilities();
		}

		var maxExtent = -1;

		if (this.capabilities != null) {
			var wmsGC = new Mapea.Util.WMSGetCapabilities(this.capabilities);
			var extent = wmsGC.getBoundingBoxEnvolved(srs);
			
			if (extent != -1) {
				maxExtent = extent
			}
		}

		return maxExtent;
	},

	CLASS_NAME : "Mapea.Util.WMSfull"
});

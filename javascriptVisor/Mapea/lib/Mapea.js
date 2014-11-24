/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/*
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Lang/en.js
 */

(function() {
	/**
	 * Before creating the Mapea namespace, check to see if
	 * Mapea.singleFile is true.  This occurs if the
	 * Mapea/SingleFile.js script is included before this one - as is the
	 * case with single file builds.
	 */
	var singleFile = (typeof Mapea == "object" && Mapea.singleFile);

	/**
	 * Namespace: Mapea
	 * The Mapea object provides a namespace for all things Mapea
	 */
	window.Mapea = {

		/**
		 * Property: _scriptName
		 * {String} Relative path of this script.
		 */
		_scriptName: (!singleFile) ? "lib/Mapea.js" : "Mapea.js",

		/**
		 * Function: _getScriptLocation
		 * Return the path to this script.
		 *
		 * Returns:
		 * {String} Path to this script
		 */
		_getScriptLocation: function () {
			var scriptLocation = "";
			var scriptName = Mapea._scriptName;

			var scripts = document.getElementsByTagName('script');
			for (var i=0, len=scripts.length; i<len; i++) {
				var src = scripts[i].getAttribute('src');
				if (src) {
					var index = src.lastIndexOf(scriptName);
					// set path length for src up to a query string
					var pathLength = src.lastIndexOf('?');
					if (pathLength < 0) {
						pathLength = src.length;
					}
					// is it found, at the end of the URL?
					if ((index > -1) && (index + scriptName.length == pathLength)) {
						scriptLocation = src.slice(0, pathLength - scriptName.length);
						break;
					}
				}
			}
			return scriptLocation;
		 }
	};
	
	/**
	 * global vars are defined in this
	 * namespace
	 */
	window.Mapea.global = {};
	
	/**
	 * TODO Deprecated
	 * borrar esta variable. Se mantiene por retrocompatibilidad.
	 */
	window.Mapea.THEME_PATH = Mapea._getScriptLocation();
	
	/**
	 * Mapea.singleFile is a flag indicating this file is being included
	 * in a Single File Library build of the Mapea Library.
	 *
	 * When we are *not* part of a SFL build we dynamically include the
	 * Mapea library code.
	 *
	 * When we *are* part of a SFL build we do not dynamically include the
	 * Mapea library code as it will be appended at the end of this file.
	  */
	if(!singleFile) {
		var jsfiles = new Array(
				"./../../../javascript/jquery/libs/jquery-1.8.2.min.js",
				"Mapea/Version.js",
				"Mapea/Tile.js",
				"Mapea/Util.js",
				"Mapea/Map.js",
				"Mapea/Lang.js",
				"Mapea/SigcMapea.js",
				"Mapea/Tile/WFS.js",
				"Mapea/Tile/Image.js",
				"Mapea/Control/Navigation.js",
				"Mapea/Control/PinchZoom.js",
				"Mapea/Control/LayerSwitcher.js",
				"Mapea/Control/DrawUniqueFeature.js",
				"Mapea/Control/Click.js",
				"Mapea/Control/OverviewMap.js",
				"Mapea/Control/PanZoom.js",
				"Mapea/Control/PanZoomBar.js",
				"Mapea/Control/DelMeasure.js",
				"Mapea/Control/NavToolbar.js",
				"Mapea/Control/OverviewMap.js",
				"Mapea/Control/ModifyFeature.js",
				"Mapea/Control/GetLayersInfo.js",
				"Mapea/Control/ClearUnsavedOperations.js",
				"Mapea/Control/DeleteFeature.js",
				"Mapea/Control/EditAttributeFeature.js",
				"Mapea/Control/DrawFeature.js",
				"Mapea/Control/Scale.js",
				"Mapea/Control/ScaleLine.js",
				"Mapea/Control/StatusLoader.js",
				"Mapea/Control/WindRose.js",
				"Mapea/Control/Geolocate.js",
				"Mapea/Control/GeosearchByLocation.js",
				"Mapea/Control/TouchNavigation.js",
				"Mapea/Format/KML.js",
				"Mapea/Format/WFS.js",
				"Mapea/Format/WMC.js",
				"Mapea/Format/WMC/v1.js",
				"Mapea/Format/WMS.js",
				"Mapea/Format/WFSCapabilities.js",
				"Mapea/Format/WFSCapabilities/v1.js",
				"Mapea/Format/WFSCapabilities/v1_0_0.js",
				"Mapea/Format/WFSCapabilities/v1_1_0.js",
				"Mapea/Format/WMC/v1_1_0.js",
				"Mapea/Format/WMS/v1.js",
				"Mapea/Format/WMS/v1_1_1.js",
				"Mapea/Format/WMS/v1_3_0.js",
				"Mapea/Handler.js",
				"Mapea/Handler/Feature.js",
				"Mapea/Layer/WMS.js",
				"Mapea/Layer/GML.js",
				"Mapea/Layer/LayerDraw.js",
				"Mapea/Layer/Vector.js",
				"Mapea/Layer/WFS.js",
				"Mapea/Layer/Geosearch.js",
				"Mapea/Popup/FramedCloud.js",
				"Mapea/Util/WMSfull.js",
				"Mapea/Util/WFSGetCapabilities.js",
				"Mapea/Util/WMSGetCapabilities.js",
				"Mapea/Util/ReadMaxExtent.js",
				"Mapea/Util/WFSrequest.js",
				"Mapea/Util/PrinterMap.js",
				"Mapea/Util/proj4js/proj4js-compressed.js",
				"Mapea/Util/proj4js/defs/EPSG102757.js",
				"Mapea/Util/proj4js/defs/EPSG102758.js",
				"Mapea/Util/proj4js/defs/EPSG21781.js",
				"Mapea/Util/proj4js/defs/EPSG23029.js",
				"Mapea/Util/proj4js/defs/EPSG23030.js",
				"Mapea/Util/proj4js/defs/EPSG25829.js",
				"Mapea/Util/proj4js/defs/EPSG25830.js",
				"Mapea/Util/proj4js/defs/EPSG26591.js",
				"Mapea/Util/proj4js/defs/EPSG26912.js",
				"Mapea/Util/proj4js/defs/EPSG27200.js",
				"Mapea/Util/proj4js/defs/EPSG27563.js",
				"Mapea/Util/proj4js/defs/EPSG32619.js",
				"Mapea/Util/proj4js/defs/EPSG32628.js",
				"Mapea/Util/proj4js/defs/EPSG32629.js",
				"Mapea/Util/proj4js/defs/EPSG32630.js",
				"Mapea/Util/proj4js/defs/EPSG32719.js",
				"Mapea/Util/proj4js/defs/EPSG41001.js",
				"Mapea/Util/proj4js/defs/EPSG4139.js",
				"Mapea/Util/proj4js/defs/EPSG4181.js",
				"Mapea/Util/proj4js/defs/EPSG42304.js",
				"Mapea/Util/proj4js/defs/EPSG4230.js",
				"Mapea/Util/proj4js/defs/EPSG4258.js",
				"Mapea/Util/proj4js/defs/EPSG4272.js",
				"Mapea/Util/proj4js/defs/EPSG4302.js",
				"Mapea/Util/proj4js/defs/EPSG4326.js",
				"Mapea/Util/proj4js/defs/EPSG900913.js",
				"Mapea/Util/proj4js/defs/EPSG3857.js",
				"Mapea/Util/cda/cxf-utils.js",
				"Mapea/Util/cda/CallejeroInit.js",
				"Mapea/Util/cda/CallejeroInit_sigc.js",
				"Mapea/Util/cda/CallejeroService.js",
				"Mapea/Util/cda/LetterPairSimilarity.js",
				"Mapea/Util/cda/CallejeroSearch.js",
				"Mapea/Util/cda/autocomplete.js",
				"Mapea/Util/cda/Geosearch.js",
				"Mapea/Util/cda/SearchStreet.js",
				"Mapea/Control/SelectFeature.js",
				"Mapea/Control/UniqueSelectFeature.js",
				"Mapea/OLPatches.js",
				"Mapea/Parameter.js",
				"Mapea/Parameter/Projection.js",
				"Mapea/Parameter/WMCFile.js",
				"Mapea/Parameter/Controls.js",
				"Mapea/Parameter/Theme.js",
				"./../../../javascript/jquery/libs/jquery-ui-1.8.23.custom.min.js",
				"Mapea/Template.js",
				"./../../../javascript/jquery/plugins/jquery.dataTables.min.js",
				"./../../../javascript/jquery/plugins/jquery.pagination-1.0.js"
		); // etc.

		var allScriptTags = [];

		var host = Mapea._getScriptLocation() + "lib/";
		for (var i=0, len=jsfiles.length; i<len; i++)
		{
			allScriptTags.push("<script src='" + host + jsfiles[i] + "'></script>");
		}

		document.write(allScriptTags.join(""));
	}
})();

/**
 * Constant: VERSION_NUMBER
 */
Mapea.VERSION_NUMBER="3.2.0";
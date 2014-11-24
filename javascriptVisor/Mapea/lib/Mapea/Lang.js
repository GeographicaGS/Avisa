/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

Mapea.Lang = {

	/**
	 * Property: code {String} Current language code to use in OpenLayers. Use
	 * the <setCode> method to set this value and the <getCode> method to
	 * retrieve it.
	 */
	code : null,

	/**
	 * APIProperty: defaultCode {String} Default language to use when a specific
	 * language can't be found. Default is "en".
	 */
	defaultCode : "en",

	/**
	 * APIFunction: getCode Get the current language code.
	 * 
	 * Returns: {String} The current language code.
	 */
	getCode : function() {
		if (!OpenLayers.Lang.code) {
			OpenLayers.Lang.setCode();
		}
		return OpenLayers.Lang.code;
	},

	/**
	 * APIFunction: setCode Set the language code for string translation. This
	 * code is used by the <OpenLayers.Lang.translate> method.
	 * 
	 * Parameters: code - {String} These codes follow the IETF recommendations
	 * at http://www.ietf.org/rfc/rfc3066.txt. If no value is set, the browser's
	 * language setting will be tested. If no <OpenLayers.Lang> dictionary
	 * exists for the code, the <OpenLayers.String.defaultLang> will be used.
	 */
	setCode : function(code) {
		var lang;
		if (!code) {
			code = (OpenLayers.BROWSER_NAME == "msie") ? navigator.userLanguage
					: navigator.language;
		}
		var parts = code.split('-');
		parts[0] = parts[0].toLowerCase();
		if (typeof OpenLayers.Lang[parts[0]] == "object") {
			lang = parts[0];
		}

		// check for regional extensions
		if (parts[1]) {
			var testLang = parts[0] + '-' + parts[1].toUpperCase();
			if (typeof OpenLayers.Lang[testLang] == "object") {
				lang = testLang;
			}
		}
		if (!lang) {
			OpenLayers.Console.warn('Failed to find OpenLayers.Lang.'
					+ parts.join("-")
					+ ' dictionary, falling back to default language');
			lang = OpenLayers.Lang.defaultCode;
		}

		OpenLayers.Lang.code = lang;
	},

	translate : function(key, context) {
		// PARCHE MJMJ PARA LA ESCALA DE MAPEA EN OL2.12
		if (key == "scale")
			key = "Scale = 1 : ${scaleDenom}";

		return OpenLayers.Lang.translate(key, context);
	},
	CLASS_NAME : "Mapea.Lang"
};

Mapea.i18n = Mapea.Lang.translate;
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/*
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Lang/en.js
 */

(function() {
    /**
     * Before creating the Guadaltel namespace, check to see if
     * Guadaltel.singleFile is true.  This occurs if the
     * Guadaltel/SingleFile.js script is included before this one - as is the
     * case with single file builds.
     */
    //var singleFile = (typeof Mapea == "object" && Mapea.singleFile);

    /**
     * Namespace: Guadaltel
     * The Guadaltel object provides a namespace for all things Guadaltel
     */
    window.Mapea = {

        /**
         * Property: _scriptName
         * {String} Relative path of this script.
         */
   		_scriptName: "Mapea/Mapea.js",


        /**
         * Function: _getScriptLocation
         * Return the path to this script.
         *
         * Returns:
         * {String} Path to this script
         */
        _getScriptLocationMapea: function () {
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
     * Guadaltel.singleFile is a flag indicating this file is being included
     * in a Single File Library build of the Guadaltel Library.
     *
     * When we are *not* part of a SFL build we dynamically include the
     * Guadaltel library code.
     *
     * When we *are* part of a SFL build we do not dynamically include the
     * Guadaltel library code as it will be appended at the end of this file.
     */
    var hostMapea = Mapea._getScriptLocationMapea() + "Mapea/";
    var hostOL = Mapea._getScriptLocationMapea() + "OpenLayers/";

    var allScriptTags = [];
    allScriptTags.push("<script src=\"" + hostOL + "OpenLayers.js\"></script>");
    allScriptTags.push("<script src=\"" + hostOL + "lib/deprecated.js\"></script>");

    var isMobile = ((/(android|bb\d+|meego|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)|pocket|psp|series(4|6)0|symbian|treo|windows (ce|phone)|xda|xiino)/i.test(navigator.userAgent||navigator.vendor||window.opera))
    		|| (window.location.href.toLowerCase().indexOf('desktoptesting') > -1) );

    if (isMobile)
        allScriptTags.push("<script src=\"" + hostMapea + "Mapea-mobile.js\"></script>");
    else
        allScriptTags.push("<script src=\"" + hostMapea + "Mapea-compressed.js\"></script>");

    document.write(allScriptTags.join(""));

})();

/**
 * Constant: VERSION_NUMBER
 */
Mapea.VERSION_NUMBER="3.1.0";
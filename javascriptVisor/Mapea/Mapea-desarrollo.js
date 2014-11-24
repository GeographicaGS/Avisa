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
   		_scriptName: "Mapea/Mapea-desarrollo.js",


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
 	// use "parser-inserted scripts" for guaranteed execution order
 	// http://hsivonen.iki.fi/script-execution/

    var hostMapea = Mapea._getScriptLocationMapea() + "Mapea/lib/";
    var hostOL = Mapea._getScriptLocationMapea() + "OpenLayers/lib/";

    var allScriptTags = [];
    allScriptTags.push("<script src=\"" + hostOL + "OpenLayers.js\"></script>");
    allScriptTags.push("<script src=\"" + hostOL + "deprecated.js\"></script>");
    allScriptTags.push("<script src=\"" + hostMapea + "Mapea.js\"></script>");

    document.write(allScriptTags.join(""));

})();

/**
 * Constant: VERSION_NUMBER
 */
Mapea.VERSION_NUMBER="3.0.0";
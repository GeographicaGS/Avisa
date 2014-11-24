/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/KML.js
 */

/**
 * Class: Mapea.Format.KML
 * Read/Wite KML. Create a new instance with the <Mapea.Format.KML>
 *     constructor. 
 * 
 * Inherits from:
 *  - <OpenLayers.Format.KML>
 */
Mapea.Format.KML = OpenLayers.Class(OpenLayers.Format.KML, {
    
  
    /**
     * APIProperty: mapProjection
     * {Integer} Projection of the main map. By default is 4326.
     */
    mapProjection: "EPSG:4326",

    /**
     * Constructor: OpenLayers.Format.KML
     * Create a new parser for KML.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
    
    	mapProjection = options['mainMapProjection'];  
    	
        // compile regular expressions once instead of every time they are used
        this.regExes = {
            trimSpace: (/^\s*|\s*$/g),
            removeSpace: (/\s*/g),
            splitSpace: (/\s+/),
            trimComma: (/\s*,\s*/g),
            kmlColor: (/(\w{2})(\w{2})(\w{2})(\w{2})/),
            kmlIconPalette: (/root:\/\/icons\/palette-(\d+)(\.\w+)/),
            straightBracket: (/\$\[(.*?)\]/g)
        };
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * Property: parseGeometry
     * Properties of this object are the functions that parse geometries based
     *     on their type.
     */
    parseGeometry: {
        
        /**
         * Method: parseGeometry.point
         * Given a KML node representing a point geometry, create an OpenLayers
         *     point geometry.
         *
         * Parameters:
         * node - {DOMElement} A KML Point node.
         *
         * Returns:
         * {<OpenLayers.Geometry.Point>} A point geometry.
         */
        point: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns,
                                                       "coordinates");
            var coords = [];
            if(nodeList.length > 0) {
                var coordString = nodeList[0].firstChild.nodeValue;
                coordString = coordString.replace(this.regExes.removeSpace, "");
                coords = coordString.split(",");
            }

            var point = null;
            if(coords.length > 1) {
                // preserve third dimension
                if(coords.length == 2) {
                    coords[2] = null;
                }
                point = new OpenLayers.Geometry.Point(coords[0], coords[1],
                                                      coords[2]);
                                                      
                //PATCH_GDTEL Transform from EPSG:4326 to map projection                   
                point=point.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(mapProjection));
            } else {
                throw "Bad coordinate string: " + coordString;
            }
            return point;
        },
        
        /**
         * Method: parseGeometry.linestring
         * Given a KML node representing a linestring geometry, create an
         *     OpenLayers linestring geometry.
         *
         * Parameters:
         * node - {DOMElement} A KML LineString node.
         *
         * Returns:
         * {<OpenLayers.Geometry.LineString>} A linestring geometry.
         */
        linestring: function(node, ring) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns,
                                                       "coordinates");
            var line = null;
            if(nodeList.length > 0) {
                var coordString = this.concatChildValues(nodeList[0]);

                coordString = coordString.replace(this.regExes.trimSpace,
                                                  "");
                coordString = coordString.replace(this.regExes.trimComma,
                                                  ",");
                var pointList = coordString.split(this.regExes.splitSpace);
                var numPoints = pointList.length;
                var points = new Array(numPoints);
                var coords, numCoords;
                for(var i=0; i<numPoints; ++i) {
                    coords = pointList[i].split(",");
                    numCoords = coords.length;
                    if(numCoords > 1) {
                        if(coords.length == 2) {
                            coords[2] = null;
                        }
                        points[i] = new OpenLayers.Geometry.Point(coords[0],
                                                                  coords[1],
                                                                  coords[2]);
                        
                        //PATCH_GDTEL Transform from EPSG:4326 to map projection                                           
                        points[i] = points[i].transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(mapProjection));    
                    } else {
                        throw "Bad LineString point coordinates: " +
                              pointList[i];
                    }
                }
                if(numPoints) {
                    if(ring) {
                        line = new OpenLayers.Geometry.LinearRing(points);
                    } else {
                        line = new OpenLayers.Geometry.LineString(points);
                    }
                } else {
                    throw "Bad LineString coordinates: " + coordString;
                }
            }

            return line;
        },
        
        /**
         * Method: parseGeometry.polygon
         * Given a KML node representing a polygon geometry, create an
         *     OpenLayers polygon geometry.
         *
         * Parameters:
         * node - {DOMElement} A KML Polygon node.
         *
         * Returns:
         * {<OpenLayers.Geometry.Polygon>} A polygon geometry.
         */
        polygon: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns,
                                                       "LinearRing");
            var numRings = nodeList.length;
            var components = new Array(numRings);
            if(numRings > 0) {
                // this assumes exterior ring first, inner rings after
                var ring;
                for(var i=0, len=nodeList.length; i<len; ++i) {
                    ring = this.parseGeometry.linestring.apply(this,
                                                        [nodeList[i], true]);
                    if(ring) {
                        components[i] = ring;
                    } else {
                        throw "Bad LinearRing geometry: " + i;
                    }
                }
            }
            return new OpenLayers.Geometry.Polygon(components);
        },
        
        /**
         * Method: parseGeometry.multigeometry
         * Given a KML node representing a multigeometry, create an
         *     OpenLayers geometry collection.
         *
         * Parameters:
         * node - {DOMElement} A KML MultiGeometry node.
         *
         * Returns:
         * {<OpenLayers.Geometry.Collection>} A geometry collection.
         */
        multigeometry: function(node) {
            var child, parser;
            var parts = [];
            var children = node.childNodes;
            for(var i=0, len=children.length; i<len; ++i ) {
                child = children[i];
                if(child.nodeType == 1) {
                    var type = (child.prefix) ?
                            child.nodeName.split(":")[1] :
                            child.nodeName;
                    var parser = this.parseGeometry[type.toLowerCase()];
                    if(parser) {
                        parts.push(parser.apply(this, [child]));
                    }
                }
            }
            return new OpenLayers.Geometry.Collection(parts);
        }
        
    },

    CLASS_NAME: "Mapea.Format.KML" 
});

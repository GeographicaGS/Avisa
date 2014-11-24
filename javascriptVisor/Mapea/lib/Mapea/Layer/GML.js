/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/Vector.js
 * @requires OpenLayers/Request/XMLHttpRequest.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: Mapea.Layer.GML Create a vector layer by parsing a GML file. The GML
 * file is passed in as a parameter.
 * 
 * Inherits from: - <OpenLayers.Layer.Vector>
 */
Mapea.Layer.GML = OpenLayers.Class(OpenLayers.Layer.Vector,
{
	/**
	 * Array which has all generated groundOverlay
	 * and screenOverlay images id
	 */
	imageIds : [],
	
	/**
	 * OpenLayers.Format.XML reader to search the
	 * ScreenOverlay and GroundOverlay tags
	 * 
	 */
	xmlFormat : null,

	/**
	 * Property: loaded {Boolean} Flag for whether the GML data
	 * has been loaded yet.
	 */
	loaded : false,

	/**
	 * APIProperty: format {<OpenLayers.Format>} The format you
	 * want the data to be parsed with.
	 */
	format : null,

	/**
	 * APIProperty: formatOptions {Object} Hash of options which
	 * should be passed to the format when it is created. Must
	 * be passed in the constructor.
	 */
	formatOptions : null,

	/**
	 * Constructor: Mapea.Layer.GML Load and parse a single file
	 * on the web, according to the format provided via the
	 * 'format' option, defaulting to GML.
	 * 
	 * Parameters: name - {String} url - {String} URL of a GML
	 * file. options - {Object} Hashtable of extra options to
	 * tag onto the layer.
	 */
	initialize : function(name, url, options) {
		var newArguments = [];
		newArguments.push(name, options);
		OpenLayers.Layer.Vector.prototype.initialize.apply(this, newArguments);
		this.url = url;
		this.xmlFormat = new OpenLayers.Format.XML();
	},

	/**
	 * APIMethod: setVisibility Set the visibility flag for the
	 * layer and hide/show&redraw accordingly. Fire event unless
	 * otherwise specified GML will be loaded if the layer is
	 * being made visible for the first time.
	 * 
	 * Parameters: visible - {Boolean} Whether or not to display
	 * the layer (if in range) noEvent - {Boolean}
	 */
	setVisibility : function(visibility, noEvent) {
		OpenLayers.Layer.Vector.prototype.setVisibility.apply(this, arguments);
		if (this.visibility && !this.loaded) {
			// Load the GML
			this.loadGML();
		}
		
		// display/hide the overlay images
		var cssDisplay = (this.visibility)? "" : "none";
		for (var i=0,len=this.imageIds.length; i<len; i++)
		{
			var imageId = this.imageIds[i];
			jQuery("#" + imageId).css("display", cssDisplay);	
		}
	},

	/**
	 * Method: moveTo If layer is visible and GML has not been
	 * loaded, load GML, then load GML and call
	 * OpenLayers.Layer.Vector.moveTo() to redraw at the new
	 * location.
	 * 
	 * Parameters: bounds - {Object} zoomChanged - {Object}
	 * minor - {Object}
	 */
	moveTo : function(bounds, zoomChanged, minor) {
		OpenLayers.Layer.Vector.prototype.moveTo.apply(this,
				arguments);
		// Wait until initialisation is complete before loading
		// GML
		// otherwise we can get a race condition where the root
		// HTML DOM is
		// loaded after the GML is paited.
		// See http://trac.openlayers.org/ticket/404
		if (this.visibility && !this.loaded) {
			this.loadGML();
		}
	},

	/**
	 * Method: loadGML
	 */
	loadGML : function() {
		if (!this.loaded) {
			this.events.triggerEvent("loadstart");
			OpenLayers.Request.GET({
				url : this.url,
				success : this.requestSuccess,
				failure : this.requestFailure,
				scope : this
			});
			this.loaded = true;
		}
	},

	/**
	 * Method: setUrl Change the URL and reload the GML
	 * 
	 * Parameters: url - {String} URL of a GML file.
	 */
	setUrl : function(url) {
		this.url = url;
		this.destroyFeatures();
		this.loaded = false;
		this.loadGML();
	},

	/**
	 * Method: requestSuccess Process GML after it has been
	 * loaded. Called by initialise() and loadUrl() after the
	 * GML has been loaded.
	 * 
	 * Parameters: request - {String}
	 */
	requestSuccess : function(request) {

		var doc = request.responseXML;
		var txt = request.responseText;
	
		var proxyError;
		if (!doc || !doc.documentElement) {
			doc = request.responseText;
			var errorRegex = /^.*<error><descripcion>(.+)<\/descripcion><\/error>$/;
			if (errorRegex.test(doc)) {
			    proxyError = doc.replace(errorRegex, "$1");
			}
		}
		else {
		    proxyError = jQuery(doc).find("error").find("descripcion").text();
		}
		
		if (proxyError && proxyError != "") {
            Mapea.Util.showErrorMessage("Error al cargar capa '" + this.name + "': " + proxyError);
        }
        else {
            var options = {};

            OpenLayers.Util.extend(options, this.formatOptions);
            if (this.map
                    && !this.projection.equals(this.map
                            .getProjectionObject())) {
                options.externalProjection = this.projection;
                options.internalProjection = this.map
                        .getProjectionObject();
            }

            var gml = this.format ? new this.format(options)
                    : new OpenLayers.Format.GML(options);
            this.addFeatures(gml.read(doc));
            this.addGroundOverlays(txt);
            this.addScreenOverlays(txt);
            this.events.triggerEvent("loadend");
        }
	},

	/**
	 * Method: requestFailure Process a failed loading of GML.
	 * Called by initialise() and loadUrl() if there was a
	 * problem loading GML.
	 * 
	 * Parameters: request - {String}
	 */
	requestFailure : function(request) {
		OpenLayers.Console.userError(OpenLayers.i18n(
				"errorLoadingGML", {
					'url' : this.url
				}));
		this.events.triggerEvent("loadend");
	},

	/**
	 * addGroundOverlays método, en
	 * el que añadimos la capa de los
	 * GroundOverlays
	 */
	addGroundOverlays : function(text) {
		var xmlDoc = this.xmlFormat.read(text);
		var groundOverlays = xmlDoc.getElementsByTagName("GroundOverlay");
		
		var mapVariable = this.map;
		var scope = this;
		jQuery.each(groundOverlays,function(index, value){
			var groundOverlay=new Object();
			parentFolder=jQuery(groundOverlays).parent('Folder').find('name').text();

			groundOverlay.href = jQuery(value).find('href').text();
			groundOverlay.name = jQuery(value).find('name').text();
			groundOverlay.description = jQuery(value).find('description').text();
			groundOverlay.north = jQuery(value).find('north').text();
			groundOverlay.south = jQuery(value).find('south').text();
			groundOverlay.east = jQuery(value).find('east').text();
			groundOverlay.west = jQuery(value).find('west').text();
			groundOverlay.rotation = jQuery(value).find('rotation').text();
			groundOverlay.id = scope.generateImageId();

			var options = {   
				'opacity': 1.0, 
				'isBaseLayer': false,
				numZoomLevels : 20 

			};
			var image = new OpenLayers.Layer.Image(
				groundOverlay.id,
				groundOverlay.href,
				new OpenLayers.Bounds( groundOverlay.west, groundOverlay.south,  groundOverlay.east, groundOverlay.north),
				new OpenLayers.Size(1, 1),
				options
				);
	   
				mapVariable.addLayers([image]);
		});
	},

	/**
	 * addScreenOverlays método, en el
	 * que añadimos la capa de los
	 * ScreenOverlays
	 */
	addScreenOverlays : function(text) {
		var xmlDoc = this.xmlFormat.read(text);
		var screenOverlays = xmlDoc.getElementsByTagName("ScreenOverlay");
		
		var mapVariable = this.map;
		
		var scope = this;
		jQuery.each(screenOverlays, function(index, value) {
			var screenOverlay = {};
			parentFolder=jQuery(screenOverlays).parent('Folder').find('name').text();

			screenOverlay.href=jQuery(value).find('href').text();
			screenOverlay.name=jQuery(value).find('name').text();
			var xOverlay=screenOverlay.overlayXY=jQuery(value).find('overlayXY').get(0).getAttribute('x');
			var yOverlay=screenOverlay.overlayXY=jQuery(value).find('overlayXY').get(0).getAttribute('y');
			var xScreen=screenOverlay.overlayXY=jQuery(value).find('screenXY').get(0).getAttribute('x');
			var yScreen=screenOverlay.overlayXY=jQuery(value).find('screenXY').get(0).getAttribute('y');
			
			var xRotation=screenOverlay.overlayXY=jQuery(value).find('rotationXY').get(0).getAttribute('x');
			var yRotation=screenOverlay.overlayXY=jQuery(value).find('rotationXY').get(0).getAttribute('y');
			var xSize=screenOverlay.overlayXY=jQuery(value).find('size').get(0).getAttribute('x');
			var ySize=screenOverlay.overlayXY=jQuery(value).find('size').get(0).getAttribute('y');
			var visibility=screenOverlay.visibility=jQuery(value).find('visibility').text();
				
				
			var options = {   
				'opacity': 1.0, 
				'isBaseLayer': false,
				numZoomLevels : 20 

			};
				
				
			var Xresolucion=screen.width; 
			var Yresolucion=screen.height-(screen.height/7);
		  
			// hallamos el pixelX de la pantalla
			var pixelX=Xresolucion*xScreen;
		  
			
			if((parseInt(pixelX)-(parseInt(xSize)/2))<0){
				pixelX=0;
				}else{
					if((parseInt(pixelX)+parseInt(xSize))>Xresolucion){
						pixelX=parseInt(Xresolucion)-parseInt(xSize);
					}else{
						pixelX=parseInt(pixelX)-parseInt(xSize/2);
					}
			}
			
				
			// hallamos pixelY de la pantalla
			var pixelY=Yresolucion*yScreen;

			if(pixelY<0){
				pixelY=0;
			}else{
				if((parseInt(pixelY)+parseInt(ySize))>Yresolucion){
					pixelY=parseInt(Yresolucion)-parseInt(ySize);
				}
			}
			
			var mitad=Yresolucion/2;
			
			
			if(pixelY<mitad){
				pixelY= (parseInt(mitad) - parseInt(pixelY))+parseInt(mitad)-parseInt(ySize);
			}else{
				if(pixelY>mitad){
					pixelY=(parseInt(mitad) - (parseInt(pixelY)-parseInt(mitad)))-parseInt(ySize);
					if(pixelY<0){
						pixelY=0;
					}
				}
			}
				
			// var imgLocation = OpenLayers.Util.getImagesLocation() + img;
			var imgLocation = screenOverlay.href; // getThemePatch instead
														// of getImagesLocation

			var mapDiv = mapVariable.div;															
			var divwidth = $(mapDiv).css('width');
			divwidth = divwidth.substring(0, divwidth.length -2);
			divwidth = parseInt(divwidth);
				
			var divheight = $(mapDiv).css('height');
			divheight = divheight.substring(0, divheight.length -2);
			divheight = parseInt(divheight);
			
			pixelX = parseFloat(xScreen) * divwidth;
			pixelX = pixelX - (xSize/2);
			
			pixelY = (1-parseFloat(yScreen)) * divheight;    	       
			
			var pixel = new OpenLayers.Pixel(pixelX,pixelY);
			
			var size = new OpenLayers.Size(xSize,ySize);
			
			var imageId = scope.generateImageId();
			var btn = OpenLayers.Util.createAlphaImageDiv(imageId,
										pixel, size, imgLocation, "absolute");
			//cuando visibility es 0 ,no pinta la imagen.
			if (visibility!="0") {
				mapDiv.appendChild(btn);
				document.getElementById(imageId).style.zIndex=1006;
			}
			
		});
	},
	
	generateImageId : function() {
		var uniqueId = OpenLayers.Util.createUniqueID("overlayImg_");
		this.imageIds.push(uniqueId);
		return uniqueId;
	},

	CLASS_NAME : "Mapea.Layer.GML"
});

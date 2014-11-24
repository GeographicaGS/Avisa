/**
 * Class: Mapea.Parameter.WMCFile
 * This clas wrappes the wmcfile parameter to add a WMC file
 * to the map
 *
 * Inherits from:
 *  - <Mapea.Parameter>
 */
Mapea.Parameter.WMCFile = OpenLayers.Class(Mapea.Parameter, {
	
	divId : null,

	/**
	 * Attribute : projection
	 * {<Mapea.Parameter.Projection>}
	 */
	projection : null,

	wmcFormat : null,
	
	/**
	 * Attribute : buildInitialContext
	 * {Boolean}
	 * 
	 * Indicates if we have to build the context button
	 * for the context declared in the constructor
	 */
	buildInitialContext : false,

	initialize: function(parameter, divId, projectionParameter) {
		Mapea.Parameter.prototype.initialize.apply(this, [parameter]);

		this.divId = divId;

		this.projection = projectionParameter;
		
		this.wmcFormat = new Mapea.Format.WMC({layerOptions : {buffer :0 , numZoomLevels: 16}});
	},
	
	applyDefault : function() {
		this.buildContexts("callejerocacheado");
	},

	applyParameter : function() {
		this.buildContexts(this.parameter);
	},

	buildContexts : function(contextsParameter) {
		//A new context is loaded
		var contexts = [];
		
		var parameterContexts;
		if (OpenLayers.Util.isArray(contextsParameter))
			parameterContexts = contextsParameter;
		else if ((typeof contextsParameter) == "string")
			parameterContexts = contextsParameter.split(",");

		var numContexts = parameterContexts.length;
		if (this.map && (this.map.initialContext || this.map.baseLayer))
		    numContexts++;
		
		var createButtons = (numContexts > 1);

		for (var i=0,len=parameterContexts.length; i<len; i++)
		{
			var parameterContext = parameterContexts[i];
			if (!Mapea.Util.isNullOrEmpty(parameterContext))
			{
				var urlTitle = parameterContext.split("*");
				if (urlTitle.length == 1)
				{
					// The context is predefined in configuration.properties
					var contextId = urlTitle[0];
					if (!Mapea.Util.isNullOrEmpty(contextId))
					{
						contextId = OpenLayers.String.trim(contextId);
					}

					var definedContextsIds = window.strDefinedContexts.split(",");
					var definedContextsUrls = window.strDefinedContextsUrl.split(",");
					var definedContextsTitles = window.srtDefinedContextsTile.split(",");
					var contextFound = false;
					for (var e=0,elen=definedContextsIds.length; (e<elen) && !contextFound; e++)
					{
						var definedContextId = definedContextsIds[e];
						if (!Mapea.Util.isNullOrEmpty(definedContextId))
						{
							definedContextId = OpenLayers.String.trim(definedContextId);
							if (contextId == definedContextId)
							{
								try
								{
									var definedContextUrl = OpenLayers.String.trim(definedContextsUrls[e]);
									var definedContextTitle = OpenLayers.String.trim(definedContextsTitles[e]);
									var context = {
										url : definedContextUrl,
										title : definedContextTitle
									};

									contexts.push(context);
								}
								catch(err)
								{
									Mapea.Util.showErrorMessage('La url y/o el título del context "'+ contextId + '" no está bien definido en el fichero de properties.');
								}
								contextFound = true;
							}
						}
					}
					if (!contextFound)
					{
						Mapea.Util.showErrorMessage('El context "'+ contextId + '" no está predefinido');
					}
				}
				else if (urlTitle.length == 2)
				{ 
					// Context is url-name param
					var context = {
						url : urlTitle[0],
						title : urlTitle[1]
					};
					contexts.push(context);
				}
				else
				{
					Mapea.Util.showErrorMessage('El formato del context "'+ parameterContext+ '") no se reconoce.');
				}
			}
		}

		if (!this.map) {
		    this.buildMap(contexts[0]);
		}
		
		if (Mapea.Util.hasContextsButton || createButtons) {
		    this.buildButtons(contexts);
		}
	},

	buildMap : function(context) {
		
	    if (context) {
    		this.map = Mapea.Util.loadContext(this.wmcFormat, context.url + "&mapeaop=wmc", this.divId);
    		
    		// MMV Cambio de la variable units del mapa a la unidad que está definida en la capa.
    		this.map.units = this.map.baseLayer.units;
    		
    		this.map.initialContext = context;
    
    
    		if (!this.projection.isDefault && (this.projection.units == "degrees")) {
    			var origSRS = this.map.projection;
    			var destSRS = this.projection.srs;
    			
    			if (origSRS != destSRS) {
    				var srcProj = new OpenLayers.Projection(origSRS);
    				var dstProj = new OpenLayers.Projection(destSRS);
    				var oldExtent = this.map.getExtent();
    
    				//Reset map properties
    				this.map.setOptions({projection:new OpenLayers.Projection(destSRS)});
    				this.map.setOptions({displayProjection:new OpenLayers.Projection(destSRS)});
    				this.map.units = this.projection.units;
    			
    				var oldMaxExtent = this.map.maxExtent;
    				var newMaxExtent = oldMaxExtent.transform(srcProj,dstProj);
    				this.map.maxExtent = newMaxExtent;
    				this.map.restrictedExtent = newMaxExtent;
    				var newExtent = oldExtent.transform(srcProj,dstProj);
    				var newCenter = this.map.getCenter().transform(srcProj, dstProj);
    				var newZoom = this.map.getZoomForExtent(newExtent, true);
    				this.map.setCenter(newCenter, newZoom, false, true);
    
    				// Reset layers properties
    				for (var i=0,len=this.map.getNumLayers(); i<len; i++) {
    					var layer = this.map.layers[i];
    					layer.projection= new OpenLayers.Projection(destSRS);
    					layer.maxExtent = newMaxExtent;
    					layer.units = this.projection.units;
    					layer.options.units = this.projection.units;
    					layer.initResolutions();
    				}
    			}
    		}
    		Mapea.Util.hasBaseLayer = true;
    		Mapea.Util.hasContextLoaded = true;
	    }
	},

	buildButtons : function(contexts) {
		var contextsWrapperDiv = $(".mapea-contexts-wrapper")[0];
		var contextButtons = $(".mapea-contexts")[0];
		
		// no contexts button was created
		if (!Mapea.Util.hasContextsButton)
		{
			contextsWrapperDiv = document.createElement("div");
			contextsWrapperDiv.id = OpenLayers.Util.createUniqueID() + "_contextsWrapperDiv";
			OpenLayers.Element.addClass(contextsWrapperDiv, "mapea-contexts-wrapper");
			
			contextButtons = document.createElement("ul");
			OpenLayers.Element.addClass(contextButtons, "mapea-contexts");
		}		

		// we select the first context button if it was not created
		var selectedContextButton = this._contextToLIElement(contexts[0], !Mapea.Util.hasContextsButton);
		contextButtons.appendChild(selectedContextButton);

		for (var i=1,len=contexts.length; i<len; i++)
		{
			var context = contexts[i];
			var contextButton = this._contextToLIElement(context);
			contextButtons.appendChild(contextButton);
		}
		
		// append the inital context
		if (this.map.initialContext && !Mapea.Util.hasInitalContextBtn && this.buildInitialContext)
		{
		    var initialContextButton = this._contextToLIElement(this.map.initialContext);
            contextButtons.appendChild(initialContextButton);

            Mapea.Util.hasInitalContextBtn = true;
		}

		// no contexts button was created
		if (!Mapea.Util.hasContextsButton)
		{
			contextsWrapperDiv.appendChild(contextButtons);
			this.map.viewPortDiv.appendChild(contextsWrapperDiv);
			
			
			// events
			var maximizeButtons = function(e) {
				OpenLayers.Element.addClass(contextButtons, "expanded");
				var totalHeight = ($(".mapea-context-btn").length * 31);
				contextButtons.style.height = totalHeight+"px";
				OpenLayers.Event.stop(e);
			};
			
			var minimizeButtons = function(e) {
				OpenLayers.Element.removeClass(contextButtons, "expanded");
				contextButtons.style.height = "";
				OpenLayers.Event.stop(e);
			};
			
			OpenLayers.Event.observe(contextsWrapperDiv, "mouseover", 
					OpenLayers.Function.bindAsEventListener(maximizeButtons, this));
			OpenLayers.Event.observe(contextsWrapperDiv, "mouseout", 
					OpenLayers.Function.bindAsEventListener(minimizeButtons, this));
			
			if (Mapea.Util.isMobile)
			{
				OpenLayers.Event.observe(contextsWrapperDiv, "touchend", 
						OpenLayers.Function.bindAsEventListener(maximizeButtons, this));
				OpenLayers.Event.observe(this.map.div, "touchend", 
					OpenLayers.Function.bindAsEventListener(minimizeButtons, this));
			}
		}
		
		Mapea.Util.hasContextsButton = true;
	},

	_contextToLIElement : function(context, selected) {
		var contextLI = document.createElement("li");
		contextLI.id = OpenLayers.Util.createUniqueID() + "_contextBtn";
		OpenLayers.Element.addClass(contextLI, "mapea-context-btn");
		if (selected)
			OpenLayers.Element.addClass(contextLI, "selected");

		$(contextLI).attr("name", context.url + "&mapeaop=wmc");
		$(contextLI).text(context.title);
		
		var liClickFn = function(e) {
			/*
			 * if it is a selected context then no load
			 * the context again
			 */
			if ($(".mapea-context-btn.selected").attr("id") != $(contextLI).attr("id"))
			{
				// change context
				Mapea.Util.changeContext(this.wmcFormat, $(contextLI).attr("name") , this.divId, this.map);
				
//				if (Mapea.Util.isMobile) { scope.map.checkMobileLayerLimit(); }
				Mapea.Util.resizeAllPanels(this.map);
				
				// remove the selected
				var selectedLI = $(".mapea-context-btn.selected")[0];
				OpenLayers.Element.removeClass(selectedLI, "selected");
				// select the new context
				OpenLayers.Element.addClass(contextLI, "selected");
				
				// we minimize if it is mobile
				if (Mapea.Util.isMobile)
				{
					var contextButtons = $(".mapea-contexts").get(0);
					OpenLayers.Element.removeClass(contextButtons, "expanded");
					contextButtons.style.height = "";
				}
				
				OpenLayers.Event.stop(e);
			}		
		}; 
		
		OpenLayers.Event.observe(contextLI, "click", 
				OpenLayers.Function.bindAsEventListener(liClickFn, this));
		
		if (Mapea.Util.isMobile)
		{
			OpenLayers.Event.observe(contextLI, "touchend", 
					OpenLayers.Function.bindAsEventListener(liClickFn, this));
		}

		return contextLI;
	},	

	CLASS_NAME: "Mapea.Parameter.WMCFile"
});
/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * Class: Mapea.Util.PrinterMap
 * Create a window printer preview with the main map layers visibles and current extend.
 *    Create a new printer map with the <Mapea.Util.PrinterMap> constructor.
 */
Mapea.Util.PrinterMap = OpenLayers.Class({
	
    /**
    * Property: map
    * {<OpenLayers.Map>} 
    */
	map: null,
	
	/**  
    * Property: windowPreview
    * {String}
    */
	windowPreview: "",
	
	/**  
    * Property: windowOptions
    * {String}
    */
	windowOptions: "",
	
	/**  
    * Property: legendOptions
    * {String}
    */
	legendOptions: "",
	
    /**
     * Constructor: OpenLayers.Control.PrinterMap
     * Create a new printer map.
     *
     * Parameters:
	 *
     */
     initialize: function() {
    
    	var optionsDefault = "toolbar=0,scrollbars=1,resizable =1, menubar=1, status=0, location=0, width=1000, height=700";
    	options = optionsDefault;     	
    	legendOptions = this.legendDefaultConfig(); 
     },
    
     /**
     * Method: printer
     * Paint a map in a windows preview for print.
     * 
     * Parameters: 
     * 	mapPrinter - {<OpenLayers.Map>} 
     * 	windows - {String}
     * 	options - {String}
     */   
     printer: function(mapPrinter, windows, options) {
     	        	
     	if (typeof mapPrinter == 'object' && typeof windows == 'string'){
     		
     		map = mapPrinter;     	
     		windowPreview = windows;
     		
     		if (options != ""){
     			windowOptions = options;
     		}
     		
     		var strLayersName = "";
     		var strLayersTitle = "";
     		
     		//Only load layers with visibility == true
     		for (i=0; i<map.getNumLayers(); i++){
     			//listLayerActive += map.layers[i].params.LAYERS + "=" + map.layers[i].visibility + ",";  
     			if (map.layers[i].visibility){
     			    if (map.layers[i].params){
	     			    if (map.layers[i].params.SERVICE =="WMS"){     		
	     					strLayersName += map.layers[i].params.LAYERS;     			   			
	     					strLayersTitle += map.layers[i].name;
	     					if (i != map.getNumLayers() - 1) {
	     						strLayersName += ",";
	    						strLayersTitle += ",";
	    					}
     					}
     					//Other case WFS, VECTOR     				
     				}
     			}
     		}
     	 
     		//Current extent
     		var bboxOL = map.getExtent().toBBOX().split(',');  		
  			var ul = new Array(bboxOL[0],bboxOL[3]);
  			var lr = new Array(bboxOL[2],bboxOL[1]);

	  	 	if (strLayersName != "" && strLayersTitle != ""){	  	  	 	
	  	 		window.open(windows + "?" + "lr=" + lr + "&ul=" + ul + "&strLayersNameVisibles=" + strLayersName + "&strLayersTitleVisibles=" + strLayersTitle + "&strLegendOptions=" + legendOptions, "zoom", options);
	  		}
	  		else  {
	  			Mapea.Util.showErrorMessage("La lista de capas del mapa está vacía.");
	  		}  				    		
     		
     	}else {     	
     		Mapea.Util.showErrorMessage("Error en impresión");
     	}     	
	
    },
    
    /**
    * Method: setLegendOptions
    * Set the legend options for the printer. For each layer you can set true or 
    *	false for print or no the symbology. 
    * 
    * Parameters: 
    * 	options - {String} 
    */
    setLegendConfig: function(options) {
    	if (options != ""){
    		legendOptions = options;
    	}    
    },    
    
    /**
    * Method: legendDefaultConfig
    * Set the default legend options. This is, true for the layers with style for 
    * 	the legend defined in the wmc or false in opposite case.
    * 
    * Parameters: 
    *
    */
    legendDefaultConfig: function () {
		
		var options = "";
		
		for(i = 0; i < map.getNumLayers(); i++){		
			if (map.layers[i].visibility){						
				if (map.layers[i].params){
				    if (map.layers[i].params.SERVICE =="WMS"){ 
						if (map.layers[i].params.LAYERLEGEND){
							options += "true";				
						}else {
							options += "false";					
						}
									
						if (i != map.getNumLayers() - 1){
	     					options += ",";	    					
	    				}
	    			}		
				}
			}
		}    		
		return options;
	},

    CLASS_NAME: "Mapea.Util.PrinterMap"
});
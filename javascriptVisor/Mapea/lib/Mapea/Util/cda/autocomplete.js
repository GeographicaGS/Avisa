/**
 * JS to create the autocomplete function on
 * a specific field
 * @author Guadaltel S.A.
 */
Autocomplete = (function(){

		//global variables
		var _autoSelectedFlag = false;
		var _searchString = '';
		var _arrayResultNorm = new Array();
		var _millisecEnter = 0;
		var _field = null;
		var _similarityUmbral = 0.7;
		var _isCreated = false;
		var _selectedOptionValue;
				
		//functions
		var _init = function(id, callbacks) {
			Autocomplete.field = $('#'+id);
			Autocomplete.parsedValues = {};
			
			var autocompleteSelectCallback;
			var enterpressCallback;
			if (callbacks) {
			    autocompleteSelectCallback = callbacks['onselect'];
			    enterpressCallback = callbacks['onenterpress'];
			}
			
			Autocomplete.field.keypress(function(event){
				
				if (helpDisplayed) {
					hideHelpCallejero();
				}
				
				// if (window.autoSelectedFlag && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
				if (Autocomplete.autoSelectedFlag) {
					Autocomplete.autoSelectedFlag = false;
				} else {
					if (event.which == 13)
					{
						Autocomplete.millisecEnter = (new Date()).getTime();
						if (enterpressCallback) {
						    enterpressCallback(event);
						}
						else {
    						if (Mapea.Util.hasMobileSearchPanel)
    							$("#idBtnSearchMobile").click();
    						else
    							onBtnBuscarGeneral();
						}
					}				
				}
			});
			
			Autocomplete.field.autocomplete({
				minLength: 3,
				delay: 500,
				// position
				position: {
				    at: "left-7 top+26"  // shift 0px left, 25px down.
			    },
			    
				//ajax call
				source: function(request, response) {
					var currentInstant = (new Date()).getTime();
					var instantDifference = currentInstant - Autocomplete.millisecEnter;
					//console.log("difference between delay and enter: "+instantDifference);
			
					if ((instantDifference > 600) && navigator.userAgent.toLocaleLowerCase().indexOf("chrome")!=-1) //delay
						_waitSourceAutocomplete(request, response);
					else if (instantDifference > 1000) //delay
						_waitSourceAutocomplete(request, response);
			    },
			
			    //select event is fired when select an element from the droplist
				select: function( event, ui ) {
				    var fullSearch = false;
				    
			    	//indicamos que hemos seleccionado opcion
					Autocomplete.selectedOption = true;
			
					var selectedItemId = $("ul.ui-autocomplete li.ui-menu-item a.ui-corner-all.ui-state-focus").attr("id");
					
			    	//indicamos la opcion seleccionada
			    	var items = $('ul.ui-autocomplete li.ui-menu-item a.ui-corner-all');
			    	Autocomplete.selectedIndex = -1;
					for(var i=0, l = items.length; i<l && Autocomplete.selectedIndex == -1; i++)
			     	{
			     	 	var itemId = $(items[i]).attr("id");
			     	 	
						if(itemId == selectedItemId)			     	 		 
			     	 		Autocomplete.selectedIndex = i;
			     	}
			
					//guardamos la cadena de entrada con el numero en una variable para comprobar
					//que lo que el usuario busca es lo que ha seleccionado
					var selectedText = ui.item.value;
					var number = (Autocomplete.streetNumber!=null)? ' '+Autocomplete.streetNumber : '';
					if (selectedText.indexOf(',') == -1)
					{
						//MJMJ EVITAR UNDEFINED selectedText = selectedText+number+', ';
			
					}
					else
					{
						var nameLocality = selectedText.split(',');
						selectedText = nameLocality[0].trim()+number+', '+nameLocality[1].trim();
						Autocomplete.searchString = selectedText;
						fullSearch = true;
					}
			
					//levantamos bandera para que no realice la bÃºsqueda en Firefox y en Opera
					/**NOKEYPRESSEVENT_ */ 
					if (event.which == 13) {
						Autocomplete.autoSelectedFlag = true;
					}
					
					if (autocompleteSelectCallback) {
					    var parsedValue = Autocomplete.parsedValues[ui.item.value];
					    if (parsedValue) {
					        autocompleteSelectCallback(parsedValue, fullSearch);
					    }
					}
				},
			
				//open event
				open: function(event, ui ) {
					//Al abrir, obtenemos el nÃºmero que introdujo el usuario en el input
					$('.ui-autocomplete').css("z-index", "2000");
					var inputText = Autocomplete.field.val();
					Autocomplete.streetNumber = _getNumberFromInput(inputText);
				},
			
				//close event
				close: function(ev, ui) {
					if (Autocomplete.selectedOption == true)
					{ //si ha seleccionado una opciÃ³n, sustituimos lo del input por el nÃºmero
					  //si el usuario lo habÃ­a especificado (en el completar no queremos que aparezca)
						var number = (Autocomplete.streetNumber!=null)? ' '+Autocomplete.streetNumber : '';
						if (Autocomplete.field.val().indexOf(',') == -1)
						{
							Autocomplete.field.val(Autocomplete.field.val()+number+', ');
							Autocomplete.streetNumber = null;
							Autocomplete.field.autocomplete("search",Autocomplete.field.val());
						}
						else
						{
							var nameLocality = Autocomplete.field.val().split(',');
							Autocomplete.field.val(nameLocality[0].trim()+number+', '+nameLocality[1].trim());
							Autocomplete.streetNumber = null;
							Autocomplete.field.click();
						}
					}
				}
			});
			
			Autocomplete.isCreated = true;
		}

		var _close = function() {
			if (Autocomplete.isCreated) {
				Autocomplete.field.autocomplete("close");
				$('.ui-autocomplete').hide();
			}
		}

		_waitSourceAutocomplete = function(request, response) {
			if((window.callejeroProxy != null) && (window.callejeroProxy.client != null) && (window.callejeroProxy.client.req !=null))
			{
				window.callejeroProxy.client.req.abort();
			}

			Autocomplete.selectedOption = false;
			Autocomplete.field.css("background", "url('" + Mapea.global.THEME_IMG_PATH + "ui-anim_basic_16x16.gif') right center no-repeat");
			Autocomplete.searching = 2;
			_autocompletarDireccion(request.term.trim(), 10, function(res){
					Autocomplete.field.css("background", "");
					var arrayRes = new Array();
					Autocomplete.arrayResultNorm = new Array();
					Autocomplete.parsedValues = {};
					for (var i=0, l=res.length; i<l; i++)
					{
						if (res[i] != null)
						{
						    var parsedValue = {};
							Autocomplete.arrayResultNorm.push(res[i]);
							var street = res[i].split(',');
							var streetDecorator = street[0]+' '+street[1];

							if (street.length >3)
							{
								streetDecorator += ', '+street[3]+' ('+street[4]+')';
								parsedValue.tipoVia = street[0];
						        parsedValue.nombreVia = street[1];
						        parsedValue.numeroPortal = street[5];
						        parsedValue.municipio = street[3];
						        parsedValue.provincia = street[4];
						        parsedValue.complementos = "";
							}
							arrayRes.push(streetDecorator);
							Autocomplete.parsedValues[streetDecorator] = parsedValue;
						}
					}
					response(arrayRes);
					Autocomplete.searching = 0;			
			});
		}

		var _getNumberFromInput = function(inputString){
			inputString = inputString.trim();
			inputString = inputString.replace(',','');
			var words = inputString.split(' ');
			var streetNumber = null;
			for(var i=0, l = words.length; i<l; i++)
		 	{
				var word = words[i].trim();
		 	 	if (word != '' && !isNaN(word))
		 	 		return word;
		 	}
		}
		
		var _autocompletarDireccion = function(cadena, limit, callback){
		 	window.callejeroProxy.autocompletarDireccionMunicipio(function(response){
		 		var tags = response.getElementsByTagName('autocompletarDireccionMunicipioReturn');

		 		var results = new Array();

		 		for(var i=0, nl = tags.length; i<nl; i++)
		 		{
		 			var type = tags[i].getAttribute('xsi:type');
		 			if (type == null) {
		 				type = tags[i].getAttribute('type');
		 			}
		 			if(type!=null)
		 			{
		 				var ipuntos = type.indexOf(':');
		 				type = type.substring(ipuntos+1, type.length);

		 				if (type!=null && type == 'string')
		 				{
		 					var street = "";

		 					if($.browser.msie)
		 					{
		 						street = tags[i].text;
		 					}
		 					else
		 					{
		 						street = tags[i].textContent;
		 					}

		 					if (street!=null)
		 						results.push(street);
		 				}
		 			}
		 		}

		 	   if(callback != null)
		 		   eval(callback)(results);
		 	   
		 	},errorCallback,cadena,limit, Mapea.Util.filterLocality);
		}
		
		//define public methods and atributes
		return {
			
			//atributes
			autoSelectedFlag : _autoSelectedFlag,
			searchString : _searchString,
			arrayResultNorm : _arrayResultNorm,
			millisecEnter : _millisecEnter,
			field : _field,
			similarityUmbral : _similarityUmbral,
			isCreated : _isCreated,
					
			//functions
			init : _init,
			close : _close,
			getNumberFromInput : _getNumberFromInput
		}

}());
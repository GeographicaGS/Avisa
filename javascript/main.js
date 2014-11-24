$( document ).ready(function() {

	// var map = new OpenLayers.Map('mapa');

	// var capaGoogle = new OpenLayers.Layer.Google(
 //                "Google Satellite",
 //                {type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 22}
	// );

	// map.addLayer(capaGoogle);

	var map = new OpenLayers.Map('mapa');
	var gmap = new OpenLayers.Layer.Google("Google Streets", {type: 'styled', numZoomLevels: 22});
	map.addLayers([gmap]);
	var stylez = [ { featureType: "all", elementType: "all", stylers: [{ saturation: -100 } ] } ];
	var styledMapType = new google.maps.StyledMapType(stylez);
	gmap.mapObject.mapTypes.set('styled', styledMapType);


    var tipos = {1:"Socios CESEAND", 2:"Agentes Generadores de conocimiento", 3:"Centros Tecnológicos y de Investigación", 4:"Cámaras de Comercio, Industria y Navegación", 5:"Clusters", 6:"Asociaciones empresariales / Federaciones", 7:"Espacios Tecnológicos y de Conocimiento", 8:"Redes", 9:"Entidades de Gestión", 10:"Otras entidades", }


	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection = map.getProjectionObject();
	var initPosition = new OpenLayers.LonLat(-5.072,37.282).transform(fromProjection,toProjection);
	var initZoom = 8;
	map.setCenter(initPosition, initZoom);

    var lastFeature;

	var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

	$(colaboradores.features).each(function(index, value) {
		var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(value.geometry.coordinates[0],value.geometry.coordinates[1]).transform(fromProjection, toProjection),
            {description: value.properties} ,
            {externalGraphic: 'img/market_0.png', graphicHeight: 28, graphicWidth: 22, graphicXOffset:-12,graphicYOffset:-25,cursor: "pointer", display:"" }
        ); 
        vectorLayer.addFeatures(feature);
	});

	map.addLayer(vectorLayer);

	var controls = {
      // selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup})
      selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup})
    };

    $(".closePopUp").on("click",function(){
        restoreMarker();
    	destroyPopup();
        controls.selector.unselectAll();
    });

    // var focus = false;
    $(".imageSearch").on("click",function(e){
    	e.stopPropagation();
    	// $(".inputSearch").css({"visibility": "initial"});
        $(".inputSearch").show();
    	$(".imageClose").show();
    	$(".inputSearch").focus();
    	$("#project").hide();
	    $("#mapa").hide();
	    $("#search").show();
	    $(this).hide();

        $(".inputSearch").trigger(jQuery.Event("keyup"));
    });

    $(".imageClose").on("click",function(){
    	closeSearch();
    });

	$(".inputSearch").on("click",function(e){
    	e.stopPropagation();
    	// $(".inputSearch").css({"visibility": "initial"});
        $(".inputSearch").show();
    });

	var delay = (function(){
		  var timer = 0;
		  return function(callback, ms){
		    clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		  };
	})();

    $(".inputSearch").keyup(function(e) {
    	e.stopPropagation();
    	var html = "";
    	var features = new Array();
        var ids = $(".filtroOpen .row .active").parent().map(function(){
          return parseInt($(this).attr("id_type"));
        });
    	$(colaboradores.features).each(function(index, value) {
    		if((value.properties.nombre.toLowerCase().indexOf($(".inputSearch").val().toLowerCase()) !== -1) && ($.inArray(value.properties.tipo,ids) !== -1)){
    			html += "<p index=" + index +">"+ value.properties.nombre + "</p>"
    			features[index] = value.properties;
    		}
    	});
    	$(".searchResult").html(html);
    	$("#search .count").text($(".searchResult").find("p").length + " resultados")
    	$(".searchResult p").unbind().bind("click",function(){
    		closeSearch();
			// buildPopup(features[$(this).attr("index")]);
            // restoreMarker();
            var feature = features[$(this).attr("index")];
            $(map.layers[1].features).each(function(index, value) {
                var a = 0;
                if(value.attributes.description == feature){
                    createPopup(value);
                }

            });
            map.setCenter(new OpenLayers.LonLat(features[$(this).attr("index")].coordx,features[$(this).attr("index")].coordy).transform(fromProjection, toProjection), 17);
		});
	    delay(function(){
	     
	    }, 300 );
	});
    
    $(".filtro").on("click",function(){
        $(this).fadeOut();
        $(".filtroOpen").addClass("active");
    });

    $(".filtroOpen .closeLeyend").on("click",function(){
        $(".filtroOpen").removeClass("active");
        $(".filtro").fadeIn(750);
    });

    $(".filtroOpen .row").on("click",function(){
        $(this).children().toggleClass('active');
        var ids = $(".filtroOpen .row .active").parent().map(function(){
          return parseInt($(this).attr("id_type"));
        });

        $(vectorLayer.features).each(function(index, feature) {
            if($.inArray(feature.attributes.description.tipo,ids) >= 0){
                feature.style.display = "";
            }else{
                feature.style.display = "none";
            }
        });

        vectorLayer.redraw();
        $(".inputSearch").trigger(jQuery.Event("keyup"));

    });

    function closeSearch(){
    	$("#search").hide();
    	$("#project").hide();
		$("#mapa").show();

		$(".select").removeClass("select");
		$(".menu[id_menu='mapa']").addClass("select");

		// $(".inputSearch").css({"visibility": "hidden"});
        $(".inputSearch").hide();
		$(".imageClose").hide();
		$(".imageSearch").show();
    }


    map.addControl(controls['selector']);
    
    function createPopup(feature) {
    	var zoom = 10;

    	if(map.getZoom() < 10){
    		map.setCenter(new OpenLayers.LonLat(feature.geometry.x,feature.geometry.y), zoom);
    	}

        restoreMarker();
        feature.style.externalGraphic = "img/market.png";
        lastFeature = feature;
    	vectorLayer.redraw();
        

    	buildPopup(feature.attributes.description);
    }

    function buildPopup(description) {
    	$(".popup").fadeIn();
    	buildField($(".popup .title"),description.nombre);
    	buildField($(".popup .description"), description.objetivos);
    	buildField($(".popup .dir"),description.direccion + "<br/>CP " + description.cp);
    	buildField($(".popup .location"),description.municipio);
    	buildField($(".popup .phone"),description.telefono);
    	buildField($(".popup .email a"),description.mail);
    	if(description.mail){
    		$(".popup .email a").attr("href","mailto:" + description.mail);
    		$(".popup .email a").show();
    		$(".popup .email").show();
    	}else{
    		$(".popup .email a").hide();
    		$(".popup .email").hide();
    	}

        $(".popup .content h3").html("<span>TIPO: </span>" + tipos[description.tipo]);
    }

    function buildField(field,value){
    	if(value){
    		field.html(value);
    		field.show();
    	}else{
    		field.hide();
    	}
    }

    function restoreMarker(){
        if(lastFeature){
            lastFeature.style.externalGraphic = "img/market_0.png";
            vectorLayer.redraw();
        }
    }

    // function destroyPopup(feature) {
    //   $(".popup").hide();
    // }

    function destroyPopup() {
      $(".popup").hide();
    }

	$(".menu").on("click",function(){
		$(".select").removeClass("select");
		$(this).addClass("select");

		$("#mapa").hide();
		$("#project").hide();
		$("#search").hide();
		$("#" + $(this).attr("id_menu")).show();


		// $(".inputSearch").css({"visibility": "hidden"});
        $(".inputSearch").hide();
		$(".imageClose").hide();
		$(".imageSearch").show();

		if($(this).attr("id_menu") == "mapa"){
			map.setCenter(initPosition, initZoom);
            if(!$(".filtroOpen").hasClass("active")){
                $(".filtro").show();
            }
            $(".filtroOpen").show();
		}else{
            $(".filtro").hide();
            $(".filtroOpen").hide();
        }
	})

	controls['selector'].activate();

});
		
/*
 * Empresa desarrolladora: GUADALTEL S.A.
 *
 * Autor: Junta de Andalucía
 *
 * Derechos de explotación propiedad de la Junta de Andalucía.
 *
 * Este programa es software libre: usted tiene derecho a redistribuirlo y/o modificarlo bajo los términos de la
 *
 * Licencia EUPL European Public License publicada por el organismo IDABC de la Comisión Europea, en su versión 1.0.
 * o posteriores.
 *
 * Este programa se distribuye de buena fe, pero SIN NINGUNA GARANTÍA, incluso sin las presuntas garantías implícitas
 * de USABILIDAD o ADECUACIÓN A PROPÓSITO CONCRETO. Para mas información consulte la Licencia EUPL European Public
 * License.
 *
 * Usted recibe una copia de la Licencia EUPL European Public License junto con este programa, si por algún motivo no
 * le es posible visualizarla, puede consultarla en la siguiente URL: http://ec.europa.eu/idabc/servlets/Doc?id=31099
 *
 * You should have received a copy of the EUPL European Public License along with this program. If not, see
 * http://ec.europa.eu/idabc/servlets/Doc?id=31096
 *
 * Vous devez avoir reçu une copie de la EUPL European Public License avec ce programme. Si non, voir
 * http://ec.europa.eu/idabc/servlets/Doc?id=30194
 *
 * Sie sollten eine Kopie der EUPL European Public License zusammen mit diesem Programm. Wenn nicht, finden Sie da
 * http://ec.europa.eu/idabc/servlets/Doc?id=29919
 */
/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
**
**	Software edited & adapted by GUADALTEL, S.A. 23/02/2013
*/

(function( $ ) {
	
	// main function
	$.fn.scrollPagination = function(options) {
  		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		
		// init the plugin each matched elements
		return this.each(function() {
			$.fn.scrollPagination.init($(this), opts);
		});

  	};

  	// initialization
	$.fn.scrollPagination.init = function(obj, opts) {
		var target = $(obj);
		target.attr('scrollPagination', 'enabled');
	
		target.scroll(function(event) {
			if ( target.attr('scrollPagination') == 'enabled')
			{
	 			$.fn.scrollPagination.loadContent(obj, opts);
	 		}
			else
			{
				event.stopPropagation();	
			}
	 	});
	 
		$.fn.scrollPagination.loadContent(obj, opts);
	};

	// load the content
	$.fn.scrollPagination.loadContent = function(obj, opts){
		var target = $(obj);
		
		//var mayLoadContent = ( (target.scrollTop() + opts.heightOffset) >= ($(document).height() - target.height()) );
		var offset = Math.floor(((target[0].scrollHeight * opts.heightOffset) / target.height()));
		var mayLoadContent = ( (target[0].offsetHeight + target.scrollTop() + offset) >= target[0].scrollHeight);
		mayLoadContent = mayLoadContent && (target.scrollTop() > 0);
		if ( mayLoadContent )
		{
			// before load
			if ( opts.beforeLoad != null )
			{
				opts.beforeLoad(); 
			}

			target.children().attr('rel', 'loaded');
		 
		 	// on load
			if ( opts.loadFn != null )
			{
				opts.loadFn(); 
			}

			// after load
			if ( opts.afterLoad != null )
			{
				opts.afterLoad(); 
			}		 	
		}
	};

	// function used to stop the pagination
	$.fn.stopScrollPagination = function() {
		return this.each(function() {
			$(this).attr('scrollPagination', 'disabled');
		});
  	};
  	
  	// defaults
	$.fn.scrollPagination.defaults = {
      	 'beforeLoad': null,
		 'loadFn': null,
		 'afterLoad': null,
		 'heightOffset': 0
 	};
 	
})( jQuery );
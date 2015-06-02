// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){

	/* trigger when page is ready */
	$(document).ready(function (){
		
		$('body').addClass('nav-deluxe');
		
		$('.skip-to-nav').click(function(){
		
			$('body').toggleClass('nav-revealed');
			return false;
		});
		
		$('#showDocNav').click(function(){
			$('.page-content').addClass('nav-docs-revealed');
			return false;
		});
		
		$('#hideDocNav').click(function(){
			$('.page-content').removeClass('nav-docs-revealed');
			return false;
		});
		
		$('.search-toggle').click(function(){
			
			$('.search-site').addClass('search-reveal');
			$('.search-entry').focus();
			
		});
		
		$('.search-entry').blur(function(){
			$('.search-site').removeClass('search-reveal');
		}); 
	
	});
	
	
	/* optional triggers
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});
	
	*/

})(window.jQuery);
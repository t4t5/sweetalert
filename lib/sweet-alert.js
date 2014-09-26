// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

(function(){


	var modal 	= '.sweet-alert',
			overlay = '.sweet-overlay';
	


	// Add modal + overlay to DOM
	function initialize() {
		
		$(document).ready(function(){

			$.ajax({
				url: '../lib/sweet-alert.html', // Change path depending on file location
			  dataType: 'html'
			})
			.done(function(html) {
			  $('body').append(html);
			})

			// DOM interactions
			.then(function (){

				// Close modal
			  $(modal).find('button').click(function(){
			  	$(overlay).fadeOut(300);
					$(modal).hide();
			  });
			  
			});

		});

	}


	// Set "margin-top"-property on modal based on its computed height
	function fixVerticalPosition() {
		var height 		= parseInt($(modal).height()),
				padding		= parseInt($(modal).css('padding')),
				marginTop = '-' + parseInt(height / 2 + padding) + 'px';

		$(modal).css('margin-top', marginTop);
	}



	// Global sweetAlert function
	window.sweetAlert = function(){

		fixVerticalPosition();

		$(overlay).fadeIn(300);
		$(modal).show();

	};



	initialize();

})();
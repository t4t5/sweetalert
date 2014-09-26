// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

(function() {


	var modal 	= '.sweet-alert',
			overlay = '.sweet-overlay';
	


	// Add modal + overlay to DOM

	function initialize() {
		
		$(document).ready(function() {

			$.ajax({
				url: '../lib/sweet-alert.html', // Change path depending on file location
			  dataType: 'html'
			})
			.done(function(html) {
			  $('body').append(html);
			})

			// Define DOM interactions
			.then(function() {

			  $(modal).find('button').click(function(){ // Close modal
			  	$(overlay).fadeOut(300);
					$(modal).fadeOut(100).removeClass('showSweetAlert').addClass('hideSweetAlert');
			  });
			});

		});
	}



	// Global sweetAlert function

	window.sweetAlert = function() {

		// Default parameters
		var params = {};


		if (arguments[0] === undefined) {
			window.console.error("sweetAlert expects at least 1 attribute!");
			return false;
		}


		switch (typeof arguments[0]) {

			case "string":
				params.title	= arguments[0];
				params.text 	= arguments[1] || "";
				params.type 	= arguments[3] || "";

				break;

			case "object":
				if (arguments[0].title === undefined) {
					window.console.error("Missing 'title' argument!");
					return false;
				}

				params.title	= arguments[0].title;
				params.text		= arguments[0].text || "";
				params.type		= arguments[0].type || "";

				break;

			default:
				window.console.error("Unexpected type of argument! Expected 'string' or 'object', got " + typeof arguments[0]);
				return false;

		}

		setParameters(params);



		fixVerticalPosition();

		$(overlay).fadeIn(100);
		$(modal).show().addClass('showSweetAlert').removeClass('hideSweetAlert');

	};


	// Set "margin-top"-property on modal based on its computed height

	function fixVerticalPosition() {
		var height 		= parseInt($(modal).height()),
				padding		= parseInt($(modal).css('padding')),
				marginTop = '-' + parseInt(height / 2 + padding) + 'px';

		$(modal).css('margin-top', marginTop);
	}



	// Set type, text and actions on modal

	function setParameters(params) {

		var $title 	= $(modal).find('h2'),
				$text		= $(modal).find('p');

		$title.html(params.title);

		if (params.text) {
			$text.html(params.text).show();
		} else {
			$text.hide();
		}
	}



	initialize();

})();
// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

(function() {


	var modal 			= '.sweet-alert',
			overlay 		= '.sweet-overlay',
			alertTypes	= ["error", "warning", "info", "success"];
	


	/*
	 * Add modal + overlay to DOM
	 */

	function initialize() {
		
		$(document).ready(function() {

			$.ajax({
				url: '../lib/sweet-alert.html', // Change path depending on file location
			  dataType: 'html'
			})
			.done(function(html) {
			  $('body').append(html);
			});

		});
	}



	/*
	 * Global sweetAlert function
	 */

	window.sweetAlert = function() {

		// Default parameters
		var params = {
			title: "",
			text: "",
			type: null,
			allowOutsideClick: false,
			showCancelButton: false
		};

		if (arguments[0] === undefined) {
			window.console.error("sweetAlert expects at least 1 attribute!");
			return false;
		}


		switch (typeof arguments[0]) {

			case "string":
				params.title							= arguments[0];
				params.text 							= arguments[1] || "";
				params.type 							= arguments[2] || "";

				break;

			case "object":
				if (arguments[0].title === undefined) {
					window.console.error("Missing 'title' argument!");
					return false;
				}

				params.title							= arguments[0].title;
				params.text								= arguments[0].text || "";
				params.type								=	arguments[0].type || "";
				params.allowOutsideClick 	= arguments[0].allowOutsideClick || false;
				params.showCancelButton 	= arguments[0].showCancelButton || false;

				break;

			default:
				window.console.error("Unexpected type of argument! Expected 'string' or 'object', got " + typeof arguments[0]);
				return false;

		}

		setParameters(params);
		fixVerticalPosition();
		openModal();


		// Modal interactions

		$(modal).find('button').click(function(){ // Click a button
	  	closeModal();
	  });

	  $(document).click(function(e){ // Click outside
	  	var clickedOnModal 				= $(modal).is(e.target),
	  			clickedOnModalChild 	= $(modal).has(e.target).length !== 0,
	  			modalIsVisible				= $(modal).hasClass("visible"),
	  			outsideClickIsAllowed	= $(modal).attr('data-allow-ouside-click') === "true";

		  if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && outsideClickIsAllowed) {
				closeModal();
			}
		});

	};


	/*
	 * Set type, text and actions on modal
	 */

	function setParameters(params) {

		var $title 			= $(modal).find('h2'),
				$text				= $(modal).find('p'),
				$cancelBtn 	= $(modal).find('button.cancel');

		// Title
		$title.html(params.title);

		// Text
		$text.html(params.text || "").show();
		if (!params.text) { $text.hide(); }

		// Icon
		if (params.type) {

			if (alertTypes.indexOf(params.type) === -1) {
				window.console.error("Unknown alert type: " + params.type);
			}

			var $icon = $(modal).find('.icon.'+params.type);
			$icon.show().siblings('.icon').hide();
		} else {
			$(modal).find('.icon').hide();
		}

		// Cancel button
		if (params.showCancelButton) {
			$cancelBtn.show();
		} else {
			$cancelBtn.hide();
		}

		// Allow outside click?
		$(modal).attr('data-allow-ouside-click', params.allowOutsideClick);
	}



	/*
	 * Animations
	 */

	function openModal() {
		$(overlay).fadeIn(100);
		$(modal).show().addClass('showSweetAlert').removeClass('hideSweetAlert');

		setTimeout(function(){
			$(modal).addClass('visible');
		}, 500);
	}

	function closeModal() {
		$(overlay).fadeOut(300);
		$(modal).fadeOut(100).removeClass('showSweetAlert').addClass('hideSweetAlert');
		$(modal).removeClass('visible');
	}



	/*
	 * Set "margin-top"-property on modal based on its computed height
	 */

	function fixVerticalPosition() {
		var height 		= parseInt($(modal).height()),
				padding		= parseInt($(modal).css('padding')),
				marginTop = '-' + parseInt(height / 2 + padding) + 'px';

		$(modal).css('margin-top', marginTop);
	}



	initialize();

})();
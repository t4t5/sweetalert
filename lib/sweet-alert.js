// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

(function(){
	
	// Add SweetAlert template to the DOM
	function initalize() {
		
		$(document).ready(function(){
			$.ajax({
				url: 'lib/sweet-alert.html',
			  dataType: 'html'
			})
			.done(function(html) {
			  $('body').append(html);
			});
		});

	}

	// Global sweetAlert function
	window.sweetAlert = function(){
		
	};



	initalize();

})();
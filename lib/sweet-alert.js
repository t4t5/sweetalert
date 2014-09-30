// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

(function() {


  var modal       = '.sweet-alert',
      overlay     = '.sweet-overlay',
      alertTypes  = ["error", "warning", "info", "success"];
	


  /*
   * Add modal + overlay to DOM
   */

  function initialize() {
		
    $(document).ready(function() {

      // For readability: check sweet-alert.html
      $('body').append('<div class="sweet-overlay"></div><div class="sweet-alert"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="cancel">Cancel</button><button class="confirm">OK</button></div>');

      // For development use only!
      /*$.ajax({
        url: '../lib/sweet-alert.html', // Change path depending on file location
        dataType: 'html'
      })
      .done(function(html) {
        $('body').append(html);
      });*/

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
      showCancelButton: false,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      imageUrl: null,
      imageSize: null
    };

    if (arguments[0] === undefined) {
      window.console.error("sweetAlert expects at least 1 attribute!");
      return false;
    }


    switch (typeof arguments[0]) {

      case "string":
        params.title = arguments[0];
        params.text  = arguments[1] || "";
        params.type  = arguments[2] || "";

      break;

      case "object":
        if (arguments[0].title === undefined) {
          window.console.error("Missing 'title' argument!");
          return false;
        }

        params.title              = arguments[0].title;
        params.text               = arguments[0].text || params.text;
        params.type               = arguments[0].type || params.type;
        params.allowOutsideClick  = arguments[0].allowOutsideClick || params.allowOutsideClick;
        params.showCancelButton   = arguments[0].showCancelButton  || params.showCancelButton;

        if (params.showCancelButton) {
          params.confirmButtonText = "Confirm"; // Show "Confirm" instead of "OK" if cancel button is visible
        }

        params.confirmButtonText  = arguments[0].confirmButtonText || params.confirmButtonText;
        params.cancelButtonText   = arguments[0].cancelButtonText  || params.cancelButtonText;
        params.imageUrl           = arguments[0].imageUrl  || params.imageUrl;
        params.imageSize          = arguments[0].imageSize || params.imageSize;
        params.doneFunction       = arguments[1] || null;

        break;

      default:
        window.console.error("Unexpected type of argument! Expected 'string' or 'object', got " + typeof arguments[0]);
        return false;

    }

    setParameters(params);
    fixVerticalPosition();
    openModal();


    // Modal interactions

    $(modal).find('button').one('click', function(e){ // Click a button
      var clickedOnConfirm    = $('.confirm').is(e.target),
          modalIsVisible      = $(modal).hasClass("visible"),
          doneFunctionExists  = params.doneFunction && $(modal).attr('data-has-done-function') === "true";

      if (clickedOnConfirm && doneFunctionExists && modalIsVisible) {
        params.doneFunction();
      }
      closeModal();
    });

    $(document).click(function(e){ // Click outside
      var clickedOnModal        = $(modal).is(e.target),
          clickedOnModalChild   = $(modal).has(e.target).length !== 0,
          modalIsVisible        = $(modal).hasClass("visible"),
          outsideClickIsAllowed = $(modal).attr('data-allow-ouside-click') === "true";

      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && outsideClickIsAllowed) {
        closeModal();
      }
    });

  };

  window.swal = window.sweetAlert; // Shorthand


  /*
  * Set type, text and actions on modal
  */

  function setParameters(params) {

    var $title      = $(modal).find('h2'),
        $text       = $(modal).find('p'),
        $cancelBtn  = $(modal).find('button.cancel'),
        $confirmBtn = $(modal).find('button.confirm');

    // Title
    $title.html(params.title);

    // Text
    $text.html(params.text || "").show();
    if (!params.text) { $text.hide(); }

    // Icon
    if (params.type) {

      if (alertTypes.indexOf(params.type) === -1) {
        $(modal).find('.icon').hide();
        window.console.error("Unknown alert type: " + params.type);
        return false;
      }

      var $icon = $(modal).find('.icon.'+params.type);
      $icon.show().siblings('.icon').hide();

      if (params.type === "success") {
        $icon
          .addClass('animate')
          .find('.tip').addClass('animateSuccessTip')
          .siblings('.long').addClass('animateSuccessLong');
      } else if (params.type === "error") {
        $icon
          .addClass('animateErrorIcon')
          .find('.x-mark').addClass('animateXMark');
      } else if (params.type === "warning") {
        $icon
          .addClass('pulseWarning')
          .find('.body, .dot').addClass('pulseWarningIns');
      }

    } else {
      $(modal).find('.icon').hide();
    }

    // Custom image
    if (params.imageUrl) {
      var $customIcon = $(modal).find('.icon.custom');
      $customIcon.css('background-image', 'url(' + params.imageUrl + ')').show();

      if (params.imageSize) {
        var imgWidth  = params.imageSize.split('x')[0];
        var imgHeight = params.imageSize.split('x')[1];

        if (!imgWidth || !imgHeight) {
          window.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + params.imageSize);
        } else {
          $customIcon.css({
            'width': imgWidth + 'px',
            'height': imgHeight + 'px'
          });
        }      
      } else {
        $customIcon.css({
          'width': '80px',
          'height': '80px'
        }); 
      }
    }

    // Cancel button
    if (params.showCancelButton) {
      $cancelBtn.show();
    } else {
      $cancelBtn.hide();
    }

    // Edit text on cancel and confirm buttons
    if (params.cancelButtonText) {
      $cancelBtn.html(params.cancelButtonText);
    }
    if (params.confirmButtonText) {
      $confirmBtn.html(params.confirmButtonText);
    }


    // Allow outside click?
    $(modal).attr('data-allow-ouside-click', params.allowOutsideClick);

    // Done-function
    var hasDoneFunction = (params.doneFunction) ? true : false;
    $(modal).attr('data-has-done-function', hasDoneFunction);
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


    // Reset icon animations

    $(modal).find('.icon.success')
      .removeClass('animate')
      .find('.tip').removeClass('animateSuccessTip')
      .siblings('.long').removeClass('animateSuccessLong');

    $(modal).find('.icon.error')
      .removeClass('animateErrorIcon')
      .find('.x-mark').removeClass('animateXMark');

    $(modal).find('.icon.warning')
      .removeClass('pulseWarning')
      .find('.body, .dot').addClass('pulseWarningIns');
  }



  /*
  * Set "margin-top"-property on modal based on its computed height
  */

  function fixVerticalPosition() {
    var height    = parseInt($(modal).height()),
        padding   = parseInt($(modal).css('padding')),
        marginTop = '-' + parseInt(height / 2 + padding) + 'px';

    $(modal).css('margin-top', marginTop);
  }



  initialize();

})();
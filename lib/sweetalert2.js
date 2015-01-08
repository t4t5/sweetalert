// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert
;(function(window, document) {

  var modalClass   = '.sweet-alert';
  var overlayClass = '.sweet-overlay';
  var alertTypes   = ['error', 'warning', 'info', 'success'];
  var defaultParams = {
    title: '',
    text: '',
    html: '',
    type: null,
    animation: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showConfirmButton: true,
    showCancelButton: false,
    closeOnConfirm: true,
    closeOnCancel: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancel',
    imageUrl: null,
    imageSize: null,
    timer: null,
    width: 500,
    padding: 20
  };

  /*
   * Manipulate DOM
   */
  var getModal = function() {
    return document.querySelector(modalClass);
  };

  var getOverlay = function() {
    return document.querySelector(overlayClass);
  };

  var hasClass = function(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  };

  var addClass = function(elem, className) {
    if (!hasClass(elem, className)) {
      elem.className += ' ' + className;
    }
  };

  var removeClass = function(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  };

  var escapeHtml = function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  var _show = function(elem) {
    elem.style.opacity = '';
    elem.style.display = 'block';
  };

  var show = function(elems) {
    if (elems && !elems.length) {
      return _show(elems);
    }
    for (var i = 0; i < elems.length; ++i) {
      _show(elems[i]);
    }
  };

  var _hide = function(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };

  var hide = function(elems) {
    if (elems && !elems.length) {
      return _hide(elems);
    }
    for (var i = 0; i < elems.length; ++i) {
      _hide(elems[i]);
    }
  };

  var isDescendant = function(parent, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  var getTopMargin = function(elem) {
    elem.style.left = '-9999px';
    elem.style.display = 'block';

    var height = elem.clientHeight;
    var padding;
    if (typeof getComputedStyle !== 'undefined') { /* IE 8 */
      padding = parseInt(getComputedStyle(elem).getPropertyValue('padding'), 10);
    } else {
      padding = parseInt(elem.currentStyle.padding);
    }

    elem.style.left = '';
    elem.style.display = 'none';
    return ('-' + parseInt(height / 2 + padding) + 'px');
  };

  var fadeIn = function(elem, interval) {
    if (+elem.style.opacity < 1) {
      interval = interval || 16;
      elem.style.opacity = 0;
      elem.style.display = 'block';
      var last = +new Date();
      var tick = function() {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
        last = +new Date();

        if (+elem.style.opacity < 1) {
          setTimeout(tick, interval);
        }
      };
      tick();
    }
    elem.style.display = 'block'; //fallback IE8
  };

  var fadeOut = function(elem, interval) {
    interval = interval || 16;
    elem.style.opacity = 1;
    var last = +new Date();
    var tick = function() {
      elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity > 0) {
        setTimeout(tick, interval);
      } else {
        elem.style.display = 'none';
      }
    };
    tick();
  };

  var fireClick = function(node) {
    // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
    // Then fixed for today's Chrome browser.
    if (MouseEvent) {
      // Up-to-date approach
      var mevt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      });
      node.dispatchEvent(mevt);
    } else if (document.createEvent) {
      // Fallback
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('click', false, false);
      node.dispatchEvent(evt);
    } else if (document.createEventObject) {
      node.fireEvent('onclick') ;
    } else if (typeof node.onclick === 'function') {
      node.onclick();
    }
  };

  var stopEventPropagation = function(e) {
    // In particular, make sure the space bar doesn't scroll the main window.
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
      e.preventDefault();
    } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
      window.event.cancelBubble = true;
    }
  };

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var previousActiveElement;
  var previousDocumentClick;
  var previousWindowKeyDown;
  var lastFocusedButton;

  /*
   * Add modal + overlay to DOM
   */
  window.sweetAlertInitialize = function() {
    var sweetHTML = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="confirm">OK</button><button class="cancel">Cancel</button></div>';
    var sweetWrap = document.createElement('div');

    sweetWrap.innerHTML = sweetHTML;

    // For readability: check sweet-alert.html
    document.body.appendChild(sweetWrap);
  };

  /*
   * Global sweetAlert function
   */
  window.sweetAlert = window.swal = function() {
    // Copy arguments to the local args variable
    var args = arguments;
    if (getModal() !== null) {
        // If getModal returns values then continue
        modalDependant.apply(this, args);
    } else {
        // If getModal returns null i.e. no matches, then set up a interval event to check the return value until it is not null
        var modalCheckInterval = setInterval(function() {
          if (getModal() !== null) {
            clearInterval(modalCheckInterval);
            modalDependant.apply(this, args);
          }
      }, 100);
    }
  };

  function modalDependant() {

    if (arguments[0] === undefined) {
      window.console.error('sweetAlert expects at least 1 attribute!');
      return false;
    }

    var params = extend({}, defaultParams);

    switch (typeof arguments[0]) {

      case 'string':
        params.title = arguments[0];
        params.text  = arguments[1] || '';
        params.type  = arguments[2] || '';

        break;

      case 'object':
        params.title              = arguments[0].title || defaultParams.title;
        params.text               = arguments[0].text || defaultParams.text;
        params.html               = arguments[0].html || defaultParams.html;
        params.type               = arguments[0].type || defaultParams.type;
        params.animation          = arguments[0].animation !== undefined ? arguments[0].animation : defaultParams.animation;
        params.customClass        = arguments[0].customClass || params.customClass;
        params.allowOutsideClick  = arguments[0].allowOutsideClick || defaultParams.allowOutsideClick;
        params.allowEscapeKey     = arguments[0].allowEscapeKey !== undefined ? arguments[0].showConfirmButton : defaultParams.allowEscapeKey;
        params.showConfirmButton  = arguments[0].showConfirmButton !== undefined ? arguments[0].showConfirmButton : defaultParams.showConfirmButton;
        params.showCancelButton   = arguments[0].showCancelButton !== undefined ? arguments[0].showCancelButton : defaultParams.showCancelButton;
        params.closeOnConfirm     = arguments[0].closeOnConfirm !== undefined ? arguments[0].closeOnConfirm : defaultParams.closeOnConfirm;
        params.closeOnCancel      = arguments[0].closeOnCancel !== undefined ? arguments[0].closeOnCancel : defaultParams.closeOnCancel;
        params.timer              = arguments[0].timer || defaultParams.timer;
        params.width              = parseInt(arguments[0].width) || defaultParams.width;
        params.padding            = parseInt(arguments[0].padding) || defaultParams.padding;

        // Show 'Confirm' instead of 'OK' if cancel button is visible
        params.confirmButtonText  = (defaultParams.showCancelButton) ? 'Confirm' : defaultParams.confirmButtonText;
        params.confirmButtonText  = arguments[0].confirmButtonText || defaultParams.confirmButtonText;
        params.confirmButtonColor = arguments[0].confirmButtonColor || defaultParams.confirmButtonColor;
        params.cancelButtonText   = arguments[0].cancelButtonText || defaultParams.cancelButtonText;
        params.imageUrl           = arguments[0].imageUrl || defaultParams.imageUrl;
        params.imageSize          = arguments[0].imageSize || defaultParams.imageSize;
        params.doneFunction       = arguments[1] || null;

        break;

      default:
        window.console.error('Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0]);
        return false;

    }

    setParameters(params);
    fixVerticalPosition();
    openModal();

    // Modal interactions
    var modal = getModal();

    // Mouse interactions
    var onButtonEvent = function(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var targetedConfirm    = (target.className === 'confirm');
      var modalIsVisible     = hasClass(modal, 'visible');
      var doneFunctionExists = (params.doneFunction && modal.getAttribute('data-has-done-function') === 'true');

      switch (e.type) {
        case ('mouseover'):
          if (targetedConfirm) {
            target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
          }
          break;
        case ('mouseout'):
          if (targetedConfirm) {
            target.style.backgroundColor = params.confirmButtonColor;
          }
          break;
        case ('mousedown'):
          if (targetedConfirm) {
            target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2);
          }
          break;
        case ('mouseup'):
          if (targetedConfirm) {
            target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
          }
          break;
        case ('focus'):
          var $confirmButton = modal.querySelector('button.confirm');
          var $cancelButton  = modal.querySelector('button.cancel');

          if (targetedConfirm) {
            $confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
          } else {
            $confirmButton.style.backgroundColor = params.confirmButtonColor;
          }
          break;
        case ('click'):
          if (targetedConfirm && doneFunctionExists && modalIsVisible) { // Clicked 'confirm'

            params.doneFunction(true);

            if (params.closeOnConfirm) {
              closeModal();
            }
          } else if (doneFunctionExists && modalIsVisible) { // Clicked 'cancel'

            // Check if callback function expects a parameter (to track cancel actions)
            var functionAsStr          = String(params.doneFunction).replace(/\s/g, '');
            var functionHandlesCancel  = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

            if (functionHandlesCancel) {
              params.doneFunction(false);
            }

            if (params.closeOnCancel) {
              closeModal();
            }
          } else {
            closeModal();
          }

          break;
      }
    };

    var $buttons = modal.querySelectorAll('button');
    for (var i = 0; i < $buttons.length; i++) {
      $buttons[i].onclick     = onButtonEvent;
      $buttons[i].onmouseover = onButtonEvent;
      $buttons[i].onmouseout  = onButtonEvent;
      $buttons[i].onmousedown = onButtonEvent;
    }

    // Remember the current document.onclick event.
    previousDocumentClick = document.onclick;
    document.onclick = function(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;

      var clickedOnModal = (modal === target);
      var clickedOnModalChild = isDescendant(modal, target);
      var modalIsVisible = hasClass(modal, 'visible');
      var outsideClickIsAllowed = modal.getAttribute('data-allow-ouside-click') === 'true';

      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && outsideClickIsAllowed) {
        closeModal();
      }
    };

    // Keyboard interactions
    var $okButton = modal.querySelector('button.confirm');
    var $cancelButton = modal.querySelector('button.cancel');
    var $modalElements = modal.querySelectorAll('button, input:not([type=hidden]), textarea');
    for (var i = 0; i < $modalElements.length; i++) {
      $modalElements[i].onfocus = onButtonEvent;
    }

    function handleKeyDown(event) {
      var e = event || window.event;
      var keyCode = e.keyCode || e.which;

      if ([9,13,32,27].indexOf(keyCode) === -1) {
        // Don't do work on keys we don't care about.
        return;
      }

      var $targetElement = e.target || e.srcElement;

      var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
      for (var i = 0; i < $modalElements.length; i++) {
        if ($targetElement === $modalElements[i]) {
          btnIndex = i;
          break;
        }
      }

      if (keyCode === 9) {
        // TAB
        if (btnIndex === -1) {
          // No button focused. Jump to the confirm button.
          $targetElement = $okButton;
        } else {
          // Cycle to the next button
          if (btnIndex === $modalElements.length - 1) {
            $targetElement = $modalElements[0];
          } else {
            $targetElement = $modalElements[btnIndex + 1];
          }
        }

        stopEventPropagation(e);
        setFocus($targetElement);

      } else {
        if (keyCode === 13 || keyCode === 32) {
            if (btnIndex === -1) {
              // ENTER/SPACE clicked outside of a button.
              $targetElement = $okButton;
            } else {
              // Do nothing - let the browser handle it.
              $targetElement = undefined;
            }
        } else if (keyCode === 27 && params.allowEscapeKey === true) {
          closeModal();
        } else {
          // Fallback - let the browser handle it.
          $targetElement = undefined;
        }

        if ($targetElement !== undefined) {
          fireClick($targetElement, e);
        }
      }
    }

    previousWindowKeyDown = window.onkeydown;
    window.onkeydown = handleKeyDown;

    function handleOnBlur(event) {
      var e = event || window.event;
      var $targetElement = e.target || e.srcElement;
      var $focusElement = e.relatedTarget;
      var modalIsVisible = hasClass(modal, 'visible');

      if (modalIsVisible) {
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.

        if ($focusElement !== null) {
          // If we picked something in the DOM to focus to, let's see if it was a button.
          for (var i = 0; i < $modalElements.length; i++) {
            if ($focusElement === $modalElements[i]) {
              btnIndex = i;
              break;
            }
          }

          if (btnIndex === -1) {
            // Something in the dom, but not a visible button. Focus back on the button.
            $targetElement.focus();
          }
        } else {
          // Exiting the DOM (e.g. clicked in the URL bar);
          lastFocusedButton = $targetElement;
        }
      }
    }

    $okButton.onblur = handleOnBlur;
    $cancelButton.onblur = handleOnBlur;

    window.onfocus = function() {
      // When the user has focused away and focused back from the whole window.
      window.setTimeout(function() {
        // Put in a timeout to jump out of the event sequence. Calling focus() in the event
        // sequence confuses things.
        if (lastFocusedButton !== undefined) {
          lastFocusedButton.focus();
          lastFocusedButton = undefined;
        }
      }, 0);
    };
  }

  /**
   * Set default params for each popup
   * @param {Object} userParams
   */
  window.swal.setDefaults = function(userParams) {
    if (!userParams) {
      throw new Error('userParams is required');
    }
    if (typeof userParams !== 'object') {
      throw new Error('userParams has to be a object');
    }

    extend(defaultParams, userParams);
  };

  /*
   * Set type, text and actions on modal
   */
  function setParameters(params) {
    var modal = getModal();

    // set modal width, padding and margin-left
    modal.style.width = params.width + 'px';
    modal.style.padding = params.padding + 'px';
    modal.style.marginLeft = -params.width / 2 + 'px';

    // add dynamic media query css
    var mediaQuery = document.createElement('style');
    mediaQuery.setAttribute('media', 'all and (max-width: ' + params.width + 'px)');
    mediaQuery.setAttribute('id', 'sweetalert2-media-query');
    mediaQuery.appendChild(document.createTextNode(''));
    document.head.appendChild(mediaQuery);
    mediaQuery.sheet.insertRule(
      '.sweet-alert {' +
        'max-width: 100%;' +
        'left: 0 !important;' +
        'margin-left: 0 !important;' +
      '}',
      0
    );

    var $title = modal.querySelector('h2');
    var $text = modal.querySelector('p');
    var $cancelBtn = modal.querySelector('button.cancel');
    var $confirmBtn = modal.querySelector('button.confirm');

    // Title
    $title.innerHTML = escapeHtml(params.title).split('\n').join('<br>');

    // Text
    $text.innerHTML = escapeHtml(params.text.split('\n').join('<br>')) || params.html;
    if ($text.innerHTML) {
      show($text);
    }

    //Custom Class
    if (params.customClass) {
      addClass(modal, params.customClass);
    }

    // Icon
    hide(modal.querySelectorAll('.icon'));
    if (params.type) {
      var validType = false;
      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }
      if (!validType) {
        window.console.error('Unknown alert type: ' + params.type);
        return false;
      }
      var $icon = modal.querySelector('.icon.' + params.type);
      show($icon);

      // Animate icon
      switch (params.type) {
        case 'success':
          addClass($icon, 'animate');
          addClass($icon.querySelector('.tip'), 'animate-success-tip');
          addClass($icon.querySelector('.long'), 'animate-success-long');
          break;
        case 'error':
          addClass($icon, 'animate-error-icon');
          addClass($icon.querySelector('.x-mark'), 'animate-x-mark');
          break;
        case 'warning':
          addClass($icon, 'pulse-warning');
          addClass($icon.querySelector('.body'), 'pulse-warning-ins');
          addClass($icon.querySelector('.dot'), 'pulse-warning-ins');
          break;
      }

    }

    // Custom image
    if (params.imageUrl) {
      var $customIcon = modal.querySelector('.icon.custom');

      $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
      show($customIcon);

      var _imgWidth  = 80;
      var _imgHeight = 80;

      if (params.imageSize) {
        var imgWidth  = params.imageSize.split('x')[0];
        var imgHeight = params.imageSize.split('x')[1];

        if (!imgWidth || !imgHeight) {
          window.console.error('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
        } else {
          _imgWidth  = imgWidth;
          _imgHeight = imgHeight;

          $customIcon.css({
            'width': imgWidth + 'px',
            'height': imgHeight + 'px'
          });
        }
      }
      $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
    }

    // Cancel button
    modal.setAttribute('data-has-cancel-button', params.showCancelButton);
    if (params.showCancelButton) {
      $cancelBtn.style.display = 'inline-block';
    } else {
      hide($cancelBtn);
    }

    // Confirm button
    if (params.showConfirmButton) {
      $confirmBtn.style.display = 'inline-block';
    } else {
      hide($confirmBtn);
    }

    // Edit text on cancel and confirm buttons
    if (params.cancelButtonText) {
      $cancelBtn.innerHTML = escapeHtml(params.cancelButtonText);
    }
    if (params.confirmButtonText) {
      $confirmBtn.innerHTML = escapeHtml(params.confirmButtonText);
    }

    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Allow outside click?
    modal.setAttribute('data-allow-ouside-click', params.allowOutsideClick);

    // Done-function
    var hasDoneFunction = (params.doneFunction) ? true : false;
    modal.setAttribute('data-has-done-function', hasDoneFunction);

    // Close timer
    modal.setAttribute('data-timer', params.timer);

    // CSS animation
    if (params.animation === true) {
      removeClass(modal, 'no-animation');
    } else {
      addClass(modal, 'no-animation');
    }
  }

  /*
   * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
   */
  function colorLuminance(hex, lum) {
    // Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // Convert to decimal and change luminosity
    var rgb = '#';
    for (var i = 0; i < 3; i++) {
      var c = parseInt(hex.substr(i * 2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  }

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
  }

  // set focus (if button, make bgcolor darker)
  function setFocus($targetElement) {
    $targetElement.focus();
  }

  /*
   * Animations
   */
  function openModal() {
    var modal = getModal();
    fadeIn(getOverlay(), 10);
    show(modal);
    addClass(modal, 'show-sweet-alert');
    removeClass(modal, 'hide-sweet-alert');

    previousActiveElement = document.activeElement;
    var $okButton = modal.querySelector('button.confirm');

    setTimeout(function() {
      addClass(modal, 'visible');
    }, 500);

    var timer = modal.getAttribute('data-timer');

    if (timer !== 'null' && timer !== '') {
      modal.timeout = setTimeout(function() {
        closeModal();
      }, timer);
    }
  }

  function closeModal() {
    var modal = getModal();
    fadeOut(getOverlay(), 5);
    fadeOut(modal, 5);
    removeClass(modal, 'showSweetAlert');
    addClass(modal, 'hideSweetAlert');
    removeClass(modal, 'visible');

    // Reset icon animations

    var $successIcon = modal.querySelector('.icon.success');
    removeClass($successIcon, 'animate');
    removeClass($successIcon.querySelector('.tip'), 'animate-success-tip');
    removeClass($successIcon.querySelector('.long'), 'animate-success-long');

    var $errorIcon = modal.querySelector('.icon.error');
    removeClass($errorIcon, 'animate-error-icon');
    removeClass($errorIcon.querySelector('.x-mark'), 'animate-x-mark');

    var $warningIcon = modal.querySelector('.icon.warning');
    removeClass($warningIcon, 'pulse-warning');
    removeClass($warningIcon.querySelector('.body'), 'pulse-warning-ins');
    removeClass($warningIcon.querySelector('.dot'), 'pulse-warning-ins');

    // Reset the page to its previous state
    window.onkeydown = previousWindowKeyDown;
    document.onclick = previousDocumentClick;
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
    lastFocusedButton = undefined;
    clearTimeout(modal.timeout);
  }

  /*
   * Set 'margin-top'-property on modal based on its computed height
   */
  function fixVerticalPosition() {
    var modal = getModal();

    modal.style.marginTop = getTopMargin(getModal());
  }

  /*
   * If library is injected after page has loaded
   */
  (function () {
    if (document.readyState === 'complete' || document.readyState === 'interactive' && document.body) {
      window.sweetAlertInitialize();
    } else {
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function factorial() {
          document.removeEventListener('DOMContentLoaded', arguments.callee, false);
          window.sweetAlertInitialize();
        }, false);
      } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', arguments.callee);
            window.sweetAlertInitialize();
          }
        });
      }
    }
  })();

})(window, document);

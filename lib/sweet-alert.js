// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

"use strict";

/*
 * jQuery-like functions for manipulating the DOM
 */
import {
  hasClass, addClass, removeClass, 
  escapeHtml, 
  _show, show, _hide, hide, 
  isDescendant, 
  getTopMargin,
  fadeIn, fadeOut,
  fireClick,
  stopEventPropagation
} from './dom-manipulation';

/*
 * Handy utilities
 */
import {
  extend,
  hexToRgb,
  isIE8,
  logStr,
  colorLuminance
} from './utils';

/*
 *  Handle sweetAlert's DOM elements
 */
import {
  sweetAlertInitialize,
  getModal,
  getOverlay,
  getInput,
  setFocusStyle,
  openModal,
  resetInput,
  fixVerticalPosition
} from './swal-dom';


// Default values
import defaultParams from './default-params';
import setParameters from './set-params';

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;


/*
 * Global sweetAlert function
 */
var sweetAlert, swal;

sweetAlert = swal = function() {
  var customizations = arguments[0];

  addClass(document.body, 'stop-scrolling');
  resetInput();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;

    if (typeof args[key] !== 'undefined') {
      return args[key];
    } else {
      return defaultParams[key];
    }
  }

  if (customizations === undefined) {
    logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = extend({}, defaultParams);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text  = arguments[1] || '';
      params.type  = arguments[2] || '';
      break;

    // Ex: swal({title:"Hello", text: "Just testing", type: "info"});
    case 'object':
      if (customizations.title === undefined) {
        logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      var availableCustoms = ['text', 'type', 'customClass', 'allowOutsideClick', 'showConfirmButton', 'showCancelButton', 'closeOnConfirm', 'closeOnCancel', 'timer', 'confirmButtonColor', 'cancelButtonText', 'imageUrl', 'imageSize', 'html', 'animation', 'allowEscapeKey', 'inputType', 'inputPlaceholder'];

      // It would be nice to just use .forEach here, but IE8... :(
      var numCustoms = availableCustoms.length;
      for (var customIndex = 0; customIndex < numCustoms; customIndex++) {
        var customName = availableCustoms[customIndex];
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : defaultParams.confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Function to call when clicking on cancel/OK
      params.doneFunction = arguments[1] || null;

      break;

    default:
      logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  setParameters(params);
  fixVerticalPosition();
  openModal();

  // Modal interactions
  var modal = getModal();

  // Mouse interactions
  var onButtonEvent = function onButtonEvent(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var targetedConfirm = target.className.indexOf('confirm') !== -1;
    var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
    var modalIsVisible = hasClass(modal, 'visible');
    var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

    switch (e.type) {
      case 'mouseover':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.04);
        }
        break;
      case 'mouseout':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = params.confirmButtonColor;
        }
        break;
      case 'mousedown':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.14);
        }
        break;
      case 'mouseup':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.04);
        }
        break;
      case 'focus':
        var $confirmButton = modal.querySelector('button.confirm');
        var $cancelButton = modal.querySelector('button.cancel');

        if (targetedConfirm) {
          $cancelButton.style.boxShadow = 'none';
        } else {
          $confirmButton.style.boxShadow = 'none';
        }
        break;
      case 'click':
        var clickedOnModal = modal === target;
        var clickedOnModalChild = isDescendant(modal, target);

        if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
          break;
        }

        if (targetedConfirm && doneFunctionExists && modalIsVisible) {
          // Clicked "confirm"
          handleConfirm();
        } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
          // Clicked "cancel"
          handleCancel();
        } else if (isDescendant(modal, target) && target.tagName === 'BUTTON') {
          sweetAlert.close();
        }
        break;
    }
  };

  function handleConfirm() {
    var callbackValue = true;

    if (hasClass(modal, 'show-input')) {
      callbackValue = modal.querySelector('input').value;

      if (!callbackValue) {
        callbackValue = '';
      }
    }

    params.doneFunction(callbackValue);

    if (params.closeOnConfirm) {
      sweetAlert.close();
    }
  }

  function handleCancel() {
    // Check if callback function expects a parameter (to track cancel actions)
    var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
    var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

    if (functionHandlesCancel) {
      params.doneFunction(false);
    }

    if (params.closeOnCancel) {
      sweetAlert.close();
    }
  }

  var $buttons = modal.querySelectorAll('button');
  for (var i = 0; i < $buttons.length; i++) {
    $buttons[i].onclick = onButtonEvent;
    $buttons[i].onmouseover = onButtonEvent;
    $buttons[i].onmouseout = onButtonEvent;
    $buttons[i].onmousedown = onButtonEvent;
    $buttons[i].onmouseup = onButtonEvent;
    $buttons[i].onfocus = onButtonEvent;
  }

  getOverlay().onclick = onButtonEvent;

  // Keyboard interactions
  var $okButton = modal.querySelector('button.confirm'),
      $cancelButton = modal.querySelector('button.cancel'),
      $modalButtons = modal.querySelectorAll('button[tabindex]');

  function handleKeyDown(event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;

    if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
      // Don't do work on keys we don't care about.
      return;
    }

    var $targetElement = e.target || e.srcElement;

    var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
    for (var i = 0; i < $modalButtons.length; i++) {
      if ($targetElement === $modalButtons[i]) {
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
        if (btnIndex === $modalButtons.length - 1) {
          $targetElement = $modalButtons[0];
        } else {
          $targetElement = $modalButtons[btnIndex + 1];
        }
      }

      stopEventPropagation(e);
      $targetElement.focus();

      if (params.confirmButtonColor) {
        setFocusStyle($targetElement, params.confirmButtonColor);
      }
    } else {
      if (keyCode === 13) {
        if ($targetElement.tagName === 'INPUT') {
          $targetElement = $okButton;
          $okButton.focus();
        }

        if (btnIndex === -1) {
          // ENTER/SPACE clicked outside of a button.
          $targetElement = $okButton;
        } else {
          // Do nothing - let the browser handle it.
          $targetElement = undefined;
        }
      } else if (keyCode === 27 && params.allowEscapeKey === true) {
        $targetElement = $cancelButton;
        fireClick($targetElement, e);
      } else {
        // Fallback - let the browser handle it.
        $targetElement = undefined;
      }
    }
  }

  previousWindowKeyDown = window.onkeydown;

  window.onkeydown = handleKeyDown;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence. Calling focus() in the event
      // sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function(userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  extend(defaultParams, userParams);
};


/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function() {
  var modal = getModal();

  fadeOut(getOverlay(), 5);
  fadeOut(modal, 5);
  removeClass(modal, 'showSweetAlert');
  addClass(modal, 'hideSweetAlert');
  removeClass(modal, 'visible');

  // Reset icon animations

  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  removeClass($successIcon, 'animate');
  removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  removeClass($errorIcon, 'animateErrorIcon');
  removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  removeClass($warningIcon, 'pulseWarning');
  removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);
};


/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function(errorMessage) {
  var modal = getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  modal.querySelector('input').focus();
};


/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  removeClass($errorContainer, 'show');
};



/*
 * Use SweetAlert with RequireJS
 */
if (typeof define === 'function' && define.amd) {
  define(function () {
    return sweetAlert;
  });
} else if (typeof window !== 'undefined') {
  window.sweetAlert = window.swal = sweetAlert;
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = sweetAlert;
}

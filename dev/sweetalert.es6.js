// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

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
} from './modules/handle-dom';

/*
 * Handy utilities
 */
import {
  extend,
  hexToRgb,
  isIE8,
  logStr,
  colorLuminance
} from './modules/utils';

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
} from './modules/handle-swal-dom';


// Handle button events and keyboard events
import { handleButton, handleConfirm, handleCancel } from './modules/handle-click';
import handleKeyDown from './modules/handle-key';


// Default values
import defaultParams from './modules/default-params';
import setParameters from './modules/set-params';

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;


/*
 * Global sweetAlert function
 * (this is what the user calls)
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
    return (args[key] === undefined) ?  defaultParams[key] : args[key];
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

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (let customName in defaultParams) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : defaultParams.confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
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


  /* 
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = (e) => handleButton(e, params, modal);

  for (let btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (let evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      let btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  getOverlay().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = (e) => handleKeyDown(e, params, modal);
  window.onkeydown = onKeyEvent;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence.
      // Calling focus() in the event sequence confuses things.
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

  /*
   * Reset icon animations
   */
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

  // Make page scrollable again
  removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);

  return true;
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

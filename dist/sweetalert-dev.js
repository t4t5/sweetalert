;(function(window, document, undefined) {
  "use strict";
  
  (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

/*
 * jQuery-like functions for manipulating the DOM
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesHandleDom = require('./modules/handle-dom');

/*
 * Handy utilities
 */

var _modulesUtils = require('./modules/utils');

/*
 *  Handle sweetAlert's DOM elements
 */

var _modulesHandleSwalDom = require('./modules/handle-swal-dom');

// Handle button events and keyboard events

var _modulesHandleClick = require('./modules/handle-click');

var _modulesHandleKey = require('./modules/handle-key');

var _modulesHandleKey2 = _interopRequireDefault(_modulesHandleKey);

// Default values

var _modulesDefaultParams = require('./modules/default-params');

var _modulesDefaultParams2 = _interopRequireDefault(_modulesDefaultParams);

var _modulesSetParams = require('./modules/set-params');

var _modulesSetParams2 = _interopRequireDefault(_modulesSetParams);

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

exports['default'] = sweetAlert = swal = function () {
  var customizations = arguments[0];

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;
    return args[key] === undefined ? _modulesDefaultParams2['default'][key] : args[key];
  }

  if (customizations === undefined) {
    (0, _modulesUtils.logStr)('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = (0, _modulesUtils.extend)({}, _modulesDefaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        (0, _modulesUtils.logStr)('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (var customName in _modulesDefaultParams2['default']) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _modulesDefaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
      params.doneFunction = arguments[1] || null;

      break;

    default:
      (0, _modulesUtils.logStr)('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  (0, _modulesHandleDom.addClass)(document.body, 'stop-scrolling');
  (0, _modulesHandleSwalDom.sweetAlertInitialize)(params.rootElement);
  (0, _modulesHandleSwalDom.resetInput)();
  (0, _modulesSetParams2['default'])(params);
  (0, _modulesHandleSwalDom.fixVerticalPosition)();
  (0, _modulesHandleSwalDom.openModal)(arguments[1]);

  // Modal interactions
  var modal = (0, _modulesHandleSwalDom.getModal)();

  /*
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = function onButtonEvent(e) {
    return (0, _modulesHandleClick.handleButton)(e, params, modal);
  };

  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      var btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  (0, _modulesHandleSwalDom.getOverlay)().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = function onKeyEvent(e) {
    return (0, _modulesHandleKey2['default'])(e, params, modal);
  };
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

  // Show alert with enabled buttons always
  swal.enableButtons();
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  (0, _modulesUtils.extend)(_modulesDefaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = (0, _modulesHandleSwalDom.getModal)();

  (0, _modulesHandleDom.fadeOut)((0, _modulesHandleSwalDom.getOverlay)(), 5);
  (0, _modulesHandleDom.fadeOut)(modal, 5);
  (0, _modulesHandleDom.removeClass)(modal, 'showSweetAlert');
  (0, _modulesHandleDom.addClass)(modal, 'hideSweetAlert');
  (0, _modulesHandleDom.removeClass)(modal, 'visible');

  /*
   * Reset icon animations
   */
  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  (0, _modulesHandleDom.removeClass)($successIcon, 'animate');
  (0, _modulesHandleDom.removeClass)($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  (0, _modulesHandleDom.removeClass)($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  (0, _modulesHandleDom.removeClass)($errorIcon, 'animateErrorIcon');
  (0, _modulesHandleDom.removeClass)($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  (0, _modulesHandleDom.removeClass)($warningIcon, 'pulseWarning');
  (0, _modulesHandleDom.removeClass)($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  (0, _modulesHandleDom.removeClass)($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  // Reset custom class (delay so that UI changes aren't visible)
  setTimeout(function () {
    var customClass = modal.getAttribute('data-custom-class');
    (0, _modulesHandleDom.removeClass)(modal, customClass);
  }, 300);

  // Make page scrollable again
  (0, _modulesHandleDom.removeClass)(document.body, 'stop-scrolling');

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
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = (0, _modulesHandleSwalDom.getModal)();

  var $errorIcon = modal.querySelector('.sa-input-error');
  (0, _modulesHandleDom.addClass)($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  (0, _modulesHandleDom.addClass)($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  setTimeout(function () {
    sweetAlert.enableButtons();
  }, 1);

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = (0, _modulesHandleSwalDom.getModal)();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  (0, _modulesHandleDom.removeClass)($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  (0, _modulesHandleDom.removeClass)($errorContainer, 'show');
};

/*
 * Disable confirm and cancel buttons
 */
sweetAlert.disableButtons = swal.disableButtons = function (event) {
  var modal = (0, _modulesHandleSwalDom.getModal)();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = true;
  $cancelButton.disabled = true;
};

/*
 * Enable confirm and cancel buttons
 */
sweetAlert.enableButtons = swal.enableButtons = function (event) {
  var modal = (0, _modulesHandleSwalDom.getModal)();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = false;
  $cancelButton.disabled = false;
};

if (typeof window !== 'undefined') {
  // The 'handle-click' module requires
  // that 'sweetAlert' was set as global.
  window.sweetAlert = window.swal = sweetAlert;
} else {
  (0, _modulesUtils.logStr)('SweetAlert is a frontend module!');
}
module.exports = exports['default'];

},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultParams = {
  title: '',
  text: '',
  type: null,
  allowOutsideClick: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  showLoaderOnConfirm: false,
  rootElement: document.body
};

exports['default'] = defaultParams;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var _handleSwalDom = require('./handle-swal-dom');

var _handleDom = require('./handle-dom');

/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function handleButton(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible = (0, _handleDom.hasClass)(modal, 'visible');
  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor = params.confirmButtonColor;
    hoverColor = (0, _utils.colorLuminance)(normalColor, -0.04);
    activeColor = (0, _utils.colorLuminance)(normalColor, -0.14);
  }

  function shouldSetConfirmButtonColor(color) {
    if (targetedConfirm && params.confirmButtonColor) {
      target.style.backgroundColor = color;
    }
  }

  switch (e.type) {
    case 'mouseover':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'mouseout':
      shouldSetConfirmButtonColor(normalColor);
      break;

    case 'mousedown':
      shouldSetConfirmButtonColor(activeColor);
      break;

    case 'mouseup':
      shouldSetConfirmButtonColor(hoverColor);
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
      var clickedOnModalChild = (0, _handleDom.isDescendant)(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if ((0, _handleDom.isDescendant)(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function handleConfirm(modal, params) {
  var callbackValue = true;

  if ((0, _handleDom.hasClass)(modal, 'show-input')) {
    callbackValue = modal.querySelector('input').value;

    if (!callbackValue) {
      callbackValue = '';
    }
  }

  params.doneFunction(callbackValue);

  if (params.closeOnConfirm) {
    sweetAlert.close();
  }
  // Disable cancel and confirm button if the parameter is true
  if (params.showLoaderOnConfirm) {
    sweetAlert.disableButtons();
  }
};

/*
 *  User clicked on "Cancel"
 */
var handleCancel = function handleCancel(modal, params) {
  // Check if callback function expects a parameter (to track cancel actions)
  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

  if (functionHandlesCancel) {
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};

exports['default'] = {
  handleButton: handleButton,
  handleConfirm: handleConfirm,
  handleCancel: handleCancel
};
module.exports = exports['default'];

},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== "undefined") {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = function tick() {
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

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = function tick() {
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

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
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
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _handleDom = require('./handle-dom');

var _handleSwalDom = require('./handle-swal-dom');

var handleKeyDown = function handleKeyDown(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  var $okButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

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

    (0, _handleDom.stopEventPropagation)(e);
    $targetElement.focus();

    if (params.confirmButtonColor) {
      (0, _handleSwalDom.setFocusStyle)($targetElement, params.confirmButtonColor);
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
      (0, _handleDom.fireClick)($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

exports['default'] = handleKeyDown;
module.exports = exports['default'];

},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _handleDom = require('./handle-dom');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireDefault(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHtml = require('./injected-html');

var _injectedHtml2 = _interopRequireDefault(_injectedHtml);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize(rootElement) {
  if (rootElement === undefined || !document.contains(rootElement)) {
    rootElement = document.body;
  }

  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    appendAlertToElement(rootElement);
  } else if ($modal.parentElement !== rootElement) {
    $modal.remove();
    appendAlertToElement(rootElement);
  }
};

var appendAlertToElement = function appendAlertToElement(rootElement) {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHtml2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    rootElement.appendChild(sweetWrap.firstChild);
  }
};
/*
 * Get DOM element of modal
 */
var getModal = function getModal() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    var $modal = document.querySelector(modalClass);

    if (!$modal) {
      sweetAlertInitialize(document.body);
      _again = true;
      $modal = undefined;
      continue _function;
    }

    return $modal;
  }
};

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function setFocusStyle($button, bgColor) {
  var rgbColor = (0, _utils.hexToRgb)(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal(callback) {
  var $modal = getModal();
  (0, _handleDom.fadeIn)(getOverlay(), 10);
  (0, _handleDom.show)($modal);
  (0, _handleDom.addClass)($modal, 'showSweetAlert');
  (0, _handleDom.removeClass)($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    (0, _handleDom.addClass)($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function () {
      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
      if (doneFunctionExists) {
        timerCallback(null);
      } else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  (0, _handleDom.removeClass)($modal, 'show-input');
  $input.value = _defaultParams2['default'].inputValue;
  $input.setAttribute('type', _defaultParams2['default'].inputType);
  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  (0, _handleDom.removeClass)($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  (0, _handleDom.removeClass)($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = (0, _handleDom.getTopMargin)(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.setFocusStyle = setFocusStyle;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;

},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var _handleSwalDom = require('./handle-swal-dom');

var _handleDom = require('./handle-dom');

/*
 * Set type, text and actions on modal
 */
var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

var setParameters = function setParameters(params) {
  var modal = (0, _handleSwalDom.getModal)(params.rootElement);

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : (0, _handleDom.escapeHtml)(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : (0, _handleDom.escapeHtml)(params.text || '').split('\n').join('<br>');
  if (params.text) (0, _handleDom.show)($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    (0, _handleDom.addClass)(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    (0, _handleDom.removeClass)(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  (0, _handleDom.hide)(modal.querySelectorAll('.sa-icon'));

  if (params.type && !(0, _utils.isIE8)()) {
    var _ret = (function () {

      var validType = false;

      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        logStr('Unknown alert type: ' + params.type);
        return {
          v: false
        };
      }

      var typesWithIcons = ['success', 'error', 'warning', 'info'];
      var $icon = undefined;

      if (typesWithIcons.indexOf(params.type) !== -1) {
        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
        (0, _handleDom.show)($icon);
      }

      var $input = (0, _handleSwalDom.getInput)();

      // Animate icon
      switch (params.type) {

        case 'success':
          (0, _handleDom.addClass)($icon, 'animate');
          (0, _handleDom.addClass)($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          (0, _handleDom.addClass)($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          (0, _handleDom.addClass)($icon, 'animateErrorIcon');
          (0, _handleDom.addClass)($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          (0, _handleDom.addClass)($icon, 'pulseWarning');
          (0, _handleDom.addClass)($icon.querySelector('.sa-body'), 'pulseWarningIns');
          (0, _handleDom.addClass)($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.value = params.inputValue;
          $input.setAttribute('placeholder', params.inputPlaceholder);
          (0, _handleDom.addClass)(modal, 'show-input');
          setTimeout(function () {
            $input.focus();
            $input.addEventListener('keyup', swal.resetInputError);
          }, 400);
          break;
      }
    })();

    if (typeof _ret === 'object') return _ret.v;
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    (0, _handleDom.show)($customIcon);

    var _imgWidth = 80;
    var _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }

    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    (0, _handleDom.hide)($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    (0, _handleDom.hide)($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = (0, _handleDom.escapeHtml)(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = (0, _handleDom.escapeHtml)(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    (0, _handleSwalDom.setFocusStyle)($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
      modal.setAttribute('data-animation', 'pop');
    }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];

},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(require,module,exports){
/*
 * Allow user to pass their own params
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
 */
var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons 
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  var c;
  var i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

exports.extend = extend;
exports.hexToRgb = hexToRgb;
exports.isIE8 = isIE8;
exports.logStr = logStr;
exports.colorLuminance = colorLuminance;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2V2aW5zbXl0aC93b3Jrc3BhY2Uvc3dlZXRhbGVydC9kZXYvc3dlZXRhbGVydC5lczYuanMiLCIvVXNlcnMva2V2aW5zbXl0aC93b3Jrc3BhY2Uvc3dlZXRhbGVydC9kZXYvbW9kdWxlcy9kZWZhdWx0LXBhcmFtcy5qcyIsIi9Vc2Vycy9rZXZpbnNteXRoL3dvcmtzcGFjZS9zd2VldGFsZXJ0L2Rldi9tb2R1bGVzL2hhbmRsZS1jbGljay5qcyIsIi9Vc2Vycy9rZXZpbnNteXRoL3dvcmtzcGFjZS9zd2VldGFsZXJ0L2Rldi9tb2R1bGVzL2hhbmRsZS1kb20uanMiLCIvVXNlcnMva2V2aW5zbXl0aC93b3Jrc3BhY2Uvc3dlZXRhbGVydC9kZXYvbW9kdWxlcy9oYW5kbGUta2V5LmpzIiwiL1VzZXJzL2tldmluc215dGgvd29ya3NwYWNlL3N3ZWV0YWxlcnQvZGV2L21vZHVsZXMvaGFuZGxlLXN3YWwtZG9tLmpzIiwiL1VzZXJzL2tldmluc215dGgvd29ya3NwYWNlL3N3ZWV0YWxlcnQvZGV2L21vZHVsZXMvaW5qZWN0ZWQtaHRtbC5qcyIsIi9Vc2Vycy9rZXZpbnNteXRoL3dvcmtzcGFjZS9zd2VldGFsZXJ0L2Rldi9tb2R1bGVzL3NldC1wYXJhbXMuanMiLCIvVXNlcnMva2V2aW5zbXl0aC93b3Jrc3BhY2Uvc3dlZXRhbGVydC9kZXYvbW9kdWxlcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztnQ0NnQk8sc0JBQXNCOzs7Ozs7NEJBV3RCLGlCQUFpQjs7Ozs7O29DQWNqQiwyQkFBMkI7Ozs7a0NBSXdCLHdCQUF3Qjs7Z0NBQ3hELHNCQUFzQjs7Ozs7O29DQUl0QiwwQkFBMEI7Ozs7Z0NBQzFCLHNCQUFzQjs7Ozs7Ozs7QUFNaEQsSUFBSSxxQkFBcUIsQ0FBQztBQUMxQixJQUFJ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LENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ3BDOztBQUVELFNBQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQzs7UUFJQSxNQUFNLEdBQU4sTUFBTTtRQUNOLFFBQVEsR0FBUixRQUFRO1FBQ1IsS0FBSyxHQUFMLEtBQUs7UUFDTCxNQUFNLEdBQU4sTUFBTTtRQUNOLGNBQWMsR0FBZCxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFN3ZWV0QWxlcnRcbi8vIDIwMTQtMjAxNSAoYykgLSBUcmlzdGFuIEVkd2FyZHNcbi8vIGdpdGh1Yi5jb20vdDR0NS9zd2VldGFsZXJ0XG5cbi8qXG4gKiBqUXVlcnktbGlrZSBmdW5jdGlvbnMgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NXG4gKi9cbmltcG9ydCB7XG4gIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsXG4gIGVzY2FwZUh0bWwsXG4gIF9zaG93LCBzaG93LCBfaGlkZSwgaGlkZSxcbiAgaXNEZXNjZW5kYW50LFxuICBnZXRUb3BNYXJnaW4sXG4gIGZhZGVJbiwgZmFkZU91dCxcbiAgZmlyZUNsaWNrLFxuICBzdG9wRXZlbnRQcm9wYWdhdGlvblxufSBmcm9tICcuL21vZHVsZXMvaGFuZGxlLWRvbSc7XG5cbi8qXG4gKiBIYW5keSB1dGlsaXRpZXNcbiAqL1xuaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBoZXhUb1JnYixcbiAgaXNJRTgsXG4gIGxvZ1N0cixcbiAgY29sb3JMdW1pbmFuY2Vcbn0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcblxuLypcbiAqICBIYW5kbGUgc3dlZXRBbGVydCdzIERPTSBlbGVtZW50c1xuICovXG5pbXBvcnQge1xuICBzd2VldEFsZXJ0SW5pdGlhbGl6ZSxcbiAgZ2V0TW9kYWwsXG4gIGdldE92ZXJsYXksXG4gIGdldElucHV0LFxuICBzZXRGb2N1c1N0eWxlLFxuICBvcGVuTW9kYWwsXG4gIHJlc2V0SW5wdXQsXG4gIGZpeFZlcnRpY2FsUG9zaXRpb25cbn0gZnJvbSAnLi9tb2R1bGVzL2hhbmRsZS1zd2FsLWRvbSc7XG5cblxuLy8gSGFuZGxlIGJ1dHRvbiBldmVudHMgYW5kIGtleWJvYXJkIGV2ZW50c1xuaW1wb3J0IHsgaGFuZGxlQnV0dG9uLCBoYW5kbGVDb25maXJtLCBoYW5kbGVDYW5jZWwgfSBmcm9tICcuL21vZHVsZXMvaGFuZGxlLWNsaWNrJztcbmltcG9ydCBoYW5kbGVLZXlEb3duIGZyb20gJy4vbW9kdWxlcy9oYW5kbGUta2V5JztcblxuXG4vLyBEZWZhdWx0IHZhbHVlc1xuaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9tb2R1bGVzL2RlZmF1bHQtcGFyYW1zJztcbmltcG9ydCBzZXRQYXJhbWV0ZXJzIGZyb20gJy4vbW9kdWxlcy9zZXQtcGFyYW1zJztcblxuLypcbiAqIFJlbWVtYmVyIHN0YXRlIGluIGNhc2VzIHdoZXJlIG9wZW5pbmcgYW5kIGhhbmRsaW5nIGEgbW9kYWwgd2lsbCBmaWRkbGUgd2l0aCBpdC5cbiAqIChXZSBhbHNvIHVzZSB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50IGFzIGEgZ2xvYmFsIHZhcmlhYmxlKVxuICovXG52YXIgcHJldmlvdXNXaW5kb3dLZXlEb3duO1xudmFyIGxhc3RGb2N1c2VkQnV0dG9uO1xuXG5cbi8qXG4gKiBHbG9iYWwgc3dlZXRBbGVydCBmdW5jdGlvblxuICogKHRoaXMgaXMgd2hhdCB0aGUgdXNlciBjYWxscylcbiAqL1xudmFyIHN3ZWV0QWxlcnQsIHN3YWw7XG5cbmV4cG9ydCBkZWZhdWx0IHN3ZWV0QWxlcnQgPSBzd2FsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjdXN0b21pemF0aW9ucyA9IGFyZ3VtZW50c1swXTtcblxuICAvKlxuICAgKiBVc2UgYXJndW1lbnQgaWYgZGVmaW5lZCBvciBkZWZhdWx0IHZhbHVlIGZyb20gcGFyYW1zIG9iamVjdCBvdGhlcndpc2UuXG4gICAqIFN1cHBvcnRzIHRoZSBjYXNlIHdoZXJlIGEgZGVmYXVsdCB2YWx1ZSBpcyBib29sZWFuIHRydWUgYW5kIHNob3VsZCBiZVxuICAgKiBvdmVycmlkZGVuIGJ5IGEgY29ycmVzcG9uZGluZyBleHBsaWNpdCBhcmd1bWVudCB3aGljaCBpcyBib29sZWFuIGZhbHNlLlxuICAgKi9cbiAgZnVuY3Rpb24gYXJndW1lbnRPckRlZmF1bHQoa2V5KSB7XG4gICAgdmFyIGFyZ3MgPSBjdXN0b21pemF0aW9ucztcbiAgICByZXR1cm4gKGFyZ3Nba2V5XSA9PT0gdW5kZWZpbmVkKSA/ICBkZWZhdWx0UGFyYW1zW2tleV0gOiBhcmdzW2tleV07XG4gIH1cblxuICBpZiAoY3VzdG9taXphdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgIGxvZ1N0cignU3dlZXRBbGVydCBleHBlY3RzIGF0IGxlYXN0IDEgYXR0cmlidXRlIScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSBleHRlbmQoe30sIGRlZmF1bHRQYXJhbXMpO1xuXG4gIHN3aXRjaCAodHlwZW9mIGN1c3RvbWl6YXRpb25zKSB7XG5cbiAgICAvLyBFeDogc3dhbChcIkhlbGxvXCIsIFwiSnVzdCB0ZXN0aW5nXCIsIFwiaW5mb1wiKTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcGFyYW1zLnRpdGxlID0gY3VzdG9taXphdGlvbnM7XG4gICAgICBwYXJhbXMudGV4dCAgPSBhcmd1bWVudHNbMV0gfHwgJyc7XG4gICAgICBwYXJhbXMudHlwZSAgPSBhcmd1bWVudHNbMl0gfHwgJyc7XG4gICAgICBicmVhaztcblxuICAgIC8vIEV4OiBzd2FsKHsgdGl0bGU6XCJIZWxsb1wiLCB0ZXh0OiBcIkp1c3QgdGVzdGluZ1wiLCB0eXBlOiBcImluZm9cIiB9KTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKGN1c3RvbWl6YXRpb25zLnRpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nU3RyKCdNaXNzaW5nIFwidGl0bGVcIiBhcmd1bWVudCEnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMudGl0bGUgPSBjdXN0b21pemF0aW9ucy50aXRsZTtcblxuICAgICAgZm9yIChsZXQgY3VzdG9tTmFtZSBpbiBkZWZhdWx0UGFyYW1zKSB7XG4gICAgICAgIHBhcmFtc1tjdXN0b21OYW1lXSA9IGFyZ3VtZW50T3JEZWZhdWx0KGN1c3RvbU5hbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBTaG93IFwiQ29uZmlybVwiIGluc3RlYWQgb2YgXCJPS1wiIGlmIGNhbmNlbCBidXR0b24gaXMgdmlzaWJsZVxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gcGFyYW1zLnNob3dDYW5jZWxCdXR0b24gPyAnQ29uZmlybScgOiBkZWZhdWx0UGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0O1xuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gYXJndW1lbnRPckRlZmF1bHQoJ2NvbmZpcm1CdXR0b25UZXh0Jyk7XG5cbiAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gY2xpY2tpbmcgb24gXCJPS1wiL1wiQ2FuY2VsXCJcbiAgICAgIHBhcmFtcy5kb25lRnVuY3Rpb24gPSBhcmd1bWVudHNbMV0gfHwgbnVsbDtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nU3RyKCdVbmV4cGVjdGVkIHR5cGUgb2YgYXJndW1lbnQhIEV4cGVjdGVkIFwic3RyaW5nXCIgb3IgXCJvYmplY3RcIiwgZ290ICcgKyB0eXBlb2YgY3VzdG9taXphdGlvbnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcbiAgc3dlZXRBbGVydEluaXRpYWxpemUocGFyYW1zLnJvb3RFbGVtZW50KTtcbiAgcmVzZXRJbnB1dCgpO1xuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gIGZpeFZlcnRpY2FsUG9zaXRpb24oKTtcbiAgb3Blbk1vZGFsKGFyZ3VtZW50c1sxXSk7XG5cbiAgLy8gTW9kYWwgaW50ZXJhY3Rpb25zXG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cblxuICAvKlxuICAgKiBNYWtlIHN1cmUgYWxsIG1vZGFsIGJ1dHRvbnMgcmVzcG9uZCB0byBhbGwgZXZlbnRzXG4gICAqL1xuICB2YXIgJGJ1dHRvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgdmFyIGJ1dHRvbkV2ZW50cyA9IFsnb25jbGljaycsICdvbm1vdXNlb3ZlcicsICdvbm1vdXNlb3V0JywgJ29ubW91c2Vkb3duJywgJ29ubW91c2V1cCcsICdvbmZvY3VzJ107XG4gIHZhciBvbkJ1dHRvbkV2ZW50ID0gKGUpID0+IGhhbmRsZUJ1dHRvbihlLCBwYXJhbXMsIG1vZGFsKTtcblxuICBmb3IgKGxldCBidG5JbmRleCA9IDA7IGJ0bkluZGV4IDwgJGJ1dHRvbnMubGVuZ3RoOyBidG5JbmRleCsrKSB7XG4gICAgZm9yIChsZXQgZXZ0SW5kZXggPSAwOyBldnRJbmRleCA8IGJ1dHRvbkV2ZW50cy5sZW5ndGg7IGV2dEluZGV4KyspIHtcbiAgICAgIGxldCBidG5FdnQgPSBidXR0b25FdmVudHNbZXZ0SW5kZXhdO1xuICAgICAgJGJ1dHRvbnNbYnRuSW5kZXhdW2J0bkV2dF0gPSBvbkJ1dHRvbkV2ZW50O1xuICAgIH1cbiAgfVxuXG4gIC8vIENsaWNraW5nIG91dHNpZGUgdGhlIG1vZGFsIGRpc21pc3NlcyBpdCAoaWYgYWxsb3dlZCBieSB1c2VyKVxuICBnZXRPdmVybGF5KCkub25jbGljayA9IG9uQnV0dG9uRXZlbnQ7XG5cbiAgcHJldmlvdXNXaW5kb3dLZXlEb3duID0gd2luZG93Lm9ua2V5ZG93bjtcblxuICB2YXIgb25LZXlFdmVudCA9IChlKSA9PiBoYW5kbGVLZXlEb3duKGUsIHBhcmFtcywgbW9kYWwpO1xuICB3aW5kb3cub25rZXlkb3duID0gb25LZXlFdmVudDtcblxuICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGhhcyBmb2N1c2VkIGF3YXkgYW5kIGZvY3VzZWQgYmFjayBmcm9tIHRoZSB3aG9sZSB3aW5kb3cuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBQdXQgaW4gYSB0aW1lb3V0IHRvIGp1bXAgb3V0IG9mIHRoZSBldmVudCBzZXF1ZW5jZS5cbiAgICAgIC8vIENhbGxpbmcgZm9jdXMoKSBpbiB0aGUgZXZlbnQgc2VxdWVuY2UgY29uZnVzZXMgdGhpbmdzLlxuICAgICAgaWYgKGxhc3RGb2N1c2VkQnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gU2hvdyBhbGVydCB3aXRoIGVuYWJsZWQgYnV0dG9ucyBhbHdheXNcbiAgc3dhbC5lbmFibGVCdXR0b25zKCk7XG59O1xuXG5cblxuLypcbiAqIFNldCBkZWZhdWx0IHBhcmFtcyBmb3IgZWFjaCBwb3B1cFxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJQYXJhbXNcbiAqL1xuc3dlZXRBbGVydC5zZXREZWZhdWx0cyA9IHN3YWwuc2V0RGVmYXVsdHMgPSBmdW5jdGlvbih1c2VyUGFyYW1zKSB7XG4gIGlmICghdXNlclBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlclBhcmFtcyBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgdXNlclBhcmFtcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaGFzIHRvIGJlIGEgb2JqZWN0Jyk7XG4gIH1cblxuICBleHRlbmQoZGVmYXVsdFBhcmFtcywgdXNlclBhcmFtcyk7XG59O1xuXG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBjbG9zaW5nIG1vZGFsXG4gKi9cbnN3ZWV0QWxlcnQuY2xvc2UgPSBzd2FsLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgZmFkZU91dChnZXRPdmVybGF5KCksIDUpO1xuICBmYWRlT3V0KG1vZGFsLCA1KTtcbiAgcmVtb3ZlQ2xhc3MobW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICBhZGRDbGFzcyhtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG4gIHJlbW92ZUNsYXNzKG1vZGFsLCAndmlzaWJsZScpO1xuXG4gIC8qXG4gICAqIFJlc2V0IGljb24gYW5pbWF0aW9uc1xuICAgKi9cbiAgdmFyICRzdWNjZXNzSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLXN1Y2Nlc3MnKTtcbiAgcmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLCAnYW5pbWF0ZScpO1xuICByZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24ucXVlcnlTZWxlY3RvcignLnNhLXRpcCcpLCAnYW5pbWF0ZVN1Y2Nlc3NUaXAnKTtcbiAgcmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1sb25nJyksICdhbmltYXRlU3VjY2Vzc0xvbmcnKTtcblxuICB2YXIgJGVycm9ySWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLWVycm9yJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckljb24sICdhbmltYXRlRXJyb3JJY29uJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckljb24ucXVlcnlTZWxlY3RvcignLnNhLXgtbWFyaycpLCAnYW5pbWF0ZVhNYXJrJyk7XG5cbiAgdmFyICR3YXJuaW5nSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLXdhcm5pbmcnKTtcbiAgcmVtb3ZlQ2xhc3MoJHdhcm5pbmdJY29uLCAncHVsc2VXYXJuaW5nJyk7XG4gIHJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtYm9keScpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG4gIHJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcblxuICAvLyBSZXNldCBjdXN0b20gY2xhc3MgKGRlbGF5IHNvIHRoYXQgVUkgY2hhbmdlcyBhcmVuJ3QgdmlzaWJsZSlcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VzdG9tQ2xhc3MgPSBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJyk7XG4gICAgcmVtb3ZlQ2xhc3MobW9kYWwsIGN1c3RvbUNsYXNzKTtcbiAgfSwgMzAwKTtcblxuICAvLyBNYWtlIHBhZ2Ugc2Nyb2xsYWJsZSBhZ2FpblxuICByZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcblxuICAvLyBSZXNldCB0aGUgcGFnZSB0byBpdHMgcHJldmlvdXMgc3RhdGVcbiAgd2luZG93Lm9ua2V5ZG93biA9IHByZXZpb3VzV2luZG93S2V5RG93bjtcbiAgaWYgKHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQpIHtcbiAgICB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbiAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gIGNsZWFyVGltZW91dChtb2RhbC50aW1lb3V0KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLypcbiAqIFZhbGlkYXRpb24gb2YgdGhlIGlucHV0IGZpZWxkIGlzIGRvbmUgYnkgdXNlclxuICogSWYgc29tZXRoaW5nIGlzIHdyb25nID0+IGNhbGwgc2hvd0lucHV0RXJyb3Igd2l0aCBlcnJvck1lc3NhZ2VcbiAqL1xuc3dlZXRBbGVydC5zaG93SW5wdXRFcnJvciA9IHN3YWwuc2hvd0lucHV0RXJyb3IgPSBmdW5jdGlvbihlcnJvck1lc3NhZ2UpIHtcbiAgdmFyIG1vZGFsID0gZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICBhZGRDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtZXJyb3ItY29udGFpbmVyJyk7XG4gIGFkZENsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcblxuICAkZXJyb3JDb250YWluZXIucXVlcnlTZWxlY3RvcigncCcpLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucygpO1xuICB9LCAxKTtcblxuICBtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG59O1xuXG5cbi8qXG4gKiBSZXNldCBpbnB1dCBlcnJvciBET00gZWxlbWVudHNcbiAqL1xuc3dlZXRBbGVydC5yZXNldElucHV0RXJyb3IgPSBzd2FsLnJlc2V0SW5wdXRFcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vIElmIHByZXNzIGVudGVyID0+IGlnbm9yZVxuICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgcmVtb3ZlQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1lcnJvci1jb250YWluZXInKTtcbiAgcmVtb3ZlQ2xhc3MoJGVycm9yQ29udGFpbmVyLCAnc2hvdycpO1xufTtcblxuLypcbiAqIERpc2FibGUgY29uZmlybSBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAqL1xuc3dlZXRBbGVydC5kaXNhYmxlQnV0dG9ucyA9IHN3YWwuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB2YXIgJGNvbmZpcm1CdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29uZmlybScpO1xuICB2YXIgJGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgJGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAkY2FuY2VsQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qXG4gKiBFbmFibGUgY29uZmlybSBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAqL1xuc3dlZXRBbGVydC5lbmFibGVCdXR0b25zID0gc3dhbC5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICRjYW5jZWxCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBUaGUgJ2hhbmRsZS1jbGljaycgbW9kdWxlIHJlcXVpcmVzXG4gIC8vIHRoYXQgJ3N3ZWV0QWxlcnQnIHdhcyBzZXQgYXMgZ2xvYmFsLlxuICB3aW5kb3cuc3dlZXRBbGVydCA9IHdpbmRvdy5zd2FsID0gc3dlZXRBbGVydDtcbn0gZWxzZSB7XG4gIGxvZ1N0cignU3dlZXRBbGVydCBpcyBhIGZyb250ZW5kIG1vZHVsZSEnKTtcbn1cbiIsInZhciBkZWZhdWx0UGFyYW1zID0ge1xuICB0aXRsZTogJycsXG4gIHRleHQ6ICcnLFxuICB0eXBlOiBudWxsLFxuICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXG4gIHNob3dDb25maXJtQnV0dG9uOiB0cnVlLFxuICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgY2xvc2VPbkNvbmZpcm06IHRydWUsXG4gIGNsb3NlT25DYW5jZWw6IHRydWUsXG4gIGNvbmZpcm1CdXR0b25UZXh0OiAnT0snLFxuICBjb25maXJtQnV0dG9uQ29sb3I6ICcjOENENEY1JyxcbiAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbCcsXG4gIGltYWdlVXJsOiBudWxsLFxuICBpbWFnZVNpemU6IG51bGwsXG4gIHRpbWVyOiBudWxsLFxuICBjdXN0b21DbGFzczogJycsXG4gIGh0bWw6IGZhbHNlLFxuICBhbmltYXRpb246IHRydWUsXG4gIGFsbG93RXNjYXBlS2V5OiB0cnVlLFxuICBpbnB1dFR5cGU6ICd0ZXh0JyxcbiAgaW5wdXRQbGFjZWhvbGRlcjogJycsXG4gIGlucHV0VmFsdWU6ICcnLFxuICBzaG93TG9hZGVyT25Db25maXJtOiBmYWxzZSxcbiAgcm9vdEVsZW1lbnQ6IGRvY3VtZW50LmJvZHlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRQYXJhbXM7XG4iLCJpbXBvcnQgeyBjb2xvckx1bWluYW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TW9kYWwgfSBmcm9tICcuL2hhbmRsZS1zd2FsLWRvbSc7XG5pbXBvcnQgeyBoYXNDbGFzcywgaXNEZXNjZW5kYW50IH0gZnJvbSAnLi9oYW5kbGUtZG9tJztcblxuXG4vKlxuICogVXNlciBjbGlja2VkIG9uIFwiQ29uZmlybVwiL1wiT0tcIiBvciBcIkNhbmNlbFwiXG4gKi9cbnZhciBoYW5kbGVCdXR0b24gPSBmdW5jdGlvbihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICB2YXIgdGFyZ2V0ZWRDb25maXJtID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdjb25maXJtJykgIT09IC0xO1xuICB2YXIgdGFyZ2V0ZWRPdmVybGF5ID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdzd2VldC1vdmVybGF5JykgIT09IC0xO1xuICB2YXIgbW9kYWxJc1Zpc2libGUgID0gaGFzQ2xhc3MobW9kYWwsICd2aXNpYmxlJyk7XG4gIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSAocGFyYW1zLmRvbmVGdW5jdGlvbiAmJiBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nKSA9PT0gJ3RydWUnKTtcblxuICAvLyBTaW5jZSB0aGUgdXNlciBjYW4gY2hhbmdlIHRoZSBiYWNrZ3JvdW5kLWNvbG9yIG9mIHRoZSBjb25maXJtIGJ1dHRvbiBwcm9ncmFtbWF0aWNhbGx5LFxuICAvLyB3ZSBtdXN0IGNhbGN1bGF0ZSB3aGF0IHRoZSBjb2xvciBzaG91bGQgYmUgb24gaG92ZXIvYWN0aXZlXG4gIHZhciBub3JtYWxDb2xvciwgaG92ZXJDb2xvciwgYWN0aXZlQ29sb3I7XG4gIGlmICh0YXJnZXRlZENvbmZpcm0gJiYgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIG5vcm1hbENvbG9yICA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG4gICAgaG92ZXJDb2xvciAgID0gY29sb3JMdW1pbmFuY2Uobm9ybWFsQ29sb3IsIC0wLjA0KTtcbiAgICBhY3RpdmVDb2xvciAgPSBjb2xvckx1bWluYW5jZShub3JtYWxDb2xvciwgLTAuMTQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGhvdmVyQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3Iobm9ybWFsQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGFjdGl2ZUNvbG9yKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoaG92ZXJDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgIGxldCAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICAgICBsZXQgJGNhbmNlbEJ1dHRvbiAgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG5cbiAgICAgIGlmICh0YXJnZXRlZENvbmZpcm0pIHtcbiAgICAgICAgJGNhbmNlbEJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkY29uZmlybUJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgIGxldCBjbGlja2VkT25Nb2RhbCA9IChtb2RhbCA9PT0gdGFyZ2V0KTtcbiAgICAgIGxldCBjbGlja2VkT25Nb2RhbENoaWxkID0gaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpO1xuXG4gICAgICAvLyBJZ25vcmUgY2xpY2sgb3V0c2lkZSBpZiBhbGxvd091dHNpZGVDbGljayBpcyBmYWxzZVxuICAgICAgaWYgKCFjbGlja2VkT25Nb2RhbCAmJiAhY2xpY2tlZE9uTW9kYWxDaGlsZCAmJiBtb2RhbElzVmlzaWJsZSAmJiAhcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIGRvbmVGdW5jdGlvbkV4aXN0cyAmJiBtb2RhbElzVmlzaWJsZSkge1xuICAgICAgICBoYW5kbGVDb25maXJtKG1vZGFsLCBwYXJhbXMpO1xuICAgICAgfSBlbHNlIGlmIChkb25lRnVuY3Rpb25FeGlzdHMgJiYgbW9kYWxJc1Zpc2libGUgfHwgdGFyZ2V0ZWRPdmVybGF5KSB7XG4gICAgICAgIGhhbmRsZUNhbmNlbChtb2RhbCwgcGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpICYmIHRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLypcbiAqICBVc2VyIGNsaWNrZWQgb24gXCJDb25maXJtXCIvXCJPS1wiXG4gKi9cbnZhciBoYW5kbGVDb25maXJtID0gZnVuY3Rpb24obW9kYWwsIHBhcmFtcykge1xuICB2YXIgY2FsbGJhY2tWYWx1ZSA9IHRydWU7XG5cbiAgaWYgKGhhc0NsYXNzKG1vZGFsLCAnc2hvdy1pbnB1dCcpKSB7XG4gICAgY2FsbGJhY2tWYWx1ZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cbiAgICBpZiAoIWNhbGxiYWNrVmFsdWUpIHtcbiAgICAgIGNhbGxiYWNrVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBwYXJhbXMuZG9uZUZ1bmN0aW9uKGNhbGxiYWNrVmFsdWUpO1xuXG4gIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcbiAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gIH1cbiAgLy8gRGlzYWJsZSBjYW5jZWwgYW5kIGNvbmZpcm0gYnV0dG9uIGlmIHRoZSBwYXJhbWV0ZXIgaXMgdHJ1ZVxuICBpZiAocGFyYW1zLnNob3dMb2FkZXJPbkNvbmZpcm0pIHtcbiAgICBzd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zKCk7XG4gIH1cbn07XG5cbi8qXG4gKiAgVXNlciBjbGlja2VkIG9uIFwiQ2FuY2VsXCJcbiAqL1xudmFyIGhhbmRsZUNhbmNlbCA9IGZ1bmN0aW9uKG1vZGFsLCBwYXJhbXMpIHtcbiAgLy8gQ2hlY2sgaWYgY2FsbGJhY2sgZnVuY3Rpb24gZXhwZWN0cyBhIHBhcmFtZXRlciAodG8gdHJhY2sgY2FuY2VsIGFjdGlvbnMpXG4gIHZhciBmdW5jdGlvbkFzU3RyID0gU3RyaW5nKHBhcmFtcy5kb25lRnVuY3Rpb24pLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gIHZhciBmdW5jdGlvbkhhbmRsZXNDYW5jZWwgPSBmdW5jdGlvbkFzU3RyLnN1YnN0cmluZygwLCA5KSA9PT0gJ2Z1bmN0aW9uKCcgJiYgZnVuY3Rpb25Bc1N0ci5zdWJzdHJpbmcoOSwgMTApICE9PSAnKSc7XG5cbiAgaWYgKGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCkge1xuICAgIHBhcmFtcy5kb25lRnVuY3Rpb24oZmFsc2UpO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5jbG9zZU9uQ2FuY2VsKSB7XG4gICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaGFuZGxlQnV0dG9uLFxuICBoYW5kbGVDb25maXJtLFxuICBoYW5kbGVDYW5jZWxcbn07XG4iLCJ2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyAnICsgY2xhc3NOYW1lICsgJyAnKS50ZXN0KCcgJyArIGVsZW0uY2xhc3NOYW1lICsgJyAnKTtcbn07XG5cbnZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICBpZiAoIWhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkpIHtcbiAgICBlbGVtLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICB2YXIgbmV3Q2xhc3MgPSAnICcgKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKC9bXFx0XFxyXFxuXS9nLCAnICcpICsgJyAnO1xuICBpZiAoaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSkge1xuICAgIHdoaWxlIChuZXdDbGFzcy5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPj0gMCkge1xuICAgICAgbmV3Q2xhc3MgPSBuZXdDbGFzcy5yZXBsYWNlKCcgJyArIGNsYXNzTmFtZSArICcgJywgJyAnKTtcbiAgICB9XG4gICAgZWxlbS5jbGFzc05hbWUgPSBuZXdDbGFzcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIH1cbn07XG5cbnZhciBlc2NhcGVIdG1sID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuICByZXR1cm4gZGl2LmlubmVySFRNTDtcbn07XG5cbnZhciBfc2hvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG52YXIgc2hvdyA9IGZ1bmN0aW9uKGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9zaG93KGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX3Nob3coZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgX2hpZGUgPSBmdW5jdGlvbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG52YXIgaGlkZSA9IGZ1bmN0aW9uKGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9oaWRlKGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX2hpZGUoZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgaXNEZXNjZW5kYW50ID0gZnVuY3Rpb24ocGFyZW50LCBjaGlsZCkge1xuICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGdldFRvcE1hcmdpbiA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgZWxlbS5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIHZhciBoZWlnaHQgPSBlbGVtLmNsaWVudEhlaWdodCxcbiAgICAgIHBhZGRpbmc7XG4gIGlmICh0eXBlb2YgZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBJRSA4XG4gICAgcGFkZGluZyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKSwgMTApO1xuICB9IGVsc2Uge1xuICAgIHBhZGRpbmcgPSBwYXJzZUludChlbGVtLmN1cnJlbnRTdHlsZS5wYWRkaW5nKTtcbiAgfVxuXG4gIGVsZW0uc3R5bGUubGVmdCA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJldHVybiAoJy0nICsgcGFyc2VJbnQoKGhlaWdodCArIHBhZGRpbmcpIC8gMikgKyAncHgnKTtcbn07XG5cbnZhciBmYWRlSW4gPSBmdW5jdGlvbihlbGVtLCBpbnRlcnZhbCkge1xuICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICBlbGVtLnN0eWxlLm9wYWNpdHkgPSArZWxlbS5zdHlsZS5vcGFjaXR5ICsgKG5ldyBEYXRlKCkgLSBsYXN0KSAvIDEwMDtcbiAgICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgICAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPCAxKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGljaywgaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGljaygpO1xuICB9XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vZmFsbGJhY2sgSUU4XG59O1xuXG52YXIgZmFkZU91dCA9IGZ1bmN0aW9uKGVsZW0sIGludGVydmFsKSB7XG4gIGludGVydmFsID0gaW50ZXJ2YWwgfHwgMTY7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9IDE7XG4gIHZhciBsYXN0ID0gK25ldyBEYXRlKCk7XG4gIHZhciB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gK2VsZW0uc3R5bGUub3BhY2l0eSAtIChuZXcgRGF0ZSgpIC0gbGFzdCkgLyAxMDA7XG4gICAgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KHRpY2ssIGludGVydmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfTtcbiAgdGljaygpO1xufTtcblxudmFyIGZpcmVDbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgLy8gVGFrZW4gZnJvbSBodHRwOi8vd3d3Lm5vbm9idHJ1c2l2ZS5jb20vMjAxMS8xMS8yOS9wcm9ncmFtYXRpY2FsbHktZmlyZS1jcm9zc2Jyb3dzZXItY2xpY2stZXZlbnQtd2l0aC1qYXZhc2NyaXB0L1xuICAvLyBUaGVuIGZpeGVkIGZvciB0b2RheSdzIENocm9tZSBicm93c2VyLlxuICBpZiAodHlwZW9mIE1vdXNlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVcC10by1kYXRlIGFwcHJvYWNoXG4gICAgdmFyIG1ldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7XG4gICAgICB2aWV3OiB3aW5kb3csXG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQobWV2dCk7XG4gIH0gZWxzZSBpZiAoIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICkge1xuICAgIC8vIEZhbGxiYWNrXG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgIGV2dC5pbml0RXZlbnQoJ2NsaWNrJywgZmFsc2UsIGZhbHNlKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgIG5vZGUuZmlyZUV2ZW50KCdvbmNsaWNrJykgO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlLm9uY2xpY2sgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgbm9kZS5vbmNsaWNrKCk7XG4gIH1cbn07XG5cbnZhciBzdG9wRXZlbnRQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgLy8gSW4gcGFydGljdWxhciwgbWFrZSBzdXJlIHRoZSBzcGFjZSBiYXIgZG9lc24ndCBzY3JvbGwgdGhlIG1haW4gd2luZG93LlxuICBpZiAodHlwZW9mIGUuc3RvcFByb3BhZ2F0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0gZWxzZSBpZiAod2luZG93LmV2ZW50ICYmIHdpbmRvdy5ldmVudC5oYXNPd25Qcm9wZXJ0eSgnY2FuY2VsQnViYmxlJykpIHtcbiAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IHsgXG4gIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIFxuICBlc2NhcGVIdG1sLCBcbiAgX3Nob3csIHNob3csIF9oaWRlLCBoaWRlLCBcbiAgaXNEZXNjZW5kYW50LCBcbiAgZ2V0VG9wTWFyZ2luLFxuICBmYWRlSW4sIGZhZGVPdXQsXG4gIGZpcmVDbGljayxcbiAgc3RvcEV2ZW50UHJvcGFnYXRpb25cbn07XG4iLCJpbXBvcnQgeyBzdG9wRXZlbnRQcm9wYWdhdGlvbiwgZmlyZUNsaWNrIH0gZnJvbSAnLi9oYW5kbGUtZG9tJztcbmltcG9ydCB7IHNldEZvY3VzU3R5bGUgfSBmcm9tICcuL2hhbmRsZS1zd2FsLWRvbSc7XG5cblxudmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICB2YXIgJG9rQnV0dG9uICAgICA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuICB2YXIgJG1vZGFsQnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvblt0YWJpbmRleF0nKTtcblxuXG4gIGlmIChbOSwgMTMsIDMyLCAyN10uaW5kZXhPZihrZXlDb2RlKSA9PT0gLTEpIHtcbiAgICAvLyBEb24ndCBkbyB3b3JrIG9uIGtleXMgd2UgZG9uJ3QgY2FyZSBhYm91dC5cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJHRhcmdldEVsZW1lbnQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgdmFyIGJ0bkluZGV4ID0gLTE7IC8vIEZpbmQgdGhlIGJ1dHRvbiAtIG5vdGUsIHRoaXMgaXMgYSBub2RlbGlzdCwgbm90IGFuIGFycmF5LlxuICBmb3IgKHZhciBpID0gMDsgaSA8ICRtb2RhbEJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoJHRhcmdldEVsZW1lbnQgPT09ICRtb2RhbEJ1dHRvbnNbaV0pIHtcbiAgICAgIGJ0bkluZGV4ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXlDb2RlID09PSA5KSB7XG4gICAgLy8gVEFCXG4gICAgaWYgKGJ0bkluZGV4ID09PSAtMSkge1xuICAgICAgLy8gTm8gYnV0dG9uIGZvY3VzZWQuIEp1bXAgdG8gdGhlIGNvbmZpcm0gYnV0dG9uLlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEN5Y2xlIHRvIHRoZSBuZXh0IGJ1dHRvblxuICAgICAgaWYgKGJ0bkluZGV4ID09PSAkbW9kYWxCdXR0b25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zW2J0bkluZGV4ICsgMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEV2ZW50UHJvcGFnYXRpb24oZSk7XG4gICAgJHRhcmdldEVsZW1lbnQuZm9jdXMoKTtcblxuICAgIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICBzZXRGb2N1c1N0eWxlKCR0YXJnZXRFbGVtZW50LCBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgICBpZiAoJHRhcmdldEVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICAgICAgJG9rQnV0dG9uLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidG5JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gRU5URVIvU1BBQ0UgY2xpY2tlZCBvdXRzaWRlIG9mIGEgYnV0dG9uLlxuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDI3ICYmIHBhcmFtcy5hbGxvd0VzY2FwZUtleSA9PT0gdHJ1ZSkge1xuICAgICAgJHRhcmdldEVsZW1lbnQgPSAkY2FuY2VsQnV0dG9uO1xuICAgICAgZmlyZUNsaWNrKCR0YXJnZXRFbGVtZW50LCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2sgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVLZXlEb3duO1xuIiwiaW1wb3J0IHsgaGV4VG9SZ2IgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHJlbW92ZUNsYXNzLCBnZXRUb3BNYXJnaW4sIGZhZGVJbiwgc2hvdywgYWRkQ2xhc3MgfSBmcm9tICcuL2hhbmRsZS1kb20nO1xuaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9kZWZhdWx0LXBhcmFtcyc7XG5cbnZhciBtb2RhbENsYXNzICAgPSAnLnN3ZWV0LWFsZXJ0JztcbnZhciBvdmVybGF5Q2xhc3MgPSAnLnN3ZWV0LW92ZXJsYXknO1xuXG4vKlxuICogQWRkIG1vZGFsICsgb3ZlcmxheSB0byBET01cbiAqL1xuaW1wb3J0IGluamVjdGVkSFRNTCBmcm9tICcuL2luamVjdGVkLWh0bWwnO1xuXG52YXIgc3dlZXRBbGVydEluaXRpYWxpemUgPSBmdW5jdGlvbihyb290RWxlbWVudCkge1xuICBpZiAocm9vdEVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCAhZG9jdW1lbnQuY29udGFpbnMocm9vdEVsZW1lbnQpKSB7XG4gICAgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgdmFyICRtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW9kYWxDbGFzcyk7XG5cbiAgaWYgKCEkbW9kYWwpIHtcbiAgICBhcHBlbmRBbGVydFRvRWxlbWVudChyb290RWxlbWVudCk7XG4gIH1cbiAgZWxzZSBpZiAoJG1vZGFsLnBhcmVudEVsZW1lbnQgIT09IHJvb3RFbGVtZW50KSB7XG4gICAgJG1vZGFsLnJlbW92ZSgpO1xuICAgIGFwcGVuZEFsZXJ0VG9FbGVtZW50KHJvb3RFbGVtZW50KTtcbiAgfVxufTtcblxudmFyIGFwcGVuZEFsZXJ0VG9FbGVtZW50ID0gZnVuY3Rpb24ocm9vdEVsZW1lbnQpIHtcbiAgdmFyIHN3ZWV0V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzd2VldFdyYXAuaW5uZXJIVE1MID0gaW5qZWN0ZWRIVE1MO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gIHdoaWxlIChzd2VldFdyYXAuZmlyc3RDaGlsZCkge1xuICAgIHJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHN3ZWV0V3JhcC5maXJzdENoaWxkKTtcbiAgfVxufTtcbi8qXG4gKiBHZXQgRE9NIGVsZW1lbnQgb2YgbW9kYWxcbiAqL1xudmFyIGdldE1vZGFsID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsQ2xhc3MpO1xuXG4gIGlmICghJG1vZGFsKSB7XG4gICAgc3dlZXRBbGVydEluaXRpYWxpemUoZG9jdW1lbnQuYm9keSk7XG4gICAgcmV0dXJuIGdldE1vZGFsKCk7XG4gIH1cblxuICByZXR1cm4gJG1vZGFsO1xufTtcblxuLypcbiAqIEdldCBET00gZWxlbWVudCBvZiBpbnB1dCAoaW4gbW9kYWwpXG4gKi9cbnZhciBnZXRJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgaWYgKCRtb2RhbCkge1xuICAgIHJldHVybiAkbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgfVxufTtcblxuLypcbiAqIEdldCBET00gZWxlbWVudCBvZiBvdmVybGF5XG4gKi9cbnZhciBnZXRPdmVybGF5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG92ZXJsYXlDbGFzcyk7XG59O1xuXG4vKlxuICogQWRkIGJveC1zaGFkb3cgc3R5bGUgdG8gYnV0dG9uIChkZXBlbmRpbmcgb24gaXRzIGNob3NlbiBiZy1jb2xvcilcbiAqL1xudmFyIHNldEZvY3VzU3R5bGUgPSBmdW5jdGlvbigkYnV0dG9uLCBiZ0NvbG9yKSB7XG4gIHZhciByZ2JDb2xvciA9IGhleFRvUmdiKGJnQ29sb3IpO1xuICAkYnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMnB4IHJnYmEoJyArIHJnYkNvbG9yICsgJywgMC44KSwgaW5zZXQgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSknO1xufTtcblxuLypcbiAqIEFuaW1hdGlvbiB3aGVuIG9wZW5pbmcgbW9kYWxcbiAqL1xudmFyIG9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICBmYWRlSW4oZ2V0T3ZlcmxheSgpLCAxMCk7XG4gIHNob3coJG1vZGFsKTtcbiAgYWRkQ2xhc3MoJG1vZGFsLCAnc2hvd1N3ZWV0QWxlcnQnKTtcbiAgcmVtb3ZlQ2xhc3MoJG1vZGFsLCAnaGlkZVN3ZWV0QWxlcnQnKTtcblxuICB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgdmFyICRva0J1dHRvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29uZmlybScpO1xuICAkb2tCdXR0b24uZm9jdXMoKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBhZGRDbGFzcygkbW9kYWwsICd2aXNpYmxlJyk7XG4gIH0sIDUwMCk7XG5cbiAgdmFyIHRpbWVyID0gJG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicpO1xuXG4gIGlmICh0aW1lciAhPT0gJ251bGwnICYmIHRpbWVyICE9PSAnJykge1xuICAgIHZhciB0aW1lckNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgJG1vZGFsLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRvbmVGdW5jdGlvbkV4aXN0cyA9ICgodGltZXJDYWxsYmFjayB8fCBudWxsKSAmJiAkbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWhhcy1kb25lLWZ1bmN0aW9uJykgPT09ICd0cnVlJyk7XG4gICAgICBpZiAoZG9uZUZ1bmN0aW9uRXhpc3RzKSB7XG4gICAgICAgIHRpbWVyQ2FsbGJhY2sobnVsbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0sIHRpbWVyKTtcbiAgfVxufTtcblxuLypcbiAqIFJlc2V0IHRoZSBzdHlsaW5nIG9mIHRoZSBpbnB1dFxuICogKGZvciBleGFtcGxlIGlmIGVycm9ycyBoYXZlIGJlZW4gc2hvd24pXG4gKi9cbnZhciByZXNldElucHV0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB2YXIgJGlucHV0ID0gZ2V0SW5wdXQoKTtcblxuICByZW1vdmVDbGFzcygkbW9kYWwsICdzaG93LWlucHV0Jyk7XG4gICRpbnB1dC52YWx1ZSA9IGRlZmF1bHRQYXJhbXMuaW5wdXRWYWx1ZTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIGRlZmF1bHRQYXJhbXMuaW5wdXRUeXBlKTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBkZWZhdWx0UGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpO1xuXG4gIHJlc2V0SW5wdXRFcnJvcigpO1xufTtcblxuXG52YXIgcmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgLy8gSWYgcHJlc3MgZW50ZXIgPT4gaWdub3JlXG4gIGlmIChldmVudCAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuXG4gIHZhciAkZXJyb3JJY29uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG5cbi8qXG4gKiBTZXQgXCJtYXJnaW4tdG9wXCItcHJvcGVydHkgb24gbW9kYWwgYmFzZWQgb24gaXRzIGNvbXB1dGVkIGhlaWdodFxuICovXG52YXIgZml4VmVydGljYWxQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgJG1vZGFsLnN0eWxlLm1hcmdpblRvcCA9IGdldFRvcE1hcmdpbihnZXRNb2RhbCgpKTtcbn07XG5cblxuZXhwb3J0IHtcbiAgc3dlZXRBbGVydEluaXRpYWxpemUsXG4gIGdldE1vZGFsLFxuICBnZXRPdmVybGF5LFxuICBnZXRJbnB1dCxcbiAgc2V0Rm9jdXNTdHlsZSxcbiAgb3Blbk1vZGFsLFxuICByZXNldElucHV0LFxuICByZXNldElucHV0RXJyb3IsXG4gIGZpeFZlcnRpY2FsUG9zaXRpb25cbn07XG4iLCJ2YXIgaW5qZWN0ZWRIVE1MID0gXG5cbiAgLy8gRGFyayBvdmVybGF5XG4gIGA8ZGl2IGNsYXNzPVwic3dlZXQtb3ZlcmxheVwiIHRhYkluZGV4PVwiLTFcIj48L2Rpdj5gICtcblxuICAvLyBNb2RhbFxuICBgPGRpdiBjbGFzcz1cInN3ZWV0LWFsZXJ0XCI+YCArXG5cbiAgICAvLyBFcnJvciBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWVycm9yXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLXgtbWFya1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNhLWxpbmUgc2EtbGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PmAgK1xuXG4gICAgLy8gV2FybmluZyBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLXdhcm5pbmdcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2EtYm9keVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2EtZG90XCI+PC9zcGFuPlxuICAgIDwvZGl2PmAgK1xuXG4gICAgLy8gSW5mbyBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWluZm9cIj48L2Rpdj5gICtcblxuICAgIC8vIFN1Y2Nlc3MgaWNvblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS1zdWNjZXNzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLWxpbmUgc2EtdGlwXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLWxvbmdcIj48L3NwYW4+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzYS1wbGFjZWhvbGRlclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNhLWZpeFwiPjwvZGl2PlxuICAgIDwvZGl2PmAgK1xuXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWN1c3RvbVwiPjwvZGl2PmAgK1xuXG4gICAgLy8gVGl0bGUsIHRleHQgYW5kIGlucHV0XG4gICAgYDxoMj5UaXRsZTwvaDI+XG4gICAgPHA+VGV4dDwvcD5cbiAgICA8ZmllbGRzZXQ+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB0YWJJbmRleD1cIjNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNhLWlucHV0LWVycm9yXCI+PC9kaXY+XG4gICAgPC9maWVsZHNldD5gICtcblxuICAgIC8vIElucHV0IGVycm9yc1xuICAgIGA8ZGl2IGNsYXNzPVwic2EtZXJyb3ItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPiE8L2Rpdj5cbiAgICAgIDxwPk5vdCB2YWxpZCE8L3A+XG4gICAgPC9kaXY+YCArXG5cbiAgICAvLyBDYW5jZWwgYW5kIGNvbmZpcm0gYnV0dG9uc1xuICAgIGA8ZGl2IGNsYXNzPVwic2EtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiIHRhYkluZGV4PVwiMlwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cInNhLWNvbmZpcm0tYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29uZmlybVwiIHRhYkluZGV4PVwiMVwiPk9LPC9idXR0b24+YCArIFxuXG4gICAgICAgIC8vIExvYWRpbmcgYW5pbWF0aW9uXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwibGEtYmFsbC1mYWxsXCI+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCArXG5cbiAgLy8gRW5kIG9mIG1vZGFsXG4gIGA8L2Rpdj5gO1xuXG5leHBvcnQgZGVmYXVsdCBpbmplY3RlZEhUTUw7XG4iLCJ2YXIgYWxlcnRUeXBlcyA9IFsnZXJyb3InLCAnd2FybmluZycsICdpbmZvJywgJ3N1Y2Nlc3MnLCAnaW5wdXQnLCAncHJvbXB0J107XG5cbmltcG9ydCB7XG4gIGlzSUU4XG59IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNb2RhbCxcbiAgZ2V0SW5wdXQsXG4gIHNldEZvY3VzU3R5bGVcbn0gZnJvbSAnLi9oYW5kbGUtc3dhbC1kb20nO1xuXG5pbXBvcnQge1xuICBoYXNDbGFzcywgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzLFxuICBlc2NhcGVIdG1sLFxuICBfc2hvdywgc2hvdywgX2hpZGUsIGhpZGVcbn0gZnJvbSAnLi9oYW5kbGUtZG9tJztcblxuXG4vKlxuICogU2V0IHR5cGUsIHRleHQgYW5kIGFjdGlvbnMgb24gbW9kYWxcbiAqL1xudmFyIHNldFBhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgdmFyIG1vZGFsID0gZ2V0TW9kYWwocGFyYW1zLnJvb3RFbGVtZW50KTtcblxuICB2YXIgJHRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignaDInKTtcbiAgdmFyICR0ZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcigncCcpO1xuICB2YXIgJGNhbmNlbEJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgdmFyICRjb25maXJtQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcblxuICAvKlxuICAgKiBUaXRsZVxuICAgKi9cbiAgJHRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRpdGxlIDogZXNjYXBlSHRtbChwYXJhbXMudGl0bGUpLnNwbGl0KCdcXG4nKS5qb2luKCc8YnI+Jyk7XG5cbiAgLypcbiAgICogVGV4dFxuICAgKi9cbiAgJHRleHQuaW5uZXJIVE1MID0gcGFyYW1zLmh0bWwgPyBwYXJhbXMudGV4dCA6IGVzY2FwZUh0bWwocGFyYW1zLnRleHQgfHwgJycpLnNwbGl0KCdcXG4nKS5qb2luKCc8YnI+Jyk7XG4gIGlmIChwYXJhbXMudGV4dCkgc2hvdygkdGV4dCk7XG5cbiAgLypcbiAgICogQ3VzdG9tIGNsYXNzXG4gICAqL1xuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzKSB7XG4gICAgYWRkQ2xhc3MobW9kYWwsIHBhcmFtcy5jdXN0b21DbGFzcyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycsIHBhcmFtcy5jdXN0b21DbGFzcyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRmluZCBwcmV2aW91c2x5IHNldCBjbGFzc2VzIGFuZCByZW1vdmUgdGhlbVxuICAgIGxldCBjdXN0b21DbGFzcyA9IG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnKTtcbiAgICByZW1vdmVDbGFzcyhtb2RhbCwgY3VzdG9tQ2xhc3MpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnLCAnJyk7XG4gIH1cblxuICAvKlxuICAgKiBJY29uXG4gICAqL1xuICBoaWRlKG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zYS1pY29uJykpO1xuXG4gIGlmIChwYXJhbXMudHlwZSAmJiAhaXNJRTgoKSkge1xuXG4gICAgbGV0IHZhbGlkVHlwZSA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGVydFR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09IGFsZXJ0VHlwZXNbaV0pIHtcbiAgICAgICAgdmFsaWRUeXBlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIGxvZ1N0cignVW5rbm93biBhbGVydCB0eXBlOiAnICsgcGFyYW1zLnR5cGUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCB0eXBlc1dpdGhJY29ucyA9IFsnc3VjY2VzcycsICdlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nXTtcbiAgICBsZXQgJGljb247XG5cbiAgICBpZiAodHlwZXNXaXRoSWNvbnMuaW5kZXhPZihwYXJhbXMudHlwZSkgIT09IC0xKSB7XG4gICAgICAkaWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLicgKyAnc2EtJyArIHBhcmFtcy50eXBlKTtcbiAgICAgIHNob3coJGljb24pO1xuICAgIH1cblxuICAgIGxldCAkaW5wdXQgPSBnZXRJbnB1dCgpO1xuXG4gICAgLy8gQW5pbWF0ZSBpY29uXG4gICAgc3dpdGNoIChwYXJhbXMudHlwZSkge1xuXG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgYWRkQ2xhc3MoJGljb24sICdhbmltYXRlJyk7XG4gICAgICAgIGFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gICAgICAgIGFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1sb25nJyksICdhbmltYXRlU3VjY2Vzc0xvbmcnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgYWRkQ2xhc3MoJGljb24sICdhbmltYXRlRXJyb3JJY29uJyk7XG4gICAgICAgIGFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS14LW1hcmsnKSwgJ2FuaW1hdGVYTWFyaycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIGFkZENsYXNzKCRpY29uLCAncHVsc2VXYXJuaW5nJyk7XG4gICAgICAgIGFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1ib2R5JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgICAgICAgYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWRvdCcpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICBjYXNlICdwcm9tcHQnOlxuICAgICAgICAkaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgcGFyYW1zLmlucHV0VHlwZSk7XG4gICAgICAgICRpbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlO1xuICAgICAgICAkaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKTtcbiAgICAgICAgYWRkQ2xhc3MobW9kYWwsICdzaG93LWlucHV0Jyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN3YWwucmVzZXRJbnB1dEVycm9yKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ3VzdG9tIGltYWdlXG4gICAqL1xuICBpZiAocGFyYW1zLmltYWdlVXJsKSB7XG4gICAgbGV0ICRjdXN0b21JY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2EtY3VzdG9tJyk7XG5cbiAgICAkY3VzdG9tSWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBwYXJhbXMuaW1hZ2VVcmwgKyAnKSc7XG4gICAgc2hvdygkY3VzdG9tSWNvbik7XG5cbiAgICBsZXQgX2ltZ1dpZHRoID0gODA7XG4gICAgbGV0IF9pbWdIZWlnaHQgPSA4MDtcblxuICAgIGlmIChwYXJhbXMuaW1hZ2VTaXplKSB7XG4gICAgICBsZXQgZGltZW5zaW9ucyA9IHBhcmFtcy5pbWFnZVNpemUudG9TdHJpbmcoKS5zcGxpdCgneCcpO1xuICAgICAgbGV0IGltZ1dpZHRoID0gZGltZW5zaW9uc1swXTtcbiAgICAgIGxldCBpbWdIZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuXG4gICAgICBpZiAoIWltZ1dpZHRoIHx8ICFpbWdIZWlnaHQpIHtcbiAgICAgICAgbG9nU3RyKCdQYXJhbWV0ZXIgaW1hZ2VTaXplIGV4cGVjdHMgdmFsdWUgd2l0aCBmb3JtYXQgV0lEVEh4SEVJR0hULCBnb3QgJyArIHBhcmFtcy5pbWFnZVNpemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2ltZ1dpZHRoID0gaW1nV2lkdGg7XG4gICAgICAgIF9pbWdIZWlnaHQgPSBpbWdIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJGN1c3RvbUljb24uc2V0QXR0cmlidXRlKCdzdHlsZScsICRjdXN0b21JY29uLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSArICd3aWR0aDonICsgX2ltZ1dpZHRoICsgJ3B4OyBoZWlnaHQ6JyArIF9pbWdIZWlnaHQgKyAncHgnKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNob3cgY2FuY2VsIGJ1dHRvbj9cbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtY2FuY2VsLWJ1dHRvbicsIHBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uKTtcbiAgaWYgKHBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uKSB7XG4gICAgJGNhbmNlbEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gIH0gZWxzZSB7XG4gICAgaGlkZSgkY2FuY2VsQnRuKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNob3cgY29uZmlybSBidXR0b24/XG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWNvbmZpcm0tYnV0dG9uJywgcGFyYW1zLnNob3dDb25maXJtQnV0dG9uKTtcbiAgaWYgKHBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbikge1xuICAgICRjb25maXJtQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgfSBlbHNlIHtcbiAgICBoaWRlKCRjb25maXJtQnRuKTtcbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSB0ZXh0IG9uIGNhbmNlbC9jb25maXJtIGJ1dHRvbnNcbiAgICovXG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCkge1xuICAgICRjYW5jZWxCdG4uaW5uZXJIVE1MID0gZXNjYXBlSHRtbChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uVGV4dCkge1xuICAgICRjb25maXJtQnRuLmlubmVySFRNTCA9IGVzY2FwZUh0bWwocGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0KTtcbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSBjb2xvciBvbiBjb25maXJtIGJ1dHRvblxuICAgKi9cbiAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAvLyBTZXQgY29uZmlybSBidXR0b24gdG8gc2VsZWN0ZWQgYmFja2dyb3VuZCBjb2xvclxuICAgICRjb25maXJtQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG5cbiAgICAvLyBTZXQgdGhlIGNvbmZpcm0gYnV0dG9uIGNvbG9yIHRvIHRoZSBsb2FkaW5nIHJpbmdcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBwYXJhbXMuY29uZmlybUxvYWRpbmdCdXR0b25Db2xvcjtcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5ib3JkZXJSaWdodENvbG9yID0gcGFyYW1zLmNvbmZpcm1Mb2FkaW5nQnV0dG9uQ29sb3I7XG5cbiAgICAvLyBTZXQgYm94LXNoYWRvdyB0byBkZWZhdWx0IGZvY3VzZWQgYnV0dG9uXG4gICAgc2V0Rm9jdXNTdHlsZSgkY29uZmlybUJ0biwgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcik7XG4gIH1cblxuICAvKlxuICAgKiBBbGxvdyBvdXRzaWRlIGNsaWNrXG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWxsb3ctb3V0c2lkZS1jbGljaycsIHBhcmFtcy5hbGxvd091dHNpZGVDbGljayk7XG5cbiAgLypcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHZhciBoYXNEb25lRnVuY3Rpb24gPSBwYXJhbXMuZG9uZUZ1bmN0aW9uID8gdHJ1ZSA6IGZhbHNlO1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nLCBoYXNEb25lRnVuY3Rpb24pO1xuXG4gIC8qXG4gICAqIEFuaW1hdGlvblxuICAgKi9cbiAgaWYgKCFwYXJhbXMuYW5pbWF0aW9uKSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdub25lJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcy5hbmltYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsIHBhcmFtcy5hbmltYXRpb24pOyAvLyBDdXN0b20gYW5pbWF0aW9uXG4gIH0gZWxzZSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdwb3AnKTtcbiAgfVxuXG4gIC8qXG4gICAqIFRpbWVyXG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZXInLCBwYXJhbXMudGltZXIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0UGFyYW1ldGVycztcbiIsIi8qXG4gKiBBbGxvdyB1c2VyIHRvIHBhc3MgdGhlaXIgb3duIHBhcmFtc1xuICovXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24oYSwgYikge1xuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vKlxuICogQ29udmVydCBIRVggY29kZXMgdG8gUkdCIHZhbHVlcyAoIzAwMDAwMCAtPiByZ2IoMCwwLDApKVxuICovXG52YXIgaGV4VG9SZ2IgPSBmdW5jdGlvbihoZXgpIHtcbiAgdmFyIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICByZXR1cm4gcmVzdWx0ID8gcGFyc2VJbnQocmVzdWx0WzFdLCAxNikgKyAnLCAnICsgcGFyc2VJbnQocmVzdWx0WzJdLCAxNikgKyAnLCAnICsgcGFyc2VJbnQocmVzdWx0WzNdLCAxNikgOiBudWxsO1xufTtcblxuLypcbiAqIENoZWNrIGlmIHRoZSB1c2VyIGlzIHVzaW5nIEludGVybmV0IEV4cGxvcmVyIDggKGZvciBmYWxsYmFja3MpXG4gKi9cbnZhciBpc0lFOCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHdpbmRvdy5hdHRhY2hFdmVudCAmJiAhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpO1xufTtcblxuLypcbiAqIElFIGNvbXBhdGlibGUgbG9nZ2luZyBmb3IgZGV2ZWxvcGVyc1xuICovXG52YXIgbG9nU3RyID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgIC8vIElFLi4uXG4gICAgd2luZG93LmNvbnNvbGUubG9nKCdTd2VldEFsZXJ0OiAnICsgc3RyaW5nKTtcbiAgfVxufTtcblxuLypcbiAqIFNldCBob3ZlciwgYWN0aXZlIGFuZCBmb2N1cy1zdGF0ZXMgZm9yIGJ1dHRvbnMgXG4gKiAoc291cmNlOiBodHRwOi8vd3d3LnNpdGVwb2ludC5jb20vamF2YXNjcmlwdC1nZW5lcmF0ZS1saWdodGVyLWRhcmtlci1jb2xvcilcbiAqL1xudmFyIGNvbG9yTHVtaW5hbmNlID0gZnVuY3Rpb24oaGV4LCBsdW0pIHtcbiAgLy8gVmFsaWRhdGUgaGV4IHN0cmluZ1xuICBoZXggPSBTdHJpbmcoaGV4KS5yZXBsYWNlKC9bXjAtOWEtZl0vZ2ksICcnKTtcbiAgaWYgKGhleC5sZW5ndGggPCA2KSB7XG4gICAgaGV4ID0gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xuICB9XG4gIGx1bSA9IGx1bSB8fCAwO1xuXG4gIC8vIENvbnZlcnQgdG8gZGVjaW1hbCBhbmQgY2hhbmdlIGx1bWlub3NpdHlcbiAgdmFyIHJnYiA9ICcjJztcbiAgdmFyIGM7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBjID0gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCBjICsgYyAqIGx1bSksIDI1NSkpLnRvU3RyaW5nKDE2KTtcbiAgICByZ2IgKz0gKCcwMCcgKyBjKS5zdWJzdHIoYy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHJnYjtcbn07XG5cblxuZXhwb3J0IHtcbiAgZXh0ZW5kLFxuICBoZXhUb1JnYixcbiAgaXNJRTgsXG4gIGxvZ1N0cixcbiAgY29sb3JMdW1pbmFuY2Vcbn07XG4iXX0=

  
  /*
   * Use SweetAlert with RequireJS
   */
  
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return sweetAlert;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = sweetAlert;
  }

})(window, document);
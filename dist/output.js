;(function(window, document, undefined) {
"use strict";
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

/*
 * jQuery-like functions for manipulating the DOM
 */

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require('./dom-manipulation');

/*
 * Handy utilities
 */

var _extend$hexToRgb$isIE8$logStr$colorLuminance = require('./utils');

/*
 *  Handle sweetAlert's DOM elements
 */

var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require('./swal-dom');

// Default values

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

var _setParameters = require('./set-params');

var _setParameters2 = _interopRequireWildcard(_setParameters);

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

sweetAlert = swal = function () {
  var customizations = arguments[0];

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

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
      return _defaultParams2['default'][key];
    }
  }

  if (customizations === undefined) {
    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({title:"Hello", text: "Just testing", type: "info"});
    case 'object':
      if (customizations.title === undefined) {
        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
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
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Function to call when clicking on cancel/OK
      params.doneFunction = arguments[1] || null;

      break;

    default:
      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  _setParameters2['default'](params);
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal();

  // Modal interactions
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  // Mouse interactions
  var onButtonEvent = function onButtonEvent(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var targetedConfirm = target.className.indexOf('confirm') !== -1;
    var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
    var modalIsVisible = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.hasClass(modal, 'visible');
    var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

    switch (e.type) {
      case 'mouseover':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = _extend$hexToRgb$isIE8$logStr$colorLuminance.colorLuminance(params.confirmButtonColor, -0.04);
        }
        break;
      case 'mouseout':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = params.confirmButtonColor;
        }
        break;
      case 'mousedown':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = _extend$hexToRgb$isIE8$logStr$colorLuminance.colorLuminance(params.confirmButtonColor, -0.14);
        }
        break;
      case 'mouseup':
        if (targetedConfirm && params.confirmButtonColor) {
          target.style.backgroundColor = _extend$hexToRgb$isIE8$logStr$colorLuminance.colorLuminance(params.confirmButtonColor, -0.04);
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
        var clickedOnModalChild = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.isDescendant(modal, target);

        if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
          break;
        }

        if (targetedConfirm && doneFunctionExists && modalIsVisible) {
          // Clicked "confirm"
          handleConfirm();
        } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
          // Clicked "cancel"
          handleCancel();
        } else if (_hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.isDescendant(modal, target) && target.tagName === 'BUTTON') {
          sweetAlert.close();
        }
        break;
    }
  };

  function handleConfirm() {
    var callbackValue = true;

    if (_hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.hasClass(modal, 'show-input')) {
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

  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

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

      _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.stopEventPropagation(e);
      $targetElement.focus();

      if (params.confirmButtonColor) {
        _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.setFocusStyle($targetElement, params.confirmButtonColor);
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
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fireClick($targetElement, e);
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
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

  // Reset icon animations

  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

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
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

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

  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
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

},{"./default-params":2,"./dom-manipulation":3,"./set-params":5,"./swal-dom":6,"./utils":7}],2:[function(require,module,exports){
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
  confirmButtonColor: '#AEDEF4',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: ''
};

exports['default'] = defaultParams;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
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
  if (typeof getComputedStyle !== 'undefined') {
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
    var tick = (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    });
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = (function (_tick2) {
    function tick() {
      return _tick2.apply(this, arguments);
    }

    tick.toString = function () {
      return _tick2.toString();
    };

    return tick;
  })(function () {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  });
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

},{}],4:[function(require,module,exports){
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
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <button class=\"confirm\" tabIndex=\"1\">OK</button>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isIE8 = require('./utils');

var _getModal$getInput$setFocusStyle = require('./swal-dom');

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require('./dom-manipulation');

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = _getModal$getInput$setFocusStyle.getModal();

  var $title = modal.querySelector('h2'),
      $text = modal.querySelector('p'),
      $cancelBtn = modal.querySelector('button.cancel'),
      $confirmBtn = modal.querySelector('button.confirm');

  // Title
  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

  // Text
  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');

  if (params.text) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);
  }

  //Custom Class
  if (params.customClass) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  // Icon
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));
  if (params.type && !_isIE8.isIE8()) {
    var validType = false;
    for (var i = 0; i < alertTypes.length; i++) {
      if (params.type === alertTypes[i]) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      logStr('Unknown alert type: ' + params.type);
      return false;
    }

    var typesWithIcons = ['success', 'error', 'warning', 'info'];
    var $icon;

    if (typesWithIcons.indexOf(params.type) !== -1) {
      $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
      _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
    }

    var $input = _getModal$getInput$setFocusStyle.getInput();

    // Animate icon
    switch (params.type) {

      case 'success':
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
        break;

      case 'error':
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
        break;

      case 'warning':
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
        break;

      case 'input':
      case 'prompt':
        $input.setAttribute('type', params.inputType);
        $input.setAttribute('placeholder', params.inputPlaceholder);
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
        setTimeout(function () {
          $input.focus();
          $input.addEventListener('keyup', swal.resetInputError);
        }, 400);
        break;
    }
  }

  // Custom image
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

    var _imgWidth = 80,
        _imgHeight = 80;

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

  // Show cancel button?
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
  }

  // Show confirm button?
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
  }

  // Edit text on cancel and confirm buttons
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
  }

  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set box-shadow to default focused button
    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  // Allow outside click?
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  // Done-function
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  if (!params.animation) {
    // No animation
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  // Close timer
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];

},{"./dom-manipulation":3,"./swal-dom":6,"./utils":7}],6:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hexToRgb = require('./utils');

var _removeClass$getTopMargin$fadeIn$show$addClass = require('./dom-manipulation');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHTML = require('./injected-html');

var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHTML2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = (function (_getModal) {
  function getModal() {
    return _getModal.apply(this, arguments);
  }

  getModal.toString = function () {
    return _getModal.toString();
  };

  return getModal;
})(function () {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
});

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
  var rgbColor = _hexToRgb.hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal() {
  var $modal = getModal();
  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    $modal.timeout = setTimeout(function () {
      swal.close();
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

  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
  $input.value = '';
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
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
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

},{"./default-params":2,"./dom-manipulation":3,"./injected-html":4,"./utils":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Allow user to pass their own params
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9saWIvc3dlZXQtYWxlcnQuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9saWIvZGVmYXVsdC1wYXJhbXMuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9saWIvZG9tLW1hbmlwdWxhdGlvbi5qcyIsIi9Vc2Vycy9UcmlzdGFuL2Rldi9Td2VldEFsZXJ0L2xpYi9pbmplY3RlZC1odG1sLmpzIiwiL1VzZXJzL1RyaXN0YW4vZGV2L1N3ZWV0QWxlcnQvbGliL3NldC1wYXJhbXMuanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9saWIvc3dhbC1kb20uanMiLCIvVXNlcnMvVHJpc3Rhbi9kZXYvU3dlZXRBbGVydC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDSUEsWUFBWSxDQUFDOzs7Ozs7OztzSkFjTixvQkFBb0I7Ozs7OzsyREFXcEIsU0FBUzs7Ozs7O3dIQWNULFlBQVk7Ozs7NkJBSU8sa0JBQWtCOzs7OzZCQUNsQixjQUFjOzs7Ozs7OztBQU14QyxJQUFJLHFCQUFxQixDQUFDO0FBQzFCLElBQUksaUJBQWlCLENBQUM7Ozs7O0FBTXRCLElBQUksVUFBVSxFQUFFLElBQUksQ0FBQzs7QUFFckIsVUFBVSxHQUFHLElBQUksR0FBRyxZQUFXO0FBQzdCLE1BQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEMsMElBeERVLFFBQVEsQ0F3RFQsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLDRHQTFCQSxVQUFVLEVBMEJFLENBQUM7Ozs7Ozs7QUFPYixXQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtBQUM5QixRQUFJLElBQUksR0FBRyxjQUFjLENB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QUFDdEIsS0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdkMsS0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLE9BQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ3BDOztBQUVELFNBQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQzs7UUFJQSxNQUFNLEdBQU4sTUFBTTtRQUNOLFFBQVEsR0FBUixRQUFRO1FBQ1IsS0FBSyxHQUFMLEtBQUs7UUFDTCxNQUFNLEdBQU4sTUFBTTtRQUNOLGNBQWMsR0FBZCxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFN3ZWV0QWxlcnRcbi8vIDIwMTQtMjAxNSAoYykgLSBUcmlzdGFuIEVkd2FyZHNcbi8vIGdpdGh1Yi5jb20vdDR0NS9zd2VldGFsZXJ0XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKlxuICogalF1ZXJ5LWxpa2UgZnVuY3Rpb25zIGZvciBtYW5pcHVsYXRpbmcgdGhlIERPTVxuICovXG5pbXBvcnQge1xuICBoYXNDbGFzcywgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzLCBcbiAgZXNjYXBlSHRtbCwgXG4gIF9zaG93LCBzaG93LCBfaGlkZSwgaGlkZSwgXG4gIGlzRGVzY2VuZGFudCwgXG4gIGdldFRvcE1hcmdpbixcbiAgZmFkZUluLCBmYWRlT3V0LFxuICBmaXJlQ2xpY2ssXG4gIHN0b3BFdmVudFByb3BhZ2F0aW9uXG59IGZyb20gJy4vZG9tLW1hbmlwdWxhdGlvbic7XG5cbi8qXG4gKiBIYW5keSB1dGlsaXRpZXNcbiAqL1xuaW1wb3J0IHtcbiAgZXh0ZW5kLFxuICBoZXhUb1JnYixcbiAgaXNJRTgsXG4gIGxvZ1N0cixcbiAgY29sb3JMdW1pbmFuY2Vcbn0gZnJvbSAnLi91dGlscyc7XG5cbi8qXG4gKiAgSGFuZGxlIHN3ZWV0QWxlcnQncyBET00gZWxlbWVudHNcbiAqL1xuaW1wb3J0IHtcbiAgc3dlZXRBbGVydEluaXRpYWxpemUsXG4gIGdldE1vZGFsLFxuICBnZXRPdmVybGF5LFxuICBnZXRJbnB1dCxcbiAgc2V0Rm9jdXNTdHlsZSxcbiAgb3Blbk1vZGFsLFxuICByZXNldElucHV0LFxuICBmaXhWZXJ0aWNhbFBvc2l0aW9uXG59IGZyb20gJy4vc3dhbC1kb20nO1xuXG5cbi8vIERlZmF1bHQgdmFsdWVzXG5pbXBvcnQgZGVmYXVsdFBhcmFtcyBmcm9tICcuL2RlZmF1bHQtcGFyYW1zJztcbmltcG9ydCBzZXRQYXJhbWV0ZXJzIGZyb20gJy4vc2V0LXBhcmFtcyc7XG5cbi8qXG4gKiBSZW1lbWJlciBzdGF0ZSBpbiBjYXNlcyB3aGVyZSBvcGVuaW5nIGFuZCBoYW5kbGluZyBhIG1vZGFsIHdpbGwgZmlkZGxlIHdpdGggaXQuXG4gKiAoV2UgYWxzbyB1c2Ugd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudCBhcyBhIGdsb2JhbCB2YXJpYWJsZSlcbiAqL1xudmFyIHByZXZpb3VzV2luZG93S2V5RG93bjtcbnZhciBsYXN0Rm9jdXNlZEJ1dHRvbjtcblxuXG4vKlxuICogR2xvYmFsIHN3ZWV0QWxlcnQgZnVuY3Rpb25cbiAqL1xudmFyIHN3ZWV0QWxlcnQsIHN3YWw7XG5cbnN3ZWV0QWxlcnQgPSBzd2FsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjdXN0b21pemF0aW9ucyA9IGFyZ3VtZW50c1swXTtcblxuICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcbiAgcmVzZXRJbnB1dCgpO1xuXG4gIC8qXG4gICAqIFVzZSBhcmd1bWVudCBpZiBkZWZpbmVkIG9yIGRlZmF1bHQgdmFsdWUgZnJvbSBwYXJhbXMgb2JqZWN0IG90aGVyd2lzZS5cbiAgICogU3VwcG9ydHMgdGhlIGNhc2Ugd2hlcmUgYSBkZWZhdWx0IHZhbHVlIGlzIGJvb2xlYW4gdHJ1ZSBhbmQgc2hvdWxkIGJlXG4gICAqIG92ZXJyaWRkZW4gYnkgYSBjb3JyZXNwb25kaW5nIGV4cGxpY2l0IGFyZ3VtZW50IHdoaWNoIGlzIGJvb2xlYW4gZmFsc2UuXG4gICAqL1xuICBmdW5jdGlvbiBhcmd1bWVudE9yRGVmYXVsdChrZXkpIHtcbiAgICB2YXIgYXJncyA9IGN1c3RvbWl6YXRpb25zO1xuXG4gICAgaWYgKHR5cGVvZiBhcmdzW2tleV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gYXJnc1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFBhcmFtc1trZXldO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjdXN0b21pemF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nU3RyKCdTd2VldEFsZXJ0IGV4cGVjdHMgYXQgbGVhc3QgMSBhdHRyaWJ1dGUhJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9IGV4dGVuZCh7fSwgZGVmYXVsdFBhcmFtcyk7XG5cbiAgc3dpdGNoICh0eXBlb2YgY3VzdG9taXphdGlvbnMpIHtcblxuICAgIC8vIEV4OiBzd2FsKFwiSGVsbG9cIiwgXCJKdXN0IHRlc3RpbmdcIiwgXCJpbmZvXCIpO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBwYXJhbXMudGl0bGUgPSBjdXN0b21pemF0aW9ucztcbiAgICAgIHBhcmFtcy50ZXh0ICA9IGFyZ3VtZW50c1sxXSB8fCAnJztcbiAgICAgIHBhcmFtcy50eXBlICA9IGFyZ3VtZW50c1syXSB8fCAnJztcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRXg6IHN3YWwoe3RpdGxlOlwiSGVsbG9cIiwgdGV4dDogXCJKdXN0IHRlc3RpbmdcIiwgdHlwZTogXCJpbmZvXCJ9KTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKGN1c3RvbWl6YXRpb25zLnRpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nU3RyKCdNaXNzaW5nIFwidGl0bGVcIiBhcmd1bWVudCEnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMudGl0bGUgPSBjdXN0b21pemF0aW9ucy50aXRsZTtcblxuICAgICAgdmFyIGF2YWlsYWJsZUN1c3RvbXMgPSBbJ3RleHQnLCAndHlwZScsICdjdXN0b21DbGFzcycsICdhbGxvd091dHNpZGVDbGljaycsICdzaG93Q29uZmlybUJ1dHRvbicsICdzaG93Q2FuY2VsQnV0dG9uJywgJ2Nsb3NlT25Db25maXJtJywgJ2Nsb3NlT25DYW5jZWwnLCAndGltZXInLCAnY29uZmlybUJ1dHRvbkNvbG9yJywgJ2NhbmNlbEJ1dHRvblRleHQnLCAnaW1hZ2VVcmwnLCAnaW1hZ2VTaXplJywgJ2h0bWwnLCAnYW5pbWF0aW9uJywgJ2FsbG93RXNjYXBlS2V5JywgJ2lucHV0VHlwZScsICdpbnB1dFBsYWNlaG9sZGVyJ107XG5cbiAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgdG8ganVzdCB1c2UgLmZvckVhY2ggaGVyZSwgYnV0IElFOC4uLiA6KFxuICAgICAgdmFyIG51bUN1c3RvbXMgPSBhdmFpbGFibGVDdXN0b21zLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGN1c3RvbUluZGV4ID0gMDsgY3VzdG9tSW5kZXggPCBudW1DdXN0b21zOyBjdXN0b21JbmRleCsrKSB7XG4gICAgICAgIHZhciBjdXN0b21OYW1lID0gYXZhaWxhYmxlQ3VzdG9tc1tjdXN0b21JbmRleF07XG4gICAgICAgIHBhcmFtc1tjdXN0b21OYW1lXSA9IGFyZ3VtZW50T3JEZWZhdWx0KGN1c3RvbU5hbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBTaG93IFwiQ29uZmlybVwiIGluc3RlYWQgb2YgXCJPS1wiIGlmIGNhbmNlbCBidXR0b24gaXMgdmlzaWJsZVxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gcGFyYW1zLnNob3dDYW5jZWxCdXR0b24gPyAnQ29uZmlybScgOiBkZWZhdWx0UGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0O1xuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gYXJndW1lbnRPckRlZmF1bHQoJ2NvbmZpcm1CdXR0b25UZXh0Jyk7XG5cbiAgICAgIC8vIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBjbGlja2luZyBvbiBjYW5jZWwvT0tcbiAgICAgIHBhcmFtcy5kb25lRnVuY3Rpb24gPSBhcmd1bWVudHNbMV0gfHwgbnVsbDtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgbG9nU3RyKCdVbmV4cGVjdGVkIHR5cGUgb2YgYXJndW1lbnQhIEV4cGVjdGVkIFwic3RyaW5nXCIgb3IgXCJvYmplY3RcIiwgZ290ICcgKyB0eXBlb2YgY3VzdG9taXphdGlvbnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICBzZXRQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gIGZpeFZlcnRpY2FsUG9zaXRpb24oKTtcbiAgb3Blbk1vZGFsKCk7XG5cbiAgLy8gTW9kYWwgaW50ZXJhY3Rpb25zXG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgLy8gTW91c2UgaW50ZXJhY3Rpb25zXG4gIHZhciBvbkJ1dHRvbkV2ZW50ID0gZnVuY3Rpb24gb25CdXR0b25FdmVudChldmVudCkge1xuICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgdmFyIHRhcmdldGVkQ29uZmlybSA9IHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignY29uZmlybScpICE9PSAtMTtcbiAgICB2YXIgdGFyZ2V0ZWRPdmVybGF5ID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdzd2VldC1vdmVybGF5JykgIT09IC0xO1xuICAgIHZhciBtb2RhbElzVmlzaWJsZSA9IGhhc0NsYXNzKG1vZGFsLCAndmlzaWJsZScpO1xuICAgIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSBwYXJhbXMuZG9uZUZ1bmN0aW9uICYmIG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicpID09PSAndHJ1ZSc7XG5cbiAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yTHVtaW5hbmNlKHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IsIC0wLjA0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAgICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JMdW1pbmFuY2UocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvciwgLTAuMTQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgIGlmICh0YXJnZXRlZENvbmZpcm0gJiYgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgICAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvckx1bWluYW5jZShwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yLCAtMC4wNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgIHZhciAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICAgICAgIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuXG4gICAgICAgIGlmICh0YXJnZXRlZENvbmZpcm0pIHtcbiAgICAgICAgICAkY2FuY2VsQnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY29uZmlybUJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGljayc6XG4gICAgICAgIHZhciBjbGlja2VkT25Nb2RhbCA9IG1vZGFsID09PSB0YXJnZXQ7XG4gICAgICAgIHZhciBjbGlja2VkT25Nb2RhbENoaWxkID0gaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpO1xuXG4gICAgICAgIGlmICghY2xpY2tlZE9uTW9kYWwgJiYgIWNsaWNrZWRPbk1vZGFsQ2hpbGQgJiYgbW9kYWxJc1Zpc2libGUgJiYgIXBhcmFtcy5hbGxvd091dHNpZGVDbGljaykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBkb25lRnVuY3Rpb25FeGlzdHMgJiYgbW9kYWxJc1Zpc2libGUpIHtcbiAgICAgICAgICAvLyBDbGlja2VkIFwiY29uZmlybVwiXG4gICAgICAgICAgaGFuZGxlQ29uZmlybSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvbmVGdW5jdGlvbkV4aXN0cyAmJiBtb2RhbElzVmlzaWJsZSB8fCB0YXJnZXRlZE92ZXJsYXkpIHtcbiAgICAgICAgICAvLyBDbGlja2VkIFwiY2FuY2VsXCJcbiAgICAgICAgICBoYW5kbGVDYW5jZWwoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Rlc2NlbmRhbnQobW9kYWwsIHRhcmdldCkgJiYgdGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICAgICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBoYW5kbGVDb25maXJtKCkge1xuICAgIHZhciBjYWxsYmFja1ZhbHVlID0gdHJ1ZTtcblxuICAgIGlmIChoYXNDbGFzcyhtb2RhbCwgJ3Nob3ctaW5wdXQnKSkge1xuICAgICAgY2FsbGJhY2tWYWx1ZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cbiAgICAgIGlmICghY2FsbGJhY2tWYWx1ZSkge1xuICAgICAgICBjYWxsYmFja1ZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFyYW1zLmRvbmVGdW5jdGlvbihjYWxsYmFja1ZhbHVlKTtcblxuICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcbiAgICAgIHN3ZWV0QWxlcnQuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDYW5jZWwoKSB7XG4gICAgLy8gQ2hlY2sgaWYgY2FsbGJhY2sgZnVuY3Rpb24gZXhwZWN0cyBhIHBhcmFtZXRlciAodG8gdHJhY2sgY2FuY2VsIGFjdGlvbnMpXG4gICAgdmFyIGZ1bmN0aW9uQXNTdHIgPSBTdHJpbmcocGFyYW1zLmRvbmVGdW5jdGlvbikucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICB2YXIgZnVuY3Rpb25IYW5kbGVzQ2FuY2VsID0gZnVuY3Rpb25Bc1N0ci5zdWJzdHJpbmcoMCwgOSkgPT09ICdmdW5jdGlvbignICYmIGZ1bmN0aW9uQXNTdHIuc3Vic3RyaW5nKDksIDEwKSAhPT0gJyknO1xuXG4gICAgaWYgKGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCkge1xuICAgICAgcGFyYW1zLmRvbmVGdW5jdGlvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5jbG9zZU9uQ2FuY2VsKSB7XG4gICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdmFyICRidXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgJGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAkYnV0dG9uc1tpXS5vbmNsaWNrID0gb25CdXR0b25FdmVudDtcbiAgICAkYnV0dG9uc1tpXS5vbm1vdXNlb3ZlciA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgJGJ1dHRvbnNbaV0ub25tb3VzZW91dCA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgJGJ1dHRvbnNbaV0ub25tb3VzZWRvd24gPSBvbkJ1dHRvbkV2ZW50O1xuICAgICRidXR0b25zW2ldLm9ubW91c2V1cCA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgJGJ1dHRvbnNbaV0ub25mb2N1cyA9IG9uQnV0dG9uRXZlbnQ7XG4gIH1cblxuICBnZXRPdmVybGF5KCkub25jbGljayA9IG9uQnV0dG9uRXZlbnQ7XG5cbiAgLy8gS2V5Ym9hcmQgaW50ZXJhY3Rpb25zXG4gIHZhciAkb2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29uZmlybScpLFxuICAgICAgJGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKSxcbiAgICAgICRtb2RhbEJ1dHRvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25bdGFiaW5kZXhdJyk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cbiAgICBpZiAoWzksIDEzLCAzMiwgMjddLmluZGV4T2Yoa2V5Q29kZSkgPT09IC0xKSB7XG4gICAgICAvLyBEb24ndCBkbyB3b3JrIG9uIGtleXMgd2UgZG9uJ3QgY2FyZSBhYm91dC5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgJHRhcmdldEVsZW1lbnQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgICB2YXIgYnRuSW5kZXggPSAtMTsgLy8gRmluZCB0aGUgYnV0dG9uIC0gbm90ZSwgdGhpcyBpcyBhIG5vZGVsaXN0LCBub3QgYW4gYXJyYXkuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkbW9kYWxCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoJHRhcmdldEVsZW1lbnQgPT09ICRtb2RhbEJ1dHRvbnNbaV0pIHtcbiAgICAgICAgYnRuSW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gOSkge1xuICAgICAgLy8gVEFCXG4gICAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIE5vIGJ1dHRvbiBmb2N1c2VkLiBKdW1wIHRvIHRoZSBjb25maXJtIGJ1dHRvbi5cbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDeWNsZSB0byB0aGUgbmV4dCBidXR0b25cbiAgICAgICAgaWYgKGJ0bkluZGV4ID09PSAkbW9kYWxCdXR0b25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRtb2RhbEJ1dHRvbnNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zW2J0bkluZGV4ICsgMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RvcEV2ZW50UHJvcGFnYXRpb24oZSk7XG4gICAgICAkdGFyZ2V0RWxlbWVudC5mb2N1cygpO1xuXG4gICAgICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgICAgICBzZXRGb2N1c1N0eWxlKCR0YXJnZXRFbGVtZW50LCBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGlmICgkdGFyZ2V0RWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICAgICAgJG9rQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgLy8gRU5URVIvU1BBQ0UgY2xpY2tlZCBvdXRzaWRlIG9mIGEgYnV0dG9uLlxuICAgICAgICAgICR0YXJnZXRFbGVtZW50ID0gJG9rQnV0dG9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIERvIG5vdGhpbmcgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgICAgICR0YXJnZXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDI3ICYmIHBhcmFtcy5hbGxvd0VzY2FwZUtleSA9PT0gdHJ1ZSkge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRjYW5jZWxCdXR0b247XG4gICAgICAgIGZpcmVDbGljaygkdGFyZ2V0RWxlbWVudCwgZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGYWxsYmFjayAtIGxldCB0aGUgYnJvd3NlciBoYW5kbGUgaXQuXG4gICAgICAgICR0YXJnZXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByZXZpb3VzV2luZG93S2V5RG93biA9IHdpbmRvdy5vbmtleWRvd247XG5cbiAgd2luZG93Lm9ua2V5ZG93biA9IGhhbmRsZUtleURvd247XG5cbiAgd2luZG93Lm9uZm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gV2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBhd2F5IGFuZCBmb2N1c2VkIGJhY2sgZnJvbSB0aGUgd2hvbGUgd2luZG93LlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gUHV0IGluIGEgdGltZW91dCB0byBqdW1wIG91dCBvZiB0aGUgZXZlbnQgc2VxdWVuY2UuIENhbGxpbmcgZm9jdXMoKSBpbiB0aGUgZXZlbnRcbiAgICAgIC8vIHNlcXVlbmNlIGNvbmZ1c2VzIHRoaW5ncy5cbiAgICAgIGlmIChsYXN0Rm9jdXNlZEJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhc3RGb2N1c2VkQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIGxhc3RGb2N1c2VkQnV0dG9uID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9O1xufTtcblxuLypcbiAqIFNldCBkZWZhdWx0IHBhcmFtcyBmb3IgZWFjaCBwb3B1cFxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJQYXJhbXNcbiAqL1xuc3dlZXRBbGVydC5zZXREZWZhdWx0cyA9IHN3YWwuc2V0RGVmYXVsdHMgPSBmdW5jdGlvbih1c2VyUGFyYW1zKSB7XG4gIGlmICghdXNlclBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlclBhcmFtcyBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgdXNlclBhcmFtcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaGFzIHRvIGJlIGEgb2JqZWN0Jyk7XG4gIH1cblxuICBleHRlbmQoZGVmYXVsdFBhcmFtcywgdXNlclBhcmFtcyk7XG59O1xuXG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBjbG9zaW5nIG1vZGFsXG4gKi9cbnN3ZWV0QWxlcnQuY2xvc2UgPSBzd2FsLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgZmFkZU91dChnZXRPdmVybGF5KCksIDUpO1xuICBmYWRlT3V0KG1vZGFsLCA1KTtcbiAgcmVtb3ZlQ2xhc3MobW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICBhZGRDbGFzcyhtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG4gIHJlbW92ZUNsYXNzKG1vZGFsLCAndmlzaWJsZScpO1xuXG4gIC8vIFJlc2V0IGljb24gYW5pbWF0aW9uc1xuXG4gIHZhciAkc3VjY2Vzc0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1zdWNjZXNzJyk7XG4gIHJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbiwgJ2FuaW1hdGUnKTtcbiAgcmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gIHJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1lcnJvcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnYW5pbWF0ZUVycm9ySWNvbicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS14LW1hcmsnKSwgJ2FuaW1hdGVYTWFyaycpO1xuXG4gIHZhciAkd2FybmluZ0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS13YXJuaW5nJyk7XG4gIHJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbiwgJ3B1bHNlV2FybmluZycpO1xuICByZW1vdmVDbGFzcygkd2FybmluZ0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWJvZHknKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICByZW1vdmVDbGFzcygkd2FybmluZ0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWRvdCcpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG5cbiAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3N0b3Atc2Nyb2xsaW5nJyk7XG5cbiAgLy8gUmVzZXQgdGhlIHBhZ2UgdG8gaXRzIHByZXZpb3VzIHN0YXRlXG4gIHdpbmRvdy5vbmtleWRvd24gPSBwcmV2aW91c1dpbmRvd0tleURvd247XG4gIGlmICh3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG4gIGxhc3RGb2N1c2VkQnV0dG9uID0gdW5kZWZpbmVkO1xuICBjbGVhclRpbWVvdXQobW9kYWwudGltZW91dCk7XG59O1xuXG5cbi8qXG4gKiBWYWxpZGF0aW9uIG9mIHRoZSBpbnB1dCBmaWVsZCBpcyBkb25lIGJ5IHVzZXJcbiAqIElmIHNvbWV0aGluZyBpcyB3cm9uZyA9PiBjYWxsIHNob3dJbnB1dEVycm9yIHdpdGggZXJyb3JNZXNzYWdlXG4gKi9cbnN3ZWV0QWxlcnQuc2hvd0lucHV0RXJyb3IgPSBzd2FsLnNob3dJbnB1dEVycm9yID0gZnVuY3Rpb24oZXJyb3JNZXNzYWdlKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgYWRkQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBhZGRDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG5cbiAgJGVycm9yQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG5cbiAgbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xufTtcblxuXG4vKlxuICogUmVzZXQgaW5wdXQgZXJyb3IgRE9NIGVsZW1lbnRzXG4gKi9cbnN3ZWV0QWxlcnQucmVzZXRJbnB1dEVycm9yID0gc3dhbC5yZXNldElucHV0RXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuICAvLyBJZiBwcmVzcyBlbnRlciA9PiBpZ25vcmVcbiAgaWYgKGV2ZW50ICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWlucHV0LWVycm9yJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckljb24sICdzaG93Jyk7XG5cbiAgdmFyICRlcnJvckNvbnRhaW5lciA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtZXJyb3ItY29udGFpbmVyJyk7XG4gIHJlbW92ZUNsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcbn07XG5cblxuXG4vKlxuICogVXNlIFN3ZWV0QWxlcnQgd2l0aCBSZXF1aXJlSlNcbiAqL1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzd2VldEFsZXJ0O1xuICB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LnN3ZWV0QWxlcnQgPSB3aW5kb3cuc3dhbCA9IHN3ZWV0QWxlcnQ7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gc3dlZXRBbGVydDtcbn1cbiIsInZhciBkZWZhdWx0UGFyYW1zID0ge1xuICB0aXRsZTogJycsXG4gIHRleHQ6ICcnLFxuICB0eXBlOiBudWxsLFxuICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXG4gIHNob3dDb25maXJtQnV0dG9uOiB0cnVlLFxuICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgY2xvc2VPbkNvbmZpcm06IHRydWUsXG4gIGNsb3NlT25DYW5jZWw6IHRydWUsXG4gIGNvbmZpcm1CdXR0b25UZXh0OiAnT0snLFxuICBjb25maXJtQnV0dG9uQ29sb3I6ICcjQUVERUY0JyxcbiAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbCcsXG4gIGltYWdlVXJsOiBudWxsLFxuICBpbWFnZVNpemU6IG51bGwsXG4gIHRpbWVyOiBudWxsLFxuICBjdXN0b21DbGFzczogJycsXG4gIGh0bWw6IGZhbHNlLFxuICBhbmltYXRpb246IHRydWUsXG4gIGFsbG93RXNjYXBlS2V5OiB0cnVlLFxuICBpbnB1dFR5cGU6ICd0ZXh0JyxcbiAgaW5wdXRQbGFjZWhvbGRlcjogJydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRQYXJhbXM7IiwidmFyIGhhc0NsYXNzID0gZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCcgJyArIGNsYXNzTmFtZSArICcgJykudGVzdCgnICcgKyBlbGVtLmNsYXNzTmFtZSArICcgJyk7XG59O1xuXG52YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgaWYgKCFoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpKSB7XG4gICAgZWxlbS5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG52YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgdmFyIG5ld0NsYXNzID0gJyAnICsgZWxlbS5jbGFzc05hbWUucmVwbGFjZSgvW1xcdFxcclxcbl0vZywgJyAnKSArICcgJztcbiAgaWYgKGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkpIHtcbiAgICB3aGlsZSAobmV3Q2xhc3MuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID49IDApIHtcbiAgICAgIG5ld0NsYXNzID0gbmV3Q2xhc3MucmVwbGFjZSgnICcgKyBjbGFzc05hbWUgKyAnICcsICcgJyk7XG4gICAgfVxuICAgIGVsZW0uY2xhc3NOYW1lID0gbmV3Q2xhc3MucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB9XG59O1xuXG52YXIgZXNjYXBlSHRtbCA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG59O1xuXG52YXIgX3Nob3cgPSBmdW5jdGlvbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxudmFyIHNob3cgPSBmdW5jdGlvbihlbGVtcykge1xuICBpZiAoZWxlbXMgJiYgIWVsZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiBfc2hvdyhlbGVtcyk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7ICsraSkge1xuICAgIF9zaG93KGVsZW1zW2ldKTtcbiAgfVxufTtcblxudmFyIF9oaWRlID0gZnVuY3Rpb24oZWxlbSkge1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxudmFyIGhpZGUgPSBmdW5jdGlvbihlbGVtcykge1xuICBpZiAoZWxlbXMgJiYgIWVsZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiBfaGlkZShlbGVtcyk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7ICsraSkge1xuICAgIF9oaWRlKGVsZW1zW2ldKTtcbiAgfVxufTtcblxudmFyIGlzRGVzY2VuZGFudCA9IGZ1bmN0aW9uKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIG5vZGUgPSBjaGlsZC5wYXJlbnROb2RlO1xuICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBnZXRUb3BNYXJnaW4gPSBmdW5jdGlvbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICB2YXIgaGVpZ2h0ID0gZWxlbS5jbGllbnRIZWlnaHQsXG4gICAgICBwYWRkaW5nO1xuICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09IFwidW5kZWZpbmVkXCIpIHsgLy8gSUUgOFxuICAgIHBhZGRpbmcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW0pLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJyksIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBwYWRkaW5nID0gcGFyc2VJbnQoZWxlbS5jdXJyZW50U3R5bGUucGFkZGluZyk7XG4gIH1cblxuICBlbGVtLnN0eWxlLmxlZnQgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXR1cm4gKCctJyArIHBhcnNlSW50KChoZWlnaHQgKyBwYWRkaW5nKSAvIDIpICsgJ3B4Jyk7XG59O1xuXG52YXIgZmFkZUluID0gZnVuY3Rpb24oZWxlbSwgaW50ZXJ2YWwpIHtcbiAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPCAxKSB7XG4gICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxNjtcbiAgICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdmFyIGxhc3QgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gK2VsZW0uc3R5bGUub3BhY2l0eSArIChuZXcgRGF0ZSgpIC0gbGFzdCkgLyAxMDA7XG4gICAgICBsYXN0ID0gK25ldyBEYXRlKCk7XG5cbiAgICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5IDwgMSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRpY2ssIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRpY2soKTtcbiAgfVxuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyAvL2ZhbGxiYWNrIElFOFxufTtcblxudmFyIGZhZGVPdXQgPSBmdW5jdGlvbihlbGVtLCBpbnRlcnZhbCkge1xuICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICB2YXIgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9ICtlbGVtLnN0eWxlLm9wYWNpdHkgLSAobmV3IERhdGUoKSAtIGxhc3QpIC8gMTAwO1xuICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5ID4gMCkge1xuICAgICAgc2V0VGltZW91dCh0aWNrLCBpbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH07XG4gIHRpY2soKTtcbn07XG5cbnZhciBmaXJlQ2xpY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gIC8vIFRha2VuIGZyb20gaHR0cDovL3d3dy5ub25vYnRydXNpdmUuY29tLzIwMTEvMTEvMjkvcHJvZ3JhbWF0aWNhbGx5LWZpcmUtY3Jvc3Nicm93c2VyLWNsaWNrLWV2ZW50LXdpdGgtamF2YXNjcmlwdC9cbiAgLy8gVGhlbiBmaXhlZCBmb3IgdG9kYXkncyBDaHJvbWUgYnJvd3Nlci5cbiAgaWYgKHR5cGVvZiBNb3VzZUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXAtdG8tZGF0ZSBhcHByb2FjaFxuICAgIHZhciBtZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywge1xuICAgICAgdmlldzogd2luZG93LFxuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KG1ldnQpO1xuICB9IGVsc2UgaWYgKCBkb2N1bWVudC5jcmVhdGVFdmVudCApIHtcbiAgICAvLyBGYWxsYmFja1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICBldnQuaW5pdEV2ZW50KCdjbGljaycsIGZhbHNlLCBmYWxzZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICBub2RlLmZpcmVFdmVudCgnb25jbGljaycpIDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZS5vbmNsaWNrID09PSAnZnVuY3Rpb24nICkge1xuICAgIG5vZGUub25jbGljaygpO1xuICB9XG59O1xuXG52YXIgc3RvcEV2ZW50UHJvcGFnYXRpb24gPSBmdW5jdGlvbihlKSB7XG4gIC8vIEluIHBhcnRpY3VsYXIsIG1ha2Ugc3VyZSB0aGUgc3BhY2UgYmFyIGRvZXNuJ3Qgc2Nyb2xsIHRoZSBtYWluIHdpbmRvdy5cbiAgaWYgKHR5cGVvZiBlLnN0b3BQcm9wYWdhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5ldmVudCAmJiB3aW5kb3cuZXZlbnQuaGFzT3duUHJvcGVydHkoJ2NhbmNlbEJ1YmJsZScpKSB7XG4gICAgd2luZG93LmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydCB7IFxuICBoYXNDbGFzcywgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzLCBcbiAgZXNjYXBlSHRtbCwgXG4gIF9zaG93LCBzaG93LCBfaGlkZSwgaGlkZSwgXG4gIGlzRGVzY2VuZGFudCwgXG4gIGdldFRvcE1hcmdpbixcbiAgZmFkZUluLCBmYWRlT3V0LFxuICBmaXJlQ2xpY2ssXG4gIHN0b3BFdmVudFByb3BhZ2F0aW9uXG59XG4iLCJ2YXIgaW5qZWN0ZWRIVE1MID0gXG5cbiAgLy8gRGFyayBvdmVybGF5XG4gIGA8ZGl2IGNsYXNzPVwic3dlZXQtb3ZlcmxheVwiIHRhYkluZGV4PVwiLTFcIj48L2Rpdj5gICtcblxuICAvLyBNb2RhbFxuICBgPGRpdiBjbGFzcz1cInN3ZWV0LWFsZXJ0XCI+YCArXG5cbiAgICAvLyBFcnJvciBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWVycm9yXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLXgtbWFya1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNhLWxpbmUgc2EtbGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PmAgK1xuXG4gICAgLy8gV2FybmluZyBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLXdhcm5pbmdcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2EtYm9keVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2EtZG90XCI+PC9zcGFuPlxuICAgIDwvZGl2PmAgK1xuXG4gICAgLy8gSW5mbyBpY29uXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWluZm9cIj48L2Rpdj5gICtcblxuICAgIC8vIFN1Y2Nlc3MgaWNvblxuICAgIGA8ZGl2IGNsYXNzPVwic2EtaWNvbiBzYS1zdWNjZXNzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNhLWxpbmUgc2EtdGlwXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzYS1saW5lIHNhLWxvbmdcIj48L3NwYW4+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzYS1wbGFjZWhvbGRlclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNhLWZpeFwiPjwvZGl2PlxuICAgIDwvZGl2PmAgK1xuXG4gICAgYDxkaXYgY2xhc3M9XCJzYS1pY29uIHNhLWN1c3RvbVwiPjwvZGl2PmAgK1xuXG4gICAgLy8gVGl0bGUsIHRleHQgYW5kIGlucHV0XG4gICAgYDxoMj5UaXRsZTwvaDI+XG4gICAgPHA+VGV4dDwvcD5cbiAgICA8ZmllbGRzZXQ+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB0YWJJbmRleD1cIjNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNhLWlucHV0LWVycm9yXCI+PC9kaXY+XG4gICAgPC9maWVsZHNldD5gICtcblxuICAgIC8vIElucHV0IGVycm9yc1xuICAgIGA8ZGl2IGNsYXNzPVwic2EtZXJyb3ItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPiE8L2Rpdj5cbiAgICAgIDxwPk5vdCB2YWxpZCE8L3A+XG4gICAgPC9kaXY+YCArXG5cbiAgICAvLyBDYW5jZWwgYW5kIGNvbmZpcm0gYnV0dG9uc1xuICAgIGA8ZGl2IGNsYXNzPVwic2EtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiIHRhYkluZGV4PVwiMlwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm1cIiB0YWJJbmRleD1cIjFcIj5PSzwvYnV0dG9uPlxuICAgIDwvZGl2PmAgK1xuXG4gIC8vIEVuZCBvZiBtb2RhbFxuICBgPC9kaXY+YDtcblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0ZWRIVE1MOyIsInZhciBhbGVydFR5cGVzID0gWydlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nLCAnc3VjY2VzcycsICdpbnB1dCcsICdwcm9tcHQnXTtcblxuaW1wb3J0IHtcbiAgaXNJRThcbn0gZnJvbSAnLi91dGlscyc7XG5cbmltcG9ydCB7XG4gIGdldE1vZGFsLFxuICBnZXRJbnB1dCxcbiAgc2V0Rm9jdXNTdHlsZVxufSBmcm9tICcuL3N3YWwtZG9tJztcblxuaW1wb3J0IHtcbiAgaGFzQ2xhc3MsIGFkZENsYXNzLCByZW1vdmVDbGFzcywgXG4gIGVzY2FwZUh0bWwsIFxuICBfc2hvdywgc2hvdywgX2hpZGUsIGhpZGVcbn0gZnJvbSAnLi9kb20tbWFuaXB1bGF0aW9uJztcblxuLypcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIG1vZGFsXG4gKi9cbnZhciBzZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHZhciBtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICR0aXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2gyJyksXG4gICAgICAkdGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ3AnKSxcbiAgICAgICRjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyksXG4gICAgICAkY29uZmlybUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG5cbiAgLy8gVGl0bGVcbiAgJHRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRpdGxlIDogZXNjYXBlSHRtbChwYXJhbXMudGl0bGUpLnNwbGl0KCdcXG4nKS5qb2luKCc8YnI+Jyk7XG5cbiAgLy8gVGV4dFxuICAkdGV4dC5pbm5lckhUTUwgPSBwYXJhbXMuaHRtbCA/IHBhcmFtcy50ZXh0IDogZXNjYXBlSHRtbChwYXJhbXMudGV4dCB8fCAnJykuc3BsaXQoJ1xcbicpLmpvaW4oJzxicj4nKTtcblxuICBpZiAocGFyYW1zLnRleHQpIHtcbiAgICBzaG93KCR0ZXh0KTtcbiAgfVxuXG4gIC8vQ3VzdG9tIENsYXNzXG4gIGlmIChwYXJhbXMuY3VzdG9tQ2xhc3MpIHtcbiAgICBhZGRDbGFzcyhtb2RhbCwgcGFyYW1zLmN1c3RvbUNsYXNzKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJywgcGFyYW1zLmN1c3RvbUNsYXNzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5kIHByZXZpb3VzbHkgc2V0IGNsYXNzZXMgYW5kIHJlbW92ZSB0aGVtXG4gICAgdmFyIGN1c3RvbUNsYXNzID0gbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycpO1xuICAgIHJlbW92ZUNsYXNzKG1vZGFsLCBjdXN0b21DbGFzcyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycsICcnKTtcbiAgfVxuXG4gIC8vIEljb25cbiAgaGlkZShtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2EtaWNvbicpKTtcbiAgaWYgKHBhcmFtcy50eXBlICYmICFpc0lFOCgpKSB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxlcnRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSBhbGVydFR5cGVzW2ldKSB7XG4gICAgICAgIHZhbGlkVHlwZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgbG9nU3RyKCdVbmtub3duIGFsZXJ0IHR5cGU6ICcgKyBwYXJhbXMudHlwZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVzV2l0aEljb25zID0gWydzdWNjZXNzJywgJ2Vycm9yJywgJ3dhcm5pbmcnLCAnaW5mbyddO1xuICAgIHZhciAkaWNvbjtcblxuICAgIGlmICh0eXBlc1dpdGhJY29ucy5pbmRleE9mKHBhcmFtcy50eXBlKSAhPT0gLTEpIHtcbiAgICAgICRpY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uJyArICdzYS0nICsgcGFyYW1zLnR5cGUpO1xuICAgICAgc2hvdygkaWNvbik7XG4gICAgfVxuXG4gICAgdmFyICRpbnB1dCA9IGdldElucHV0KCk7XG5cbiAgICAvLyBBbmltYXRlIGljb25cbiAgICBzd2l0Y2ggKHBhcmFtcy50eXBlKSB7XG5cbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICBhZGRDbGFzcygkaWNvbiwgJ2FuaW1hdGUnKTtcbiAgICAgICAgYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLXRpcCcpLCAnYW5pbWF0ZVN1Y2Nlc3NUaXAnKTtcbiAgICAgICAgYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWxvbmcnKSwgJ2FuaW1hdGVTdWNjZXNzTG9uZycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBhZGRDbGFzcygkaWNvbiwgJ2FuaW1hdGVFcnJvckljb24nKTtcbiAgICAgICAgYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLXgtbWFyaycpLCAnYW5pbWF0ZVhNYXJrJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgYWRkQ2xhc3MoJGljb24sICdwdWxzZVdhcm5pbmcnKTtcbiAgICAgICAgYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWJvZHknKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICAgICAgICBhZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGNhc2UgJ3Byb21wdCc6XG4gICAgICAgICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBwYXJhbXMuaW5wdXRUeXBlKTtcbiAgICAgICAgJGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcik7XG4gICAgICAgIGFkZENsYXNzKG1vZGFsLCAnc2hvdy1pbnB1dCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzd2FsLnJlc2V0SW5wdXRFcnJvcik7XG4gICAgICAgIH0sIDQwMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEN1c3RvbSBpbWFnZVxuICBpZiAocGFyYW1zLmltYWdlVXJsKSB7XG4gICAgdmFyICRjdXN0b21JY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2EtY3VzdG9tJyk7XG5cbiAgICAkY3VzdG9tSWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBwYXJhbXMuaW1hZ2VVcmwgKyAnKSc7XG4gICAgc2hvdygkY3VzdG9tSWNvbik7XG5cbiAgICB2YXIgX2ltZ1dpZHRoID0gODAsXG4gICAgICAgIF9pbWdIZWlnaHQgPSA4MDtcblxuICAgIGlmIChwYXJhbXMuaW1hZ2VTaXplKSB7XG4gICAgICB2YXIgZGltZW5zaW9ucyA9IHBhcmFtcy5pbWFnZVNpemUudG9TdHJpbmcoKS5zcGxpdCgneCcpO1xuICAgICAgdmFyIGltZ1dpZHRoID0gZGltZW5zaW9uc1swXTtcbiAgICAgIHZhciBpbWdIZWlnaHQgPSBkaW1lbnNpb25zWzFdO1xuXG4gICAgICBpZiAoIWltZ1dpZHRoIHx8ICFpbWdIZWlnaHQpIHtcbiAgICAgICAgbG9nU3RyKCdQYXJhbWV0ZXIgaW1hZ2VTaXplIGV4cGVjdHMgdmFsdWUgd2l0aCBmb3JtYXQgV0lEVEh4SEVJR0hULCBnb3QgJyArIHBhcmFtcy5pbWFnZVNpemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2ltZ1dpZHRoID0gaW1nV2lkdGg7XG4gICAgICAgIF9pbWdIZWlnaHQgPSBpbWdIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgICRjdXN0b21JY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAkY3VzdG9tSWNvbi5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgKyAnd2lkdGg6JyArIF9pbWdXaWR0aCArICdweDsgaGVpZ2h0OicgKyBfaW1nSGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICAvLyBTaG93IGNhbmNlbCBidXR0b24/XG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtY2FuY2VsLWJ1dHRvbicsIHBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uKTtcbiAgaWYgKHBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uKSB7XG4gICAgJGNhbmNlbEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gIH0gZWxzZSB7XG4gICAgaGlkZSgkY2FuY2VsQnRuKTtcbiAgfVxuXG4gIC8vIFNob3cgY29uZmlybSBidXR0b24/XG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtY29uZmlybS1idXR0b24nLCBwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24pO1xuICBpZiAocGFyYW1zLnNob3dDb25maXJtQnV0dG9uKSB7XG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoJGNvbmZpcm1CdG4pO1xuICB9XG5cbiAgLy8gRWRpdCB0ZXh0IG9uIGNhbmNlbCBhbmQgY29uZmlybSBidXR0b25zXG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCkge1xuICAgICRjYW5jZWxCdG4uaW5uZXJIVE1MID0gZXNjYXBlSHRtbChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uVGV4dCkge1xuICAgICRjb25maXJtQnRuLmlubmVySFRNTCA9IGVzY2FwZUh0bWwocGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0KTtcbiAgfVxuXG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgLy8gU2V0IGNvbmZpcm0gYnV0dG9uIHRvIHNlbGVjdGVkIGJhY2tncm91bmQgY29sb3JcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yO1xuXG4gICAgLy8gU2V0IGJveC1zaGFkb3cgdG8gZGVmYXVsdCBmb2N1c2VkIGJ1dHRvblxuICAgIHNldEZvY3VzU3R5bGUoJGNvbmZpcm1CdG4sIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpO1xuICB9XG5cbiAgLy8gQWxsb3cgb3V0c2lkZSBjbGljaz9cbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFsbG93LW91dHNpZGUtY2xpY2snLCBwYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spO1xuXG4gIC8vIERvbmUtZnVuY3Rpb25cbiAgdmFyIGhhc0RvbmVGdW5jdGlvbiA9IHBhcmFtcy5kb25lRnVuY3Rpb24gPyB0cnVlIDogZmFsc2U7XG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicsIGhhc0RvbmVGdW5jdGlvbik7XG5cbiAgaWYgKCFwYXJhbXMuYW5pbWF0aW9uKSB7XG4gICAgLy8gTm8gYW5pbWF0aW9uXG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdub25lJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcy5hbmltYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsIHBhcmFtcy5hbmltYXRpb24pOyAvLyBDdXN0b20gYW5pbWF0aW9uXG4gIH0gZWxzZSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdwb3AnKTtcbiAgfVxuXG4gIC8vIENsb3NlIHRpbWVyXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicsIHBhcmFtcy50aW1lcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldFBhcmFtZXRlcnM7XG4iLCJpbXBvcnQgeyBoZXhUb1JnYiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgcmVtb3ZlQ2xhc3MsIGdldFRvcE1hcmdpbiwgZmFkZUluLCBzaG93LCBhZGRDbGFzcyB9IGZyb20gJy4vZG9tLW1hbmlwdWxhdGlvbic7XG5pbXBvcnQgZGVmYXVsdFBhcmFtcyBmcm9tICcuL2RlZmF1bHQtcGFyYW1zJztcblxudmFyIG1vZGFsQ2xhc3MgICA9ICcuc3dlZXQtYWxlcnQnO1xudmFyIG92ZXJsYXlDbGFzcyA9ICcuc3dlZXQtb3ZlcmxheSc7XG5cbi8qXG4gKiBBZGQgbW9kYWwgKyBvdmVybGF5IHRvIERPTVxuICovXG5pbXBvcnQgaW5qZWN0ZWRIVE1MIGZyb20gJy4vaW5qZWN0ZWQtaHRtbCc7XG5cbnZhciBzd2VldEFsZXJ0SW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3dlZXRXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHN3ZWV0V3JhcC5pbm5lckhUTUwgPSBpbmplY3RlZEhUTUw7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGJvZHlcbiAgd2hpbGUgKHN3ZWV0V3JhcC5maXJzdENoaWxkKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzd2VldFdyYXAuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbi8qXG4gKiBHZXQgRE9NIGVsZW1lbnQgb2YgbW9kYWxcbiAqL1xudmFyIGdldE1vZGFsID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsQ2xhc3MpO1xuXG4gIGlmICghJG1vZGFsKSB7XG4gICAgc3dlZXRBbGVydEluaXRpYWxpemUoKTtcbiAgICAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB9XG5cbiAgcmV0dXJuICRtb2RhbDtcbn07XG5cbi8qXG4gKiBHZXQgRE9NIGVsZW1lbnQgb2YgaW5wdXQgKGluIG1vZGFsKVxuICovXG52YXIgZ2V0SW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG4gIGlmICgkbW9kYWwpIHtcbiAgICByZXR1cm4gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gIH1cbn07XG5cbi8qXG4gKiBHZXQgRE9NIGVsZW1lbnQgb2Ygb3ZlcmxheVxuICovXG52YXIgZ2V0T3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvdmVybGF5Q2xhc3MpO1xufTtcblxuLypcbiAqIEFkZCBib3gtc2hhZG93IHN0eWxlIHRvIGJ1dHRvbiAoZGVwZW5kaW5nIG9uIGl0cyBjaG9zZW4gYmctY29sb3IpXG4gKi9cbnZhciBzZXRGb2N1c1N0eWxlID0gZnVuY3Rpb24oJGJ1dHRvbiwgYmdDb2xvcikge1xuICB2YXIgcmdiQ29sb3IgPSBoZXhUb1JnYihiZ0NvbG9yKTtcbiAgJGJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDJweCByZ2JhKCcgKyByZ2JDb2xvciArICcsIDAuOCksIGluc2V0IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMDUpJztcbn07XG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBvcGVuaW5nIG1vZGFsXG4gKi9cbnZhciBvcGVuTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG4gIGZhZGVJbihnZXRPdmVybGF5KCksIDEwKTtcbiAgc2hvdygkbW9kYWwpO1xuICBhZGRDbGFzcygkbW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICByZW1vdmVDbGFzcygkbW9kYWwsICdoaWRlU3dlZXRBbGVydCcpO1xuXG4gIHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICB2YXIgJG9rQnV0dG9uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICRva0J1dHRvbi5mb2N1cygpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGFkZENsYXNzKCRtb2RhbCwgJ3Zpc2libGUnKTtcbiAgfSwgNTAwKTtcblxuICB2YXIgdGltZXIgPSAkbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRpbWVyJyk7XG5cbiAgaWYgKHRpbWVyICE9PSAnbnVsbCcgJiYgdGltZXIgIT09ICcnKSB7XG4gICAgJG1vZGFsLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHN3YWwuY2xvc2UoKTtcbiAgICB9LCB0aW1lcik7XG4gIH1cbn07XG5cbi8qXG4gKiBSZXNldCB0aGUgc3R5bGluZyBvZiB0aGUgaW5wdXRcbiAqIChmb3IgZXhhbXBsZSBpZiBlcnJvcnMgaGF2ZSBiZWVuIHNob3duKVxuICovXG52YXIgcmVzZXRJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgdmFyICRpbnB1dCA9IGdldElucHV0KCk7XG5cbiAgcmVtb3ZlQ2xhc3MoJG1vZGFsLCAnc2hvdy1pbnB1dCcpO1xuICAkaW5wdXQudmFsdWUgPSAnJztcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIGRlZmF1bHRQYXJhbXMuaW5wdXRUeXBlKTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBkZWZhdWx0UGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpO1xuXG4gIHJlc2V0SW5wdXRFcnJvcigpO1xufTtcblxuXG52YXIgcmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgLy8gSWYgcHJlc3MgZW50ZXIgPT4gaWdub3JlXG4gIGlmIChldmVudCAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuXG4gIHZhciAkZXJyb3JJY29uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICByZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG5cbi8qXG4gKiBTZXQgXCJtYXJnaW4tdG9wXCItcHJvcGVydHkgb24gbW9kYWwgYmFzZWQgb24gaXRzIGNvbXB1dGVkIGhlaWdodFxuICovXG52YXIgZml4VmVydGljYWxQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgJG1vZGFsLnN0eWxlLm1hcmdpblRvcCA9IGdldFRvcE1hcmdpbihnZXRNb2RhbCgpKTtcbn07XG5cblxuZXhwb3J0IHsgXG4gIHN3ZWV0QWxlcnRJbml0aWFsaXplLFxuICBnZXRNb2RhbCxcbiAgZ2V0T3ZlcmxheSxcbiAgZ2V0SW5wdXQsXG4gIHNldEZvY3VzU3R5bGUsXG4gIG9wZW5Nb2RhbCxcbiAgcmVzZXRJbnB1dCxcbiAgcmVzZXRJbnB1dEVycm9yLFxuICBmaXhWZXJ0aWNhbFBvc2l0aW9uXG59XG4iLCIvKlxuICogQWxsb3cgdXNlciB0byBwYXNzIHRoZWlyIG93biBwYXJhbXNcbiAqL1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBhO1xufTtcblxuLypcbiAqIENvbnZlcnQgSEVYIGNvZGVzIHRvIFJHQiB2YWx1ZXMgKCMwMDAwMDAgLT4gcmdiKDAsMCwwKSlcbiAqL1xudmFyIGhleFRvUmdiID0gZnVuY3Rpb24oaGV4KSB7XG4gIHZhciByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFszXSwgMTYpIDogbnVsbDtcbn07XG5cbi8qXG4gKiBDaGVjayBpZiB0aGUgdXNlciBpcyB1c2luZyBJbnRlcm5ldCBFeHBsb3JlciA4IChmb3IgZmFsbGJhY2tzKVxuICovXG52YXIgaXNJRTggPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh3aW5kb3cuYXR0YWNoRXZlbnQgJiYgIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKTtcbn07XG5cbi8qXG4gKiBJRSBjb21wYXRpYmxlIGxvZ2dpbmcgZm9yIGRldmVsb3BlcnNcbiAqL1xudmFyIGxvZ1N0ciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAvLyBJRS4uLlxuICAgIHdpbmRvdy5jb25zb2xlLmxvZygnU3dlZXRBbGVydDogJyArIHN0cmluZyk7XG4gIH1cbn07XG5cbi8qXG4gKiBTZXQgaG92ZXIsIGFjdGl2ZSBhbmQgZm9jdXMtc3RhdGVzIGZvciBidXR0b25zIFxuICogKHNvdXJjZTogaHR0cDovL3d3dy5zaXRlcG9pbnQuY29tL2phdmFzY3JpcHQtZ2VuZXJhdGUtbGlnaHRlci1kYXJrZXItY29sb3IpXG4gKi9cbnZhciBjb2xvckx1bWluYW5jZSA9IGZ1bmN0aW9uKGhleCwgbHVtKSB7XG4gIC8vIFZhbGlkYXRlIGhleCBzdHJpbmdcbiAgaGV4ID0gU3RyaW5nKGhleCkucmVwbGFjZSgvW14wLTlhLWZdL2dpLCAnJyk7XG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGhleCA9IGhleFswXSArIGhleFswXSArIGhleFsxXSArIGhleFsxXSArIGhleFsyXSArIGhleFsyXTtcbiAgfVxuICBsdW0gPSBsdW0gfHwgMDtcblxuICAvLyBDb252ZXJ0IHRvIGRlY2ltYWwgYW5kIGNoYW5nZSBsdW1pbm9zaXR5XG4gIHZhciByZ2IgPSAnIyc7XG4gIHZhciBjO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgYyA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYyA9IE1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgoMCwgYyArIGMgKiBsdW0pLCAyNTUpKS50b1N0cmluZygxNik7XG4gICAgcmdiICs9ICgnMDAnICsgYykuc3Vic3RyKGMubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiByZ2I7XG59O1xuXG5cbmV4cG9ydCB7XG4gIGV4dGVuZCxcbiAgaGV4VG9SZ2IsXG4gIGlzSUU4LFxuICBsb2dTdHIsXG4gIGNvbG9yTHVtaW5hbmNlXG59XG4iXX0=

})(window, document);
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["swal"] = factory();
	else
		root["swal"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * List of class names that we
 * use throughout the library to
 * manipulate the DOM.
 */

Object.defineProperty(exports, "__esModule", { value: true });
;
var OVERLAY = 'swal-overlay';
var BUTTON = 'swal-button';
var ICON = 'swal-icon';
exports.CLASS_NAMES = {
    MODAL: 'swal-modal',
    OVERLAY: OVERLAY,
    SHOW_MODAL: OVERLAY + "--show-modal",
    MODAL_TITLE: "swal-title",
    MODAL_TEXT: "swal-text",
    ICON: ICON,
    ICON_CUSTOM: ICON + "--custom",
    CONTENT: 'swal-content',
    FOOTER: 'swal-footer',
    BUTTON_CONTAINER: 'swal-button-container',
    BUTTON: BUTTON,
    CONFIRM_BUTTON: BUTTON + "--confirm",
    CANCEL_BUTTON: BUTTON + "--cancel",
    DANGER_BUTTON: BUTTON + "--danger",
};
exports.default = exports.CLASS_NAMES;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Get a DOM element from a class name:
 */
exports.getNode = function (className) {
    var selector = "." + className;
    return document.querySelector(selector);
};
exports.stringToNode = function (html) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    return wrapper.firstChild;
};
exports.insertAfter = function (newNode, referenceNode) {
    var nextNode = referenceNode.nextSibling;
    var parentNode = referenceNode.parentNode;
    parentNode.insertBefore(newNode, nextNode);
};
exports.removeNode = function (node) {
    node.parentElement.removeChild(node);
};
exports.throwErr = function (message) {
    // Remove multiple spaces:
    message = message.replace(/ +(?= )/g, '');
    message = message.trim();
    throw "SweetAlert: " + message;
};
/*
 * Match plain objects ({}) but NOT null
 */
exports.isPlainObject = function (value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    else {
        var prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
};
/*
 * Take a number and return a version with ordinal suffix
 * Example: 1 => 1st
 */
exports.ordinalSuffixOf = function (num) {
    var j = num % 10;
    var k = num % 100;
    if (j === 1 && k !== 11) {
        return num + "st";
    }
    if (j === 2 && k !== 12) {
        return num + "nd";
    }
    if (j === 3 && k !== 13) {
        return num + "rd";
    }
    return num + "th";
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));
var overlay_1 = __webpack_require__(22);
exports.overlayMarkup = overlay_1.default;
__export(__webpack_require__(20));
__export(__webpack_require__(19));
__export(__webpack_require__(18));
var class_list_1 = __webpack_require__(0);
var MODAL_TITLE = class_list_1.default.MODAL_TITLE, MODAL_TEXT = class_list_1.default.MODAL_TEXT, ICON = class_list_1.default.ICON, FOOTER = class_list_1.default.FOOTER;
exports.iconMarkup = "\n  <div class=\"" + ICON + "\"></div>";
exports.titleMarkup = "\n  <div class=\"" + MODAL_TITLE + "\"></div>\n";
exports.textMarkup = "\n  <div class=\"" + MODAL_TEXT + "\"></div>";
exports.footerMarkup = "\n  <div class=\"" + FOOTER + "\"></div>\n";


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var markup_1 = __webpack_require__(2);
var class_list_1 = __webpack_require__(0);
var MODAL = class_list_1.default.MODAL, OVERLAY = class_list_1.default.OVERLAY;
var icon_1 = __webpack_require__(14);
var text_1 = __webpack_require__(17);
var buttons_1 = __webpack_require__(12);
var content_1 = __webpack_require__(13);
exports.injectElIntoModal = function (markup) {
    var modal = utils_1.getNode(MODAL);
    var el = utils_1.stringToNode(markup);
    modal.appendChild(el);
    return el;
};
/*
 * Remove eventual added classes +
 * reset all content inside:
 */
var resetModalElement = function (modal) {
    modal.className = MODAL;
    modal.textContent = '';
};
/*
 * Add custom class to modal element
 */
var customizeModalElement = function (modal, opts) {
    resetModalElement(modal);
    var customClass = opts.class;
    if (customClass) {
        modal.classList.add(customClass);
    }
};
/*
 * It's important to run the following functions in this particular order,
 * so that the elements get appended one after the other.
 */
exports.initModalContent = function (opts) {
    // Start from scratch:
    var modal = utils_1.getNode(MODAL);
    customizeModalElement(modal, opts);
    icon_1.default(opts.icon);
    text_1.initTitle(opts.title);
    text_1.initText(opts.text);
    content_1.default(opts.content);
    buttons_1.default(opts.buttons, opts.dangerMode);
};
var initModalOnce = function () {
    var overlay = utils_1.getNode(OVERLAY);
    var modal = utils_1.stringToNode(markup_1.modalMarkup);
    overlay.appendChild(modal);
};
exports.default = initModalOnce;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
var state = {
    isOpen: false,
    promise: null,
    values: {},
};
/*
 * Change what the promise resolves to when the user clicks the button.
 * This is called internally when using { input: true } for example.
 */
exports.setValueFor = function (buttonKey, value) {
    state.values[buttonKey] = value;
};
exports.default = state;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var class_list_1 = __webpack_require__(0);
var OVERLAY = class_list_1.default.OVERLAY, SHOW_MODAL = class_list_1.default.SHOW_MODAL;
var state_1 = __webpack_require__(4);
exports.openModal = function () {
    var overlay = utils_1.getNode(OVERLAY);
    overlay.classList.add(SHOW_MODAL);
    state_1.default.isOpen = true;
};
var hideModal = function () {
    var overlay = utils_1.getNode(OVERLAY);
    overlay.classList.remove(SHOW_MODAL);
    state_1.default.isOpen = false;
};
/*
 * Triggers when the user presses any button, or
 * hits Enter inside the input:
 */
exports.onAction = function (namespace) {
    hideModal();
    var value = state_1.default.values[namespace];
    state_1.default.promise.resolve(value);
};
/*
 * Filter the state object. Remove the stuff
 * that's only for internal use
 */
exports.getState = function () {
    var publicState = Object.assign({}, state_1.default);
    delete publicState.promise;
    return publicState;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This makes sure that we can use the global
 * swal() function, instead of swal.default()
 * See: https://github.com/webpack/webpack/issues/3929
 */

__webpack_require__(9);

const swal = __webpack_require__(10).default;

module.exports = swal;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["sweetAlert"] = __webpack_require__(7);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __webpack_require__(15);
var actions_1 = __webpack_require__(5);
var state_1 = __webpack_require__(4);
var options_1 = __webpack_require__(25);
;
var swal = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var opts = options_1.getOpts.apply(void 0, args);
    // TODO! Check the user's defaults (use state)
    return new Promise(function (resolve, reject) {
        state_1.default.promise = { resolve: resolve, reject: reject };
        init_1.default(opts);
        // For fade animation to work:
        setTimeout(function () {
            actions_1.openModal();
        });
    });
};
swal.close = actions_1.onAction;
swal.getState = actions_1.getState;
swal.setValueFor = state_1.setValueFor;
exports.default = swal;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = __webpack_require__(4);
var actions_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(1);
var class_list_1 = __webpack_require__(0);
var MODAL = class_list_1.default.MODAL, BUTTON = class_list_1.default.BUTTON, OVERLAY = class_list_1.default.OVERLAY;
var onTabAwayLastButton = function (e) {
    e.preventDefault();
    setFirstButtonFocus();
};
var onTabBackFirstButton = function (e) {
    e.preventDefault();
    setLastButtonFocus();
};
var onKeyUp = function (e) {
    if (!state_1.default.isOpen)
        return;
    switch (e.key) {
        case "Escape": return actions_1.onAction('cancel');
    }
};
var onKeyDownLastButton = function (e) {
    if (!state_1.default.isOpen)
        return;
    switch (e.key) {
        case "Tab": return onTabAwayLastButton(e);
    }
};
var onKeyDownFirstButton = function (e) {
    if (!state_1.default.isOpen)
        return;
    if (e.key === "Tab" && e.shiftKey) {
        return onTabBackFirstButton(e);
    }
};
/*
 * Set default focus on Confirm-button
 */
var setFirstButtonFocus = function () {
    var button = utils_1.getNode(BUTTON);
    if (button) {
        button.tabIndex = 0;
        button.focus();
    }
};
var setLastButtonFocus = function () {
    var modal = utils_1.getNode(MODAL);
    var buttons = modal.querySelectorAll("." + BUTTON);
    var lastIndex = buttons.length - 1;
    var lastButton = buttons[lastIndex];
    if (lastButton) {
        lastButton.focus();
    }
};
var setTabbingForLastButton = function (buttons) {
    var lastIndex = buttons.length - 1;
    var lastButton = buttons[lastIndex];
    lastButton.addEventListener('keydown', onKeyDownLastButton);
};
var setTabbingForFirstButton = function (buttons) {
    var firstButton = buttons[0];
    firstButton.addEventListener('keydown', onKeyDownFirstButton);
};
var setButtonTabbing = function () {
    var modal = utils_1.getNode(MODAL);
    var buttons = modal.querySelectorAll("." + BUTTON);
    if (!buttons.length)
        return;
    setTabbingForLastButton(buttons);
    setTabbingForFirstButton(buttons);
};
var setClickOutside = function (allow) {
    if (allow) {
        var overlay_1 = utils_1.getNode(OVERLAY);
        overlay_1.addEventListener('click', function (e) {
            // Don't trigger for children:
            if (overlay_1 !== e.target)
                return;
            return actions_1.onAction('cancel');
        });
    }
};
var addEventListeners = function (opts) {
    document.addEventListener('keyup', onKeyUp);
    /* So that you don't accidentally confirm something
     * dangerous by clicking enter
     */
    if (opts.dangerMode) {
        setFirstButtonFocus();
    }
    else {
        setLastButtonFocus();
    }
    setButtonTabbing();
    setClickOutside(opts.clickOutside);
};
exports.default = addEventListeners;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var modal_1 = __webpack_require__(3);
var class_list_1 = __webpack_require__(0);
var BUTTON = class_list_1.default.BUTTON, DANGER_BUTTON = class_list_1.default.DANGER_BUTTON;
var markup_1 = __webpack_require__(2);
var actions_1 = __webpack_require__(5);
var state_1 = __webpack_require__(4);
/*
 * Generate a button, with a container element,
 * the right class names, the text, and an event listener.
 * IMPORTANT: This will also add the button's action, which can be triggered even if the button element itself isn't added to the modal.
 */
var getButton = function (namespace, _a, dangerMode) {
    var text = _a.text, value = _a.value, customClass = _a.class;
    var buttonContainer = utils_1.stringToNode(markup_1.buttonMarkup);
    var buttonEl = buttonContainer.querySelector("." + BUTTON);
    var btnNamespaceClass = BUTTON + "--" + namespace;
    buttonEl.classList.add(btnNamespaceClass);
    if (customClass) {
        buttonEl.classList.add(customClass);
    }
    if (dangerMode && namespace === 'confirm') {
        buttonEl.classList.add(DANGER_BUTTON);
    }
    buttonEl.textContent = text;
    state_1.setValueFor(namespace, value);
    buttonEl.addEventListener('click', function () {
        return actions_1.onAction(namespace);
    });
    return buttonContainer;
};
/*
 * Create the buttons-container,
 * then loop through the ButtonList object
 * and append every button to it.
 */
var initButtons = function (buttons, dangerMode) {
    var footerEl = modal_1.injectElIntoModal(markup_1.footerMarkup);
    for (var key in buttons) {
        var buttonOpts = buttons[key];
        var buttonEl = getButton(key, buttonOpts, dangerMode);
        if (buttonOpts.visible) {
            footerEl.appendChild(buttonEl);
        }
    }
    /*
     * If the footer has no buttons, there's no
     * point in keeping it:
     */
    if (footerEl.children.length === 0) {
        footerEl.remove();
    }
};
exports.default = initButtons;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = __webpack_require__(3);
var markup_1 = __webpack_require__(2);
var state_1 = __webpack_require__(4);
var actions_1 = __webpack_require__(5);
var class_list_1 = __webpack_require__(0);
var CONTENT = class_list_1.default.CONTENT;
/*
 * Add an <input> to the content container.
 * Update the "promised" value of the confirm button whenever
 * the user types into the input (+ make it "" by default)
 * Set the default focus on the input.
 */
var addInputEvents = function (input) {
    input.addEventListener('input', function (e) {
        var target = e.target;
        var text = target.value;
        state_1.setValueFor('confirm', text);
    });
    input.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
            return actions_1.onAction('confirm');
        }
    });
    /*
     * FIXME (this is a bit hacky)
     * We're overwriting the default value of confirm button,
     * as well as overwriting the default focus on the button
     */
    setTimeout(function () {
        input.focus();
        state_1.setValueFor('confirm', '');
    }, 0);
};
var initPredefinedContent = function (content, elName, attrs) {
    var el = document.createElement(elName);
    var elClass = CONTENT + "__" + elName;
    el.classList.add(elClass);
    // Set things like "placeholder":
    for (var key in attrs) {
        var value = attrs[key];
        el[key] = value;
    }
    if (elName === "input") {
        addInputEvents(el);
    }
    content.appendChild(el);
};
var initContent = function (opts) {
    if (!opts)
        return;
    var content = modal_1.injectElIntoModal(markup_1.contentMarkup);
    var element = opts.element, attributes = opts.attributes;
    if (typeof element === "string") {
        initPredefinedContent(content, element, attributes);
    }
    else {
        content.appendChild(element);
    }
};
exports.default = initContent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//import { stringToNode } from '../utils';
var modal_1 = __webpack_require__(3);
var markup_1 = __webpack_require__(2);
var class_list_1 = __webpack_require__(0);
var ICON = class_list_1.default.ICON, ICON_CUSTOM = class_list_1.default.ICON_CUSTOM;
var PREDEFINED_ICONS = ["error", "warning", "success", "info"];
var ICON_CONTENTS = {
    error: markup_1.errorIconMarkup(),
    warning: markup_1.warningIconMarkup(),
    success: markup_1.successIconMarkup(),
};
/*
 * Set the warning, error, success or info icons:
 */
var initPredefinedIcon = function (type, iconEl) {
    var iconTypeClass = ICON + "--" + type;
    iconEl.classList.add(iconTypeClass);
    var iconContent = ICON_CONTENTS[type];
    if (iconContent) {
        iconEl.innerHTML = iconContent;
    }
};
var initImageURL = function (url, iconEl) {
    iconEl.classList.add(ICON_CUSTOM);
    var img = document.createElement('img');
    img.src = url;
    iconEl.appendChild(img);
};
var initIcon = function (str) {
    if (!str)
        return;
    var iconEl = modal_1.injectElIntoModal(markup_1.iconMarkup);
    if (PREDEFINED_ICONS.includes(str)) {
        initPredefinedIcon(str, iconEl);
    }
    else {
        initImageURL(str, iconEl);
    }
};
exports.default = initIcon;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var class_list_1 = __webpack_require__(0);
var MODAL = class_list_1.default.MODAL;
var modal_1 = __webpack_require__(3);
var overlay_1 = __webpack_require__(16);
var event_listeners_1 = __webpack_require__(11);
var utils_2 = __webpack_require__(1);
/*
 * Inject modal and overlay into the DOM
 * Then format the modal according to the given opts
 */
exports.init = function (opts) {
    var modal = utils_1.getNode(MODAL);
    if (!modal) {
        if (!document.body) {
            utils_2.throwErr("You can only use SweetAlert AFTER the DOM has loaded!");
        }
        overlay_1.default();
        modal_1.default();
    }
    modal_1.initModalContent(opts);
    event_listeners_1.default(opts);
};
exports.default = exports.init;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var markup_1 = __webpack_require__(2);
var initOverlayOnce = function () {
    var overlay = utils_1.stringToNode(markup_1.overlayMarkup);
    document.body.appendChild(overlay);
};
exports.default = initOverlayOnce;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var markup_1 = __webpack_require__(2);
var modal_1 = __webpack_require__(3);
exports.initTitle = function (title) {
    if (title) {
        var titleEl = modal_1.injectElIntoModal(markup_1.titleMarkup);
        titleEl.textContent = title;
    }
};
exports.initText = function (text) {
    if (text) {
        var textEl = modal_1.injectElIntoModal(markup_1.textMarkup);
        textEl.textContent = text;
    }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var BUTTON_CONTAINER = class_list_1.default.BUTTON_CONTAINER, BUTTON = class_list_1.default.BUTTON;
exports.buttonMarkup = "\n  <div class=\"" + BUTTON_CONTAINER + "\">\n    <button\n      class=\"" + BUTTON + "\"\n    ></button>\n  </div>\n";
/*
export const cancelButton: string = `
  <button
    class="
      ${BUTTON}
      ${BUTTON}--cancel
    "
    tabIndex="2"
  >
    Cancel
  </button>
`;

export const confirmButton: string = `
  <div
    class="swal-confirm-button-container"
  >
  
    <button
      class="
        ${BUTTON}
        ${BUTTON}--confirm
      "
      tabIndex="1"
    >
      OK
    </button>` +

    // Loading animation
    `<div class="la-ball-fall">
      <div></div>
      <div></div>
      <div></div>
    </div>

  </div>
`;
 */


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var CONTENT = class_list_1.default.CONTENT;
exports.contentMarkup = "\n  <div class=\"" + CONTENT + "\">\n\n  </div>\n";


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var ICON = class_list_1.default.ICON;
exports.errorIconMarkup = function () {
    var icon = ICON + "--error";
    var line = icon + "__line";
    var markup = "\n    <div class=\"" + icon + "__x-mark\">\n      <span class=\"" + line + " " + line + "--left\"></span>\n      <span class=\"" + line + " " + line + "--right\"></span>\n    </div>\n  ";
    return markup;
};
exports.warningIconMarkup = function () {
    var icon = ICON + "--warning";
    return "\n    <span class=\"" + icon + "__body\">\n      <span class=\"" + icon + "__dot\"></span>\n    </span>\n  ";
};
exports.successIconMarkup = function () {
    var icon = ICON + "--success";
    return "\n    <span class=\"" + icon + "__line " + icon + "__line--long\"></span>\n    <span class=\"" + icon + "__line " + icon + "__line--tip\"></span>\n\n    <div class=\"" + icon + "__ring\"></div>\n    <div class=\"" + icon + "__hide-corners\"></div>\n  ";
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var MODAL = class_list_1.default.MODAL;
exports.modalMarkup = "\n  <div class=\"" + MODAL + "\">" +
    // Icon
    // Title
    // Text
    // Content
    // Buttons
    "</div>";
exports.default = exports.modalMarkup;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var OVERLAY = class_list_1.default.OVERLAY;
var overlay = "<div \n    class=\"" + OVERLAY + "\"\n    tabIndex=\"-1\">\n  </div>";
exports.default = overlay;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
;
;
var defaultButton = {
    visible: true,
    text: null,
    value: null,
    class: '',
};
var defaultCancelButton = Object.assign({}, defaultButton, {
    visible: false,
    text: "Cancel",
    value: null,
});
var defaultConfirmButton = Object.assign({}, defaultButton, {
    text: "OK",
    value: true,
});
var CONFIRM_KEY = 'confirm';
var CANCEL_KEY = 'cancel';
exports.defaultButtonList = {
    cancel: defaultCancelButton,
    confirm: defaultConfirmButton,
};
var getDefaultButton = function (key) {
    switch (key) {
        case CONFIRM_KEY:
            return defaultConfirmButton;
        case CANCEL_KEY:
            return defaultCancelButton;
        default:
            // Capitalize:
            var text = key.charAt(0).toUpperCase() + key.slice(1);
            return Object.assign({}, defaultButton, {
                text: text,
                value: key,
            });
    }
};
var normalizeButton = function (key, param) {
    var button = getDefaultButton(key);
    /*
     * Use the default button + make it visible
     */
    if (param === true) {
        return Object.assign({}, button, {
            visible: true,
        });
    }
    /* Set the text of the button: */
    if (typeof param === "string") {
        return Object.assign({}, button, {
            visible: true,
            text: param,
        });
    }
    if (utils_1.isPlainObject(param)) {
        return Object.assign({}, button, param);
    }
    return Object.assign({}, button, {
        visible: false,
    });
};
var normalizeButtonListObj = function (obj) {
    var buttons = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        var opts = obj[key];
        var button = normalizeButton(key, opts);
        buttons[key] = button;
    }
    return buttons;
};
var normalizeButtonArray = function (arr) {
    var buttonListObj = {};
    switch (arr.length) {
        /* input: ["Accept"]
         * result: only set the confirm button text to "Accept"
         */
        case 1:
            buttonListObj[CANCEL_KEY] = Object.assign({}, defaultCancelButton, {
                visible: false,
            });
            buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, arr[0]);
            break;
        /* input: ["No", "Ok!"]
         * result: Set cancel button to "No", and confirm to "Ok!"
         */
        case 2:
            buttonListObj[CANCEL_KEY] = normalizeButton(CANCEL_KEY, arr[0]);
            buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, arr[1]);
            break;
        default:
            utils_1.throwErr("Invalid number of 'buttons' in array (" + arr.length + ").\n      If you want more than 2 buttons, you need to use an object!");
    }
    return buttonListObj;
};
exports.getButtonListOpts = function (opts) {
    var buttonListObj = {};
    if (typeof opts === "string") {
        buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, opts);
    }
    else if (Array.isArray(opts)) {
        buttonListObj = normalizeButtonArray(opts);
    }
    else if (utils_1.isPlainObject(opts)) {
        buttonListObj = normalizeButtonListObj(opts);
    }
    else if (opts === true) {
        buttonListObj = normalizeButtonArray([true, true]);
    }
    else if (opts === undefined) {
        buttonListObj = exports.defaultButtonList;
    }
    return buttonListObj;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
;
var defaultInputOptions = {
    element: 'input',
    attributes: {
        placeholder: "",
    },
};
exports.getContentOpts = function (contentParam) {
    var opts = {};
    if (utils_1.isPlainObject(contentParam)) {
        return Object.assign(opts, contentParam);
    }
    if (contentParam === 'input') {
        return defaultInputOptions;
    }
    return null;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var buttons_1 = __webpack_require__(23);
var content_1 = __webpack_require__(24);
;
var defaultOpts = {
    title: null,
    text: null,
    icon: null,
    buttons: buttons_1.defaultButtonList,
    class: null,
    content: null,
    clickOutside: true,
    dangerMode: false,
};
/*
 * Since the user can set both "button" and "buttons",
 * we need to make sure we pick one of the options
 */
var pickButtonParam = function (opts) {
    var singleButton = opts && opts.button;
    var buttonList = opts && opts.buttons;
    if (singleButton !== undefined && buttonList !== undefined) {
        utils_1.throwErr("Cannot set both 'button' and 'buttons' options!");
    }
    if (singleButton !== undefined) {
        return {
            confirm: singleButton,
        };
    }
    else {
        return buttonList;
    }
};
// Example 0 -> 1st
var indexToOrdinal = function (index) { return utils_1.ordinalSuffixOf(index + 1); };
var invalidParam = function (param, index) {
    utils_1.throwErr(indexToOrdinal(index) + " argument ('" + param + "') is invalid");
};
var expectOptionsOrNothingAfter = function (index, allParams) {
    var nextIndex = (index + 1);
    var nextParam = allParams[nextIndex];
    if (!utils_1.isPlainObject(nextParam) && nextParam !== undefined) {
        utils_1.throwErr("Expected " + indexToOrdinal(nextIndex) + " argument ('" + nextParam + "') to be a plain object");
    }
};
var expectNothingAfter = function (index, allParams) {
    var nextIndex = (index + 1);
    var nextParam = allParams[nextIndex];
    if (nextParam !== undefined) {
        utils_1.throwErr("Unexpected " + indexToOrdinal(nextIndex) + " argument (" + nextParam + ")");
    }
};
/*
 * Based on the number of arguments, their position and their type,
 * we return an object that's merged into the final SwalOptions
 */
var paramToOption = function (opts, param, index, allParams) {
    var paramType = (typeof param);
    var isString = (paramType === "string");
    var isDOMNode = (param instanceof Element);
    if (isString) {
        if (index === 0) {
            // Example: swal("Hi there!");
            return {
                text: param,
            };
        }
        else if (index === 1) {
            // Example: swal("Wait!", "Are you sure you want to do this?");
            // (The text is now the second argument)
            return {
                text: param,
                title: allParams[0],
            };
        }
        else if (index === 2) {
            // Example: swal("Wait!", "Are you sure?", "warning");
            expectOptionsOrNothingAfter(index, allParams);
            return {
                icon: param,
            };
        }
        else {
            invalidParam(param, index);
        }
    }
    else if (isDOMNode && index === 0) {
        // Example: swal(<DOMNode />);
        expectOptionsOrNothingAfter(index, allParams);
        return {
            content: param,
        };
    }
    else if (utils_1.isPlainObject(param)) {
        expectNothingAfter(index, allParams);
        return param;
    }
    else {
        invalidParam(param, index);
    }
};
/*
 * No matter if the user calls swal with
 * - swal("Oops!", "An error occured!", "error") or
 * - swal({ title: "Oops!", text: "An error occured!", icon: "error" })
 * ... we always want to transform the params into the second version
 */
exports.getOpts = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var opts = {};
    params.forEach(function (param, index) {
        var changes = paramToOption(opts, param, index, params);
        Object.assign(opts, changes);
    });
    // Since Object.assign doesn't deep clone,
    // we need to do this:
    var buttonListOpts = pickButtonParam(opts);
    opts.buttons = buttons_1.getButtonListOpts(buttonListOpts);
    delete opts.button;
    opts.content = content_1.getContentOpts(opts.content);
    return Object.assign({}, defaultOpts, opts);
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=sweetalert.bundle.js.map
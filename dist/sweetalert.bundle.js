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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
exports.MODAL = 'sweet-alert';
exports.OVERLAY = 'sweet-overlay';
/* Modifiers */
exports.SHOW_MODAL = exports.MODAL + "--show";
/* Children */
exports.MODAL_TITLE = exports.MODAL + "__title";
exports.MODAL_TEXT = exports.MODAL + "__text";
exports.ICON = 'sa-icon';
exports.BUTTON = 'swal-button';
exports.CONFIRM_BUTTON = exports.BUTTON + "--confirm";
exports.CANCEL_BUTTON = exports.BUTTON + "--cancel";
/*
 * Get a DOM element from a class name:
 */
exports.getNode = function (className) {
    var selector = "." + className;
    return document.querySelector(selector);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
exports.openModal = function () {
    var modal = class_list_1.getNode(class_list_1.MODAL);
    modal.classList.add(class_list_1.SHOW_MODAL);
};
exports.closeModal = function () {
    var modal = class_list_1.getNode(class_list_1.MODAL);
    modal.classList.remove(class_list_1.SHOW_MODAL);
};
exports.onConfirm = function () {
    exports.closeModal();
    console.log("Clicked confirm!");
};
exports.onCancel = function () {
    exports.closeModal();
    console.log("Clicked cancel!");
};


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This makes sure that we can use the global
 * swal() function, instead of swal.default()
 * See: https://github.com/webpack/webpack/issues/3929
 */

__webpack_require__(5);

const swal = __webpack_require__(6).default;

module.exports = swal;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["sweetAlert"] = __webpack_require__(3);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __webpack_require__(8);
var actions_1 = __webpack_require__(1);
var swal = (function () {
    function swal(name) {
        init_1.init();
        // For fade animation to work:
        setTimeout(function () {
            actions_1.openModal();
        });
        /*
        return new Promise((resolve, reject) => {
          return "ler";
        });
         */
    }
    swal.open = function () {
        actions_1.openModal();
    };
    swal.close = function () {
        actions_1.closeModal();
    };
    return swal;
}());
;
exports.default = swal;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var actions_1 = __webpack_require__(1);
var addEventListeners = function () {
    var overlay = class_list_1.getNode(class_list_1.OVERLAY);
    overlay.addEventListener('click', actions_1.onCancel);
    var confirmBtn = class_list_1.getNode(class_list_1.CONFIRM_BUTTON);
    var cancelBtn = class_list_1.getNode(class_list_1.CANCEL_BUTTON);
    confirmBtn.addEventListener('click', actions_1.onConfirm);
    cancelBtn.addEventListener('click', actions_1.onCancel);
};
exports.default = addEventListeners;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var markup_1 = __webpack_require__(11);
var class_list_1 = __webpack_require__(0);
var icons_1 = __webpack_require__(10);
var event_listeners_1 = __webpack_require__(7);
/*
 * Append both .sweet-overlay
 * and .sweet-alert to body:
 */
var initMarkup = function () {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = markup_1.default;
    while (wrapper.firstChild) {
        var el = wrapper.firstChild;
        document.body.appendChild(el);
    }
};
var setIcon = function () {
    var icon = class_list_1.getNode(class_list_1.ICON);
    var iconTypeClass = class_list_1.ICON + "--error";
    icon.classList.add(iconTypeClass);
    var iconContent = icons_1.errorIcon();
    icon.innerHTML = iconContent;
};
exports.init = function () {
    var modal = class_list_1.getNode(class_list_1.MODAL);
    if (!modal) {
        initMarkup();
    }
    setIcon();
    event_listeners_1.default();
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
exports.cancelButton = "\n  <button \n    class=\"\n      " + class_list_1.BUTTON + " \n      " + class_list_1.BUTTON + "--cancel\n    \"\n    tabIndex=\"2\"\n  >\n    Cancel\n  </button>\n";
exports.confirmButton = "\n  <div \n    class=\"swal-confirm-button-container\"\n  >\n  \n    <button \n      class=\"\n        " + class_list_1.BUTTON + "\n        " + class_list_1.BUTTON + "--confirm\n      \"\n      tabIndex=\"1\"\n    >\n      OK\n    </button>" +
    // Loading animation
    "<div class=\"la-ball-fall\">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n";


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
exports.errorIcon = function () {
    var icon = class_list_1.ICON + "--error";
    var line = icon + "__line";
    var markup = "\n    <div class=\"" + icon + "__x-mark\">\n      <span class=\"" + line + " " + line + "--left\"></span>\n      <span class=\"" + line + " " + line + "--right\"></span>\n    </div>\n  ";
    return markup;
};
exports.warningIcon = "\n  <div class=\"sa-icon sa-warning\">\n    <span class=\"sa-body\"></span>\n    <span class=\"sa-dot\"></span>\n  </div>\n";
exports.infoIcon = "\n  <div class=\"sa-icon sa-info\"></div>\n";
exports.successIcon = "\n  <div class=\"sa-icon sa-success\">\n    <span class=\"sa-line sa-tip\"></span>\n    <span class=\"sa-line sa-long\"></span>\n\n    <div class=\"sa-placeholder\"></div>\n    <div class=\"sa-fix\"></div>\n  </div>\n";
exports.customIcon = "\n  <div class=\"sa-icon sa-custom\"></div>\n";


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var buttons_1 = __webpack_require__(9);
var overlay_1 = __webpack_require__(12);
var markup = "\n  <div class=\"" + class_list_1.MODAL + "\">\n    \n    <div class=\"" + class_list_1.ICON + "\"></div>\n\n    <div class=\"" + class_list_1.MODAL_TITLE + "\">\n      Title\n    </div>\n\n    <div class=\"" + class_list_1.MODAL_TEXT + "\">\n      Text\n    </div>\n\n    <div class=\"sa-button-container\">\n      " + buttons_1.cancelButton + "\n      " + buttons_1.confirmButton + "\n    </div>\n\n  </div>\n\n  " + overlay_1.default + "\n";
exports.default = markup;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_list_1 = __webpack_require__(0);
var overlay = "\n  <div \n    class=\"" + class_list_1.OVERLAY + "\"\n    tabIndex=\"-1\">\n  </div>\n";
exports.default = overlay;


/***/ })
/******/ ]);
});
//# sourceMappingURL=sweetalert.bundle.js.map
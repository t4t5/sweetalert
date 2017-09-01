(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var useCases = [{
  text: "success messages",
  className: 'success'
}, {
  text: "error messages",
  className: 'error'
}, {
  text: "warning modals",
  className: 'warning'
}];

var currentIndex = 0;

var initRotater = function initRotater() {
  updateUseCase(true);
  setInterval(updateUseCase, 4000);
};

var updateUseCase = function updateUseCase(isInitial) {
  var useCase = useCases[currentIndex];
  var nextUseCase = useCases[getNextIndex()];

  updateText(useCase, nextUseCase);
  updateModal(useCase, nextUseCase, isInitial);

  currentIndex = getNextIndex();
};

var updateModal = function updateModal(useCase, nextUseCase, isInitial) {
  var className = useCase.className;


  var contentOverlayEl = document.querySelector('.modal-content-overlay');

  if (!contentOverlayEl) return;

  if (!isInitial) {
    contentOverlayEl.classList.add('show');
  }

  var modalEl = document.querySelector('.swal-modal-example');

  modalEl.dataset.type = className;

  var contentEls = document.querySelectorAll('.example-content');

  setTimeout(function () {
    contentEls.forEach(function (contentEl) {
      if (contentEl.classList.contains(className)) {
        contentEl.classList.add('show');
      } else {
        contentEl.classList.remove('show');
      }
    });

    contentOverlayEl.classList.remove('show');
  }, 500);
};

var updateText = function updateText(useCase, nextUseCase) {
  var text = useCase.text;
  var nextText = nextUseCase.text;


  var rotatorEl = document.querySelector('.text-rotater');

  if (!rotatorEl) return;

  rotatorEl.classList.add('slide-up');

  setTimeout(function () {
    rotatorEl.innerHTML = "\n      <span>" + text + "</span>\n      <span>" + nextText + "</span>\n    ";
    rotatorEl.classList.remove('slide-up');
  }, 2000);
};

var getNextIndex = function getNextIndex() {
  if (useCases[currentIndex + 1]) {
    return currentIndex + 1;
  } else {
    return 0;
  }
};

exports.default = initRotater();

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * In our Markdown files, we have some <preview-button /> tags.
 * We want to transform these into button.preview,
 * which onclick will run the JS code right above them!
 */

var previewPlaceholders = document.querySelectorAll('preview-button');

var createButton = function createButton(placeholder) {
  var button = document.createElement('button');
  button.className = "preview";
  button.innerText = "Preview";

  // Add button right above placeholder
  placeholder.parentNode.insertBefore(button, placeholder);

  return button;
};

var getCodeEl = function getCodeEl(placeholder) {
  return placeholder.parentNode.previousSibling.previousSibling;
};

var getCode = function getCode(highlightEl) {
  return highlightEl.innerText.trim();
};

var resetStyles = function resetStyles() {
  var swalOverlay = document.querySelector('.swal-overlay');
  var allSwalEls = swalOverlay.querySelectorAll('*');

  swalOverlay.removeAttribute('style');

  allSwalEls.forEach(function (el) {
    el.removeAttribute('style');
  });
};

var setStyles = function setStyles(code) {
  var array = code.split(/[{}]/g);
  var selector = array[0].trim();

  var el = document.querySelector(selector);

  var css = array[1].trim();
  css = css.replace(/\s+/g, ' ');
  css = css.replace(/;\s?/g, '; ');
  css = css.replace(/:\s?/g, ': ');

  el.style.cssText = css;
};

previewPlaceholders.forEach(function (placeholder) {
  var highlightEl = getCodeEl(placeholder);
  var code = getCode(highlightEl);

  var button = createButton(placeholder);
  var givenFunction = placeholder.dataset.function;

  var lang = highlightEl.classList[1];

  /*
   * If there's a specified data-function on <preview-button>, call that.
   * Othwerwise, just use the code from the highlightjs above it:
   */
  button.addEventListener('click', function () {
    if (givenFunction) {
      window[givenFunction]();
    } else if (lang === "css") {
      swal("Sweet!", "I like customizing!");
      resetStyles();
      setStyles(code);
    } else {
      eval(code);
    }
  });

  placeholder.remove();
});

},{}]},{},[1]);

/*
 * Allow user to pass their own params
 */
var extend = function(a, b) {
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
var hexToRgb = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function() {
  return (window.attachEvent && !window.addEventListener);
};

/*
 * IE compatible logging for developers
 */
var logStr = function(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function(hex, lum) {
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

var body = document.getElementsByTagName('body')[0];

var frozenAtPx = null;
var bodyHeight = null;
var bodyOverflow = null;

var freezeScrolling = function() {
  frozenAtPx = Math.round(window.scrollY * 100) / 100;

  bodyHeight = body.style.height;
  body.style.height = '100%';

  bodyOverflow = body.style.overflow;
  body.style.overflow = 'hidden';

  for (var i = 0; i < body.childElementCount; i++) {
    var childEl = body.children[i];
    if (childEl.classList.contains('sweet-alert') || childEl.classList.contains('sweet-overlay'))
      continue;

    var translateYRegexp = /translateY\(([^\)]*)px\)/;
    var currentTransform = childEl.style.transform || '';
    var offsetPx = frozenAtPx;
    var matches = currentTransform.match(translateYRegexp);

    if (currentTransform !== '') {
      childEl.setAttribute('data-transform-orig', currentTransform);
    }

    if (matches) {
      offsetPx += parseInt(matches[1]);
      currentTransform = currentTransform.replace(translateYRegexp, '');
    }

    childEl.style.transform = currentTransform + ' translateY(-' + frozenAtPx + 'px)';
  }
};

var thawScrolling = function() {
  body.style.height = bodyHeight;
  body.style.overflow = bodyOverflow;
  window.scrollTo(0, frozenAtPx);

  for (var i = 0; i < body.childElementCount; i++) {
    var childEl = body.children[i];
    if (childEl.classList.contains('sweet-alert') || childEl.classList.contains('sweet-overlay'))
      continue;

    childEl.style.transform = childEl.getAttribute('data-transform-orig');
    childEl.removeAttribute('data-transform-orig');
  }

  frozenAtPx = null;
  bodyHeight = null;
  bodyOverflow = null;
};

export {
  extend,
  hexToRgb,
  isIE8,
  logStr,
  colorLuminance,
  freezeScrolling,
  thawScrolling
};

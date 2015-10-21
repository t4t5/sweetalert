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

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== "undefined") { // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return ('-' + parseInt((height + padding) / 2) + 'px');
};

var getPrefixed = function getPrefixed(prop){
  var i, s = document.body.style, v = ['ms','O','Moz','Webkit'];
  if( s[prop] === '' ) return prop;
  prop = prop[0].toUpperCase() + prop.slice(1);
  for( i = v.length; i--; ) {
    if( s[v[i] + prop] === '' ) {
      return (v[i] + prop);
    }
  }
};

var fadeIn = function(elem) {
  var transitionPrefixed = getPrefixed('transition');

  elem.style[transitionPrefixed] = "";
  elem.style.opacity = 0;
  elem.style.display = "block";
  setTimeout(function() {
    elem.style[transitionPrefixed] = "opacity 0.2s";
    elem.style.opacity = 1;
  }, 1);
};

var fadeOut = function(elem) {
  var transitionPrefixed = getPrefixed('transition');

  elem.style[transitionPrefixed] = "";
  elem.style.opacity = 1;
  elem.style.display = "block";
  setTimeout(function() {
    elem.style[transitionPrefixed] = "opacity 0.2s";
    elem.style.opacity = 0;
    setTimeout(function() {
      elem.style.display = "none";
    }, 200);
  }, 1);
};

var fireClick = function(node) {
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
  } else if ( document.createEvent ) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick') ;
  } else if (typeof node.onclick === 'function' ) {
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

export {
  hasClass, addClass, removeClass,
  escapeHtml,
  _show, show, _hide, hide,
  isDescendant,
  getTopMargin,
  fadeIn, fadeOut,
  fireClick,
  stopEventPropagation
};

import { stopEventPropagation, fireClick } from './handle-dom';
import { setFocusStyle } from './handle-swal-dom';

var vk_tab = 9;
var vk_esc = 27;
var vk_enter = 13;
var vk_space = 32;
var key_codes = [vk_tab, vk_esc, vk_enter, vk_space];

var handleKeyDown = function(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  if (key_codes.indexOf(keyCode) < 0) {
    // Don't do work on keys we don't care about.
    return;
  }

  if (params.disableKeys === true) {
    stopEventPropagation(e);
    return;
  }

  var $okButton     = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

  var $targetElement = e.target || e.srcElement;

  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
  for (var i = 0; i < $modalButtons.length; i++) {
    if ($targetElement === $modalButtons[i]) {
      btnIndex = i;
      break;
    }
  }

  if (keyCode === vk_tab) {
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
    if (keyCode === vk_enter && params.allowReturnKey === true) {
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
    } else if (keyCode === vk_esc && params.allowEscapeKey === true) {
      $targetElement = $cancelButton;
      fireClick($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

export default handleKeyDown;

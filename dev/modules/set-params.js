var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

import {
  isIE8
} from './utils';

import {
  getModal,
  getInput,
  setFocusStyle
} from './handle-swal-dom';

import {
  hasClass, addClass, removeClass, 
  escapeHtml, 
  _show, show, _hide, hide
} from './handle-dom';


/*
 * Set type, text and actions on modal
 */
var setParameters = function(params) {
  var modal = getModal();

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : escapeHtml(params.text || '').split('\n').join('<br>');
  if (params.text) show($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    let customClass = modal.getAttribute('data-custom-class');
    removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  hide(modal.querySelectorAll('.sa-icon'));

  if (params.type && !isIE8()) {

    let validType = false;

    for (let i = 0; i < alertTypes.length; i++) {
      if (params.type === alertTypes[i]) {
        validType = true;
        break;
      }
    }

    if (!validType) {
      logStr('Unknown alert type: ' + params.type);
      return false;
    }

    let typesWithIcons = ['success', 'error', 'warning', 'info'];
    let $icon;

    if (typesWithIcons.indexOf(params.type) !== -1) {
      $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
      show($icon);
    }

    let $input = getInput();

    // Animate icon
    switch (params.type) {

      case 'success':
        addClass($icon, 'animate');
        addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
        addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
        break;

      case 'error':
        addClass($icon, 'animateErrorIcon');
        addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
        break;

      case 'warning':
        addClass($icon, 'pulseWarning');
        addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
        addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
        break;

      case 'input':
      case 'prompt':
        $input.setAttribute('type', params.inputType);
        $input.value = params.inputValue;
        $input.setAttribute('placeholder', params.inputPlaceholder);
        addClass(modal, 'show-input');
        setTimeout(function () {
          $input.focus();
          $input.addEventListener('keyup', swal.resetInputError);
        }, 400);
        break;
    }
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    let $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    show($customIcon);

    let _imgWidth = 80;
    let _imgHeight = 80;

    if (params.imageSize) {
      let dimensions = params.imageSize.toString().split('x');
      let imgWidth = dimensions[0];
      let imgHeight = dimensions[1];

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
    hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set box-shadow to default focused button
    setFocusStyle($confirmBtn, params.confirmButtonColor);
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

export default setParameters;

import { colorLuminance } from './utils';
import { getModal } from './handle-swal-dom';
import { hasClass, isDescendant } from './handle-dom';


/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible  = hasClass(modal, 'visible');
  var doneFunctionExists = (params.doneFunction && modal.getAttribute('data-has-done-function') === 'true');

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor  = params.confirmButtonColor;
    hoverColor   = colorLuminance(normalColor, -0.04);
    activeColor  = colorLuminance(normalColor, -0.14);
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
      let $confirmButton = modal.querySelector('button.confirm');
      let $cancelButton  = modal.querySelector('button.cancel');

      if (targetedConfirm) {
        $cancelButton.style.boxShadow = 'none';
      } else {
        $confirmButton.style.boxShadow = 'none';
      }
      break;

    case 'click':
      let clickedOnModal = (modal === target);
      let clickedOnModalChild = isDescendant(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if (isDescendant(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function(modal, params) {
  var callbackValue = true;

  if (hasClass(modal, 'show-input')) {
    let input = modal.querySelector('input');

    if (input.type == 'checkbox') {
      callbackValue = input.checked;
    } else {
      callbackValue = input.value;
      if (!callbackValue) {
        callbackValue = '';
      }
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
var handleCancel = function(modal, params) {
  var paramCount = params.doneFunction ? params.doneFunction.length : 0;

  if (params.cancelFunction) {
    params.cancelFunction();
  } else if (paramCount > 0) {
    // Old cancel case
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};


export default {
  handleButton,
  handleConfirm,
  handleCancel
};

import CLASS_NAMES from '../class-list';

const {
  MODAL,
  MODAL_TITLE,
  MODAL_TEXT,
  ICON,
} = CLASS_NAMES;

import {
  errorIcon,
  warningIcon,
  infoIcon,
  successIcon,
  customIcon,
} from './icons';

import {
  cancelButton,
  confirmButton,
} from './buttons';

import {
  input,
  inputError,
} from './input';

import overlay from './overlay';

export const modalText: string = `
  <div class="${MODAL_TEXT}">
    Text
  </div>`
;

const modal: string =`
  <div class="${MODAL}">
    
    <div class="${ICON}"></div>

    <div class="${MODAL_TITLE}">
      Title
    </div>` +

    // Text goes here

    `<div class="sa-button-container">
      ${cancelButton}
      ${confirmButton}
    </div>

  </div>`
;

export default modal;


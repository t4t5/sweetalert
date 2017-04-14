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

const markup = `
  <div class="${MODAL}">
    
    <div class="${ICON}"></div>

    <div class="${MODAL_TITLE}">
      Title
    </div>

    <div class="${MODAL_TEXT}">
      Text
    </div>

    <div class="sa-button-container">
      ${cancelButton}
      ${confirmButton}
    </div>

  </div>

  ${overlay}
`
;

export default markup;

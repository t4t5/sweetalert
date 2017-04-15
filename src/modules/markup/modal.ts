import CLASS_NAMES from '../class-list';

const {
  MODAL,
  MODAL_TITLE,
  MODAL_TEXT,
  ICON,
  BUTTONS,
} = CLASS_NAMES;

import {
  errorIcon,
  warningIcon,
  infoIcon,
  successIcon,
  customIcon,
} from './icons';

/*
import {
  cancelButton,
  confirmButton,
} from './buttons';
 */

import {
  input,
  inputError,
} from './input';

import overlay from './overlay';

export const iconMarkup: string = `
  <div class="${ICON}"></div>`
;

export const titleMarkup: string = `
  <div class="${MODAL_TITLE}"></div>
`;

export const textMarkup: string = `
  <div class="${MODAL_TEXT}"></div>`
;

export const buttonsMarkup: string = `
  <div class="${BUTTONS}"></div>
`;

const modalMarkup: string =`
  <div class="${MODAL}">` +
    
    // Icon

    // Title

    // Text
  
    // Buttons

 `</div>`
;

export default modalMarkup;


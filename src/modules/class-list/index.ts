/*
 * List of class names that we
 * use throughout the library to
 * manipulate the DOM.
 */

interface ClassNameList {
  [key:string]: string,
};

const OVERLAY: string = 'swal-overlay';
const BUTTON: string = 'swal-button';
const ICON: string = 'swal-icon';

export const CLASS_NAMES: ClassNameList = {
  MODAL: 'swal-modal',
  OVERLAY,
  SHOW_MODAL: `${OVERLAY}--show-modal`,

  MODAL_TITLE: `swal-title`,
  MODAL_TEXT: `swal-text`,
  ICON,
  ICON_CUSTOM: `${ICON}--custom`,

  CONTENT: 'swal-content',

  FOOTER: 'swal-footer',
  BUTTON_CONTAINER: 'swal-button-container',
  BUTTON,
  CONFIRM_BUTTON: `${BUTTON}--confirm`,
  CANCEL_BUTTON: `${BUTTON}--cancel`,
  DANGER_BUTTON: `${BUTTON}--danger`,
};

export default CLASS_NAMES;


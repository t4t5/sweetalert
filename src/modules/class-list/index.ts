/*
 * List of class names that we
 * use throughout the library to
 * manipulate the DOM.
 */

interface ClassNameList {
  [key:string]: string,
};

const MODAL: string = 'swal-modal';
const BUTTON: string = 'swal-button';

export const CLASS_NAMES: ClassNameList = {
  MODAL,
  OVERLAY: 'swal-overlay',
  SHOW_MODAL: `${MODAL}--show`,

  MODAL_TITLE: `swal-title`,
  MODAL_TEXT: `swal-text`,
  ICON: 'swal-icon',

  BUTTONS: 'swal-buttons',
  BUTTON_CONTAINER: 'swal-button-container',
  BUTTON,
  CONFIRM_BUTTON: `${BUTTON}--confirm`,
  CANCEL_BUTTON: `${BUTTON}--cancel`,
};

export default CLASS_NAMES;

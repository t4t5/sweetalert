import { isPlainObject, throwErr } from '../utils';

export interface ButtonOptions {
  visible: Boolean,
  text: string,
  value: any,
  class: string,
};

export interface ButtonList {
  [buttonNamespace: string]: ButtonOptions,
};

const defaultButton: ButtonOptions = {
  visible: true,
  text: null,
  value: null,
  class: '',
};

const defaultCancelButton: ButtonOptions = Object.assign({}, 
  defaultButton, {
    visible: false,
    text: "Cancel",
    value: false,
  }
);

const defaultConfirmButton: ButtonOptions = Object.assign({}, 
  defaultButton, {
    text: "OK",
    value: true,
  }
);

const CONFIRM_KEY = 'confirm';
const CANCEL_KEY  = 'cancel';

export const defaultButtonList: ButtonList = {
  cancel: defaultCancelButton,
  confirm: defaultConfirmButton,
};

const getDefaultButton = (key: string): ButtonOptions => {
  switch (key) {
    case CONFIRM_KEY:
      return defaultConfirmButton;

    case CANCEL_KEY:
      return defaultCancelButton;

    default:
      // Capitalize:
      const text = key.charAt(0).toUpperCase() + key.slice(1);

      return Object.assign({}, defaultButton, {
        text,
        value: key,
      });
  }
};

const normalizeButton = (key: string, param: string|object|Boolean): ButtonOptions => {
  const button: ButtonOptions = getDefaultButton(key);

  /*
   * Use the default button + make it visible
   */
  if (param === true) {
    return Object.assign({}, button, {
      visible: true,
    });
  }

  /* Set the text of the button: */
  if (typeof param === "string") {
    return Object.assign({}, button, {
      visible: true,
      text: param,
    });
  }

  if (isPlainObject(param)) {
    return Object.assign({}, button, param);
  }

  return Object.assign({}, button, {
    visible: false,
  });
};

const normalizeButtonListObj = (obj: any): ButtonList => {
  let buttons: ButtonList = {};

  for (let key of Object.keys(obj)) {
    const opts: any = obj[key];
    const button: ButtonOptions = normalizeButton(key, opts);
    buttons[key] = button;
  }

  return buttons;
};

const normalizeButtonArray = (arr: any[]): ButtonList => {
  let buttonListObj: ButtonList = {};

  switch (arr.length) {
    /* input: ["Accept"]
     * result: only set the confirm button text to "Accept"
     */
    case 1:
      buttonListObj[CANCEL_KEY] = Object.assign({}, defaultCancelButton, {
        visible: false,
      });

      buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, arr[0]);
      break;

    /* input: ["No", "Ok!"]
     * result: Set cancel button to "No", and confirm to "Ok!"
     */
    case 2:
      buttonListObj[CANCEL_KEY] = normalizeButton(CANCEL_KEY, arr[0]);
      buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, arr[1]);
      break;

    default:
      throwErr(`Invalid number of 'buttons' in array (${arr.length}).
      If you want more than 2 buttons, you need to use an object!`);
  }

  return buttonListObj;
};

export const getButtonListOpts = (opts: string|object|boolean): ButtonList => {
  let buttonListObj = <any>{};

  if (typeof opts === "string") {
    buttonListObj[CONFIRM_KEY] = normalizeButton(CONFIRM_KEY, opts);
  } else if (Array.isArray(opts)) {
    buttonListObj = normalizeButtonArray(opts);
  } else if (isPlainObject(opts)) {
    buttonListObj = normalizeButtonListObj(opts);
  } else if (opts === true) {
    buttonListObj = normalizeButtonArray([true, true]);
  } else if (opts === undefined){
    buttonListObj = defaultButtonList;
  }

  return buttonListObj;
};


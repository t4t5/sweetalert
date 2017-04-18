import { SwalParams } from '../../core';
import { throwErr } from '../utils';
import { 
  ButtonList,
  getButtonListOpts,
  defaultButtonList
} from './buttons';

/*
 * The final object that we transform the given params into
 */
export interface SwalOptions {
  title: string,
  text: string,
  icon: string,
  buttons: ButtonList,
};

const defaultOpts: SwalOptions = {
  title: "",
  text: "",
  icon: null,
  buttons: defaultButtonList,
};

/*
 * Since the user can set both "button" and "buttons",
 * we need to make sure we pick one of the options
 */
const pickButtonParam = (opts: any): object => {
  const singleButton: string|object = opts && opts.button;
  const buttonList: object = opts && opts.buttons;

  if (singleButton && buttonList) {
    throwErr(`Cannot set both 'button' and 'buttons' options!`);
  }

  if (singleButton) {
    return {
      confirm: singleButton,
    };
  } else {
    return buttonList;
  }

};

/*
 * No matter if the user calls swal with
 * - swal("Oops!", "An error occured!", "error") or
 * - swal({ title: "Oops!", text: "An error occured!", icon: "error" })
 * ... we always want to transform the params into the second version
 */
export const getOpts = (...args: SwalParams): SwalOptions => {
  const firstParam = args[0];
  const isString = (typeof firstParam === "string");

  let opts = <any>{};

  if (args.length === 1 && isString) {
    // swal("An error occured!");
    opts.text = firstParam;
  } else if (isString) {
    // swal("Oops!", "An error occured!", "error");
    opts.title = firstParam;
    opts.text  = args[1];
    opts.icon= args[2];
  } else {
    // swal({ text: "An error occured!" });
    opts = firstParam;
  }

  let buttonListOpts = pickButtonParam(opts);

  // Since Object.assign doesn't deep clone,
  // we need to do this:
  opts.buttons = getButtonListOpts(buttonListOpts);

  return Object.assign({}, defaultOpts, opts);
};


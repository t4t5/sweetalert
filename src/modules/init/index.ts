import {
  stringToNode,
} from '../markup';

import modalMarkup, {
  iconMarkup,
  titleMarkup,
  textMarkup,
  buttonsMarkup,
} from '../markup/modal';

import {
  buttonMarkup,
} from '../markup/buttons';

import overlayMarkup from '../markup/overlay';

import {
  errorIcon,
} from '../markup/icons';

import state from '../state';

import {
  closeModal,
} from '../actions';

import CLASS_NAMES, { getNode } from '../class-list';

//import addEventListeners from './event-listeners';

import {
  SwalOptions,
  ButtonList,
  ButtonOptions,
} from '../options';

const {
  MODAL,
  OVERLAY,
  ICON,
  MODAL_TITLE,
  MODAL_TEXT,
  BUTTONS,
  BUTTON_CONTAINER,
  BUTTON,
} = CLASS_NAMES;

/*
 * Append both the modal and
 * the dark overlay to the document
 */
const injectMarkup = (): void => {
  const modal = stringToNode(modalMarkup);
  const overlay = stringToNode(overlayMarkup);

  document.body.appendChild(modal);
  document.body.appendChild(overlay);
};

const SUPPORTED_TYPES = [
  'error',
  'warning',
  'info',
];

let classMarkupDict: any = {};
classMarkupDict[ICON] = iconMarkup;
classMarkupDict[MODAL_TITLE] = titleMarkup;
classMarkupDict[MODAL_TEXT] = textMarkup;
classMarkupDict[BUTTONS] = buttonsMarkup;

const injectElIntoModal = (className: string): Node => {
  const modal: Element = getNode(MODAL);
  const markup: string = classMarkupDict[className];
  const el: Node = stringToNode(markup);

  modal.appendChild(el);

  return el;
};

/*
 * This gets the node for title, text, icon... etc.
 * If it doesn't exist yet, it will create it:
 */
const getElInModal = (className: string): Node => {
  let el: Node = getNode(className);

  if (!el) {
    el = injectElIntoModal(className);
  }

  return el;
};

const initIcon = (type: string): void => {
  if (type) {
    let iconEl: any = getElInModal(ICON);
    const iconTypeClass: string = `${ICON}--${type}`;
    iconEl.classList.add(iconTypeClass);

    const iconContent = stringToNode(errorIcon());
    iconEl.appendChild(iconContent);
  }
};

const initTitle = (title: string): void => {
  const titleEl: Node = getElInModal(MODAL_TITLE);

  titleEl.textContent = title;
};

const initText = (text: string): void => {
  if (text) {
    const textEl: Node = getElInModal(MODAL_TEXT);
    textEl.textContent = text;
  }
};

export const onButtonClick = (value: string|Boolean): void => {
  closeModal();

  state.promise.resolve(value);
};

const getButton = (namespace: string, { text, value }: ButtonOptions): Node => {
  const buttonContainer: any = stringToNode(buttonMarkup);

  const buttonEl: Element = buttonContainer.querySelector(`.${BUTTON}`);

  const btnNamespaceClass = `${BUTTON}--${namespace}`;
  buttonEl.classList.add(btnNamespaceClass);
  buttonEl.textContent = text;

  buttonEl.addEventListener('click', () => {
    return onButtonClick(value);
  });

  return buttonContainer;
};

const initButtons = (buttons: ButtonList): void => {
  if (!buttons) return;

  const buttonListEl = getElInModal(BUTTONS);

  for (let key in buttons) {
    const buttonOpts: ButtonOptions = buttons[key];
    const buttonEl = getButton(key, buttonOpts);
    buttonListEl.appendChild(buttonEl);
  }
};

/*
 * It's important to run the following functions in this particular order,
 * so that the elements get appended one after the other.
 */
const initModalContent = (opts: SwalOptions): void => {
  // Start from scratch:
  const modal: Element = getNode(MODAL);
  modal.textContent = '';

  initIcon(opts.type);
  initTitle(opts.title);
  initText(opts.text);
  initButtons(opts.buttons);
};

export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    injectMarkup();
  }

  initModalContent(opts);
  //addEventListeners();
};

export default init;


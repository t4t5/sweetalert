import {
  stringToNode,
  insertAfter,
  removeNode,
} from './markup';

import modalMarkup, {
  modalText, 
} from './markup/modal';

import overlayMarkup from './markup/overlay';

import {
  errorIcon,
} from './markup/icons';

import CLASS_NAMES, { getNode } from './class-list';

import addEventListeners from './event-listeners';

import {
  SwalOptions,
} from './options';

const {
  MODAL,
  OVERLAY,
  ICON,
  MODAL_TITLE,
  MODAL_TEXT,
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

const setIcon = (): void => {
  const icon: Element = getNode(ICON);

  const iconTypeClass: string = `${ICON}--error`;
  icon.classList.add(iconTypeClass);

  const iconContent: string = errorIcon();
  icon.innerHTML = iconContent;
};

interface PromiseObj {
  resolve: Function,
  reject: Function,
};

const setTitle = (title: string): void => {
  const titleEl: Element = getNode(MODAL_TITLE);

  titleEl.innerHTML = title;
};

const injectTextEl = (): Node => {
  const titleEl: Element = getNode(MODAL_TITLE);
  const textEl: Node = stringToNode(modalText);

  insertAfter(textEl, titleEl);

  return textEl;
};

const initText = (text: string): void => {

  let textEl: Node = getNode(MODAL_TEXT);

  if (!textEl) {
    textEl = injectTextEl();
  }

  if (text) {
    textEl.textContent = text;
  } else {
    removeNode(textEl);
  }
};

export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    injectMarkup();
  }

  setIcon();
  setTitle(opts.title);
  initText(opts.text);
  addEventListeners();
};

export default init;


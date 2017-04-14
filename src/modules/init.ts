import markup from './markup';

import CLASS_NAMES, { getNode } from './class-list';

const {
  MODAL,
  OVERLAY,
  ICON,
} = CLASS_NAMES;

import {
  errorIcon,
} from './markup/icons';

import state from './state';

import addEventListeners from './event-listeners';

/*
 * Append both .sweet-overlay
 * and .sweet-alert to body:
 */
const injectMarkup = (): void => {
  const wrapper: Element = document.createElement('div');
  wrapper.innerHTML = markup;

  while (wrapper.firstChild) {
    let el: Node = wrapper.firstChild;
    document.body.appendChild(el);
  }
};

const setIcon = (): void => {
  const icon: Element = getNode(ICON);

  const iconTypeClass: string = `${ICON}--error`;
  icon.classList.add(iconTypeClass);

  const iconContent: string = errorIcon();
  icon.innerHTML = iconContent;
};

interface InitParams {
  promise: {
    resolve: Function,
    reject: Function,
  },
};

export const init = (params: InitParams): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    injectMarkup();
  }

  state.promise = params.promise;

  setIcon();
  addEventListeners();
};


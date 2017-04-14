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
const initMarkup = () => {
  let wrapper = document.createElement('div');
  wrapper.innerHTML = markup;

  while (wrapper.firstChild) {
    let el = wrapper.firstChild;
    document.body.appendChild(el);
  }
};

const setIcon = () => {
  const icon = getNode(ICON);

  const iconTypeClass = `${ICON}--error`;
  icon.classList.add(iconTypeClass);

  const iconContent = errorIcon();
  icon.innerHTML = iconContent;
};

interface InitParams {
  promise: {
    resolve: Function,
    reject: Function,
  },
};

export const init = (params:InitParams):void => {
  const modal = getNode(MODAL);

  if (!modal) {
    initMarkup();
  }

  state.promise = params.promise;

  setIcon();
  addEventListeners();
};


import markup from './markup';

import {
  MODAL,
  OVERLAY,
  getNode,
} from './class-list';

import {
  closeModal,
} from './swal-dom';

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

const addModalEvents = () => {
  const overlay = getNode(OVERLAY);
  overlay.addEventListener('click', closeModal);
};

export const init = () => {
  const modal = getNode(MODAL);

  if (!modal) {
    initMarkup();
  }

  addModalEvents();
};


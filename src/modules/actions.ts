import CLASS_NAMES, { getNode } from './class-list';

const {
  MODAL,
  SHOW_MODAL,
} = CLASS_NAMES;

import state from './state';

export const openModal = () => {
  let modal = getNode(MODAL);
  modal.classList.add(SHOW_MODAL); 

  state.isOpen = true;
};

export const closeModal = () => {
  let modal = getNode(MODAL);
  modal.classList.remove(SHOW_MODAL); 

  state.isOpen = false;
};

export const onConfirm = () => {
  closeModal();

  state.promise.resolve(true);
};

export const onCancel = () => {
  closeModal();

  state.promise.resolve(false);
};


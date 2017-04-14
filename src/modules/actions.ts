import CLASS_NAMES, { getNode } from './class-list';

const {
  MODAL,
  SHOW_MODAL,
} = CLASS_NAMES;

import state from './state';

export const openModal = (): void => {
  let modal = getNode(MODAL);
  modal.classList.add(SHOW_MODAL); 

  state.isOpen = true;
};

export const closeModal = (): void => {
  let modal = getNode(MODAL);
  modal.classList.remove(SHOW_MODAL); 

  state.isOpen = false;
};

export const onConfirm = (): void => {
  closeModal();

  state.promise.resolve(true);
};

export const onCancel = (): void => {
  closeModal();

  state.promise.resolve(false);
};


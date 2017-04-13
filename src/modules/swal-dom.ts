import {
  MODAL,
  SHOW_MODAL,
  getNode,
} from './class-list';

export const openModal = () => {
  let modal = getNode(MODAL);

  modal.classList.add(SHOW_MODAL); 
};

export const closeModal = () => {
  let modal = getNode(MODAL);

  modal.classList.remove(SHOW_MODAL); 
};


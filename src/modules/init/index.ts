import { getNode } from '../utils';
import { SwalOptions } from '../options';

import CLASS_NAMES from '../class-list';
const { MODAL } = CLASS_NAMES;

import initModal, { initModalContent } from './modal';
import initOverlay from './overlay';
import addEventListeners from '../event-listeners';

/*
 * Inject modal and overlay into the DOM
 * Then format the modal according to the given opts
 */
export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    initModal();
    initOverlay();
  }

  initModalContent(opts);
  addEventListeners();
};

export default init;


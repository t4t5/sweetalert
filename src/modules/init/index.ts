import { getNode } from '../utils';
import { SwalOptions } from '../options';

import CLASS_NAMES from '../class-list';
const { MODAL } = CLASS_NAMES;

import initModal, { initModalContent } from './modal';
import initOverlay from './overlay';

export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    initModal();
    initOverlay();
  }

  initModalContent(opts);
};

export default init;


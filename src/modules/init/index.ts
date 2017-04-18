import { getNode } from '../utils';
import { SwalOptions } from '../options';

import CLASS_NAMES from '../class-list';
const { MODAL } = CLASS_NAMES;

import initModalOnce, {
  initModalContent,
} from './modal';

import initOverlayOnce from './overlay';
import addEventListeners from '../event-listeners';

/*
 * Inject modal and overlay into the DOM
 * Then format the modal according to the given opts
 */
export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    initModalOnce();
    initOverlayOnce();
  }

  initModalContent(opts);
  addEventListeners();
};

export default init;


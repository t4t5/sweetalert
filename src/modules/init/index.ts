import { getNode } from '../utils';
import { SwalOptions } from '../options';

import CLASS_NAMES from '../class-list';
const { MODAL } = CLASS_NAMES;

import initModalOnce, {
  initModalContent,
} from './modal';

import initOverlayOnce from './overlay';
import addEventListeners from '../event-listeners';
import { throwErr } from '../utils';

/*
 * Inject modal and overlay into the DOM
 * Then format the modal according to the given opts
 */
export const init = (opts: SwalOptions): void => {
  const modal: Element = getNode(MODAL);

  if (!modal) {
    if (!document.body) {
      throwErr("You can only use SweetAlert AFTER the DOM has loaded!");
    }

    initOverlayOnce();
    initModalOnce();
  }

  initModalContent(opts);
  addEventListeners(opts);
};

export default init;


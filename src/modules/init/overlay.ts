import { stringToNode } from '../utils';
import { overlayMarkup } from '../markup';

import state from '../state';
import { closeModal } from '../actions';

const onOverlayClick = (): void => {
  closeModal();

  state.promise.resolve(null);
};

const initOverlayOnce = (): void => {
  const overlay = stringToNode(overlayMarkup);

  overlay.addEventListener('click', () => {
    return onOverlayClick();
  });

  document.body.appendChild(overlay);
};

export default initOverlayOnce;

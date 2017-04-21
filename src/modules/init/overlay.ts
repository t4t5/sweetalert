import { stringToNode } from '../utils';
import { overlayMarkup } from '../markup';

import { onAction } from '../actions';

const initOverlayOnce = (): void => {
  const overlay = stringToNode(overlayMarkup);

  overlay.addEventListener('click', () => {
    return onAction('cancel');
  });

  document.body.appendChild(overlay);
};

export default initOverlayOnce;

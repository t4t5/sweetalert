import { stringToNode } from '../utils';
import { overlayMarkup } from '../markup';

const initOverlayOnce = (): void => {
  const overlay = stringToNode(overlayMarkup);

  document.body.appendChild(overlay);
};

export default initOverlayOnce;

import { stringToNode } from '../utils';
import { injectElIntoModal } from './modal';

import {
  iconMarkup,
  errorIconMarkup,
} from '../markup';

import CLASS_NAMES from '../class-list';
const { ICON } = CLASS_NAMES;

/*
const SUPPORTED_TYPES = [
  'error',
  'warning',
  'info',
];
 */

const initIcon = (type: string): void => {
  if (type) {
    let iconEl: any = injectElIntoModal(iconMarkup);
    const iconTypeClass: string = `${ICON}--${type}`;
    iconEl.classList.add(iconTypeClass);

    const iconContent = stringToNode(errorIconMarkup());
    iconEl.appendChild(iconContent);
  }
};

export default initIcon;


//import { stringToNode } from '../utils';
import { injectElIntoModal } from './modal';

import {
  iconMarkup,
  errorIconMarkup,
  warningIconMarkup,
  successIconMarkup,
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

const ICON_CONTENTS: any = {
  error: errorIconMarkup(),
  warning: warningIconMarkup(),
  success: successIconMarkup(),
}

const initIcon = (type: string): void => {
  if (type) {
    let iconEl: any = injectElIntoModal(iconMarkup);
    const iconTypeClass: string = `${ICON}--${type}`;
    iconEl.classList.add(iconTypeClass);

    const iconContent: string = ICON_CONTENTS[type];

    if (iconContent) {
      iconEl.innerHTML = iconContent;
    }
  }
};

export default initIcon;


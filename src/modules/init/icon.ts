//import { stringToNode } from '../utils';
import { injectElIntoModal } from './modal';

import {
  iconMarkup,
  errorIconMarkup,
  warningIconMarkup,
  successIconMarkup,
} from '../markup';

import CLASS_NAMES from '../class-list';
const { ICON, ICON_CUSTOM } = CLASS_NAMES;

const PREDEFINED_ICONS: string[] = ["error", "warning", "success", "info"];

const ICON_CONTENTS: any = {
  error: errorIconMarkup(),
  warning: warningIconMarkup(),
  success: successIconMarkup(),
}

/*
 * Set the warning, error, success or info icons:
 */
const initPredefinedIcon = (type: string, iconEl: Element): void => {
  const iconTypeClass: string = `${ICON}--${type}`;
  iconEl.classList.add(iconTypeClass);

  const iconContent: string = ICON_CONTENTS[type];

  if (iconContent) {
    iconEl.innerHTML = iconContent;
  }
};

const initImageURL = (url: string, iconEl: Element): void => {
  iconEl.classList.add(ICON_CUSTOM);

  let img = document.createElement('img');
  img.src = url;

  iconEl.appendChild(img);
};

const initIcon = (str: string): void => {
  if (!str) return;

  let iconEl: Element = injectElIntoModal(iconMarkup);

  if (PREDEFINED_ICONS.includes(str)) {
    initPredefinedIcon(str, iconEl);
  } else {
    initImageURL(str, iconEl);
  }

};

export default initIcon;


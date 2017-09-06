export * from './modal';

export {
  default as overlayMarkup
} from './overlay';

export * from './icons';

export * from './content';

export * from './buttons';

import CLASS_NAMES from '../class-list';

const {
  MODAL_TITLE,
  MODAL_TEXT,
  ICON,
  FOOTER,
} = CLASS_NAMES;

export const iconMarkup: string = `
  <div class="${ICON}"></div>`
;

export const titleMarkup: string = `
  <div class="${MODAL_TITLE}"></div>
`;

export const textMarkup: string = `
  <div class="${MODAL_TEXT}"></div>`
;

export const footerMarkup: string = `
  <div class="${FOOTER}"></div>
`;



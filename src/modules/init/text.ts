import {
  titleMarkup,
  textMarkup,
} from '../markup';

import { injectElIntoModal } from './modal';

export const initTitle = (title: string): void => {
  if (title) {
    const titleEl: Node = injectElIntoModal(titleMarkup);
    titleEl.textContent = title;
  }
};

export const initText = (text: string): void => {
  if (text) {
    const textEl: Node = injectElIntoModal(textMarkup);
    textEl.textContent = text;
  }
};


import { stringToNode, getNode } from '../utils';
import { modalMarkup } from '../markup';
import { SwalOptions } from '../options';

import CLASS_NAMES from '../class-list';
const { MODAL } = CLASS_NAMES;

import initIcon from './icon';
import { initTitle, initText } from './text';
import initButtons from './buttons';

export const injectElIntoModal = (markup: string): Node => {
  const modal: Element = getNode(MODAL);
  const el: Node = stringToNode(markup);

  modal.appendChild(el);

  return el;
};

/*
 * It's important to run the following functions in this particular order,
 * so that the elements get appended one after the other.
 */
export const initModalContent = (opts: SwalOptions): void => {
  // Start from scratch:
  const modal: Element = getNode(MODAL);
  modal.textContent = '';

  initIcon(opts.icon);
  initTitle(opts.title);
  initText(opts.text);
  initButtons(opts.buttons);
};

const initModal = (): void => {
  const modal = stringToNode(modalMarkup);

  document.body.appendChild(modal);
};

export default initModal;


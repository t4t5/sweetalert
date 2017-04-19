import { stringToNode } from '../utils';
import { injectElIntoModal } from './modal';

import CLASS_NAMES from '../class-list';
const { BUTTON } = CLASS_NAMES;

import { ButtonList, ButtonOptions } from '../options/buttons';
import { buttonListMarkup, buttonMarkup } from '../markup';

import { closeModal } from '../actions';
import state from '../state';

const onButtonClick = (value: string|Boolean): void => {
  closeModal();

  state.promise.resolve(value);
};

/*
 * Generate a button, with a container element,
 * the right class names, the text, and an event listener.
 */
const getButton = (namespace: string, { 
  text, 
  value, 
  class: customClass,
}: ButtonOptions): Node => {
  const buttonContainer: any = stringToNode(buttonMarkup);

  const buttonEl: HTMLElement = buttonContainer.querySelector(`.${BUTTON}`);

  const btnNamespaceClass = `${BUTTON}--${namespace}`;
  buttonEl.classList.add(btnNamespaceClass);

  if (customClass) {
    buttonEl.classList.add(customClass);
  }

  buttonEl.textContent = text;

  buttonEl.addEventListener('click', () => {
    return onButtonClick(value);
  });

  return buttonContainer;
};

/*
 * Create the buttons-container,
 * then loop through the ButtonList object
 * and append every button to it.
 */
const initButtons = (buttons: ButtonList): void => {
  if (!buttons) return;

  const buttonListEl: Node = injectElIntoModal(buttonListMarkup);

  for (let key in buttons) {
    const buttonOpts: ButtonOptions = buttons[key];
    const buttonEl: Node = getButton(key, buttonOpts);

    if (buttonOpts.visible) {
      buttonListEl.appendChild(buttonEl);
    }
  }
};

export default initButtons;


import state from './state';
import { closeModal } from './actions';

import { getNode } from './utils';

import CLASS_NAMES from './class-list';
const { MODAL, BUTTON } = CLASS_NAMES;

const onEscape = (e: KeyboardEvent): void => {
  closeModal(); 

  state.promise.resolve(null);
};

const onTabAwayLastButton = (e: KeyboardEvent): void => {
  e.preventDefault();
  setButtonFocus();
};

const onTabBackFirstButton = (e: KeyboardEvent): void => {
  e.preventDefault();
  setLastButtonFocus();
};

const onKeyUp = (e: KeyboardEvent):void => {
  if (!state.isOpen) return;

  switch (e.key) {
    case "Escape": return onEscape(e);
  }
};

const onKeyDownLastButton = (e: KeyboardEvent): void => {
  if (!state.isOpen) return;

  switch (e.key) {
    case "Tab": return onTabAwayLastButton(e);
  }
};

const onKeyDownFirstButton = (e: KeyboardEvent): void => {
  if (!state.isOpen) return;

  if (e.key === "Tab" && e.shiftKey) {
    return onTabBackFirstButton(e);
  }
};


/*
 * Set default focus on Confirm-button
 */
const setButtonFocus = (): void => {
  const modal: HTMLElement = getNode(MODAL);

  const button:HTMLElement = <HTMLElement>modal.querySelector('.swal-button');

  if (button) {
    button.tabIndex = 0;
    button.focus();
  }
};

const setLastButtonFocus = (): void => {
  const modal: HTMLElement = getNode(MODAL);

  const buttons: NodeListOf<Element> = modal.querySelectorAll(`.${BUTTON}`);

  const lastIndex: number = buttons.length - 1;
  const lastButton: any = buttons[lastIndex];

  lastButton.focus();
};

const setTabbingForLastButton = (buttons: NodeListOf<Element>): void => {
  const lastIndex: number = buttons.length - 1;
  const lastButton: Element = buttons[lastIndex];

  lastButton.addEventListener('keydown', onKeyDownLastButton);
};

const setTabbingForFirstButton = (buttons: NodeListOf<Element>): void => {
  const firstButton: Element = buttons[0];

  firstButton.addEventListener('keydown', onKeyDownFirstButton);
};

const setButtonTabbing = (): void => {
  const modal: HTMLElement = getNode(MODAL);

  const buttons: NodeListOf<Element> = modal.querySelectorAll(`.${BUTTON}`);

  if (!buttons.length) return;

  setTabbingForLastButton(buttons);
  setTabbingForFirstButton(buttons);
};

const addEventListeners = ():void => {
  document.addEventListener('keyup', onKeyUp);
  setButtonFocus();
  setButtonTabbing();
};

export default addEventListeners;


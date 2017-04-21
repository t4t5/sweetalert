import state from './state';
import { onAction } from './actions';
import { getNode } from './utils';
import { SwalOptions } from './options';

import CLASS_NAMES from './class-list';
const { MODAL, BUTTON, OVERLAY } = CLASS_NAMES;

const onTabAwayLastButton = (e: KeyboardEvent): void => {
  e.preventDefault();
  setFirstButtonFocus();
};

const onTabBackFirstButton = (e: KeyboardEvent): void => {
  e.preventDefault();
  setLastButtonFocus();
};

const onKeyUp = (e: KeyboardEvent):void => {
  if (!state.isOpen) return;

  switch (e.key) {
    case "Escape": return onAction('cancel');
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
const setFirstButtonFocus = (): void => {
  const button:HTMLElement = getNode(BUTTON);

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

const setClickOutside = (allow: Boolean): void => {
  if (allow) {
    const overlay: HTMLElement = getNode(OVERLAY);

    overlay.addEventListener('click', () => {
      return onAction('cancel');
    });
  }
};

const addEventListeners = (opts: SwalOptions):void => {
  document.addEventListener('keyup', onKeyUp);

  /* So that you don't accidentally confirm something
   * dangerous by clicking enter
   */
  if (opts.dangerMode) {
    setFirstButtonFocus();
  } else {
    setLastButtonFocus();
  }

  setButtonTabbing();
  setClickOutside(opts.clickOutside);
};

export default addEventListeners;


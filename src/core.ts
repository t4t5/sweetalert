/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

import init from './modules/init';

import {
  openModal,
  onAction,
  getState,
} from './modules/actions';

import state, { setValueFor, SwalState } from './modules/state';

import {
  SwalOptions,
  getOpts,
} from './modules/options';

export type SwalParams = (string|object)[];

interface SweetAlert {
  (...params: SwalParams): object,
  close? (namespace: string): void,
  getState? (): SwalState,
  setValueFor? (buttonKey: string, value: any): void,
};

const swal:SweetAlert = (...args) => {

  const opts: SwalOptions = getOpts(...args);

  // TODO! Check the user's defaults (use state)

  return new Promise((resolve, reject) => {
    state.promise = { resolve, reject };

    init(opts);

    // For fade animation to work:
    setTimeout(() => {
      openModal();
    });

  });
};

swal.close = onAction;
swal.getState = getState;
swal.setValueFor = setValueFor;

export default swal;


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
  stopLoading,
} from './modules/actions';

import state, {
  setActionValue,
  ActionOptions,
  SwalState,
} from './modules/state';

import {
  SwalOptions,
  getOpts,
  setDefaults,
} from './modules/options';

export type SwalParams = (string|Partial<SwalOptions>)[];

export interface SweetAlert {
  (...params: SwalParams): Promise<any>,
  close? (namespace?: string): void,
  getState? (): SwalState,
  setActionValue? (opts: string|ActionOptions): void,
  stopLoading? (): void,
  setDefaults? (opts: object): void,
};

const swal:SweetAlert = (...args) => {

  // Prevent library to be run in Node env:
  if (typeof window === 'undefined') return;

  const opts: SwalOptions = getOpts(...args);

  return new Promise<any>((resolve, reject) => {
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
swal.setActionValue = setActionValue;
swal.stopLoading = stopLoading;
swal.setDefaults = setDefaults;

export default swal;

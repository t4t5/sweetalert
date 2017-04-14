/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

import init from './modules/init';

import {
  openModal,
  closeModal,
} from './modules/actions';

import state from './modules/state';

import {
  SwalOptions,
  getOpts,
} from './modules/options';

export type SwalParams = (string|object)[];

interface SweetAlert {
  (...params: SwalParams): object,
  open?: Function,
  close?: Function,
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

swal.open = openModal;
swal.close = closeModal;

export default swal;


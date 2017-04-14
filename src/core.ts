/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

import { init } from './modules/init';

import {
  openModal,
  closeModal,
} from './modules/actions';

interface SweetAlert {
  (param: string|object, text: string, type: string): object,
  open?: Function,
  close?: Function,
};

const swal:SweetAlert = (param: string|object, text: string, type: string) => {

  return new Promise((resolve, reject) => {

    let promise = { resolve, reject };

    init({
      promise,
    });

    // For fade animation to work:
    setTimeout(() => {
      openModal();
    });

  });
};

swal.open = openModal;
swal.close = closeModal;

export default swal;


/*
 * SweetAlert
 * 2014-2017 – Tristan Edwards
 * https://github.com/t4t5/sweetalert
 */

import { init } from './modules/init';

import {
  openModal,
  closeModal,
} from './modules/swal-dom';

class swal {

  constructor(name: string) {
    init();

    // For fade animation to work:
    setTimeout(() => {
      openModal();
    });
  }

  static open() {
    openModal();
  }

  static close() {
    closeModal();
  }
  
};

export default swal;


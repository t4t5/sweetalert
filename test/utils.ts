export const swal = require('../dist/sweetalert.min');

export const $ = require('jquery');

export const removeSwal = () => $('.swal-overlay').remove();

export const $$ = (className) => $(`.${className}`);

export { CLASS_NAMES } from '../src/modules/class-list';

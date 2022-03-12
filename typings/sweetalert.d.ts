import swal, { SweetAlert } from "./core";

declare global {
  const _swal_: SweetAlert;
  const sweetAlert: SweetAlert;
}

export default swal;
export as namespace swal;

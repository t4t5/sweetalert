import swal, { SweetAlert } from "./core";

declare global {
  const swal: SweetAlert;
  const sweetAlert: SweetAlert;
}

export default swal;
export as namespace swal;

import { SweetAlert } from "./core";

declare global {
  const sweetAlert: SweetAlert;
}
declare const swal: SweetAlert;
export default swal;
export as namespace swal;

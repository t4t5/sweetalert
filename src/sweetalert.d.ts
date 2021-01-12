import swal, { SweetAlert } from "./core";

declare global {
const swal: typeof swal;
const sweetAlert: SweetAlert;
}

export default swal;
export as namespace swal;

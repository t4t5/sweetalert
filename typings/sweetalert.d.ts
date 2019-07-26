import swal, { SweetAlert } from "./core";

declare global { 
  const sweetAlert: SweetAlert;
}

export default swal;
export as namespace swal;

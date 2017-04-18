export interface SwalState {
  isOpen: Boolean,
  promise: {
    resolve?: Function,
    reject?: Function,
  },
};

let state:SwalState = {
  isOpen: false,
  promise: null,
};

export default state;


export interface SwalState {
  isOpen: Boolean,
  promise: {
    resolve?: Function,
    reject?: Function,
  },
  values: any,
};

let state:SwalState = {
  isOpen: false,
  promise: null,
  values: {},
};

/*
 * Change what the promise resolves to when the user clicks the button.
 * This is called internally when using { input: true } for example.
 */
export const setValueFor = (buttonKey: string, value: object) => {
  state.values[buttonKey] = value;
};

export default state;


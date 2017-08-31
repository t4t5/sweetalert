export interface SwalState {
  isOpen: boolean,
  promise: {
    resolve?: Function,
    reject?: Function,
  },
  //values: any,
  actions: any,
};

const defaultState: SwalState = {
  isOpen: false,
  promise: null,
  actions: {},
};

let state: SwalState = Object.assign({}, defaultState);

export const resetState = (): void => {
  state = Object.assign({}, defaultState);
}

/*
 * Change what the promise resolves to when the user clicks the button.
 * This is called internally when using { input: true } for example.
 */
export const setValueFor = (buttonKey: string, value: any) => {
  if (!state.actions[buttonKey]) {
    state.actions[buttonKey] = {};
  }

  Object.assign(state.actions[buttonKey], {
    value,
  });
};

/*
 * Sets other button options, e.g.
 * whether the button should close the modal or not
 */
export const setActionOptionsFor = (buttonKey: string, {
  closeModal = true,
} = {}) => {
  Object.assign(state.actions[buttonKey], {
    closeModal,
  });
};

export default state;


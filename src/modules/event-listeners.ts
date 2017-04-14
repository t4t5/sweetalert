import CLASS_NAMES, { getNode } from './class-list';

const {
  MODAL,
  OVERLAY,
  ICON,
  CONFIRM_BUTTON,
  CANCEL_BUTTON,
} = CLASS_NAMES;

import {
  onConfirm,
  onCancel,
} from './actions';

const addEventListeners = () => {
  const overlay = getNode(OVERLAY);
  overlay.addEventListener('click', onCancel);

  console.log(CLASS_NAMES);

  const confirmBtn = getNode(CONFIRM_BUTTON);
  const cancelBtn = getNode(CANCEL_BUTTON);

  confirmBtn.addEventListener('click', onConfirm);
  cancelBtn.addEventListener('click', onCancel);
};

export default addEventListeners;


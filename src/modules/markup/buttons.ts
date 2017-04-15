import CLASS_NAMES from '../class-list';

const {
  BUTTON_CONTAINER,
  BUTTON,
} = CLASS_NAMES;

export const buttonMarkup: string = `
  <div class="${BUTTON_CONTAINER}">
    <button
      class="${BUTTON}"
    ></button>
  </div>
`;

/*
export const cancelButton: string = `
  <button 
    class="
      ${BUTTON} 
      ${BUTTON}--cancel
    "
    tabIndex="2"
  >
    Cancel
  </button>
`;

export const confirmButton: string = `
  <div 
    class="swal-confirm-button-container"
  >
  
    <button 
      class="
        ${BUTTON}
        ${BUTTON}--confirm
      "
      tabIndex="1"
    >
      OK
    </button>` + 

    // Loading animation
    `<div class="la-ball-fall">
      <div></div>
      <div></div>
      <div></div>
    </div>

  </div>
`;
 */


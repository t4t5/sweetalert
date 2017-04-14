import CLASS_NAMES from '../class-list';

const {
  BUTTON,
} = CLASS_NAMES;

export const cancelButton = `
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

export const confirmButton = `
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


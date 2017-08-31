import CLASS_NAMES from '../class-list';

const {
  BUTTON_CONTAINER,
  BUTTON,
  BUTTON_LOADER,
} = CLASS_NAMES;

export const buttonMarkup: string = `
  <div class="${BUTTON_CONTAINER}">

    <button
      class="${BUTTON}"
    ></button>

    <div class="${BUTTON_LOADER}">
      <div></div>
      <div></div>
      <div></div>
    </div>

  </div>
`;


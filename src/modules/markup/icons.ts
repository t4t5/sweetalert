import CLASS_NAMES from '../class-list';

const { ICON } = CLASS_NAMES;

export const errorIconMarkup = (): string => {
  const icon = `${ICON}--error`;
  const line = `${icon}__line`;

  const markup = `
    <div class="${icon}__x-mark">
      <span class="${line} ${line}--left"></span>
      <span class="${line} ${line}--right"></span>
    </div>
  `;

  return markup;
}

export const warningIconMarkup = (): string => {
  const icon = `${ICON}--warning`;

  return `
    <span class="${icon}__body">
      <span class="${icon}__dot"></span>
    </span>
  `;
};

export const successIconMarkup = (): string => {
  const icon = `${ICON}--success`;

  return `
    <span class="${icon}__line ${icon}__line--long"></span>
    <span class="${icon}__line ${icon}__line--tip"></span>

    <div class="${icon}__ring"></div>
    <div class="${icon}__hide-corners"></div>
  `;
};

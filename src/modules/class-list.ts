/*
 * List of class names that we
 * use throughout the library to
 * manipulate the DOM.
 */

export const MODAL = 'sweet-alert';
export const OVERLAY = 'sweet-overlay';

export const SHOW_MODAL = `${MODAL}--show`;

/*
 * Get a DOM element from a class name:
 */
export const getNode = (className: string) => {
  const selector = `.${className}`;

  return document.querySelector(selector);
};


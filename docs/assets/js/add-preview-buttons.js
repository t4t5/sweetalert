/*
 * In our Markdown files, we have some <preview-button /> tags.
 * We want to transform these into button.preview,
 * which onclick will run the JS code right above them!
 */

const previewPlaceholders = document.querySelectorAll('preview-button');

const createButton = placeholder => {
  let button = document.createElement('button');
  button.className = "preview";
  button.innerText = "Preview";

  // Add button right above placeholder
  placeholder.parentNode.insertBefore(button, placeholder)

  return button;
};

const getCode = placeholder => {
  const highlightEl = placeholder.parentNode.previousSibling.previousSibling;
  const code = highlightEl.innerText.trim();

  return code;
};

previewPlaceholders.forEach((placeholder) => {

  const code = getCode(placeholder);
  const button = createButton(placeholder);
  const givenFunction = placeholder.dataset.function;

  /*
   * If there's a specified data-function on <preview-button>, call that.
   * Othwerwise, just use the code from the highlightjs above it:
   */
  button.addEventListener('click', () => {
    if (givenFunction) {
      window[givenFunction]();
    } else {
      eval(code);
    }
  });

  placeholder.remove();
});


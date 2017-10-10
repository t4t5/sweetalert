const Babel = require('babel-standalone');

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

const getCodeEl = placeholder => {
  return placeholder.parentNode.previousSibling.previousSibling;
};

const getCode = highlightEl => highlightEl.innerText.trim();

const resetStyles = () => {
  const swalOverlay = document.querySelector('.swal-overlay');
  const allSwalEls = swalOverlay.querySelectorAll('*');

  swalOverlay.removeAttribute('style');

  allSwalEls.forEach((el) => {
    el.removeAttribute('style');
  });
};

const setStyles = (code) => {
  const array = code.split(/[{}]/g);
  const selector = array[0].trim();

  const el = document.querySelector(selector);

  let css = array[1].trim();
  css = css.replace(/\s+/g, ' ');
  css = css.replace(/;\s?/g, '; ');
  css = css.replace(/:\s?/g, ': ');

  el.style.cssText = css;
};

previewPlaceholders.forEach((placeholder) => {
  const highlightEl = getCodeEl(placeholder);
  const code = getCode(highlightEl);

  const button = createButton(placeholder);
  const givenFunction = placeholder.dataset.function;

  let lang = highlightEl.classList[1];

  /*
   * If there's a specified data-function on <preview-button>, call that.
   * Othwerwise, just use the code from the highlightjs above it:
   */
  button.addEventListener('click', () => {
    if (givenFunction) {
      window[givenFunction]();
    } else if (lang === "css") {
      swal("Sweet!", "I like customizing!");
      resetStyles();
      setStyles(code);
    } else {
      const transpiledCode = Babel.transform(code, { presets: ['es2015'] }).code;
      eval(transpiledCode);
    }
  });

  placeholder.remove();
});


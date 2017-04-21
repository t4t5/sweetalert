import { stringToNode } from '../utils';
import { ContentOptions } from '../options/content';
import { injectElIntoModal } from './modal';
import { contentMarkup, inputMarkup } from '../markup';
import { setValueFor } from '../state';
import { onAction } from '../actions';

/*
 * Add an <input> to the content container.
 * Update the "promised" value of the confirm button whenever
 * the user types into the input (+ make it "" by default)
 * Set the default focus on the input.
 */
const addInputToContent = (content: Node, { placeholder }: ContentOptions): void => {
  const input: HTMLInputElement = stringToNode(inputMarkup) as HTMLInputElement;

  input.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const text = target.value;
    setValueFor('confirm', text);
  });

  input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
      return onAction('confirm');
    }
  });

  if (placeholder) {
    input.placeholder = placeholder;
  }

  content.appendChild(input);

  /*
   * FIXME (this is a bit hacky)
   * We're overwriting the default value of confirm button,
   * as well as overwriting the default focus on the button
   */
  setTimeout(() => {
    input.focus();
    setValueFor('confirm', '');
  }, 0);

};

const initContent = (opts: ContentOptions): void => {
  if (!opts) return;

  const content: Node = injectElIntoModal(contentMarkup);

  const { type, node } = opts;

  switch (type) {
    case 'input':
      addInputToContent(content, opts);
      break;

    case 'node':
      content.appendChild(node);
      break;
  }
};

export default initContent;


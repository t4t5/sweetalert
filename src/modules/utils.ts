/*
 * Get a DOM element from a class name:
 */
export const getNode = (className: string): HTMLElement => {
  const selector = `.${className}`;

  return <HTMLElement>document.querySelector(selector);
};

export const stringToNode = (html: string): Node => {
  let wrapper: Element = document.createElement('div');
  wrapper.innerHTML = html.trim();

  return wrapper.firstChild;
};

export const insertAfter = (newNode: Node, referenceNode: Node) => {
  let nextNode = referenceNode.nextSibling;
  let parentNode = referenceNode.parentNode;

  parentNode.insertBefore(newNode, nextNode);
};

export const removeNode = (node: Node) => {
  node.parentElement.removeChild(node);
};

export const throwErr = (message: string) => {
  // Remove multiple spaces:
  message = message.replace(/ +(?= )/g,'');
  message = message.trim();

  throw `SweetAlert: ${message}`;
};


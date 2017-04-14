import CLASS_NAMES from '../class-list';

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


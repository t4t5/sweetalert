import {
  isPlainObject,
} from '../utils';

export interface ContentOptions {
  type: string,
  node: Element,
  placeholder: string,
};

const defaultInputOptions: ContentOptions = {
  type: 'input',
  node: null,
  placeholder: "",
};

export const getContentOpts = (contentParam: string|object): ContentOptions => {
  let opts = <any>{};

  if (isPlainObject(contentParam)) {
    return Object.assign(opts, contentParam);
  }

  if (contentParam === 'input') {
    return defaultInputOptions;
  }

  return null;
};

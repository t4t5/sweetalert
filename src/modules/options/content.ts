import {
  isPlainObject,
} from '../utils';

export interface ContentOptions {
  element: string|Node,
  attributes?: object,
};

const defaultInputOptions: ContentOptions = {
  element: 'input',
  attributes: {
    placeholder: "",
  },
};

export const getContentOpts = (contentParam: string|object): ContentOptions => {
  let opts = <any>{};

  if (isPlainObject(contentParam)) {
    return Object.assign(opts, contentParam);
  }

  if (contentParam instanceof Element) {
    return {
      element: contentParam,
    };
  }

  if (contentParam === 'input') {
    return defaultInputOptions;
  }

  return null;
};

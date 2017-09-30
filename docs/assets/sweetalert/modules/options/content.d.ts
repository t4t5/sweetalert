export interface ContentOptions {
    element: string | Node;
    attributes?: object;
}
export declare const getContentOpts: (contentParam: string | object) => ContentOptions;

export interface ButtonOptions {
    visible: boolean;
    text: string;
    value: any;
    className: string;
    closeModal: boolean;
}
export interface ButtonList {
    [buttonNamespace: string]: ButtonOptions;
}
export declare const CONFIRM_KEY = "confirm";
export declare const CANCEL_KEY = "cancel";
export declare const defaultButtonList: ButtonList;
export declare const getButtonListOpts: (opts: string | boolean | object) => ButtonList;

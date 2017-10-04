export interface SwalState {
    isOpen: boolean;
    promise: {
        resolve?(value: string): void;
        reject?(): void;
    };
    actions: {
        [namespace: string]: {
            value?: string | any;
            closeModal?: boolean;
        };
    };
    timer: number;
}
export interface ActionOptions {
    [buttonNamespace: string]: {
        value?: string;
        closeModal?: boolean;
    };
}
declare let state: SwalState;
export declare const resetState: () => void;
export declare const setActionValue: (opts: string | ActionOptions) => void;
export declare const setActionOptionsFor: (buttonKey: string, {closeModal}?: {
    closeModal?: boolean;
}) => void;
export default state;

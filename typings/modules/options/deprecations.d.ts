export declare const logDeprecation: (name: string) => void;
export interface OptionReplacement {
    replacement?: string;
    onlyRename?: boolean;
    subOption?: string;
    link?: string;
}
export interface OptionReplacementsList {
    [name: string]: OptionReplacement;
}
export declare const DEPRECATED_OPTS: OptionReplacementsList;

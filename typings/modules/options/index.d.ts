import { ButtonList } from './buttons';
import { ContentOptions } from './content';
export interface SwalOptions {
    title: string;
    text: string;
    icon: string;
    buttons: ButtonList;
    content: ContentOptions;
    className: string;
    closeOnClickOutside: boolean;
    closeOnEsc: boolean;
    dangerMode: boolean;
    timer: number;
}
export declare const setDefaults: (opts: object) => void;
export declare const getOpts: (...params: (string | Partial<SwalOptions>)[]) => SwalOptions;

/**
 * @author WMXPY
 * @namespace URL
 * @description Declare
 */

import { URL_PROTOCOL } from "./enum";

export type URLLeanStructure = {

    readonly protocol: URL_PROTOCOL;
    readonly host: string[];
    readonly path: string[];
    readonly params: Record<string, string>;
};

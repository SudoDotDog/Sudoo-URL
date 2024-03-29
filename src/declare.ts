/**
 * @author WMXPY
 * @namespace URL
 * @description Declare
 */

import { URL_PROTOCOL } from "./enum";

export type URLLeanStructure = {

    readonly protocol: URL_PROTOCOL;
    readonly host: string[];
    readonly port: string | null;
    readonly path: string[];
    readonly hash: string[];
    readonly params: Record<string, string>;
};

/**
 * @author WMXPY
 * @namespace URL
 * @description Declare
 */

export type URLLeanStructure = {

    readonly protocol: string;
    readonly host: string[];
    readonly path: string[];
    readonly params: Record<string, string>;
};

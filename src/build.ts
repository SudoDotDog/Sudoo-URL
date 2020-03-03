/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 */

import { URLLeanStructure } from "./declare";

export const buildUrl = (structure: URLLeanStructure): string => {

    const builtHost: string = structure.host.join('.');
    const builtPath: string = structure.path.join('/');
    const builtParams: string = buildParams(structure.params);

    return `${structure.protocol}://${builtHost}/${builtPath}${builtParams}`;
};

export const buildParams = (params: Record<string, string>): string => {

    const keys: string[] = Object.keys(params);
    if (keys.length === 0) {
        return '';
    }

    const parsedParams: string = keys.map((key: string) => {
        return `${key}=${params[key]}`;
    }).join('&');

    return `?${parsedParams}`;
};

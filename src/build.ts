/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 */

import { URLLeanStructure } from "./declare";

export const buildUrl = (structure: URLLeanStructure): string => {

    const parsedParams: string = Object.keys(structure.params).map((key: string) => {
        return `${key}=${structure.params[key]}`;
    }).join('&');

    const builtHost: string = structure.host.join('.');
    const builtPath: string = structure.path.join('/');
    const builtParams: string = parsedParams.length > 0
        ? ('?' + parsedParams)
        : '';

    return `${structure.protocol}://${builtHost}/${builtPath}${builtParams}`;
};

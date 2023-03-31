/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 */

import { URLLeanStructure } from "./declare";

export const buildUrl = (structure: URLLeanStructure): string => {

    const builtHost: string = structure.host.join('.');
    const builtPath: string = buildPath(structure);
    const builtHash: string = buildHash(structure);
    const builtParams: string = buildParams(structure);

    return `${structure.protocol}://${builtHost}/${builtPath}${builtHash}${builtParams}`;
};

export const buildPath = (structure: URLLeanStructure): string => {

    const path: string[] = structure.path;
    if (path.length === 0) {
        return '';
    }

    const fixedPath: string[] = path.map(encodeURIComponent);
    return fixedPath.join('/');
};

export const buildHash = (structure: URLLeanStructure): string => {

    const hash: string[] = structure.hash;
    if (hash.length === 0) {
        return '';
    }

    const fixedHash: string[] = hash.map(encodeURIComponent);
    if (structure.path.length === 0) {
        return `#/${fixedHash.join('/')}`;
    }
    return `/#/${fixedHash.join('/')}`;
};

export const buildParams = (structure: URLLeanStructure): string => {

    const params: Record<string, string> = structure.params;
    const keys: string[] = Object.keys(params);
    if (keys.length === 0) {
        return '';
    }

    const parsedParams: string = keys.map((key: string) => {

        const fixedKey: string = encodeURIComponent(key);
        const fixedValue: string = encodeURIComponent(params[key]);

        return `${fixedKey}=${fixedValue}`;
    }).join('&');
    return `?${parsedParams}`;
};

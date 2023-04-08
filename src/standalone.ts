/**
 * @author WMXPY
 * @namespace URL
 * @description Standalone
 */

import { URLLeanStructure } from "./declare";

export const buildStandaloneHost = (structure: URLLeanStructure): string | null => {

    const host: string[] = structure.host;
    if (host.length === 0) {
        return null;
    }

    return host.map(encodeURIComponent).join('.');
};

export const buildStandalonePort = (structure: URLLeanStructure): string | null => {

    if (structure.port) {
        return encodeURIComponent(structure.port);
    }
    return null;
};

export const buildStandaloneHash = (structure: URLLeanStructure): string | null => {

    const hash: string[] = structure.hash;
    if (hash.length === 0) {
        return null;
    }

    const fixedHash: string[] = hash.map(encodeURIComponent);
    return fixedHash.join('/');
};

export const buildStandalonePath = (structure: URLLeanStructure): string | null => {

    const path: string[] = structure.path;
    if (path.length === 0) {
        return null;
    }

    const fixedPath: string[] = path.map(encodeURIComponent);
    return fixedPath.join('/');
};

export const buildStandaloneParams = (structure: URLLeanStructure): string | null => {

    const params: Record<string, string> = structure.params;
    const keys: string[] = Object.keys(params);
    if (keys.length === 0) {
        return null;
    }

    const parsedParams: string = keys.map((key: string) => {

        const fixedKey: string = encodeURIComponent(key);
        const fixedValue: string = encodeURIComponent(params[key]);

        return `${fixedKey}=${fixedValue}`;
    }).join('&');
    return parsedParams;
};

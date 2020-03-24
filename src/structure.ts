/**
 * @author WMXPY
 * @namespace URL
 * @description Structure
 */

import { buildUrl } from "./build";
import { URLLeanStructure } from "./declare";
import { URL_PROTOCOL } from "./enum";
import { parseUrl } from "./parse";

export class URLStructure {

    public static empty(): URLStructure {

        return new URLStructure();
    }

    public static create(protocol: URL_PROTOCOL, host: string[], path: string[], params: Record<string, string>): URLStructure {

        return new URLStructure(protocol, host, path, params);
    }

    public static generateUrl<T extends any[] = []>(func: (...args: T) => string, ...args: T): URLStructure {

        const url: string = func(...args);
        return this.fromUrl(url);
    }

    public static generateLean<T extends any[] = []>(func: (...args: T) => URLLeanStructure, ...args: T): URLStructure {

        const lean: URLLeanStructure = func(...args);
        return this.fromLean(lean);
    }

    public static fromUrl(url: string): URLStructure {

        const parsed: URLLeanStructure = parseUrl(url);
        return this.fromLean(parsed);
    }

    public static fromLean(lean: URLLeanStructure): URLStructure {

        return new URLStructure(lean.protocol, lean.host, lean.path, lean.params);
    }

    private readonly _protocol: URL_PROTOCOL;
    private readonly _host: string[];
    private readonly _path: string[];
    private readonly _params: Record<string, string>;

    private constructor(
        protocol: URL_PROTOCOL = URL_PROTOCOL.HTTPS,
        host: string[] = [],
        path: string[] = [],
        params: Record<string, string> = {},
    ) {

        this._protocol = protocol;
        this._host = host;
        this._path = path;
        this._params = params;
    }

    public build(): string {

        const lean: URLLeanStructure = this.flat();
        return buildUrl(lean);
    }

    public joinPath(...path: string[]): string {

        const lean: URLLeanStructure = this.flat();
        return buildUrl({
            ...lean,
            path: [
                ...lean.path,
                ...path,
            ],
        });
    }

    public flat(): URLLeanStructure {

        return {
            protocol: this._protocol,
            host: this._host,
            path: this._path,
            params: this._params,
        };
    }
}

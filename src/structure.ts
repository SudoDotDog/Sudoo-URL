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

    public static create(): URLStructure {

        return new URLStructure();
    }

    public static parse(url: string): URLStructure {

        const parsed: URLLeanStructure = parseUrl(url);
        return this.fromLean(parsed);
    }

    public static fromLean(lean: URLLeanStructure): URLStructure {

        return new URLStructure(lean.protocol, lean.host, lean.path, lean.params);
    }

    private _protocol: URL_PROTOCOL;
    private _host: string[];
    private _path: string[];
    private _params: Record<string, string>;

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

        return buildUrl(this.flat());
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

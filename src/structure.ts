/**
 * @author WMXPY
 * @namespace URL
 * @description Structure
 */

import { buildUrl } from "./build";
import { URLLeanStructure } from "./declare";
import { URL_PROTOCOL } from "./enum";

export class URLStructure {

    public static create(): URLStructure {

        return new URLStructure();
    }

    private _protocol: URL_PROTOCOL;
    private _host: string[];
    private _path: string[];
    private _params: Record<string, string>;

    private constructor() {

        this._protocol = URL_PROTOCOL.HTTPS;
        this._host = ['example', 'com'];
        this._path = [];
        this._params = {};
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

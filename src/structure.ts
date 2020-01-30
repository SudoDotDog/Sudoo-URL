/**
 * @author WMXPY
 * @namespace URL
 * @description Structure
 */

import { URLLeanStructure } from "./declare";

export class URLStructure {

    public static create(): URLStructure {

        return new URLStructure();
    }

    private _protocol: string = 'https';
    private _host: string[] = ['example', 'com'];
    private _path: string[] = [];
    private _params: Record<string, string> = {};

    private constructor() {

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

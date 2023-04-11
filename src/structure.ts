/**
 * @author WMXPY
 * @namespace URL
 * @description Structure
 */

import { buildUrl } from "./build";
import { URLLeanStructure } from "./declare";
import { URL_PROTOCOL } from "./enum";
import { parseUrl } from "./parse";
import { buildStandaloneHash, buildStandaloneHost, buildStandaloneParams, buildStandalonePath, buildStandalonePort } from "./standalone";

export class URLStructure {

    public static empty(): URLStructure {

        return new URLStructure(
            URL_PROTOCOL.UNKNOWN,
            [],
            null,
            [],
            [],
            {},
        );
    }

    public static create(
        protocol: URL_PROTOCOL,
        host: string[],
        port: string | null,
        path: string[],
        hash: string[],
        params: Record<string, string>,
    ): URLStructure {

        return new URLStructure(
            protocol,
            host,
            port,
            path,
            hash,
            params,
        );
    }

    public static generateUrl<T extends any[] = []>(
        func: (...argsArg: T) => string,
        ...args: T
    ): URLStructure {

        const url: string = func(...args);
        return this.fromUrl(url);
    }

    public static generateLean<T extends any[] = []>(
        func: (...argsArg: T) => URLLeanStructure,
        ...args: T
    ): URLStructure {

        const lean: URLLeanStructure = func(...args);
        return this.fromLean(lean);
    }

    public static fromUrl(url: string): URLStructure {

        const parsed: URLLeanStructure = parseUrl(url);
        return this.fromLean(parsed);
    }

    public static fromLean(lean: URLLeanStructure): URLStructure {

        return new URLStructure(
            lean.protocol,
            lean.host,
            lean.port,
            lean.path,
            lean.hash,
            lean.params,
        );
    }

    private readonly _protocol: URL_PROTOCOL;
    private readonly _host: string[];
    private readonly _port: string | null;
    private readonly _path: string[];
    private readonly _hash: string[];
    private readonly _params: Record<string, string>;

    private constructor(
        protocol: URL_PROTOCOL = URL_PROTOCOL.HTTPS,
        host: string[] = [],
        port: string | null,
        path: string[] = [],
        hash: string[] = [],
        params: Record<string, string> = {},
    ) {

        this._protocol = protocol;
        this._host = host;
        this._port = port;
        this._path = path;
        this._hash = hash;
        this._params = params;
    }

    public build(): string {
        return buildUrl(this.flat());
    }

    public buildHost(): string | null {
        return buildStandaloneHost(this.flat());
    }
    public buildPort(): string | null {
        return buildStandalonePort(this.flat());
    }
    public buildHash(): string | null {
        return buildStandaloneHash(this.flat());
    }
    public buildPath(): string | null {
        return buildStandalonePath(this.flat());
    }
    public buildParams(): string | null {
        return buildStandaloneParams(this.flat());
    }

    public replaceProtocol(protocol: URL_PROTOCOL): URLStructure {

        return URLStructure.fromLean({
            ...this.flat(),
            protocol,
        });
    }

    public joinPath(...path: string[]): URLStructure {

        const lean: URLLeanStructure = this.flat();
        return URLStructure.fromLean({
            ...lean,
            path: [
                ...lean.path,
                ...path,
            ],
        });
    }

    public replacePath(...path: string[]): URLStructure {

        return URLStructure.fromLean({
            ...this.flat(),
            path,
        });
    }

    public joinHash(...hash: string[]): URLStructure {

        const lean: URLLeanStructure = this.flat();
        return URLStructure.fromLean({
            ...lean,
            hash: [
                ...lean.hash,
                ...hash,
            ],
        });
    }

    public replaceHash(...hash: string[]): URLStructure {

        return URLStructure.fromLean({
            ...this.flat(),
            hash,
        });
    }

    public getParamOrNull(key: string): string | null {

        return this._params[key] ?? null;
    }

    public joinParams(params: Record<string, string>): URLStructure {

        const lean: URLLeanStructure = this.flat();
        return URLStructure.fromLean({
            ...lean,
            params: {
                ...lean.params,
                ...params,
            },
        });
    }

    public deleteParams(...keys: string[]): URLStructure {

        const lean: URLLeanStructure = this.flat();
        const params: Record<string, string> = { ...lean.params };

        for (const key of keys) {
            delete params[key];
        }
        return URLStructure.fromLean({
            ...lean,
            params,
        });
    }

    public replaceParams(params: Record<string, string>): URLStructure {

        return URLStructure.fromLean({
            ...this.flat(),
            params,
        });
    }

    public clone(): URLStructure {

        return URLStructure.fromLean(this.flat());
    }

    public flat(): URLLeanStructure {

        return {
            protocol: this._protocol,
            host: [...this._host],
            port: this._port,
            path: [...this._path],
            hash: [...this._hash],
            params: { ...this._params },
        };
    }
}

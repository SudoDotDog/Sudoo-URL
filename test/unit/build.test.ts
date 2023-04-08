/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { buildUrl, URLLeanStructure, URL_PROTOCOL } from "../../src";

describe('Given [Build] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('url-build');

    it('should be able to build simple url', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: [],
            hash: [],
            params: {},
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/`);
    });

    it('should be able to build with multi param', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: [],
            hash: [],
            params: {
                hello: 'world',
            },
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/?hello=world`);
    });

    it('should be able to build url with hash', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: [],
            hash: ['hello', 'world'],
            params: {},
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/#/hello/world`);
    });

    it('should be able to build url with hash and params', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: [],
            hash: ['hello', 'world'],
            params: {
                hello: 'world',
            },
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/#/hello/world?hello=world`);
    });

    it('should be able to build url with path and hash', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: ['a', 'b'],
            hash: ['hello', 'world'],
            params: {},
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/a/b/#/hello/world`);
    });

    it('should be able to build complex url', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: ['a', 'b'],
            hash: [],
            params: {
                hello: 'world',
                something: 'else',
            },
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/a/b?hello=world&something=else`);
    });

    it('should be able to build complex url with encoding', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            port: null,
            path: ['a/dd/d', 'b'],
            hash: ['hell©', 'world'],
            params: {
                hello: 'w©rld',
                something: 'el/se',
            },
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/a%2Fdd%2Fd/b/#/hell%C2%A9/world?hello=w%C2%A9rld&something=el%2Fse`);
    });
});

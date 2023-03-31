/**
 * @author WMXPY
 * @namespace URL
 * @description Parse
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { parseUrl, URLLeanStructure, URL_PROTOCOL } from "../../src";

describe('Given [Parse] Helper Functions', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('url-parse');

    it('should be able to parse base url', (): void => {

        const url: string = 'http://example.com/';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: [],
            hash: [],
            params: {},
        });
    });

    it('should be able to parse simple url', (): void => {

        const url: string = 'http://example.com/first/second';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first', 'second'],
            hash: [],
            params: {},
        });
    });

    it('should be able to parse simple url with uri encode', (): void => {

        const url: string = 'http://example.com/first/second%20th%C3%8Frd';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            // spell-checker: disable-next-line
            path: ['first', 'second thÏrd'],
            hash: [],
            params: {},
        });
    });

    it('should be able to parse url with no slash hash single component', (): void => {

        const url: string = 'https://example.com#hello';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTPS,
            host: ['example', 'com'],
            path: [],
            hash: ['hello'],
            params: {},
        });
    });

    it('should be able to parse url with no slash hash', (): void => {

        const url: string = 'https://example.com#hello/world/';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTPS,
            host: ['example', 'com'],
            path: [],
            hash: ['hello', 'world'],
            params: {},
        });
    });

    it('should be able to parse url with single before slash hash', (): void => {

        const url: string = 'https://example.com/#hello/world';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTPS,
            host: ['example', 'com'],
            path: [],
            hash: ['hello', 'world'],
            params: {},
        });
    });

    it('should be able to parse url with single after slash hash', (): void => {

        const url: string = 'https://example.com#/hello/world/';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTPS,
            host: ['example', 'com'],
            path: [],
            hash: ['hello', 'world'],
            params: {},
        });
    });

    it('should be able to parse url with double slash hash', (): void => {

        const url: string = 'https://example.com/#/hello';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTPS,
            host: ['example', 'com'],
            path: [],
            hash: ['hello'],
            params: {},
        });
    });

    it('should be able to parse params url', (): void => {

        const url: string = 'http://example.com/first?a=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse root level params url - no slash', (): void => {

        const url: string = 'http://example.com?a=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: [],
            hash: [],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse root level params url - with slash', (): void => {

        const url: string = 'http://example.com/?a=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: [],
            hash: [],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse params url with hash and no slash', (): void => {

        const url: string = 'http://example.com/first#hello/world?a%20ac=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: ['hello', 'world'],
            params: {
                "a ac": 'b',
            },
        });
    });

    it('should be able to parse params url with hash and no slash with middle params', (): void => {

        const url: string = 'http://example.com/first?a=b&c=d#hello/world';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: ['hello', 'world'],
            params: {
                a: 'b',
                c: 'd',
            },
        });
    });

    it('should be able to parse params url with hash and slashes', (): void => {

        const url: string = 'http://example.com/first/#/hello/world/?a=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: ['hello', 'world'],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse params url - 2', (): void => {

        const url: string = 'http://example.com/first/?a=b';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse multiple params url', (): void => {

        const url: string = 'http://example.com/first?a=b&c=100';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                a: 'b',
                c: '100',
            },
        });
    });

    it('should be able to parse multiple params url - sad', (): void => {

        const url: string = 'http://example.com/first?a=b&100';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                a: 'b',
            },
        });
    });

    it('should be able to parse multiple params url - sad 2', (): void => {

        const url: string = 'http://example.com/first?a=b&=100';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                ['']: '100',
                a: 'b',
            },
        });
    });

    it('should be able to parse multiple params url - sad 3', (): void => {

        const url: string = 'http://example.com/first?a=b&&c=100';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: ['first'],
            hash: [],
            params: {
                a: 'b',
                c: '100',
            },
        });
    });
});

/**
 * @author WMXPY
 * @namespace URL
 * @description Parse
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { URLLeanStructure } from "../../src";
import { URL_PROTOCOL } from "../../src/enum";
import { parseUrl } from "../../src/parse";

describe('Given [Parse] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('url-parse');

    it('should be able to parse base url', (): void => {

        const url: string = 'http://example.com/';

        const result: URLLeanStructure = parseUrl(url);

        expect(result).to.be.deep.equal({
            protocol: URL_PROTOCOL.HTTP,
            host: ['example', 'com'],
            path: [],
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
            params: {
                a: 'b',
                c: '100',
            },
        });
    });
});

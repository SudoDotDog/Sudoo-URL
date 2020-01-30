/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { buildUrl, URLLeanStructure } from "../../src";
import { URL_PROTOCOL } from "../../src/enum";

describe('Given [Build] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('url-build');

    it('should be able to build simple url', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            path: [],
            params: {},
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/`);
    });

    it('should be able to build complex url', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: URL_PROTOCOL.HTTPS,
            host: [hostName, 'com'],
            path: ['a', 'b'],
            params: {
                hello: 'world',
                something: 'else',
            },
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/a/b?hello=world&something=else`);
    });
});

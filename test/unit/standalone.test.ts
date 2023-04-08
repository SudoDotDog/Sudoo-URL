/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { URLLeanStructure, URL_PROTOCOL, buildStandaloneHost } from "../../src";

describe('Given [Standalone] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('url-standalone');

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

        const result: string | null = buildStandaloneHost(structure);
        expect(result).to.be.equal(`${hostName}.com`);
    });
});

/**
 * @author WMXPY
 * @namespace URL
 * @description Build
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { buildUrl, URLLeanStructure } from "../../src";

describe('Given [Build] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('url-build');

    it('should be able to build simple url', (): void => {

        const hostName: string = chance.first();

        const structure: URLLeanStructure = {

            protocol: 'https',
            host: [hostName, 'com'],
            path: [],
            params: {},
        };

        const result: string = buildUrl(structure);
        expect(result).to.be.equal(`https://${hostName}.com/`);
    });
});

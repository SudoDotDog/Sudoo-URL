/**
 * @author WMXPY
 * @namespace Asynchronous
 * @description Parallel
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { URLStructure } from "../../src";

describe('Given {URLStructure} Class', (): void => {

    const chance: Chance.Chance = new Chance('url-structure');

    it('should be able to construct', (): void => {

        const structure: URLStructure = URLStructure.create();
        expect(structure).to.be.instanceOf(URLStructure);
    });
});

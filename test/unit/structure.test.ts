/**
 * @author WMXPY
 * @namespace URL
 * @description Structure
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { URLStructure } from "../../src";

describe('Given {URLStructure} Class', (): void => {

    const chance: Chance.Chance = new Chance('url-structure');

    it('should be able to construct', (): void => {

        const structure: URLStructure = URLStructure.empty();
        expect(structure).to.be.instanceOf(URLStructure);
    });

    it('should be able to create url', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.build()).to.be.equal(`${protocol}://example.com/example`);
    });

    it('should be able to create url with params', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            params: {
                hello: 'world',
                foo: 'bar',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.build()).to.be.equal(`${protocol}://example.com/example?hello=world&foo=bar`);
    });

    it('should be able to create url with join build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.joinPath('path')).to.be.equal(`${protocol}://example.com/example/path`);
    });

    it('should be able to create from url', (): void => {

        const structure: URLStructure = URLStructure.fromUrl('https://example.com');
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.build()).to.be.equal('https://example.com/');
    });

    it('should be able to generate from url', (): void => {

        const structure: URLStructure = URLStructure.generateUrl(() => 'https://example.com');
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.build()).to.be.equal('https://example.com/');
    });
});

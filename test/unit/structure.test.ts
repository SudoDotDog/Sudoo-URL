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
            hash: [],
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
            hash: [],
            params: {
                hello: 'world',
                foo: 'bar',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.build()).to.be.equal(`${protocol}://example.com/example?hello=world&foo=bar`);
    });

    it('should be able to create url with join path build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.joinPath('path').build()).to.be.equal(`${protocol}://example.com/example/path`);
    });

    it('should be able to create url with replace path build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.replacePath('path').build()).to.be.equal(`${protocol}://example.com/path`);
    });

    it('should be able to create url with join hash build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.joinHash('hash').build()).to.be.equal(`${protocol}://example.com/example/#/hash`);
    });

    it('should be able to create url with replace hash build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {},
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.joinHash('hash').build()).to.be.equal(`${protocol}://example.com/example/#/hash`);
    });

    it('should be able to create url with join params build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {
                before: 'after',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.joinParams({
            hello: 'world',
        }).build()).to.be.equal(`${protocol}://example.com/example?before=after&hello=world`);
    });

    it('should be able to create url with delete params build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {
                before: 'after',
                hello: 'world',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.deleteParams('before').build()).to.be.equal(`${protocol}://example.com/example?hello=world`);
    });

    it('should be able to create url with delete last params build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {
                before: 'after',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.deleteParams('before').build()).to.be.equal(`${protocol}://example.com/example`);
    });

    it('should be able to create url with replace params build', (): void => {

        const protocol: string = chance.string();

        const structure: URLStructure = URLStructure.fromLean({
            protocol: protocol as any,
            host: ['example', 'com'],
            path: ['example'],
            hash: [],
            params: {
                before: 'after',
            },
        });
        expect(structure).to.be.instanceOf(URLStructure);
        expect(structure.replaceParams({
            hello: 'world',
        }).build()).to.be.equal(`${protocol}://example.com/example?hello=world`);
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

# Sudoo-URL

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-URL.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-URL)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-URL/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-URL)
[![npm version](https://badge.fury.io/js/%40sudoo%2Furl.svg)](https://www.npmjs.com/package/@sudoo/url)
[![downloads](https://img.shields.io/npm/dm/@sudoo/url.svg)](https://www.npmjs.com/package/@sudoo/url)

:snail: URL Parser & Builder

## Install

```sh
yarn add @sudoo/url
# Or
npm install @sudoo/url --save
```

## Build URL

```ts
import { buildUrl, URLLeanStructure } from "@sudoo/url";

const structure: URLLeanStructure = {

    protocol: URL_PROTOCOL.HTTPS,
    host: [hostName, 'com'],
    path: [],
    params: {},
};
const url: string = buildUrl(structure);
```

## Parse URL

```ts
import { parseUrl, URLLeanStructure } from "@sudoo/url";

const url: string = 'http://example.com/first?a=b';

const result: URLLeanStructure = parseUrl(url);

result; 
/** {
    protocol: URL_PROTOCOL.HTTP,
    host: ['example', 'com'],
    path: ['first'],
    params: {
        a: 'b',
    },
}) */
```

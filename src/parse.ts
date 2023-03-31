/**
 * @author WMXPY
 * @namespace URL
 * @description Parse
 */

import { StringBuffer } from "@sudoo/buffer";
import { URLLeanStructure } from "./declare";

enum PARSE_STATUS {

    PROTOCOL = "PROTOCOL",
    PROTOCOL_END_FIRST = "PROTOCOL_END_FIRST",
    PROTOCOL_END_LAST = "PROTOCOL_END_LAST",
    HOST = "HOST",
    HASH_PATH_DECIDE = "HASH_PATH_DECIDE",
    HASH = "HASH",
    PATH = "PATH",
    PARAMS_KEY = "PARAMS_KEY",
    PARAMS_VALUE = "PARAMS_VALUE",
}

export const parseUrl = (url: string): URLLeanStructure => {

    const list: string[] = url.split('');

    let protocol: string = '';
    const host: string[] = [];
    const path: string[] = [];
    const hash: string[] = [];
    const params: Record<string, string> = {};

    let status: PARSE_STATUS = PARSE_STATUS.PROTOCOL as PARSE_STATUS;
    let parsedHash: boolean = false;

    const currentKeyBuffer: StringBuffer = StringBuffer.create();
    const buffer: StringBuffer = StringBuffer.create();

    loop: for (const each of list) {

        iter: switch (each) {
            case '.': {
                switch (status) {
                    case PARSE_STATUS.HOST: {
                        host.push(buffer.flush());
                        continue loop;
                    }
                }
                break iter;
            }
            case ':': {
                switch (status) {
                    case PARSE_STATUS.PROTOCOL: {
                        status = PARSE_STATUS.PROTOCOL_END_FIRST;
                        continue loop;
                    }
                }
                break iter;
            }
            case '/': {
                switch (status) {
                    case PARSE_STATUS.PROTOCOL_END_FIRST: {
                        status = PARSE_STATUS.PROTOCOL_END_LAST;
                        continue loop;
                    }
                    case PARSE_STATUS.PROTOCOL_END_LAST: {
                        protocol = buffer.flush();
                        status = PARSE_STATUS.HOST;
                        continue loop;
                    }
                    case PARSE_STATUS.HOST: {
                        host.push(buffer.flush());
                        status = PARSE_STATUS.HASH_PATH_DECIDE;
                        continue loop;
                    }
                    case PARSE_STATUS.HASH: {
                        hash.push(buffer.flush());
                        continue loop;
                    }
                    case PARSE_STATUS.PATH: {
                        path.push(buffer.flush());
                        continue loop;
                    }
                }
                break iter;
            }
            case '#': {
                if (parsedHash) {
                    break iter;
                }
                switch (status) {
                    case PARSE_STATUS.HASH_PATH_DECIDE: {
                        status = PARSE_STATUS.HASH;
                        continue loop;
                    }
                    case PARSE_STATUS.HOST: {
                        host.push(buffer.flush());
                        status = PARSE_STATUS.HASH;
                        continue loop;
                    }
                    case PARSE_STATUS.PATH: {
                        path.push(buffer.flush());
                        status = PARSE_STATUS.HASH;
                        continue loop;
                    }
                    case PARSE_STATUS.PARAMS_VALUE: {
                        params[currentKeyBuffer.flush()] = buffer.flush();
                        status = PARSE_STATUS.HASH;
                        continue loop;
                    }
                }
                parsedHash = true;
                break iter;
            }
            case '?': {
                switch (status) {
                    case PARSE_STATUS.HASH_PATH_DECIDE: {
                        status = PARSE_STATUS.PARAMS_KEY;
                        continue loop;
                    }
                    case PARSE_STATUS.HOST: {
                        host.push(buffer.flush());
                        status = PARSE_STATUS.PARAMS_KEY;
                        continue loop;
                    }
                    case PARSE_STATUS.HASH: {
                        hash.push(buffer.flush());
                        status = PARSE_STATUS.PARAMS_KEY;
                        continue loop;
                    }
                    case PARSE_STATUS.PATH: {
                        path.push(buffer.flush());
                        status = PARSE_STATUS.PARAMS_KEY;
                        continue loop;
                    }
                }
                break iter;
            }
            case '=': {
                switch (status) {
                    case PARSE_STATUS.PARAMS_KEY: {
                        currentKeyBuffer.add(buffer.flush());
                        status = PARSE_STATUS.PARAMS_VALUE;
                        continue loop;
                    }
                }
                break iter;
            }
            case '&': {
                switch (status) {
                    case PARSE_STATUS.PARAMS_KEY: {
                        if (currentKeyBuffer.length > 0) {
                            params[currentKeyBuffer.flush()] = buffer.flush();
                            status = PARSE_STATUS.PARAMS_KEY;
                        }
                        continue loop;
                    }
                    case PARSE_STATUS.PARAMS_VALUE: {
                        params[currentKeyBuffer.flush()] = buffer.flush();
                        status = PARSE_STATUS.PARAMS_KEY;
                        continue loop;
                    }
                }
                break iter;
            }
            default: {
                switch (status) {
                    case PARSE_STATUS.HASH_PATH_DECIDE: {
                        status = PARSE_STATUS.PATH;
                    }
                }
            }
        }
        buffer.add(each);
    }

    if (buffer.length > 0) {
        switch (status) {
            case PARSE_STATUS.HOST: {
                host.push(buffer.flush());
                break;
            }
            case PARSE_STATUS.HASH: {
                hash.push(buffer.flush());
                break;
            }
            case PARSE_STATUS.PATH: {
                path.push(buffer.flush());
                break;
            }
            case PARSE_STATUS.PARAMS_VALUE: {
                params[currentKeyBuffer.flush()] = buffer.flush();
                break;
            }
        }
    }

    return {
        protocol: protocol.trim() as any,
        host: host.filter(Boolean).map(decodeURIComponent),
        path: path.filter(Boolean).map(decodeURIComponent),
        hash: hash.filter(Boolean).map(decodeURIComponent),
        params: Object.keys(params).reduce((previous: Record<string, string>, current: string) => {
            return {
                ...previous,
                [decodeURIComponent(current)]: decodeURIComponent(params[current]),
            };
        }, {}),
    };
};

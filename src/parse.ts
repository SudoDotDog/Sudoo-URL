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
    PATH = "PATH",
    PARAMS_KEY = "PARAMS_KEY",
    PARAMS_VALUE = "PARAMS_VALUE",
}

export const parseUrl = (url: string): URLLeanStructure => {

    const list: string[] = url.split('');

    let protocol: string = '';
    const host: string[] = [];
    const path: string[] = [];
    const params: Record<string, string> = {};

    let status: PARSE_STATUS = PARSE_STATUS.PROTOCOL as PARSE_STATUS;
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
                        status = PARSE_STATUS.PATH;
                        continue loop;
                    }
                    case PARSE_STATUS.PATH: {
                        path.push(buffer.flush());
                        continue loop;
                    }
                }
                break iter;
            }
            case '?': {
                switch (status) {
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
        host: host.filter(Boolean),
        path: path.filter(Boolean),
        params,
    };
};

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
}

export const parseUrl = (url: string): URLLeanStructure => {

    const list: string[] = url.split('');

    let protocol: string = '';
    const host: string[] = [];
    const path: string[] = [];
    const params: Record<string, string> = {};

    let status: PARSE_STATUS = PARSE_STATUS.PROTOCOL as PARSE_STATUS;
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
                }
                break iter;
            }
        }

        buffer.add(each);
    }
    return {
        protocol: protocol as any,
        host,
        path,
        params,
    };
};

export const isCharNumber = (target: string): boolean => {

    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(target);
};

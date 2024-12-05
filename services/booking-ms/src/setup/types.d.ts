/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

export interface JwtPayload {
    user: any;
}

declare module 'express' {
    export interface Request {
        auth?: JwtPayload;
    }
}

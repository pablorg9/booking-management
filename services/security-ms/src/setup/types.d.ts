/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { User } from '@domain/entities';

export interface JwtPayload {
    user: User;
}

declare module 'express' {
    export interface Request {
        auth?: JwtPayload;
    }
}

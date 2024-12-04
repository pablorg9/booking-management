/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { Payment } from '@domain/entities';

export interface JwtPayload {
    payment: Payment;
}

declare module 'express' {
    export interface Request {
        auth?: JwtPayload;
    }
}

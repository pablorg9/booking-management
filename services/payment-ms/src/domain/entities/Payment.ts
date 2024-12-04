import { PaymentStatus } from '@domain/value-objects';

/* eslint-disable no-unused-vars */
export class Payment {
    constructor(
        public id: string,
        public userId: string,
        public productId: string,
        public amount: number,
        public description: string,
        public status: PaymentStatus = 'PENDING',
        public currency: string = 'USD',
        public createdAt: Date | string | null = null,
    ) {}
}

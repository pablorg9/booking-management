/* eslint-disable no-unused-vars */
export class Booking {
    constructor(
        public id: string,
        public userId: string,
        public eventId: string,
        public paymentId: string = '',
        public eventName: string = '',
        public status: string = 'PENDING',
        public price: number = 0,
        public createdAt: Date | string | null = null,
        public updatedAt: Date | string | null = null,
    ) {}
}
import { inject, injectable } from 'inversify';
import { IBookingRepository } from '@domain/repositories';
import { PaymentStatus } from '@domain/value-objects';
import axios from 'axios';
import { IEnvironments } from '@setup/interfaces';
import { ErrorCode, StatusCode } from '@setup/utils';

@injectable()
export class BookingRepository implements IBookingRepository {
    constructor(@inject('ENVIRONMENTS') private _environments: IEnvironments) {}

    async updateBookingStatus(bookingId: string, paymentId: string, status: PaymentStatus): Promise<void> {
        const body = {
            bookingId,
            paymentId,
            status,
        };

        const response = await axios.put(`${this._environments.BOOKING_MS.BOOKING_MS_URL}/bookings/status`, body, {
            headers: {
                Authorization: `Bearer ${this._environments.BOOKING_MS.BOOKING_SERVICE_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw {
                message: 'Error updating booking status',
                status: StatusCode.INTERNAL_ERROR,
                code: ErrorCode.API_ERROR,
                customError: true,
            };
        }
    }
}

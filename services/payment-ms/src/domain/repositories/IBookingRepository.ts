import { PaymentStatus } from '@domain/value-objects';

export interface IBookingRepository {
    updateBookingStatus(_bookingId: string, _paymentId: string, _status: PaymentStatus): Promise<void>;
}

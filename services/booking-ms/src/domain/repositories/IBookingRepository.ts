import { Booking } from '@domain/entities';

export interface IBookingRepository {
    createBooking(_booking: Booking): Promise<void>;
}

import { Booking } from '@domain/entities';

export interface IBookingRepository {
    createBooking(_booking: Booking): Promise<void>;
    listBookingsByUserId(_userId: string): Promise<Booking[]>;
    eventHasBookings(_eventId: string): Promise<boolean>;
}

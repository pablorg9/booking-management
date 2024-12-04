import { Booking } from '@domain/entities';

export interface IBookingRepository {
    createBooking(_booking: Booking): Promise<void>;
    listBookingsByUserId(_userId: string): Promise<Booking[]>;
    findBookingById(_bookingId: string): Promise<Booking>;
    eventHasBookings(_eventId: string): Promise<boolean>;
    userHasBooked(_eventId: string, _userId: string): Promise<boolean>;
    deleteBooking(_bookingId: string): Promise<void>;
}

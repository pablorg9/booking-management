import { Booking } from '@domain/entities';
import { BookingStatus } from '@domain/value-objects';

export interface IBookingRepository {
    createBooking(_booking: Booking): Promise<void>;
    listBookingsByUserId(_userId: string): Promise<Booking[]>;
    findBookingById(_bookingId: string): Promise<Booking>;
    eventHasBookings(_eventId: string): Promise<boolean>;
    userHasBooked(_eventId: string, _userId: string): Promise<boolean>;
    updateBookingStatusAndPaymentIdById(
        _bookingId: string,
        _paymentId: string,
        _status: BookingStatus,
        _updatedAt: Date,
    ): Promise<void>;
    deleteBooking(_bookingId: string): Promise<void>;
}

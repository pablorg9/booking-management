import { injectable, inject } from 'inversify';
import { IBookingRepository, IEventRepository } from '@domain/repositories';
import { BOOKING_REPOSITORY, EVENT_REPOSITORY } from '@setup/Symbols';
import { Booking } from '@domain/entities';
import { ErrorCode, StatusCode } from '@setup/utils';
import { BookingStatus } from '@domain/value-objects';

@injectable()
export class BookingService {
    constructor(
        @inject(EVENT_REPOSITORY) private _eventRepository: IEventRepository,
        @inject(BOOKING_REPOSITORY) private _bookingRepository: IBookingRepository,
    ) {}

    async createBooking(booking: Booking): Promise<Booking> {
        booking.createdAt = new Date();
        const event = await this._eventRepository.findEventsById(booking.eventId);
        if (!event) {
            throw {
                message: 'Event does not exists',
                status: StatusCode.BAD_REQUEST,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }

        if (await this._bookingRepository.userHasBooked(booking.eventId, booking.userId)) {
            throw {
                message: 'User has already booked before for this event',
                status: StatusCode.CONFLICT,
                code: ErrorCode.BOOKING_DUPLICITY,
                customError: true,
            };
        }

        if (event.totalAttenders >= event.maxTotalAttenders) {
            throw {
                message: 'Event full',
                status: StatusCode.CONFLICT,
                code: ErrorCode.SUCCESS,
                customError: true,
            };
        }

        booking.price = event.price;
        booking.eventName = event.name;

        await this._bookingRepository.createBooking(booking);
        await this._eventRepository.updateEventTotalAttenders(booking.eventId);

        // TODO: next step call payment-ms
        return booking;
    }

    async listMyBookings(userId: string): Promise<Booking[]> {
        return this._bookingRepository.listBookingsByUserId(userId);
    }

    async updateBookingStatus(bookingId: string, paymentId: string, status: BookingStatus): Promise<void> {
        const updatedAt = new Date();
        const booking = await this._bookingRepository.findBookingById(bookingId);
        if (booking.status === 'DECLINED') {
            throw {
                message: 'This booking has been already declined',
                status: StatusCode.CONFLICT,
                code: ErrorCode.BOOKING_ALREADY_DECLINED,
                customError: true,
            };
        }
        await this._bookingRepository.updateBookingStatusAndPaymentIdById(bookingId, paymentId, status, updatedAt);

        if (status === 'DECLINED') {
            await this._eventRepository.updateEventTotalAttenders(booking.eventId, -1);
        }
    }

    async deleteBooking(bookingId: string, userId: string): Promise<void> {
        const booking = await this._bookingRepository.findBookingById(bookingId);
        if (booking.userId !== userId) {
            throw {
                message: 'This booking was not created by you',
                status: StatusCode.FORBIDDEN,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }

        await this._bookingRepository.deleteBooking(bookingId);
    }
}

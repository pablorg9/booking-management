import { injectable, inject } from 'inversify';
import { IBookingRepository, IEventRepository } from '@domain/repositories';
import { EVENT_REPOSITORY } from '@setup/Symbols';
import { Booking } from '@domain/entities';
import { ErrorCode, StatusCode } from '@setup/utils';

@injectable()
export class BookingService {
    constructor(
        @inject(EVENT_REPOSITORY) private _eventRepository: IEventRepository,
        @inject(EVENT_REPOSITORY) private _bookingRepository: IBookingRepository,
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
        if (event.totalAttenders >= event.maxTotalAttenders) {
            throw {
                message: 'Event full',
                status: StatusCode.NO_CONTENT,
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
}

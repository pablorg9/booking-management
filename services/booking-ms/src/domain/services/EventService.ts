import { injectable, inject } from 'inversify';
import { IBookingRepository, IEventRepository } from '@domain/repositories';
import { BOOKING_REPOSITORY, EVENT_REPOSITORY } from '@setup/Symbols';
import { EventEntity } from '@domain/entities';
import { ErrorCode, StatusCode } from '@setup/utils';

@injectable()
export class EventService {
    constructor(
        @inject(BOOKING_REPOSITORY) private _bookingRepository: IBookingRepository,
        @inject(EVENT_REPOSITORY) private _eventRepository: IEventRepository,
    ) {}

    async moveEvent(eventId: string, newDateTime: string, userId: string): Promise<void> {
        const event = await this._eventRepository.findEventsById(eventId);
        if (event.userId !== userId) {
            throw {
                message: 'This event was not created by you',
                status: StatusCode.FORBIDDEN,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }

        const currentEventDateTime = new Date(event.datetime);
        const newEventDateTime = new Date(newDateTime);

        if (newEventDateTime <= currentEventDateTime) {
            throw {
                message: 'The new date and time must be greater than the current event date and time',
                status: StatusCode.BAD_REQUEST,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }

        await this._eventRepository.updateEventDate(eventId, newEventDateTime);
    }

    async listUpcomingEvents(): Promise<EventEntity[]> {
        const currentDate = new Date();
        return this._eventRepository.listLimitedEventsByDate(currentDate, 20);
    }

    async createEvent(event: EventEntity): Promise<EventEntity> {
        event.createdAt = new Date();
        event.datetime = new Date(event.datetime);
        event.totalAttenders = 0;

        if (event.datetime <= event.createdAt) {
            throw {
                message: 'The date and time must be greater than the current date and time',
                status: StatusCode.BAD_REQUEST,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }
        await this._eventRepository.createEvent(event);
        return event;
    }

    async deleteEvent(eventId: string, userId: string): Promise<void> {
        const event = await this._eventRepository.findEventsById(eventId);
        if (event.userId !== userId) {
            throw {
                message: 'This event was not created by you',
                status: StatusCode.FORBIDDEN,
                code: ErrorCode.INVALID_PARAMETERS,
                customError: true,
            };
        }

        if (await this._bookingRepository.eventHasBookings(event.id)) {
            throw {
                message: 'You cannot delete this event because it already has bookings',
                status: StatusCode.CONFLICT,
                code: ErrorCode.EVENT_HAS_BOOKING,
                customError: true,
            };
        }

        await this._eventRepository.deleteEvent(eventId);
    }
}

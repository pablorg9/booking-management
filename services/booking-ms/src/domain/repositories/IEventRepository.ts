import { EventEntity } from '@domain/entities';

export interface IEventRepository {
    updateEventDate(_eventId: string, _newDateTime: Date): Promise<void>;
    updateEventTotalAttenders(_eventId: string): Promise<void>;
    createEvent(_event: EventEntity): Promise<void>;
    findEventsById(_eventId: string): Promise<EventEntity>;
    listLimitedEventsByDate(_date: Date, _limit: number): Promise<EventEntity[]>;
    deleteEvent(_eventId: string): Promise<void>;
}

import { EventEntity } from '@domain/entities';

export interface IEventRepository {
    updateEventDate(_eventId: string, _newDateTime: string): Promise<void>;
    createEvent(_event: EventEntity): Promise<void>;
    findEventsById(_eventId: string): Promise<EventEntity>;
}

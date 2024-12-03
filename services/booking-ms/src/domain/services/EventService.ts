import { injectable, inject } from 'inversify';
import { IEventRepository } from '@domain/repositories';
import { EVENT_REPOSITORY } from '@setup/Symbols';
import { EventEntity } from '@domain/entities';
import { getCurrentTime } from '@setup/utils';

@injectable()
export class EventService {
    constructor(@inject(EVENT_REPOSITORY) private _eventRepository: IEventRepository) {}

    async example(): Promise<any> {
        return this._eventRepository.example();
    }

    async createEvent(event: EventEntity): Promise<EventEntity> {
        event.createdAt = getCurrentTime();
        await this._eventRepository.createEvent(event);
        return event;
    }
}

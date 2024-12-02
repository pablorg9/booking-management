import { injectable, inject } from 'inversify';
import { IEventRepository } from '@domain/repositories';
import { EVENT_REPOSITORY } from '@setup/Symbols';

@injectable()
export class EventService {
    constructor(@inject(EVENT_REPOSITORY) private _eventRepository: IEventRepository) {}

    async example(): Promise<any> {
        return this._eventRepository.example();
    }
}

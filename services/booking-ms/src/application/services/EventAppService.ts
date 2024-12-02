import { injectable, inject } from 'inversify';
import { EventService } from '@domain/services';

@injectable()
export class EventAppService {
    constructor(@inject(EventService) private _eventService: EventService) {}

    async example(): Promise<any> {
        return this._eventService.example();
    }
}

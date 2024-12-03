import { injectable, inject } from 'inversify';
import { EventService } from '@domain/services';
import { IEventDTO } from '@setup/interfaces/DTOs';
import { EventEntity } from '@domain/entities';
import { ObjectId } from 'mongodb';

@injectable()
export class EventAppService {
    constructor(@inject(EventService) private _eventService: EventService) {}

    async example(): Promise<any> {
        return this._eventService.example();
    }

    async createEvent(eventDTO: IEventDTO): Promise<EventEntity> {
        const event = this.mapEventDTOToEntity(eventDTO);
        return this._eventService.createEvent(event);
    }

    private mapEventDTOToEntity = (dto: IEventDTO): EventEntity => {
        const id = dto.id ? dto.id : new ObjectId().toHexString();
        const user = new EventEntity(
            id,
            dto.userId,
            dto.name,
            dto.maxTotalAttenders,
            dto.price,
            dto.description,
            dto.details,
            dto.datetime,
        );
        return user;
    };
}

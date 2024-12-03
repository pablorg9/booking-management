import { EventEntity } from '@domain/entities';

export interface IEventRepository {
    example(): Promise<any>;
    createEvent(_event: EventEntity): Promise<void>;
}

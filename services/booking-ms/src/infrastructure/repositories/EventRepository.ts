import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IEventRepository } from '@domain/repositories';
import { IMongo } from './config';
import { MONGO } from '@setup/Symbols';
import { EventEntity } from '@domain/entities';
import { IEventModel } from '@setup/interfaces/models';
import { ObjectId } from 'mongodb';

@injectable()
export class EventRepository implements IEventRepository {
    private _defaultCollection = 'events';

    constructor(@inject(MONGO) private _mongo: IMongo) {}

    async example(): Promise<any> {
        const collections = this._mongo.db.collections();
        console.log(collections);
    }

    async createEvent(event: EventEntity): Promise<void> {
        const eventToSave = this.mapEventEntityToModel(event);
        await this._mongo.db.collection(this._defaultCollection).insertOne(eventToSave);
    }

    private mapEventEntityToModel = (event: EventEntity): IEventModel => {
        return {
            event_id: new ObjectId(event.id),
            user_id: event.userId,
            event_name: event.name,
            event_maxTotalAttenders: event.maxTotalAttenders,
            event_price: event.price,
            event_description: event.description,
            event_details: event.details,
            event_datetime: event.datetime,
            event_createdAt: event.createdAt,
        };
    };
}

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

    async createEvent(event: EventEntity): Promise<void> {
        const eventToSave = this.mapEventEntityToModel(event);
        await this._mongo.db.collection(this._defaultCollection).insertOne(eventToSave);
    }

    async findEventsById(eventId: string): Promise<EventEntity> {
        const id = new ObjectId(eventId);
        const event = (await this._mongo.db
            .collection(this._defaultCollection)
            .findOne({ event_id: id })) as IEventModel | null;
        if (!event) return {} as EventEntity;
        return this.mapEventModelToEntity(event);
    }

    async listUpcomingEvents(date: Date): Promise<IEventModel[]> {
        const upcomingEvents = await this._mongo.db
            .collection(this._defaultCollection)
            .find({ event_datatime: { $gt: date } })
            .sort({ event_datatime: 1 })
            .limit(20)
            .toArray();

        return upcomingEvents;
    }

    async updateEventDate(eventId: string, datatime: string): Promise<void> {
        const id = new ObjectId(eventId);
        await this._mongo.db.collection(this._defaultCollection).updateOne(
            { event_id: id },
            {
                $set: {
                    event_datatime: datatime,
                },
            },
        );
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

    private mapEventModelToEntity = (event: IEventModel): EventEntity => {
        if (!event) return {} as EventEntity;
        return new EventEntity(
            event.event_id.toHexString(),
            event.user_id,
            event.event_name,
            event.event_maxTotalAttenders,
            event.event_price,
            event.event_description,
            event.event_details,
            event.event_datetime,
            event.event_createdAt,
        );
    };
}

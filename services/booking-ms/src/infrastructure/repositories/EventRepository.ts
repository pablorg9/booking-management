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
        const event = await this._mongo.db.collection<IEventModel>(this._defaultCollection).findOne({ _id: id });
        if (!event) return {} as EventEntity;
        return this.mapEventModelToEntity(event);
    }

    async listLimitedEventsByDate(date: Date, limit: number): Promise<EventEntity[]> {
        const upcomingEvents = await this._mongo.db
            .collection<IEventModel>(this._defaultCollection)
            .find({ event_datetime: { $gt: date } })
            .sort({ event_datetime: 1 })
            .limit(limit)
            .toArray();

        return upcomingEvents.map((event) => this.mapEventModelToEntity(event));
    }

    async updateEventDate(eventId: string, datetime: Date): Promise<void> {
        const id = new ObjectId(eventId);
        await this._mongo.db.collection(this._defaultCollection).updateOne(
            { _id: id },
            {
                $set: {
                    event_datetime: datetime,
                },
            },
        );
    }

    async updateEventTotalAttenders(eventId: string, nAttenders = 1): Promise<void> {
        const id = new ObjectId(eventId);
        await this._mongo.db.collection(this._defaultCollection).updateOne(
            { _id: id },
            {
                $inc: {
                    event_totalAttenders: nAttenders,
                },
            },
        );
    }

    async deleteEvent(eventId: string): Promise<void> {
        const id = new ObjectId(eventId);
        await this._mongo.db.collection(this._defaultCollection).deleteOne({ _id: id });
    }

    private mapEventEntityToModel = (event: EventEntity): IEventModel => {
        return {
            _id: new ObjectId(event.id),
            user_id: event.userId,
            event_name: event.name,
            event_maxTotalAttenders: event.maxTotalAttenders,
            event_totalAttenders: event.totalAttenders,
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
            event._id.toHexString(),
            event.user_id,
            event.event_name,
            event.event_maxTotalAttenders,
            event.event_totalAttenders,
            event.event_price,
            event.event_description,
            event.event_details,
            event.event_datetime,
            event.event_createdAt,
        );
    };
}

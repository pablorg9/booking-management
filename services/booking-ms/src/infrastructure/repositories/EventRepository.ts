import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IEventRepository } from '@domain/repositories';
import { IMongo } from './config';
import { MONGO } from '@setup/Symbols';

@injectable()
export class EventRepository implements IEventRepository {
    constructor(@inject(MONGO) private _mongo: IMongo) {}

    async example(): Promise<any> {
        const collections = this._mongo.db.collections();
        console.log(collections);
    }
}

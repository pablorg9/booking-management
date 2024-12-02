import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IEnvironments } from '@setup/interfaces';
import { Db, MongoClient } from 'mongodb';

export interface IMongo {
    db: Db;
}

@injectable()
export class MongoConnection implements IMongo {
    private client: MongoClient;
    private mongoDb: Db | null = null;

    constructor(@inject('ENVIRONMENTS') private _environments: IEnvironments) {
        const uri = `mongodb://${this._environments.MONGO.USER}:${this._environments.MONGO.PASSWORD}@${this._environments.MONGO.HOST}:${this._environments.MONGO.PORT}/${this._environments.MONGO.DATABASE}?authSource=admin&retryWrites=true&w=majority`;

        this.client = new MongoClient(uri);
        this.init();
    }

    public async init(): Promise<void> {
        const mongodb = await this.client.connect();
        this.mongoDb = mongodb.db(this._environments.MONGO.DATABASE);
    }

    public get db(): Db {
        if (!this.mongoDb) {
            throw new Error('MongoConnection has not been initialized. Call init() first.');
        }
        return this.mongoDb;
    }
}

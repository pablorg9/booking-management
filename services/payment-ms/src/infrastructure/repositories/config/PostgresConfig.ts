import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Pool } from 'pg';
import { IEnvironments } from '@setup/interfaces';

export interface IPostgres {
    postgresDb: Pool;
}

@injectable()
export class PostgresConnection implements IPostgres {
    private db: Pool;

    constructor(@inject('ENVIRONMENTS') private _environments: IEnvironments) {
        this.db = new Pool({
            host: this._environments.POSTGRES.HOST,
            user: this._environments.POSTGRES.USER,
            password: this._environments.POSTGRES.PASSWORD,
            database: this._environments.POSTGRES.DATABASE,
            port: this._environments.POSTGRES.PORT,
            max: 10,
        });
    }

    public get postgresDb(): Pool {
        return this.db;
    }
}

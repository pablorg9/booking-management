import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { createPool, Pool } from 'mysql2/promise';
import { IEnvironments } from '@setup/interfaces';

export interface IMysql {
    mysqlDb: Pool;
}

@injectable()
export class MysqlConnection implements IMysql {
    private db: Pool;

    constructor(@inject('ENVIRONMENTS') private _environments: IEnvironments) {
        this.db = createPool({
            host: this._environments.MYSQL.HOST,
            user: this._environments.MYSQL.USER,
            password: this._environments.MYSQL.PASSWORD,
            database: this._environments.MYSQL.DATABASE,
            port: this._environments.MYSQL.PORT,
            connectionLimit: 10,
        });
    }

    public get mysqlDb(): Pool {
        return this.db;
    }
}

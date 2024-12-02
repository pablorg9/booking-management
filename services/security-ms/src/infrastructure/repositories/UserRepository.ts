import { inject, injectable } from 'inversify';
import { IUserRepository } from '@domain/repositories';
import { User } from '@domain/entities';
import { QueryBuilder } from '@utils';
import { MYSQL } from '@setup/Symbols';
import { IMysql } from './config';
import { RowDataPacket } from 'mysql2';
import { IUserModel } from '@setup/interfaces/models';

@injectable()
export class UserRepository implements IUserRepository {
    private _mysqlEntity: string = 'users';
    constructor(@inject(MYSQL) private _db: IMysql) {}

    async getUserByEmail(email: string): Promise<User> {
        const query = new QueryBuilder(this._mysqlEntity).setCondition('user_email = ?').build();
        const [rows] = await this._db.mysqlDb.execute<IUserModel[] & RowDataPacket[]>(query, [email]);

        return this.mapUserModelToEntity(rows[0]);
    }

    async createUser(user: User): Promise<void> {
        const userToSave = this.mapUserEntityToModel(user);
        await this._db.mysqlDb.query(`INSERT INTO ${this._mysqlEntity} SET ?`, userToSave);
    }

    private mapUserModelToEntity = (user: IUserModel): User => {
        if (!user) return {} as User;
        return new User(
            user.user_id,
            user.user_name,
            user.user_email,
            user.user_password,
            user.user_phone,
            user.user_createdAt,
        );
    };

    private mapUserEntityToModel = (user: User): IUserModel => {
        return {
            user_id: user.id,
            user_name: user.name,
            user_email: user.email,
            user_password: user.password,
            user_phone: user.phone,
            user_createdAt: user.createdAt,
        };
    };
}

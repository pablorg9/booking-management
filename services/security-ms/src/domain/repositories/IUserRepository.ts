import { User } from '@domain/entities';

export interface IUserRepository {
    getUserByEmail(_email: string): Promise<User>;
    createUser(_user: User): Promise<void>;
}

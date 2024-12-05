import { injectable, inject } from 'inversify';
import { IUserRepository } from '@domain/repositories';
import { User } from '@domain/entities';
import { USER_REPOSITORY } from '@setup/Symbols';
import { getCurrentTime } from '@setup/utils/Common';
import { ErrorCode, StatusCode } from '@utils';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IEnvironments } from '@setup/interfaces';
import { hash } from 'bcrypt';

@injectable()
export class UserService {
    constructor(
        @inject(USER_REPOSITORY) private _userRepository: IUserRepository,
        @inject('ENVIRONMENTS') private _environments: IEnvironments,
    ) {}

    async signIn(email: string, password: string): Promise<Record<string, unknown>> {
        const user = await this._userRepository.getUserByEmail(email);
        if (user.id) {
            const match = await compare(password as string, user.password as string);
            if (match) {
                const dataToReturn = {
                    token: sign({ user }, this._environments.SECRET_JWT, { algorithm: 'HS256' }),
                    user_id: user.id,
                    name: user.name,
                    authenticated: true,
                };

                return dataToReturn;
            }
        }
        throw {
            message: 'Invalid credentials',
            status: StatusCode.UNAUTHORIZED,
            code: ErrorCode.UNAUTHORIZED,
            customError: true,
        };
    }

    async signUp(user: User): Promise<void> {
        user.createdAt = getCurrentTime();
        user.password = await hash(user.password, 5);

        if (await this.validateUserEmail(user.email)) {
            throw {
                message: 'Email already exists',
                status: StatusCode.CONFLICT,
                code: ErrorCode.API_ERROR,
                customError: true,
            };
        }
        await this._userRepository.createUser(user);
    }

    async validateUserEmail(email: string): Promise<boolean> {
        const user = await this._userRepository.getUserByEmail(email);
        return !!user.email;
    }
}

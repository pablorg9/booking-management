import { injectable, inject } from 'inversify';
import { UserService } from '@domain/services';
import { IUserDTO } from '@interfaces/DTOs';
import { User } from '@domain/entities';
import { v4 } from 'uuid';

@injectable()
export class UserAppService {
    constructor(@inject(UserService) private _userService: UserService) {}

    async signIn({ email, password }: Pick<IUserDTO, 'email' | 'password'>): Promise<Record<string, unknown>> {
        const user = await this._userService.signIn(email, password!);
        return user;
    }

    async signUp(userDTO: IUserDTO): Promise<void> {
        const user = this.mapUserDTOToEntity(userDTO);
        await this._userService.signUp(user);
    }

    private mapUserDTOToEntity = (dto: IUserDTO): User => {
        const id = dto.id ? dto.id : v4();
        const user = new User(id, dto.name, dto.email, dto.password || '', dto.phone);
        return user;
    };
}

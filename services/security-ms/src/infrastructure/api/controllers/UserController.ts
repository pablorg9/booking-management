import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, interfaces, httpPost, request } from 'inversify-express-utils';
import { UserAppService } from '@application/services';
import { ApiSuccessResponse } from '@utils';
import { IUserDTO } from '@interfaces/DTOs';
import { signInSchema, signUpSchema, validate } from '../validators';

@controller('/users')
export class UserController implements interfaces.Controller {
    constructor(@inject(UserAppService) private _userAppService: UserAppService) {}

    @httpPost('/sign-in', validate(signInSchema))
    async signIn(@request() req: Request) {
        const loginData: Pick<IUserDTO, 'email' | 'password'> = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = await this._userAppService.signIn(loginData);
        const response = new ApiSuccessResponse<typeof user>(200, user);

        return response;
    }

    @httpPost('/sign-up', validate(signUpSchema))
    async signUp(@request() req: Request) {
        const userDTO: IUserDTO = req.body;
        await this._userAppService.signUp(userDTO);
        const response = new ApiSuccessResponse(201, 'User created!');

        return response;
    }
}

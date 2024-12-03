import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet, httpPost, interfaces, request } from 'inversify-express-utils';
import { EventAppService } from '@application/services';
import { ApiErrorResponse, ApiSuccessResponse, ErrorCode, StatusCode } from '@utils';
import { jwtMiddleware } from '../middlewares';
import { IEventDTO } from '@setup/interfaces/DTOs';

@controller('/events')
export class EventController implements interfaces.Controller {
    constructor(@inject(EventAppService) private _eventAppService: EventAppService) {}

    @httpPost('/', jwtMiddleware)
    async createEvent(@request() req: Request) {
        const user_id = req.auth?.user.id;
        if (!user_id) {
            return new ApiErrorResponse(StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, 'Invalid token object');
        }
        const eventDTO: IEventDTO = req.body;
        eventDTO.userId = user_id;
        const event = await this._eventAppService.createEvent(eventDTO);
        const response = new ApiSuccessResponse<typeof event>(201, event);

        return response;
    }

    @httpGet('/', jwtMiddleware)
    async example() {
        const example = await this._eventAppService.example();
        const response = new ApiSuccessResponse(200, { items: example });

        return response;
    }
}

import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    request,
    requestParam,
} from 'inversify-express-utils';
import { EventAppService } from '@application/services';
import { ApiErrorResponse, ApiSuccessResponse, ErrorCode, StatusCode } from '@utils';
import { jwtMiddleware } from '../middlewares';
import { IEventDTO } from '@setup/interfaces/DTOs';
import { createEventSchema, eventIdSchema, moveEventSchema, validate } from '../validators';

@controller('/events')
export class EventController implements interfaces.Controller {
    constructor(@inject(EventAppService) private _eventAppService: EventAppService) {}

    @httpPost('/', jwtMiddleware, validate(createEventSchema))
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

    @httpGet('/comming-soon', jwtMiddleware)
    async listUpcomingEvents() {
        const events = await this._eventAppService.listUpcomingEvents();
        const response = new ApiSuccessResponse<typeof events>(201, events);

        return response;
    }

    @httpPut('/:id/move', jwtMiddleware, validate(moveEventSchema))
    async moveEvent(@request() req: Request, @requestParam('id') eventId: string) {
        const userId = req.auth?.user.id;
        if (!userId) {
            return new ApiErrorResponse(StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, 'Invalid token object');
        }

        const { error: idError } = eventIdSchema.validate(eventId);
        if (idError) {
            return new ApiErrorResponse(
                StatusCode.BAD_REQUEST,
                ErrorCode.INVALID_PARAMETERS,
                idError.details[0].message,
            );
        }

        const newDateTime = req.body.datetime;

        await this._eventAppService.moveEvent(eventId, newDateTime, userId);
        const response = new ApiSuccessResponse(200, 'Event moved successfully');

        return response;
    }

    @httpDelete('/:id', jwtMiddleware)
    async deleteEvent(@request() req: Request, @requestParam('id') eventId: string) {
        const user_id = req.auth?.user.id;
        if (!user_id) {
            return new ApiErrorResponse(StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, 'Invalid token object');
        }

        await this._eventAppService.deleteEvent(eventId, user_id);
        const response = new ApiSuccessResponse<typeof eventId>(200, eventId);

        return response;
    }
}

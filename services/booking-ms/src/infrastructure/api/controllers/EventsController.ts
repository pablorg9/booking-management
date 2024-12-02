import 'reflect-metadata';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { EventAppService } from '@application/services';
import { ApiSuccessResponse } from '@utils';
import { jwtMiddleware } from '../middlewares';

@controller('/events')
export class EventController implements interfaces.Controller {
    constructor(@inject(EventAppService) private _eventAppService: EventAppService) {}

    @httpGet('/', jwtMiddleware)
    async example() {
        const example = await this._eventAppService.example();
        const response = new ApiSuccessResponse(200, { items: example });

        return response;
    }
}

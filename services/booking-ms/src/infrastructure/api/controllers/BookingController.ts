import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpPost, interfaces, request } from 'inversify-express-utils';
import { BookingAppService } from '@application/services';
import { ApiErrorResponse, ApiSuccessResponse, ErrorCode, StatusCode } from '@utils';
import { jwtMiddleware } from '../middlewares';
import { IBookingDTO } from '@setup/interfaces/DTOs';
import { createBookingSchema, validate } from '../validators';

@controller('/bookings')
export class EventController implements interfaces.Controller {
    constructor(@inject(BookingAppService) private _bookingAppService: BookingAppService) {}

    @httpPost('/', jwtMiddleware, validate(createBookingSchema))
    async createEvent(@request() req: Request) {
        const user_id = req.auth?.user.id;
        if (!user_id) {
            return new ApiErrorResponse(StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, 'Invalid token object');
        }

        const bookingDTO: IBookingDTO = req.body;
        bookingDTO.userId = user_id;

        const booking = await this._bookingAppService.createBooking(bookingDTO);
        const response = new ApiSuccessResponse<typeof booking>(201, booking);

        return response;
    }
}

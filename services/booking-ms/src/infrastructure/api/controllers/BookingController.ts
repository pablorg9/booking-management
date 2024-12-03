import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet, httpPost, interfaces, request } from 'inversify-express-utils';
import { BookingAppService } from '@application/services';
import { ApiErrorResponse, ApiSuccessResponse, ErrorCode, StatusCode, validateUserAuth } from '@utils';
import { jwtMiddleware } from '../middlewares';
import { IBookingDTO } from '@setup/interfaces/DTOs';
import { createBookingSchema, validate } from '../validators';

@controller('/bookings')
export class BookingController implements interfaces.Controller {
    constructor(@inject(BookingAppService) private _bookingAppService: BookingAppService) {}

    @httpPost('/', jwtMiddleware, validate(createBookingSchema))
    async createBooking(@request() req: Request) {
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

    @httpGet('/my-bookings', jwtMiddleware)
    async listUpcomingEvents(@request() req: Request) {
        const user_id = req.auth?.user.id;
        validateUserAuth(user_id);

        const bookings = await this._bookingAppService.listMyBookings(user_id);
        const response = new ApiSuccessResponse<typeof bookings>(202, bookings);

        return response;
    }
}

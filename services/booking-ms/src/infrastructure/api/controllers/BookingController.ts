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
import { BookingAppService } from '@application/services';
import { ApiErrorResponse, ApiSuccessResponse, ErrorCode, StatusCode, validateUserAuth } from '@utils';
import { jwtMiddleware } from '../middlewares';
import { IBookingDTO } from '@setup/interfaces/DTOs';
import { createBookingSchema, updateBookingStatusSchema, validate } from '../validators';

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
    async listMyBookings(@request() req: Request) {
        const user_id = req.auth?.user.id;
        validateUserAuth(user_id);

        const bookings = await this._bookingAppService.listMyBookings(user_id);
        const response = new ApiSuccessResponse<typeof bookings>(202, bookings);

        return response;
    }

    @httpPut('/status', jwtMiddleware, validate(updateBookingStatusSchema))
    async updateBookingStatus(@request() req: Request) {
        const { bookingId, paymentId, status } = req.body;

        await this._bookingAppService.updateBookingStatus(bookingId, paymentId, status);
        const response = new ApiSuccessResponse(200, 'Status updated');

        return response;
    }

    @httpDelete('/:id', jwtMiddleware)
    async deleteBooking(@request() req: Request, @requestParam('id') bookingId: string) {
        const user_id = req.auth?.user.id;
        validateUserAuth(user_id);

        await this._bookingAppService.deleteBooking(bookingId, user_id);
        const response = new ApiSuccessResponse<typeof bookingId>(200, bookingId);

        return response;
    }
}

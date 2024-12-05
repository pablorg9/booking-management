import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, interfaces, httpPost, request, httpGet } from 'inversify-express-utils';
import { PaymentAppService } from '@application/services';
import { ApiSuccessResponse, validateUserAuth } from '@utils';
import { IPaymentDTO } from '@interfaces/DTOs';
import { createPaymentSchema, validate } from '../validators';
import { jwtMiddleware } from '../middlewares';

@controller('/payments')
export class PaymentController implements interfaces.Controller {
    constructor(@inject(PaymentAppService) private _paymentAppService: PaymentAppService) {}

    @httpPost('/', validate(createPaymentSchema))
    async createPayment(@request() req: Request) {
        const paymentDTO: IPaymentDTO = req.body;
        const payment = await this._paymentAppService.createPayment(paymentDTO);
        const response = new ApiSuccessResponse<typeof payment>(201, payment);

        return response;
    }

    @httpGet('/my-payments', jwtMiddleware)
    async listMyBookings(@request() req: Request) {
        const user_id = req.auth?.user.id;
        validateUserAuth(user_id);

        const payments = await this._paymentAppService.listMyPayments(user_id);
        const response = new ApiSuccessResponse<typeof payments>(200, payments);

        return response;
    }
}

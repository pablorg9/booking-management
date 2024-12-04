import 'reflect-metadata';
import { inject } from 'inversify';
import { Request } from 'express';
import { controller, interfaces, httpPost, request } from 'inversify-express-utils';
import { PaymentAppService } from '@application/services';
import { ApiSuccessResponse } from '@utils';
import { IPaymentDTO } from '@interfaces/DTOs';
import { createPaymentSchema, validate } from '../validators';

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
}

import { inject, injectable } from 'inversify';
import { IPaymentRepository } from '@domain/repositories';
import axios from 'axios';
import { IEnvironments } from '@setup/interfaces';
import { ErrorCode, StatusCode } from '@setup/utils';

@injectable()
export class PaymentRepository implements IPaymentRepository {
    constructor(@inject('ENVIRONMENTS') private _environments: IEnvironments) {}

    async createPayment(userId: string, amount: number, description: string, productId: string): Promise<void> {
        const body = {
            userId,
            amount,
            description,
            productId,
        };

        const response = await axios.post(`${this._environments.PAYMENT_MS.PAYMENT_MS_URL}/payments`, body, {
            headers: {
                Authorization: `Bearer ${this._environments.PAYMENT_MS.PAYMENT_SERVICE_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw {
                message: 'Error creating payment',
                status: StatusCode.INTERNAL_ERROR,
                code: ErrorCode.API_ERROR,
                customError: true,
            };
        }
    }
}

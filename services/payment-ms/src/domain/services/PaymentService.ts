import { injectable, inject } from 'inversify';
import { IPaymentRepository } from '@domain/repositories';
import { Payment } from '@domain/entities';
import { USER_REPOSITORY } from '@setup/Symbols';
import { getCurrentTime, getRandomStatus } from '@setup/utils/Common';

@injectable()
export class PaymentService {
    constructor(@inject(USER_REPOSITORY) private _paymentRepository: IPaymentRepository) {}

    async createPayment(payment: Payment): Promise<Payment> {
        payment.createdAt = getCurrentTime();
        payment.status = getRandomStatus();
        await this._paymentRepository.createPayment(payment);

        // TODO: call update status bookings
        return payment;
    }
}

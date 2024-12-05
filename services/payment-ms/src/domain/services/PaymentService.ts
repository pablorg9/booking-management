import { injectable, inject } from 'inversify';
import { IBookingRepository, IPaymentRepository } from '@domain/repositories';
import { Payment } from '@domain/entities';
import { BOOKING_REPOSITORY, PAYMENT_REPOSITORY } from '@setup/Symbols';
import { getRandomStatus } from '@setup/utils/Common';

@injectable()
export class PaymentService {
    constructor(
        @inject(PAYMENT_REPOSITORY) private _paymentRepository: IPaymentRepository,
        @inject(BOOKING_REPOSITORY) private _bookingRepository: IBookingRepository,
    ) {}

    async createPayment(payment: Payment): Promise<Payment> {
        payment.createdAt = new Date();
        payment.status = getRandomStatus();

        await this._paymentRepository.createPayment(payment);

        setImmediate(async () => {
            try {
                await this._bookingRepository.updateBookingStatus(payment.productId, payment.id, payment.status);
            } catch (error) {
                console.error('Failed to update booking status:', error);
            }
        });

        return payment;
    }

    async listMyPayments(userId: string): Promise<Payment[]> {
        return this._paymentRepository.listPaymentsByUserId(userId);
    }
}

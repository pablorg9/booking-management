import { injectable, inject } from 'inversify';
import { PaymentService } from '@domain/services';
import { IPaymentDTO } from '@interfaces/DTOs';
import { Payment } from '@domain/entities';
import { v4 } from 'uuid';

@injectable()
export class PaymentAppService {
    constructor(@inject(PaymentService) private _paymentService: PaymentService) {}

    async createPayment(paymentDTO: IPaymentDTO): Promise<Payment> {
        const payment = this.mapPaymentDTOToEntity(paymentDTO);
        await this._paymentService.createPayment(payment);
        return payment;
    }

    async listMyPayments(userId: string): Promise<Payment[]> {
        return this._paymentService.listMyPayments(userId);
    }

    private mapPaymentDTOToEntity = (dto: IPaymentDTO): Payment => {
        const id = v4();
        const payment = new Payment(id, dto.userId, dto.productId, dto.amount, dto.description);
        return payment;
    };
}

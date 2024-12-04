import { inject, injectable } from 'inversify';
import { IPaymentRepository } from '@domain/repositories';
import { Payment } from '@domain/entities';
import { POSTGRES } from '@setup/Symbols';
import { IPostgres } from './config';
import { IPaymentModel } from '@setup/interfaces/models';

@injectable()
export class PaymentRepository implements IPaymentRepository {
    private _postgresEntity: string = 'payments';
    constructor(@inject(POSTGRES) private _db: IPostgres) {}

    async createPayment(payment: Payment): Promise<void> {
        const paymentToSave = this.mapPaymentEntityToModel(payment);
        const client = await this._db.postgresDb.connect();
        try {
            const query = {
                text: `INSERT INTO ${this._postgresEntity}(payment_id, user_id, product_id, payment_amount, payment_currency, payment_status, payment_description, payment_createdAt) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
                values: [
                    paymentToSave.payment_id,
                    paymentToSave.user_id,
                    paymentToSave.product_id,
                    paymentToSave.payment_amount,
                    paymentToSave.payment_currency,
                    paymentToSave.payment_status,
                    paymentToSave.payment_description,
                    paymentToSave.payment_createdAt,
                ],
            };
            await client.query(query);
        } finally {
            client.release();
        }
    }

    private mapPaymentEntityToModel = (payment: Payment): IPaymentModel => {
        return {
            payment_id: payment.id,
            product_id: payment.productId,
            user_id: payment.userId,
            payment_amount: payment.amount,
            payment_currency: payment.currency,
            payment_status: payment.status,
            payment_description: payment.description,
            payment_createdAt: payment.createdAt,
        };
    };
}

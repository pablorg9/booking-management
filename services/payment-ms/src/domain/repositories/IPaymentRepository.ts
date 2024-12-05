import { Payment } from '@domain/entities';

export interface IPaymentRepository {
    createPayment(_payment: Payment): Promise<void>;
    listPaymentsByUserId(_userId: string): Promise<Payment[]>;
}

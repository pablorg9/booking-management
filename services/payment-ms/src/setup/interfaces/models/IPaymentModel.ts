export interface IPaymentModel {
    payment_id: string;
    user_id: string;
    product_id: string;
    payment_amount: number;
    payment_currency: string;
    payment_status: 'PENDING' | 'DECLINED' | 'APPROVED';
    payment_description: string;
    payment_createdAt: Date | string | null;
}

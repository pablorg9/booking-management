export interface IPaymentRepository {
    createPayment(_userId: string, _amount: number, _description: string, _productId: string): Promise<void>;
}

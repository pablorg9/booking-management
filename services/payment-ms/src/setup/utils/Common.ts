import { PaymentStatus } from '@domain/value-objects';

export const getRandomStatus = (): PaymentStatus => {
    return Math.random() < 0.5 ? 'APPROVED' : 'DECLINED';
};

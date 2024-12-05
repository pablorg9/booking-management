import { PaymentStatus } from '@domain/value-objects';

export const getCurrentTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

export const getRandomStatus = (): PaymentStatus => {
    return Math.random() < 0.5 ? 'APPROVED' : 'DECLINED';
};

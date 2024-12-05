import { IEnvironments } from '@setup/interfaces';

export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'dev';

export const ENVIRONMENTS: IEnvironments = {
    MONGO: {
        HOST: process.env.DB_MONGO_HOST || '',
        USER: process.env.DB_MONGO_USER || '',
        PASSWORD: process.env.DB_MONGO_PASSWORD || '',
        DATABASE: process.env.DB_MONGO_DATABASE || '',
        PORT: process.env.DB_MONGO_DOCKER_PORT || '',
    },
    SECRET_JWT: process.env.SECRET_JWT || '',
    PAYMENT_MS: {
        PAYMENT_MS_URL: process.env.PAYMENT_MS_URL || '',
        PAYMENT_SERVICE_TOKEN: process.env.PAYMENT_SERVICE_TOKEN || '',
    },
};

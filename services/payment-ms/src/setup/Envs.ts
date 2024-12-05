import { IEnvironments } from '@setup/interfaces';

export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'dev';

export const ENVIRONMENTS: IEnvironments = {
    POSTGRES: {
        DATABASE: process.env.DB_POSTGRES_DATABASE || '',
        PORT: parseInt(process.env.DB_POSTGRES_PORT || '3306'),
        HOST: process.env.DB_POSTGRES_HOST || '',
        PASSWORD: process.env.DB_POSTGRES_PASSWORD || '',
        USER: process.env.DB_POSTGRES_USER || '',
    },
    SECRET_JWT: process.env.SECRET_JWT || '',
    BOOKING_MS: {
        BOOKING_MS_URL: process.env.BOOKING_MS_URL || '',
        BOOKING_SERVICE_TOKEN: process.env.BOOKING_SERVICE_TOKEN || '',
    },
};

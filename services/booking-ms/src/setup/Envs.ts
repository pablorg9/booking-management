import { IEnvironments } from '@setup/interfaces';

export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'dev';

export const ENVIRONMENTS: IEnvironments = {
    MYSQL: {
        DATABASE: process.env.DB_MYSQL_DATABASE || '',
        PORT: parseInt(process.env.DB_MYSQL_PORT || '3306'),
        HOST: process.env.DB_MYSQL_HOST || '',
        PASSWORD: process.env.DB_MYSQL_PASSWORD || '',
        USER: process.env.DB_MYSQL_USER || '',
    },
    MONGO: {
        HOST: process.env.DB_MONGO_HOST || '',
        USER: process.env.DB_MONGO_USER || '',
        PASSWORD: process.env.DB_MONGO_PASSWORD || '',
        DATABASE: process.env.DB_MONGO_DATABASE || '',
        PORT: process.env.DB_MONGO_DOCKER_PORT || '',
    },
    SECRET_JWT: process.env.SECRET_JWT || '',
};

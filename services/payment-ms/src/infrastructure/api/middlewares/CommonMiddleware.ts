import { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';

export const middlewares = (application: Application): void => {
    application.use(cors());
    application.use(json());
    application.use(
        urlencoded({
            extended: true,
            limit: '1mb',
            parameterLimit: 10000,
        }),
    );
    application.use(morgan('combined'));
    application.use(helmet());
};

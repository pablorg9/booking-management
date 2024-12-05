export interface IEnvironments {
    POSTGRES: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
    };
    SECRET_JWT: string;
    BOOKING_MS: {
        BOOKING_MS_URL: string;
        BOOKING_SERVICE_TOKEN: string;
    };
}

export interface IQueryParams {
    columns?: string;
    entity?: string;
    join?: string;
    condition?: string;
    limit?: string | number;
    groupBy?: number;
    orderBy?: string;
}

export interface IEnvironments {
    MYSQL: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
    };
    MONGO: {
        HOST: string;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
        PORT: string;
    };
    SECRET_JWT: string;
}

export interface IQueryParams {
    columns?: string;
    entity?: string;
    join?: string;
    condition?: string;
    values?: string[];
    limit?: string | number;
    groupBy?: number;
    orderBy?: string;
    getTotalRows?: boolean;
}

export interface IEnvironments {
    MONGO: {
        HOST: string;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
        PORT: string;
    };
    SECRET_JWT: string;
    PAYMENT_MS: {
        PAYMENT_MS_URL: string;
        PAYMENT_SERVICE_TOKEN: string;
    };
}

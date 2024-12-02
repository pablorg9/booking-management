import { expressjwt } from 'express-jwt';

// JWT validation middleware
export const jwtMiddleware = expressjwt({
    secret: process.env.SECRET_JWT as string,
    algorithms: ['HS256'],
});

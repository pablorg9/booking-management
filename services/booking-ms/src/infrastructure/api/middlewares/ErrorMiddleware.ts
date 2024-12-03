import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse, ErrorCode } from '@utils';
interface MySqlError extends Error {
    code: string;
    errno: number;
    sqlState?: string;
}

export const errorMiddleware = (
    error: MySqlError | any,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response | void => {
    if (error.customError) {
        return new ApiErrorResponse(error.status, error.code, error.message).send(res);
    }

    if (error.status && error.status === 401) {
        return new ApiErrorResponse(401, ErrorCode.INVALID_ACCESS_TOKEN, error.message).send(res);
    }

    return new ApiErrorResponse(500, ErrorCode.UNKNOWN, error.message).send(res);
};

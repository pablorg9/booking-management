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

    // Manejo de errores de autenticación
    if (error.status && error.status === 401) {
        return new ApiErrorResponse(401, ErrorCode.INVALID_ACCESS_TOKEN, error.message).send(res);
    }

    // Manejo de errores de MySQL
    if (error.code) {
        switch (error.code) {
            case 'ER_DUP_ENTRY':
                // Error de clave duplicada
                return new ApiErrorResponse(500, ErrorCode.DUPLICATE_ENTRY, 'Duplicate entry').send(res);
            case 'ER_PARSE_ERROR':
                // Error de sintaxis en la consulta SQL
                return new ApiErrorResponse(500, ErrorCode.SQL_SYNTAX_ERROR, 'SQL syntax error').send(res);
            // Agrega otros errores de MySQL según sea necesario
            default:
                // Error desconocido de MySQL
                return new ApiErrorResponse(500, ErrorCode.UNKNOWN_DATABASE_ERROR, error.message).send(res);
        }
    }

    // Manejo de otros errores no previstos
    return new ApiErrorResponse(500, ErrorCode.UNKNOWN, error.message).send(res);
};

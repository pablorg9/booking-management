/* eslint-disable no-unused-vars */
import { Response } from 'express';

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    PRECONDITION_FAILED = 412,
    I_AM_A_TEAPOT = 418,
    PRECONDITION_REQUIRED = 428,
    INTERNAL_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

export enum ErrorCode {
    SUCCESS = 'S001',
    RETRY = 'R001',
    UNKNOWN = 'F001',
    FAILURE = 'F002',
    API_ERROR = 'F003',
    API_ERROR_TIMEOUT = 'F004',
    INVALID_ACCESS_TOKEN = 'F005',
    UNAUTHORIZED = 'F006',
    INVALID_PARAMETERS = 'F007',
    // Custom Failure Codes
    EVENT_HAS_BOOKING = 'CF001',
    BOOKING_DUPLICITY = 'CF002',
}

export const validateUserAuth = (user_id: string | null | undefined) => {
    if (!user_id) {
        throw new ApiErrorResponse(StatusCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, 'Invalid token object');
    }
};

export abstract class ApiResponse<T> {
    isError: boolean;
    status: StatusCode;
    code: ErrorCode;
    message: string;
    data?: T;

    constructor(isError: boolean, status: StatusCode, code: ErrorCode, message: string, data?: T) {
        this.isError = isError;
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    protected prepare(res: Response): Response {
        return res.status(this.status).json(this);
    }

    public send(res: Response): Response {
        return this.prepare(res);
    }
}

export class ApiSuccessResponse<T> extends ApiResponse<T> {
    constructor(status: StatusCode, data?: T, message?: string) {
        super(false, status, ErrorCode.SUCCESS, message || 'Successful Operation', data);
    }
}

export class ApiErrorResponse extends ApiResponse<null> {
    constructor(status: StatusCode, code: ErrorCode, message: string) {
        super(true, status, code, message);
    }
}

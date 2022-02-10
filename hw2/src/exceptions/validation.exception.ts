import { Exception } from './exception';
import { StatusCodes } from 'http-status-codes';

export class ValidationException extends Exception {
    constructor(message: string) {
        message = `Error while validation: ${message}`
        const statusCode = StatusCodes.BAD_REQUEST;
        super(message, statusCode);
    }
}
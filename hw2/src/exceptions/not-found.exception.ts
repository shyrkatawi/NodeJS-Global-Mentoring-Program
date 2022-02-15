import { Exception } from './exception';
import { StatusCodes } from 'http-status-codes';

export class NotFoundException extends Exception {
    constructor(message: string) {
        const statusCode = StatusCodes.NOT_FOUND;
        super(message, statusCode);
    }
}
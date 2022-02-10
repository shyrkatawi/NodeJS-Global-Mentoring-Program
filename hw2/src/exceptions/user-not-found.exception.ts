import { Exception } from './exception';
import { StatusCodes } from 'http-status-codes';

export class UserNotFoundException extends Exception {
    constructor(id: string) {
        const message = `Can not get user with id "${id}", not found`
        const statusCode = StatusCodes.NOT_FOUND;
        super(message, statusCode);
    }
}
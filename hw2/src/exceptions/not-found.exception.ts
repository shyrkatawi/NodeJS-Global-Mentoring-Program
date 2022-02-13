import { Exception } from './exception';
import { StatusCodes } from 'http-status-codes';

export class NotFoundException extends Exception {
    constructor(id: string, entityName: string) {
        const message = `Can not find ${entityName} with id "${id}.`;
        const statusCode = StatusCodes.NOT_FOUND;
        super(message, statusCode);
    }
}
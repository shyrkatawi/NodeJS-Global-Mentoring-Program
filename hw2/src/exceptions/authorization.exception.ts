import { Exception } from './exception';

export class AuthorizationException extends Exception {
    constructor(message: string, statusCode: number) {
        message = `Error while authorization: ${message}`;
        super(message, statusCode);
    }
}
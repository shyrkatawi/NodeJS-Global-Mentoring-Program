import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { AuthorizationException } from '../exceptions/authorization.exception';

export const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        throw new AuthorizationException('no token', StatusCodes.UNAUTHORIZED);
    }

    const token = authorizationHeader.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_KEY, (err) => {
        if (err) {
            throw new AuthorizationException('forbidden', StatusCodes.FORBIDDEN);
        }
    });

    next();
};

import winston from 'winston';
import { defaultErrorMessage } from './error-handling.middleware';
import { StatusCodes } from 'http-status-codes';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

export const logRequestInfo = (req, res, next) => {
    const message = {
        body: req.body,
        method: req.method,
        url: req.url
    };
    logger.info(message);
    next();
};

export const logErrorInfo = (err, req, res, next) => {
    const errorMessage = err.original?.detail || err.message || defaultErrorMessage;
    const errorStatusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = {
        body: req.body,
        method: req.method,
        url: req.url,
        error: {
            message: errorMessage,
            statusCode: errorStatusCode
        }
    };
    logger.info(message);
    next(err);
};


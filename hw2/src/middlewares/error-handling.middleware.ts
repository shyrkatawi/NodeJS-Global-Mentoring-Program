import { StatusCodes } from 'http-status-codes';

export const defaultErrorMessage = 'Internal Server Error';

export const handleErrorFromDB = (err, req, res, next) => {
    if (err.original?.detail) {
        res.status(StatusCodes.BAD_REQUEST);
        res.send(`ERROR: ${err.message}`);
    } else {
        next(err);
    }
};

export const handleException = (err, req, res, next) => {
    if (err.message && err.statusCode) {
        res.status(err.statusCode);
        res.send(`ERROR: ${err.message}`);
    } else {
        next(err);
    }
};

export const handleOtherErrors = (err, req, res, next) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(defaultErrorMessage);
    next();
};
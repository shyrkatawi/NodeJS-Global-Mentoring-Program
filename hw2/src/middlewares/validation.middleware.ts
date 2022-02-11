import Joi from 'joi';
import { ValidationException } from '../exceptions/validation.exception';
import { idInParamsScheme } from '../schemes/user.scheme';

export const validateIdInParams = () => {
    return (req, res, next) => {
        const { error } = idInParamsScheme.validate(req.params.id);
        if (error) {
            next(generateValidationException(error));
        }
        next();
    };
};

export const validateBodySchema = (schema: Joi.ObjectSchema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error) {
            next(generateValidationException(error));
        }
        next();
    };
};

const generateValidationException = (error) => {
    const { details } = error;
    const message = details.map(i => i.message).join(', ');
    return new ValidationException(message);
};
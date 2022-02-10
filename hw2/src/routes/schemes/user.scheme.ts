import Joi from 'joi';

export const requestUserScheme = Joi.object().keys({
    age: Joi.number()
        .min(4)
        .max(130)
        .required()
        .messages({
            'number.min': `user age must be a number in range 4-130 include`,
            'number.max': `user age must be a number in range 4-130 include`
        }),
    login: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(/([a-zA-Z]+\d+)|(\d+[a-zA-Z]+)/)
        .required()
        .messages({
            'string.pattern.base': `user password should contains letters and numbers`
        })
});

export const getAutoSuggestUsersScheme = Joi.object().keys({
    loginSubstring: Joi.string()
        .required(),
    limit: Joi.number()
        .required()
});

export const idInParamsScheme = Joi
    .string()
    .guid({
        version: [
            'uuidv4',
        ]})
    .required()
    .messages({
    'string.guid': `id in the request parameters should be in UUIDv4 format`
});

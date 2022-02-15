import Joi from 'joi';

export const requestUserScheme = Joi.object().keys({
    age: Joi
        .number()
        .required()
        .min(4)
        .max(130)
        .messages({
            'number.min': `user age must be a number in range 4-130 include`,
            'number.max': `user age must be a number in range 4-130 include`
        }),
    login: Joi
        .string()
        .required()
        .pattern(/^\w+$/),
    password: Joi
        .string()
        .required()
        .pattern(/([a-zA-Z]+\d+)|(\d+[a-zA-Z]+)/)
        .messages({
            'string.pattern.base': `user password should contains letters and numbers`
        })
});

export const getAutoSuggestUsersScheme = Joi.object().keys({
    loginSubstring: Joi
        .string()
        .pattern(/^\w+$/)
        .required(),
    limit: Joi
        .number()
        .min(0)
        .required()
});

export const loginScheme = Joi.object().keys({
    login: Joi.string()
        .pattern(/^\w+$/)
        .required(),
    password: Joi.string()
        .required()
        .pattern(/([a-zA-Z]+\d+)|(\d+[a-zA-Z]+)/)
        .messages({
            'string.pattern.base': `password should contains letters and numbers`
        })
});

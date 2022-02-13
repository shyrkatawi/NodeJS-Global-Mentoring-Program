import Joi from 'joi';

export const idInParamsScheme = Joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .messages({ 'string.guid': `id in the request parameters should be in UUIDv4 format` });

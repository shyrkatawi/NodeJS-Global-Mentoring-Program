import Joi from 'joi';
import { Permission } from '../types/permission';

export const requestGroupScheme = Joi.object().keys({
    name: Joi.string()
        .required()
        .pattern(/^\w+$/),
    permissions: Joi.array()
        .required()
        .min(1)
        .items(Joi.string().valid(...Object.values(Permission)))
        .unique()
});

export const addUsersToGroupScheme = Joi.object().keys({
    groupId: Joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required()
        .messages({ 'string.guid': `groupId should be in UUIDv4 format` }),
    userIds: Joi.array()
        .required()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] }))
        .unique()
});

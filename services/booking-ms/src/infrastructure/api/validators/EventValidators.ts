import Joi from 'joi';

export const createEventSchema = Joi.object({
    name: Joi.string().required(),
    maxTotalAttenders: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    details: Joi.object().required(),
    datetime: Joi.date().iso().required(),
});

export const eventIdSchema = Joi.string().length(24).hex().required();

export const moveEventSchema = Joi.object({
    datetime: Joi.date().iso().required(),
});

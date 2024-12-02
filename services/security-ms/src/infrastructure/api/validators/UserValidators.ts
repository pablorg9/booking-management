import Joi from 'joi';

export const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
});

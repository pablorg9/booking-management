import Joi from 'joi';

export const createPaymentSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    productId: Joi.string().length(24).hex().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
});

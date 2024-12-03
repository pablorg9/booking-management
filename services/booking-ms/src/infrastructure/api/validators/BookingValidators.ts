import Joi from 'joi';

export const createBookingSchema = Joi.object({
    eventId: Joi.string().length(24).hex().required(),
});

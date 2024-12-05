import Joi from 'joi';

export const createBookingSchema = Joi.object({
    eventId: Joi.string().length(24).hex().required(),
});

export const updateBookingStatusSchema = Joi.object({
    bookingId: Joi.string().length(24).hex().required(),
    paymentId: Joi.string().uuid().required(),
    status: Joi.string().valid('APPROVED', 'DECLINED').required(),
});

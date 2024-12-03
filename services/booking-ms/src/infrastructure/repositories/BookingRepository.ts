import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IBookingRepository } from '@domain/repositories';
import { IMongo } from './config';
import { MONGO } from '@setup/Symbols';
import { Booking } from '@domain/entities';
import { IBookingModel } from '@setup/interfaces/models';
import { ObjectId } from 'mongodb';

@injectable()
export class BookingRepository implements IBookingRepository {
    private _defaultCollection = 'bookings';

    constructor(@inject(MONGO) private _mongo: IMongo) {}

    async createBooking(booking: Booking): Promise<void> {
        const bookingToSave = this.mapBookingEntityToModel(booking);
        await this._mongo.db.collection(this._defaultCollection).insertOne(bookingToSave);
    }

    private mapBookingEntityToModel = (booking: Booking): IBookingModel => {
        return {
            _id: new ObjectId(booking.id),
            payment_id: booking.paymentId,
            user_id: booking.userId,
            event_id: booking.eventId,
            event_name: booking.eventName,
            event_price: booking.price,
            booking_status: booking.status,
            booking_createdAt: booking.createdAt,
            booking_updatedAt: booking.updatedAt,
        };
    };
}

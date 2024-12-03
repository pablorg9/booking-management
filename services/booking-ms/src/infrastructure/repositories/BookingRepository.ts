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

    async listBookingsByUserId(userId: string): Promise<Booking[]> {
        const bookings = await this._mongo.db
            .collection<IBookingModel>(this._defaultCollection)
            .find({ user_id: userId })
            .toArray();

        return bookings.map((booking) => this.mapBookingModelToEntity(booking));
    }

    async eventHasBookings(eventId: string): Promise<boolean> {
        const id = new ObjectId(eventId);
        const hasBookings = await this._mongo.db
            .collection<IBookingModel>(this._defaultCollection)
            .findOne({ event_id: id });

        return hasBookings ? true : false;
    }

    private mapBookingEntityToModel = (booking: Booking): IBookingModel => {
        return {
            _id: new ObjectId(booking.id),
            payment_id: booking.paymentId,
            user_id: booking.userId,
            event_id: new ObjectId(booking.eventId),
            event_name: booking.eventName,
            event_price: booking.price,
            booking_status: booking.status,
            booking_createdAt: booking.createdAt,
            booking_updatedAt: booking.updatedAt,
        };
    };

    private mapBookingModelToEntity = (booking: IBookingModel): Booking => {
        if (!booking) return {} as Booking;
        return new Booking(
            booking._id.toHexString(),
            booking.user_id,
            booking.event_id.toHexString(),
            booking.payment_id,
            booking.event_name,
            booking.booking_status,
            booking.event_price,
            booking.booking_createdAt,
            booking.booking_updatedAt,
        );
    };
}

import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IBookingRepository } from '@domain/repositories';
import { IMongo } from './config';
import { MONGO } from '@setup/Symbols';
import { Booking } from '@domain/entities';
import { IBookingModel } from '@setup/interfaces/models';
import { ObjectId } from 'mongodb';
import { BookingStatus } from '@domain/value-objects';

@injectable()
export class BookingRepository implements IBookingRepository {
    private _defaultCollection = 'bookings';

    constructor(@inject(MONGO) private _mongo: IMongo) {}

    async createBooking(booking: Booking): Promise<void> {
        const bookingToSave = this.mapBookingEntityToModel(booking);
        await this._mongo.db.collection(this._defaultCollection).insertOne(bookingToSave);
    }

    async findBookingById(bookingId: string): Promise<Booking> {
        const id = new ObjectId(bookingId);
        const booking = await this._mongo.db.collection<IBookingModel>(this._defaultCollection).findOne({ _id: id });
        if (!booking) return {} as Booking;
        return this.mapBookingModelToEntity(booking);
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

        return !!hasBookings;
    }

    async userHasBooked(eventId: string, userId: string): Promise<boolean> {
        const id = new ObjectId(eventId);
        const hasBookings = await this._mongo.db
            .collection<IBookingModel>(this._defaultCollection)
            .findOne({ event_id: id, user_id: userId });
        console.log(hasBookings);
        return !!hasBookings;
    }

    async deleteBooking(bookingId: string): Promise<void> {
        const id = new ObjectId(bookingId);
        await this._mongo.db.collection(this._defaultCollection).deleteOne({ _id: id });
    }

    async updateBookingStatusAndPaymentIdById(
        bookingId: string,
        paymentId: string,
        status: BookingStatus,
        updatedAt: Date,
    ): Promise<void> {
        const id = new ObjectId(bookingId);
        await this._mongo.db.collection(this._defaultCollection).updateOne(
            { _id: id },
            {
                $set: {
                    payment_id: paymentId,
                    booking_status: status,
                    booking_updatedAt: updatedAt,
                },
            },
        );
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

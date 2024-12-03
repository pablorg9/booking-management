import { ObjectId } from 'mongodb';

export interface IBookingModel {
    _id: ObjectId;
    event_id: string;
    user_id: string;
    payment_id: string;
    event_name: string;
    event_price: number;
    booking_status: string;
    booking_createdAt: Date | string | null;
    booking_updatedAt: Date | string | null;
}

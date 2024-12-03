import { ObjectId } from 'mongodb';

export interface IEventModel {
    _id: ObjectId;
    user_id: string;
    event_name: string;
    event_maxTotalAttenders: number;
    event_price: number;
    event_description: string;
    event_details: Record<string, any>;
    event_datetime: Date | string;
    event_createdAt: Date | string | null;
}

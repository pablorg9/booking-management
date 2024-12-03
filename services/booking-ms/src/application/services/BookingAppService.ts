import { injectable, inject } from 'inversify';
import { BookingService } from '@domain/services';
import { IBookingDTO } from '@setup/interfaces/DTOs';
import { Booking } from '@domain/entities';
import { ObjectId } from 'mongodb';

@injectable()
export class BookingAppService {
    constructor(@inject(BookingService) private _bookingService: BookingService) {}

    async createBooking(bookingDTO: IBookingDTO): Promise<Booking> {
        const booking = this.mapBookingDTOToEntity(bookingDTO);
        return this._bookingService.createBooking(booking);
    }

    private mapBookingDTOToEntity = (dto: IBookingDTO): Booking => {
        const id = dto.id ? dto.id : new ObjectId().toHexString();
        const user = new Booking(id, dto.userId, dto.eventId, dto.paymentId);
        return user;
    };
}

import { Container } from 'inversify';
import { IEnvironments } from '@interfaces/index';
import { ENVIRONMENTS } from './Envs';
import { BookingController, EventController } from '@infrastructure/api/controllers';
import { BookingAppService, EventAppService } from '@application/services';
import { BookingService, EventService } from '@domain/services';
import { IBookingRepository, IEventRepository, IPaymentRepository } from '@domain/repositories';
import { BookingRepository, EventRepository, PaymentRepository } from '@infrastructure/repositories';
import { BOOKING_REPOSITORY, EVENT_REPOSITORY, MONGO, PAYMENT_REPOSITORY } from './Symbols';
import { IMongo, MongoConnection } from '@infrastructure/repositories/config';

const container = new Container();

container.bind<IEnvironments>('ENVIRONMENTS').toConstantValue(ENVIRONMENTS);
container.bind<IMongo>(MONGO).to(MongoConnection).inSingletonScope();

// ==================== CONTROLLERS ======================
container.bind<EventController>(EventController).toSelf().inSingletonScope();
container.bind<BookingController>(BookingController).toSelf().inSingletonScope();

// ==================== APP_SERVICES =====================
container.bind<EventAppService>(EventAppService).toSelf().inSingletonScope();
container.bind<BookingAppService>(BookingAppService).toSelf().inSingletonScope();

// ==================== REPOSITORIES =====================
container.bind<IEventRepository>(EVENT_REPOSITORY).to(EventRepository).inSingletonScope();
container.bind<IBookingRepository>(BOOKING_REPOSITORY).to(BookingRepository).inSingletonScope();
container.bind<IPaymentRepository>(PAYMENT_REPOSITORY).to(PaymentRepository).inSingletonScope();

// ==================== DOMAIN_SERVICE ===================
container.bind<EventService>(EventService).toSelf().inRequestScope();
container.bind<BookingService>(BookingService).toSelf().inRequestScope();

export { container };

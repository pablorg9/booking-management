import { Container } from 'inversify';
import { IEnvironments } from '@interfaces/index';
import { ENVIRONMENTS } from './Envs';
import { PaymentController } from '@infrastructure/api/controllers';
import { PaymentAppService } from '@application/services';
import { PaymentService } from '@domain/services';
import { IBookingRepository, IPaymentRepository } from '@domain/repositories';
import { BookingRepository, PaymentRepository } from '@infrastructure/repositories';
import { POSTGRES, PAYMENT_REPOSITORY, BOOKING_REPOSITORY } from './Symbols';
import { IPostgres, PostgresConnection } from '@infrastructure/repositories/config';

const container = new Container();

container.bind<IEnvironments>('ENVIRONMENTS').toConstantValue(ENVIRONMENTS);
container.bind<IPostgres>(POSTGRES).to(PostgresConnection).inSingletonScope();

// ==================== CONTROLLERS ======================
container.bind<PaymentController>(PaymentController).toSelf().inSingletonScope();

// ==================== APP_SERVICES =====================
container.bind<PaymentAppService>(PaymentAppService).toSelf().inSingletonScope();

// ==================== REPOSITORIES =====================
container.bind<IPaymentRepository>(PAYMENT_REPOSITORY).to(PaymentRepository).inSingletonScope();
container.bind<IBookingRepository>(BOOKING_REPOSITORY).to(BookingRepository).inSingletonScope();

// ==================== DOMAIN_SERVICE ===================
container.bind<PaymentService>(PaymentService).toSelf().inRequestScope();

export { container };

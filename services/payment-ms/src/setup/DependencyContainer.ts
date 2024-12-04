import { Container } from 'inversify';
import { IEnvironments } from '@interfaces/index';
import { ENVIRONMENTS } from './Envs';
import { PaymentController } from '@infrastructure/api/controllers';
import { PaymentAppService } from '@application/services';
import { PaymentService } from '@domain/services';
import { IPaymentRepository } from '@domain/repositories';
import { PaymentRepository } from '@infrastructure/repositories';
import { POSTGRES, USER_REPOSITORY } from './Symbols';
import { IPostgres, PostgresConnection } from '@infrastructure/repositories/config';

const container = new Container();

container.bind<IEnvironments>('ENVIRONMENTS').toConstantValue(ENVIRONMENTS);
container.bind<IPostgres>(POSTGRES).to(PostgresConnection).inSingletonScope();

// ==================== CONTROLLERS ======================
container.bind<PaymentController>(PaymentController).toSelf().inSingletonScope();

// ==================== APP_SERVICES =====================
container.bind<PaymentAppService>(PaymentAppService).toSelf().inSingletonScope();

// ==================== REPOSITORIES =====================
container.bind<IPaymentRepository>(USER_REPOSITORY).to(PaymentRepository).inSingletonScope();

// ==================== DOMAIN_SERVICE ===================
container.bind<PaymentService>(PaymentService).toSelf().inRequestScope();

export { container };

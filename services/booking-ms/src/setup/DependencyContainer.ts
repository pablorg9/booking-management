import { Container } from 'inversify';
import { IEnvironments } from '@interfaces/index';
import { ENVIRONMENTS } from './Envs';
import { EventController } from '@infrastructure/api/controllers';
import { EventAppService } from '@application/services';
import { EventService } from '@domain/services';
import { IEventRepository } from '@domain/repositories';
import { EventRepository } from '@infrastructure/repositories';
import { EVENT_REPOSITORY, MONGO } from './Symbols';
import { IMongo, MongoConnection } from '@infrastructure/repositories/config';

const container = new Container();

container.bind<IEnvironments>('ENVIRONMENTS').toConstantValue(ENVIRONMENTS);
container.bind<IMongo>(MONGO).to(MongoConnection).inSingletonScope();

// ==================== CONTROLLERS ======================
container.bind<EventController>(EventController).toSelf().inSingletonScope();

// ==================== APP_SERVICES =====================
container.bind<EventAppService>(EventAppService).toSelf().inSingletonScope();

// ==================== REPOSITORIES =====================
container.bind<IEventRepository>(EVENT_REPOSITORY).to(EventRepository).inSingletonScope();

// ==================== DOMAIN_SERVICE ===================
container.bind<EventService>(EventService).toSelf().inRequestScope();

export { container };

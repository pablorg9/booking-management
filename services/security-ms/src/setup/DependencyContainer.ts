import { Container } from 'inversify';
import { IEnvironments } from '@interfaces/index';
import { ENVIRONMENTS } from './Envs';
import { UserController } from '@infrastructure/api/controllers';
import { UserAppService } from '@application/services';
import { UserService } from '@domain/services';
import { IUserRepository } from '@domain/repositories';
import { UserRepository } from '@infrastructure/repositories';
import { MYSQL, USER_REPOSITORY } from './Symbols';
import { IMysql, MysqlConnection } from '@infrastructure/repositories/config';

const container = new Container();

container.bind<IEnvironments>('ENVIRONMENTS').toConstantValue(ENVIRONMENTS);
container.bind<IMysql>(MYSQL).to(MysqlConnection).inSingletonScope();

// ==================== CONTROLLERS ======================
container.bind<UserController>(UserController).toSelf().inSingletonScope();

// ==================== APP_SERVICES =====================
container.bind<UserAppService>(UserAppService).toSelf().inSingletonScope();

// ==================== REPOSITORIES =====================
container.bind<IUserRepository>(USER_REPOSITORY).to(UserRepository).inSingletonScope();

// ==================== DOMAIN_SERVICE ===================
container.bind<UserService>(UserService).toSelf().inRequestScope();

export { container };

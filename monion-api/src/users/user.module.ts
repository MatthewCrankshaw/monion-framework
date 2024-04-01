import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRegistrationService } from './user.registration.service';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { ErrorModule } from 'src/error/error.module';
import { UserRetrievalService } from './user.retrieval.service';
import { OAuthMiddleware } from 'src/auth/oauth.middleware';
import { OAuthModule } from 'src/auth/oauth.module';

/**
 * This module is responsible for managing user-related functionality.
 */
@Module({
  imports: [DatabaseModule, OAuthModule, ErrorModule],
  providers: [
    {
      provide: UserRegistrationService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(UserEntity);
        return new UserRegistrationService(repository);
      },
    },
    {
      provide: UserRetrievalService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(UserEntity);
        return new UserRetrievalService(repository);
      },
    },
  ],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OAuthMiddleware)
      .exclude({ path: 'user/register', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}

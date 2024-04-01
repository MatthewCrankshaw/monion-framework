import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRegistrationService } from './user.registration.service';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { ErrorModule } from 'src/error/user.module';

/**
 * This module is responsible for managing user-related functionality.
 */
@Module({
  imports: [DatabaseModule, ErrorModule],
  providers: [
    {
      provide: UserRegistrationService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(UserEntity);
        return new UserRegistrationService(repository);
      },
    },
  ],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}

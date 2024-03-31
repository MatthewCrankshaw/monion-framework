import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRegistrationService } from './user.registration.service';
import { DataSource } from 'typeorm';
import { Users } from './users.entity';
import { DatabaseModule } from 'src/database/database.module';

/**
 * This module is responsible for managing user-related functionality.
 */
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserRegistrationService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(Users);
        return new UserRegistrationService(repository);
      },
    },
  ],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}

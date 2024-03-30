import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
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
      provide: UsersService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(Users);
        return new UsersService(repository);
      },
    },
  ],
  controllers: [UsersController],
  exports: [UserModule],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { Configurator } from './configurator.service';

@Module({
  providers: [Configurator, ...databaseProviders],
  exports: [Configurator, ...databaseProviders],
})
export class DatabaseModule {}

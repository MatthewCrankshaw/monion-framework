import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class Configurator {
  constructor(private config: ConfigService) {}

  public getORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('POSTGRES_HOST'),
      port: this.config.get<number>('POSTGRES_PORT'),
      username: this.config.get<string>('POSTGRES_USER'),
      password: this.config.get<string>('POSTGRES_PASSWORD'),
      database: this.config.get<string>('POSTGRES_DB'),
      entities: ['**.*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['**.*.migration{.ts,.js}'],
      ssl: this.config.get<string>('MODE') != 'development',
    };
  }
}

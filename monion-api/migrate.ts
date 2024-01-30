import { ConfigService } from '@nestjs/config';
import { OAuthClients } from 'src/auth/oauth-clients.entity';
import { Users } from 'src/users/users.entity';
import { DataSource } from 'typeorm';

const config = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.get<string>('POSTGRES_HOST'),
  port: config.get<number>('POSTGRES_PORT'),
  username: config.get<string>('POSTGRES_USER'),
  password: config.get<string>('POSTGRES_PASSWORD'),
  database: config.get<string>('POSTGRES_DB'),
  entities: [OAuthClients, Users],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  ssl: config.get<string>('MODE') != 'development',
});

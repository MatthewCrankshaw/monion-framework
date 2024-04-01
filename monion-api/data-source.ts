import { ConfigService } from '@nestjs/config';
import { OAuthAuthorisationCodes } from 'src/auth/oauth-authorisation-codes.entity';
import { OAuthClients } from 'src/auth/oauth-clients.entity';
import { OAuthTokens } from 'src/auth/oauth-tokens.entity';
import { UserEntity } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

const config = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.get<string>('POSTGRES_HOST'),
  port: config.get<number>('POSTGRES_PORT'),
  username: config.get<string>('POSTGRES_USER'),
  password: config.get<string>('POSTGRES_PASSWORD'),
  database: config.get<string>('POSTGRES_DB'),
  entities: [OAuthClients, OAuthTokens, OAuthAuthorisationCodes, UserEntity],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  ssl: config.get<string>('MODE') != 'development',
});

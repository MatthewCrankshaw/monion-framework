import { ConfigService } from '@nestjs/config';
import { OAuthAuthorisationCodeEntity } from 'src/auth/oauth-authorisation-code.entity';
import { OAuthClientEntity } from 'src/auth/oauth-client.entity';
import { OAuthTokenEntity } from 'src/auth/oauth-token.entity';
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
  entities: [
    OAuthClientEntity,
    OAuthTokenEntity,
    OAuthAuthorisationCodeEntity,
    UserEntity,
  ],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  ssl: config.get<string>('MODE') != 'development',
});

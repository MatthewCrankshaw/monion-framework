import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { ServerOptions } from '@node-oauth/oauth2-server';
import OAuth2Server = require('@node-oauth/oauth2-server');
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { OAuthClientEntity } from './oauth-client.entity';
import { OAuthTokenEntity } from './oauth-token.entity';
import { ConfigModule } from '@nestjs/config';
import { OAuthAuthorisationCodeEntity } from './oauth-authorisation-code.entity';
import { UserEntity } from 'src/users/user.entity';
import { OAuthService } from './oauth.service';
import { OAuthMiddleware } from './oauth.middleware';

/**
 * Module for handling OAuth authentication and authorization.
 */
@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [OauthController],
  providers: [
    {
      provide: OAuth2Server,
      inject: [OAuthService],
      useFactory: (model: OAuthService) => {
        const options: ServerOptions = {
          model: model,
        };
        return new OAuth2Server(options);
      },
    },
    {
      provide: OAuthMiddleware,
      inject: [OAuth2Server],
      useFactory: (server: OAuth2Server) => {
        return new OAuthMiddleware(server);
      },
    },
    {
      provide: OAuthService,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        return new OAuthService(
          dataSource.getRepository(OAuthClientEntity),
          dataSource.getRepository(OAuthTokenEntity),
          dataSource.getRepository(OAuthAuthorisationCodeEntity),
          dataSource.getRepository(UserEntity),
        );
      },
    },
  ],
  exports: [OAuthModule, OAuth2Server],
})
export class OAuthModule {}

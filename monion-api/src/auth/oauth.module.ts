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
import {
  ACCESS_TOKEN_LIFETIME_SECONDS,
  REFRESH_TOKEN_LIFETIME_SECONDS,
} from './oauth-lifetime.constants';
import { OAuthHandlerService } from './oauth-handler.service';

/**
 * Module for handling OAuth authentication and authorization.
 */
@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [OauthController],
  providers: [
    OAuthHandlerService,
    {
      provide: OAuth2Server,
      inject: [OAuthService],
      useFactory: (model: OAuthService) => {
        const options: ServerOptions = {
          model: model,
          authorizationCodeLifetime: ACCESS_TOKEN_LIFETIME_SECONDS,
          accessTokenLifetime: ACCESS_TOKEN_LIFETIME_SECONDS,
          refreshTokenLifetime: REFRESH_TOKEN_LIFETIME_SECONDS,
        };
        return new OAuth2Server(options);
      },
    },
    {
      provide: OAuthMiddleware,
      inject: [OAuth2Server, OAuthHandlerService],
      useFactory: (server: OAuth2Server, handler: OAuthHandlerService) => {
        return new OAuthMiddleware(server, handler);
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
  exports: [OAuthModule, OAuth2Server, OAuthHandlerService, OAuthMiddleware],
})
export class OAuthModule {}

// oauth2.module.ts
import { Module } from '@nestjs/common';
import { OAuthClientCredentialsModel } from './oauth-client-credentials.service';
import { OauthController } from './oauth.controller';
import { ServerOptions } from '@node-oauth/oauth2-server';
import OAuth2Server = require('@node-oauth/oauth2-server');
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { OAuthClients } from './oauth-clients.entity';
import { OAuthTokens } from './oauth-tokens.entity';
import { ConfigModule } from '@nestjs/config';
import { OAuthCodeFlowModel } from './oauth-code-flow.service';
import { OAuthAuthorisationCodes } from './oauth-authorisation-codes.entity';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [OauthController],
  providers: [
    {
      provide: OAuth2Server,
      inject: [OAuthClientCredentialsModel],
      useFactory: (model: OAuthClientCredentialsModel) => {
        const options: ServerOptions = {
          model: model,
        };
        return new OAuth2Server(options);
      },
    },
    {
      provide: OAuth2Server,
      inject: [OAuthCodeFlowModel],
      useFactory: (model: OAuthCodeFlowModel) => {
        const options: ServerOptions = {
          model: model,
        };
        return new OAuth2Server(options);
      },
    },
    {
      provide: OAuthCodeFlowModel,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        return new OAuthCodeFlowModel(
          dataSource.getRepository(OAuthClients),
          dataSource.getRepository(OAuthTokens),
          dataSource.getRepository(OAuthAuthorisationCodes),
        );
      },
    },
    {
      provide: OAuthClientCredentialsModel,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        return new OAuthClientCredentialsModel(
          dataSource.getRepository(OAuthClients),
          dataSource.getRepository(OAuthTokens),
        );
      },
    },
  ],
  exports: [OAuthModule],
})
export class OAuthModule {}

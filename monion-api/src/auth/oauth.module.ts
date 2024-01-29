// oauth2.module.ts
import { Module } from '@nestjs/common';
import { OAuthClientCredentialsService } from './oauth-client-credentails.service';
import { OAuthClientCredentialsModel } from './oauth-client-credentials.entity';
import { OauthController } from './oauth.controller';
import { ServerOptions } from '@node-oauth/oauth2-server';
import OAuth2Server = require('@node-oauth/oauth2-server');
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { OAuthClients } from './oauth-clients.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [OauthController],
  providers: [
    {
      provide: OAuthClientCredentialsService,
      inject: [OAuthClientCredentialsModel],
      useFactory: (model: OAuthClientCredentialsModel) => {
        const options: ServerOptions = {
          model: model,
        };
        const server = new OAuth2Server(options);
        return new OAuthClientCredentialsService(server);
      },
    },
    {
      provide: OAuthClientCredentialsModel,
      inject: ['DATA_SOURCE'],
      useFactory: (dataSource: DataSource) => {
        return new OAuthClientCredentialsModel(
          dataSource.getRepository(OAuthClients),
          dataSource.getRepository(Users),
        );
      },
    },
  ],
  exports: [OAuthModule],
})
export class OAuthModule {}

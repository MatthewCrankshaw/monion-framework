import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthModule } from './auth/oauth.module';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

/**
 * The root module of the application.
 * This module registers the application's controllers and providers.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './../.env',
    }),
    OAuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

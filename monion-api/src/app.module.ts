import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configurator } from './shared/database/configurator.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const configuratorService = new Configurator(configService);
        const config = configuratorService.getORMConfig();
        return config;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Configurator],
})
export class AppModule {}

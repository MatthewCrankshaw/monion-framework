import { ConfigService } from '@nestjs/config';
import { Configurator } from './src/shared/database/configurator.service';
import { DataSource } from 'typeorm';

const configurator = new Configurator(new ConfigService());

export const dataSource = new DataSource(configurator.getORMConfig());

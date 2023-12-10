import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getHello(): string {
    const host = this.config.get<string>('POSTGRES_HOST');
    return host;
  }
}

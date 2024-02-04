import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): object {
    return {
      test: 'hello world',
    };
  }
}

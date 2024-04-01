import { Response } from 'express';
import { ValidationError } from './validation.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HandlerService {
  public handle(error: unknown, response: Response): void {
    if (error instanceof ValidationError) {
      response.status(422).json({ message: error.message });
    } else {
      response.status(500).json({ message: 'Server Error' });
    }
  }
}

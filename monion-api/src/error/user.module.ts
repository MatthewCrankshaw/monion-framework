import { Module } from '@nestjs/common';
import { HandlerService } from './handler.service';

@Module({
  providers: [HandlerService],
  exports: [ErrorModule, HandlerService],
})
export class ErrorModule {}

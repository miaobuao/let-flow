import { Module } from '@nestjs/common';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { CryptoModule } from '@let-flow/common-module';

@Module({
  imports: [CryptoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

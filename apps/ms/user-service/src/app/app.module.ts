import { Module } from '@nestjs/common';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

import { AppController } from './app.controller';
import { CryptoModule } from '../common/crypto/crypto.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [CryptoModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AppModule {}

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { MicroServices } from '@let-flow/microflow';

const service = MicroServices.user;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: service.name,
        protoPath: service.path,
        url: service.url,
      },
    }
  );
  await app.listen();
  Logger.log("🚀 Microflow '#user' started");
}

bootstrap();

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServices } from '@let-flow/microflow';
import { UserRpcService } from './service';

const userService = MicroServices.user;
@Module({
  imports: [
    ClientsModule.register([
      {
        name: userService.name,
        transport: Transport.GRPC,
        options: {
          package: userService.name,
          protoPath: userService.path,
          url: userService.url,
        },
      },
    ]),
  ],
  exports: [UserRpcService],
  providers: [UserRpcService],
})
export class UserRpcModule {}

export * from './service';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServices } from '@let-flow/microflow';
import {
  UserAuthenticationService,
  UserFinderService,
  UserManagerService,
} from './service';

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
  exports: [UserAuthenticationService, UserManagerService, UserFinderService],
  providers: [UserAuthenticationService, UserManagerService, UserFinderService],
})
export class UserRpcModule {}

export * from './service';

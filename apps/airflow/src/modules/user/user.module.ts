import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { MicroServices } from '@let-flow/microflow';
import { UserService } from './user.service';

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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

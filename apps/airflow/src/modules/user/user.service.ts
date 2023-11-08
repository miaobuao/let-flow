import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
  MicroServices,
  User,
  UserRegisterRequest,
  UserServiceClient,
} from '@let-flow/microflow';
import { ClientGrpc } from '@nestjs/microservices';

const service = MicroServices.user;

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(service.name) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(
      service.serviceName,
    );
  }

  register(request: UserRegisterRequest) {
    return this.userService.register(request);
  }
}

import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
  MicroServices,
  UserRegisterMessage,
  UserAuthenticateMessage,
  UserServiceClient,
  FindUserByIdMessage,
  FindUserByEmailMessage,
} from '@let-flow/microflow';
import { ClientGrpc } from '@nestjs/microservices';
const service = MicroServices.user;

@Injectable()
export class UserAuthenticationService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(service.name) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(
      service.serviceName,
    );
  }

  authenticate(request: UserAuthenticateMessage) {
    return this.userService.authenticate(request);
  }
}

@Injectable()
export class UserManagerService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(service.name) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(
      service.serviceName,
    );
  }

  register(request: UserRegisterMessage) {
    return this.userService.register(request);
  }
}

@Injectable()
export class UserFinderService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(service.name) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(
      service.serviceName,
    );
  }

  findById(request: FindUserByIdMessage) {
    return this.userService.findById(request);
  }

  findByEmail(request: FindUserByEmailMessage) {
    return this.userService.findByEmail(request);
  }
}

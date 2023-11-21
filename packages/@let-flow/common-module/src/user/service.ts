import { Injectable } from '@nestjs/common';
import {
  MicroServices,
  UserRegisterMessage,
  UserAuthenticateMessage,
  UserServiceClient,
  FindUserByIdMessage,
  FindUserByEmailMessage,
} from '@let-flow/microflow';
import { DaprService } from '../dapr';
@Injectable()
export class UserService {
  private userService: UserServiceClient;

  constructor(private readonly dapr: DaprService) {}

  authenticate(request: UserAuthenticateMessage) {
    return this.userService.authenticate(request);
  }

  register(request: UserRegisterMessage) {
    return this.userService.register(request);
  }

  findById(request: FindUserByIdMessage) {
    return this.userService.findById(request);
  }

  findByEmail(request: FindUserByEmailMessage) {
    return this.userService.findByEmail(request);
  }
}

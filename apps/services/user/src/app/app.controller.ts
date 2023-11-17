import { Controller, Get } from '@nestjs/common';
import {
  User,
  UserServiceController,
  UserServiceControllerMethods,
  UserRegisterMessage,
  FindUserByEmailMessage,
  FindUserByIdMessage,
  UserAuthenticateMessage,
} from '@let-flow/microflow';
import { Observable } from 'rxjs';
import { BcryptService } from '@let-flow/common-module';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
  constructor(private readonly crypto: BcryptService) {}
  existsById(
    request: FindUserByIdMessage,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  authenticate(
    request: UserAuthenticateMessage,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  findById(
    request: FindUserByIdMessage,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(
    request: FindUserByEmailMessage,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  register(
    request: UserRegisterMessage,
  ): User | Promise<User> | Observable<User> {
    return new Observable((observer) => {
      this.crypto
        .encrypt(request.password)
        .then((hashed) => {
          request.password = hashed;
          observer.next({
            id: '',
            username: '',
          });
        })
        .catch(observer.error);
    });
  }
}

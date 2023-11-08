import { Controller, Get } from '@nestjs/common';
import {
  User,
  FindUserByIdRequest,
  UserServiceController,
  UserServiceControllerMethods,
  UserRegisterRequest,
  FindUserByEmailRequest,
  UserAuthenticateRequest,
} from '@let-flow/microflow';
import { Observable } from 'rxjs';
import { BcryptService } from '../common/crypto/bcrypt/bcrypt.service';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
  constructor(private readonly crypto: BcryptService) {}
  authenticate(
    request: UserAuthenticateRequest,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  findById(
    request: FindUserByIdRequest,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(
    request: FindUserByEmailRequest,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  register(
    request: UserRegisterRequest,
  ): User | Promise<User> | Observable<User> {
    return new Observable((observer) => {
      this.crypto.encrypt(request.password).then((hashed) => {
        request.password = hashed;
        observer.next({
          email: '',
          id: '',
          username: '',
        });
      });
    });
  }
}

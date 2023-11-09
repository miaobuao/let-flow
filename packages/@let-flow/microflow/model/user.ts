/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface UserRegisterMessage {
  email: string;
  username: string;
  password: string;
}

export interface UserAuthenticateMessage {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

export interface FindUserByIdMessage {
  id: string;
}

export interface FindUserByEmailMessage {
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  register(request: UserRegisterMessage): Observable<User>;

  authenticate(request: UserAuthenticateMessage): Observable<User>;

  findById(request: FindUserByIdMessage): Observable<User>;

  findByEmail(request: FindUserByEmailMessage): Observable<User>;

  existsById(request: FindUserByIdMessage): Observable<User>;
}

export interface UserServiceController {
  register(request: UserRegisterMessage): Promise<User> | Observable<User> | User;

  authenticate(request: UserAuthenticateMessage): Promise<User> | Observable<User> | User;

  findById(request: FindUserByIdMessage): Promise<User> | Observable<User> | User;

  findByEmail(request: FindUserByEmailMessage): Promise<User> | Observable<User> | User;

  existsById(request: FindUserByIdMessage): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "authenticate", "findById", "findByEmail", "existsById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

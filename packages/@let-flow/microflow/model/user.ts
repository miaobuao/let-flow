/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface UserRegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface UserAuthenticateRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface FindUserByIdRequest {
  id: string;
}

export interface FindUserByEmailRequest {
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  register(request: UserRegisterRequest): Observable<User>;

  authenticate(request: UserAuthenticateRequest): Observable<User>;

  findById(request: FindUserByIdRequest): Observable<User>;

  findByEmail(request: FindUserByEmailRequest): Observable<User>;
}

export interface UserServiceController {
  register(request: UserRegisterRequest): Promise<User> | Observable<User> | User;

  authenticate(request: UserAuthenticateRequest): Promise<User> | Observable<User> | User;

  findById(request: FindUserByIdRequest): Promise<User> | Observable<User> | User;

  findByEmail(request: FindUserByEmailRequest): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "authenticate", "findById", "findByEmail"];
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

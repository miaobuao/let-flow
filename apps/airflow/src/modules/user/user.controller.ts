import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

import { UserRegisterForm } from './user.dto';
import {
  UserAuthenticationService,
  UserManagerService,
} from '@let-flow/common-module';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly manager: UserManagerService,
    private readonly auth: UserAuthenticationService,
  ) {}

  @Post('register')
  @UseInterceptors(GrpcToHttpInterceptor)
  async register(@Body() form: UserRegisterForm) {
    return this.manager.register({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  }

  @Post('authenticate')
  @UseInterceptors(GrpcToHttpInterceptor)
  async authenticate(@Body() form: UserRegisterForm) {
    return this.auth.authenticate({
      username: form.username,
      password: form.password,
    });
  }
}

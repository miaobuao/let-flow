import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRegisterForm } from './user.dto';
import { UserRpcService } from '@let-flow/common-module';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserRpcService) {}

  @Post('register')
  @UseInterceptors(GrpcToHttpInterceptor)
  async register(@Body() form: UserRegisterForm) {
    return this.service.register({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  }

  @Post('authenticate')
  @UseInterceptors(GrpcToHttpInterceptor)
  async authenticate(@Body() form: UserRegisterForm) {
    return this.service.authenticate({
      username: form.username,
      password: form.password,
    });
  }
}

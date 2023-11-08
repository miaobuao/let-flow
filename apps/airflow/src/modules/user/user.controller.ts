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
import { UserService } from './user.service';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UseInterceptors(GrpcToHttpInterceptor)
  async register(@Body() form: UserRegisterForm) {
    return this.userService.register({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  }
}

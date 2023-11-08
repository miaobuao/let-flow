import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BcryptService } from '../../../../microflow/ms-userflow/src/common/crypto/bcrypt/bcrypt.service';

import { UserRegisterForm } from './user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userSerice: UserService) {}

  @Post('register')
  async register(@Body() form: UserRegisterForm) {}

  @Get()
  getUser() {
    return this.userSerice.getUser();
  }
}

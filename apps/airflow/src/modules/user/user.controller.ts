import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BcryptService } from '../../common/crypto/bcrypt/bcrypt.service';

import { UserRegisterForm } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private bcrypt: BcryptService) {}

  @Post('register')
  async register(@Body() form: UserRegisterForm) {
    const hashedPwd = await this.bcrypt.encrypt(form.password);
  }
}

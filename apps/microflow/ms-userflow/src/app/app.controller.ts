import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import {
  User,
  UserById,
  UserServiceController,
  UserServiceControllerMethods,
} from '@let-flow/microflow';
import { Observable } from 'rxjs';
import { BcryptService } from '../common/crypto/bcrypt/bcrypt.service';

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
  constructor(
    private readonly appService: AppService,
    private readonly crypto: BcryptService,
  ) {}
  findOne(request: UserById): User | Promise<User> | Observable<User> {
    return {
      id: request.id,
      name: 'rose',
    };
  }
}

import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUND = 10;

@Injectable()
export class BcryptService {
  encrypt(plain: string) {
    return new Promise<string>((resolve) => {
      bcrypt.genSalt(BCRYPT_SALT_ROUND, function (_, salt) {
        bcrypt.hash(plain, salt, function (_, hash) {
          resolve(hash);
        });
      });
    });
  }

  verify(plain: string, hash: string) {
    return new Promise<boolean>((resolve) => {
      bcrypt.compare(plain, hash, (_, flag) => resolve(flag));
    });
  }
}

import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt.service';
export { BcryptService };

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class CryptoModule {}

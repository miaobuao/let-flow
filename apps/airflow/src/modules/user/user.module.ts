import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CryptoModule } from '../../common/crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  exports: [CryptoModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRpcModule } from '@let-flow/common-module';

@Module({
  imports: [UserRpcModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './service';
import { DaprModule } from '..';

export { UserService };

@Module({
  imports: [DaprModule],
  exports: [],
  providers: [],
})
export class UserRpcModule {}

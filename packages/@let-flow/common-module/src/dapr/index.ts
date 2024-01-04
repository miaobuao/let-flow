import { Module } from '@nestjs/common';
import { DaprService } from './service';
export { DaprService };

@Module({
  controllers: [],
  providers: [DaprService],
  exports: [DaprService],
})
export class DaprModule {}

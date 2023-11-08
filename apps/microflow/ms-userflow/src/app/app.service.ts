import { UserServiceClient } from '@let-flow/microflow';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}

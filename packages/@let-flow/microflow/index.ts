import { join } from 'path';
import { MicroServiceName } from './model';
import { copyFileSync, existsSync } from 'fs';
import { ClientsModule, Transport } from '@nestjs/microservices';

export * from './model';

const ServiceUrlMap: Record<MicroServiceName, string> = {
  user: '127.0.0.1:50050',
};

class MicroServiceConfig {
  constructor(public readonly name: MicroServiceName) {}
  get url() {
    return ServiceUrlMap[this.name];
  }

  get serviceName() {
    let name = this.name[0].toUpperCase() + this.name.slice(1);
    return `${name}Service`;
  }

  get client() {
    return ClientsModule.register([
      {
        name: this.name,
        transport: Transport.GRPC,
        options: {
          package: this.name,
          protoPath: process.env.PROTOBUF_PATH ?? '',
        },
      },
    ]);
  }
}

export const MicroServices: Record<MicroServiceName, MicroServiceConfig> = {
  user: new MicroServiceConfig('user'),
};

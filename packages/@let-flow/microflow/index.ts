import { join } from 'path';
import { MicroServiceName } from './model';
import { copyFileSync, existsSync } from 'fs';
import { ClientsModule, Transport } from '@nestjs/microservices';

export * from './model';

let id = 50050;

class MicroServiceConfig {
  constructor(public readonly name: MicroServiceName, private port = id++) {}
  get url() {
    return `127.0.0.1:${this.port}`;
  }

  get path() {
    return join(
      process.cwd(),
      'packages/@let-flow/microflow/proto',
      `${this.name}.proto`,
    );
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
          protoPath: this.path,
        },
      },
    ]);
  }
}

export const MicroServices: Record<MicroServiceName, MicroServiceConfig> = {
  user: new MicroServiceConfig('user'),
};

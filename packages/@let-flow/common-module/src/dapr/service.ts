import { Injectable, Logger } from '@nestjs/common';
import config from './config';
import { CommunicationProtocolEnum, DaprClient } from '@dapr/dapr';

@Injectable()
export class DaprService {
  public client: DaprClient;
  private readonly logger = new Logger(DaprService.name);

  constructor() {
    const daprPort = config.darp.DAPR_GRPC_PORT;
    this.client = new DaprClient({
      daprPort,
      communicationProtocol: CommunicationProtocolEnum.GRPC,
    });
    this.logger.log(`🔥 Initializing DaprClient (:${daprPort})`);
  }
}

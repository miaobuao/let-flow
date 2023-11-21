import { DaprServer, CommunicationProtocolEnum, HttpMethod } from '@dapr/dapr';

const appId = process.env.APP_ID;
console.log(`App ID: ${appId}`);

const appHost = '127.0.0.1';
const appPort = process.env.APP_PORT;
console.log(`🌹 ${appHost}:${appPort}`);

const daprHost = '127.0.0.1';
const daprPort = process.env.DAPR_GRPC_PORT;

const server = new DaprServer({
  serverHost: appHost,
  serverPort: appPort,
  communicationProtocol: CommunicationProtocolEnum.GRPC,
  clientOptions: {
    daprHost,
    daprPort,
  },
});

server.invoker.listen(
  'say-hi',
  async (data) => {
    console.log(data);
    return {
      status: 200,
      msg: 'hi',
    };
  },
  {
    method: HttpMethod.POST,
  }
);
await server.start();

interface Config {}

const development: Config = {};

const production: Config = {};

export default {
  darp: {
    APP_ID: process.env.APP_ID,
    APP_PORT: process.env.APP_PORT,
    APP_API_TOKEN: process.env.APP_API_TOKEN,
    DAPR_HTTP_PORT: process.env.DAPR_HTTP_PORT,
    DAPR_GRPC_PORT: process.env.DAPR_GRPC_PORT,
  },
  development,
  production,
};

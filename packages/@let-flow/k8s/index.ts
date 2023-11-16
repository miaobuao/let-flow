import * as config from './config.json';

interface ServiceConfig {
  host: string;
  port: number;
  user?: string;
  password?: string;
  ns?: string;
}

const SERVICES_CONFIG: {
  ns: string;
  redis: ServiceConfig;
  postgresql: ServiceConfig;
  mongodb: ServiceConfig;
} = config[process.env.MODE || 'development'];
export { SERVICES_CONFIG };

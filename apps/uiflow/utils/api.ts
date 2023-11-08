import { Configuration, DefaultApi, UserApi } from '@let-flow/airflow';

const config = new Configuration({
  basePath: 'http://localhost:3000',
});

const defaultApi = new DefaultApi(config);
const userApi = new UserApi(config);

export { defaultApi, userApi };

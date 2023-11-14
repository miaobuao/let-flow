import { Configuration, DefaultApi, UserApi } from '@let-flow/airflow';

const config = new Configuration({
  basePath: '',
});

const defaultApi = new DefaultApi(config);
const userApi = new UserApi(config);

export { defaultApi, userApi };

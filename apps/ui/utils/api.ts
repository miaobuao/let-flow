import { Configuration, SessionApi, UserApi } from '@let-flow/api';

const apiConfig = new Configuration({
  basePath: '/api',
});

const sessionApi = new SessionApi(apiConfig);
const userApi = new UserApi(apiConfig);

export { sessionApi, userApi, apiConfig };

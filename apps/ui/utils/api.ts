import { Configuration, SessionApi, UserApi } from '@let-flow/api';

const config = new Configuration({
  basePath: '/api',
});

const sessionApi = new SessionApi(config);
const userApi = new UserApi(config);

export { sessionApi, userApi };

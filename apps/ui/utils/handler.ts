import type { AxiosError } from 'axios';

import { message } from './discrete-api';

export function errorHandler(err: AxiosError<string>) {
  const app = useNuxtApp();
  const { t } = app.$i18n;
  message.error(t(err.response?.data ?? 'error.unknown'));
}

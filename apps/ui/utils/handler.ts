import { AxiosError } from 'axios';

import { message } from './discrete-api';

export function errorHandler(err: AxiosError<string> | Error) {
  if (err instanceof AxiosError) {
    axiosErrorHandler(err);
  } else if (err instanceof Error) {
    commonErrorHandler(err);
  }
}

function axiosErrorHandler(err: AxiosError<string>) {
  const app = useNuxtApp();
  const { t } = app.$i18n;
  message.error(t(err.response?.data ?? 'error.unknown'));
}

function commonErrorHandler(err: Error) {
  const app = useNuxtApp();
  const { t } = app.$i18n;
  message.error(t(err.message));
}

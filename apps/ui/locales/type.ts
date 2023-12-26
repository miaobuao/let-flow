import type { ResultPage } from '~/error.vue';

type ResultPageFields = Omit<ResultPage, 'status'>;

export type LocalePack = {
  result: {
    403: ResultPageFields;
    404: ResultPageFields;
    418: ResultPageFields;
    500: ResultPageFields;
    success: ResultPageFields;
    info: ResultPageFields;
    warning: ResultPageFields;
  };
  common: {
    login: string;
    logout: string;
    register: string;
    password: string;
    username: string;
    email: string;
  };
  login: {
    form: {
      retype_password: string;
      retype_password_error: string;
    };
    error: {};
  };
};

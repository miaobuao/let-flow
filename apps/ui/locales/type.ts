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
    ok: string;
    cancel: string;
  };
  login: {
    form: {
      retype_password: string;
      retype_password_error: string;
    };
    message: {
      login_success: string;
      whether_keep_logged_in: string;
    };
    error: {};
  };
  backend: {
    error: {
      email_already_exist: string;
      invalid_email_or_password: string;
      internal_server_error: string;
    };
  };
  session: {
    error: {
      expired: string;
    };
  };
};

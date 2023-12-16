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
};

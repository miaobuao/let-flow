import { en, zh } from './locales';

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
  },
}));

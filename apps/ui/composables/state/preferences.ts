import { useStorage } from '@vueuse/core';
import {
  type NLocale,
  type NDateLocale,
  useOsTheme,
  darkTheme,
  lightTheme,
  enUS,
  dateEnUS,
  zhCN,
  dateZhCN,
} from 'naive-ui';

export const useGuiPreferencesStore = defineStore('gui-preferences', () => {
  const preferences = useStorage<GuiPreferences>('gui-preferences', {
    theme: ThemeKind.OS,
    language: LanguageKind.en,
  });
  const osThemeRef = useOsTheme();

  const theme = computed(() => {
    if (preferences.value.theme === ThemeKind.OS) {
      return osThemeRef.value === ThemeKind.Dark ? darkTheme : lightTheme;
    } else if (preferences.value.theme === ThemeKind.Dark) {
      return darkTheme;
    } else {
      return lightTheme;
    }
  });

  const lang = computed<UserLanguage | undefined>(() => {
    if (preferences.value.language === LanguageKind.zh) {
      return {
        locale: zhCN,
        date: dateZhCN,
      };
    } else if (preferences.value.language === LanguageKind.en) {
      return {
        locale: enUS,
        date: dateEnUS,
      };
    }
  });
  return { preferences, theme, lang };
});

export interface GuiPreferences {
  theme?: ThemeKind;
  language?: LanguageKind;
}

export interface UserLanguage {
  locale: NLocale;
  date: NDateLocale;
}

export enum ThemeKind {
  Light = 'light',
  Dark = 'dark',
  OS = 'os',
}

export enum LanguageKind {
  zh = 'zh',
  en = 'en',
}

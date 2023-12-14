import { useStorage } from '@vueuse/core';
import {
  useOsTheme,
  darkTheme,
  lightTheme,
  zhCN,
  enUS,
  dateEnUS,
  dateZhCN,
  type NLocale,
  type NDateLocale,
} from 'naive-ui';

export const useGuiPreferences = defineStore('gui-preferences', () => {
  const preferences = useStorage<GuiPreferences>('gui-preferences', {
    theme: ThemeKind.OS,
    language: LanguageKind.en,
  });
  const osThemeRef = useOsTheme();
  const theme = computed(() => {
    if (preferences.value.theme === ThemeKind.OS) {
      return osThemeRef.value === 'dark' ? darkTheme : lightTheme;
    } else if (preferences.value.theme === ThemeKind.Dark) {
      return darkTheme;
    } else {
      return lightTheme;
    }
  });

  const lang = computed<LanguagePack | undefined>(() => {
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

export interface LanguagePack {
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

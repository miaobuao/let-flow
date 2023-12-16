import { type NLocale, type NDateLocale } from 'naive-ui';

export const useGuiPreferences = () => {
  return useState<GuiPreferences>('gui-preferences', () => ({
    theme: ThemeKind.Dark,
    language: LanguageKind.en,
  }));
};

// export const useGuiPreferences = defineStore('gui-preferences', () => {
//   const preferences = useStorage<GuiPreferences>('gui-preferences', {
//     theme: isClient ? ThemeKind.OS : ThemeKind.Light,
//     language: LanguageKind.en,
//   });
//   const osThemeRef = useOsTheme();

//   return { preferences, theme, lang };
// });

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

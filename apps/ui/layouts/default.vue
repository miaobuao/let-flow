<template>
  <n-config-provider
    :theme="theme"
    :locale="lang?.locale"
    :date-locale="lang?.date"
  >
    <n-layout position="absolute">
      <slot />
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  useOsTheme,
  darkTheme,
  lightTheme,
  enUS,
  dateEnUS,
  zhCN,
  dateZhCN,
} from 'naive-ui';

const osThemeRef = useOsTheme();
const guiPreferences = useGuiPreferences();

const theme = computed(() => {
  if (guiPreferences.value.theme === ThemeKind.OS) {
    return osThemeRef.value === ThemeKind.Dark ? darkTheme : lightTheme;
  } else if (guiPreferences.value.theme === ThemeKind.Dark) {
    return darkTheme;
  } else {
    return lightTheme;
  }
});

const lang = computed<UserLanguage | undefined>(() => {
  if (guiPreferences.value.language === LanguageKind.zh) {
    return {
      locale: zhCN,
      date: dateZhCN,
    };
  } else if (guiPreferences.value.language === LanguageKind.en) {
    return {
      locale: enUS,
      date: dateEnUS,
    };
  }
});

const { setLocale, defaultLocale } = useI18n();
watch(
  () => guiPreferences.value.language,
  (value) => {
    setLocale(value ?? defaultLocale.code ?? LanguageKind.en);
  }
);

const guiPreferencesStorage = useStorageAsync(
  'gui-preferences',
  guiPreferences.value
);
watch(guiPreferencesStorage, (value) => {
  guiPreferences.value = value;
});
</script>

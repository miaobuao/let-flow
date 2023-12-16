<template>
  <n-config-provider
    :theme="theme"
    :locale="lang?.locale"
    :date-locale="lang?.date"
  >
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <n-layout position="absolute">
              <NuxtPage />
            </n-layout>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
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

const lang = computed<LanguagePack | undefined>(() => {
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

const guiPreferencesStorage = useStorageAsync(
  'gui-preferences',
  guiPreferences.value
);
watch(guiPreferencesStorage, (value) => {
  guiPreferences.value = value;
});
</script>

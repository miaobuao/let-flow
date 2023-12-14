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
            <NuxtPage />
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui';
const guiPreferences = useGuiPreferences();

const theme = ref(darkTheme);
onMounted(() => {
  theme.value = guiPreferences.theme;
});
watch(
  () => guiPreferences.theme,
  (value) => {
    theme.value = value;
  }
);

const lang = ref();
onMounted(() => {
  lang.value = guiPreferences.lang;
});
watch(
  () => guiPreferences.lang,
  (value) => {
    lang.value = value;
  }
);
</script>

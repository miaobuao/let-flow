<template>
  <n-config-provider
    :theme="preferences.theme"
    :locale="preferences.lang?.locale"
    :date-locale="preferences.lang?.date"
  >
    <n-layout position="absolute">
      <slot />
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useGuiPreferencesStore } from '~/composables/state';

const preferences = useGuiPreferencesStore();
</script>

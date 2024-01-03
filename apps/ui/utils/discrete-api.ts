import {
  type ConfigProviderProps,
  createDiscreteApi,
  useOsTheme,
  darkTheme,
  lightTheme,
} from 'naive-ui';

const { $pinia } = useNuxtApp();

const configProviderPropsRef = computed<ConfigProviderProps>(() => {
  try {
    const preferences = useGuiPreferences($pinia);
    return {
      theme: preferences.theme,
    };
  } catch {
    return {
      theme: useOsTheme().value === 'dark' ? darkTheme : lightTheme,
    };
  }
});

export const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef,
  }
);

import { useSessionStore } from '~/composables/state';

const { $pinia } = useNuxtApp();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSessionStore($pinia);
  try {
    if (session.session || (await session.load())) {
      return true;
    }
  } catch (e) {
    errorHandler(e as Error);
  }
  return navigateTo({
    name: 'user-login',
  });
});

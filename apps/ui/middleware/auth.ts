export default defineNuxtRouteMiddleware(async (to, from) => {
  return navigateTo({
    name: 'user-login',
  });
});

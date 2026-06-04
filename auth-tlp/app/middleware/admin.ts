export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();

  if (user.value?.rol !== "Administrador") {
    throw createError({ statusCode: 403, message: "Acceso denegado" });
  }
});

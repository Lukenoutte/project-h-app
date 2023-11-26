export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthenticationStore())
    if (!isAuthenticated.value) return navigateTo('/signin')
})

export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthenticationStore())
    const accessToken = useCookie('accessToken')
    if (accessToken.value) isAuthenticated.value = true
    if (!isAuthenticated.value) return navigateTo('/signin')
})

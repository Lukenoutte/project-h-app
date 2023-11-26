export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthenticationStore())
    const accessToken = useCookie('accessToken')
    isAuthenticated.value = !!accessToken.value
    if (isAuthenticated.value) return navigateTo('/dashboard')
})

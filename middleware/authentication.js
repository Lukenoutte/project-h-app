export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuthenticationStore()
    if (!isAuthenticated) return navigateTo('/signin')
})

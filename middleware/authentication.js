export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthenticationStore())
    const { executeRefeshTokenBeforeExpire } = useAuthenticationStore()
    const accessToken = useCookie('accessToken')
    isAuthenticated.value = !!accessToken.value
    const accessTokenExpireAt = useCookie('accessTokenExpireAt')
    if (accessTokenExpireAt.value) executeRefeshTokenBeforeExpire()
    if (!isAuthenticated.value) return navigateTo('/signin')
})

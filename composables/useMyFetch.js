export const useMyFetch = (request, opts) => {
    return useFetch(request, {
        onRequest({ request, options }) {
            const accessToken = useCookie('accessToken')
            if (accessToken.value) {
                options.headers = {
                    Authorization: `Bearer ${accessToken.value}`,
                    ...options.headers,
                }
            }
        },
        async onResponseError({ request, response, options }) {
            const { isAuthenticated } = storeToRefs(useAuthenticationStore())
            const { signOut } = useAuthenticationStore()
            if (isAuthenticated.value && response.status === 401) {
                await signOut()
            }
        },
        baseURL: 'http://localhost:3003',
        ...opts,
    })
}

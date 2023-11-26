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
        onResponseError({ request, response, options }) {},
        baseURL: 'http://localhost:3002',
        ...opts,
    })
}

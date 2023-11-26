export const useMyFetch = (request, opts) => {
    return useFetch(request, {
        onRequest({ request, options }) {
            const accessToken = useCookie('accessToken')
            if (accessToken.value) {
                options.headers = options.headers || {}
                options.headers.authorization = `Bearer ${accessToken.value}`
            }
        },
        onResponseError({ request, response, options }) {},
        baseURL: 'http://localhost:3002',
        ...opts,
    })
}

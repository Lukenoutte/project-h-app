export const useMyFetch = (request, opts) => {
    return useFetch(request, {
        onRequest({ request, options }) {
            const accessToken = useCookie('accessToken')
            console.log('accessToken.value', accessToken.value)
        },
        onResponseError({ request, response, options }) {
            console.log('onResponseError', response)
            return new Error(response.statusText)
        },
        baseURL: 'http://localhost:3002',
        ...opts,
    })
}

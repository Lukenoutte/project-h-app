import axios from 'axios'

export const useMyAxios = () => {
    const baseURL = 'http://localhost:3003'
    const accessToken = useCookie('accessToken')
    return axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${accessToken.value}`,
        },
        interceptors: {
            responseError: async (error) => {
                const { isAuthenticated } = storeToRefs(useAuthenticationStore())
                const { signOut } = useAuthenticationStore()
                const errorResponse = error.response
                const unauthorizedError = errorResponse && errorResponse.status === 401
                if (isAuthenticated.value && unauthorizedError) await signOut()
            },
        },
    })
}

import { defineStore } from 'pinia'
import { useMyAxios } from '~/composables/useMyAxios'

export const useAuthenticationStore = defineStore('authentication', () => {
    const isAuthenticated = ref(false)
    const isLoadingAuthentication = ref(false)
    const router = useRouter()

    function setTokens({ accessToken, refreshToken }) {
        const refreshTokenCookie = useCookie('refreshToken')
        const accessTokenCookie = useCookie('accessToken')
        const accessTokenExpireAt = useCookie('accessTokenExpireAt')
        refreshTokenCookie.value = refreshToken
        accessTokenCookie.value = accessToken
        accessTokenExpireAt.value = getExpiryTime(accessToken)
    }

    async function signIn({ email, password }) {
        try {
            isLoadingAuthentication.value = true
            const { data } = await useMyAxios().post('/signin', { email, password })
            const { accessToken, refreshToken } = data
            setTokens({ accessToken, refreshToken })
            isAuthenticated.value = true
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel entrar.')
        } finally {
            setTimeout(() => {
                isLoadingAuthentication.value = false
            }, 1000)
        }
    }

    async function signOut() {
        try {
            setTokens({ accessToken: null, refreshToken: null })
            router.push('/signin')
            isLoadingAuthentication.value = true
            isAuthenticated.value = false
            await useMyAxios().delete('/signout')
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel sair.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    async function signUp({ name, email, password }) {
        try {
            isLoadingAuthentication.value = true
            await useMyAxios().post('/signup/user', { name, email, password })
            router.push('/signin')
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel criar uma conta.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    async function refreshToken() {
        try {
            const refreshTokenCookie = useCookie('refreshToken')
            const { data } = await useMyAxios().put('/token/refresh', { refreshToken: refreshTokenCookie.value })
            const { accessToken } = data
            setTokens({ accessToken, refreshToken: refreshTokenCookie.value })
            setTimeout(executeRefeshTokenBeforeExpire, 2000)
        } catch (error) {
            console.error(error)
            setTokens({ accessToken: null, refreshToken: null })
            router.push('/signin')
        }
    }

    function getExpiryTime(token) {
        if (!token) return
        const parts = token.split('.')
        const payload = parts[1]
        const decodedPayload = atob(payload)
        const jsonPayload = JSON.parse(decodedPayload)
        return jsonPayload.exp
    }

    function executeRefeshTokenBeforeExpire() {
        if (!isAuthenticated.value) return
        const accessTokenExpireAt = useCookie('accessTokenExpireAt')
        const expiryTime = parseInt(accessTokenExpireAt.value)
        const expiryDate = new Date(expiryTime * 1000)
        const now = new Date()
        const timeRemaining = expiryDate - now
        if (timeRemaining < 300000) refreshToken()
        else setTimeout(executeRefeshTokenBeforeExpire, 660000)
    }

    return {
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        isLoadingAuthentication,
        refreshToken,
        executeRefeshTokenBeforeExpire,
    }
})

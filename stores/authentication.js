import { defineStore } from 'pinia'
import { useMyFetch } from '~/composables/useMyFetch'

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
            const { data, error } = await useMyFetch('/signin', {
                method: 'POST',
                body: { email, password },
            })
            if (error.value) throw new Error(error.value.statusMessage)
            const { accessToken, refreshToken } = data.value
            setTokens({ accessToken, refreshToken })
            isAuthenticated.value = true
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel entrar.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    async function signOut() {
        try {
            setTokens({ accessToken: null, refreshToken: null })
            router.push('/signin')
            isLoadingAuthentication.value = true
            isAuthenticated.value = false
            const { error } = await useMyFetch('/signout', {
                method: 'DELETE',
            })
            if (error.value) throw new Error(error.value.statusMessage)
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
            const { error } = await useMyFetch('/signup/user', {
                method: 'POST',
                body: { name, email, password },
            })
            if (error.value) throw new Error(error.value.statusMessage)
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
            const { data, error } = await useMyFetch('/token/refresh', {
                method: 'PUT',
                body: { refreshToken: refreshTokenCookie.value },
            })
            if (error.value) throw new Error(error.value.statusMessage)
            const { accessToken } = data.value
            setTokens({ accessToken, refreshToken: refreshTokenCookie.value })
            setTimeout(executeRefeshTokenBeforeExpire, 3000)
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
        else setTimeout(executeRefeshTokenBeforeExpire, 600000)
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

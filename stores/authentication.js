import { defineStore } from 'pinia'
import { useMyFetch } from '~/composables/useMyFetch'

export const useAuthenticationStore = defineStore('authentication', () => {
    const isAuthenticated = ref(false)
    const isLoadingAuthentication = ref(false)
    const router = useRouter()

    function setTokens({ accessToken, refreshToken }) {
        const refreshTokenCookie = useCookie('refreshToken')
        const accessTokenCookie = useCookie('accessToken')
        refreshTokenCookie.value = refreshToken
        accessTokenCookie.value = accessToken
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
            console.log(error)
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
                body: JSON.stringify({ name, email, password }),
            })
            if (error.value) throw new Error(error.value.statusMessage)
            router.push('/signin')
        } catch (error) {
            useToastError('Não foi possivel criar uma conta.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    return {
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        isLoadingAuthentication,
    }
})

import { defineStore } from 'pinia'
import axios from '../configs/axiosConfig'

export const useAuthenticationStore = defineStore('authentication', () => {
    const isAuthenticated = ref(false)
    const accessToken = ref(null)
    const refreshToken = ref(null)
    const isLoadingAuthentication = ref(false)
    const router = useRouter()

    function setAccessToken(value) {
        accessToken.value = value
        localStorage.setItem('accessToken', value)
    }
    function setRefreshToken(value) {
        refreshToken.value = value
        localStorage.setItem('refreshToken', value)
    }
    function setIsAuthenticated(value) {
        isAuthenticated.value = value
    }
    function clearTokens() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    async function signIn({ email, password }) {
        try {
            isLoadingAuthentication.value = true
            const { data } = await axios.post('/signin', { email, password })
            const { accessToken, refreshToken } = data
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            setIsAuthenticated(true)
            router.push('/dashboard')
        } catch (error) {
            useToastError('Não foi possivel fazer entrar.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    async function signOut() {
        try {
            isLoadingAuthentication.value = true
            clearTokens()
            await axios.delete('/signout')
            router.push('/signin')
        } catch (error) {
            useToastError('Não foi possivel sair.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    async function signUp({ name, email, password }) {
        try {
            isLoadingAuthentication.value = true
            await axios.post('/signup/user', { name, email, password })
            router.push('/signin')
        } catch (error) {
            useToastError('Não foi possivel criar uma conta.')
        } finally {
            isLoadingAuthentication.value = false
        }
    }

    return {
        isAuthenticated,
        accessToken,
        refreshToken,
        setAccessToken,
        setIsAuthenticated,
        setRefreshToken,
        clearTokens,
        signIn,
        signOut,
        signUp,
    }
})

import { defineStore } from 'pinia'
import { useMyAxios } from '~/composables/useMyAxios'

export const useUserStore = defineStore('users', () => {
    const router = useRouter()
    const isLoadingUser = ref(false)
    const currentUser = ref({})

    async function signUpMaster({ name, email, password }) {
        try {
            isLoadingUser.value = true
            await useMyAxios().post('/signup/master', { name, email, password })
            router.push('/signin')
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel criar uma conta.')
        } finally {
            isLoadingUser.value = false
        }
    }

    async function showUser() {
        try {
            isLoadingUser.value = true
            const { data } = await useMyAxios().get('/user')
            currentUser.value = data
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel buscar dados do usuário.')
        } finally {
            isLoadingUser.value = false
        }
    }

    return {
        signUpMaster,
        isLoadingUser,
        showUser,
        currentUser,
    }
})

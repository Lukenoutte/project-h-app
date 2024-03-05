import { defineStore } from 'pinia'
import { useMyAxios } from '~/composables/useMyAxios'

export const useUserStore = defineStore('users', () => {
    const router = useRouter()
    const isLoadingUser = ref(false)
    const currentUser = ref({})
    const currentUserStore = ref({})
    const { t: translate } = useI18n()
    const messageSucess = translate('created-successfully')
    const messageError = translate('error-message')

    async function signUpMaster({ name, email, password }) {
        try {
            isLoadingUser.value = true
            await useMyAxios().post('/signup/master', { name, email, password })
            useToastSucess(messageSucess)
            router.push('/signin')
        } catch (error) {
            console.error(error)
            useToastError(messageError)
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
            useToastError(messageError)
        } finally {
            isLoadingUser.value = false
        }
    }

    async function showUserStore() {
        try {
            isLoadingUser.value = true
            const { data } = await useMyAxios().get('/user/store')
            currentUserStore.value = data
        } catch (error) {
            console.error(error)
            useToastError(messageError)
        } finally {
            isLoadingUser.value = false
        }
    }

    return {
        signUpMaster,
        isLoadingUser,
        showUser,
        currentUser,
        showUserStore,
        currentUserStore,
    }
})

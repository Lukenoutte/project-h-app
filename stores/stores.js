import { defineStore } from 'pinia'
import { useMyAxios } from '~/composables/useMyAxios'

export const useStoresStore = defineStore('stores', () => {
    const isLoadingStore = ref(false)
    const currentStore = ref({})
    const hasDataOfCurrentStore = computed(() => Object.keys(currentStore.value).length)
    const router = useRouter()
    const { t: translate } = useI18n()

    async function showStore() {
        try {
            isLoadingStore.value = true
            const { data } = await useMyAxios().get('/store/show')
            currentStore.value = data
            isLoadingStore.value = false
        } catch (error) {
            router.push('/notfound')
            console.error(error)
            isLoadingStore.value = false
        }
    }

    async function signUpStore(store) {
        try {
            isLoadingStore.value = true
            await useMyAxios().post('/signup/store', store)
            const message = translate('created-successfully')
            useToastSucess(message)
            isLoadingStore.value = false
        } catch (error) {
            router.push('/notfound')
            console.error(error)
            isLoadingStore.value = false
        }
    }

    return {
        showStore,
        signUpStore,
        currentStore,
        isLoadingStore,
        hasDataOfCurrentStore,
    }
})

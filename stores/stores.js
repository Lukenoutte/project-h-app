import { defineStore } from 'pinia'
import { useMyAxios } from '~/composables/useMyAxios'

export const useStoresStore = defineStore('stores', () => {
    const isLoadingStore = ref(false)
    const currentStore = ref({})

    async function showStore() {
        try {
            isLoadingStore.value = true
            const { data } = await useMyAxios().get('/store/show')
            currentStore.value = data
            isLoadingStore.value = false
        } catch (error) {
            console.error(error)
            useToastError('Não foi possivel buscar os dados.')
            isLoadingStore.value = false
        }
    }

    return {
        showStore,
        currentStore,
        isLoadingStore,
    }
})

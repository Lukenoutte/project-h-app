import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
    const mobileMenuIsOpen = ref(false)
    const currentSubdomain = ref('')
    const isLoadingGlobal = ref(true)

    function setMenuMobileState(value) {
        mobileMenuIsOpen.value = value
    }

    function setCurrentSubdomain(value) {
        currentSubdomain.value = value
    }

    return {
        mobileMenuIsOpen,
        setMenuMobileState,
        currentSubdomain,
        setCurrentSubdomain,
        isLoadingGlobal,
    }
})

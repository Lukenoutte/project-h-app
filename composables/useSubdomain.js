export const useSubdomain = () => {
    onMounted(async () => {
        const { setCurrentSubdomain } = useGlobalStore()
        const { isLoadingGlobal } = storeToRefs(useGlobalStore())
        const subdomain = getCurrentSubdomain()
        setCurrentSubdomain(subdomain)
        if (subdomain) await getStoreData()
        isLoadingGlobal.value = false
    })
}

const getStoreData = async () => {
    const { showStore } = useStoresStore()
    const { hasDataOfCurrentStore } = storeToRefs(useStoresStore())
    if (!hasDataOfCurrentStore.value) await showStore()
}

const getCurrentSubdomain = () => {
    const { location } = window
    const host = location.host
    const splittedHost = host.split('.')
    const existSubdomain = splittedHost.length > 3 // subdomain.vendur.com.br
    if (existSubdomain) return splittedHost[0]
    return ''
}

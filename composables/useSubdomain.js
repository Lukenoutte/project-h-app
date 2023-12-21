export const useSubdomain = () => {
    onMounted(() => {
        const { setCurrentSubdomain } = useGlobalStore()
        const { isLoadingGlobal } = storeToRefs(useGlobalStore())
        const { location } = window
        const host = location.host
        const splittedHost = host.split('.')
        const subdomain = splittedHost[0]
        const existSubdomain = splittedHost.length > 3 // subdomain.vendur.com.br
        if (existSubdomain) setCurrentSubdomain(subdomain)
        else setCurrentSubdomain('')
        isLoadingGlobal.value = false
    })
}

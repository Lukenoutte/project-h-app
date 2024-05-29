<template>
    <div class="h-screen flex flex-col justify-between">
        <GeneralHeader />
        <div class="flex-1 overflow-y-auto">
            <div class="mt-5 flex flex-row">
                <DashboardMenu
                    v-if="!isLoadingGlobal"
                    v-show="shouldShowMenu"
                    class="hidden lg:block w-1/5 pl-5 max-w-[300px]"
                />
                <div class="hidden mt-3 lg:block w-1/5 pl-5 max-w-[300px]" v-else>
                    <USkeleton class="h-8" />
                    <USkeleton class="h-8 mt-6" />
                </div>
                <div v-if="!isLoadingGlobal" :class="{ 'ml-7': shouldShowMenu }" class="w-full px-5 lg:mt-2">
                    <NuxtPage />
                </div>
            </div>
        </div>
        <GeneralFooter />
        <GeneralMobileMenu />
    </div>
</template>

<script setup>
const { executeRefeshTokenBeforeExpire } = useAuthenticationStore()
const { showUser } = useUserStore()
const { currentUser } = storeToRefs(useUserStore())
const { isLoadingGlobal } = storeToRefs(useGlobalStore())
const router = useRouter()
const shouldShowMenu = computed(() => {
    const { currentRoute } = router
    const { path } = currentRoute.value
    return path !== '/signup/store'
})

onMounted(async () => {
    isLoadingGlobal.value = true
    const accessTokenExpireAt = useCookie('accessTokenExpireAt')
    if (accessTokenExpireAt.value) executeRefeshTokenBeforeExpire()
    await showUser()
    // soon: if 401 return to login
    if (!currentUser.value.storeId) router.push('/signup/store')
    setTimeout(() => (isLoadingGlobal.value = false), 100)
})
</script>

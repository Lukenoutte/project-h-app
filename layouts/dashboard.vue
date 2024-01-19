<template>
    <div class="h-screen flex flex-col justify-between">
        <GeneralHeader />
        <div class="flex-1 overflow-y-auto">
            <div class="mt-5 flex flex-row">
                <DashboardMenu
                    v-if="!isLoadingGlobal"
                    v-show="currentUser.storeId"
                    class="hidden lg:block w-1/5 pl-5 max-w-[300px]"
                />
                <div class="hidden mt-3 lg:block w-1/5 pl-5 max-w-[300px]" v-else>
                    <USkeleton class="h-8" />
                    <USkeleton class="h-8 mt-6" />
                </div>
                <div :class="{ 'lg:pl-16': currentUser.storeId }" v-if="!isLoadingGlobal" class="w-full px-5 lg:mt-2">
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

onMounted(async () => {
    const accessTokenExpireAt = useCookie('accessTokenExpireAt')
    if (accessTokenExpireAt.value) executeRefeshTokenBeforeExpire()
    await showUser()
    if (!currentUser.value.storeId) router.push('/signup/store')
})
</script>

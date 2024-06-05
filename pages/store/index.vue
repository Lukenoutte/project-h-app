<template>
    <div class="flex flex-col">
        <span class="text-primary font-bold text-2xl">{{ $t('store') }}</span>
        <span class="mt-1 text-gray-400">Costomize sua loja</span>
    </div>
    <div class="mt-7" v-if="!isLoadingUser">
        <UCard>
            <span class="mt-2 font-bold">Informações básicas</span>
            <div class="columns-2 mt-5">
                <div>
                    <p class="text-gray-500">{{ $t('name') }}</p>
                    <span class="mt-2">{{ currentUserStore.name }}</span>
                </div>
                <div>
                    <p class="text-gray-500">Categoria</p>
                    <span class="mt-2">{{ currentUserStore.category }}</span>
                </div>
            </div>
            <div class="mt-5">
                <div>
                    <p class="text-gray-500">Subdomínio</p>
                    <span class="mt-2">{{ currentUserStore.subdomain }}</span>
                </div>
            </div>
        </UCard>
    </div>
    <div v-else class="mt-7">
        <USkeleton class="h-8 w-[100%] lg:w-[600px]" />
    </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
const { showUserStore } = useUserStore()
const { currentUserStore, isLoadingUser } = storeToRefs(useUserStore())
onMounted(async () => {
    showUserStore()
})
</script>

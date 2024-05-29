<template>
    <div class="flex flex-col">
        <span class="text-primary font-bold text-2xl">{{ $t('store') }}</span>
        <span class="mt-2 text-gray-400">Costomize sua loja</span>
    </div>
    <div class="mt-7" v-if="!isLoadingUser">
        <UCard>
            <span class="mt-2 font-bold">Informações básicas</span>
            <div class="mt-3">
                <span class="font-bold mr-2">{{ $t('name') }}: </span>
                <span>{{ currentUserStore.name }}</span>
            </div>
            <div>
                <span class="font-bold mr-2">Categoria: </span>
                <span>{{ currentUserStore.category }}</span>
            </div>
            <div>
                <span class="font-bold mr-2">Subdomínio: </span>
                <span>{{ currentUserStore.subdomain }}</span>
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

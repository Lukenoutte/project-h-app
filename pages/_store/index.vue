<template>
    <UCard v-if="!isLoadingStore"> Store:{{ currentStore }} </UCard>
    <UCard v-else>
        <USkeleton class="h-6 w-[50%]" />
    </UCard>
</template>

<script setup>
const { showStore } = useStoresStore()
showStore()
const { currentStore, isLoadingStore } = storeToRefs(useStoresStore())
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
</script>

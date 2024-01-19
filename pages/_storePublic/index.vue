<template>
    <UCard> Store:{{ currentStore }} </UCard>
</template>

<script setup>
const { currentStore } = storeToRefs(useStoresStore())
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
</script>

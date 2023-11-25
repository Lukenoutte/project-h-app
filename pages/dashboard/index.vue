<template>
    <UCard>{{ mobileMenuIsOpen }}</UCard>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
</script>

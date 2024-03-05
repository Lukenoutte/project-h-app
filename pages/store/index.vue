<template>
    <div>store</div>
    <div>{{ currentUserStore }}</div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
const { showUserStore } = useUserStore()
const { currentUserStore } = storeToRefs(useUserStore())
onMounted(async () => {
    showUserStore()
})
</script>

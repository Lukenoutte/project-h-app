<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>

<script setup>
useHead({ title: 'Vendur' })
useSubdomain()
</script>

<template>
    <div v-if="!isLoadingGlobal">
        <div class="p-5" v-if="!currentSubdomain">
            <span>Home</span>
        </div>
        <div class="p-5" v-else>
            <StorePublic />
        </div>
    </div>
    <div class="p-5" v-else>
        <USkeleton class="h-6 w-[50%]" />
        <USkeleton class="mt-2 h-6 w-[40%]" />
    </div>
</template>

<script setup>
import StorePublic from './_storePublic'
const { currentSubdomain, isLoadingGlobal } = storeToRefs(useGlobalStore())
definePageMeta({ middleware: ['guest'] })
</script>

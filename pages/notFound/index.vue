<template>
    <div class="h-full flex flex-col justify-between">
        <div class="flex-1 overflow-y-auto flex justify-center items-center">
            <div>
                <div class="flex flex-col items-center text-gray-300">
                    <div class="flex justify-center text-primary">
                        <strong class="text-8xl mr-2">404</strong>
                        <UIcon class="text-8xl" name="i-heroicons-face-frown" />
                    </div>
                    <strong class="mt-2 text-xl">{{ $t('page-not-found') }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'error' })
</script>

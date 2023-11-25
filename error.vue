<template>
    <div class="h-screen flex flex-col justify-between">
        <GeneralHeader />
        <div class="flex-1 overflow-y-auto flex justify-center items-center">
            <div>
                <div class="flex flex-col items-center text-gray-300">
                    <div class="flex justify-center">
                        <strong class="text-8xl mr-2">404</strong>
                        <UIcon class="text-8xl" name="i-heroicons-face-frown" />
                    </div>
                    <strong class="mt-2 text-2xl">{{ $t('page-not-found') }}</strong>
                </div>
                <NuxtLink to="/" class="flex justify-center">
                    <UButton class="mt-8" :title="$t('continue')" :label="$t('continue')" />
                </NuxtLink>
            </div>
        </div>
        <GeneralFooter />
    </div>
</template>

<script setup></script>

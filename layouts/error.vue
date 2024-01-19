<template>
    <div class="h-screen flex flex-col justify-between">
        <div class="h-16 px-5 flex items-center">
            <div class="flex items-center">
                <UIcon class="text-3xl text-primary mr-2" name="i-heroicons-fire-solid" />
                <strong class="text-primary cursor-default">Vendur</strong>
            </div>
        </div>
        <div class="flex-1 overflow-y-auto">
            <NuxtPage />
        </div>
        <GeneralFooter />
    </div>
</template>

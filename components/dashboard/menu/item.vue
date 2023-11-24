<template>
    <NuxtLink :to="route">
        <div
            :class="{ 'bg-primary': isSelected }"
            class="cursor-pointer h-10 mt-2 px-3 flex justify-center items-center rounded-xl"
        >
            <div
                class="flex items-center text-gray-400"
                :class="{ 'text-white': isSelected, 'hover:text-primary': !isSelected }"
            >
                <UIcon class="text-2xl mr-4" :name="icon" />
                <span class="text-sm min-w-[70px]">{{ title }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    title: String,
    icon: String,
    route: String,
    isSelected: Boolean,
})
</script>

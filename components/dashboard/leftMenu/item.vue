<template>
  <div :class="{ 'bg-primary': isSelected }"
    class="cursor-pointer h-10 mt-2 px-3 flex justify-center items-center rounded-xl"
  >
    <div class="w-2/5 flex items-center text-gray-400 min-w-[130px]"
      :class="{ 'text-white': isSelected, 'hover:text-primary': !isSelected }">
      <UIcon class="text-2xl mr-4" :name="icon" />
      <span class="text-sm">{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    icon: String,
    isSelected: Boolean
  })
</script>
<template>
  <div class="h-16 flex items-center px-5 justify-between">
    <NuxtLink to="/">
      <UIcon class="text-3xl text-primary cursor-pointer"
        name="i-heroicons-fire-solid" />
    </NuxtLink>
    <div class="flex items-center">
      <UButton class="mr-4 shadow-md" color="white" :ui="{ rounded: 'rounded-xl' }"
        :icon="isDarkMode ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'"
        @click="setColorTheme(isDarkMode ? 'light' : 'dark')" />
      <UButton label="Sign In" class="px-7 py-2 shadow-md" color="white"
        :ui="{ rounded: 'rounded-xl' }"/>
    </div>
  </div>
</template>

<script setup>
  const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
  }

  const isDarkMode = computed(() => {
    const colorMode = useColorMode().preference
    return colorMode === 'dark'
  })
</script>

<style>

</style>
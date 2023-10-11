<template>
  <div class="h-16 flex items-center px-5 justify-between mb-7">
    <div>
      Logo
    </div>
    <div class="flex items-center">
      <UButton class="mr-2"
        :icon="isDarkMode ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        @click="setColorTheme(isDarkMode ? 'light' : 'dark')" />
      <UButton label="Sign In" class="px-7 py-2" />
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
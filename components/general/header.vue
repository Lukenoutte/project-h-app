<template>
  <div class="h-16 flex items-center px-5 justify-between">
    <NuxtLink to="/">
      <UIcon class="text-3xl text-primary cursor-pointer"
        name="i-heroicons-fire-solid" />
    </NuxtLink>
    <div class="flex items-center hidden lg:flex">
      <USelectMenu class="mr-4 w-[110px]" value-attribute="id"
        v-model="locale" :options="localesList">
        <template #label> 
          <UIcon :name="currentLocale.icon" class="w-4 h-4" />    
          {{ currentLocale.label }}    
        </template>  
      </USelectMenu>
      <UButton class="mr-4" color="white" :ui="{ rounded: 'rounded-xl' }"
        :title="$t('dark-mode')"
        :icon="isDarkMode ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'"
        @click="setColorTheme(isDarkMode ? 'light' : 'dark')" />
      <NuxtLink to="/signin">
        <UButton :label="$t('sign-in')" :title="$t('sign-in')" 
          class="px-7 py-2" color="white"
          :ui="{ rounded: 'rounded-xl' }"/>
      </NuxtLink>
    </div>
    <div class="block lg:hidden">
      <UButton 
        :padded="false"
        color="black"
        variant="link"
        icon="i-heroicons-bars-3"
        :ui="{ icon: { size: { xl: 'h-8 w-8'} } }"
        size="xl"
        @click="setMenuMobileState(!mobileMenuIsOpen)" />
    </div>
  </div>
</template>

<script setup>
  const { locale } = useI18n()
  const localesList = [
    {  id: 'pt-br',  label: 'PT-BR', icon: 'i-heroicons-fire-solid' },
    {  id: 'en',  label: 'EN', icon: 'i-heroicons-fire-solid' }
  ]
  const currentLocale = computed(() => localesList.find(current => current.id === locale.value))
  const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
  }

  const isDarkMode = computed(() => {
    const colorMode = useColorMode().preference
    return colorMode === 'dark'
  })

  const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
  const { setMenuMobileState } = useGlobalStore()
</script>

<style>

</style>
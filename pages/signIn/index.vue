<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[300px]">
      <span class="font-semibold">{{ $t('sign-in') }}</span>
      <UCard class="mt-4 w-full">
        <UInput color="gray" variant="outline" placeholder="E-mail" />
        <UInput color="gray" variant="outline" class="mt-2" :placeholder="$t('password')" />
      </UCard>
      <div class="flex justify-end">
        <NuxtLink to="/dashboard">
          <UButton class="mt-3 px-7 py-2" label="Enter"
            color="primary" :ui="{ rounded: 'rounded-xl' }"/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
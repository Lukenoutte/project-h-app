<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[500px]">
      <span class="font-semibold">{{ $t('sign-up') }}</span>
      <UCard class="mt-4 w-full">
        <UInput color="gray" variant="outline" :placeholder="$t('name')" />
        <UInput color="gray" variant="outline" class="mt-2" placeholder="E-mail" />
        <UInput color="gray" variant="outline" class="mt-2" :placeholder="$t('password')" />
        <UInput color="gray" variant="outline" class="mt-2" 
          :placeholder="$t('comfirm-password')" />
      </UCard>
      <div class="flex justify-between">
        <UButton
          class="mt-3 px-4"
          icon="i-heroicons-arrow-left"
          size="sm"
          color="white"
          variant="solid"
          :ui="{ rounded: 'rounded-xl' }"
          to="/signin"
          :title="$t('back')"
        />
        <UButton class="mt-3 px-7 py-2" :label="$t('finish')" :title="$t('finish')"
          color="primary" :ui="{ rounded: 'rounded-xl' }"/>
      </div>
    </div>
  </div>
</template>
<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[500px]">
      <span class="font-semibold">Sign Up</span>
      <UCard class="mt-4 w-full">
        <UInput color="gray" variant="outline" placeholder="Name" />
        <UInput color="gray" variant="outline" class="mt-2" placeholder="Address" />
        <UInput color="gray" variant="outline" class="mt-2" placeholder="Logo" />
        <UInput color="gray" variant="outline" class="mt-2" placeholder="Rooms" />
      </UCard>
      <div class="flex justify-end">
        <UButton class="mt-3 px-7 py-2" :label="$t('finish')"
          color="primary" :ui="{ rounded: 'rounded-xl' }"/>
      </div>
    </div>
  </div>
</template>
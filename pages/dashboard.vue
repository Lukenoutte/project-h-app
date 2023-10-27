<template>
  <div class="mt-5 flex flex-row">
    <DashboardLeftMenu class="hidden lg:block"/>
    <div class="lg:pl-16 w-full px-5 lg:mt-2">
      <UCard>{{ mobileMenuIsOpen }}</UCard>
    </div>
  </div>
</template>

<script setup>
  const { mobileMenuIsOpen } = useGlobalStore();
</script>
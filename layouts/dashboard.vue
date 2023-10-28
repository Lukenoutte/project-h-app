<template>
  <div class="h-screen flex flex-col justify-between">
    <GeneralHeader/>
    <div class="flex-1 overflow-y-auto">
      <div class="mt-5 flex flex-row">
        <DashboardMenu class="hidden lg:block"/>
        <div class="lg:pl-16 w-full px-5 lg:mt-2">
          <NuxtPage/>
        </div>
      </div>
    </div>
    <GeneralFooter/>
    <GeneralMobileMenu/>
  </div>
</template>

<script setup>
</script>
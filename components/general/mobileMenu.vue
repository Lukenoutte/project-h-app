<template>
  <USlideover 
    v-model="mobileMenuIsOpen" 
    side="left"
    class="lg:hidden max-w-[70%]">
    <div class="p-5">
      <DashboardMenu/>
    </div>
  </USlideover>
</template>

<script setup>
    const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
</script>
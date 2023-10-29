<template>
  <USlideover 
    v-model="mobileMenuIsOpen" 
    side="left"
    class="lg:hidden max-w-[70%]">
    <div class="p-10">
      <DashboardMenu/>
    </div>
  </USlideover>
</template>

<script setup>
    const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
</script>
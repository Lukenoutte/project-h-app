<template>
  <USlideover 
    v-model="mobileMenuIsOpen" 
    side="left"
    class="lg:hidden max-w-[70%]">
  </USlideover>
</template>

<script setup>
    const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
</script>
<template>
  <UCard>{{ mobileMenuIsOpen }}</UCard>
</template>

<script setup>
  definePageMeta({ layout: 'dashboard' })
  const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
</script>
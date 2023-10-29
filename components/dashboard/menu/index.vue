<template>
  <div>
    <DashboardMenuItem
      v-for="(itemMenu, index) in itemsMenu"
      :key="index"
      :title="itemMenu.title" 
      :icon="itemMenu.icon"
      :route="itemMenu.route"
      :isSelected="$route.fullPath === itemMenu.route"
    />
  </div>
</template>

<script setup>
  const itemsMenu = [
    {  route: '/dashboard',  title: 'Dashboard', icon: 'i-heroicons-rectangle-group-solid' },
    {  route: '/booking',  title: 'Booking', icon: 'i-heroicons-shopping-bag-solid' },
    {  route: '/reservation',  title: 'Resevation', icon: 'i-heroicons-user-group-solid' }
  ]
</script>
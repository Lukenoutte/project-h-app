<template>
  <div>
    <h1>Welcome to the homepage</h1>
    This is an auto-imported component
    <HotelButton/>
    <GeneralButton class="ml-4"/>
    <h1>{{ nameHotel }}</h1>
  </div>
</template>

<script setup>
  const hotelStore = useHotelStore();
  const nameHotel = hotelStore.name
</script>
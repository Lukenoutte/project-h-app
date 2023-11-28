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
const { t: translate } = useI18n()

const dashboardTitle = computed(() => translate('dashboard'))
const storeTitle = computed(() => translate('store'))
const orderTitle = computed(() => translate('orders'))

const itemsMenu = computed(() => [
    { route: '/dashboard', title: dashboardTitle.value, icon: 'i-heroicons-rectangle-group-solid' },
    { route: '/store', title: storeTitle.value, icon: 'i-heroicons-shopping-bag-solid' },
    { route: '/orders', title: orderTitle.value, icon: 'i-heroicons-user-group-solid' },
])
</script>

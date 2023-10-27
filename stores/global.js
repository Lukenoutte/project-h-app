import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', () => {
  const mobileMenuIsOpen = ref(false)

  function setMenuMobileState(value) {
    mobileMenuIsOpen.value = value
  }

  return { mobileMenuIsOpen, setMenuMobileState }
})
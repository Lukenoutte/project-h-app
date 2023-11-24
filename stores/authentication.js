import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', () => {
  const isAuthenticated = ref(false)
  const accessToken = ref(null)
  const refreshToken = ref(null)
  function setAccessToken(value) {
    accessToken.value = value
  }
  function setRefreshToken(value) {
    refreshToken.value = value
  }
  function setIsAuthenticated(value) {
    isAuthenticated.value = value
  }
  return { isAuthenticated, accessToken, refreshToken, setAccessToken, setIsAuthenticated, setRefreshToken }
})
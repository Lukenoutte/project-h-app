// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ['./stores']
  }
})

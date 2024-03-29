export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'nuxt-security',
    'nuxt-vitest'
  ],
  devtools: { enabled: true },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  imports: {
    dirs: ['./stores']
  },
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  }
})

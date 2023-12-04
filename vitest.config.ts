import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.js'],
  }
})
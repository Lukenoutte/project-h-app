import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'nuxt',
        setupFiles: ['./tests/setup.js'],
    },
})

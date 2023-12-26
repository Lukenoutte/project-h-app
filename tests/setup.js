import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import enTranslations from '../locales/en.json'
import ptBrTranslations from '../locales/ptBr.json'
import { createRouter, createWebHistory } from 'vue-router'

const routes = []
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const mockRoute = {
    path: '/',
}

config.global.mocks = {
    $route: mockRoute,
    $router: router,
}

const i18n = createI18n({
    locale: 'pt-br',
    messages: {
        en: enTranslations,
        'pt-br': ptBrTranslations,
    },
})

config.global.stubs = {
    RouterLink: {
        template: '<div><slot></slot></div>',
    },
}

config.global.plugins.push(i18n)

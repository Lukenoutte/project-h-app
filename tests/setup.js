import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import enTranslations from '../locales/en.json'
import ptBrTranslations from '../locales/ptBr.json'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: enTranslations,
        'pr-br': ptBrTranslations,
    },
})

config.global.plugins.push(i18n)

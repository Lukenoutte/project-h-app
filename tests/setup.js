import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
            'dark-mode': 'Dark Mode',
        },
        'pr-br': {
            'dark-mode': 'Modo Escuro',
        },
    },
})

config.global.plugins.push(i18n)

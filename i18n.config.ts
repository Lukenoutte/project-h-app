import enTranslations from './locales/en.json';
import ptbrTranslations from './locales/pt-br.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-br',
  messages: {
    'en': enTranslations,
    'pt-br': ptbrTranslations
  }
}))
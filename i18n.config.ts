import enTranslations from './locales/en.json';
import ptBrTranslations from './locales/ptBr.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-br',
  messages: {
    'en': enTranslations,
    'pt-br': ptBrTranslations
  }
}))

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import zhTranslation from './locales/zh/translation.json';
import filTranslation from './locales/fil/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  },
  zh: {
    translation: zhTranslation
  },
  fil: {
    translation: filTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

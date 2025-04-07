
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  }
};

// Initialize i18n instance
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
      caches: ['localStorage'],
      lookupLocalStorage: 'userLanguage'
    },
    react: {
      useSuspense: false
    }
  });

// Set the document direction based on the current language
const setDocumentDirection = (language: string) => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
};

// Set direction on initial load and language change
setDocumentDirection(i18n.language);
i18n.on('languageChanged', setDocumentDirection);

export default i18n;

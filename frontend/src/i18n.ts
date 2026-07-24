import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import ICU from 'i18next-icu';

// Use English common bundle as fallback embedded data
import enCommon from '../public/locales/en/common.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'fr-CA': ['fr', 'en'],
      'default': ['en']
    },
    supportedLngs: ['en', 'fr', 'ar', 'es', 'en-US-pseudoloc'],
    ns: ['common'],
    defaultNS: 'common',
    
    // Optional preload of default language
    partialBundledLanguages: true,
    resources: {
      en: {
        common: enCommon
      }
    },

    backend: {
      // path where resources get loaded from
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      
      // Use local storage to cache translation bundles for performance
      // For production, this works alongside HTTP caching headers
      requestOptions: {
        cache: 'default'
      }
    },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    saveMissing: true,
    missingKeyHandler: (lngs, ns, key, _fallbackValue) => {
      // In production, this would send telemetry to a backend service like Datadog/Sentry
      console.warn(`[Telemetry] Missing translation key: ${ns}:${key} for languages: ${lngs.join(', ')}`);
    }
  });

export default i18n;

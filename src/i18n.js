import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import en from './locales/en.json';
import kk from './locales/kk.json';

const resources = {
    ru: { translation: ru },
    en: { translation: en },
    kk: { translation: kk },
};

// Function to detect browser language
const detectBrowserLanguage = () => {
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;

    // Extract the primary language code (e.g., 'ru' from 'ru-RU')
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Check if the detected language is supported
    const supportedLanguages = ['ru', 'en', 'kk'];

    return supportedLanguages.includes(langCode) ? langCode : 'ru';
};

// Get language from localStorage or detect from browser
const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        return savedLanguage;
    }

    const detectedLanguage = detectBrowserLanguage();
    // Save detected language to localStorage
    localStorage.setItem('language', detectedLanguage);
    return detectedLanguage;
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getInitialLanguage(),
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;

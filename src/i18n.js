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

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'ru', // Default language
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;

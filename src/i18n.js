import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslationsFromDB, getCachedTranslations, cacheTranslations } from './utils/translationLoader';

// Fallback переводы из JSON (на случай если API недоступен)
import ru from './locales/ru.json';
import en from './locales/en.json';
import kk from './locales/kk.json';
import uz from './locales/uz.json';
import ky from './locales/ky.json';
import tr from './locales/tr.json';

const fallbackResources = {
    ru: { translation: ru },
    en: { translation: en },
    kk: { translation: kk },
    uz: { translation: uz },
    ky: { translation: ky },
    tr: { translation: tr },
};

// Начальные ресурсы (будут заменены на данные из БД)
const resources = { ...fallbackResources };

// Supported languages
const supportedLanguages = ['ru', 'en', 'kk', 'uz', 'ky', 'tr'];

// Language groups for smart fallback
const languageGroups = {
    cyrillic: ['ru', 'kk', 'uz', 'ky', 'bg', 'uk', 'be', 'sr', 'mk'],
    turkic: ['tr', 'kk', 'uz', 'ky', 'az', 'tk'],
    western: ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'cs', 'sk'],
    asian: ['zh', 'ja', 'ko', 'th', 'vi', 'id', 'ms'],
    arabic: ['ar', 'fa', 'ur'],
};

// Function to detect browser language with smart fallback
const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    const fullLangCode = browserLang.toLowerCase();

    // Direct match
    if (supportedLanguages.includes(langCode)) {
        return langCode;
    }

    // Smart fallback based on language groups
    let fallbackLang = 'en';

    if (languageGroups.cyrillic.includes(langCode)) {
        fallbackLang = 'ru';
    } else if (languageGroups.turkic.includes(langCode)) {
        fallbackLang = 'tr';
    }

    // Check for regional variants (e.g., 'en-US', 'ru-RU')
    if (fullLangCode.startsWith('ru-') || fullLangCode.startsWith('kk-') || fullLangCode.startsWith('uz-')) {
        fallbackLang = langCode.split('-')[0];
    }

    return fallbackLang;
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
            escapeValue: false,
        },
    });

// Асинхронная загрузка переводов из БД
const loadTranslationsFromDatabase = async () => {
    const supportedLanguages = ['ru', 'en', 'kk', 'uz', 'ky', 'tr'];

    await Promise.all(supportedLanguages.map(async (lang) => {
        try {
            let translations = getCachedTranslations(lang);
            if (!translations) {
                translations = await loadTranslationsFromDB(lang);
                if (translations && Object.keys(translations).length > 0) {
                    cacheTranslations(lang, translations);
                } else {
                    translations = fallbackResources[lang].translation;
                }
            }
            i18n.addResourceBundle(lang, 'translation', translations, true, true);
        } catch {
            i18n.addResourceBundle(lang, 'translation', fallbackResources[lang].translation, true, true);
        }
    }));
};

// Загружаем переводы при старте приложения
loadTranslationsFromDatabase();

// Функция для принудительного обновления переводов
export const reloadTranslations = async () => {
    console.log('🔄 Reloading translations from database...');
    await loadTranslationsFromDatabase();
    console.log('✅ Translations reloaded');
};

export default i18n;

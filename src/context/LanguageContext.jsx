import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem('language') || 'ru'
    );

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        setCurrentLanguage(lang);
    };

    useEffect(() => {
        // Sync with i18n on mount
        i18n.changeLanguage(currentLanguage);
    }, []);

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

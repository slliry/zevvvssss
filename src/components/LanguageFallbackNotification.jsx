import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Globe, Info, Send } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function LanguageFallbackNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [detectedLang, setDetectedLang] = useState('');
  const [fallbackLang, setFallbackLang] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    const supportedLanguages = ['ru', 'en', 'kk', 'uz', 'ky', 'tr'];
    
    const hasFallback = localStorage.getItem('language_fallback_detected');
    
    if (!supportedLanguages.includes(langCode) && !hasFallback) {
      setDetectedLang(browserLang);
      setFallbackLang(currentLanguage);
      setShowNotification(true);
      localStorage.setItem('language_fallback_detected', 'true');
    }
  }, [currentLanguage]);

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleRequestLanguage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/translations/request-language`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageCode: detectedLang.split('-')[0],
          languageName: detectedLang,
        }),
      });

      if (response.ok) {
        setRequestSent(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to request language:', error);
    }
  };

  if (!showNotification) return null;

  const languageNames = {
    ru: 'Русский',
    en: 'English',
    kk: 'Қазақша',
    uz: 'O\'zbek',
    ky: 'Кыргызча',
    tr: 'Türkçe',
  };

  return (
    <div className="fixed top-20 right-4 z-[9997] max-w-md animate-slide-in">
      <div className="bg-white rounded-xl shadow-2xl border border-blue-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5" />
            <span className="font-semibold">Выбор языка</span>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Ваш язык <strong>{detectedLang}</strong> пока не поддерживается.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Мы автоматически выбрали <strong>{languageNames[fallbackLang]}</strong> для вас.
              </p>
            </div>
          </div>

          {!requestSent ? (
            <>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-blue-800">
                  💡 Вы можете изменить язык в меню в любое время
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRequestLanguage}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  Запросить мой язык
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Закрыть
                </button>
              </div>
            </>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-800 font-medium text-center">
                ✅ Запрос отправлен! Мы уведомим вас, когда добавим ваш язык.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

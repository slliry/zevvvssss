import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationEditor as useEditorAPI } from '../hooks/useTranslationEditor';
import { reloadTranslations } from '../i18n';
import { clearTranslationsCache } from '../utils/translationLoader';
import { Sparkles, Loader2, Check, Copy, Save, X, AlertCircle } from 'lucide-react';

const LANGUAGES = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
  { code: 'ky', label: 'Кыргызча', flag: '🇰🇬' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export default function InlineTranslationEditor({ translationKey, onClose, adminKey }) {
  const { i18n } = useTranslation();
  const { generateAllTranslations, updateTranslation, isLoading } = useEditorAPI(adminKey);

  const [translations, setTranslations] = useState({});
  const [sourceLang, setSourceLang] = useState('ru');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingLangs, setGeneratingLangs] = useState(new Set());
  const [copiedLang, setCopiedLang] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Загрузка текущих переводов
  useEffect(() => {
    const loadTranslations = () => {
      const loaded = {};
      LANGUAGES.forEach(({ code }) => {
        try {
          const value = i18n.t(translationKey, { lng: code });
          loaded[code] = value !== translationKey ? value : '';
        } catch {
          loaded[code] = '';
        }
      });
      setTranslations(loaded);
    };
    loadTranslations();
  }, [translationKey, i18n]);

  // Автоматический перевод ОТКЛЮЧЕН - переводим только по кнопке
  // useEffect(() => {
  //   const sourceText = translations[sourceLang];
  //   if (!sourceText || sourceText.length < 3) return;

  //   const timer = setTimeout(() => {
  //     handleAutoTranslate(sourceText, sourceLang);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, [translations[sourceLang]]);

  const handleAutoTranslate = async (sourceText, fromLang) => {
    if (isGenerating) return;

    setIsGenerating(true);
    const langsToTranslate = LANGUAGES.filter(l => l.code !== fromLang).map(l => l.code);
    setGeneratingLangs(new Set(langsToTranslate));

    try {
      const result = await generateAllTranslations(sourceText, fromLang, translationKey);
      
      setTranslations(prev => ({
        ...prev,
        ...result,
      }));
      setHasChanges(true);
      setGeneratingLangs(new Set());
    } catch (error) {
      console.error('Auto-translate failed:', error);
      setErrors(prev => ({ ...prev, auto: 'Ошибка автоперевода' }));
      setGeneratingLangs(new Set());
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualTranslate = async () => {
    const sourceText = translations[sourceLang];
    if (!sourceText) {
      setErrors(prev => ({ ...prev, source: 'Введите текст для перевода' }));
      return;
    }

    await handleAutoTranslate(sourceText, sourceLang);
  };

  const handleInputChange = (lang, value) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: value,
    }));
    setHasChanges(true);
    setErrors(prev => ({ ...prev, [lang]: null }));
  };

  const handleCopy = (lang) => {
    navigator.clipboard.writeText(translations[lang]);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const handleSaveAll = async () => {
    // Валидация
    const emptyLangs = LANGUAGES.filter(l => !translations[l.code]).map(l => l.label);
    if (emptyLangs.length > 0) {
      setErrors({ save: `Не заполнены языки: ${emptyLangs.join(', ')}` });
      return;
    }

    try {
      // Сохраняем все переводы
      for (const { code } of LANGUAGES) {
        await updateTranslation(code, translationKey, translations[code]);
      }

      // Очищаем кэш и перезагружаем переводы из БД
      clearTranslationsCache();
      await reloadTranslations();
      
      alert('✅ Все переводы сохранены и синхронизированы!');
      setHasChanges(false);
      
      // Опционально закрываем редактор
      if (onClose) {
        setTimeout(() => onClose(), 500);
      }
    } catch (error) {
      console.error('Save failed:', error);
      setErrors({ save: 'Ошибка сохранения' });
    }
  };

  const getCompletionPercentage = () => {
    const filled = LANGUAGES.filter(l => translations[l.code]?.trim()).length;
    return Math.round((filled / LANGUAGES.length) * 100);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">Редактор переводов</h3>
            <code className="text-xs text-gray-500 bg-white px-2 py-1 rounded mt-1 inline-block">
              {translationKey}
            </code>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">
                Заполнено: {getCompletionPercentage()}%
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Выбор исходного языка */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Исходный язык для AI перевода:
            </label>
            <div className="flex gap-2 flex-wrap">
              {LANGUAGES.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => setSourceLang(code)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sourceLang === code
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {flag} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Поля переводов */}
          <div className="space-y-4">
            {LANGUAGES.map(({ code, label, flag }) => {
              const isSource = code === sourceLang;
              const isGeneratingThis = generatingLangs.has(code);
              
              return (
                <div
                  key={code}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isSource
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="text-2xl">{flag}</span>
                      <span>{label}</span>
                      {isSource && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                          Источник
                        </span>
                      )}
                    </label>
                    
                    <div className="flex items-center gap-2">
                      {isGeneratingThis && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      )}
                      {translations[code] && !isGeneratingThis && (
                        <button
                          onClick={() => handleCopy(code)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Копировать"
                        >
                          {copiedLang === code ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <textarea
                    value={translations[code] || ''}
                    onChange={(e) => handleInputChange(code, e.target.value)}
                    placeholder={isSource ? 'Введите текст здесь...' : 'Автоматически переведется...'}
                    className={`w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isSource ? 'border-blue-300 bg-white' : 'border-gray-300'
                    } ${isGeneratingThis ? 'opacity-50' : ''}`}
                    rows={3}
                    disabled={isGeneratingThis}
                  />
                  
                  {errors[code] && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors[code]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {errors.save && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.save}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleManualTranslate}
              disabled={isGenerating || !translations[sourceLang]}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Перевести сейчас
            </button>

            <div className="flex items-center gap-2">
              {hasChanges && (
                <span className="text-xs text-orange-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Есть несохраненные изменения
                </span>
              )}
              
              <button
                onClick={handleSaveAll}
                disabled={isLoading || !hasChanges}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Сохранить все
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            💡 Введите текст на исходном языке и подождите 1.5 сек - AI автоматически переведет на все языки
          </p>
        </div>
      </div>
    </div>
  );
}

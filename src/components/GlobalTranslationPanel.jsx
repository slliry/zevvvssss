import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Save, Sparkles, Loader2, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { useTranslationEditor as useEditorAPI } from '../hooks/useTranslationEditor';
import { reloadTranslations } from '../i18n';
import { clearTranslationsCache } from '../utils/translationLoader';

const LANGUAGES = [
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'kk', label: 'KK', flag: '🇰🇿' },
  { code: 'uz', label: 'UZ', flag: '🇺🇿' },
  { code: 'ky', label: 'KY', flag: '🇰🇬' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
];

export default function GlobalTranslationPanel({ adminKey, onClose, onLogout, selectedKey }) {
  const { i18n } = useTranslation();
  const { generateAllTranslations, updateTranslation, isLoading } = useEditorAPI(adminKey);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('ru');
  const [allKeys, setAllKeys] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState({});

  // Автоматически открываем элемент при клике на EditableTranslation
  useEffect(() => {
    if (selectedKey && allKeys.length > 0 && allKeys.includes(selectedKey)) {
      // Открываем элемент для редактирования
      setEditingKey(selectedKey);
      setExpandedKey(selectedKey);
      
      // Загружаем текущие значения для всех языков
      const values = {};
      LANGUAGES.forEach(({ code }) => {
        const value = i18n.t(selectedKey, { lng: code });
        values[code] = value !== selectedKey ? value : '';
      });
      setEditValues(values);
      
      // Скроллим к элементу
      setTimeout(() => {
        const element = document.querySelector(`[data-key="${selectedKey}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [selectedKey, allKeys, i18n]);

  // Загрузка всех ключей переводов
  useEffect(() => {
    const loadAllKeys = () => {
      const keys = new Set();
      
      // Получаем все ключи из всех языков
      LANGUAGES.forEach(({ code }) => {
        const resources = i18n.getResourceBundle(code, 'translation');
        if (resources) {
          extractKeys(resources, '', keys);
        }
      });
      
      setAllKeys(Array.from(keys).sort());
    };

    loadAllKeys();
  }, [i18n]);

  // Рекурсивное извлечение ключей из вложенных объектов
  const extractKeys = (obj, prefix, keys) => {
    Object.keys(obj).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractKeys(obj[key], fullKey, keys);
      } else {
        keys.add(fullKey);
      }
    });
  };

  // Фильтрация ключей по поиску
  const filteredKeys = useMemo(() => {
    if (!searchQuery) return allKeys;
    
    const query = searchQuery.toLowerCase();
    return allKeys.filter(key => {
      // Поиск по ключу
      if (key.toLowerCase().includes(query)) return true;
      
      // Поиск по значению в выбранном языке
      const value = i18n.t(key, { lng: selectedLang });
      if (value && value.toLowerCase().includes(query)) return true;
      
      return false;
    });
  }, [allKeys, searchQuery, selectedLang, i18n]);

  const handleEdit = (key) => {
    setEditingKey(key);
    setExpandedKey(key);
    
    // Загружаем текущие значения для всех языков
    const values = {};
    LANGUAGES.forEach(({ code }) => {
      const value = i18n.t(key, { lng: code });
      values[code] = value !== key ? value : '';
    });
    setEditValues(values);
  };

  const handleSave = async (key) => {
    setSaveStatus({ [key]: 'saving' });
    
    try {
      // Сохраняем переводы для всех языков
      for (const lang of LANGUAGES) {
        const value = editValues[lang.code];
        if (value) {
          await updateTranslation(key, lang.code, value);
        }
      }
      
      // Очищаем кэш и перезагружаем
      await clearTranslationsCache();
      await reloadTranslations();
      
      setSaveStatus({ [key]: 'success' });
      setTimeout(() => {
        setSaveStatus({});
        setEditingKey(null);
      }, 1500);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus({ [key]: 'error' });
      setTimeout(() => setSaveStatus({}), 3000);
    }
  };

  const handleAITranslate = async (key, sourceLang) => {
    const sourceText = editValues[sourceLang];
    if (!sourceText) return;

    setIsGenerating(true);
    
    try {
      const result = await generateAllTranslations(sourceText, sourceLang, key);
      setEditValues(prev => ({ ...prev, ...result }));
    } catch (error) {
      console.error('AI translate failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValues({});
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-white shadow-2xl z-[10000] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-purple-700">
        <div>
          <h2 className="text-2xl font-bold text-white">Редактор переводов</h2>
          <p className="text-sm text-purple-100 mt-1">{filteredKeys.length} ключей</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-purple-800 rounded-lg transition-colors !bg-transparent border-0"
          title="Выйти из режима редактирования"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по ключу или тексту..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Filter className="w-4 h-4 text-gray-500 mt-2" />
          <div className="flex gap-1 flex-wrap">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border-0 ${
                  selectedLang === lang.code
                    ? 'bg-[#004aad] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keys List */}
      <div className="flex-1 overflow-y-auto">
        {filteredKeys.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Ничего не найдено</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredKeys.map(key => {
              const isEditing = editingKey === key;
              const isExpanded = expandedKey === key;
              const status = saveStatus[key];
              
              return (
                <div key={key} data-key={key} className="p-3">
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => setExpandedKey(isExpanded ? null : key)}
                      className="mt-1 p-1 rounded text-gray-600 hover:text-[#004aad] !bg-transparent border-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs font-mono text-[#004aad] bg-[#004aad]/10 px-2 py-0.5 rounded">
                          {key}
                        </code>
                        {!isEditing && (
                          <button
                            onClick={() => handleEdit(key)}
                            className="text-xs text-[#004aad] hover:text-[#003580] font-medium !bg-transparent border-0 p-0"
                          >
                            Редактировать
                          </button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 truncate">
                        {i18n.t(key, { lng: selectedLang })}
                      </p>

                      {/* Expanded Edit Form */}
                      {isExpanded && isEditing && (
                        <div className="mt-3 space-y-3 bg-gray-50 p-3 rounded-lg">
                          {LANGUAGES.map(lang => (
                            <div key={lang.code}>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-medium text-gray-700">
                                  {lang.flag} {lang.label}
                                </label>
                                {lang.code === 'ru' && (
                                  <button
                                    onClick={() => handleAITranslate(key, 'ru')}
                                    disabled={isGenerating || !editValues.ru}
                                    className="flex items-center gap-1 text-xs text-[#004aad] hover:text-[#003580] disabled:opacity-50 !bg-transparent border-0 p-0"
                                  >
                                    {isGenerating ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Sparkles className="w-3 h-3" />
                                    )}
                                    AI перевод
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                value={editValues[lang.code] || ''}
                                onChange={(e) => setEditValues(prev => ({
                                  ...prev,
                                  [lang.code]: e.target.value
                                }))}
                                className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                                placeholder={`Перевод на ${lang.label}...`}
                              />
                            </div>
                          ))}
                          
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleSave(key)}
                              disabled={status === 'saving'}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                            >
                              {status === 'saving' ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Сохранение...
                                </>
                              ) : status === 'success' ? (
                                <>
                                  <Save className="w-4 h-4" />
                                  Сохранено!
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4" />
                                  Сохранить
                                </>
                              )}
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                            >
                              Отмена
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

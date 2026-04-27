import { useState, useEffect } from 'react';
import { Database, TrendingUp, Clock, Trash2, Search, RefreshCw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function TranslationCacheStats({ adminKey }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/translations/cache/stats`, {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch cache stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/api/translations/cache/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            'x-admin-key': adminKey,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Failed to search cache:', error);
    }
  };

  const handleClearCache = async (daysOld = null) => {
    const message = daysOld
      ? `Удалить переводы старше ${daysOld} дней?`
      : 'Удалить весь кэш переводов?';

    if (!window.confirm(message)) return;

    try {
      const response = await fetch(`${API_URL}/api/translations/cache`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(daysOld ? { daysOld } : {}),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
      alert('Ошибка при очистке кэша');
    }
  };

  useEffect(() => {
    if (adminKey) {
      fetchStats();
    }
  }, [adminKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm text-red-800">Не удалось загрузить статистику кэша</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Кэш переводов</h3>
        <button
          onClick={fetchStats}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Обновить"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Всего записей</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total_entries || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Использований</p>
              <p className="text-2xl font-bold text-green-900">{stats.total_uses || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Среднее использование</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.avg_uses_per_entry ? stats.avg_uses_per_entry.toFixed(1) : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600 font-medium">Языков</p>
              <p className="text-2xl font-bold text-orange-900">{stats.languages_count || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Поиск в кэше</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Поиск по тексту..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Найти
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">
                    {result.source_lang} → {result.target_lang}
                  </span>
                  <span className="text-xs text-gray-400">
                    Использований: {result.used_count}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{result.source_text}</p>
                <p className="text-sm text-blue-600">{result.translated_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {stats.topTranslations && stats.topTranslations.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Топ переводов</h4>
          <div className="space-y-2">
            {stats.topTranslations.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">
                    #{index + 1} • {item.source_lang} → {item.target_lang}
                  </span>
                  <span className="text-xs font-bold text-green-600">
                    {item.used_count} использований
                  </span>
                </div>
                <p className="text-sm text-gray-700">{item.source_text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Управление кэшем</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleClearCache(30)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Очистить старые (30+ дней)
          </button>
          <button
            onClick={() => handleClearCache()}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Очистить весь кэш
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          ⚠️ Очистка кэша приведет к повторным запросам к AI для переводов
        </p>
      </div>
    </div>
  );
}

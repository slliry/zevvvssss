// В продакшене используем относительный путь, в dev - localhost
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:4000');

// Загрузка переводов из БД через API
export async function loadTranslationsFromDB(lang) {
  try {
    const response = await fetch(`${API_URL}/api/translations/lang/${lang}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }

    const data = await response.json();
    return data.translations || {};
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return {};
  }
}

// Загрузка всех переводов
export async function loadAllTranslations() {
  try {
    const response = await fetch(`${API_URL}/api/translations/all`);
    
    if (!response.ok) {
      throw new Error('Failed to load all translations');
    }

    const data = await response.json();
    return data.translations || {};
  } catch (error) {
    console.error('Error loading all translations:', error);
    return {};
  }
}

// Кэширование переводов в localStorage
export function cacheTranslations(lang, translations) {
  try {
    const cacheKey = `translations_${lang}`;
    const cacheData = {
      translations,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching translations:', error);
  }
}

// Получение переводов из кэша
export function getCachedTranslations(lang, maxAge = 3600000) { // 1 час по умолчанию
  try {
    const cacheKey = `translations_${lang}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    const age = Date.now() - cacheData.timestamp;

    if (age > maxAge) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cacheData.translations;
  } catch (error) {
    console.error('Error getting cached translations:', error);
    return null;
  }
}

// Очистка кэша переводов
export function clearTranslationsCache() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('translations_')) {
      localStorage.removeItem(key);
    }
  });
}

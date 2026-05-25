import { useState, useRef, useEffect } from 'react';

// В продакшене используем относительный путь, в dev - localhost
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:4000');

export function useTranslationEditor(adminKey) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Используем ref чтобы всегда иметь актуальный ключ в замыканиях
  const adminKeyRef = useRef(adminKey);
  useEffect(() => {
    adminKeyRef.current = adminKey;
  }, [adminKey]);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-admin-key': adminKeyRef.current,
  });

  const generateTranslation = async (text, targetLang, context = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/generate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text, targetLang, context }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate translation');
      }

      const data = await response.json();
      return data.translation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateAllTranslations = async (text, sourceLang = 'ru', context = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/generate-all`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text, sourceLang, context }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate translations');
      }

      const data = await response.json();
      return data.translations;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTranslation = async (lang, key, value) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${API_URL}/api/translations/update`;
      const payload = { lang, key, value };

      const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const autoTranslateKey = async (key, sourceText, sourceLang = 'ru') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/auto-translate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ key, sourceText, sourceLang }),
      });

      if (!response.ok) {
        throw new Error('Failed to auto-translate');
      }

      const data = await response.json();
      return data.translations;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateTranslation,
    generateAllTranslations,
    updateTranslation,
    autoTranslateKey,
    isLoading,
    error,
  };
}

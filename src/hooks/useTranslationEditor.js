import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function useTranslationEditor(adminKey) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = {
    'Content-Type': 'application/json',
    'x-admin-key': adminKey,
  };

  const generateTranslation = useCallback(async (text, targetLang, context = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/generate`, {
        method: 'POST',
        headers,
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
  }, [adminKey]);

  const generateAllTranslations = useCallback(async (text, sourceLang = 'ru', context = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/generate-all`, {
        method: 'POST',
        headers,
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
  }, [adminKey]);

  const updateTranslation = useCallback(async (lang, key, value) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/update`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ lang, key, value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update translation');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  const autoTranslateKey = useCallback(async (key, sourceText, sourceLang = 'ru') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/translations/auto-translate`, {
        method: 'POST',
        headers,
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
  }, [adminKey]);

  return {
    generateTranslation,
    generateAllTranslations,
    updateTranslation,
    autoTranslateKey,
    isLoading,
    error,
  };
}

import db from '../db/index.js';

class TranslationDbService {
  // Получить перевод по ключу и языку
  getTranslation(key, lang) {
    try {
      const stmt = db.prepare('SELECT value FROM translations WHERE key = ? AND lang = ?');
      const result = stmt.get(key, lang);
      return result ? result.value : null;
    } catch (error) {
      console.error('Error getting translation:', error);
      return null;
    }
  }

  // Получить все переводы для языка
  getAllTranslations(lang) {
    try {
      const stmt = db.prepare('SELECT key, value FROM translations WHERE lang = ?');
      const results = stmt.all(lang);
      
      const translations = {};
      results.forEach(({ key, value }) => {
        const keys = key.split('.');
        let current = translations;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
      });
      
      return translations;
    } catch (error) {
      console.error('Error getting all translations:', error);
      return {};
    }
  }

  // Сохранить/обновить перевод
  saveTranslation(key, lang, value, updatedBy = 'admin') {
    try {
      const now = new Date().toISOString();
      const stmt = db.prepare(`
        INSERT INTO translations (key, lang, value, created_at, updated_at, updated_by)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(key, lang) 
        DO UPDATE SET 
          value = excluded.value,
          updated_at = excluded.updated_at,
          updated_by = excluded.updated_by
      `);

      stmt.run(key, lang, value, now, now, updatedBy);
      console.log(`✅ Saved translation: ${key} [${lang}]`);
      return true;
    } catch (error) {
      console.error('Error saving translation:', error);
      return false;
    }
  }

  // Сохранить переводы для всех языков
  saveTranslations(key, translations, updatedBy = 'admin') {
    try {
      const transaction = db.transaction(() => {
        for (const [lang, value] of Object.entries(translations)) {
          this.saveTranslation(key, lang, value, updatedBy);
        }
      });

      transaction();
      console.log(`✅ Saved translations for key: ${key}`);
      return true;
    } catch (error) {
      console.error('Error saving translations:', error);
      return false;
    }
  }

  // Удалить перевод
  deleteTranslation(key, lang = null) {
    try {
      let stmt;
      if (lang) {
        stmt = db.prepare('DELETE FROM translations WHERE key = ? AND lang = ?');
        stmt.run(key, lang);
      } else {
        stmt = db.prepare('DELETE FROM translations WHERE key = ?');
        stmt.run(key);
      }
      console.log(`🗑️ Deleted translation: ${key} ${lang ? `[${lang}]` : '[all languages]'}`);
      return true;
    } catch (error) {
      console.error('Error deleting translation:', error);
      return false;
    }
  }

  // Поиск переводов
  searchTranslations(query, lang = null, limit = 50) {
    try {
      let stmt;
      let results;

      if (lang) {
        stmt = db.prepare(`
          SELECT key, lang, value, updated_at 
          FROM translations 
          WHERE lang = ? AND (key LIKE ? OR value LIKE ?)
          ORDER BY updated_at DESC
          LIMIT ?
        `);
        results = stmt.all(lang, `%${query}%`, `%${query}%`, limit);
      } else {
        stmt = db.prepare(`
          SELECT key, lang, value, updated_at 
          FROM translations 
          WHERE key LIKE ? OR value LIKE ?
          ORDER BY updated_at DESC
          LIMIT ?
        `);
        results = stmt.all(`%${query}%`, `%${query}%`, limit);
      }

      return results;
    } catch (error) {
      console.error('Error searching translations:', error);
      return [];
    }
  }

  // Получить статистику
  getStats() {
    try {
      const stats = db.prepare(`
        SELECT 
          COUNT(DISTINCT key) as total_keys,
          COUNT(*) as total_translations,
          COUNT(DISTINCT lang) as languages_count
        FROM translations
      `).get();

      const byLanguage = db.prepare(`
        SELECT lang, COUNT(*) as count
        FROM translations
        GROUP BY lang
      `).all();

      const recentUpdates = db.prepare(`
        SELECT key, lang, value, updated_at, updated_by
        FROM translations
        ORDER BY updated_at DESC
        LIMIT 10
      `).all();

      return {
        ...stats,
        byLanguage,
        recentUpdates,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return null;
    }
  }

  // Получить все ключи
  getAllKeys() {
    try {
      const stmt = db.prepare('SELECT DISTINCT key FROM translations ORDER BY key');
      return stmt.all().map(row => row.key);
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  // Получить все переводы для ключа (все языки)
  getTranslationsByKey(key) {
    try {
      const stmt = db.prepare('SELECT lang, value FROM translations WHERE key = ?');
      const results = stmt.all(key);
      
      const translations = {};
      results.forEach(({ lang, value }) => {
        translations[lang] = value;
      });
      
      return translations;
    } catch (error) {
      console.error('Error getting translations by key:', error);
      return {};
    }
  }

  // Импорт переводов из JSON объекта
  importFromJSON(lang, jsonData, prefix = '') {
    let count = 0;
    
    const processObject = (obj, currentPrefix) => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = currentPrefix ? `${currentPrefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          processObject(value, fullKey);
        } else {
          this.saveTranslation(fullKey, lang, String(value));
          count++;
        }
      }
    };

    try {
      processObject(jsonData, prefix);
      console.log(`✅ Imported ${count} translations for ${lang}`);
      return count;
    } catch (error) {
      console.error('Error importing translations:', error);
      return 0;
    }
  }
}

export default new TranslationDbService();

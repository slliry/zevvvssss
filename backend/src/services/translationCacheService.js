import db from '../db/index.js';

class TranslationCacheService {
  getCachedTranslation(sourceText, sourceLang, targetLang, context = '') {
    try {
      const stmt = db.prepare(`
        SELECT translated_text, used_count 
        FROM translation_cache 
        WHERE source_text = ? 
          AND source_lang = ? 
          AND target_lang = ? 
          AND (context = ? OR (context IS NULL AND ? = ''))
      `);

      const result = stmt.get(sourceText, sourceLang, targetLang, context, context);

      if (result) {
        this.incrementUsageCount(sourceText, sourceLang, targetLang, context);
        console.log(`✅ Cache hit: ${sourceLang} → ${targetLang} (used ${result.used_count} times)`);
        return result.translated_text;
      }

      console.log(`❌ Cache miss: ${sourceLang} → ${targetLang}`);
      return null;
    } catch (error) {
      console.error('Error getting cached translation:', error);
      return null;
    }
  }

  saveTranslation(sourceText, sourceLang, targetLang, translatedText, context = '') {
    try {
      const now = new Date().toISOString();
      const stmt = db.prepare(`
        INSERT INTO translation_cache 
          (source_text, source_lang, target_lang, translated_text, context, created_at, last_used_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(source_text, source_lang, target_lang, context) 
        DO UPDATE SET 
          translated_text = excluded.translated_text,
          last_used_at = excluded.last_used_at,
          used_count = used_count + 1
      `);

      stmt.run(sourceText, sourceLang, targetLang, translatedText, context, now, now);
      console.log(`💾 Cached translation: ${sourceLang} → ${targetLang}`);
      return true;
    } catch (error) {
      console.error('Error saving translation to cache:', error);
      return false;
    }
  }

  incrementUsageCount(sourceText, sourceLang, targetLang, context = '') {
    try {
      const now = new Date().toISOString();
      const stmt = db.prepare(`
        UPDATE translation_cache 
        SET used_count = used_count + 1,
            last_used_at = ?
        WHERE source_text = ? 
          AND source_lang = ? 
          AND target_lang = ? 
          AND (context = ? OR (context IS NULL AND ? = ''))
      `);

      stmt.run(now, sourceText, sourceLang, targetLang, context, context);
    } catch (error) {
      console.error('Error incrementing usage count:', error);
    }
  }

  getCacheStats() {
    try {
      const stats = db.prepare(`
        SELECT 
          COUNT(*) as total_entries,
          SUM(used_count) as total_uses,
          COUNT(DISTINCT target_lang) as languages_count,
          AVG(used_count) as avg_uses_per_entry
        FROM translation_cache
      `).get();

      const topTranslations = db.prepare(`
        SELECT 
          source_text,
          source_lang,
          target_lang,
          used_count,
          last_used_at
        FROM translation_cache
        ORDER BY used_count DESC
        LIMIT 10
      `).all();

      return {
        ...stats,
        topTranslations,
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return null;
    }
  }

  clearCache() {
    try {
      const stmt = db.prepare('DELETE FROM translation_cache');
      const result = stmt.run();
      console.log(`🗑️ Cleared ${result.changes} cached translations`);
      return result.changes;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return 0;
    }
  }

  clearOldCache(daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      const cutoffISO = cutoffDate.toISOString();

      const stmt = db.prepare(`
        DELETE FROM translation_cache 
        WHERE last_used_at < ? AND used_count < 5
      `);

      const result = stmt.run(cutoffISO);
      console.log(`🗑️ Cleared ${result.changes} old cached translations`);
      return result.changes;
    } catch (error) {
      console.error('Error clearing old cache:', error);
      return 0;
    }
  }

  searchCache(query, limit = 50) {
    try {
      const stmt = db.prepare(`
        SELECT 
          source_text,
          source_lang,
          target_lang,
          translated_text,
          used_count,
          last_used_at
        FROM translation_cache
        WHERE source_text LIKE ? OR translated_text LIKE ?
        ORDER BY used_count DESC
        LIMIT ?
      `);

      return stmt.all(`%${query}%`, `%${query}%`, limit);
    } catch (error) {
      console.error('Error searching cache:', error);
      return [];
    }
  }
}

export default new TranslationCacheService();

import translationService from '../services/translationService.js';
import translationCacheService from '../services/translationCacheService.js';

export async function generateTranslation(req, res, next) {
  try {
    const { text, targetLang, context } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'text and targetLang are required',
      });
    }

    const translation = await translationService.generateTranslation(
      text,
      targetLang,
      context
    );

    res.json({
      success: true,
      translation,
      targetLang,
    });
  } catch (error) {
    next(error);
  }
}

export async function generateAllTranslations(req, res, next) {
  try {
    const { text, sourceLang = 'ru', context } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'text is required',
      });
    }

    const translations = await translationService.generateAllTranslations(
      text,
      sourceLang,
      context
    );

    res.json({
      success: true,
      translations,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTranslation(req, res, next) {
  try {
    const { lang, key, value } = req.body;

    if (!lang || !key || value === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'lang, key, and value are required',
      });
    }

    const updatedTranslations = translationService.updateTranslationKey(
      lang,
      key,
      value
    );

    res.json({
      success: true,
      message: 'Translation updated successfully',
      lang,
      key,
      value,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTranslation(req, res, next) {
  try {
    const { lang, key } = req.query;

    if (!lang) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'lang is required',
      });
    }

    if (key) {
      const value = translationService.getTranslationValue(lang, key);
      if (value === null) {
        return res.status(404).json({
          error: 'Not Found',
          message: `Translation key not found: ${key}`,
        });
      }
      return res.json({ success: true, lang, key, value });
    }

    const translations = translationService.getTranslationFile(lang);
    res.json({ success: true, lang, translations });
  } catch (error) {
    next(error);
  }
}

export async function getAllTranslations(req, res, next) {
  try {
    const allTranslations = translationService.getAllTranslations();
    res.json({
      success: true,
      translations: allTranslations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTranslationsByLang(req, res, next) {
  try {
    const { lang } = req.params;
    
    if (!lang) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'lang parameter is required',
      });
    }

    const translations = translationService.getTranslationFile(lang);
    
    res.json({
      success: true,
      lang,
      translations,
    });
  } catch (error) {
    next(error);
  }
}

export async function autoTranslateKey(req, res, next) {
  try {
    const { key, sourceText, sourceLang = 'ru' } = req.body;

    if (!key || !sourceText) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'key and sourceText are required',
      });
    }

    const results = await translationService.autoTranslateKey(
      key,
      sourceText,
      sourceLang
    );

    res.json({
      success: true,
      message: 'Auto-translation completed',
      key,
      translations: results,
    });
  } catch (error) {
    next(error);
  }
}

export async function requestNewLanguage(req, res, next) {
  try {
    const { languageCode, languageName, userEmail } = req.body;

    if (!languageCode || !languageName) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'languageCode and languageName are required',
      });
    }

    console.log(`📬 New language request: ${languageName} (${languageCode})`);
    console.log(`   From: ${userEmail || 'anonymous'}`);

    res.json({
      success: true,
      message: 'Language request received. We will notify you when it becomes available.',
      languageCode,
      languageName,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCacheStats(req, res, next) {
  try {
    const stats = translationCacheService.getCacheStats();
    
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchCache(req, res, next) {
  try {
    const { query, limit = 50 } = req.query;

    if (!query) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'query parameter is required',
      });
    }

    const results = translationCacheService.searchCache(query, parseInt(limit));
    
    res.json({
      success: true,
      results,
      count: results.length,
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCache(req, res, next) {
  try {
    const { daysOld } = req.body;

    let cleared;
    if (daysOld) {
      cleared = translationCacheService.clearOldCache(parseInt(daysOld));
    } else {
      cleared = translationCacheService.clearCache();
    }

    res.json({
      success: true,
      message: `Cleared ${cleared} cached translations`,
      cleared,
    });
  } catch (error) {
    next(error);
  }
}

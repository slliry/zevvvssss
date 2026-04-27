import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import env from '../config/env.js';
import translationCacheService from './translationCacheService.js';
import translationDbService from './translationDbService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: env.openaiApiKey,
});

const SUPPORTED_LANGUAGES = {
  ru: 'Russian',
  en: 'English',
  kk: 'Kazakh',
  uz: 'Uzbek',
  ky: 'Kyrgyz',
  tr: 'Turkish',
};

const LOCALES_PATH = path.resolve(__dirname, '../../../src/locales');

class TranslationService {
  async generateTranslation(text, targetLang, context = '', sourceLang = 'auto') {
    if (!env.openaiApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const languageName = SUPPORTED_LANGUAGES[targetLang];
    if (!languageName) {
      throw new Error(`Unsupported language: ${targetLang}`);
    }

    const cachedTranslation = translationCacheService.getCachedTranslation(
      text,
      sourceLang,
      targetLang,
      context
    );

    if (cachedTranslation) {
      return cachedTranslation;
    }

    const systemPrompt = `You are a professional translator specializing in technical and business translations. 
Translate the given text to ${languageName} accurately, maintaining the tone and context.
${context ? `Context: ${context}` : ''}
Return ONLY the translated text without any explanations or additional formatting.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const translatedText = completion.choices[0].message.content.trim();
      
      translationCacheService.saveTranslation(
        text,
        sourceLang,
        targetLang,
        translatedText,
        context
      );

      return translatedText;
    } catch (error) {
      console.error('OpenAI translation error:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async generateAllTranslations(sourceText, sourceLang = 'ru', context = '') {
    const translations = {};
    const targetLanguages = Object.keys(SUPPORTED_LANGUAGES).filter(
      (lang) => lang !== sourceLang
    );

    const promises = targetLanguages.map(async (lang) => {
      try {
        const translation = await this.generateTranslation(sourceText, lang, context);
        translations[lang] = translation;
      } catch (error) {
        console.error(`Failed to translate to ${lang}:`, error);
        translations[lang] = sourceText;
      }
    });

    await Promise.all(promises);
    translations[sourceLang] = sourceText;

    return translations;
  }

  getTranslationFile(lang) {
    return translationDbService.getAllTranslations(lang);
  }

  saveTranslationFile(lang, data) {
    // Deprecated - используйте updateTranslationKey
    console.warn('saveTranslationFile is deprecated');
  }

  updateTranslationKey(lang, key, value) {
    translationDbService.saveTranslation(key, lang, value);
    return translationDbService.getAllTranslations(lang);
  }

  getTranslationValue(lang, key) {
    return translationDbService.getTranslation(key, lang);
  }

  async autoTranslateKey(key, sourceText, sourceLang = 'ru') {
    const allTranslations = await this.generateAllTranslations(sourceText, sourceLang);
    
    translationDbService.saveTranslations(key, allTranslations);
    
    return allTranslations;
  }

  getAllTranslations() {
    const allTranslations = {};
    for (const lang of Object.keys(SUPPORTED_LANGUAGES)) {
      try {
        allTranslations[lang] = translationDbService.getAllTranslations(lang);
      } catch (error) {
        console.error(`Failed to load ${lang}:`, error);
        allTranslations[lang] = {};
      }
    }
    return allTranslations;
  }

  // Новые методы для работы с БД
  getTranslationsByKey(key) {
    return translationDbService.getTranslationsByKey(key);
  }

  searchTranslations(query, lang = null, limit = 50) {
    return translationDbService.searchTranslations(query, lang, limit);
  }

  getTranslationStats() {
    return translationDbService.getStats();
  }

  getAllKeys() {
    return translationDbService.getAllKeys();
  }
}

export default new TranslationService();

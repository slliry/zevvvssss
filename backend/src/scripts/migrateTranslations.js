import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import translationDbService from '../services/translationDbService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_PATH = path.resolve(__dirname, '../../locales');
const LANGUAGES = ['ru', 'en', 'kk', 'uz', 'ky', 'tr'];

async function migrateTranslations() {
  console.log('🚀 Starting translation migration from JSON to Database...\n');

  let totalImported = 0;

  for (const lang of LANGUAGES) {
    const filePath = path.join(LOCALES_PATH, `${lang}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${lang}.json - skipping`);
      continue;
    }

    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`📖 Reading ${lang}.json...`);
      
      const count = translationDbService.importFromJSON(lang, jsonData);
      totalImported += count;
      
      console.log(`✅ Imported ${count} translations for ${lang}\n`);
    } catch (error) {
      console.error(`❌ Error importing ${lang}:`, error.message);
    }
  }

  console.log(`\n🎉 Migration complete! Total translations imported: ${totalImported}`);
  
  // Показываем статистику
  const stats = translationDbService.getStats();
  console.log('\n📊 Database Statistics:');
  console.log(`   Total keys: ${stats.total_keys}`);
  console.log(`   Total translations: ${stats.total_translations}`);
  console.log(`   Languages: ${stats.languages_count}`);
  console.log('\n   By language:');
  stats.byLanguage.forEach(({ lang, count }) => {
    console.log(`   - ${lang}: ${count} translations`);
  });
}

migrateTranslations().catch(console.error);

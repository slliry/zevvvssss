import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import env from '../config/env.js';

const dbDir = path.dirname(env.databasePath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(env.databasePath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','in_review','done','archived')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS translation_cache (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_text TEXT NOT NULL,
    source_lang TEXT NOT NULL,
    target_lang TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    context TEXT,
    created_at TEXT NOT NULL,
    used_count INTEGER DEFAULT 1,
    last_used_at TEXT NOT NULL,
    UNIQUE(source_text, source_lang, target_lang, context)
  );

  CREATE INDEX IF NOT EXISTS idx_translation_lookup 
    ON translation_cache(source_text, source_lang, target_lang);

  CREATE TABLE IF NOT EXISTS translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    lang TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT,
    UNIQUE(key, lang)
  );

  CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(key);
  CREATE INDEX IF NOT EXISTS idx_translations_lang ON translations(lang);
  CREATE INDEX IF NOT EXISTS idx_translations_lookup ON translations(key, lang);

  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    country TEXT,
    region TEXT,
    city TEXT,
    page_path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    language TEXT,
    screen_width INTEGER,
    screen_height INTEGER,
    visited_at TEXT NOT NULL,
    session_id TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_analytics_visited_at ON analytics(visited_at);
  CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country);
  CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics(page_path);
  CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics(session_id);
`);

export default db;

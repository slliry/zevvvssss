import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import env from '../config/env.js';
import { hashPassword, isPasswordHashed } from '../utils/password.js';

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
`);

const seed = env.adminSeed;
if (seed?.email && seed?.password) {
  const fallbackName = seed.name?.trim() || 'Demo Admin';
  const existing = db.prepare('SELECT id FROM admins WHERE email = ?').get(seed.email);
  if (!existing) {
    const passwordHash = isPasswordHashed(seed.password) ? seed.password : hashPassword(seed.password);
    const stmt = db.prepare(
      'INSERT INTO admins (email, password_hash, name, created_at) VALUES (?, ?, ?, ?)'
    );
    const now = new Date().toISOString();
    stmt.run(seed.email, passwordHash, fallbackName, now);
    console.log(`[db] Auto-created admin ${seed.email}`);
  }
}

export default db;

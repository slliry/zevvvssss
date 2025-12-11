import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import env from '../config/env.js';
import { findAdminByEmail, createAdmin } from '../services/adminService.js';
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
  if (!findAdminByEmail(seed.email)) {
    const passwordHash = isPasswordHashed(seed.password) ? seed.password : hashPassword(seed.password);
    createAdmin({ email: seed.email, passwordHash, name: fallbackName });
    console.log(`[db] Auto-created admin ${seed.email}`);
  }
}

export default db;

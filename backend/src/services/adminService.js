import db from '../db/index.js';

export function findAdminByEmail(email) {
  return db
    .prepare('SELECT * FROM admins WHERE email = ?')
    .get(email);
}

export function createAdmin({ email, passwordHash, name }) {
  const stmt = db.prepare(
    'INSERT INTO admins (email, password_hash, name, created_at) VALUES (?, ?, ?, ?)'
  );
  const now = new Date().toISOString();
  const result = stmt.run(email, passwordHash, name, now);
  return { id: result.lastInsertRowid, email, name, created_at: now };
}

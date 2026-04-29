import nodemailer from 'nodemailer';
import db from '../db/index.js';
import env from '../config/env.js';
import telegramService from './telegramService.js';

function formatNotificationDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Almaty',
  }).format(date);
}

async function sendRequestNotification(request) {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.smtpFrom) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  const subject = `Новая заявка от ${request.name}`;
  const createdAt = formatNotificationDate(request.created_at);
  const lines = [
    `Имя: ${request.name}`,
    `Компания: ${request.company}`,
    `Email: ${request.email}`,
    `Телефон: ${request.phone || '-'}`,
    `Должность: ${request.role || '-'}`,
    `Сообщение: ${request.message || '-'}`,
    `ID заявки: ${request.id}`,
    `Создано: ${createdAt}`,
  ];

  await transporter.sendMail({
    from: env.smtpFrom,
    to: env.requestNotificationEmail,
    replyTo: request.email,
    subject,
    text: lines.join('\n'),
  });
}

async function sendTelegramRequestNotification(request) {
  return telegramService.sendRequestNotification(request);
}

export async function createRequest(data) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO requests (name, company, email, phone, role, message, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?)
  `);
  const result = stmt.run(
    data.name,
    data.company,
    data.email,
    data.phone ?? null,
    data.role ?? null,
    data.message ?? null,
    now,
    now
  );
  const request = {
    id: result.lastInsertRowid,
    ...data,
    status: 'new',
    created_at: now,
    updated_at: now,
  };

  const results = await Promise.allSettled([
    sendRequestNotification(request),
    sendTelegramRequestNotification(request),
  ]);

  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.error('Request notification failed:', result.reason);
    }
  });

  return request;
}

export function buildFilters({ status, search, from, to }) {
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push(`(
      name LIKE ?
      OR company LIKE ?
      OR email LIKE ?
      OR COALESCE(message, '') LIKE ?
    )`);
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  if (from) {
    conditions.push('datetime(created_at) >= datetime(?)');
    params.push(from);
  }

  if (to) {
    conditions.push('datetime(created_at) <= datetime(?)');
    params.push(to);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, params };
}

export function getRequests({ status, search, from, to, limit = 20, offset = 0, sort = 'desc' }) {
  const order = sort === 'asc' ? 'ASC' : 'DESC';
  const { whereClause, params } = buildFilters({ status, search, from, to });

  const totalStmt = db.prepare(`SELECT COUNT(*) as total FROM requests ${whereClause}`);
  const { total } = totalStmt.get(...params);

  const listStmt = db.prepare(`
    SELECT * FROM requests
    ${whereClause}
    ORDER BY datetime(created_at) ${order}
    LIMIT ?
    OFFSET ?
  `);

  const items = listStmt.all(...params, limit, offset);
  return { total, items };
}

export function updateRequestStatus(id, status) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE requests
    SET status = ?, updated_at = ?
    WHERE id = ?
  `);
  const info = stmt.run(status, now, id);
  return info.changes > 0;
}

export function getRequestById(id) {
  return db.prepare('SELECT * FROM requests WHERE id = ?').get(id);
}

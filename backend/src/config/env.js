import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../');
loadEnv({ path: path.resolve(rootDir, '.env') });

function normalizeEnvValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim().replace(/^['\"]|['\"]$/g, '');
}

const env = {
  port: Number(process.env.PORT) || 4000,
  databasePath: path.resolve(rootDir, process.env.DATABASE_PATH || './data/app.db'),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || '',
  smtpSecure: process.env.SMTP_SECURE === 'true',
  requestNotificationEmail: process.env.REQUEST_NOTIFICATION_EMAIL || 'zeus@dmcorp.kz',
  telegramBotToken: normalizeEnvValue(process.env.TELEGRAM_BOT_TOKEN),
  telegramChatId: normalizeEnvValue(process.env.TELEGRAM_CHAT_ID),
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  translationAdminKey: process.env.TRANSLATION_ADMIN_KEY || 'admin-secret-key',
};

export default env;

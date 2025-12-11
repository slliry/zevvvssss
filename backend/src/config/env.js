import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../');
loadEnv({ path: path.resolve(rootDir, '.env') });

const env = {
  port: Number(process.env.PORT) || 4000,
  databasePath: path.resolve(rootDir, process.env.DATABASE_PATH || './data/app.db'),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export default env;

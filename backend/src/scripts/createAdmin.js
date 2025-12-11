import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import env from '../config/env.js';
import db from '../db/index.js';
import { hashPassword } from '../utils/password.js';
import { createAdmin, findAdminByEmail } from '../services/adminService.js';

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    const email = await rl.question('Admin email: ');
    const password = await rl.question('Admin password: ');
    const name = await rl.question('Admin name (optional): ');

    if (findAdminByEmail(email)) {
      console.log('Admin with this email already exists.');
      return;
    }

    const passwordHash = hashPassword(password);
    const admin = createAdmin({ email, passwordHash, name: name || null });
    console.log('Admin created:', admin);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error('Failed to create admin', error);
  process.exit(1);
});

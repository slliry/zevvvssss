import jwt from 'jsonwebtoken';
import { z } from 'zod';
import env from '../config/env.js';
import { findAdminByEmail } from '../services/adminService.js';
import { comparePassword } from '../utils/password.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function login(req, res, next) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
    }

    const isValid = comparePassword(password, admin.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, env.jwtSecret, { expiresIn: '12h' });
    return res.json({
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    return next(error);
  }
}

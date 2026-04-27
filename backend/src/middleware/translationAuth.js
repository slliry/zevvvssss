import env from '../config/env.js';

export function translationAdminAuth(req, res, next) {
  const adminKey = req.headers['x-admin-key'];

  if (!adminKey || adminKey !== env.translationAdminKey) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid or missing admin key',
    });
  }

  next();
}

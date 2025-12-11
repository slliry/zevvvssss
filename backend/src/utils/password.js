import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function isPasswordHashed(password) {
  return typeof password === 'string' && password.startsWith('$2');
}

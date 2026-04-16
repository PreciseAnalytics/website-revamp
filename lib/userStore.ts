import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  verified: boolean;
  verifyToken: string | null;
  verifyTokenExpires: number | null;
  createdAt: string;
}

function storePath(): string {
  if (process.env.NODE_ENV === 'production') return '/tmp/pa_users.json';
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'users.json');
}

function readAll(): UserRecord[] {
  try { return JSON.parse(fs.readFileSync(storePath(), 'utf8')); } catch { return []; }
}

function writeAll(users: UserRecord[]): void {
  fs.writeFileSync(storePath(), JSON.stringify(users, null, 2), 'utf8');
}

export function findByEmail(email: string): UserRecord | undefined {
  return readAll().find(u => u.email === email.toLowerCase());
}

export function findByVerifyToken(token: string): UserRecord | undefined {
  return readAll().find(u => u.verifyToken === token);
}

export function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  passwordHash: string
): UserRecord {
  const users = readAll();
  const verifyToken = crypto.randomBytes(32).toString('hex');
  const user: UserRecord = {
    id: crypto.randomUUID(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    passwordHash,
    verified: false,
    verifyToken,
    verifyTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeAll(users);
  return user;
}

export function markVerified(userId: string): void {
  const users = readAll();
  const u = users.find(u => u.id === userId);
  if (u) {
    u.verified = true;
    u.verifyToken = null;
    u.verifyTokenExpires = null;
    writeAll(users);
  }
}

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT || 'pa_salt_2026';
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

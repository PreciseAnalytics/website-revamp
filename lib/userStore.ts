import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  recoveryEmail?: string | null;
  passwordHash: string;
  verified: boolean;
  verifyToken: string | null;
  verifyTokenExpires: number | null;
  resetToken?: string | null;
  resetTokenExpires?: number | null;
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

export function findByResetToken(token: string): UserRecord | undefined {
  return readAll().find(u => u.resetToken === token);
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
    resetToken: null,
    resetTokenExpires: null,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeAll(users);
  return user;
}

export function reissueVerifyToken(email: string): { token: string; expiresAt: number } | null {
  const users = readAll();
  const u = users.find(x => x.email === email.toLowerCase());
  if (!u) return null;
  if (u.verified) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  u.verifyToken = token;
  u.verifyTokenExpires = expiresAt;
  writeAll(users);
  return { token, expiresAt };
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

export function setResetToken(email: string): { token: string; expiresAt: number } | null {
  const users = readAll();
  const u = users.find(x => x.email === email.toLowerCase());
  if (!u) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
  u.resetToken = token;
  u.resetTokenExpires = expiresAt;
  writeAll(users);
  return { token, expiresAt };
}

export function resetPasswordByToken(token: string, newPasswordHash: string): UserRecord | null {
  const users = readAll();
  const u = users.find(x => x.resetToken === token);
  if (!u) return null;
  if (u.resetTokenExpires && Date.now() > u.resetTokenExpires) return null;

  u.passwordHash = newPasswordHash;
  u.resetToken = null;
  u.resetTokenExpires = null;
  writeAll(users);
  return u;
}

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT || 'pa_salt_2026';
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

export function findById(id: string): UserRecord | undefined {
  return readAll().find(u => u.id === id);
}

export function updateProfile(
  email: string,
  fields: { firstName?: string; lastName?: string; phone?: string; recoveryEmail?: string | null }
): UserRecord | null {
  const users = readAll();
  const u = users.find(x => x.email === email.toLowerCase());
  if (!u) return null;
  if (fields.firstName !== undefined) u.firstName = fields.firstName.trim();
  if (fields.lastName !== undefined) u.lastName = fields.lastName.trim();
  if (fields.phone !== undefined) u.phone = fields.phone.trim();
  if (fields.recoveryEmail !== undefined) u.recoveryEmail = fields.recoveryEmail ? fields.recoveryEmail.toLowerCase().trim() : null;
  writeAll(users);
  return u;
}

export function changePassword(
  email: string,
  currentHash: string,
  newHash: string
): UserRecord | null {
  const users = readAll();
  const u = users.find(x => x.email === email.toLowerCase());
  if (!u || u.passwordHash !== currentHash) return null;
  u.passwordHash = newHash;
  writeAll(users);
  return u;
}

export function updateEmail(
  currentEmail: string,
  newEmail: string,
  passwordHash: string
): { user: UserRecord; verifyToken: string } | null {
  const users = readAll();
  const u = users.find(x => x.email === currentEmail.toLowerCase());
  if (!u || u.passwordHash !== passwordHash) return null;
  const taken = users.find(x => x.email === newEmail.toLowerCase());
  if (taken) return null;
  const verifyToken = crypto.randomBytes(32).toString('hex');
  u.email = newEmail.toLowerCase().trim();
  u.verified = false;
  u.verifyToken = verifyToken;
  u.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  writeAll(users);
  return { user: u, verifyToken };
}

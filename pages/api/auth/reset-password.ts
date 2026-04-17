import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, resetPasswordByToken } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token, password, newPassword } = req.body ?? {};
  const t = typeof token === 'string' ? token : '';
  const pw = typeof password === 'string' ? password : typeof newPassword === 'string' ? newPassword : '';

  if (!t || !pw) return res.status(400).json({ error: 'Token and password are required.' });
  if (pw.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  const u = resetPasswordByToken(t, hashPassword(pw));
  if (!u) return res.status(400).json({ error: 'Invalid or expired reset link.' });

  return res.status(200).json({ success: true });
}


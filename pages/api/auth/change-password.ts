import type { NextApiRequest, NextApiResponse } from 'next';
import { changePassword, hashPassword } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, currentPassword, newPassword } = req.body || {};
  if (!email || !currentPassword || !newPassword)
    return res.status(400).json({ error: 'All fields are required.' });

  if (newPassword.length < 8)
    return res.status(400).json({ error: 'New password must be at least 8 characters.' });

  const currentHash = hashPassword(currentPassword);
  const newHash = hashPassword(newPassword);
  const result = changePassword(email, currentHash, newHash);

  if (!result) return res.status(401).json({ error: 'Current password is incorrect.' });

  return res.status(200).json({ ok: true });
}

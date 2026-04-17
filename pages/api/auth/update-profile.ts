import type { NextApiRequest, NextApiResponse } from 'next';
import { updateProfile } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName, lastName, phone, recoveryEmail } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  if (recoveryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail.trim()))
    return res.status(400).json({ error: 'Recovery email address is invalid.' });

  const updated = updateProfile(email, { firstName, lastName, phone, recoveryEmail: recoveryEmail || null });
  if (!updated) return res.status(404).json({ error: 'Account not found.' });

  return res.status(200).json({
    firstName: updated.firstName,
    lastName: updated.lastName,
    email: updated.email,
    phone: updated.phone,
    recoveryEmail: updated.recoveryEmail ?? null,
  });
}

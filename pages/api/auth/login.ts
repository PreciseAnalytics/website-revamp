import type { NextApiRequest, NextApiResponse } from 'next';
import { findByEmail, hashPassword } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  const user = findByEmail(email);
  if (!user || user.passwordHash !== hashPassword(password))
    return res.status(401).json({ error: 'Incorrect email or password.' });
  if (!user.verified)
    return res.status(403).json({ error: 'Please verify your email before signing in. Check your inbox for the verification link.' });

  return res.status(200).json({
    success: true,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    recoveryEmail: user.recoveryEmail ?? null,
  });
}

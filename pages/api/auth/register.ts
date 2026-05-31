import type { NextApiRequest, NextApiResponse } from 'next';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { firstName, lastName, email, password } = req.body ?? {};
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ error: 'First name, last name, email, and password are required.' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email address.' });

  try {
    const upstream = await fetch(`${ATS_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error || 'Registration failed.' });
    }

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Register proxy error:', err);
    return res.status(502).json({ error: 'Registration service unavailable.' });
  }
}

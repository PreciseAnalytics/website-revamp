import type { NextApiRequest, NextApiResponse } from 'next';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  try {
    const upstream = await fetch(`${ATS_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error || 'Incorrect email or password.' });
    }

    const u = data.user || {};
    return res.status(200).json({
      success: true,
      firstName: u.firstName || u.first_name || '',
      lastName: u.lastName || u.last_name || '',
      email: u.email || String(email),
      phone: u.phone || '',
    });
  } catch (err) {
    console.error('Login proxy error:', err);
    return res.status(502).json({ error: 'Auth service unavailable.' });
  }
}

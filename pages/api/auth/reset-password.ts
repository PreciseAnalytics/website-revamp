import type { NextApiRequest, NextApiResponse } from 'next';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token, password, newPassword } = req.body ?? {};
  const t = typeof token === 'string' ? token : '';
  const pw = typeof password === 'string' ? password : typeof newPassword === 'string' ? newPassword : '';

  if (!t || !pw) return res.status(400).json({ error: 'Token and password are required.' });
  if (pw.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  try {
    const upstream = await fetch(`${ATS_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: t, password: pw }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error || 'Invalid or expired reset link.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Reset-password proxy error:', err);
    return res.status(502).json({ error: 'Auth service unavailable.' });
  }
}

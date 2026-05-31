import type { NextApiRequest, NextApiResponse } from 'next';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body ?? {};
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    await fetch(`${ATS_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: String(email).trim().toLowerCase() }),
    });
  } catch (err) {
    console.error('Forgot-password proxy error:', err);
  }

  // Always return success to prevent email enumeration
  return res.status(200).json({ success: true });
}

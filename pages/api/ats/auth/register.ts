import type { NextApiRequest, NextApiResponse } from 'next';
import { EnvVars } from 'env';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const upstream = await fetch(`${ATS_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: EnvVars.URL.replace(/\/$/, ''),
      },
      body: JSON.stringify(req.body ?? {}),
    });

    const contentType = upstream.headers.get('content-type') || '';
    const text = await upstream.text();

    if (!contentType.includes('application/json')) {
      return res.status(502).json({
        success: false,
        error: 'Auth service returned non-JSON response',
        status: upstream.status,
      });
    }

    res.setHeader('content-type', 'application/json; charset=utf-8');
    return res.status(upstream.status).send(text);
  } catch (error) {
    console.error('ATS register proxy error:', error);
    return res.status(502).json({ success: false, error: 'Auth service unavailable' });
  }
}

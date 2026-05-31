import type { NextApiRequest, NextApiResponse } from 'next';
import { EnvVars } from 'env';
import { getAtsOrigin } from 'lib/ats';

const ATS_BASE_URL = getAtsOrigin();

async function fetchVerify(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Origin: EnvVars.URL.replace(/\/$/, ''),
    },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const token = typeof req.query.token === 'string' ? req.query.token : '';
  if (!token) {
    return res.status(400).json({ success: false, error: 'Missing token' });
  }

  try {
    const primaryUrl = `${ATS_BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`;
    let upstream = await fetchVerify(primaryUrl);

    if (upstream.status === 404) {
      const fallbackUrl = `${ATS_BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
      upstream = await fetchVerify(fallbackUrl);
    }

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
    console.error('ATS verify proxy error:', error);
    return res.status(502).json({ success: false, error: 'Auth service unavailable' });
  }
}

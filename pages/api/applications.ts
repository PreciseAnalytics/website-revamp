import type { NextApiRequest, NextApiResponse } from 'next';
import { getApplicationsByEmail } from 'lib/applicationsStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required.' });

  const applications = getApplicationsByEmail(email);
  return res.status(200).json({ applications });
}

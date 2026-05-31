import type { NextApiRequest, NextApiResponse } from 'next';
import { withdrawApplication } from 'lib/applicationsStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { applicationId, email } = req.body || {};
  if (!applicationId || !email) {
    return res.status(400).json({ error: 'applicationId and email are required.' });
  }

  const ok = withdrawApplication(String(applicationId), String(email));
  if (!ok) {
    return res.status(400).json({ error: 'Application not found, already withdrawn, or already closed.' });
  }

  return res.status(200).json({ ok: true });
}

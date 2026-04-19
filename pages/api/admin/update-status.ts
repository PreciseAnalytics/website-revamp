import type { NextApiRequest, NextApiResponse } from 'next';
import { updateStatus, ApplicationStatus } from 'lib/applicationsStore';

const VALID: ApplicationStatus[] = ['received', 'under_review', 'interview', 'offer', 'closed'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { id, status } = req.body as { id: string; status: ApplicationStatus };
  if (!id || !VALID.includes(status)) {
    return res.status(400).json({ error: 'Invalid id or status.' });
  }

  updateStatus(id, status);
  return res.status(200).json({ success: true });
}

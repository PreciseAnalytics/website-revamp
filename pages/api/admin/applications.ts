import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllApplications } from 'lib/applicationsStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ applications: getAllApplications() });
  }

  return res.status(405).end();
}

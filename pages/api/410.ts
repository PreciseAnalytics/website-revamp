import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Return 410 Gone - permanently removed
  res.status(410).json({ 
    error: 'This resource has been permanently removed',
    message: 'The requested WordPress resource no longer exists on this Next.js site'
  });
}

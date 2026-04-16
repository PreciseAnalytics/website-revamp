import type { NextApiRequest, NextApiResponse } from 'next';
import { findByVerifyToken, markVerified } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ error: 'Missing token.' });
  }

  const user = findByVerifyToken(token);

  if (!user) {
    return res.status(404).json({ error: 'Invalid or expired verification link.' });
  }

  if (user.verifyTokenExpires && Date.now() > user.verifyTokenExpires) {
    return res.status(410).json({ error: 'This verification link has expired. Please register again.' });
  }

  markVerified(user.id);

  return res.status(200).json({ success: true, name: `${user.firstName} ${user.lastName}`, email: user.email });
}

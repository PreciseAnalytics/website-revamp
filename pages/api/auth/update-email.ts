import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { updateEmail, hashPassword, findByEmail } from 'lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { currentEmail, newEmail, password } = req.body || {};
  if (!currentEmail || !newEmail || !password)
    return res.status(400).json({ error: 'All fields are required.' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim()))
    return res.status(400).json({ error: 'New email address is invalid.' });

  if (currentEmail.toLowerCase() === newEmail.toLowerCase())
    return res.status(400).json({ error: 'New email must be different from your current email.' });

  const existing = findByEmail(newEmail.trim());
  if (existing) return res.status(409).json({ error: 'That email address is already in use.' });

  const passwordHash = hashPassword(password);
  const result = updateEmail(currentEmail, newEmail.trim(), passwordHash);

  if (!result) return res.status(401).json({ error: 'Password is incorrect or account not found.' });

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://preciseanalytics.io'}/api/auth/verify?token=${result.verifyToken}`;

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#111">Verify your new email address</h2>
      <p>Hi ${result.user.firstName},</p>
      <p>You updated your email address on Precise Analytics. Click the button below to verify this new address.</p>
      <a href="${verifyUrl}" style="display:inline-block;margin:1.5rem 0;padding:1rem 2rem;background:rgb(255,125,0);color:#fff;border-radius:0.6rem;text-decoration:none;font-weight:700">
        Verify New Email
      </a>
      <p style="color:#666;font-size:0.9rem">This link expires in 24 hours. If you did not request this change, please contact us immediately at <a href="mailto:support@preciseanalytics.io">support@preciseanalytics.io</a>.</p>
    </div>`;

  try {
    const t = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: { rejectUnauthorized: false },
    });
    await t.sendMail({
      from: process.env.SMTP_USER,
      to: newEmail.trim(),
      subject: 'Verify your new email — Precise Analytics',
      html,
    });
  } catch (err) {
    console.error('Email update verification send error:', err);
  }

  return res.status(200).json({ ok: true, newEmail: result.user.email });
}

import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { findByEmail, createUser, hashPassword } from 'lib/userStore';

const s = (v: string) => (v || '').trim().replace(/<[^>]*>/g, '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ error: 'First name, last name, email, and password are required.' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email address.' });
  if (findByEmail(email))
    return res.status(409).json({ error: 'An account with this email already exists.' });

  const user = createUser(s(firstName), s(lastName), s(email), s(phone || ''), hashPassword(password));

  const host = req.headers.host || 'preciseanalytics.io';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
  const verifyUrl = `${baseUrl}/careers/verify-email?token=${user.verifyToken}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#FF7D00,#FFA500);padding:28px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:24px">Verify Your Email</h1>
        <p style="color:rgba(255,255,255,.9);margin:8px 0 0;font-size:15px">Precise Analytics Careers</p>
      </div>
      <div style="padding:28px 32px;font-size:15px;color:#333;line-height:1.7">
        <p>Hi ${s(firstName)},</p>
        <p>Thank you for creating an account. Click the button below to verify your email and activate your account.</p>
        <div style="text-align:center;margin:30px 0">
          <a href="${verifyUrl}" style="background:linear-gradient(135deg,#FF7D00,#FFA500);color:#fff;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:700;font-size:16px;display:inline-block">Verify My Email</a>
        </div>
        <p style="color:#888;font-size:13px">This link expires in 24 hours. If you did not create this account, ignore this email.</p>
      </div>
      <div style="background:#f8f9fa;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;font-size:12px;color:#888">
        &copy; ${new Date().getFullYear()} Precise Analytics
      </div>
    </div>`;

  try {
    const t = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: { rejectUnauthorized: false },
    });
    await t.sendMail({ from: process.env.SMTP_USER, to: email, subject: 'Verify your email — Precise Analytics', html });
  } catch (err) {
    console.error('Verification email error:', err);
  }

  return res.status(201).json({ success: true });
}

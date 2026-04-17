import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { findByEmail, setResetToken } from 'lib/userStore';

const s = (v: string) => (v || '').trim().replace(/<[^>]*>/g, '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body ?? {};
  const cleanEmail = s(email).toLowerCase();
  if (!cleanEmail) return res.status(400).json({ error: 'Email is required.' });

  const user = findByEmail(cleanEmail);
  if (!user) {
    // Do not reveal whether an account exists.
    return res.status(200).json({ success: true });
  }

  const tokenInfo = setResetToken(cleanEmail);
  if (!tokenInfo) return res.status(200).json({ success: true });

  const host = req.headers.host || 'preciseanalytics.io';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
  const resetUrl = `${baseUrl}/careers/reset-password?token=${tokenInfo.token}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#FF7D00,#FFA500);padding:28px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:24px">Reset Your Password</h1>
        <p style="color:rgba(255,255,255,.9);margin:8px 0 0;font-size:15px">Precise Analytics Careers</p>
      </div>
      <div style="padding:28px 32px;font-size:15px;color:#333;line-height:1.7">
        <p>Hi ${s(user.firstName)},</p>
        <p>We received a request to reset your password. Click the button below to set a new password.</p>
        <div style="text-align:center;margin:30px 0">
          <a href="${resetUrl}" style="background:linear-gradient(135deg,#FF7D00,#FFA500);color:#fff;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:700;font-size:16px;display:inline-block">Reset Password</a>
        </div>
        <p style="color:#888;font-size:13px">This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
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

    await t.sendMail({
      from: process.env.SMTP_USER,
      to: cleanEmail,
      subject: 'Reset your password — Precise Analytics Careers',
      html,
    });
  } catch (err) {
    console.error('Reset email error:', err);
  }

  return res.status(200).json({ success: true });
}


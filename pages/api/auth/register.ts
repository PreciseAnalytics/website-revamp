import type { NextApiRequest, NextApiResponse } from 'next';
import { findByEmail, createUser, hashPassword } from 'lib/userStore';
import { emailHtml, FROM_ADDRESS, smtpTransport } from 'lib/email-html';

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

  const html = emailHtml({
    title: 'Verify Your Email',
    preview: `Hi ${s(firstName)}, verify your email to activate your Precise Analytics account.`,
    body: `
      <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">
        Hi <strong>${s(firstName)}</strong>,
      </p>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.7;">
        Thank you for creating an account. Click the button below to verify your email
        and activate your account so you can apply for open positions.
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#ff8c2b;color:#ffffff;font-size:16px;font-weight:700;
                  padding:14px 36px;border-radius:8px;text-decoration:none;">
          Verify My Email
        </a>
      </div>
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.6;">
        Or copy and paste this link into your browser:
      </p>
      <p style="word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;
                padding:10px 14px;font-size:12px;color:#475569;margin:0 0 22px;">
        ${verifyUrl}
      </p>
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:13px 16px;">
        <p style="margin:0;font-size:13px;color:#9a3412;line-height:1.6;">
          <strong>This link expires in 24 hours.</strong>
          If you did not create this account, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  try {
    await smtpTransport().sendMail({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Verify your email — Precise Analytics',
      html,
    });
  } catch (err) {
    console.error('Verification email error:', err);
  }

  return res.status(201).json({ success: true });
}

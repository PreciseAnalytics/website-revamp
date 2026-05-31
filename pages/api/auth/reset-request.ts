import type { NextApiRequest, NextApiResponse } from 'next';
import { findByEmail, setResetToken } from 'lib/userStore';
import { emailHtml, FROM_ADDRESS, smtpTransport } from 'lib/email-html';

const s = (v: string) => (v || '').trim().replace(/<[^>]*>/g, '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body ?? {};
  const cleanEmail = s(email).toLowerCase();
  if (!cleanEmail) return res.status(400).json({ error: 'Email is required.' });

  const user = findByEmail(cleanEmail);
  if (!user) return res.status(200).json({ success: true });

  const tokenInfo = setResetToken(cleanEmail);
  if (!tokenInfo) return res.status(200).json({ success: true });

  const host = req.headers.host || 'preciseanalytics.io';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
  const resetUrl = `${baseUrl}/careers/reset-password?token=${tokenInfo.token}`;

  const html = emailHtml({
    title: 'Password Reset Request',
    preview: `Hi ${user.firstName}, here is your Precise Analytics password reset link.`,
    body: `
      <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">
        Hi <strong>${s(user.firstName)}</strong>,
      </p>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.7;">
        We received a request to reset your Precise Analytics password.
        Click the button below to set a new one.
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${resetUrl}"
           style="display:inline-block;background:#ff8c2b;color:#ffffff;font-size:16px;font-weight:700;
                  padding:14px 36px;border-radius:8px;text-decoration:none;">
          Reset Password
        </a>
      </div>
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Or paste this link into your browser:</p>
      <p style="word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;
                padding:10px 14px;font-size:12px;color:#475569;margin:0 0 22px;">
        ${resetUrl}
      </p>
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:13px 16px;">
        <p style="margin:0;font-size:13px;color:#9a3412;line-height:1.6;">
          <strong>This link expires in 1 hour.</strong>
          If you did not request a reset, no action is required — your password is unchanged.
        </p>
      </div>
    `,
  });

  try {
    await smtpTransport().sendMail({
      from: FROM_ADDRESS,
      to: cleanEmail,
      subject: 'Reset your password — Precise Analytics Careers',
      html,
    });
  } catch (err) {
    console.error('Reset email error:', err);
  }

  return res.status(200).json({ success: true });
}

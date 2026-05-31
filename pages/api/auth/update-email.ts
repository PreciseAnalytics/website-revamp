import type { NextApiRequest, NextApiResponse } from 'next';
import { updateEmail, hashPassword, findByEmail } from 'lib/userStore';
import { emailHtml, FROM_ADDRESS, smtpTransport } from 'lib/email-html';

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

  const html = emailHtml({
    title: 'Verify New Email Address',
    preview: `Hi ${result.user.firstName}, verify your new email address for Precise Analytics.`,
    body: `
      <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">
        Hi <strong>${result.user.firstName}</strong>,
      </p>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.7;">
        You updated your email address on Precise Analytics. Click the button below to
        verify your new address and complete the change.
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#ff8c2b;color:#ffffff;font-size:16px;font-weight:700;
                  padding:14px 36px;border-radius:8px;text-decoration:none;">
          Verify New Email
        </a>
      </div>
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Or paste this link into your browser:</p>
      <p style="word-break:break-all;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;
                padding:10px 14px;font-size:12px;color:#475569;margin:0 0 22px;">
        ${verifyUrl}
      </p>
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:13px 16px;">
        <p style="margin:0;font-size:13px;color:#9a3412;line-height:1.6;">
          <strong>This link expires in 24 hours.</strong>
          If you did not request this change, contact us immediately at
          <a href="mailto:careers@preciseanalytics.io" style="color:#ff8c2b;">careers@preciseanalytics.io</a>.
        </p>
      </div>
    `,
  });

  try {
    await smtpTransport().sendMail({
      from: FROM_ADDRESS,
      to: newEmail.trim(),
      subject: 'Verify your new email — Precise Analytics',
      html,
    });
  } catch (err) {
    console.error('Email update verification send error:', err);
  }

  return res.status(200).json({ ok: true, newEmail: result.user.email });
}

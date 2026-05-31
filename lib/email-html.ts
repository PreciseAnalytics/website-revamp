// lib/email-html.ts
// Shared email shell for all website-revamp transactional emails (SMTP/nodemailer).

const PA_LOGO = 'https://preciseanalytics.io/Favicon/android-chrome-512x512.png';
const PA_SITE  = 'https://preciseanalytics.io';
const PA_EMAIL = process.env.SMTP_USER || 'careers@preciseanalytics.io';

export const FROM_ADDRESS = `"Precise Analytics Careers" <${PA_EMAIL}>`;

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function emailHtml({
  title,
  preview,
  body,
}: {
  title: string;
  preview: string;
  body: string;
}): string {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} | Precise Analytics</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">

  <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;overflow:hidden;mso-hide:all;">${esc(preview)}</span>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
         style="background:#f1f5f9;padding:36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="max-width:580px;">

          <!-- HEADER -->
          <tr>
            <td style="background:#0f172a;border-radius:12px 12px 0 0;padding:30px 32px 22px;text-align:center;">
              <img src="${PA_LOGO}" alt="Precise Analytics" width="60" height="60"
                   style="display:block;margin:0 auto 14px;width:60px;height:60px;border-radius:10px;object-fit:cover;" />
              <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.01em;margin-bottom:4px;">
                Precise Analytics
              </div>
              <div style="color:#94a3b8;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">
                Data Engineering &amp; AI Solutions
              </div>
            </td>
          </tr>

          <!-- TITLE BAND -->
          <tr>
            <td style="background:#ff8c2b;padding:12px 32px;text-align:center;">
              <div style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
                ${esc(title)}
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:34px 32px;">
              ${body}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;
                       padding:20px 32px 24px;text-align:center;">
              <div style="margin-bottom:9px;">
                <a href="${PA_SITE}" style="color:#ff8c2b;font-size:13px;font-weight:700;text-decoration:none;">preciseanalytics.io</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:careers@preciseanalytics.io"
                   style="color:#64748b;font-size:13px;text-decoration:none;">careers@preciseanalytics.io</a>
              </div>
              <div style="color:#94a3b8;font-size:11px;line-height:1.7;">
                Precise Analytics &bull; Richmond, VA<br />
                &copy; ${year} Precise Analytics. All rights reserved.
              </div>
              <div style="margin-top:9px;color:#cbd5e1;font-size:10px;line-height:1.6;">
                You received this email because an account was created or a password reset was
                requested using this address. If you did not initiate this action, contact us at
                careers@preciseanalytics.io.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function smtpTransport() {
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });
}

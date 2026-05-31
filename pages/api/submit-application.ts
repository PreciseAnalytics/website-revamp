import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import os from 'os';
import { saveApplication } from 'lib/applicationsStore';
import { emailHtml } from 'lib/email-html';

export const config = {
  api: {
    bodyParser: false,
  },
};

function sanitize(s: string): string {
  return (s || '').trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: os.tmpdir(),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
    maxTotalFileSize: 30 * 1024 * 1024,
    multiples: true,
  });

  let fields: formidable.Fields;
  let files: formidable.Files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err: any) {
    const isFileSizeError = err?.code === 1009 || String(err?.message).toLowerCase().includes('maxfilesize');
    return res.status(400).json({
      error: isFileSizeError
        ? 'One or more files exceed the 10 MB limit. Please reduce file size and try again.'
        : `Upload failed: ${err?.message || 'Unknown error'}. If the problem persists, email your application to apply@preciseanalytics.io`,
    });
  }

  const get = (key: string) => {
    const v = fields[key];
    return sanitize(Array.isArray(v) ? v[0] : v || '');
  };

  const firstName   = get('firstName');
  const lastName    = get('lastName');
  const name        = get('name') || `${firstName} ${lastName}`.trim();
  const email       = get('email');
  const phone       = get('phone');
  const linkedinUrl = get('linkedinUrl');
  const portfolioUrl= get('portfolioUrl');
  const address     = get('address');
  const city        = get('city');
  const state       = get('state');
  const zipCode     = get('zipCode');
  const country     = get('country');
  const workAuth    = get('workAuthorized');
  const visaSponsor = get('visaSponsorship');
  const jobTitle    = get('jobTitle');
  const jobNumber   = get('jobNumber');
  const jobId       = get('jobId');
  const coverNote   = get('coverNote');

  if (!name || !email || !jobTitle) {
    return res.status(400).json({ error: 'Name, email, and position are required.' });
  }

  // Build attachments for nodemailer
  const attachments: nodemailer.SendMailOptions['attachments'] = [];
  const fileLabels: string[] = [];

  for (const fieldName of ['resume', 'coverLetter', 'certifications', 'photo']) {
    const fileField = files[fieldName];
    if (fileField) {
      const f = Array.isArray(fileField) ? fileField[0] : fileField;
      if (f && f.size > 0) {
        attachments.push({
          filename: f.originalFilename || fieldName,
          content: fs.readFileSync(f.filepath),
        });
        fileLabels.push(f.originalFilename || fieldName);
      }
    }
  }

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  const detailRow = (label: string, value: string, isLink = false) =>
    value
      ? `<tr>
          <td style="padding:10px 0;color:#64748b;font-size:13px;width:36%;">${label}</td>
          <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">
            ${isLink ? `<a href="${value}" style="color:#ff8c2b;text-decoration:none;">${value}</a>` : value}
          </td>
        </tr>`
      : '';

  // ── HR team notification (sent to apply@preciseanalytics.io) ─────────────
  const teamHtml = emailHtml({
    title: 'New Application',
    preview: `${name} applied for ${jobTitle} (${jobNumber}).`,
    body: `
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.7;">
        A new application has been submitted and is ready for review.
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
             style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;margin:0 0 22px;">
        ${detailRow('Name', name)}
        ${detailRow('Email', `mailto:${email}`, true)}
        ${phone ? detailRow('Phone', phone) : ''}
        ${linkedinUrl ? detailRow('LinkedIn', linkedinUrl, true) : ''}
        ${portfolioUrl ? detailRow('Portfolio', portfolioUrl, true) : ''}
        ${city || state ? detailRow('Location', [city, state, country].filter(Boolean).join(', ')) : ''}
        ${workAuth ? detailRow('Work Auth (US)', workAuth) : ''}
        ${visaSponsor ? detailRow('Visa Sponsorship', visaSponsor) : ''}
        ${detailRow('Position', jobTitle)}
        ${detailRow('Job Number', jobNumber)}
        ${detailRow('Submitted', submittedAt + ' ET')}
        ${detailRow('Attachments', fileLabels.length ? fileLabels.join(', ') : 'None')}
      </table>

      ${coverNote ? `
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748b;">Cover Note</p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #ff8c2b;border-radius:6px;
                  padding:16px 20px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;margin-bottom:24px;">${coverNote}</div>
      ` : ''}

      <div style="text-align:center;margin-top:8px;">
        <a href="mailto:${email}"
           style="display:inline-block;background:#ff8c2b;color:#ffffff;text-decoration:none;
                  border-radius:8px;padding:11px 20px;font-weight:700;font-size:14px;margin-right:10px;">
          &#9993; Reply to Applicant
        </a>
        <a href="https://ats.preciseanalytics.io/"
           style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;
                  border-radius:8px;padding:11px 20px;font-weight:700;font-size:14px;">
          Open ATS Dashboard
        </a>
      </div>
    `,
  });

  // ── Send team notification ─────────────────────────────────────────────────
  // Applicant confirmation is sent by the ATS; this notifies apply@ with attachments.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });

  try {
    const fromAddress = `"Precise Analytics Careers" <${process.env.SMTP_USER}>`;

    await transporter.sendMail({
      from: fromAddress,
      to: 'apply@preciseanalytics.io',
      replyTo: `"${name}" <${email}>`,
      subject: `[New Application] ${jobTitle} (${jobNumber}) — ${name}`,
      html: teamHtml,
      attachments,
    });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again or contact apply@preciseanalytics.io.' });
  } finally {
    // Clean up temp files
    for (const fieldName of ['resume', 'coverLetter', 'certifications', 'photo']) {
      const ff = files[fieldName];
      if (ff) {
        const f = Array.isArray(ff) ? ff[0] : ff;
        try { if (f?.filepath) fs.unlinkSync(f.filepath); } catch {}
      }
    }
  }

  // Persist application record
  saveApplication({
    applicantEmail: email.toLowerCase(),
    applicantName: name,
    phone,
    jobTitle,
    jobNumber,
    jobId: jobId || undefined,
    linkedinUrl: linkedinUrl || undefined,
    portfolioUrl: portfolioUrl || undefined,
    location: [city, state, country].filter(Boolean).join(', ') || undefined,
    workAuthorized: workAuth || undefined,
    visaSponsorship: visaSponsor || undefined,
    submittedAt: new Date().toISOString(),
    hasResume: Boolean(files.resume),
    hasCoverLetter: Boolean(files.coverLetter),
    hasCerts: Boolean(files.certifications),
    hasPhoto: Boolean(files.photo),
  });

  console.log(`Application submitted: ${name} <${email}> for ${jobTitle} (${jobNumber}) at ${submittedAt}`);

  return res.status(200).json({ success: true });
}

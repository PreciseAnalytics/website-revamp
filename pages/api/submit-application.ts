import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import os from 'os';
import { saveApplication } from 'lib/applicationsStore';

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

  const LOGO_URL = 'https://preciseanalytics.io/PA-logo.png';
  const SITE_URL = 'https://preciseanalytics.io';
  const YEAR = new Date().getFullYear();

  // ── helper: two-col info row ──────────────────────────────────────────────
  const row = (label: string, value: string, isLink = false) =>
    `<tr>
      <td style="padding:10px 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;white-space:nowrap;background:#f9fafb;border-bottom:1px solid #f0f0f0;width:160px">${label}</td>
      <td style="padding:10px 16px;font-size:15px;color:#111827;border-bottom:1px solid #f0f0f0">${isLink ? `<a href="${value}" style="color:#FF7D00;text-decoration:none">${value}</a>` : value}</td>
    </tr>`;

  // ── Email to recruiting team ──────────────────────────────────────────────
  const teamHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Application</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%">

        <!-- Logo bar -->
        <tr>
          <td style="padding:0 0 20px;text-align:center">
            <a href="${SITE_URL}" style="text-decoration:none">
              <img src="${LOGO_URL}" alt="Precise Analytics" width="180" style="display:block;margin:0 auto;max-height:56px;width:auto" />
            </a>
          </td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:#111827;border-radius:12px 12px 0 0;padding:32px 40px">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#FF7D00">Talent Acquisition</p>
            <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2">New Job Application</h1>
            <p style="margin:0;font-size:15px;color:#9ca3af">${jobTitle} &nbsp;·&nbsp; <span style="font-family:monospace;color:#d1d5db">${jobNumber}</span></p>
          </td>
        </tr>

        <!-- Applicant summary card -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px">
            <p style="margin:0 0 20px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280">Applicant Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;border-collapse:separate">
              ${row('Name', name)}
              ${row('Email', `mailto:${email}`, true)}
              ${phone ? row('Phone', phone) : ''}
              ${linkedinUrl ? row('LinkedIn', linkedinUrl, true) : ''}
              ${portfolioUrl ? row('Portfolio', portfolioUrl, true) : ''}
              ${city || state ? row('Location', [city, state, country].filter(Boolean).join(', ')) : ''}
              ${workAuth ? row('Work Auth (US)', workAuth) : ''}
              ${visaSponsor ? row('Visa Sponsorship', visaSponsor) : ''}
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="background:#ffffff;padding:0 40px"><hr style="border:none;border-top:1px solid #f0f0f0;margin:0"></td></tr>

        <!-- Position details -->
        <tr>
          <td style="background:#ffffff;padding:24px 40px 32px">
            <p style="margin:0 0 20px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280">Position Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;border-collapse:separate">
              ${row('Position', jobTitle)}
              ${row('Job Number', jobNumber)}
              ${row('Submitted', submittedAt + ' ET')}
              ${row('Attachments', fileLabels.length ? fileLabels.join(', ') : 'None')}
            </table>
          </td>
        </tr>

        ${coverNote ? `
        <!-- Cover note -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 32px">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280">Cover Note</p>
            <div style="background:#fafafa;border:1px solid #e5e7eb;border-left:4px solid #FF7D00;border-radius:6px;padding:20px 24px;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap">${coverNote}</div>
          </td>
        </tr>` : ''}

        <!-- Quick actions -->
        <tr>
          <td style="background:#fffbf5;border-top:1px solid #fed7aa;border-bottom:1px solid #fed7aa;padding:20px 40px">
            <p style="margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#92400e">Quick Actions</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:10px">
                  <a href="mailto:${email}" style="display:inline-block;padding:10px 20px;background:#FF7D00;color:#fff;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;margin-right:10px">&#9993; Reply to Applicant</a>
                  <a href="https://preciseanalytics.io/admin/ats" style="display:inline-block;padding:10px 20px;background:#111827;color:#fff;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;margin-right:10px">&#128196; Internal ATS</a>
                  <a href="https://precise-analytics-ats.vercel.app/" style="display:inline-block;padding:10px 20px;background:#1d4ed8;color:#fff;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px">&#128279; ATS Platform</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111827;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center">
            <p style="margin:0 0 6px;font-size:13px;color:#9ca3af">
              <a href="${SITE_URL}" style="color:#FF7D00;text-decoration:none">preciseanalytics.io</a>
              &nbsp;·&nbsp;
              <a href="mailto:careers@preciseanalytics.io" style="color:#9ca3af;text-decoration:none">careers@preciseanalytics.io</a>
            </p>
            <p style="margin:0;font-size:12px;color:#6b7280">&copy; ${YEAR} Precise Analytics &nbsp;·&nbsp; Richmond, VA</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Acknowledgement to applicant ──────────────────────────────────────────
  const applicantHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application Received</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%">

        <!-- Logo bar -->
        <tr>
          <td style="padding:0 0 20px;text-align:center">
            <a href="${SITE_URL}" style="text-decoration:none">
              <img src="${LOGO_URL}" alt="Precise Analytics" width="180" style="display:block;margin:0 auto;max-height:56px;width:auto" />
            </a>
          </td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:#111827;border-radius:12px 12px 0 0;padding:40px 40px 36px;text-align:center">
            <div style="display:inline-block;width:56px;height:56px;background:rgba(255,125,0,.15);border-radius:50%;line-height:56px;font-size:28px;margin-bottom:16px">&#10003;</div>
            <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#ffffff">Application Received</h1>
            <p style="margin:0;font-size:18px;font-weight:700;color:#FF7D00">Precise Analytics &mdash; Talent Team</p>
          </td>
        </tr>

        <!-- Orange accent bar -->
        <tr><td style="background:#FF7D00;height:4px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 32px">
            <p style="margin:0 0 18px;font-size:16px;color:#111827">Dear <strong>${firstName || name}</strong>,</p>
            <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7">
              Thank you for applying to <strong>Precise Analytics</strong>. We have received your application for the
              <strong style="color:#111827">${jobTitle}</strong> position
              <span style="font-family:monospace;font-size:13px;color:#6b7280">(${jobNumber})</span>
              and our recruiting team is reviewing it.
            </p>

            <!-- Confirmation box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:24px 0">
              <tr>
                <td style="padding:20px 24px">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280">Position Applied For</p>
                  <p style="margin:0;font-size:17px;font-weight:700;color:#111827">${jobTitle}</p>
                  <p style="margin:4px 0 0;font-size:13px;font-family:monospace;color:#6b7280">${jobNumber}</p>
                </td>
                <td style="padding:20px 24px;border-left:1px solid #e5e7eb">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280">Submitted</p>
                  <p style="margin:0;font-size:15px;color:#111827">${submittedAt}</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#6b7280">Eastern Time</p>
                </td>
              </tr>
            </table>

            <!-- What's next -->
            <p style="margin:28px 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0f0f0;vertical-align:top;width:32px">
                  <div style="width:28px;height:28px;background:#fff7ed;border:1.5px solid #fed7aa;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;color:#FF7D00">1</div>
                </td>
                <td style="padding:14px 0 14px 14px;border-top:1px solid #f0f0f0;vertical-align:top">
                  <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827">Application Review</p>
                  <p style="margin:0;font-size:14px;color:#6b7280">Our team reviews every submission within <strong>1–2 business days</strong>.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0f0f0;vertical-align:top">
                  <div style="width:28px;height:28px;background:#fff7ed;border:1.5px solid #fed7aa;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;color:#FF7D00">2</div>
                </td>
                <td style="padding:14px 0 14px 14px;border-top:1px solid #f0f0f0;vertical-align:top">
                  <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827">Recruiter Outreach</p>
                  <p style="margin:0;font-size:14px;color:#6b7280">If your background aligns, a recruiter will reach out within <strong>5–7 business days</strong> to schedule a call.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #f0f0f0;vertical-align:top">
                  <div style="width:28px;height:28px;background:#fff7ed;border:1.5px solid #fed7aa;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;color:#FF7D00">3</div>
                </td>
                <td style="padding:14px 0 14px 14px;border-top:1px solid #f0f0f0;vertical-align:top">
                  <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827">Interview &amp; Offer</p>
                  <p style="margin:0;font-size:14px;color:#6b7280">Qualified candidates are invited for a structured interview and, if selected, receive a formal offer.</p>
                </td>
              </tr>
            </table>

            <p style="margin:28px 0 6px;font-size:15px;color:#374151;line-height:1.7">
              Questions? Email us at
              <a href="mailto:apply@preciseanalytics.io" style="color:#FF7D00;text-decoration:none;font-weight:600">apply@preciseanalytics.io</a>
              and we will get back to you promptly.
            </p>
            <p style="margin:24px 0 0;font-size:15px;color:#374151">
              Best regards,<br>
              <strong style="color:#111827">Precise Analytics Talent Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111827;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center">
            <p style="margin:0 0 8px;font-size:13px;color:#9ca3af">
              <a href="${SITE_URL}" style="color:#FF7D00;text-decoration:none">preciseanalytics.io</a>
              &nbsp;·&nbsp;
              <a href="mailto:careers@preciseanalytics.io" style="color:#9ca3af;text-decoration:none">careers@preciseanalytics.io</a>
            </p>
            <p style="margin:0;font-size:12px;color:#4b5563">This is an automated confirmation &mdash; please do not reply to this message.</p>
            <p style="margin:6px 0 0;font-size:12px;color:#6b7280">&copy; ${YEAR} Precise Analytics &nbsp;·&nbsp; Richmond, VA</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Send emails ────────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });

  try {
    const fromAddress = `"Precise Analytics Careers" <${process.env.SMTP_USER}>`;

    // Notify recruiting team
    await transporter.sendMail({
      from: fromAddress,
      to: 'apply@preciseanalytics.io',
      replyTo: `"${name}" <${email}>`,
      subject: `[New Application] ${jobTitle} (${jobNumber}) — ${name}`,
      html: teamHtml,
      attachments,
    });

    // Acknowledge applicant
    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: `We received your application — ${jobTitle} at Precise Analytics`,
      html: applicantHtml,
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

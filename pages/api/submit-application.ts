import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
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
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5 MB per file
    maxTotalFileSize: 15 * 1024 * 1024,
  });

  let fields: formidable.Fields;
  let files: formidable.Files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to parse form data. Files must be under 5 MB each.' });
  }

  const get = (key: string) => {
    const v = fields[key];
    return sanitize(Array.isArray(v) ? v[0] : v || '');
  };

  const name      = get('name');
  const email     = get('email');
  const phone     = get('phone');
  const jobTitle  = get('jobTitle');
  const jobNumber = get('jobNumber');
  const coverNote = get('coverNote');

  if (!name || !email || !jobTitle) {
    return res.status(400).json({ error: 'Name, email, and position are required.' });
  }

  // Build attachments for nodemailer
  const attachments: nodemailer.SendMailOptions['attachments'] = [];
  const fileLabels: string[] = [];

  for (const fieldName of ['resume', 'coverLetter', 'certifications']) {
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

  // ── Email to recruiting team ──────────────────────────────────────────────
  const teamHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#FF7D00,#FFA500);padding:28px 32px">
        <h1 style="color:#fff;margin:0;font-size:24px">New Job Application</h1>
        <p style="color:rgba(255,255,255,.9);margin:6px 0 0;font-size:15px">${jobTitle} &mdash; ${jobNumber}</p>
      </div>
      <div style="padding:28px 32px">
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:7px 0;font-weight:700;color:#555;width:140px">Name</td><td style="padding:7px 0;color:#222">${name}</td></tr>
          <tr><td style="padding:7px 0;font-weight:700;color:#555">Email</td><td style="padding:7px 0;color:#222"><a href="mailto:${email}" style="color:#FF7D00">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:7px 0;font-weight:700;color:#555">Phone</td><td style="padding:7px 0;color:#222">${phone}</td></tr>` : ''}
          <tr><td style="padding:7px 0;font-weight:700;color:#555">Position</td><td style="padding:7px 0;color:#222">${jobTitle}</td></tr>
          <tr><td style="padding:7px 0;font-weight:700;color:#555">Job #</td><td style="padding:7px 0;color:#222">${jobNumber}</td></tr>
          <tr><td style="padding:7px 0;font-weight:700;color:#555">Submitted</td><td style="padding:7px 0;color:#222">${submittedAt} ET</td></tr>
          <tr><td style="padding:7px 0;font-weight:700;color:#555">Attachments</td><td style="padding:7px 0;color:#222">${fileLabels.length ? fileLabels.join(', ') : 'None'}</td></tr>
        </table>
        ${coverNote ? `
        <div style="margin-top:22px">
          <p style="font-weight:700;color:#555;margin:0 0 8px">Cover Note</p>
          <div style="background:#f8f8f8;border-left:4px solid #FF7D00;padding:16px;border-radius:4px;font-size:15px;color:#333;white-space:pre-wrap">${coverNote}</div>
        </div>` : ''}
      </div>
    </div>`;

  // ── Acknowledgement to applicant ──────────────────────────────────────────
  const applicantHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#FF7D00,#FFA500);padding:28px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:26px">Application Received</h1>
        <p style="color:rgba(255,255,255,.9);margin:8px 0 0;font-size:15px">Precise Analytics Talent Team</p>
      </div>
      <div style="padding:28px 32px;font-size:15px;color:#333;line-height:1.7">
        <p>Dear ${name},</p>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> (${jobNumber}) position at Precise Analytics. We have received your application and our recruiting team will review it promptly.</p>

        <div style="background:#f8f9fa;border-left:4px solid #FF7D00;padding:18px 20px;border-radius:4px;margin:24px 0">
          <p style="margin:0 0 6px;font-weight:700;color:#FF7D00">What happens next?</p>
          <ul style="margin:0;padding-left:20px;color:#444">
            <li style="margin-bottom:6px"><strong>1–2 business days</strong> — Initial review of your application</li>
            <li style="margin-bottom:6px"><strong>5–7 business days</strong> — If your background aligns, our recruiter will reach out to schedule a call</li>
            <li><strong>Interview process</strong> — Qualified candidates will be invited for a structured interview</li>
          </ul>
        </div>

        <p>If you have questions in the meantime, email us at <a href="mailto:apply@preciseanalytics.io" style="color:#FF7D00">apply@preciseanalytics.io</a>.</p>
        <p>We appreciate your interest in Precise Analytics and look forward to learning more about you.</p>
        <p style="margin-top:28px">Best regards,<br><strong>Precise Analytics Talent Team</strong></p>
      </div>
      <div style="background:#f8f9fa;padding:16px 32px;border-top:1px solid #e0e0e0;text-align:center;font-size:12px;color:#888">
        This is an automated confirmation. Please do not reply to this email.<br>
        &copy; ${new Date().getFullYear()} Precise Analytics
      </div>
    </div>`;

  // ── Send emails ────────────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });

  try {
    // Notify recruiting team
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'apply@preciseanalytics.io',
      replyTo: email,
      subject: `New Application: ${jobTitle} (${jobNumber}) — ${name}`,
      html: teamHtml,
      attachments,
    });

    // Acknowledge applicant
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Application Received — ${jobTitle} at Precise Analytics`,
      html: applicantHtml,
    });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again or contact apply@preciseanalytics.io.' });
  } finally {
    // Clean up temp files
    for (const fieldName of ['resume', 'coverLetter', 'certifications']) {
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
    phone: sanitize(get('phone') || ''),
    jobTitle,
    jobNumber,
    submittedAt: new Date().toISOString(),
    hasResume: Boolean(files.resume),
    hasCoverLetter: Boolean(files.coverLetter),
    hasCerts: Boolean(files.certifications),
  });

  console.log(`Application submitted: ${name} <${email}> for ${jobTitle} (${jobNumber}) at ${submittedAt}`);

  return res.status(200).json({ success: true });
}

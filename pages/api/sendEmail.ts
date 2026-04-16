import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { EnvVars } from 'env';

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, description, email, name } = req.body ?? {};
  const referer = req.headers.referer;

  if (!subject?.trim() || !description?.trim() || !name?.trim() || !email?.trim() || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const toAddress = process.env.CONTACT_EMAIL || process.env.SMTP_USER || EnvVars.CONTACT_EMAIL;
  const fromAddress = process.env.SMTP_USER || EnvVars.CONTACT_EMAIL;

  const safeName = escapeHtml(String(name));
  const safeEmail = escapeHtml(String(email));
  const safeSubject = escapeHtml(String(subject));
  const safeDescription = escapeHtml(String(description)).replace(/\n/g, '<br/>');
  const safeReferer = escapeHtml(String(referer || 'Not specified or hidden'));

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: safeSubject,
      text: `${name}\n${email}\n\n${description}\n\nSent from: ${referer || 'Not specified or hidden'}`,
      html: `<div>
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeDescription}</p>
        <p><strong>Sent from:</strong> ${safeReferer}</p>
      </div>`,
      replyTo: email,
    });

    return res.status(204).end();
  } catch (error) {
    console.error('sendEmail error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}

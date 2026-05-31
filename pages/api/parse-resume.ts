import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import os from 'os';
import Anthropic from '@anthropic-ai/sdk';

export const config = { api: { bodyParser: false } };

const PROMPT = `Extract the following fields from this resume and return ONLY a valid JSON object with no markdown, no explanation, no code fences — just raw JSON.

Fields to extract (use null for anything not found):
{
  "firstName": string | null,
  "lastName": string | null,
  "email": string | null,
  "phone": string | null,
  "linkedinUrl": string | null,
  "city": string | null,
  "state": string | null,
  "school": string | null,
  "degree": string | null,
  "fieldOfStudy": string | null,
  "graduationYear": string | null
}

For "degree", normalize to one of: "High School / GED", "Associate's", "Bachelor's", "Master's", "MBA", "PhD / Doctorate", "Professional Degree (JD/MD)", "Bootcamp / Certificate", "Other".
For "graduationYear", return a 4-digit year string (e.g. "2021") for the most recent degree, or null.
For "phone", return just the raw digits and common formatting chars only.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Resume parsing is not configured.' });
  }

  const form = formidable({
    uploadDir: os.tmpdir(),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  let files: formidable.Files;
  try {
    [, files] = await form.parse(req);
  } catch {
    return res.status(400).json({ error: 'File upload failed.' });
  }

  const fileField = files.resume;
  if (!fileField) return res.status(400).json({ error: 'No resume file provided.' });
  const f = Array.isArray(fileField) ? fileField[0] : fileField;
  const ext = (f.originalFilename || '').toLowerCase().split('.').pop() ?? '';

  if (!['pdf', 'doc', 'docx'].includes(ext)) {
    return res.status(400).json({ error: 'Please upload a PDF or Word document.' });
  }

  const fileBytes = fs.readFileSync(f.filepath);
  try { fs.unlinkSync(f.filepath); } catch {}

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    let messageContent: Anthropic.MessageParam['content'];

    if (ext === 'pdf') {
      const base64 = fileBytes.toString('base64');
      messageContent = [
        {
          type: 'document' as const,
          source: { type: 'base64' as const, media_type: 'application/pdf' as const, data: base64 },
        },
        { type: 'text' as const, text: PROMPT },
      ];
    } else {
      // DOC/DOCX: send raw bytes as text best-effort — Claude may still extract content
      const base64 = fileBytes.toString('base64');
      messageContent = [
        { type: 'text' as const, text: `${PROMPT}\n\nThe resume is a Word document encoded in base64 below. Parse what you can:\n${base64.slice(0, 8000)}` },
      ];
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: messageContent }],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text.trim() : '{}';
    const jsonStr = raw.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim();
    const data = JSON.parse(jsonStr);

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Resume parse error:', err);
    return res.status(500).json({ error: 'Could not parse resume. Please fill in the fields manually.' });
  }
}

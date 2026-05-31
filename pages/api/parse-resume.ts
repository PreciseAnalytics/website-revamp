import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import os from 'os';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';

export const config = { api: { bodyParser: false } };

// Update this to the current non-deprecated Gemini model ID from aistudio.google.com
const GEMINI_MODEL = 'gemini-2.5-flash';

const PROMPT = `Extract the following fields from this resume and return ONLY a valid JSON object — no markdown, no explanation, no code fences.

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

Rules:
- "degree": normalize to one of: "High School / GED", "Associate's", "Bachelor's", "Master's", "MBA", "PhD / Doctorate", "Professional Degree (JD/MD)", "Bootcamp / Certificate", "Other"
- "graduationYear": 4-digit string (e.g. "2021") for the most recent degree, or null
- "phone": digits and common formatting chars only
- Use null for any field not found`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.GEMINI_API_KEY) {
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
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    let result;

    if (ext === 'pdf') {
      result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: fileBytes.toString('base64'),
          },
        },
        PROMPT,
      ]);
    } else {
      // DOC/DOCX: extract plain text with mammoth, then send to Gemini
      const { value: docText } = await mammoth.extractRawText({ buffer: fileBytes });
      if (!docText || docText.trim().length < 20) {
        return res.status(422).json({ error: 'Could not read Word document. Please upload a PDF instead.' });
      }
      result = await model.generateContent([
        PROMPT + `\n\nResume text:\n${docText.slice(0, 12000)}`,
      ]);
    }

    const raw = result.response.text().trim();
    const jsonStr = raw.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim();
    const data = JSON.parse(jsonStr);

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Resume parse error:', err?.message || String(err));
    return res.status(500).json({ error: 'Could not parse resume. Please fill in the fields manually.' });
  }
}

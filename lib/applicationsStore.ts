import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export type ApplicationStatus = 'received' | 'under_review' | 'interview' | 'offer' | 'closed';

export interface ApplicationRecord {
  id: string;
  applicantEmail: string;
  applicantName: string;
  phone: string;
  jobTitle: string;
  jobNumber: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  workAuthorized?: string;
  visaSponsorship?: string;
  submittedAt: string; // ISO
  status: ApplicationStatus;
  statusUpdatedAt: string; // ISO
  hasResume: boolean;
  hasCoverLetter: boolean;
  hasCerts: boolean;
  hasPhoto: boolean;
}

function storePath(): string {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'applications.json');
}

function readAll(): ApplicationRecord[] {
  try { return JSON.parse(fs.readFileSync(storePath(), 'utf8')); } catch { return []; }
}

function writeAll(records: ApplicationRecord[]): void {
  fs.writeFileSync(storePath(), JSON.stringify(records, null, 2), 'utf8');
}

export function saveApplication(data: Omit<ApplicationRecord, 'id' | 'status' | 'statusUpdatedAt'>): ApplicationRecord {
  const records = readAll();
  const now = new Date().toISOString();
  const record: ApplicationRecord = {
    ...data,
    id: crypto.randomUUID(),
    status: 'received',
    statusUpdatedAt: now,
  };
  records.push(record);
  writeAll(records);
  return record;
}

export function getAllApplications(): ApplicationRecord[] {
  return readAll().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function getApplicationsByEmail(email: string): ApplicationRecord[] {
  return readAll()
    .filter(r => r.applicantEmail === email.toLowerCase())
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function updateStatus(id: string, status: ApplicationStatus): void {
  const records = readAll();
  const r = records.find(r => r.id === id);
  if (r) {
    r.status = status;
    r.statusUpdatedAt = new Date().toISOString();
    writeAll(records);
  }
}

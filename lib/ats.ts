import { Job, getJobById } from './jobsData';

const DEFAULT_ATS_ORIGIN = 'https://ats.preciseanalytics.io';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getAtsOrigin() {
  const configured =
    process.env.ATS_API_URL ||
    process.env.NEXT_PUBLIC_ATS_API_URL ||
    DEFAULT_ATS_ORIGIN;

  return trimTrailingSlash(configured).replace(/\/api$/, '');
}

export function getAtsApiBaseUrl() {
  return `${getAtsOrigin()}/api`;
}

function splitLines(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value !== 'string') return [];

  return value
    .split(/\r?\n+/)
    .map((line) => line.replace(/^[-*•\s]+/, '').trim())
    .filter(Boolean);
}

function normalizeEmploymentType(value: unknown) {
  return String(value || 'full_time').toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
}

function labelize(value: unknown, fallback: string) {
  return String(value || fallback)
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeAtsJob(raw: any): Job {
  const id = String(raw.id);
  const employmentType = normalizeEmploymentType(raw.employment_type || raw.type);
  const requirements = splitLines(raw.requirements);
  const benefits = splitLines(raw.benefits);

  return {
    id,
    jobNumber: raw.job_number || `PA-${id.slice(0, 6).toUpperCase()}`,
    title: raw.title || 'Open Position',
    department: String(raw.department || 'general').toLowerCase().replace(/\s+/g, '-'),
    departmentLabel: raw.department || 'General',
    location: String(raw.location || 'remote').toLowerCase().replace(/\s+/g, '-'),
    locationLabel: raw.location || 'Remote',
    employmentType,
    employmentTypeLabel: labelize(raw.employment_type || raw.type, 'Full Time'),
    postedDate: raw.created_at || raw.posted_at || new Date().toISOString(),
    salaryRange: raw.salary_range || undefined,
    clearanceLevel: raw.clearance_level || undefined,
    summary: raw.summary || raw.description || `${raw.title || 'This role'} at Precise Analytics.`,
    description: raw.description || '',
    responsibilities: splitLines(raw.responsibilities),
    requirements:
      requirements.length > 0
        ? requirements
        : ['Please refer to the job description above for requirements and qualifications.'],
    preferredQualifications: splitLines(raw.preferred_qualifications),
    benefits,
    status: raw.status === 'closed' || raw.status === 'archived' || raw.status === 'deactivated' ? 'closed' : 'open',
  };
}

export async function fetchPublishedAtsJobs(): Promise<Job[]> {
  const serviceToken = process.env.ATS_SERVICE_TOKEN;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (serviceToken) headers['Authorization'] = `Bearer ${serviceToken}`;

  const response = await fetch(`${getAtsApiBaseUrl()}/jobs`, { headers });
  if (!response.ok) throw new Error(`ATS jobs API returned ${response.status}`);

  const data = await response.json();
  const rawJobs = data.success && Array.isArray(data.jobs) ? data.jobs : Array.isArray(data) ? data : [];
  const activeStatuses = new Set(['published', 'active', 'posted']);

  return rawJobs
    .filter((job: any) => activeStatuses.has(String(job.status).toLowerCase()) || job.posted === true)
    .map(normalizeAtsJob);
}

export async function fetchAtsJobById(id: string): Promise<Job | null> {
  const response = await fetch(`${getAtsApiBaseUrl()}/jobs/${encodeURIComponent(id)}`);
  if (!response.ok) return null;

  const data = await response.json();
  const rawJob = data.job || data;
  return rawJob && rawJob.id ? normalizeAtsJob(rawJob) : null;
}

export function getOpenLocalAiTrainingJobs(): Job[] {
  const aiTrainingJobs = [
    'ai-annotation-specialist-001',
    'rlhf-specialist-001',
    'ai-generalist-trainer-001',
    'creative-writing-ai-trainer-001',
    'stem-ai-trainer-001',
    'legal-medical-ai-trainer-001',
  ];

  return aiTrainingJobs
    .map((id) => getJobById(id))
    .filter((job): job is Job => Boolean(job && job.status === 'open'));
}

export async function fetchWebsiteJobs(): Promise<Job[]> {
  const localAiTrainingJobs = getOpenLocalAiTrainingJobs();

  try {
    const atsJobs = await fetchPublishedAtsJobs();
    const atsTitles = new Set(atsJobs.map((job) => job.title.toLowerCase()));
    return [
      ...localAiTrainingJobs.filter((job) => !atsTitles.has(job.title.toLowerCase())),
      ...atsJobs,
    ];
  } catch (error) {
    console.error('Failed to fetch jobs from ATS:', error);
    return localAiTrainingJobs;
  }
}

export async function fetchWebsiteJobById(id: string): Promise<Job | null> {
  try {
    const atsJob = await fetchAtsJobById(id);
    if (atsJob) return atsJob;
  } catch (error) {
    console.error('Failed to fetch job from ATS:', error);
  }

  const localJob = getJobById(id);
  return localJob && localJob.status === 'open' ? localJob : null;
}

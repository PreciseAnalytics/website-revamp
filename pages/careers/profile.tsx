import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';
import { getAtsApiBaseUrl } from 'lib/ats';

const ATS_API = getAtsApiBaseUrl();

type NavSection = 'overview' | 'personal' | 'work' | 'education' | 'documents' | 'applications' | 'account';

const NAV_ITEMS: { id: NavSection; label: string; icon: string }[] = [
  { id: 'overview',      label: 'Overview',          icon: '⊞' },
  { id: 'personal',      label: 'Personal Info',     icon: '👤' },
  { id: 'work',          label: 'Work History',       icon: '💼' },
  { id: 'education',     label: 'Education',          icon: '🎓' },
  { id: 'documents',     label: 'Documents',          icon: '📎' },
  { id: 'applications',  label: 'My Applications',   icon: '📋' },
  { id: 'account',       label: 'Account',            icon: '🔒' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  received:     { label: 'Received',     color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  under_review: { label: 'Under Review', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  interview:    { label: 'Interview',    color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  offer:        { label: 'Offer',        color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  hired:        { label: 'Hired',        color: '#15803d', bg: 'rgba(21,128,61,0.12)' },
  applied:      { label: 'Applied',      color: '#0369a1', bg: 'rgba(3,105,161,0.1)' },
  closed:       { label: 'Closed',       color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
  withdrawn:    { label: 'Withdrawn',    color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
};

const DEGREE_OPTIONS = [
  "High School / GED", "Associate's", "Bachelor's", "Master's",
  "MBA", "PhD / Doctorate", "Professional Degree (JD/MD)", "Bootcamp / Certificate", "Other",
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming','Washington D.C.',
];

type CertEntry = {
  id: string;
  label: string;
  url: string;
  filename: string;
  uploadedAt: string;
};

type ParsedResume = {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  linkedinUrl?: string | null;
  school?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  graduationYear?: string | null;
};

type WorkEntry = {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
};

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  stateRegion: string;
  country: string;
  linkedinUrl: string;
  portfolioUrl: string;
  headline: string;
  workHistory: WorkEntry[];
  educationHistory: EducationEntry[];
  resumeUrl: string;
  coverLetterUrl: string;
  certifications: CertEntry[];
};

type Application = {
  id: string;
  status: string;
  position_applying_for: string;
  position_applied: string;
  job_title: string;
  job_department: string;
  submission_date: string;
  applied_at: string;
  created_at: string;
  resume_url: string;
  cover_letter_url: string;
  linkedin_url: string;
  portfolio_url: string;
};

function fmtDate(iso?: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function fmtMonthYear(ym?: string) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m) - 1]} ${y}` : y;
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();
  const [section, setSection] = useState<NavSection>('overview');

  // Profile state
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);

  // Personal info editing
  const [personalDraft, setPersonalDraft] = useState<Partial<ProfileData>>({});
  const [personalSaving, setPersonalSaving] = useState(false);
  const [personalMsg, setPersonalMsg] = useState('');

  // Work history
  const [workDraft, setWorkDraft] = useState<WorkEntry[]>([]);
  const [editingWork, setEditingWork] = useState<WorkEntry | null>(null);
  const [addingWork, setAddingWork] = useState(false);
  const [workSaving, setWorkSaving] = useState(false);
  const [workMsg, setWorkMsg] = useState('');

  // Education
  const [eduDraft, setEduDraft] = useState<EducationEntry[]>([]);
  const [editingEdu, setEditingEdu] = useState<EducationEntry | null>(null);
  const [addingEdu, setAddingEdu] = useState(false);
  const [eduSaving, setEduSaving] = useState(false);
  const [eduMsg, setEduMsg] = useState('');

  // Documents
  const [docMsg, setDocMsg] = useState('');
  const [resumeUploading, setResumeUploading] = useState(false);
  const [coverLetterUploading, setCoverLetterUploading] = useState(false);
  const [certUploading, setCertUploading] = useState(false);
  const [newCertLabel, setNewCertLabel] = useState('');
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [parsedApplied, setParsedApplied] = useState<Set<string>>(new Set());

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  // Account / password
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');

  useEffect(() => {
    if (!user) { router.replace('/careers'); return; }
    fetchProfile();
    fetchApplications();
  }, [user]);

  const fetchProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const res = await fetch(`${ATS_API}/applicant/profile`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && data.profile) {
        const p: ProfileData = {
          firstName: data.profile.first_name || '',
          lastName: data.profile.last_name || '',
          email: data.profile.email || user?.email || '',
          phone: data.profile.phone || '',
          city: data.profile.city || '',
          stateRegion: data.profile.state_region || '',
          country: data.profile.country || 'United States',
          linkedinUrl: data.profile.linkedin_url || '',
          portfolioUrl: data.profile.portfolio_url || '',
          headline: data.profile.headline || '',
          workHistory: Array.isArray(data.profile.work_history) ? data.profile.work_history : [],
          educationHistory: Array.isArray(data.profile.education_history) ? data.profile.education_history : [],
          resumeUrl: data.profile.resume_url || '',
          coverLetterUrl: data.profile.cover_letter_url || '',
          certifications: Array.isArray(data.profile.certifications) ? data.profile.certifications : [],
        };
        setProfile(p);
        setPersonalDraft(p);
        setWorkDraft(p.workHistory);
        setEduDraft(p.educationHistory);
      }
    } catch {
      setProfileError('Could not load profile. Please refresh.');
    } finally {
      setProfileLoading(false);
    }
  }, [user]);

  const fetchApplications = useCallback(async () => {
    setAppsLoading(true);
    try {
      const res = await fetch(`${ATS_API}/applicant/applications`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setApplications(data.applications || []);
    } catch {
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  }, []);

  async function savePersonal() {
    if (!profile) return;
    setPersonalSaving(true);
    setPersonalMsg('');
    try {
      const res = await fetch(`${ATS_API}/applicant/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          first_name: personalDraft.firstName,
          last_name: personalDraft.lastName,
          phone: personalDraft.phone,
          city: personalDraft.city,
          state_region: personalDraft.stateRegion,
          country: personalDraft.country,
          linkedin_url: personalDraft.linkedinUrl,
          portfolio_url: personalDraft.portfolioUrl,
          headline: personalDraft.headline,
          work_history: workDraft,
          education_history: eduDraft,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, ...personalDraft } as ProfileData);
        updateUser({ firstName: personalDraft.firstName || user?.firstName || '', lastName: personalDraft.lastName || user?.lastName || '', phone: personalDraft.phone || '' });
        setPersonalMsg('✓ Changes saved');
        setTimeout(() => setPersonalMsg(''), 3000);
      } else {
        setPersonalMsg(data.error || 'Failed to save');
      }
    } catch {
      setPersonalMsg('Network error — please try again');
    } finally {
      setPersonalSaving(false);
    }
  }

  async function saveWork(entries: WorkEntry[]) {
    setWorkSaving(true);
    setWorkMsg('');
    try {
      const res = await fetch(`${ATS_API}/applicant/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          first_name: profile?.firstName || user?.firstName,
          last_name: profile?.lastName || user?.lastName,
          phone: profile?.phone,
          city: profile?.city,
          state_region: profile?.stateRegion,
          country: profile?.country,
          linkedin_url: profile?.linkedinUrl,
          portfolio_url: profile?.portfolioUrl,
          headline: profile?.headline,
          work_history: entries,
          education_history: eduDraft,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkDraft(entries);
        if (profile) setProfile({ ...profile, workHistory: entries });
        setWorkMsg('✓ Work history saved');
        setTimeout(() => setWorkMsg(''), 3000);
      } else {
        setWorkMsg(data.error || 'Failed to save');
      }
    } catch {
      setWorkMsg('Network error — please try again');
    } finally {
      setWorkSaving(false);
    }
  }

  async function saveEducation(entries: EducationEntry[]) {
    setEduSaving(true);
    setEduMsg('');
    try {
      const res = await fetch(`${ATS_API}/applicant/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          first_name: profile?.firstName || user?.firstName,
          last_name: profile?.lastName || user?.lastName,
          phone: profile?.phone,
          city: profile?.city,
          state_region: profile?.stateRegion,
          country: profile?.country,
          linkedin_url: profile?.linkedinUrl,
          portfolio_url: profile?.portfolioUrl,
          headline: profile?.headline,
          work_history: workDraft,
          education_history: entries,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEduDraft(entries);
        if (profile) setProfile({ ...profile, educationHistory: entries });
        setEduMsg('✓ Education saved');
        setTimeout(() => setEduMsg(''), 3000);
      } else {
        setEduMsg(data.error || 'Failed to save');
      }
    } catch {
      setEduMsg('Network error — please try again');
    } finally {
      setEduSaving(false);
    }
  }

  async function changePassword() {
    setPwSaving(true);
    setPwMsg('');
    try {
      const res = await fetch(`${ATS_API}/applicant/profile/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw, confirmPassword: confirmPw }),
      });
      const data = await res.json();
      if (data.success) {
        setPwMsg('✓ Password updated successfully');
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
        setTimeout(() => setPwMsg(''), 4000);
      } else {
        setPwMsg(data.error || 'Failed to update password');
      }
    } catch {
      setPwMsg('Network error — please try again');
    } finally {
      setPwSaving(false);
    }
  }

  async function uploadToATS(file: File, type: string): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', type);
    const res = await fetch(`${ATS_API}/upload`, { method: 'POST', body: fd });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Upload failed (${res.status})`);
    }
    const data = await res.json();
    if (!data.success || !data.url) throw new Error(data.error || 'Upload failed');
    return data.url as string;
  }

  async function saveDocUrls(updates: { resumeUrl?: string; coverLetterUrl?: string; certifications?: CertEntry[] }) {
    if (!profile) return;
    const merged = { ...profile, ...updates };
    try {
      await fetch(`${ATS_API}/applicant/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          first_name: merged.firstName,
          last_name: merged.lastName,
          phone: merged.phone,
          city: merged.city,
          state_region: merged.stateRegion,
          country: merged.country,
          linkedin_url: merged.linkedinUrl,
          portfolio_url: merged.portfolioUrl,
          headline: merged.headline,
          work_history: workDraft,
          education_history: eduDraft,
          resume_url: merged.resumeUrl,
          cover_letter_url: merged.coverLetterUrl,
          certifications: merged.certifications,
        }),
      });
      setProfile(merged);
    } catch {}
  }

  async function handleResumeUpload(file: File) {
    setResumeUploading(true);
    setDocMsg('');
    try {
      const url = await uploadToATS(file, 'resume');
      await saveDocUrls({ resumeUrl: url });

      const fd = new FormData();
      fd.append('resume', file);
      const parseRes = await fetch('/api/parse-resume', { method: 'POST', body: fd });
      const parseData = await parseRes.json();

      if (parseData.success && parseData.data) {
        const d = parseData.data;
        const found: ParsedResume = {};
        if (d.firstName) found.firstName = d.firstName;
        if (d.lastName) found.lastName = d.lastName;
        if (d.phone) found.phone = d.phone;
        if (d.city) found.city = d.city;
        if (d.state) found.state = d.state;
        if (d.linkedinUrl) found.linkedinUrl = d.linkedinUrl;
        if (d.school) found.school = d.school;
        if (d.degree) found.degree = d.degree;
        if (d.fieldOfStudy) found.fieldOfStudy = d.fieldOfStudy;
        if (d.graduationYear) found.graduationYear = d.graduationYear;
        if (Object.keys(found).length > 0) {
          setParsedResume(found);
          setParsedApplied(new Set(Object.keys(found)));
        }
      }
      setDocMsg('✓ Resume uploaded');
    } catch (err: any) {
      setDocMsg(err.message || 'Upload failed');
    } finally {
      setResumeUploading(false);
    }
  }

  async function handleCoverLetterUpload(file: File) {
    setCoverLetterUploading(true);
    setDocMsg('');
    try {
      const url = await uploadToATS(file, 'cover_letter');
      await saveDocUrls({ coverLetterUrl: url });
      setDocMsg('✓ Cover letter uploaded');
    } catch (err: any) {
      setDocMsg(err.message || 'Upload failed');
    } finally {
      setCoverLetterUploading(false);
    }
  }

  async function handleCertUpload(file: File, label: string) {
    setCertUploading(true);
    setDocMsg('');
    try {
      const url = await uploadToATS(file, 'certification');
      const newCert: CertEntry = {
        id: genId(),
        label: label.trim() || file.name.replace(/\.[^.]+$/, ''),
        url,
        filename: file.name,
        uploadedAt: new Date().toISOString(),
      };
      const updated = [...(profile?.certifications || []), newCert];
      await saveDocUrls({ certifications: updated });
      setNewCertLabel('');
      setDocMsg('✓ Document uploaded');
    } catch (err: any) {
      setDocMsg(err.message || 'Upload failed');
    } finally {
      setCertUploading(false);
    }
  }

  function applyParsedResume() {
    if (!parsedResume || !profile) return;
    const draft: Partial<ProfileData> = {};
    if (parsedApplied.has('firstName') && parsedResume.firstName) draft.firstName = parsedResume.firstName;
    if (parsedApplied.has('lastName') && parsedResume.lastName) draft.lastName = parsedResume.lastName;
    if (parsedApplied.has('phone') && parsedResume.phone) draft.phone = parsedResume.phone;
    if (parsedApplied.has('city') && parsedResume.city) draft.city = parsedResume.city;
    if (parsedApplied.has('state') && parsedResume.state) draft.stateRegion = parsedResume.state;
    if (parsedApplied.has('linkedinUrl') && parsedResume.linkedinUrl) draft.linkedinUrl = parsedResume.linkedinUrl;

    const hasEduFields = parsedResume.school && (parsedApplied.has('school') || parsedApplied.has('degree'));
    if (hasEduFields) {
      const newEdu: EducationEntry = {
        id: genId(),
        school: parsedResume.school || '',
        degree: parsedApplied.has('degree') ? (parsedResume.degree || '') : '',
        fieldOfStudy: parsedApplied.has('fieldOfStudy') ? (parsedResume.fieldOfStudy || '') : '',
        graduationYear: parsedApplied.has('graduationYear') ? (parsedResume.graduationYear || '') : '',
      };
      const alreadyExists = eduDraft.some(e => e.school.toLowerCase().trim() === newEdu.school.toLowerCase().trim());
      if (!alreadyExists) {
        const newEduDraft = [...eduDraft, newEdu];
        setEduDraft(newEduDraft);
        saveEducation(newEduDraft);
      }
    }

    setPersonalDraft(d => ({ ...d, ...draft }));
    setProfile(p => p ? { ...p, ...draft } : p);
    setParsedResume(null);
    if (Object.keys(draft).length > 0) {
      setPersonalMsg('Fields applied — click Save Changes to confirm');
      setTimeout(() => setPersonalMsg(''), 5000);
      setSection('personal');
    }
  }

  if (!user) return null;

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  const activeApps = applications.filter(a => !['withdrawn', 'closed'].includes(a.status));
  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : `${user.firstName} ${user.lastName}`;

  function completionPct() {
    if (!profile) return 0;
    const fields = [profile.headline, profile.phone, profile.city, profile.linkedinUrl, profile.workHistory.length > 0, profile.educationHistory.length > 0, !!profile.resumeUrl];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }

  return (
    <>
      <Head>
        <title>My Profile — Precise Analytics Careers</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <Layout>
            {/* ── Sidebar ── */}
            <Sidebar>
              <SidebarProfile>
                <AvatarRing>
                  <Avatar>{initials}</Avatar>
                </AvatarRing>
                <SidebarName>{displayName}</SidebarName>
                {profile?.headline && <SidebarHeadline>{profile.headline}</SidebarHeadline>}
                <SidebarEmail>{user.email}</SidebarEmail>

                <CompletionWrap>
                  <CompletionLabel>Profile {completionPct()}% complete</CompletionLabel>
                  <CompletionBar>
                    <CompletionFill $pct={completionPct()} />
                  </CompletionBar>
                </CompletionWrap>
              </SidebarProfile>

              <Nav>
                {NAV_ITEMS.map(item => (
                  <NavItem
                    key={item.id}
                    $active={section === item.id}
                    onClick={() => setSection(item.id)}
                  >
                    <NavIcon>{item.icon}</NavIcon>
                    {item.label}
                    {item.id === 'applications' && activeApps.length > 0 && (
                      <NavBadge>{activeApps.length}</NavBadge>
                    )}
                  </NavItem>
                ))}
              </Nav>

              <SidebarFooter>
                <SidebarLink href="/careers">← All Positions</SidebarLink>
                <SidebarSignOut onClick={() => { logout(); router.push('/careers'); }}>
                  Sign Out
                </SidebarSignOut>
              </SidebarFooter>
            </Sidebar>

            {/* ── Content ── */}
            <Content>
              <AnimatePresence mode="wait">
                <ContentPanel
                  key={section}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ── OVERVIEW ── */}
                  {section === 'overview' && (
                    <>
                      <PanelTitle>Overview</PanelTitle>
                      {profileLoading ? <LoadingText>Loading…</LoadingText> : (
                        <>
                          <StatsRow>
                            <StatCard>
                              <StatNum>{applications.length}</StatNum>
                              <StatLabel>Total Applications</StatLabel>
                            </StatCard>
                            <StatCard>
                              <StatNum>{activeApps.length}</StatNum>
                              <StatLabel>Active</StatLabel>
                            </StatCard>
                            <StatCard>
                              <StatNum>{workDraft.length}</StatNum>
                              <StatLabel>Work Entries</StatLabel>
                            </StatCard>
                            <StatCard>
                              <StatNum>{eduDraft.length}</StatNum>
                              <StatLabel>Education Entries</StatLabel>
                            </StatCard>
                          </StatsRow>

                          {completionPct() < 100 && (
                            <ProfileTip>
                              <TipTitle>Complete your profile</TipTitle>
                              <TipText>A complete profile helps our recruiting team get to know you better. Add your {!profile?.headline && 'headline, '}{!profile?.phone && 'phone number, '}{workDraft.length === 0 && 'work history, '}{eduDraft.length === 0 && 'education.'}
                              </TipText>
                            </ProfileTip>
                          )}

                          {applications.length > 0 && (
                            <>
                              <SubSectionTitle>Recent Applications</SubSectionTitle>
                              {applications.slice(0, 3).map(app => {
                                const s = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;
                                return (
                                  <AppRow key={app.id}>
                                    <AppRowTitle>{app.job_title || app.position_applying_for}</AppRowTitle>
                                    <AppRowMeta>{fmtDate(app.submission_date || app.applied_at || app.created_at)}</AppRowMeta>
                                    <StatusBadge $color={s.color} $bg={s.bg}>{s.label}</StatusBadge>
                                  </AppRow>
                                );
                              })}
                              {applications.length > 3 && (
                                <ViewAllBtn type="button" onClick={() => setSection('applications')}>
                                  View all {applications.length} applications →
                                </ViewAllBtn>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* ── PERSONAL INFO ── */}
                  {section === 'personal' && (
                    <>
                      <PanelTitle>Personal Information</PanelTitle>
                      <FieldGrid>
                        <FieldGroup>
                          <FieldLabel>First Name</FieldLabel>
                          <FieldInput
                            value={personalDraft.firstName || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, firstName: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>Last Name</FieldLabel>
                          <FieldInput
                            value={personalDraft.lastName || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, lastName: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup $full>
                          <FieldLabel>Professional Headline</FieldLabel>
                          <FieldInput
                            placeholder="e.g. Data Engineer | Python | AWS"
                            value={personalDraft.headline || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, headline: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>Email</FieldLabel>
                          <FieldInput value={user.email} disabled />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>Phone</FieldLabel>
                          <FieldInput
                            placeholder="(555) 555-5555"
                            value={personalDraft.phone || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, phone: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>City</FieldLabel>
                          <FieldInput
                            placeholder="Richmond"
                            value={personalDraft.city || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, city: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>State</FieldLabel>
                          <FieldSelect
                            value={personalDraft.stateRegion || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, stateRegion: e.target.value }))}
                          >
                            <option value="">— Select —</option>
                            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </FieldSelect>
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>Country</FieldLabel>
                          <FieldInput
                            value={personalDraft.country || 'United States'}
                            onChange={e => setPersonalDraft(d => ({ ...d, country: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup $full>
                          <FieldLabel>LinkedIn URL</FieldLabel>
                          <FieldInput
                            placeholder="https://linkedin.com/in/yourname"
                            value={personalDraft.linkedinUrl || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, linkedinUrl: e.target.value }))}
                          />
                        </FieldGroup>
                        <FieldGroup $full>
                          <FieldLabel>Portfolio / Website</FieldLabel>
                          <FieldInput
                            placeholder="https://yourportfolio.com"
                            value={personalDraft.portfolioUrl || ''}
                            onChange={e => setPersonalDraft(d => ({ ...d, portfolioUrl: e.target.value }))}
                          />
                        </FieldGroup>
                      </FieldGrid>
                      <SaveRow>
                        {personalMsg && <SaveMsg $ok={personalMsg.startsWith('✓')}>{personalMsg}</SaveMsg>}
                        <SaveBtn onClick={savePersonal} disabled={personalSaving}>
                          {personalSaving ? 'Saving…' : 'Save Changes'}
                        </SaveBtn>
                      </SaveRow>
                    </>
                  )}

                  {/* ── WORK HISTORY ── */}
                  {section === 'work' && (
                    <>
                      <PanelTitleRow>
                        <PanelTitle>Work History</PanelTitle>
                        <AddBtn type="button" onClick={() => { setAddingWork(true); setEditingWork({ id: genId(), company: '', title: '', startDate: '', endDate: '', current: false, description: '' }); }}>
                          + Add Position
                        </AddBtn>
                      </PanelTitleRow>

                      {(addingWork || editingWork) && editingWork && (
                        <EntryForm>
                          <FieldGrid>
                            <FieldGroup>
                              <FieldLabel>Company</FieldLabel>
                              <FieldInput value={editingWork.company} onChange={e => setEditingWork(w => w && ({ ...w, company: e.target.value }))} placeholder="Acme Corp" />
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>Job Title</FieldLabel>
                              <FieldInput value={editingWork.title} onChange={e => setEditingWork(w => w && ({ ...w, title: e.target.value }))} placeholder="Senior Data Engineer" />
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>Start Date</FieldLabel>
                              <FieldInput type="month" value={editingWork.startDate} onChange={e => setEditingWork(w => w && ({ ...w, startDate: e.target.value }))} />
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>End Date</FieldLabel>
                              <FieldInput type="month" value={editingWork.endDate} disabled={editingWork.current} onChange={e => setEditingWork(w => w && ({ ...w, endDate: e.target.value }))} />
                              <CheckRow>
                                <input type="checkbox" id="current-job" checked={editingWork.current} onChange={e => setEditingWork(w => w && ({ ...w, current: e.target.checked, endDate: '' }))} />
                                <label htmlFor="current-job" style={{ fontSize: '1.3rem', color: '#64748b' }}>I currently work here</label>
                              </CheckRow>
                            </FieldGroup>
                            <FieldGroup $full>
                              <FieldLabel>Description <Optional>(optional)</Optional></FieldLabel>
                              <FieldTextarea rows={3} value={editingWork.description} onChange={e => setEditingWork(w => w && ({ ...w, description: e.target.value }))} placeholder="Key responsibilities or achievements…" />
                            </FieldGroup>
                          </FieldGrid>
                          <EntryFormActions>
                            <SaveBtn type="button" onClick={() => {
                              if (!editingWork.company || !editingWork.title) return;
                              const updated = addingWork
                                ? [...workDraft, editingWork]
                                : workDraft.map(w => w.id === editingWork.id ? editingWork : w);
                              setWorkDraft(updated);
                              saveWork(updated);
                              setEditingWork(null);
                              setAddingWork(false);
                            }}>Save Position</SaveBtn>
                            <CancelBtn type="button" onClick={() => { setEditingWork(null); setAddingWork(false); }}>Cancel</CancelBtn>
                          </EntryFormActions>
                        </EntryForm>
                      )}

                      {workDraft.length === 0 && !addingWork ? (
                        <EmptySection>
                          <EmptyIcon>💼</EmptyIcon>
                          <EmptyText>No work history added yet. Click &quot;+ Add Position&quot; to get started.</EmptyText>
                        </EmptySection>
                      ) : (
                        workDraft.map(entry => (
                          <EntryCard key={entry.id}>
                            <EntryCardMain>
                              <EntryTitle>{entry.title}</EntryTitle>
                              <EntryCompany>{entry.company}</EntryCompany>
                              <EntryDates>
                                {fmtMonthYear(entry.startDate)} — {entry.current ? 'Present' : fmtMonthYear(entry.endDate)}
                              </EntryDates>
                              {entry.description && <EntryDesc>{entry.description}</EntryDesc>}
                            </EntryCardMain>
                            <EntryActions>
                              <EntryEditBtn type="button" onClick={() => { setEditingWork(entry); setAddingWork(false); }}>Edit</EntryEditBtn>
                              <EntryDeleteBtn type="button" onClick={() => {
                                const updated = workDraft.filter(w => w.id !== entry.id);
                                setWorkDraft(updated);
                                saveWork(updated);
                              }}>Remove</EntryDeleteBtn>
                            </EntryActions>
                          </EntryCard>
                        ))
                      )}
                      {workMsg && <SaveMsg $ok={workMsg.startsWith('✓')} style={{ marginTop: '1rem' }}>{workMsg}</SaveMsg>}
                    </>
                  )}

                  {/* ── EDUCATION ── */}
                  {section === 'education' && (
                    <>
                      <PanelTitleRow>
                        <PanelTitle>Education</PanelTitle>
                        <AddBtn type="button" onClick={() => { setAddingEdu(true); setEditingEdu({ id: genId(), school: '', degree: '', fieldOfStudy: '', graduationYear: '' }); }}>
                          + Add Education
                        </AddBtn>
                      </PanelTitleRow>

                      {(addingEdu || editingEdu) && editingEdu && (
                        <EntryForm>
                          <FieldGrid>
                            <FieldGroup $full>
                              <FieldLabel>School / Institution</FieldLabel>
                              <FieldInput value={editingEdu.school} onChange={e => setEditingEdu(ed => ed && ({ ...ed, school: e.target.value }))} placeholder="University of Virginia" />
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>Degree</FieldLabel>
                              <FieldSelect value={editingEdu.degree} onChange={e => setEditingEdu(ed => ed && ({ ...ed, degree: e.target.value }))}>
                                <option value="">— Select —</option>
                                {DEGREE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                              </FieldSelect>
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>Field of Study</FieldLabel>
                              <FieldInput value={editingEdu.fieldOfStudy} onChange={e => setEditingEdu(ed => ed && ({ ...ed, fieldOfStudy: e.target.value }))} placeholder="Computer Science" />
                            </FieldGroup>
                            <FieldGroup>
                              <FieldLabel>Graduation Year</FieldLabel>
                              <FieldSelect value={editingEdu.graduationYear} onChange={e => setEditingEdu(ed => ed && ({ ...ed, graduationYear: e.target.value }))}>
                                <option value="">— Select —</option>
                                {Array.from({ length: 56 }, (_, i) => new Date().getFullYear() + 5 - i).map(y => <option key={y} value={String(y)}>{y}</option>)}
                              </FieldSelect>
                            </FieldGroup>
                          </FieldGrid>
                          <EntryFormActions>
                            <SaveBtn type="button" onClick={() => {
                              if (!editingEdu.school || !editingEdu.degree) return;
                              const updated = addingEdu
                                ? [...eduDraft, editingEdu]
                                : eduDraft.map(e => e.id === editingEdu.id ? editingEdu : e);
                              setEduDraft(updated);
                              saveEducation(updated);
                              setEditingEdu(null);
                              setAddingEdu(false);
                            }}>Save Education</SaveBtn>
                            <CancelBtn type="button" onClick={() => { setEditingEdu(null); setAddingEdu(false); }}>Cancel</CancelBtn>
                          </EntryFormActions>
                        </EntryForm>
                      )}

                      {eduDraft.length === 0 && !addingEdu ? (
                        <EmptySection>
                          <EmptyIcon>🎓</EmptyIcon>
                          <EmptyText>No education added yet. Click &quot;+ Add Education&quot; to get started.</EmptyText>
                        </EmptySection>
                      ) : (
                        eduDraft.map(entry => (
                          <EntryCard key={entry.id}>
                            <EntryCardMain>
                              <EntryTitle>{entry.degree}{entry.fieldOfStudy && ` — ${entry.fieldOfStudy}`}</EntryTitle>
                              <EntryCompany>{entry.school}</EntryCompany>
                              {entry.graduationYear && <EntryDates>{entry.graduationYear}</EntryDates>}
                            </EntryCardMain>
                            <EntryActions>
                              <EntryEditBtn type="button" onClick={() => { setEditingEdu(entry); setAddingEdu(false); }}>Edit</EntryEditBtn>
                              <EntryDeleteBtn type="button" onClick={() => {
                                const updated = eduDraft.filter(e => e.id !== entry.id);
                                setEduDraft(updated);
                                saveEducation(updated);
                              }}>Remove</EntryDeleteBtn>
                            </EntryActions>
                          </EntryCard>
                        ))
                      )}
                      {eduMsg && <SaveMsg $ok={eduMsg.startsWith('✓')} style={{ marginTop: '1rem' }}>{eduMsg}</SaveMsg>}
                    </>
                  )}

                  {/* ── DOCUMENTS ── */}
                  {section === 'documents' && (
                    <>
                      {/* Hidden file inputs */}
                      <input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleResumeUpload(f); e.target.value = ''; }} />
                      <input ref={coverLetterInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverLetterUpload(f); e.target.value = ''; }} />
                      <input ref={certInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleCertUpload(f, newCertLabel); e.target.value = ''; }} />

                      <PanelTitle>Documents</PanelTitle>

                      {/* Resume */}
                      <SubSectionTitle>Resume</SubSectionTitle>
                      {profile?.resumeUrl ? (
                        <DocFileCard>
                          <DocFileIcon>📄</DocFileIcon>
                          <DocFileInfo>
                            <DocFileName>Resume on file</DocFileName>
                            <DocFileMeta>Stored securely · auto-parsed on upload</DocFileMeta>
                          </DocFileInfo>
                          <DocFileActions>
                            <DocViewLink href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">View ↗</DocViewLink>
                            <DocReplaceBtn type="button" disabled={resumeUploading} onClick={() => resumeInputRef.current?.click()}>
                              {resumeUploading ? 'Uploading…' : 'Replace'}
                            </DocReplaceBtn>
                          </DocFileActions>
                        </DocFileCard>
                      ) : (
                        <UploadZone $active={resumeUploading}
                          onClick={() => !resumeUploading && resumeInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && !resumeUploading) handleResumeUpload(f); }}>
                          {resumeUploading ? (
                            <><UploadZoneIcon>⏳</UploadZoneIcon><UploadZoneText>Uploading &amp; parsing resume…</UploadZoneText></>
                          ) : (
                            <><UploadZoneIcon>📤</UploadZoneIcon>
                              <UploadZoneText>Drop resume here or <UploadZoneEmphasis>browse</UploadZoneEmphasis></UploadZoneText>
                              <UploadZoneHint>PDF, DOC or DOCX · Max 5 MB · Fields auto-filled after upload</UploadZoneHint></>
                          )}
                        </UploadZone>
                      )}

                      {/* Cover Letter */}
                      <SubSectionTitle style={{ marginTop: '2.8rem' }}>Cover Letter</SubSectionTitle>
                      {profile?.coverLetterUrl ? (
                        <DocFileCard>
                          <DocFileIcon>✉️</DocFileIcon>
                          <DocFileInfo>
                            <DocFileName>Cover letter on file</DocFileName>
                            <DocFileMeta>Stored securely</DocFileMeta>
                          </DocFileInfo>
                          <DocFileActions>
                            <DocViewLink href={profile.coverLetterUrl} target="_blank" rel="noopener noreferrer">View ↗</DocViewLink>
                            <DocReplaceBtn type="button" disabled={coverLetterUploading} onClick={() => coverLetterInputRef.current?.click()}>
                              {coverLetterUploading ? 'Uploading…' : 'Replace'}
                            </DocReplaceBtn>
                          </DocFileActions>
                        </DocFileCard>
                      ) : (
                        <UploadZone $active={coverLetterUploading}
                          onClick={() => !coverLetterUploading && coverLetterInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && !coverLetterUploading) handleCoverLetterUpload(f); }}>
                          {coverLetterUploading ? (
                            <><UploadZoneIcon>⏳</UploadZoneIcon><UploadZoneText>Uploading…</UploadZoneText></>
                          ) : (
                            <><UploadZoneIcon>✉️</UploadZoneIcon>
                              <UploadZoneText>Drop cover letter here or <UploadZoneEmphasis>browse</UploadZoneEmphasis></UploadZoneText>
                              <UploadZoneHint>PDF, DOC or DOCX · Max 5 MB</UploadZoneHint></>
                          )}
                        </UploadZone>
                      )}

                      {/* Certifications */}
                      <SubSectionTitle style={{ marginTop: '2.8rem' }}>Certifications &amp; Other Documents</SubSectionTitle>
                      {(profile?.certifications || []).map(cert => (
                        <DocFileCard key={cert.id}>
                          <DocFileIcon>🏅</DocFileIcon>
                          <DocFileInfo>
                            <DocFileName>{cert.label}</DocFileName>
                            <DocFileMeta>{cert.filename} · {new Date(cert.uploadedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</DocFileMeta>
                          </DocFileInfo>
                          <DocFileActions>
                            <DocViewLink href={cert.url} target="_blank" rel="noopener noreferrer">View ↗</DocViewLink>
                            <DocDeleteBtn type="button" onClick={async () => {
                              const updated = (profile?.certifications || []).filter(c => c.id !== cert.id);
                              await saveDocUrls({ certifications: updated });
                            }}>Remove</DocDeleteBtn>
                          </DocFileActions>
                        </DocFileCard>
                      ))}

                      <CertUploadBox>
                        <FieldGroup $full>
                          <FieldLabel>Document Label <Optional>(e.g. AWS Certification, PMP Credential)</Optional></FieldLabel>
                          <FieldInput placeholder="Certification or document name" value={newCertLabel} onChange={e => setNewCertLabel(e.target.value)} />
                        </FieldGroup>
                        <UploadZone style={{ marginTop: '1.2rem' }} $active={certUploading}
                          onClick={() => !certUploading && certInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && !certUploading) handleCertUpload(f, newCertLabel); }}>
                          {certUploading ? (
                            <><UploadZoneIcon>⏳</UploadZoneIcon><UploadZoneText>Uploading…</UploadZoneText></>
                          ) : (
                            <><UploadZoneIcon>🏅</UploadZoneIcon>
                              <UploadZoneText>Drop file here or <UploadZoneEmphasis>browse</UploadZoneEmphasis></UploadZoneText>
                              <UploadZoneHint>PDF, DOC or DOCX · Max 5 MB</UploadZoneHint></>
                          )}
                        </UploadZone>
                      </CertUploadBox>

                      {docMsg && (
                        <SaveMsg $ok={docMsg.startsWith('✓')} style={{ display: 'block', marginTop: '1.4rem', textAlign: 'center' }}>
                          {docMsg}
                        </SaveMsg>
                      )}

                      {/* Parsed resume modal */}
                      {parsedResume && (
                        <ParseModalOverlay onClick={() => setParsedResume(null)}>
                          <ParseModalBox onClick={e => e.stopPropagation()}>
                            <ParseModalTitle>Fields Found in Resume</ParseModalTitle>
                            <ParseModalDesc>Select which fields to apply to your profile. Education entries will be added automatically.</ParseModalDesc>
                            <ParseFieldList>
                              {(Object.entries(parsedResume) as [string, string | null][]).filter(([, v]) => v).map(([key, val]) => {
                                const labels: Record<string, string> = {
                                  firstName: 'First Name', lastName: 'Last Name', phone: 'Phone',
                                  city: 'City', state: 'State', linkedinUrl: 'LinkedIn URL',
                                  school: 'School', degree: 'Degree', fieldOfStudy: 'Field of Study',
                                  graduationYear: 'Graduation Year',
                                };
                                return (
                                  <ParseFieldRow key={key}>
                                    <input type="checkbox" id={`pf-${key}`} checked={parsedApplied.has(key)}
                                      onChange={e => {
                                        const next = new Set(parsedApplied);
                                        e.target.checked ? next.add(key) : next.delete(key);
                                        setParsedApplied(next);
                                      }}
                                      style={{ width: '1.6rem', height: '1.6rem', flexShrink: 0, cursor: 'pointer', accentColor: 'rgb(255,125,0)' }}
                                    />
                                    <ParseFieldLabel htmlFor={`pf-${key}`}>
                                      <ParseFieldName>{labels[key] || key}</ParseFieldName>
                                      <ParseFieldValue>{String(val)}</ParseFieldValue>
                                    </ParseFieldLabel>
                                  </ParseFieldRow>
                                );
                              })}
                            </ParseFieldList>
                            <ParseModalActions>
                              <SaveBtn type="button" onClick={applyParsedResume} disabled={parsedApplied.size === 0}>
                                Apply {parsedApplied.size} Field{parsedApplied.size !== 1 ? 's' : ''}
                              </SaveBtn>
                              <CancelBtn type="button" onClick={() => setParsedResume(null)}>Skip</CancelBtn>
                            </ParseModalActions>
                          </ParseModalBox>
                        </ParseModalOverlay>
                      )}
                    </>
                  )}

                  {/* ── APPLICATIONS ── */}
                  {section === 'applications' && (
                    <>
                      <PanelTitle>My Applications</PanelTitle>
                      {appsLoading ? <LoadingText>Loading applications…</LoadingText> : applications.length === 0 ? (
                        <EmptySection>
                          <EmptyIcon>📋</EmptyIcon>
                          <EmptyText>No applications yet.</EmptyText>
                          <BrowseLink href="/careers">Browse Open Positions →</BrowseLink>
                        </EmptySection>
                      ) : (
                        applications.map(app => {
                          const s = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;
                          return (
                            <AppCard key={app.id} $faded={['withdrawn','closed'].includes(app.status)}>
                              <AppCardTop>
                                <AppCardMain>
                                  <AppTitle>{app.job_title || app.position_applying_for || 'Position'}</AppTitle>
                                  <AppMeta>
                                    {app.job_department && <>{app.job_department} &middot; </>}
                                    Applied {fmtDate(app.submission_date || app.applied_at || app.created_at)}
                                  </AppMeta>
                                </AppCardMain>
                                <StatusBadge $color={s.color} $bg={s.bg}>{s.label}</StatusBadge>
                              </AppCardTop>
                              <AppDocs>
                                {app.resume_url && <DocChip>Resume</DocChip>}
                                {app.cover_letter_url && <DocChip>Cover Letter</DocChip>}
                                {app.linkedin_url && <AppLink href={app.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn ↗</AppLink>}
                                {app.portfolio_url && <AppLink href={app.portfolio_url} target="_blank" rel="noopener noreferrer">Portfolio ↗</AppLink>}
                              </AppDocs>
                            </AppCard>
                          );
                        })
                      )}
                      <AppsNote>
                        To withdraw an application or request documents, contact{' '}
                        <a href="mailto:careers@preciseanalytics.io" style={{ color: 'rgb(255,125,0)' }}>careers@preciseanalytics.io</a>
                      </AppsNote>
                    </>
                  )}

                  {/* ── ACCOUNT ── */}
                  {section === 'account' && (
                    <>
                      <PanelTitle>Account Settings</PanelTitle>

                      <SubSectionTitle>Change Password</SubSectionTitle>
                      <FieldGrid>
                        <FieldGroup $full>
                          <FieldLabel>Current Password</FieldLabel>
                          <FieldInput type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} autoComplete="current-password" />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>New Password</FieldLabel>
                          <FieldInput type="password" value={newPw} onChange={e => setNewPw(e.target.value)} autoComplete="new-password" />
                        </FieldGroup>
                        <FieldGroup>
                          <FieldLabel>Confirm New Password</FieldLabel>
                          <FieldInput type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} autoComplete="new-password" />
                        </FieldGroup>
                      </FieldGrid>
                      <SaveRow>
                        {pwMsg && <SaveMsg $ok={pwMsg.startsWith('✓')}>{pwMsg}</SaveMsg>}
                        <SaveBtn onClick={changePassword} disabled={pwSaving || !currentPw || !newPw || !confirmPw}>
                          {pwSaving ? 'Updating…' : 'Update Password'}
                        </SaveBtn>
                      </SaveRow>

                      <DangerZone>
                        <SubSectionTitle style={{ color: '#dc2626' }}>Sign Out</SubSectionTitle>
                        <DangerText>Sign out of your Precise Analytics account on this device.</DangerText>
                        <DangerBtn onClick={() => { logout(); router.push('/careers'); }}>Sign Out</DangerBtn>
                      </DangerZone>
                    </>
                  )}
                </ContentPanel>
              </AnimatePresence>
            </Content>
          </Layout>
        </Container>
      </PageWrapper>
    </>
  );
}

// ── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 3rem 0 8rem;
  min-height: 80vh;
  background: #f8fafc;
`;

const Layout = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: flex-start;
  ${media.tablet(`flex-direction: column;`)}
`;

const Sidebar = styled.aside`
  width: 26rem;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1.2rem;
  overflow: hidden;
  position: sticky;
  top: 2rem;
  ${media.tablet(`width: 100%; position: static;`)}
`;

const SidebarProfile = styled.div`
  padding: 2.4rem 2rem 1.6rem;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
`;

const AvatarRing = styled.div`
  width: 7.2rem; height: 7.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(255,125,0), rgb(230,80,0));
  padding: 3px;
  margin: 0 auto 1.2rem;
  display: flex; align-items: center; justify-content: center;
`;

const Avatar = styled.div`
  width: 100%; height: 100%;
  border-radius: 50%;
  background: rgb(255,125,0);
  color: #fff;
  font-size: 2.2rem;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  text-transform: uppercase;
`;

const SidebarName = styled.div`font-size: 1.7rem; font-weight: 700; color: #0f172a; margin-bottom: 0.3rem;`;
const SidebarHeadline = styled.div`font-size: 1.25rem; color: #64748b; margin-bottom: 0.4rem; line-height: 1.4;`;
const SidebarEmail = styled.div`font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.2rem;`;

const CompletionWrap = styled.div`margin-top: 0.8rem;`;
const CompletionLabel = styled.div`font-size: 1.15rem; color: #64748b; margin-bottom: 0.5rem;`;
const CompletionBar = styled.div`height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;`;
const CompletionFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${p => p.$pct}%;
  background: linear-gradient(90deg, rgb(255,125,0), rgb(255,165,60));
  border-radius: 3px;
  transition: width 0.4s ease;
`;

const Nav = styled.nav`padding: 1rem 0;`;

const NavItem = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 2rem;
  font-size: 1.45rem;
  font-weight: ${p => p.$active ? 700 : 500};
  color: ${p => p.$active ? 'rgb(255,125,0)' : '#334155'};
  background: ${p => p.$active ? 'rgba(255,125,0,0.06)' : 'none'};
  border: none;
  border-left: 3px solid ${p => p.$active ? 'rgb(255,125,0)' : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  &:hover { background: rgba(255,125,0,0.04); color: rgb(255,125,0); }
`;

const NavIcon = styled.span`font-size: 1.5rem; width: 2rem; text-align: center; flex-shrink: 0;`;
const NavBadge = styled.span`
  margin-left: auto;
  background: rgb(255,125,0);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 1rem;
  padding: 0.15rem 0.6rem;
`;

const SidebarFooter = styled.div`
  padding: 1.4rem 2rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarLink = styled(Link)`font-size: 1.3rem; color: rgb(255,125,0); text-decoration: none; &:hover{text-decoration:underline;}`;
const SidebarSignOut = styled.button`font-size: 1.3rem; color: #94a3b8; background: none; border: none; cursor: pointer; &:hover{color:#ef4444; text-decoration:underline;}`;

const Content = styled.main`flex: 1; min-width: 0;`;

const ContentPanel = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1.2rem;
  padding: 3rem 3.2rem;
  ${media.tablet(`padding: 2rem 1.6rem;`)}
`;

const PanelTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 2px solid #f1f5f9;
`;

const PanelTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 2px solid #f1f5f9;
  & > h1 { margin: 0; padding: 0; border: none; }
`;

const SubSectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  color: #0f172a;
  margin: 2.4rem 0 1.4rem;
  &:first-child { margin-top: 0; }
`;

const LoadingText = styled.p`font-size: 1.6rem; color: #94a3b8; text-align: center; padding: 3rem 0;`;

// Stats
const StatsRow = styled.div`display: flex; gap: 1.6rem; margin-bottom: 2.4rem; flex-wrap: wrap;`;
const StatCard = styled.div`
  flex: 1; min-width: 10rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.6rem;
  text-align: center;
`;
const StatNum = styled.div`font-size: 3rem; font-weight: 800; color: rgb(255,125,0); line-height: 1;`;
const StatLabel = styled.div`font-size: 1.2rem; color: #64748b; margin-top: 0.4rem;`;

// Profile tip
const ProfileTip = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-left: 4px solid #f59e0b;
  border-radius: 0.8rem;
  padding: 1.4rem 1.6rem;
  margin-bottom: 2.4rem;
`;
const TipTitle = styled.div`font-size: 1.4rem; font-weight: 700; color: #92400e; margin-bottom: 0.4rem;`;
const TipText = styled.div`font-size: 1.35rem; color: #78350f; line-height: 1.5;`;

// Overview app rows
const AppRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #f1f5f9;
  &:last-child { border-bottom: none; }
`;
const AppRowTitle = styled.div`flex: 1; font-size: 1.5rem; font-weight: 600; color: #0f172a;`;
const AppRowMeta = styled.div`font-size: 1.25rem; color: #94a3b8; white-space: nowrap;`;
const ViewAllBtn = styled.button`font-size: 1.4rem; color: rgb(255,125,0); background: none; border: none; cursor: pointer; padding: 1rem 0; &:hover{text-decoration:underline;}`;

// Fields
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const FieldGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  grid-column: ${p => p.$full ? '1 / -1' : 'auto'};
`;

const FieldLabel = styled.label`font-size: 1.2rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;`;

const sharedField = `
  width: 100%;
  padding: 0.9rem 1.2rem;
  font-size: 1.5rem;
  color: #0f172a;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.6rem;
  outline: none;
  &:focus { border-color: rgb(255,125,0); box-shadow: 0 0 0 3px rgba(255,125,0,0.1); }
  &:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }
`;

const FieldInput = styled.input`${sharedField}`;
const FieldSelect = styled.select`${sharedField} cursor: pointer;`;
const FieldTextarea = styled.textarea`${sharedField} resize: vertical; min-height: 8rem;`;

const Optional = styled.span`font-weight: 400; text-transform: none; color: #94a3b8; font-size: 1.1rem; margin-left: 0.4rem;`;

const CheckRow = styled.div`display: flex; align-items: center; gap: 0.6rem; margin-top: 0.4rem;`;

// Save row
const SaveRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.4rem;
  margin-top: 2.4rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
`;

const SaveMsg = styled.span<{ $ok: boolean }>`
  font-size: 1.4rem;
  color: ${p => p.$ok ? '#16a34a' : '#dc2626'};
  font-weight: 600;
`;

const SaveBtn = styled.button`
  padding: 1rem 2.4rem;
  background: rgb(255,125,0);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  &:hover:not(:disabled) { background: rgb(230,100,0); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const AddBtn = styled.button`
  padding: 0.7rem 1.6rem;
  background: #f8fafc;
  color: #334155;
  font-size: 1.4rem;
  font-weight: 700;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.6rem;
  cursor: pointer;
  &:hover { border-color: rgb(255,125,0); color: rgb(255,125,0); }
`;

const CancelBtn = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  color: #64748b;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  cursor: pointer;
  &:hover { border-color: #94a3b8; }
`;

// Entry cards (work/education)
const EntryForm = styled.div`
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 1.6rem;
`;
const EntryFormActions = styled.div`display: flex; gap: 1rem; margin-top: 1.6rem;`;

const EntryCard = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.8rem 2rem;
  margin-bottom: 1.2rem;
  &:hover { border-color: #cbd5e1; }
`;
const EntryCardMain = styled.div`flex: 1;`;
const EntryTitle = styled.div`font-size: 1.6rem; font-weight: 700; color: #0f172a; margin-bottom: 0.3rem;`;
const EntryCompany = styled.div`font-size: 1.4rem; color: #475569; margin-bottom: 0.3rem;`;
const EntryDates = styled.div`font-size: 1.3rem; color: #94a3b8;`;
const EntryDesc = styled.div`font-size: 1.35rem; color: #64748b; margin-top: 0.6rem; line-height: 1.5;`;
const EntryActions = styled.div`display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;`;
const EntryEditBtn = styled.button`font-size: 1.3rem; color: #0ea5e9; background: none; border: none; cursor: pointer; text-align: right; &:hover{text-decoration:underline;}`;
const EntryDeleteBtn = styled.button`font-size: 1.3rem; color: #94a3b8; background: none; border: none; cursor: pointer; text-align: right; &:hover{color:#ef4444;}`;

const EmptySection = styled.div`text-align: center; padding: 4rem 2rem;`;
const EmptyIcon = styled.div`font-size: 3.5rem; margin-bottom: 1.2rem;`;
const EmptyText = styled.p`font-size: 1.5rem; color: #94a3b8; margin-bottom: 1.6rem;`;
const BrowseLink = styled(Link)`
  display: inline-block;
  padding: 0.9rem 2rem;
  background: rgb(255,125,0);
  color: #fff;
  border-radius: 0.7rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  &:hover { background: rgb(230,100,0); }
`;

// Applications
const AppCard = styled.div<{ $faded?: boolean }>`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.8rem 2rem;
  margin-bottom: 1.2rem;
  opacity: ${p => p.$faded ? 0.6 : 1};
`;
const AppCardTop = styled.div`display: flex; align-items: flex-start; justify-content: space-between; gap: 1.6rem; margin-bottom: 1.2rem;`;
const AppCardMain = styled.div`flex: 1;`;
const AppTitle = styled.div`font-size: 1.7rem; font-weight: 700; color: #0f172a; margin-bottom: 0.4rem;`;
const AppMeta = styled.div`font-size: 1.3rem; color: #94a3b8;`;
const AppDocs = styled.div`display: flex; gap: 0.8rem; flex-wrap: wrap; align-items: center;`;
const DocChip = styled.span`font-size: 1.2rem; font-weight: 600; padding: 0.25rem 0.8rem; border-radius: 0.4rem; background: rgba(22,163,74,0.1); color: #15803d; border: 1px solid rgba(22,163,74,0.2);`;
const AppLink = styled.a`font-size: 1.3rem; color: rgb(255,125,0); text-decoration: none; font-weight: 600; &:hover{text-decoration:underline;}`;
const AppsNote = styled.p`font-size: 1.3rem; color: #94a3b8; text-align: center; margin-top: 2rem; line-height: 1.6;`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  white-space: nowrap;
  flex-shrink: 0;
`;

// Documents
const UploadZone = styled.div<{ $active?: boolean }>`
  border: 2px dashed ${p => p.$active ? 'rgb(255,125,0)' : '#cbd5e1'};
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  cursor: ${p => p.$active ? 'default' : 'pointer'};
  background: ${p => p.$active ? 'rgba(255,125,0,0.04)' : '#f8fafc'};
  transition: border-color 0.2s, background 0.2s;
  &:hover { border-color: rgb(255,125,0); background: rgba(255,125,0,0.04); }
`;
const UploadZoneIcon = styled.div`font-size: 3rem; margin-bottom: 0.8rem;`;
const UploadZoneText = styled.div`font-size: 1.5rem; color: #475569; font-weight: 500;`;
const UploadZoneEmphasis = styled.span`color: rgb(255,125,0); text-decoration: underline;`;
const UploadZoneHint = styled.div`font-size: 1.2rem; color: #94a3b8; margin-top: 0.4rem;`;

const DocFileCard = styled.div`
  display: flex; align-items: center; gap: 1.4rem;
  background: #f8fafc; border: 1px solid #e2e8f0;
  border-radius: 0.8rem; padding: 1.4rem 1.6rem; margin-bottom: 1rem;
`;
const DocFileIcon = styled.div`font-size: 2.2rem; flex-shrink: 0;`;
const DocFileInfo = styled.div`flex: 1; min-width: 0;`;
const DocFileName = styled.div`font-size: 1.5rem; font-weight: 700; color: #0f172a;`;
const DocFileMeta = styled.div`font-size: 1.2rem; color: #94a3b8;`;
const DocFileActions = styled.div`display: flex; gap: 1rem; align-items: center; flex-shrink: 0;`;
const DocViewLink = styled.a`
  font-size: 1.3rem; color: rgb(255,125,0); text-decoration: none;
  font-weight: 600; &:hover { text-decoration: underline; }
`;
const DocReplaceBtn = styled.button`
  font-size: 1.3rem; color: #64748b; background: none;
  border: 1px solid #e2e8f0; border-radius: 0.4rem; padding: 0.3rem 0.9rem;
  cursor: pointer; &:hover { border-color: #94a3b8; }
  &:disabled { opacity: 0.5; cursor: default; }
`;
const DocDeleteBtn = styled.button`
  font-size: 1.3rem; color: #ef4444; background: none; border: none;
  cursor: pointer; &:hover { text-decoration: underline; }
`;

const CertUploadBox = styled.div`
  margin-top: 1.6rem; padding: 2rem;
  border: 1px solid #e2e8f0; border-radius: 1rem; background: #f8fafc;
`;

// Parse modal
const ParseModalOverlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  display: flex; align-items: center; justify-content: center; padding: 2rem;
`;
const ParseModalBox = styled.div`
  background: #fff; border-radius: 1.2rem; padding: 2.8rem;
  max-width: 52rem; width: 100%; max-height: 80vh; overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
`;
const ParseModalTitle = styled.h2`font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.6rem;`;
const ParseModalDesc = styled.p`font-size: 1.4rem; color: #64748b; margin-bottom: 2rem; line-height: 1.6;`;
const ParseFieldList = styled.div`display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 2.4rem;`;
const ParseFieldRow = styled.div`
  display: flex; align-items: flex-start; gap: 1.2rem;
  padding: 1rem 1.2rem; background: #f8fafc; border-radius: 0.6rem;
`;
const ParseFieldLabel = styled.label`flex: 1; cursor: pointer;`;
const ParseFieldName = styled.div`font-size: 1.15rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;`;
const ParseFieldValue = styled.div`font-size: 1.5rem; color: #0f172a; font-weight: 500; margin-top: 0.1rem; word-break: break-word;`;
const ParseModalActions = styled.div`display: flex; gap: 1rem; justify-content: flex-end;`;

// Account
const DangerZone = styled.div`
  margin-top: 3.2rem;
  padding-top: 2.4rem;
  border-top: 1px solid #fee2e2;
`;
const DangerText = styled.p`font-size: 1.4rem; color: #64748b; margin-bottom: 1.4rem;`;
const DangerBtn = styled.button`
  padding: 0.9rem 2rem;
  background: #ffffff;
  color: #dc2626;
  font-size: 1.4rem;
  font-weight: 700;
  border: 1.5px solid #fca5a5;
  border-radius: 0.6rem;
  cursor: pointer;
  &:hover { background: #fef2f2; border-color: #dc2626; }
`;

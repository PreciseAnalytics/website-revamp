import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { media } from 'utils/media';
import { ApplicationRecord, ApplicationStatus } from 'lib/applicationsStore';

const STATUS_META: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  received:     { label: 'Received',     color: '#1d4ed8', bg: '#eff6ff' },
  under_review: { label: 'Under Review', color: '#b45309', bg: '#fffbeb' },
  interview:    { label: 'Interview',    color: '#7c3aed', bg: '#f5f3ff' },
  offer:        { label: 'Offer',        color: '#15803d', bg: '#f0fdf4' },
  closed:       { label: 'Closed',       color: '#6b7280', bg: '#f9fafb' },
};

const ALL_STATUSES = Object.keys(STATUS_META) as ApplicationStatus[];

export default function AdminATS() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [filterJob, setFilterJob] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Restore session secret
  useEffect(() => {
    const saved = sessionStorage.getItem('pa_admin_secret');
    if (saved) { setSecret(saved); setAuthed(true); }
  }, []);

  const fetchApplications = useCallback(async (s: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/applications', {
        headers: { 'x-admin-secret': s },
      });
      if (res.status === 401) { setAuthed(false); setAuthError('Invalid password.'); return; }
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setApplications(data.applications);
    } catch {
      setError('Could not load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && secret) fetchApplications(secret);
  }, [authed, secret, fetchApplications]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    sessionStorage.setItem('pa_admin_secret', secret);
    setAuthed(true);
  }

  async function handleStatusChange(id: string, status: ApplicationStatus) {
    setUpdating(id);
    try {
      await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ id, status }),
      });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status, statusUpdatedAt: new Date().toISOString() } : a));
    } finally {
      setUpdating(null);
    }
  }

  // Derived data
  const jobOptions = Array.from(new Set(applications.map(a => a.jobTitle))).sort();

  const filtered = applications.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.applicantName.toLowerCase().includes(q) || a.applicantEmail.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchJob = filterJob === 'all' || a.jobTitle === filterJob;
    return matchSearch && matchStatus && matchJob;
  });

  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  // ── Not authenticated ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <>
        <Head>
          <title>ATS Login | Precise Analytics</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <LoginPage>
          <LoginCard>
            <LoginLogo src="/PA-logo.png" alt="Precise Analytics" />
            <LoginTitle>Applicant Tracking System</LoginTitle>
            <LoginSub>Internal use only &mdash; Precise Analytics staff</LoginSub>
            <LoginForm onSubmit={handleLogin}>
              <LoginLabel htmlFor="admin-secret">Admin Password</LoginLabel>
              <LoginInput
                id="admin-secret"
                type="password"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
              />
              {authError && <LoginError>{authError}</LoginError>}
              <LoginBtn type="submit">Sign In &rarr;</LoginBtn>
            </LoginForm>
            <LoginFooterLink href="https://precise-analytics-ats.vercel.app/" target="_blank" rel="noopener noreferrer">
              &#128279; Open External ATS Platform
            </LoginFooterLink>
          </LoginCard>
        </LoginPage>
      </>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>ATS Dashboard | Precise Analytics</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <DashWrapper>
        {/* ── Top nav ── */}
        <TopNav>
          <NavLeft>
            <NavLogo src="/PA-logo.png" alt="Precise Analytics" />
            <NavTitle>Applicant Tracking System</NavTitle>
          </NavLeft>
          <NavRight>
            <NavExtLink href="https://precise-analytics-ats.vercel.app/" target="_blank" rel="noopener noreferrer">
              &#128279; ATS Platform
            </NavExtLink>
            <NavHomeLink href="/careers">Careers Page</NavHomeLink>
            <NavSignOut onClick={() => { sessionStorage.removeItem('pa_admin_secret'); setAuthed(false); setSecret(''); }}>
              Sign Out
            </NavSignOut>
          </NavRight>
        </TopNav>

        <DashContent>
          {/* ── Stats row ── */}
          <StatsRow>
            <StatCard $active={filterStatus === 'all'} onClick={() => setFilterStatus('all')}>
              <StatNum>{applications.length}</StatNum>
              <StatLabel>Total</StatLabel>
            </StatCard>
            {ALL_STATUSES.map(s => (
              <StatCard key={s} $active={filterStatus === s} $color={STATUS_META[s].color} $bg={STATUS_META[s].bg} onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}>
                <StatNum>{counts[s]}</StatNum>
                <StatLabel>{STATUS_META[s].label}</StatLabel>
              </StatCard>
            ))}
          </StatsRow>

          {/* ── Filters ── */}
          <FilterBar>
            <SearchInput
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or position…"
            />
            <FilterSelect value={filterJob} onChange={e => setFilterJob(e.target.value)}>
              <option value="all">All Positions</option>
              {jobOptions.map(j => <option key={j} value={j}>{j}</option>)}
            </FilterSelect>
            <RefreshBtn onClick={() => fetchApplications(secret)} disabled={loading}>
              {loading ? '…' : '↻ Refresh'}
            </RefreshBtn>
          </FilterBar>

          {error && <ErrorBanner>{error}</ErrorBanner>}

          {/* ── Table ── */}
          {loading ? (
            <LoadingState>Loading applications…</LoadingState>
          ) : filtered.length === 0 ? (
            <EmptyState>
              {applications.length === 0 ? 'No applications submitted yet.' : 'No results match your filters.'}
            </EmptyState>
          ) : (
            <TableWrap>
              <AppTable>
                <thead>
                  <Tr>
                    <Th>Applicant</Th>
                    <Th>Position</Th>
                    <Th>Submitted</Th>
                    <Th>Files</Th>
                    <Th>Status</Th>
                    <Th></Th>
                  </Tr>
                </thead>
                <tbody>
                  {filtered.map(app => (
                    <>
                      <Tr key={app.id} $clickable onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
                        <Td>
                          <ApplicantName>{app.applicantName}</ApplicantName>
                          <ApplicantEmail href={`mailto:${app.applicantEmail}`} onClick={e => e.stopPropagation()}>
                            {app.applicantEmail}
                          </ApplicantEmail>
                          {app.phone && <ApplicantPhone>{app.phone}</ApplicantPhone>}
                        </Td>
                        <Td>
                          <JobTitle>{app.jobTitle}</JobTitle>
                          <JobNum>{app.jobNumber}</JobNum>
                        </Td>
                        <Td>
                          <DatePrimary>{formatDate(app.submittedAt)}</DatePrimary>
                          <DateSub>{formatTime(app.submittedAt)}</DateSub>
                        </Td>
                        <Td>
                          <FileBadges>
                            {app.hasResume && <FileBadge $type="resume">CV</FileBadge>}
                            {app.hasCoverLetter && <FileBadge $type="cover">CL</FileBadge>}
                            {app.hasCerts && <FileBadge $type="cert">Cert</FileBadge>}
                            {app.hasPhoto && <FileBadge $type="photo">Photo</FileBadge>}
                          </FileBadges>
                        </Td>
                        <Td onClick={e => e.stopPropagation()}>
                          <StatusSelect
                            value={app.status}
                            $status={app.status}
                            onChange={e => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            disabled={updating === app.id}
                          >
                            {ALL_STATUSES.map(s => (
                              <option key={s} value={s}>{STATUS_META[s].label}</option>
                            ))}
                          </StatusSelect>
                        </Td>
                        <Td>
                          <ExpandBtn>{expanded === app.id ? '▲' : '▼'}</ExpandBtn>
                        </Td>
                      </Tr>

                      {expanded === app.id && (
                        <Tr key={`${app.id}-detail`}>
                          <DetailTd colSpan={6}>
                            <DetailPanel>
                              <DetailGrid>
                                {app.location && (
                                  <DetailItem>
                                    <DetailItemLabel>Location</DetailItemLabel>
                                    <DetailItemValue>{app.location}</DetailItemValue>
                                  </DetailItem>
                                )}
                                {app.workAuthorized && (
                                  <DetailItem>
                                    <DetailItemLabel>US Work Auth</DetailItemLabel>
                                    <DetailItemValue>{app.workAuthorized}</DetailItemValue>
                                  </DetailItem>
                                )}
                                {app.visaSponsorship && (
                                  <DetailItem>
                                    <DetailItemLabel>Visa Sponsorship</DetailItemLabel>
                                    <DetailItemValue>{app.visaSponsorship}</DetailItemValue>
                                  </DetailItem>
                                )}
                                <DetailItem>
                                  <DetailItemLabel>Status Updated</DetailItemLabel>
                                  <DetailItemValue>{formatDate(app.statusUpdatedAt)} {formatTime(app.statusUpdatedAt)}</DetailItemValue>
                                </DetailItem>
                              </DetailGrid>
                              <DetailLinks>
                                <DetailLink href={`mailto:${app.applicantEmail}`}>&#9993; Email Applicant</DetailLink>
                                {app.linkedinUrl && (
                                  <DetailLink href={app.linkedinUrl} target="_blank" rel="noopener noreferrer">&#128101; LinkedIn</DetailLink>
                                )}
                                {app.portfolioUrl && (
                                  <DetailLink href={app.portfolioUrl} target="_blank" rel="noopener noreferrer">&#127760; Portfolio</DetailLink>
                                )}
                                <DetailLink href="https://precise-analytics-ats.vercel.app/" target="_blank" rel="noopener noreferrer">&#128196; Open in ATS Platform</DetailLink>
                              </DetailLinks>
                            </DetailPanel>
                          </DetailTd>
                        </Tr>
                      )}
                    </>
                  ))}
                </tbody>
              </AppTable>
            </TableWrap>
          )}

          <TableFooter>
            Showing {filtered.length} of {applications.length} application{applications.length !== 1 ? 's' : ''}
          </TableFooter>
        </DashContent>
      </DashWrapper>
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/New_York' }) + ' ET';
}

// ─── Styled Components ────────────────────────────────────────────────────────

// Login
const LoginPage = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
const LoginCard = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  padding: 4rem 4rem 3rem;
  width: 100%;
  max-width: 44rem;
  box-shadow: 0 8px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;
const LoginLogo = styled.img`
  height: 4.8rem;
  width: auto;
  margin-bottom: 0.8rem;
`;
const LoginTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin: 0;
`;
const LoginSub = styled.p`
  font-size: 1.4rem;
  color: #6b7280;
  text-align: center;
  margin: 0 0 1.6rem;
`;
const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const LoginLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: .05em;
`;
const LoginInput = styled.input`
  padding: 1.1rem 1.4rem;
  font-size: 1.5rem;
  border: 1.5px solid #d1d5db;
  border-radius: 0.7rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #FF7D00; box-shadow: 0 0 0 3px rgba(255,125,0,.12); }
`;
const LoginError = styled.p`
  font-size: 1.4rem;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.6rem;
  padding: 0.9rem 1.2rem;
`;
const LoginBtn = styled.button`
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 700;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #FF7D00; }
`;
const LoginFooterLink = styled.a`
  margin-top: 1.6rem;
  font-size: 1.4rem;
  color: #1d4ed8;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

// Dashboard
const DashWrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
`;
const TopNav = styled.nav`
  background: #111827;
  padding: 0 3.2rem;
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;
const NavLeft = styled.div`display: flex; align-items: center; gap: 1.4rem;`;
const NavLogo = styled.img`height: 3.2rem; width: auto;`;
const NavTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  ${media.tablet(`display: none;`)}
`;
const NavRight = styled.div`display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap;`;
const NavExtLink = styled.a`
  padding: 0.6rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 700;
  background: #1d4ed8;
  color: #fff;
  border-radius: 0.6rem;
  text-decoration: none;
  &:hover { background: #1e40af; }
`;
const NavHomeLink = styled(Link)`
  font-size: 1.3rem;
  color: #9ca3af;
  text-decoration: none;
  &:hover { color: #fff; }
`;
const NavSignOut = styled.button`
  font-size: 1.3rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  &:hover { color: #fff; }
`;

const DashContent = styled.div`padding: 3rem 3.2rem; max-width: 1400px; margin: 0 auto;`;

const StatsRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2.4rem;
  flex-wrap: wrap;
`;
const StatCard = styled.div<{ $active?: boolean; $color?: string; $bg?: string }>`
  flex: 1;
  min-width: 10rem;
  padding: 1.6rem 2rem;
  background: ${({ $active, $bg }) => $active ? ($bg || '#111827') : '#fff'};
  border: 2px solid ${({ $active, $color }) => $active ? ($color || '#111827') : '#e5e7eb'};
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${({ $color }) => $color || '#111827'}; }
`;
const StatNum = styled.p`font-size: 2.8rem; font-weight: 700; color: #111827; margin: 0;`;
const StatLabel = styled.p`font-size: 1.2rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: #6b7280; margin: 0.2rem 0 0;`;

const FilterBar = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;
const SearchInput = styled.input`
  flex: 1;
  min-width: 22rem;
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  background: #fff;
  border: 1.5px solid #d1d5db;
  border-radius: 0.7rem;
  outline: none;
  &:focus { border-color: #FF7D00; }
`;
const FilterSelect = styled.select`
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
  background: #fff;
  border: 1.5px solid #d1d5db;
  border-radius: 0.7rem;
  outline: none;
  cursor: pointer;
  &:focus { border-color: #FF7D00; }
`;
const RefreshBtn = styled.button`
  padding: 1rem 1.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  &:hover:not(:disabled) { background: #FF7D00; }
  &:disabled { opacity: 0.5; }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 0.7rem;
  padding: 1.2rem 1.6rem;
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
`;
const LoadingState = styled.div`padding: 6rem 0; text-align: center; font-size: 1.6rem; color: #6b7280;`;
const EmptyState = styled.div`padding: 6rem 0; text-align: center; font-size: 1.6rem; color: #6b7280;`;

const TableWrap = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  overflow: hidden;
  overflow-x: auto;
`;
const AppTable = styled.table`width: 100%; border-collapse: collapse; font-size: 1.4rem;`;
const Tr = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid #f0f0f0;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  transition: background 0.1s;
  &:hover { background: ${({ $clickable }) => $clickable ? '#f9fafb' : 'transparent'}; }
  &:last-child { border-bottom: none; }
`;
const Th = styled.th`
  padding: 1.2rem 1.6rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
`;
const Td = styled.td`padding: 1.4rem 1.6rem; vertical-align: middle;`;

const ApplicantName = styled.p`font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 0.2rem;`;
const ApplicantEmail = styled.a`font-size: 1.3rem; color: #FF7D00; text-decoration: none; display: block; &:hover { text-decoration: underline; }`;
const ApplicantPhone = styled.p`font-size: 1.2rem; color: #6b7280; margin: 0.2rem 0 0;`;
const JobTitle = styled.p`font-size: 1.4rem; font-weight: 600; color: #111827; margin: 0 0 0.2rem;`;
const JobNum = styled.p`font-size: 1.2rem; font-family: monospace; color: #6b7280; margin: 0;`;
const DatePrimary = styled.p`font-size: 1.4rem; color: #111827; margin: 0 0 0.2rem; white-space: nowrap;`;
const DateSub = styled.p`font-size: 1.2rem; color: #6b7280; margin: 0; white-space: nowrap;`;

const FileBadges = styled.div`display: flex; gap: 0.4rem; flex-wrap: wrap;`;
const FileBadge = styled.span<{ $type: string }>`
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.2rem 0.7rem;
  border-radius: 0.4rem;
  background: ${({ $type }) => ({ resume: '#dbeafe', cover: '#d1fae5', cert: '#fef3c7', photo: '#f3e8ff' }[$type] || '#f3f4f6')};
  color: ${({ $type }) => ({ resume: '#1d4ed8', cover: '#065f46', cert: '#92400e', photo: '#6d28d9' }[$type] || '#374151')};
`;

const StatusSelect = styled.select<{ $status: ApplicationStatus }>`
  padding: 0.5rem 0.9rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 2rem;
  border: 1.5px solid ${({ $status }) => STATUS_META[$status].color};
  background: ${({ $status }) => STATUS_META[$status].bg};
  color: ${({ $status }) => STATUS_META[$status].color};
  cursor: pointer;
  outline: none;
  appearance: auto;
`;

const ExpandBtn = styled.span`font-size: 1.2rem; color: #9ca3af;`;

const DetailTd = styled.td`padding: 0; background: #fafafa; border-bottom: 2px solid #e5e7eb;`;
const DetailPanel = styled.div`padding: 2rem 2.4rem; display: flex; gap: 3rem; flex-wrap: wrap; align-items: flex-start;`;
const DetailGrid = styled.div`display: flex; gap: 2rem; flex-wrap: wrap; flex: 1;`;
const DetailItem = styled.div`min-width: 14rem;`;
const DetailItemLabel = styled.p`font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #6b7280; margin: 0 0 0.3rem;`;
const DetailItemValue = styled.p`font-size: 1.4rem; color: #111827; margin: 0;`;
const DetailLinks = styled.div`display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;`;
const DetailLink = styled.a`
  padding: 0.7rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 600;
  background: #111827;
  color: #fff;
  border-radius: 0.6rem;
  text-decoration: none;
  white-space: nowrap;
  &:hover { background: #FF7D00; }
`;

const TableFooter = styled.p`
  margin-top: 1.4rem;
  font-size: 1.3rem;
  color: #6b7280;
  text-align: right;
`;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';
import type { ApplicationRecord, ApplicationStatus } from 'lib/applicationsStore';

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  received:      { label: 'Received',      color: '#2563eb', bg: 'rgba(37,99,235,0.1)'   },
  under_review:  { label: 'Under Review',  color: '#d97706', bg: 'rgba(217,119,6,0.1)'   },
  interview:     { label: 'Interview',     color: '#7c3aed', bg: 'rgba(124,58,237,0.1)'  },
  offer:         { label: 'Offer',         color: '#16a34a', bg: 'rgba(22,163,74,0.1)'   },
  closed:        { label: 'Closed',        color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
  withdrawn:     { label: 'Withdrawn',     color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [confirmWithdraw, setConfirmWithdraw] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { router.replace('/careers'); return; }
    fetchApplications();
  }, [user, router]);

  function fetchApplications() {
    if (!user) return;
    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    })
      .then(r => r.json())
      .then(d => setApplications(d.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }

  async function handleWithdraw(appId: string) {
    if (!user) return;
    setWithdrawingId(appId);
    try {
      const res = await fetch('/api/applications/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appId, email: user.email }),
      });
      if (res.ok) {
        setApplications(prev =>
          prev.map(a => a.id === appId
            ? { ...a, status: 'withdrawn' as ApplicationStatus, statusUpdatedAt: new Date().toISOString() }
            : a
          )
        );
      }
    } finally {
      setWithdrawingId(null);
      setConfirmWithdraw(null);
    }
  }

  if (!user) return null;

  const activeApps = applications.filter(a => a.status !== 'withdrawn' && a.status !== 'closed');
  const closedApps = applications.filter(a => a.status === 'withdrawn' || a.status === 'closed');

  return (
    <>
      <Head>
        <title>My Profile — Precise Analytics Careers</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AnimatedHeader />

      <PageWrapper>
        <Container>

          <TopBar>
            <BackLink href="/careers">← All Open Positions</BackLink>
            <SignOutBtn onClick={() => { logout(); router.push('/careers'); }}>Sign Out</SignOutBtn>
          </TopBar>

          {/* Profile card */}
          <ProfileCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileLeft>
              <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
              <ProfileInfo>
                <ProfileName>{user.firstName} {user.lastName}</ProfileName>
                <ProfileMeta>{user.email}</ProfileMeta>
                {user.phone && <ProfileMeta>{user.phone}</ProfileMeta>}
              </ProfileInfo>
            </ProfileLeft>
            <ProfileStats>
              <StatItem>
                <StatNum>{activeApps.length}</StatNum>
                <StatLabel>Active</StatLabel>
              </StatItem>
              <StatDivider />
              <StatItem>
                <StatNum>{applications.length}</StatNum>
                <StatLabel>Total Applied</StatLabel>
              </StatItem>
            </ProfileStats>
          </ProfileCard>

          {/* Applications */}
          <SectionTitle>My Applications</SectionTitle>

          {loading ? (
            <EmptyState>Loading your applications…</EmptyState>
          ) : applications.length === 0 ? (
            <EmptyCard>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyTitle>No applications yet</EmptyTitle>
              <EmptyText>Browse open positions and submit your first application.</EmptyText>
              <BrowseLink href="/careers">Browse Open Positions →</BrowseLink>
            </EmptyCard>
          ) : (
            <>
              {applications.map((app, i) => {
                const s = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.closed;
                const canWithdraw = app.status !== 'withdrawn' && app.status !== 'closed';
                const isConfirming = confirmWithdraw === app.id;
                const isWithdrawing = withdrawingId === app.id;

                return (
                  <AppCard
                    key={app.id}
                    as={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    $withdrawn={app.status === 'withdrawn'}
                  >
                    <AppCardTop>
                      <AppCardMain>
                        <AppPosition>
                          {app.jobId ? (
                            <PositionLink href={`/careers/${app.jobId}`}>
                              {app.jobTitle}
                            </PositionLink>
                          ) : (
                            <PositionText>{app.jobTitle}</PositionText>
                          )}
                          <JobNumberBadge>{app.jobNumber}</JobNumberBadge>
                        </AppPosition>
                        <AppMeta>
                          Applied {formatDate(app.submittedAt)}
                          {app.statusUpdatedAt !== app.submittedAt && (
                            <> · Updated {formatDate(app.statusUpdatedAt)}</>
                          )}
                          {app.location && <> · {app.location}</>}
                        </AppMeta>
                      </AppCardMain>
                      <AppCardRight>
                        <StatusBadge $color={s.color} $bg={s.bg}>{s.label}</StatusBadge>
                        {canWithdraw && (
                          isConfirming ? (
                            <ConfirmRow>
                              <ConfirmText>Withdraw this application?</ConfirmText>
                              <ConfirmBtn
                                onClick={() => handleWithdraw(app.id)}
                                disabled={isWithdrawing}
                              >
                                {isWithdrawing ? 'Withdrawing…' : 'Yes, withdraw'}
                              </ConfirmBtn>
                              <CancelBtn onClick={() => setConfirmWithdraw(null)}>Cancel</CancelBtn>
                            </ConfirmRow>
                          ) : (
                            <WithdrawBtn onClick={() => setConfirmWithdraw(app.id)}>
                              Withdraw
                            </WithdrawBtn>
                          )
                        )}
                      </AppCardRight>
                    </AppCardTop>

                    <AppCardBottom>
                      <DocSection>
                        <DocLabel>Documents submitted:</DocLabel>
                        <DocBadges>
                          {app.hasResume && <DocBadge $present>Resume</DocBadge>}
                          {app.hasCoverLetter && <DocBadge $present>Cover Letter</DocBadge>}
                          {app.hasCerts && <DocBadge $present>Certifications</DocBadge>}
                          {!app.hasResume && !app.hasCoverLetter && !app.hasCerts && (
                            <DocNote>No documents attached</DocNote>
                          )}
                        </DocBadges>
                      </DocSection>
                      {(app.linkedinUrl || app.portfolioUrl) && (
                        <LinkSection>
                          {app.linkedinUrl && (
                            <ProfileLink href={app.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              LinkedIn ↗
                            </ProfileLink>
                          )}
                          {app.portfolioUrl && (
                            <ProfileLink href={app.portfolioUrl} target="_blank" rel="noopener noreferrer">
                              Portfolio ↗
                            </ProfileLink>
                          )}
                        </LinkSection>
                      )}
                    </AppCardBottom>
                  </AppCard>
                );
              })}

              <DocNote style={{ marginTop: '1.5rem', display: 'block', textAlign: 'center' }}>
                Documents are securely stored in our applicant tracking system. To request copies, contact{' '}
                <a href="mailto:careers@preciseanalytics.io" style={{ color: 'rgb(255,125,0)' }}>
                  careers@preciseanalytics.io
                </a>
              </DocNote>
            </>
          )}

          {/* Status legend */}
          {applications.length > 0 && (
            <Legend>
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <LegendItem key={key}>
                  <LegendDot $color={val.color} />
                  {val.label}
                </LegendItem>
              ))}
            </Legend>
          )}

        </Container>
      </PageWrapper>
    </>
  );
}

// ── Styled Components ─────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 3rem 0 6rem;
  min-height: 80vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const BackLink = styled(Link)`
  font-size: 1.5rem;
  color: rgb(255,125,0);
  text-decoration: none;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const SignOutBtn = styled.button`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.5);
  background: none; border: none; cursor: pointer;
  &:hover { color: rgb(var(--text)); text-decoration: underline; }
`;

const ProfileCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  padding: 2.5rem 3rem;
  margin-bottom: 4rem;
  ${media.tablet(`flex-direction: column; align-items: flex-start; padding: 2rem;`)}
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  ${media.tablet(`padding-left: 8rem;`)}
`;

const StatItem = styled.div`
  text-align: center;
`;
const StatNum = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  color: rgb(255,125,0);
  line-height: 1;
`;
const StatLabel = styled.div`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.5);
  margin-top: 0.3rem;
  white-space: nowrap;
`;
const StatDivider = styled.div`
  width: 1px; height: 4rem;
  background: rgba(var(--text), 0.1);
`;

const Avatar = styled.div`
  width: 6rem; height: 6rem;
  border-radius: 50%;
  background: rgb(255,125,0);
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div``;
const ProfileName = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.3rem;
`;
const ProfileMeta = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.6);
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255,125,0,0.2);
`;

const EmptyState = styled.p`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.5);
  padding: 3rem 0;
  text-align: center;
`;

const EmptyCard = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border: 1px dashed rgba(var(--text), 0.15);
  border-radius: 1.2rem;
`;
const EmptyIcon = styled.div`font-size: 4rem; margin-bottom: 1.5rem;`;
const EmptyTitle = styled.h3`font-size: 2rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 0.8rem;`;
const EmptyText = styled.p`font-size: 1.6rem; color: rgba(var(--text), 0.6); margin-bottom: 2rem; line-height: 1.6;`;
const BrowseLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2.4rem;
  background: rgb(255,125,0);
  color: #fff;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  &:hover { background: rgb(230,100,0); }
`;

const AppCard = styled(motion.div)<{ $withdrawn?: boolean }>`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(var(--text), ${p => p.$withdrawn ? '0.06' : '0.1'});
  border-radius: 1.2rem;
  padding: 2rem 2.4rem;
  margin-bottom: 1.6rem;
  opacity: ${p => p.$withdrawn ? 0.6 : 1};
`;

const AppCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.4rem;
  ${media.tablet(`flex-direction: column; gap: 1rem;`)}
`;

const AppCardMain = styled.div`flex: 1;`;

const AppPosition = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const PositionLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(255,125,0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const PositionText = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
`;

const JobNumberBadge = styled.span`
  font-size: 1.1rem;
  font-family: monospace;
  color: rgba(var(--text), 0.4);
  background: rgba(var(--text), 0.06);
  border-radius: 0.4rem;
  padding: 0.2rem 0.6rem;
`;

const AppMeta = styled.div`
  font-size: 1.35rem;
  color: rgba(var(--text), 0.5);
`;

const AppCardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  flex-shrink: 0;
  ${media.tablet(`align-items: flex-start;`)}
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 0.35rem 1.1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  white-space: nowrap;
`;

const WithdrawBtn = styled.button`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.4);
  background: none;
  border: 1px solid rgba(var(--text), 0.15);
  border-radius: 0.5rem;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: #dc2626; border-color: rgba(220,38,38,0.4); }
`;

const ConfirmRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  ${media.tablet(`align-items: flex-start;`)}
`;

const ConfirmText = styled.span`
  font-size: 1.25rem;
  color: #dc2626;
  font-weight: 600;
`;

const ConfirmBtn = styled.button`
  font-size: 1.2rem;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const CancelBtn = styled.button`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.5);
  background: none;
  border: none;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const AppCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(var(--text), 0.06);
  flex-wrap: wrap;
`;

const DocSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const DocLabel = styled.span`
  font-size: 1.25rem;
  color: rgba(var(--text), 0.45);
  white-space: nowrap;
`;

const DocBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DocBadge = styled.span<{ $present: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.25rem 0.8rem;
  border-radius: 0.4rem;
  background: rgba(22, 163, 74, 0.1);
  color: #15803d;
  border: 1px solid rgba(22, 163, 74, 0.2);
`;

const DocNote = styled.span`
  font-size: 1.25rem;
  color: rgba(var(--text), 0.4);
`;

const LinkSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProfileLink = styled.a`
  font-size: 1.3rem;
  color: rgb(255,125,0);
  text-decoration: none;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(var(--text), 0.08);
`;
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  color: rgba(var(--text), 0.65);
`;
const LegendDot = styled.div<{ $color: string }>`
  width: 0.8rem; height: 0.8rem;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

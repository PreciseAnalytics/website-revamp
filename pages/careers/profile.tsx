import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';
import type { ApplicationRecord, ApplicationStatus } from 'lib/applicationsStore';

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
  received:      { label: 'Received',      color: '#2563eb', bg: 'rgba(37,99,235,0.1)'  },
  under_review:  { label: 'Under Review',  color: '#d97706', bg: 'rgba(217,119,6,0.1)'  },
  interview:     { label: 'Interview',     color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  offer:         { label: 'Offer',         color: '#16a34a', bg: 'rgba(22,163,74,0.1)'  },
  closed:        { label: 'Closed',        color: '#6b7280', bg: 'rgba(107,114,128,0.1)'},
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

  useEffect(() => {
    if (!user) { router.replace('/careers'); return; }

    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    })
      .then(r => r.json())
      .then(d => setApplications(d.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

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
            <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
            <ProfileInfo>
              <ProfileName>{user.firstName} {user.lastName}</ProfileName>
              <ProfileMeta>{user.email}{user.phone ? ` · ${user.phone}` : ''}</ProfileMeta>
            </ProfileInfo>
          </ProfileCard>

          {/* Applications */}
          <SectionTitle>My Applications</SectionTitle>

          {loading ? (
            <EmptyState>Loading your applications…</EmptyState>
          ) : applications.length === 0 ? (
            <EmptyCard>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyTitle>No applications yet</EmptyTitle>
              <EmptyText>
                Browse open positions and submit your first application.
              </EmptyText>
              <BrowseLink href="/careers">Browse Open Positions →</BrowseLink>
            </EmptyCard>
          ) : (
            <ApplicationsTable>
              <thead>
                <tr>
                  <Th>Position</Th>
                  <Th $hide="mobile">Job #</Th>
                  <Th>Status</Th>
                  <Th $hide="mobile">Applied</Th>
                  <Th $hide="mobile">Last Update</Th>
                  <Th $hide="mobile">Documents</Th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => {
                  const s = STATUS_CONFIG[app.status];
                  return (
                    <ApplicationRow
                      key={app.id}
                      as={motion.tr}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Td>
                        <PositionTitle>{app.jobTitle}</PositionTitle>
                        <PositionMeta>{app.jobNumber}</PositionMeta>
                      </Td>
                      <Td $hide="mobile">
                        <JobNumber>{app.jobNumber}</JobNumber>
                      </Td>
                      <Td>
                        <StatusBadge $color={s.color} $bg={s.bg}>{s.label}</StatusBadge>
                      </Td>
                      <Td $hide="mobile">{formatDate(app.submittedAt)}</Td>
                      <Td $hide="mobile">{formatDate(app.statusUpdatedAt)}</Td>
                      <Td $hide="mobile">
                        <DocIcons>
                          <DocIcon $has={app.hasResume} title={app.hasResume ? 'Resume submitted' : 'No resume'}>📄</DocIcon>
                          <DocIcon $has={app.hasCoverLetter} title={app.hasCoverLetter ? 'Cover letter submitted' : 'No cover letter'}>✉️</DocIcon>
                          <DocIcon $has={app.hasCerts} title={app.hasCerts ? 'Certifications submitted' : 'No certifications'}>🏅</DocIcon>
                        </DocIcons>
                      </Td>
                    </ApplicationRow>
                  );
                })}
              </tbody>
            </ApplicationsTable>
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
  gap: 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  padding: 2.5rem 3rem;
  margin-bottom: 4rem;
  ${media.tablet(`padding: 2rem;`)}
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
  margin-bottom: 0.4rem;
`;
const ProfileMeta = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.6);
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

const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
`;

const Th = styled.th<{ $hide?: string }>`
  text-align: left;
  padding: 0 1.4rem 1.2rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(var(--text), 0.45);
  border-bottom: 2px solid rgba(var(--text), 0.1);
  ${({ $hide }) => $hide === 'mobile' ? media.tablet(`display: none;`) : ''}
`;

const ApplicationRow = styled.tr`
  border-bottom: 1px solid rgba(var(--text), 0.07);
  transition: background 0.15s;
  &:hover { background: rgba(255,125,0,0.03); }
`;

const Td = styled.td<{ $hide?: string }>`
  padding: 1.8rem 1.4rem;
  vertical-align: middle;
  color: rgba(var(--text), 0.85);
  ${({ $hide }) => $hide === 'mobile' ? media.tablet(`display: none;`) : ''}
`;

const PositionTitle = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.3rem;
`;
const PositionMeta = styled.span`
  display: block;
  font-size: 1.2rem;
  color: rgba(var(--text), 0.4);
  font-family: monospace;
  ${media.tablet(`display: inline;`)}
`;
const JobNumber = styled.span`
  font-size: 1.3rem;
  font-family: monospace;
  color: rgba(var(--text), 0.5);
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 0.35rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  white-space: nowrap;
`;

const DocIcons = styled.div`
  display: flex;
  gap: 0.6rem;
`;
const DocIcon = styled.span<{ $has: boolean }>`
  font-size: 1.6rem;
  opacity: ${p => p.$has ? 1 : 0.2};
  cursor: default;
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

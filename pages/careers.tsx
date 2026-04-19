import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps } from 'next';

import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import AuthModal from 'components/AuthModals';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';

const ATS_API = 'https://precise-analytics-ats.vercel.app/api';

type AuthModalMode = 'login' | 'register' | 'reset' | null;

interface DisplayJob {
  id: string;
  jobNumber: string;
  title: string;
  departmentLabel: string;
  locationLabel: string;
  employmentType: string;
  employmentTypeLabel: string;
  salaryRange?: string | null;
}

interface Props {
  jobs: DisplayJob[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await fetch(`${ATS_API}/jobs`, { next: { revalidate: 0 } } as any);
    if (!res.ok) throw new Error(`ATS API ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.jobs)) {
      const ACTIVE_STATUSES = new Set(['published', 'active']);
      const jobs: DisplayJob[] = data.jobs
        .filter((j: any) => ACTIVE_STATUSES.has(j.status) || j.posted === true)
        .map((j: any) => ({
          id: j.id,
          jobNumber: j.job_number || `PA-${String(j.id).slice(0, 6).toUpperCase()}`,
          title: j.title,
          departmentLabel: j.department || 'General',
          locationLabel: j.location || 'Richmond, VA',
          employmentType: (j.employment_type || j.type || 'full_time').toLowerCase().replace(/\s+/g, '_'),
          employmentTypeLabel: (j.employment_type || j.type || 'Full Time')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c: string) => c.toUpperCase()),
          salaryRange: j.salary_range || null,
        }));
      return { props: { jobs } };
    }
  } catch (e) {
    console.error('Failed to fetch jobs from ATS:', e);
  }
  return { props: { jobs: [] } };
};

export default function CareersPage({ jobs }: Props) {
  const { user, logout } = useAuth();
  const [authModal, setAuthModal] = useState<AuthModalMode>(null);

  const openJobs = jobs;

  return (
    <>
      <Head>
        <title>Careers at Precise Analytics | Data & AI Jobs</title>
        <meta
          name="description"
          content="Browse open positions at Precise Analytics and apply online. Richmond, VA, remote, and hybrid opportunities available."
        />
      </Head>

      <AnimatePresence>
        {authModal && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            onSwitch={setAuthModal}
          />
        )}
      </AnimatePresence>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <AuthBar>
            {user ? (
              <>
                <AuthBarText>
                  Signed in as <strong>{user.firstName} {user.lastName}</strong> ({user.email})
                </AuthBarText>
                <AuthBarProfileLink href="/careers/profile">
                  My Profile &amp; Applications
                </AuthBarProfileLink>
                <AuthBarLink onClick={logout}>Sign out</AuthBarLink>
              </>
            ) : (
              <>
                <AuthBarLeft>
                  <AuthBarText>
                    Have an account? Sign in to apply to any open position.
                  </AuthBarText>
                  <AuthBarBtn onClick={() => setAuthModal('login')}>Sign In</AuthBarBtn>
                </AuthBarLeft>
                <AuthBarBtnPrimary onClick={() => setAuthModal('register')}>
                  Create Account
                </AuthBarBtnPrimary>
              </>
            )}
          </AuthBar>

          <PageHeader>
            <PageHeaderLeft>
              <PageTitle>Work at Precise Analytics</PageTitle>
              <PageSubtitle>
                Richmond, VA &mdash; Remote &amp; Hybrid Roles Available
              </PageSubtitle>
            </PageHeaderLeft>

            <PageHeaderPillars>
              <Pillar>
                <PillarLabel>What We Do</PillarLabel>
                <PillarText>
                  End-to-end data engineering, analytics, and AI solutions for government and
                  commercial clients.
                </PillarText>
              </Pillar>

              <Pillar>
                <PillarLabel>Who We Hire</PillarLabel>
                <PillarText>
                  Data scientists, engineers, AI specialists, and analysts who want their work to
                  matter.
                </PillarText>
              </Pillar>

              <Pillar>
                <PillarLabel>How to Apply</PillarLabel>
                <PillarText>
                  Browse open positions and click <strong>Apply Now</strong> on any role. No
                  account required — just your resume and a few details.
                </PillarText>
              </Pillar>
            </PageHeaderPillars>
          </PageHeader>

          <ContentLayout>
            <Sidebar>
              <SidebarCard>
                <SidebarTitle>Our Work</SidebarTitle>
                <SidebarText>
                  We build data pipelines, analytics platforms, and AI systems for demanding
                  clients — and operate a specialized division supplying skilled AI training talent
                  to leading AI platforms.
                </SidebarText>
              </SidebarCard>

              <SidebarCard>
                <SidebarTitle>Questions?</SidebarTitle>
                <SidebarText>
                  Contact our recruiting team at{' '}
                  <SidebarLink href="mailto:careers@preciseanalytics.io">
                    careers@preciseanalytics.io
                  </SidebarLink>
                </SidebarText>
              </SidebarCard>
            </Sidebar>

            <MainContent>
              <OpenPositionsHeading>Open Positions</OpenPositionsHeading>
              <ResultsBar>
                <ResultsCount>
                  {openJobs.length} open position{openJobs.length !== 1 ? 's' : ''}
                </ResultsCount>
              </ResultsBar>

              {openJobs.length === 0 ? (
                <EmptyState>
                  <EmptyStateTitle>No open positions at this time</EmptyStateTitle>
                  <EmptyStateText>
                    We are always looking for talented people. Send your resume to{' '}
                    <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a>{' '}
                    and we will keep you in mind for future opportunities.
                  </EmptyStateText>
                </EmptyState>
              ) : (
                <JobTable>
                  <JobTableHead>
                    <JobTableHeadRow>
                      <Th>Position</Th>
                      <Th $hide="mobile">Department</Th>
                      <Th $hide="mobile">Location</Th>
                      <Th $hide="mobile">Type</Th>
                      <Th></Th>
                    </JobTableHeadRow>
                  </JobTableHead>

                  <tbody>
                    {openJobs.map((job: any) => (
                      <JobRow key={job.id}>
                        <Td>
                          <JobRowTitle>{job.title}</JobRowTitle>
                          <JobRowMeta>
                            <span>{job.jobNumber}</span>
                            <MobileOnly>
                              {' '}
                              · {job.departmentLabel} · {job.locationLabel}
                            </MobileOnly>
                          </JobRowMeta>
                        </Td>

                        <Td $hide="mobile">{job.departmentLabel}</Td>
                        <Td $hide="mobile">{job.locationLabel}</Td>

                        <Td $hide="mobile">
                          <TypeBadge type={job.employmentType}>
                            {job.employmentTypeLabel}
                          </TypeBadge>
                        </Td>

                        <Td $align="right">
                          <ActionGroup>
                            <ViewLink href={`/careers/${job.id}`}>
                              Details
                            </ViewLink>
                            <ApplyBtn href={`/apply/${job.id}`}>
                              Apply Now
                            </ApplyBtn>
                          </ActionGroup>
                        </Td>
                      </JobRow>
                    ))}
                  </tbody>
                </JobTable>
              )}
            </MainContent>
          </ContentLayout>
        </Container>
      </PageWrapper>
    </>
  );
}

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 4rem 0 6rem;
  min-height: 80vh;
`;

const AuthBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  padding: 1.2rem 1.8rem;
  background: rgba(255, 125, 0, 0.05);
  border: 1px solid rgba(255, 125, 0, 0.15);
  border-radius: 0.8rem;
  margin-bottom: 3rem;
`;

const PageHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 5rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);
  margin-bottom: 3rem;
  ${media.tablet(`flex-direction: column; gap: 2.5rem;`)}
`;

const PageHeaderLeft = styled.div`
  flex: 0 0 26rem;
  ${media.tablet(`flex: unset;`)}
`;

const OpenPositionsHeading = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  ${media.tablet(`font-size: 2rem;`)}
`;

const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
  ${media.tablet(`font-size: 2.6rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.5);
`;

const PageHeaderPillars = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const Pillar = styled.div`
  border-left: 2px solid rgb(255, 125, 0);
  padding-left: 1.4rem;
`;

const PillarLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.6rem;
`;

const PillarText = styled.p`
  font-size: 1.45rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.8);
`;

const AuthBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AuthBarText = styled.p`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.85);
`;

const AuthBarBtn = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: rgb(var(--cardBackground));
  color: rgb(var(--text));
  border: 1.5px solid rgba(var(--text), 0.5);
  border-radius: 0.6rem;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s, background 0.2s;
  &:hover {
    border-color: rgba(var(--text), 0.9);
    background: rgba(var(--text), 0.06);
  }
`;

const AuthBarBtnPrimary = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  &:hover {
    background: rgb(230, 100, 0);
  }
`;

const AuthBarLink = styled.button`
  font-size: 1.3rem;
  color: rgba(var(--text), 0.5);
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: rgb(var(--text));
    text-decoration: underline;
  }
`;

const AuthBarProfileLink = styled(Link)`
  font-size: 1.3rem;
  color: rgb(255, 125, 0);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  ${media.tablet(`flex-direction: column;`)}
`;

const Sidebar = styled.aside`
  flex: 0 0 24rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${media.tablet(`flex: unset; width: 100%;`)}
`;

const SidebarCard = styled.div`
  border-left: 3px solid rgb(255, 125, 0);
  padding: 1.5rem 1.8rem;
`;

const SidebarTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.8rem;
`;

const SidebarText = styled.p`
  font-size: 1.4rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.8);
`;

const SidebarLink = styled.a`
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

const ResultsBar = styled.div`
  margin-bottom: 1.5rem;
`;

const ResultsCount = styled.p`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.5);
`;

const JobTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
`;

const JobTableHead = styled.thead`
  border-bottom: 2px solid rgba(var(--text), 0.15);
`;

const JobTableHeadRow = styled.tr``;

const Th = styled.th<{ $hide?: string }>`
  text-align: left;
  padding: 0 1.4rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(var(--text), 0.45);
  white-space: nowrap;

  ${({ $hide }) => ($hide === 'mobile' ? `${media.tablet(`display: none;`)}` : '')}
`;

const JobRow = styled.tr`
  border-bottom: 1px solid rgba(var(--text), 0.08);
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 125, 0, 0.04);
  }
`;

const Td = styled.td<{ $hide?: string; $align?: string }>`
  padding: 2rem 1.4rem;
  vertical-align: middle;
  color: rgba(var(--text), 0.85);
  font-size: 1.6rem;
  text-align: ${({ $align }) => $align || 'left'};

  ${({ $hide }) => ($hide === 'mobile' ? `${media.tablet(`display: none;`)}` : '')}
`;

const JobRowTitle = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.4rem;
`;

const JobRowMeta = styled.span`
  display: block;
  font-size: 1.3rem;
  color: rgba(var(--text), 0.45);
  font-family: monospace;
`;

const MobileOnly = styled.span`
  display: none;
  ${media.tablet(`display: inline;`)}
`;

const TypeBadge = styled.span<{ type: string }>`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.3rem 0.9rem;
  border-radius: 2rem;
  background: ${({ type }) =>
    type === 'contract' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(34, 197, 94, 0.1)'};
  color: ${({ type }) =>
    type === 'contract' ? 'rgb(99, 102, 241)' : 'rgb(22, 163, 74)'};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const ViewLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: transparent;
  color: rgba(var(--text), 0.7);
  border: 1.5px solid rgba(var(--text), 0.2);
  border-radius: 0.7rem;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: rgba(var(--text), 0.5);
    color: rgb(var(--text));
  }
`;

const ApplyBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border-radius: 0.7rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  padding: 4rem 0;
`;

const EmptyStateTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.6rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.75);

  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

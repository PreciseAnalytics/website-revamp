import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';
import { JOBS, getJobById, Job } from 'lib/jobsData';
import { useAuth } from 'contexts/auth.context';
import AuthModal from 'components/AuthModals';
import { truncateForMeta } from 'utils/seo';

interface Props {
  job: Job;
}

export default function JobDetailPage({ job }: Props) {
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState<'login' | 'register' | 'reset' | null>(null);

  const seoTitle = (() => {
    const suffix = 'Careers | Precise Analytics';
    const maxJobTitleLen = Math.max(20, 60 - (suffix.length + 3)); // " – "
    return `${truncateForMeta(job.title, maxJobTitleLen)} – ${suffix}`;
  })();

  const metaDescription = truncateForMeta(
    `${job.title} — ${job.locationLabel} — ${job.employmentTypeLabel}. ${job.summary}`,
    155
  );



  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'JobPosting',
              title: job.title,
              description: [
                job.description,
                'Responsibilities: ' + job.responsibilities.join('; '),
                'Requirements: ' + job.requirements.join('; '),
              ].join(' '),
              identifier: { '@type': 'PropertyValue', name: 'Precise Analytics', value: job.jobNumber },
              datePosted: job.postedDate,
              employmentType: job.employmentType.toUpperCase().replace('-', '_'),
              hiringOrganization: {
                '@type': 'Organization',
                name: 'Precise Analytics',
                sameAs: 'https://preciseanalytics.io',
              },
              jobLocation: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Richmond',
                  addressRegion: 'VA',
                  addressCountry: 'US',
                },
              },
            }),
          }}
        />
      </Head>

      <AnimatePresence>
        {authModal && (
          <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={setAuthModal} />
        )}
      </AnimatePresence>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/careers">Careers</BreadcrumbLink>
            <BreadcrumbSep>/</BreadcrumbSep>
            <BreadcrumbCurrent>{job.title}</BreadcrumbCurrent>
          </Breadcrumb>

          <TwoColumnLayout>
            {/* ── Sticky sidebar ── */}
            <DetailSidebar>
              <DetailCard>
                <DetailCardTitle>Job Details</DetailCardTitle>
                <DetailRow><DetailLabel>Job Number</DetailLabel><DetailValue>{job.jobNumber}</DetailValue></DetailRow>
                <DetailRow><DetailLabel>Department</DetailLabel><DetailValue>{job.departmentLabel}</DetailValue></DetailRow>
                <DetailRow><DetailLabel>Location</DetailLabel><DetailValue>{job.locationLabel}</DetailValue></DetailRow>
                <DetailRow><DetailLabel>Type</DetailLabel><DetailValue>{job.employmentTypeLabel}</DetailValue></DetailRow>
                {job.clearanceLevel && <DetailRow><DetailLabel>Clearance</DetailLabel><DetailValue>{job.clearanceLevel}</DetailValue></DetailRow>}
                <DetailRow><DetailLabel>Posted</DetailLabel><DetailValue>{formatDate(job.postedDate)}</DetailValue></DetailRow>
              </DetailCard>

              <BackLink href="/careers">&larr; All Open Positions</BackLink>
            </DetailSidebar>

            {/* ── Main content ── */}
            <MainContent>
              <JobHeader>
                <JobDeptLabel>{job.departmentLabel}</JobDeptLabel>
                <JobTitle>{job.title}</JobTitle>
                <JobTagRow>
                  <JobTag>{job.locationLabel}</JobTag>
                  <JobTag>{job.employmentTypeLabel}</JobTag>
                </JobTagRow>
              </JobHeader>

              <RoleDetailsHeading>Role Details for {job.title}</RoleDetailsHeading>

              <Section>
                <SectionTitle>About the {job.title} Role</SectionTitle>
                <SectionParagraph>{job.description}</SectionParagraph>
              </Section>

              <Section>
                <SectionTitle>Key Responsibilities for {job.title}</SectionTitle>
                <BulletList>
                  {job.responsibilities.map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                </BulletList>
              </Section>

              <Section>
                <SectionTitle>Required Qualifications for {job.title}</SectionTitle>
                <BulletList>
                  {job.requirements.map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                </BulletList>
              </Section>

              {job.preferredQualifications.length > 0 && (
                <Section>
                  <SectionTitle>Preferred Qualifications for {job.title}</SectionTitle>
                  <BulletList>
                    {job.preferredQualifications.map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                  </BulletList>
                </Section>
              )}

              {job.benefits.length > 0 && (
                <Section>
                  <SectionTitle>Benefits for {job.title}</SectionTitle>
                  <BulletList>
                    {job.benefits.map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                  </BulletList>
                </Section>
              )}

              <Section>
                <SectionTitle>Why {job.title} at Precise Analytics</SectionTitle>
                <SectionParagraph>
                  Precise Analytics is a veteran-owned data analytics and AI workforce company
                  headquartered in Richmond, VA. We deliver data engineering, business intelligence,
                  and machine learning solutions to government and commercial clients — and we operate
                  a specialized AI Workforce Solutions division that supplies skilled human contributors
                  to leading AI training platforms. We are a SWAM-certified, SBA-recognized small business
                  committed to building a diverse and technically excellent team.
                </SectionParagraph>
                <SectionParagraph>
                  Precise Analytics is an equal opportunity employer. We do not discriminate on the basis
                  of race, color, religion, sex, national origin, age, disability, veteran status, or any
                  other characteristic protected by law.
                </SectionParagraph>
              </Section>

            </MainContent>
          </TwoColumnLayout>

          {/* ── Apply CTA row ── */}
          <ApplyCTARow>
            <ApplyCTALeft>
              <ApplyCTATitle>Ready to apply for {job.title}?</ApplyCTATitle>
              <ApplyCTASub>
                {user
                  ? <>Applying as <strong>{user.firstName} {user.lastName}</strong> &mdash; your details will be pre-filled.</>
                  : <>No account needed &mdash; fill in your details and submit in minutes.</>}
              </ApplyCTASub>
            </ApplyCTALeft>
            <ApplyCTARight>
              <ApplyButton href={`/apply/${job.id}`}>Apply Now &rarr;</ApplyButton>
              {!user && (
                <LoginLink onClick={() => setAuthModal('login')}>
                  Have an account? Sign in to pre-fill
                </LoginLink>
              )}
            </ApplyCTARight>
          </ApplyCTARow>
        </Container>
      </PageWrapper>

    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: JOBS.map((j) => ({ params: { id: j.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const job = getJobById(params?.id as string);
  if (!job) return { notFound: true };
  return { props: { job } };
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 3rem 0 6rem;
  min-height: 80vh;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
  font-size: 1.4rem;
`;
const BreadcrumbLink = styled(Link)`color: rgb(255,125,0); text-decoration: none; &:hover{text-decoration:underline;}`;
const BreadcrumbSep = styled.span`color: rgba(var(--text),0.4);`;
const BreadcrumbCurrent = styled.span`color: rgba(var(--text),0.7);`;

const TwoColumnLayout = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  ${media.tablet(`flex-direction: column-reverse;`)}
`;

const DetailSidebar = styled.aside`
  flex: 0 0 28rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 8rem;
  ${media.tablet(`position: static; flex: unset; width: 100%;`)}
`;

const DetailCard = styled.div`
  border: 1px solid rgba(var(--text),0.1);
  border-radius: 1rem;
  padding: 2rem;
`;
const DetailCardTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255,125,0);
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(var(--text),0.1);
`;
const DetailRow = styled.div`margin-bottom: 1.2rem;`;
const DetailLabel = styled.dt`font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(var(--text),0.45); margin-bottom: 0.2rem;`;
const DetailValue = styled.dd`font-size: 1.4rem; color: rgb(var(--text)); margin: 0;`;

const ApplyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1.2rem 2.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  background: rgb(255,125,0);
  color: #fff;
  border-radius: 0.8rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, transform 0.15s;
  &:hover { background: rgb(230,100,0); transform: translateY(-1px); }
`;
const BackLink = styled(Link)`font-size: 1.4rem; color: rgba(var(--text),0.5); text-decoration: none; &:hover{color:rgb(255,125,0);}`;

const MainContent = styled.article`flex: 1; min-width: 0;`;

const JobHeader = styled.header`
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(var(--text),0.1);
  margin-bottom: 3rem;
`;
const JobDeptLabel = styled.p`font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(255,125,0); margin-bottom: 0.8rem;`;
const JobTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  line-height: 1.2;
  ${media.tablet(`font-size: 2.6rem;`)}
`;
const JobTagRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.8rem;`;
const JobTag = styled.span`
  font-size: 1.3rem; font-weight: 500;
  background: rgba(var(--text),0.07);
  color: rgba(var(--text),0.8);
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(var(--text),0.1);
`;

const RoleDetailsHeading = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const Section = styled.section`margin-bottom: 3rem;`;
const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid rgba(255,125,0,0.25);
`;
const SectionParagraph = styled.p`font-size: 1.6rem; line-height: 1.75; color: rgba(var(--text),0.8); margin-bottom: 1.2rem;`;
const BulletList = styled.ul`list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem;`;
const BulletItem = styled.li`
  font-size: 1.6rem; line-height: 1.65; color: rgba(var(--text),0.8);
  padding-left: 1.8rem; position: relative;
  &::before { content: '–'; position: absolute; left: 0; color: rgb(255,125,0); font-weight: 700; }
`;

const LoginLink = styled.button`font-size: 1.3rem; color: rgb(255,125,0); background: none; border: none; cursor: pointer; text-align: center; &:hover{text-decoration:underline;}`;

const ApplyCTARow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  margin-top: 4rem;
  padding: 2.8rem 3.2rem;
  border: 1px solid rgba(255,125,0,0.25);
  border-radius: 1.2rem;
  background: rgba(255,125,0,0.04);
  ${media.tablet(`flex-direction: column; align-items: flex-start; padding: 2rem;`)}
`;
const ApplyCTALeft = styled.div`flex: 1;`;
const ApplyCTATitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;
const ApplyCTASub = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgba(var(--text),0.7);
`;
const ApplyCTARight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  flex-shrink: 0;
  ${media.tablet(`align-items: flex-start;`)}
`;


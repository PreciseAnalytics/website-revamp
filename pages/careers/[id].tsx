import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { user, logout } = useAuth();
  const [modal, setModal] = useState<'apply' | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'register' | 'reset' | null>(null);

  // apply form — pre-fill phone from profile
  const [applyMessage, setApplyMessage] = useState('');
  const [applyPhone, setApplyPhone] = useState(user?.phone || '');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [certsFile, setCertsFile] = useState<File | null>(null);
  const [applySubmitted, setApplySubmitted] = useState(false);

  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const seoTitle = (() => {
    const suffix = 'Careers | Precise Analytics';
    const maxJobTitleLen = Math.max(20, 60 - (suffix.length + 3)); // " – "
    return `${truncateForMeta(job.title, maxJobTitleLen)} – ${suffix}`;
  })();

  const metaDescription = truncateForMeta(
    `${job.title} — ${job.locationLabel} — ${job.employmentTypeLabel}. ${job.summary}`,
    155
  );

  function openModal(m: 'apply') {
    setAuthError('');
    setModal(m);
  }

  function closeModal() {
    setModal(null);
    setAuthError('');
  }


  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', user ? `${user.firstName} ${user.lastName}` : '');
      fd.append('email', user?.email || '');
      fd.append('phone', applyPhone);
      fd.append('jobTitle', job.title);
      fd.append('jobNumber', job.jobNumber);
      fd.append('coverNote', applyMessage);
      if (resumeFile) fd.append('resume', resumeFile);
      if (coverLetterFile) fd.append('coverLetter', coverLetterFile);
      if (certsFile) fd.append('certifications', certsFile);

      const res = await fetch('/api/submit-application', { method: 'POST', body: fd });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      // Save record to localStorage as applicants log
      const record = {
        name: user ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email,
        phone: applyPhone,
        jobTitle: job.title,
        jobNumber: job.jobNumber,
        submittedAt: new Date().toISOString(),
        hasResume: Boolean(resumeFile),
        hasCoverLetter: Boolean(coverLetterFile),
        hasCerts: Boolean(certsFile),
      };
      const existing = JSON.parse(localStorage.getItem('pa_applications') || '[]');
      existing.push(record);
      localStorage.setItem('pa_applications', JSON.stringify(existing));

      setApplySubmitted(true);
    } catch (err: any) {
      setAuthError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }


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
                {job.travelRequired && <DetailRow><DetailLabel>Travel</DetailLabel><DetailValue>{job.travelRequired}</DetailValue></DetailRow>}
                <DetailRow><DetailLabel>Posted</DetailLabel><DetailValue>{formatDate(job.postedDate)}</DetailValue></DetailRow>
              </DetailCard>

              <ApplyBox>
                {user ? (
                  <>
                    <WelcomeText>Signed in as <strong>{user.firstName} {user.lastName}</strong></WelcomeText>
                    <ApplyButton onClick={() => openModal('apply')}>Apply for This Role</ApplyButton>
                    <LogoutLink onClick={logout}>Sign out</LogoutLink>
                  </>
                ) : (
                  <>
                    <ApplyBoxTitle>Ready to apply?</ApplyBoxTitle>
                    <ApplyBoxSubtitle>Create a free account or sign in to submit your application.</ApplyBoxSubtitle>
                    <ApplyButton onClick={() => setAuthModal('register')}>Create Account &amp; Apply</ApplyButton>
                    <LoginLink onClick={() => setAuthModal('login')}>Already have an account? Sign in</LoginLink>
                  </>
                )}
              </ApplyBox>

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

              {/* Mobile apply CTA */}
              <MobileApplyBox>
                {user ? (
                  <ApplyButton onClick={() => openModal('apply')}>Apply for This Role</ApplyButton>
                ) : (
                  <>
                    <ApplyButton onClick={() => setAuthModal('register')}>Create Account &amp; Apply</ApplyButton>
                    <MobileLoginNote onClick={() => setAuthModal('login')}>Already have an account? Sign in</MobileLoginNote>
                  </>
                )}
              </MobileApplyBox>
            </MainContent>
          </TwoColumnLayout>
        </Container>
      </PageWrapper>

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal === 'apply' && (
          <Overlay onClick={closeModal}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Apply — {job.title}</ModalTitle>
                <ModalClose onClick={closeModal}>&times;</ModalClose>
              </ModalHeader>
              {applySubmitted ? (
                <SuccessBox>
                  <SuccessIcon>&#10003;</SuccessIcon>
                  <SuccessTitle>Application Submitted!</SuccessTitle>
                  <SuccessText>
                    Thank you, <strong>{user?.firstName}</strong>. Our recruiting team will review your
                    application for <strong>{job.title}</strong> ({job.jobNumber}) and be in touch
                    at <strong>{user?.email}</strong>.
                  </SuccessText>
                  <SubmitBtn as="button" onClick={closeModal}>Close</SubmitBtn>
                </SuccessBox>
              ) : (
                <form onSubmit={handleApply}>
                  {authError && <ErrorMsg>{authError}</ErrorMsg>}
                  <ApplyMeta>
                    Applying as <strong>{user?.firstName} {user?.lastName}</strong> ({user?.email}) &nbsp;&middot;&nbsp; Job {job.jobNumber}
                  </ApplyMeta>

                  <Field>
                    <FieldLabel>Phone Number (optional)</FieldLabel>
                    <FieldInput
                      type="tel"
                      value={applyPhone}
                      onChange={e => setApplyPhone(e.target.value)}
                      placeholder="(804) 555-0100"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Resume / CV <RequiredStar>*</RequiredStar></FieldLabel>
                    <FileHint>PDF, DOC, or DOCX — max 10 MB</FileHint>
                    <FieldFileInput
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={e => setResumeFile(e.target.files?.[0] || null)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Cover Letter (optional)</FieldLabel>
                    <FileHint>PDF, DOC, or DOCX — max 10 MB</FileHint>
                    <FieldFileInput
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => setCoverLetterFile(e.target.files?.[0] || null)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Certifications / Additional Documents (optional)</FieldLabel>
                    <FileHint>PDF — max 10 MB</FileHint>
                    <FieldFileInput
                      type="file"
                      accept=".pdf"
                      onChange={e => setCertsFile(e.target.files?.[0] || null)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Cover Note (optional)</FieldLabel>
                    <FieldTextarea
                      rows={4}
                      value={applyMessage}
                      onChange={e => setApplyMessage(e.target.value)}
                      placeholder="Tell us why you are interested in this role and any relevant experience…"
                    />
                  </Field>

                  <ModalActions>
                    <SecondaryBtn type="button" onClick={closeModal}>Cancel</SecondaryBtn>
                    <SubmitBtn type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit Application'}</SubmitBtn>
                  </ModalActions>
                </form>
              )}
            </ModalBox>
          </Overlay>
        )}
      </AnimatePresence>
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

const ApplyBox = styled.div`
  border: 1px solid rgba(255,125,0,0.25);
  border-radius: 1rem;
  padding: 2rem;
  background: rgba(255,125,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ApplyBoxTitle = styled.p`font-size: 1.6rem; font-weight: 700; color: rgb(var(--text)); margin: 0;`;
const ApplyBoxSubtitle = styled.p`font-size: 1.4rem; line-height: 1.6; color: rgba(var(--text),0.7);`;
const WelcomeText = styled.p`font-size: 1.4rem; color: rgba(var(--text),0.75);`;

const ApplyButton = styled.button`
  display: block;
  width: 100%;
  padding: 1.2rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  background: rgb(255,125,0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
  text-align: center;
  &:hover { background: rgb(230,100,0); }
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

const Section = styled.section`margin-bottom: 3rem;`;
const SectionTitle = styled.h2`
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

const MobileApplyBox = styled.div`
  margin-top: 3rem;
  display: none;
  flex-direction: column;
  gap: 1rem;
  ${media.tablet(`display: flex;`)}
`;
const LoginLink = styled.button`font-size: 1.3rem; color: rgb(255,125,0); background: none; border: none; cursor: pointer; text-align: center; &:hover{text-decoration:underline;}`;
const LogoutLink = styled.button`font-size: 1.3rem; color: rgba(var(--text),0.5); background: none; border: none; cursor: pointer; &:hover{color:rgb(var(--text));}`;
const MobileLoginNote = styled.button`font-size: 1.4rem; color: rgb(255,125,0); background: none; border: none; cursor: pointer; text-align: center; &:hover{text-decoration:underline;}`;

// ── Modal styles ──────────────────────────────────────────────────────────────
const Overlay = styled(motion.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: 2rem;
`;

const ModalBox = styled(motion.div).attrs(() => ({
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.18 },
}))`
  background: #fff;
  color: #111;
  border-radius: 1.2rem;
  padding: 3.5rem 4rem;
  max-width: 54rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  ${media.tablet(`padding: 2.5rem 2rem;`)}
`;
const ModalHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;`;
const ModalTitle = styled.h2`font-size: 2.2rem; font-weight: 700; color: #111;`;
const ModalClose = styled.button`background: none; border: none; font-size: 2.8rem; cursor: pointer; color: #888; line-height: 1; &:hover{color:#111;}`;
const ApplyMeta = styled.p`font-size: 1.4rem; color: #555; margin-bottom: 2rem; padding: 1rem 1.4rem; background: #f8f8f8; border-radius: 0.6rem;`;

const Field = styled.div`display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.8rem;`;
const FieldRow = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; ${media.tablet(`grid-template-columns: 1fr;`)}`;
const FieldLabel = styled.label`font-size: 1.4rem; font-weight: 600; color: #222;`;
const FieldInput = styled.input`
  padding: 1rem 1.2rem; font-size: 1.5rem;
  border: 1.5px solid #ddd; border-radius: 0.7rem;
  background: #fff; color: #111;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: rgb(255,125,0); }
`;
const FieldTextarea = styled.textarea`
  padding: 1rem 1.2rem; font-size: 1.5rem;
  border: 1.5px solid #ddd; border-radius: 0.7rem;
  background: #fff; color: #111; resize: vertical;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: rgb(255,125,0); }
`;

const ModalActions = styled.div`display: flex; gap: 1.2rem; justify-content: flex-end; margin-top: 0.5rem;`;
const SubmitBtn = styled.button`
  padding: 1.1rem 2.8rem; font-size: 1.5rem; font-weight: 700;
  background: rgb(255,125,0); color: #fff; border: none; border-radius: 0.8rem;
  cursor: pointer; transition: background 0.2s;
  &:hover:not(:disabled) { background: rgb(230,100,0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const SecondaryBtn = styled.button`
  padding: 1.1rem 2rem; font-size: 1.5rem; font-weight: 600;
  background: transparent; color: #555; border: 1.5px solid #ddd;
  border-radius: 0.8rem; cursor: pointer; transition: border-color 0.2s;
  &:hover { border-color: #999; }
`;
const ModalFooterLink = styled.button`
  display: block; width: 100%; margin-top: 1.5rem;
  font-size: 1.4rem; color: rgb(255,125,0); background: none; border: none;
  cursor: pointer; text-align: center;
  &:hover { text-decoration: underline; }
`;
const ErrorMsg = styled.div`
  background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c;
  padding: 1rem 1.4rem; border-radius: 0.7rem; font-size: 1.4rem; margin-bottom: 1.5rem;
`;

const RequiredStar = styled.span`color: #e53e3e;`;

const FileHint = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin: -0.2rem 0 0.5rem;
`;

const FieldFileInput = styled.input`
  font-size: 1.4rem;
  color: #333;
  padding: 0.8rem 0;
  cursor: pointer;
  &::file-selector-button {
    padding: 0.6rem 1.2rem;
    font-size: 1.3rem;
    font-weight: 600;
    background: #f0f0f0;
    border: 1.5px solid #ccc;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-right: 1rem;
    transition: background 0.2s;
    &:hover { background: #e0e0e0; }
  }
`;

const SuccessBox = styled.div`
  text-align: center; padding: 2rem 0;
  display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
`;
const SuccessIcon = styled.div`
  width: 5rem; height: 5rem; border-radius: 50%;
  background: rgba(34,197,94,0.12); color: rgb(22,163,74);
  font-size: 2.4rem; display: flex; align-items: center; justify-content: center;
`;
const SuccessTitle = styled.h3`font-size: 2rem; font-weight: 700; color: #111;`;
const SuccessText = styled.p`font-size: 1.5rem; line-height: 1.65; color: #444; max-width: 40rem;`;

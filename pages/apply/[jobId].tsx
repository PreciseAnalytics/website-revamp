import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { useAuth } from 'contexts/auth.context';
import { JOBS, getJobById, Job } from 'lib/jobsData';
import { media } from 'utils/media';

interface Props {
  job: Job;
}

export default function ApplyPage({ job }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  // Personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Address / work auth
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [workAuthorized, setWorkAuthorized] = useState('');
  const [visaSponsorship, setVisaSponsorship] = useState('');

  // Files
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [certsFile, setCertsFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Cover note
  const [coverNote, setCoverNote] = useState('');

  // Consent
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);
  const certsRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  // Pre-fill from auth if logged in
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!resumeFile) {
      setError('Please attach your resume — it is required to submit your application.');
      return;
    }
    if (!consent) {
      setError('Please confirm the information is accurate before submitting.');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('firstName', firstName.trim());
      fd.append('lastName', lastName.trim());
      fd.append('name', `${firstName.trim()} ${lastName.trim()}`);
      fd.append('email', email.trim());
      fd.append('phone', phone.trim());
      fd.append('linkedinUrl', linkedinUrl.trim());
      fd.append('portfolioUrl', portfolioUrl.trim());
      fd.append('city', city.trim());
      fd.append('state', state.trim());
      fd.append('zipCode', zipCode.trim());
      fd.append('country', country.trim());
      fd.append('workAuthorized', workAuthorized);
      fd.append('visaSponsorship', visaSponsorship);
      fd.append('jobTitle', job.title);
      fd.append('jobNumber', job.jobNumber);
      fd.append('coverNote', coverNote.trim());
      fd.append('resume', resumeFile);
      if (coverLetterFile) fd.append('coverLetter', coverLetterFile);
      if (certsFile) fd.append('certifications', certsFile);
      if (photoFile) fd.append('photo', photoFile);

      const res = await fetch('/api/submit-application', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again or email apply@preciseanalytics.io.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Apply — {job.title} | Precise Analytics</title>
        <meta name="description" content={`Apply for ${job.title} (${job.jobNumber}) at Precise Analytics.`} />
        <meta name="robots" content="noindex" />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/careers">Careers</BreadcrumbLink>
            <Sep>/</Sep>
            <BreadcrumbLink href={`/careers/${job.id}`}>{job.title}</BreadcrumbLink>
            <Sep>/</Sep>
            <BreadcrumbCurrent>Apply</BreadcrumbCurrent>
          </Breadcrumb>

          {submitted ? (
            <SuccessPanel>
              <SuccessIconWrap>&#10003;</SuccessIconWrap>
              <SuccessTitle>Application Submitted!</SuccessTitle>
              <SuccessBody>
                Thank you, <strong>{firstName}</strong>. We&apos;ve sent a confirmation to{' '}
                <strong>{email}</strong>. Our recruiting team will review your application for{' '}
                <strong>{job.title}</strong> ({job.jobNumber}) and be in touch within 1–5 business days.
              </SuccessBody>
              <SuccessActions>
                <SuccessLink href="/careers">View All Positions</SuccessLink>
                <SuccessLinkSecondary href="/">Return Home</SuccessLinkSecondary>
              </SuccessActions>
            </SuccessPanel>
          ) : (
            <TwoCol>
              {/* ── Sidebar ── */}
              <Sidebar>
                <JobCard>
                  <JobCardLabel>Applying For</JobCardLabel>
                  <JobCardTitle>{job.title}</JobCardTitle>
                  <JobMeta>
                    <JobMetaRow>
                      <MetaIcon>&#128205;</MetaIcon>
                      {job.locationLabel}
                    </JobMetaRow>
                    <JobMetaRow>
                      <MetaIcon>&#128197;</MetaIcon>
                      {job.employmentTypeLabel}
                    </JobMetaRow>
                    <JobMetaRow>
                      <MetaIcon>&#127970;</MetaIcon>
                      {job.departmentLabel}
                    </JobMetaRow>
                    <JobMetaRow>
                      <MetaIcon>#</MetaIcon>
                      {job.jobNumber}
                    </JobMetaRow>
                    {job.salaryRange && (
                      <JobMetaRow>
                        <MetaIcon>&#36;</MetaIcon>
                        {job.salaryRange}
                      </JobMetaRow>
                    )}
                  </JobMeta>
                  <ViewJobLink href={`/careers/${job.id}`}>View Job Details &rarr;</ViewJobLink>
                </JobCard>

                <HelpCard>
                  <HelpTitle>Questions?</HelpTitle>
                  <HelpText>
                    Contact our recruiting team at{' '}
                    <HelpEmail href="mailto:careers@preciseanalytics.io">
                      careers@preciseanalytics.io
                    </HelpEmail>
                  </HelpText>
                </HelpCard>

                <BackLink href="/careers">&larr; All Open Positions</BackLink>
              </Sidebar>

              {/* ── Application Form ── */}
              <FormPanel>
                <FormHeading>Your Application</FormHeading>
                {user ? (
                  <AuthNotice>
                    Signed in as <strong>{user.firstName} {user.lastName}</strong> — your details have been pre-filled.
                  </AuthNotice>
                ) : (
                  <GuestNotice>
                    No account needed. Fill in your details below to apply.{' '}
                    <GuestSignInLink href="/careers">Already have an account? Sign in first to pre-fill.</GuestSignInLink>
                  </GuestNotice>
                )}

                <AppForm onSubmit={handleSubmit} noValidate>

                  {/* ── Section 1: Personal Information ── */}
                  <FormSection>
                    <SectionLabel>Personal Information</SectionLabel>

                    <FieldRow>
                      <FieldGroup>
                        <Label htmlFor="af-first">First Name <Req>*</Req></Label>
                        <Input
                          id="af-first"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          autoComplete="given-name"
                          placeholder="Jane"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-last">Last Name <Req>*</Req></Label>
                        <Input
                          id="af-last"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          autoComplete="family-name"
                          placeholder="Smith"
                        />
                      </FieldGroup>
                    </FieldRow>

                    <FieldRow>
                      <FieldGroup>
                        <Label htmlFor="af-email">Email Address <Req>*</Req></Label>
                        <Input
                          id="af-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                          placeholder="jane@example.com"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-phone">Phone Number <Req>*</Req></Label>
                        <Input
                          id="af-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          autoComplete="tel"
                          placeholder="(555) 555-5555"
                        />
                      </FieldGroup>
                    </FieldRow>
                  </FormSection>

                  {/* ── Section 2: Professional Profiles ── */}
                  <FormSection>
                    <SectionLabel>Professional Profiles</SectionLabel>

                    <FieldGroup>
                      <Label htmlFor="af-linkedin">LinkedIn Profile URL <Opt>(optional)</Opt></Label>
                      <Input
                        id="af-linkedin"
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <Label htmlFor="af-portfolio">Portfolio / Website / GitHub <Opt>(optional)</Opt></Label>
                      <Input
                        id="af-portfolio"
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </FieldGroup>
                  </FormSection>

                  {/* ── Section 3: Location & Work Authorization ── */}
                  <FormSection>
                    <SectionLabel>Location &amp; Work Authorization</SectionLabel>

                    <FieldRow3>
                      <FieldGroup>
                        <Label htmlFor="af-city">City <Opt>(optional)</Opt></Label>
                        <Input
                          id="af-city"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Richmond"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-state">State <Opt>(optional)</Opt></Label>
                        <Input
                          id="af-state"
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="VA"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-zip">ZIP Code <Opt>(optional)</Opt></Label>
                        <Input
                          id="af-zip"
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="23220"
                        />
                      </FieldGroup>
                    </FieldRow3>

                    <FieldGroup>
                      <Label htmlFor="af-country">Country</Label>
                      <Select
                        id="af-country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other</option>
                      </Select>
                    </FieldGroup>

                    <FieldRow>
                      <FieldGroup>
                        <Label htmlFor="af-workauth">Authorized to work in the US? <Req>*</Req></Label>
                        <Select
                          id="af-workauth"
                          value={workAuthorized}
                          onChange={(e) => setWorkAuthorized(e.target.value)}
                          required
                        >
                          <option value="">Select…</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Select>
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-visa">Require visa sponsorship? <Req>*</Req></Label>
                        <Select
                          id="af-visa"
                          value={visaSponsorship}
                          onChange={(e) => setVisaSponsorship(e.target.value)}
                          required
                        >
                          <option value="">Select…</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Select>
                      </FieldGroup>
                    </FieldRow>
                  </FormSection>

                  {/* ── Section 4: Documents ── */}
                  <FormSection>
                    <SectionLabel>Documents &amp; Files</SectionLabel>

                    <FileUploadGroup>
                      <Label>Resume / CV <Req>*</Req></Label>
                      <FileRow>
                        <HiddenInput
                          ref={resumeRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        />
                        <FilePickBtn type="button" $selected={!!resumeFile} onClick={() => resumeRef.current?.click()}>
                          {resumeFile ? `✓  ${resumeFile.name}` : 'Choose file…'}
                        </FilePickBtn>
                        {resumeFile && (
                          <ClearBtn type="button" onClick={() => { setResumeFile(null); if (resumeRef.current) resumeRef.current.value = ''; }}>
                            Remove
                          </ClearBtn>
                        )}
                      </FileRow>
                      <FileHint>PDF, DOC, or DOCX — max 10 MB</FileHint>
                    </FileUploadGroup>

                    <FileUploadGroup>
                      <Label>Cover Letter <Opt>(optional)</Opt></Label>
                      <FileRow>
                        <HiddenInput
                          ref={coverLetterRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
                        />
                        <FilePickBtn type="button" $selected={!!coverLetterFile} onClick={() => coverLetterRef.current?.click()}>
                          {coverLetterFile ? `✓  ${coverLetterFile.name}` : 'Choose file…'}
                        </FilePickBtn>
                        {coverLetterFile && (
                          <ClearBtn type="button" onClick={() => { setCoverLetterFile(null); if (coverLetterRef.current) coverLetterRef.current.value = ''; }}>
                            Remove
                          </ClearBtn>
                        )}
                      </FileRow>
                      <FileHint>PDF, DOC, or DOCX — max 10 MB</FileHint>
                    </FileUploadGroup>

                    <FileUploadGroup>
                      <Label>Certifications / Additional Documents <Opt>(optional)</Opt></Label>
                      <FileRow>
                        <HiddenInput
                          ref={certsRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => setCertsFile(e.target.files?.[0] || null)}
                        />
                        <FilePickBtn type="button" $selected={!!certsFile} onClick={() => certsRef.current?.click()}>
                          {certsFile ? `✓  ${certsFile.name}` : 'Choose file…'}
                        </FilePickBtn>
                        {certsFile && (
                          <ClearBtn type="button" onClick={() => { setCertsFile(null); if (certsRef.current) certsRef.current.value = ''; }}>
                            Remove
                          </ClearBtn>
                        )}
                      </FileRow>
                      <FileHint>PDF, DOC, DOCX, JPG, or PNG — max 10 MB</FileHint>
                    </FileUploadGroup>

                    <FileUploadGroup>
                      <Label>Professional Photo <Opt>(optional)</Opt></Label>
                      <FileRow>
                        <HiddenInput
                          ref={photoRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                        />
                        <FilePickBtn type="button" $selected={!!photoFile} onClick={() => photoRef.current?.click()}>
                          {photoFile ? `✓  ${photoFile.name}` : 'Choose file…'}
                        </FilePickBtn>
                        {photoFile && (
                          <ClearBtn type="button" onClick={() => { setPhotoFile(null); if (photoRef.current) photoRef.current.value = ''; }}>
                            Remove
                          </ClearBtn>
                        )}
                      </FileRow>
                      <FileHint>JPG, PNG, or WEBP — max 5 MB</FileHint>
                    </FileUploadGroup>
                  </FormSection>

                  {/* ── Section 5: Cover Note ── */}
                  <FormSection>
                    <SectionLabel>Why This Role?</SectionLabel>
                    <FieldGroup>
                      <Label htmlFor="af-cover">
                        Tell us why you are interested in this position <Opt>(optional)</Opt>
                      </Label>
                      <Textarea
                        id="af-cover"
                        rows={5}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        maxLength={3000}
                        placeholder="Describe your interest in this role, relevant experience, and anything else you'd like us to know…"
                      />
                      <CharCount>{coverNote.length} / 3,000</CharCount>
                    </FieldGroup>
                  </FormSection>

                  {/* ── Section 6: Consent ── */}
                  <FormSection>
                    <ConsentRow>
                      <ConsentCheck
                        id="af-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <ConsentLabel htmlFor="af-consent">
                        I certify that the information provided in this application is accurate and complete to the best of my knowledge. I understand that false or misleading statements may disqualify my application.
                      </ConsentLabel>
                    </ConsentRow>
                  </FormSection>

                  {error && <ErrorBox>{error}</ErrorBox>}

                  <SubmitRow>
                    <CancelLink href={`/careers/${job.id}`}>
                      &larr; Back to Job Details
                    </CancelLink>
                    <SubmitBtn type="submit" disabled={loading || !consent}>
                      {loading ? 'Submitting…' : 'Submit Application'}
                    </SubmitBtn>
                  </SubmitRow>
                </AppForm>
              </FormPanel>
            </TwoCol>
          )}
        </Container>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: JOBS.map((j) => ({ params: { jobId: j.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const job = getJobById(params?.jobId as string);
  if (!job) return { notFound: true };
  return { props: { job } };
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 3rem 0 7rem;
  min-height: 80vh;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;
const BreadcrumbLink = styled(Link)`
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
const Sep = styled.span`color: rgba(var(--text), 0.35);`;
const BreadcrumbCurrent = styled.span`color: rgba(var(--text), 0.6);`;

const TwoCol = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  ${media.tablet(`flex-direction: column-reverse;`)}
`;

const Sidebar = styled.aside`
  flex: 0 0 28rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 8rem;
  ${media.tablet(`position: static; flex: unset; width: 100%;`)}
`;

const JobCard = styled.div`
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1rem;
  padding: 2rem;
`;
const JobCardLabel = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.6rem;
`;
const JobCardTitle = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;
  line-height: 1.3;
`;
const JobMeta = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
`;
const JobMetaRow = styled.dt`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.75);
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
const MetaIcon = styled.span`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.4);
  flex-shrink: 0;
  width: 1.6rem;
`;
const ViewJobLink = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const HelpCard = styled.div`
  border-left: 3px solid rgb(255, 125, 0);
  padding: 1.4rem 1.6rem;
`;
const HelpTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.6rem;
`;
const HelpText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.75);
`;
const HelpEmail = styled.a`
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const BackLink = styled(Link)`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.5);
  text-decoration: none;
  &:hover { color: rgb(255, 125, 0); }
`;

const FormPanel = styled.div`
  flex: 1;
  min-width: 0;
  background: rgb(var(--cardBackground));
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  padding: 3.2rem 3.6rem;
  ${media.tablet(`padding: 2rem 1.6rem;`)}
`;

const FormHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
  ${media.tablet(`font-size: 2.2rem;`)}
`;

const AuthNotice = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.8);
  background: rgba(34, 197, 94, 0.07);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 0.7rem;
  padding: 1rem 1.4rem;
  margin-bottom: 2.4rem;
`;
const GuestNotice = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.75);
  background: rgba(255, 125, 0, 0.05);
  border: 1px solid rgba(255, 125, 0, 0.15);
  border-radius: 0.7rem;
  padding: 1rem 1.4rem;
  margin-bottom: 2.4rem;
  line-height: 1.6;
`;
const GuestSignInLink = styled(Link)`
  color: rgb(255, 125, 0);
  text-decoration: none;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const AppForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FormSection = styled.section`
  padding: 2.8rem 0;
  border-bottom: 1px solid rgba(var(--text), 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionLabel = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.4rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const FieldRow3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.6rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const Req = styled.span`color: rgb(255, 125, 0); margin-left: 0.2rem;`;
const Opt = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(var(--text), 0.4);
  margin-left: 0.4rem;
`;

const sharedInput = `
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  font-family: inherit;
  color: rgb(var(--text));
  background: rgb(var(--cardBackground));
  border: 1.5px solid rgba(var(--text), 0.3);
  border-radius: 0.7rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.12);
  }
  &::placeholder { color: rgba(var(--text), 0.35); }
`;

const Input = styled.input`${sharedInput}`;
const Select = styled.select`${sharedInput} cursor: pointer; appearance: auto;`;
const Textarea = styled.textarea`${sharedInput} resize: vertical; line-height: 1.65;`;

const CharCount = styled.p`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.35);
  text-align: right;
`;

// File upload
const FileUploadGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const HiddenInput = styled.input`display: none;`;
const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FilePickBtn = styled.button<{ $selected?: boolean }>`
  padding: 0.9rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: ${({ $selected }) => ($selected ? 'rgba(34,197,94,0.12)' : 'rgb(var(--cardBackground))')};
  color: ${({ $selected }) => ($selected ? 'rgb(22,163,74)' : 'rgb(var(--text))')};
  border: 1.5px dashed ${({ $selected }) => ($selected ? 'rgb(34,197,94)' : 'rgba(var(--text),0.35)')};
  border-radius: 0.7rem;
  cursor: pointer;
  max-width: 40rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: border-color 0.2s, background 0.2s;
  &:hover { border-color: rgb(255, 125, 0); background: rgba(255,125,0,0.06); }
`;
const ClearBtn = styled.button`
  font-size: 1.3rem;
  color: rgba(var(--text), 0.4);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: rgb(220, 38, 38); }
`;
const FileHint = styled.p`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.4);
`;

// Consent
const ConsentRow = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
`;
const ConsentCheck = styled.input`
  margin-top: 0.3rem;
  flex-shrink: 0;
  width: 1.8rem;
  height: 1.8rem;
  accent-color: rgb(255, 125, 0);
  cursor: pointer;
`;
const ConsentLabel = styled.label`
  font-size: 1.4rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.8);
  cursor: pointer;
`;

const ErrorBox = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  background: rgb(185, 28, 28);
  border: none;
  border-left: 5px solid rgb(127, 0, 0);
  border-radius: 0.7rem;
  padding: 1.4rem 1.8rem;
  margin-top: 0.8rem;
  line-height: 1.5;
`;

const SubmitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding-top: 2.8rem;
  flex-wrap: wrap;
`;

const CancelLink = styled(Link)`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.55);
  text-decoration: none;
  &:hover { color: rgb(255, 125, 0); }
`;

const SubmitBtn = styled.button`
  padding: 1.2rem 3.2rem;
  font-size: 1.6rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s, transform 0.15s;
  &:hover:not(:disabled) {
    background: rgb(230, 100, 0);
    transform: translateY(-1px);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// Success state
const SuccessPanel = styled.div`
  max-width: 62rem;
  margin: 4rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  padding: 4rem 2rem;
`;
const SuccessIconWrap = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.1);
  color: rgb(22, 163, 74);
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;
const SuccessTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(var(--text));
`;
const SuccessBody = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;
  color: rgba(var(--text), 0.75);
  max-width: 50rem;
`;
const SuccessActions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.8rem;
`;
const SuccessLink = styled(Link)`
  padding: 1rem 2.4rem;
  font-size: 1.5rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: rgb(230, 100, 0); }
`;
const SuccessLinkSecondary = styled(Link)`
  padding: 1rem 2.4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(var(--text), 0.7);
  border: 1.5px solid rgba(var(--text), 0.2);
  border-radius: 0.8rem;
  text-decoration: none;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(var(--text), 0.5); }
`;

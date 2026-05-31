import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';
import { fetchWebsiteJobById, getAtsApiBaseUrl } from 'lib/ats';

const ATS_API = getAtsApiBaseUrl();

interface Props {
  job: {
    id: string;
    jobNumber: string;
    title: string;
    departmentLabel: string;
    locationLabel: string;
    employmentTypeLabel: string;
    salaryRange?: string | null;
    description?: string;
  };
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const CURRENT_YEAR = new Date().getFullYear();
const GRAD_YEARS = Array.from({ length: CURRENT_YEAR - 1969 + 6 }, (_, i) => CURRENT_YEAR + 5 - i);

const DEGREE_OPTIONS = [
  "High School / GED",
  "Associate's",
  "Bachelor's",
  "Master's",
  "MBA",
  "PhD / Doctorate",
  "Professional Degree (JD/MD)",
  "Bootcamp / Certificate",
  "Other",
];

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

  // Education
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

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

  // Resume autofill
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState('');
  const [autofilled, setAutofilled] = useState(false);

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

  async function handleResumeUpload(file: File) {
    setResumeFile(file);
    setParseError('');
    setAutofilled(false);

    const ext = file.name.toLowerCase().split('.').pop() ?? '';
    if (!['pdf', 'doc', 'docx'].includes(ext)) return;

    setParsing(true);
    try {
      const fd = new FormData();
      fd.append('resume', file);
      const res = await fetch('/api/parse-resume', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setParseError(json.error || 'Could not parse resume. Fill in fields manually.');
        return;
      }
      const d = json.data;
      if (d.firstName) setFirstName(d.firstName);
      if (d.lastName) setLastName(d.lastName);
      if (d.email && !user?.email) setEmail(d.email);
      if (d.phone) setPhone(formatPhone(d.phone));
      if (d.linkedinUrl) setLinkedinUrl(d.linkedinUrl);
      if (d.city) setCity(d.city);
      if (d.state) setState(d.state);
      if (d.school) setSchool(d.school);
      if (d.degree && DEGREE_OPTIONS.includes(d.degree)) setDegree(d.degree);
      if (d.fieldOfStudy) setFieldOfStudy(d.fieldOfStudy);
      if (d.graduationYear) setGraduationYear(d.graduationYear);
      setAutofilled(true);
    } catch {
      setParseError('Could not parse resume. Please fill in fields manually.');
    } finally {
      setParsing(false);
    }
  }

  async function uploadToATS(file: File, type: string): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', type);
    const res = await fetch(`${ATS_API}/upload`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error(`File upload failed: ${res.statusText}`);
    const data = await res.json();
    if (!data.success || !data.url) throw new Error(data.error || 'Upload failed');
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Phone: must have at least 10 digits
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Education
    if (!school.trim()) { setError('Please enter your school or institution name.'); return; }
    if (!degree) { setError('Please select your degree.'); return; }
    if (!fieldOfStudy.trim()) { setError('Please enter your field of study or major.'); return; }
    if (!graduationYear) { setError('Please select your graduation year.'); return; }

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
      // 1. Upload files to ATS Blob storage
      let resumeUrl = '';
      let coverLetterUrl = '';
      try {
        resumeUrl = await uploadToATS(resumeFile, 'resume');
        if (coverLetterFile) coverLetterUrl = await uploadToATS(coverLetterFile, 'cover_letter');
      } catch (uploadErr: any) {
        throw new Error(`File upload failed: ${uploadErr.message}. Please try a smaller file or email apply@preciseanalytics.io.`);
      }

      // 2. Submit application to ATS database
      const educationSummary = `${degree} in ${fieldOfStudy.trim()} — ${school.trim()} (${graduationYear})`;
      const atsRes = await fetch(`${ATS_API}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: job.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          linkedin_url: linkedinUrl.trim() || null,
          portfolio_url: portfolioUrl.trim() || null,
          address: `${city.trim()}, ${state.trim()} ${zipCode.trim()}`.trim(),
          city: city.trim(),
          state: state.trim(),
          zip_code: zipCode.trim(),
          country: country.trim(),
          work_authorized: workAuthorized,
          visa_sponsorship: visaSponsorship,
          highest_education: educationSummary,
          why_interested: coverNote.trim(),
          position_applying_for: job.title,
          application_source: 'preciseanalytics.io',
          resume_url: resumeUrl,
          cover_letter_url: coverLetterUrl || null,
          submission_date: new Date().toISOString(),
        }),
      });
      const atsData = await atsRes.json();
      if (!atsRes.ok) throw new Error(atsData.details ? `${atsData.error}: ${atsData.details}` : atsData.error || 'Application submission failed');

      // 3. Send team notification email via local API (non-blocking)
      try {
        const fd = new FormData();
        fd.append('firstName', firstName.trim());
        fd.append('lastName', lastName.trim());
        fd.append('name', `${firstName.trim()} ${lastName.trim()}`);
        fd.append('email', email.trim());
        fd.append('phone', phone.trim());
        fd.append('jobTitle', job.title);
        fd.append('jobNumber', job.jobNumber);
        fd.append('jobId', job.id);
        fd.append('coverNote', coverNote.trim());
        fd.append('education', educationSummary);
        fd.append('city', city.trim());
        fd.append('state', state.trim());
        fd.append('country', country.trim());
        fd.append('workAuthorized', workAuthorized);
        fd.append('visaSponsorship', visaSponsorship);
        fd.append('linkedinUrl', linkedinUrl.trim());
        fd.append('portfolioUrl', portfolioUrl.trim());
        await fetch('/api/submit-application', { method: 'POST', body: fd });
      } catch {}

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
                {user && (
                  <AuthNotice>
                    Signed in as <strong>{user.firstName} {user.lastName}</strong> — your details have been pre-filled.
                  </AuthNotice>
                )}

                {/* ── Resume Quick-Start ── */}
                <ResumeStartBox>
                  <ResumeStartTitle>
                    <span>⚡</span> Start with your resume
                  </ResumeStartTitle>
                  <ResumeStartDesc>
                    Upload a PDF and we&apos;ll autofill the form — no account needed. Review and edit anything before submitting.
                  </ResumeStartDesc>
                  <HiddenInput
                    ref={resumeRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleResumeUpload(file);
                    }}
                  />
                  <ResumeStartRow>
                    <ResumePickBtn
                      type="button"
                      $selected={!!resumeFile}
                      onClick={() => resumeRef.current?.click()}
                      disabled={parsing}
                    >
                      {parsing
                        ? '⏳ Parsing resume…'
                        : resumeFile
                        ? `✓  ${resumeFile.name}`
                        : 'Upload Resume (PDF, DOC, DOCX)'}
                    </ResumePickBtn>
                    {resumeFile && !parsing && (
                      <ClearBtn type="button" onClick={() => {
                        setResumeFile(null);
                        setAutofilled(false);
                        if (resumeRef.current) resumeRef.current.value = '';
                      }}>Remove</ClearBtn>
                    )}
                  </ResumeStartRow>
                  {autofilled && (
                    <AutofillBanner>
                      ✓ Fields autofilled from your resume — review everything below before submitting.
                    </AutofillBanner>
                  )}
                  {parseError && (
                    <ParseErrorMsg>{parseError}</ParseErrorMsg>
                  )}
                  <ResumeHint>PDF works best for autofill. Max 10 MB. Required to apply.</ResumeHint>
                </ResumeStartBox>

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
                          onChange={(e) => setPhone(formatPhone(e.target.value))}
                          required
                          autoComplete="tel"
                          placeholder="(555) 555-5555"
                          maxLength={14}
                          inputMode="tel"
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

                  {/* ── Section 3: Education ── */}
                  <FormSection>
                    <SectionLabel>Education Background</SectionLabel>

                    <FieldRow>
                      <FieldGroup>
                        <Label htmlFor="af-school">School / Institution <Req>*</Req></Label>
                        <Input
                          id="af-school"
                          type="text"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          required
                          placeholder="Virginia Tech"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-degree">Highest Degree <Req>*</Req></Label>
                        <Select
                          id="af-degree"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          required
                        >
                          <option value="">Select degree…</option>
                          <option value="High School / GED">High School / GED</option>
                          <option value="Associate's">Associate&apos;s</option>
                          <option value="Bachelor's">Bachelor&apos;s</option>
                          <option value="Master's">Master&apos;s</option>
                          <option value="MBA">MBA</option>
                          <option value="PhD / Doctorate">PhD / Doctorate</option>
                          <option value="Professional Degree (JD/MD)">Professional Degree (JD/MD)</option>
                          <option value="Bootcamp / Certificate">Bootcamp / Certificate</option>
                          <option value="Other">Other</option>
                        </Select>
                      </FieldGroup>
                    </FieldRow>

                    <FieldRow>
                      <FieldGroup>
                        <Label htmlFor="af-major">Field of Study / Major <Req>*</Req></Label>
                        <Input
                          id="af-major"
                          type="text"
                          value={fieldOfStudy}
                          onChange={(e) => setFieldOfStudy(e.target.value)}
                          required
                          placeholder="Computer Science"
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label htmlFor="af-gradyear">Graduation Year <Req>*</Req></Label>
                        <Select
                          id="af-gradyear"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          required
                        >
                          <option value="">Select year…</option>
                          {GRAD_YEARS.map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </Select>
                      </FieldGroup>
                    </FieldRow>
                  </FormSection>

                  {/* ── Section 4: Location & Work Authorization ── */}
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

                  {/* ── Section 5: Documents ── */}
                  <FormSection>
                    <SectionLabel>Additional Documents</SectionLabel>

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

                  {/* ── Section 6: Cover Note ── */}
                  <FormSection>
                    <SectionLabel>Why This Role?</SectionLabel>
                    <FieldGroup>
                      <Label htmlFor="af-cover">
                        Tell us why you&apos;re interested, relevant experience, and what makes you a strong fit <Opt>(optional — but strongly recommended)</Opt>
                      </Label>
                      <CoverHint>
                        The more detail here, the better we can evaluate your application. Mention anything not captured above — certifications, past projects, why this role fits your goals.
                      </CoverHint>
                      <Textarea
                        id="af-cover"
                        rows={7}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        maxLength={3000}
                        placeholder="Example: I graduated with a Bachelor's in Computer Science from Virginia Tech in 2021. I have 3 years of experience building data pipelines in Python and SQL…"
                      />
                      <CharCount>
                        {coverNote.length} / 3,000
                      </CharCount>
                    </FieldGroup>
                  </FormSection>

                  {/* ── Section 7: Consent ── */}
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const jobId = params?.jobId as string;
  const job = await fetchWebsiteJobById(jobId);
  if (job) {
    return {
      props: {
        job: {
          id: job.id,
          jobNumber: job.jobNumber,
          title: job.title,
          departmentLabel: job.departmentLabel,
          locationLabel: job.locationLabel,
          employmentTypeLabel: job.employmentTypeLabel,
          salaryRange: job.salaryRange || null,
          description: job.description,
        },
      },
    };
  }

  return { notFound: true };
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: 3rem 0 7rem;
  min-height: 80vh;
  background: #f1f5f9;
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
const Sep = styled.span`color: #94a3b8;`;
const BreadcrumbCurrent = styled.span`color: #64748b;`;

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
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  background: #ffffff;
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
  color: #0f172a;
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
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
const MetaIcon = styled.span`
  font-size: 1.2rem;
  color: #94a3b8;
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
  color: #475569;
`;
const HelpEmail = styled.a`
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const BackLink = styled(Link)`
  font-size: 1.4rem;
  color: #64748b;
  text-decoration: none;
  &:hover { color: rgb(255, 125, 0); }
`;

const FormPanel = styled.div`
  flex: 1;
  min-width: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1.2rem;
  padding: 3.2rem 3.6rem;
  ${media.tablet(`padding: 2rem 1.6rem;`)}
`;

const FormHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.2rem;
  ${media.tablet(`font-size: 2.2rem;`)}
`;

const AuthNotice = styled.div`
  font-size: 1.4rem;
  color: #1e293b;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #22c55e;
  border-radius: 0.7rem;
  padding: 1rem 1.4rem;
  margin-bottom: 1.6rem;
`;

const AppForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FormSection = styled.section`
  padding: 2.8rem 0;
  border-bottom: 1px solid #e2e8f0;
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
  color: #1e293b;
`;

const Req = styled.span`color: rgb(255, 125, 0); margin-left: 0.2rem;`;
const Opt = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: #94a3b8;
  margin-left: 0.4rem;
`;

const sharedInput = `
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  font-family: inherit;
  color: #1e293b;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.7rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.12);
  }
  &::placeholder { color: #94a3b8; }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
    -webkit-text-fill-color: #1e293b;
    caret-color: #1e293b;
  }
`;

const Input = styled.input`${sharedInput}`;
const Select = styled.select`${sharedInput} cursor: pointer; appearance: auto;`;
const Textarea = styled.textarea`${sharedInput} resize: vertical; line-height: 1.65;`;

const CharCount = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  text-align: right;
`;

const CoverHint = styled.p`
  font-size: 1.3rem;
  color: #64748b;
  line-height: 1.6;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 0.6rem;
  padding: 0.8rem 1.2rem;
  margin: 0;
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
  background: ${({ $selected }) => ($selected ? '#f0fdf4' : '#f8fafc')};
  color: ${({ $selected }) => ($selected ? '#166534' : '#334155')};
  border: 1.5px dashed ${({ $selected }) => ($selected ? '#86efac' : '#cbd5e1')};
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
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: rgb(220, 38, 38); }
`;
const FileHint = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
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
  color: #334155;
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
  color: #64748b;
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

// Resume quick-start
const ResumeStartBox = styled.div`
  background: #f0f9ff;
  border: 1.5px solid #bae6fd;
  border-radius: 1rem;
  padding: 2rem 2.4rem;
  margin-bottom: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ResumeStartTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0369a1;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
`;
const ResumeStartDesc = styled.p`
  font-size: 1.4rem;
  color: #0c4a6e;
  line-height: 1.6;
  margin: 0;
`;
const ResumeStartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const ResumePickBtn = styled.button<{ $selected?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.45rem;
  font-weight: 700;
  background: ${({ $selected }) => ($selected ? '#f0fdf4' : '#0369a1')};
  color: ${({ $selected }) => ($selected ? '#166534' : '#ffffff')};
  border: 1.5px solid ${({ $selected }) => ($selected ? '#86efac' : '#0369a1')};
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  &:hover:not(:disabled) { background: ${({ $selected }) => ($selected ? '#dcfce7' : '#0284c7')}; }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;
const AutofillBanner = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e293b;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #22c55e;
  border-radius: 0.6rem;
  padding: 0.9rem 1.2rem;
`;
const ParseErrorMsg = styled.p`
  font-size: 1.3rem;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 0.6rem;
  padding: 0.8rem 1.2rem;
  margin: 0;
`;
const ResumeHint = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin: 0;
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
  color: #0f172a;
`;
const SuccessBody = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;
  color: #475569;
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
  color: #475569;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: border-color 0.2s;
  &:hover { border-color: #94a3b8; }
`;

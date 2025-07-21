import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { EnvVars } from 'env';
import { media, mq } from 'utils/media';

const jobs = [
  {
    title: 'Data Analyst',
    location: 'Remote | Full-Time',
    description: 'Analyze complex datasets to generate actionable insights for government and commercial clients.',
    requirements: [
      '2+ years experience in data analytics or BI',
      'Proficient in SQL, Excel, and data visualization tools (Tableau, Power BI)',
      'Strong communication skills',
    ],
  },
  {
    title: 'BI Developer',
    location: 'VA/DC Metro | Hybrid',
    description: 'Develop business intelligence dashboards and reports to support client decision-making.',
    requirements: [
      '3+ years experience in BI development',
      'Experience with Tableau, Power BI, or Looker',
      'Familiarity with relational databases and ETL processes',
    ],
  },
  {
    title: 'Federal Proposal Writer',
    location: 'Remote | Part-Time',
    description: 'Support federal bid development by drafting technical proposals, capability statements, and responses to RFPs.',
    requirements: [
      'Experience writing for government proposals (preferably GSA/SAM/FedBizOpps)',
      'Excellent written communication',
      'Understanding of SDVOSB/small business compliance a plus',
    ],
  },
  {
    title: 'Data Engineer',
    location: 'Remote | Full-Time',
    description: 'Design and maintain scalable data pipelines and infrastructure for analytics workloads.',
    requirements: [
      'Experience with Python, Spark, or similar',
      'Familiarity with cloud platforms (AWS, Azure)',
      'Strong SQL and database optimization skills',
    ],
  },
  {
    title: 'Client Success Manager',
    location: 'Remote | Full-Time',
    description: 'Support long-term success of government and commercial clients by managing project delivery and outcomes.',
    requirements: [
      'Strong communication and project management skills',
      'Experience in analytics or SaaS services',
      'Ability to coordinate with technical teams and clients',
    ],
  },
  {
    title: 'Visualization Specialist',
    location: 'Remote | Contract',
    description: 'Create visually compelling dashboards, infographics, and reports that simplify complex data.',
    requirements: [
      'Advanced knowledge of Power BI or Tableau',
      'Design-first thinking and attention to detail',
      'Experience working with analysts and decision-makers',
    ],
  },
];

interface FormErrors {
  [key: string]: string;
}

export default function CareersPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resume: null as File | null,
    coverLetter: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedInfo, setSubmittedInfo] = useState<{position: string; email: string} | null>(null);

  useEffect(() => setIsClient(true), []);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Don't format if less than 4 digits
    if (phoneNumber.length < 4) return phoneNumber;
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const phoneDigits = formData.phone.replace(/[^\d]/g, '');
      if (phoneDigits.length !== 10) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formData.position) {
      errors.position = 'Please select a position';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please tell us why you are interested in this role';
    }

    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
      errors.resume = 'Resume file must be under 5MB';
    }

    if (formData.coverLetter && formData.coverLetter.size > 5 * 1024 * 1024) {
      errors.coverLetter = 'Cover letter file must be under 5MB';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      let processedValue = value;
      
      // Format phone number as user types
      if (name === 'phone') {
        processedValue = formatPhoneNumber(value);
      }
      
      setFormData({ ...formData, [name]: processedValue });
    }

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'resume' && key !== 'coverLetter' && value) {
          formDataToSend.append(key, value as string);
        }
      });

      // Append files
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      if (formData.coverLetter) {
        formDataToSend.append('coverLetter', formData.coverLetter);
      }

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitSuccess('application-submitted');
      
      // Store submitted info for success message
      setSubmittedInfo({
        position: formData.position,
        email: formData.email
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        resume: null,
        coverLetter: null,
      });

      // Reset file inputs
      const resumeInput = document.getElementById('resume') as HTMLInputElement;
      const coverLetterInput = document.getElementById('coverLetter') as HTMLInputElement;
      if (resumeInput) resumeInput.value = '';
      if (coverLetterInput) coverLetterInput.value = '';

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again or contact us directly at apply@preciseanalytics.io'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setFormData({ ...formData, position: jobTitle });
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Careers`}</title>
        <meta name="description" content="Join the Precise Analytics team and help drive data transformation in mission-driven sectors." />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Join Our Team</PageTitle>
            <PageSubtitle>Empowering missions through data—together.</PageSubtitle>
          </motion.div>

          {/* Open Positions Section */}
          <PositionsSection>
            <SectionTitle>Open Positions</SectionTitle>
            <SectionSubtitle>Explore opportunities to grow your career with us</SectionSubtitle>
            
            <JobCardsGrid>
              {jobs.map((job, index) => (
                <JobCard key={index}>
                  <JobCardHeader>
                    <JobTitle>{job.title}</JobTitle>
                    <JobLocation>{job.location}</JobLocation>
                  </JobCardHeader>
                  
                  <JobDescription>{job.description}</JobDescription>
                  
                  <RequirementsSection>
                    <RequirementsTitle>Key Requirements:</RequirementsTitle>
                    <RequirementsList>
                      {job.requirements.map((req, i) => (
                        <RequirementItem key={i}>{req}</RequirementItem>
                      ))}
                    </RequirementsList>
                  </RequirementsSection>

                  <ApplyButton onClick={() => handleApplyClick(job.title)}>
                    Apply Now
                  </ApplyButton>
                </JobCard>
              ))}
            </JobCardsGrid>
          </PositionsSection>

          {/* Application Form Section */}
          <ApplicationSection id="application-form">
            <FormWrapper>
              <FormTitle>Apply Now</FormTitle>
              <FormSubtitle>Ready to make an impact? Submit your application below.</FormSubtitle>
              
              <ApplicationProcess>
                <ProcessHeader>
                  <ProcessIcon>📋</ProcessIcon>
                  <ProcessTitle>Our Application Process</ProcessTitle>
                </ProcessHeader>
                <ProcessSteps>
                  <ProcessStep>
                    <StepNumber>1</StepNumber>
                    <StepText>Submit your complete application with resume</StepText>
                  </ProcessStep>
                  <ProcessStep>
                    <StepNumber>2</StepNumber>
                    <StepText>Receive confirmation email within 5 minutes</StepText>
                  </ProcessStep>
                  <ProcessStep>
                    <StepNumber>3</StepNumber>
                    <StepText>Initial review by our talent team (1-3 business days)</StepText>
                  </ProcessStep>
                  <ProcessStep>
                    <StepNumber>4</StepNumber>
                    <StepText>Response with next steps (within 5 business days)</StepText>
                  </ProcessStep>
                </ProcessSteps>
                <ProcessNote>
                  <strong>Note:</strong> We review every application personally and provide feedback regardless of the outcome. We believe in treating all candidates with respect and transparency throughout the process.
                </ProcessNote>
              </ApplicationProcess>
              
              {submitSuccess && (
                <ProfessionalSuccessMessage>
                  <SuccessHeader>
                    <SuccessIcon>✅</SuccessIcon>
                    <SuccessTitle>Application Successfully Submitted</SuccessTitle>
                  </SuccessHeader>
                  
                  <SuccessContent>
                    <WelcomeMessage>
                      Thank you for your interest in joining the Precise Analytics team! Your application for the <strong>{submittedInfo?.position || 'selected position'}</strong> has been received and is now under review.
                    </WelcomeMessage>
                    
                    <ProcessTimeline>
                      <TimelineTitle>What Happens Next:</TimelineTitle>
                      <TimelineList>
                        <TimelineItem>
                          <TimelineStep>1</TimelineStep>
                          <TimelineContent>
                            <TimelineLabel>Confirmation Email (Within 5 minutes)</TimelineLabel>
                            <TimelineDescription>You'll receive a detailed confirmation email at {submittedInfo?.email || 'your email address'} with your application details.</TimelineDescription>
                          </TimelineContent>
                        </TimelineItem>
                        
                        <TimelineItem>
                          <TimelineStep>2</TimelineStep>
                          <TimelineContent>
                            <TimelineLabel>Initial Review (1-3 business days)</TimelineLabel>
                            <TimelineDescription>Our talent acquisition team will carefully review your qualifications and experience.</TimelineDescription>
                          </TimelineContent>
                        </TimelineItem>
                        
                        <TimelineItem>
                          <TimelineStep>3</TimelineStep>
                          <TimelineContent>
                            <TimelineLabel>Response & Next Steps (Within 5 business days)</TimelineLabel>
                            <TimelineDescription>We'll contact you with our decision and next steps, whether that's scheduling an interview or providing feedback.</TimelineDescription>
                          </TimelineContent>
                        </TimelineItem>
                      </TimelineList>
                    </ProcessTimeline>
                    
                    <ContactSection>
                      <ContactTitle>Questions or Need Assistance?</ContactTitle>
                      <ContactInfo>
                        <ContactItem>
                          <ContactIcon>📧</ContactIcon>
                          <ContactText>Email us at <a href="mailto:apply@preciseanalytics.io">apply@preciseanalytics.io</a></ContactText>
                        </ContactItem>
                        <ContactItem>
                          <ContactIcon>💼</ContactIcon>
                          <ContactText>Reference ID: PA-{Date.now().toString().slice(-6)}</ContactText>
                        </ContactItem>
                      </ContactInfo>
                    </ContactSection>
                    
                    <AdditionalInfo>
                      <InfoTitle>Good to Know:</InfoTitle>
                      <InfoList>
                        <InfoItem>• We review all applications thoroughly and personally</InfoItem>
                        <InfoItem>• Our process is designed to find the best mutual fit</InfoItem>
                        <InfoItem>• We welcome candidates from diverse backgrounds and experiences</InfoItem>
                        <InfoItem>• Your information is kept confidential throughout the process</InfoItem>
                      </InfoList>
                    </AdditionalInfo>
                    
                    <SubmitAnotherBtn onClick={() => {
                      setSubmitSuccess(null);
                      setSubmittedInfo(null);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        position: '',
                        message: '',
                        resume: null,
                        coverLetter: null,
                      });
                    }}>
                      Submit Another Application
                    </SubmitAnotherBtn>
                  </SuccessContent>
                </ProfessionalSuccessMessage>
              )}

              {submitError && (
                <ProfessionalErrorMessage>
                  <ErrorHeader>
                    <ErrorIcon>⚠️</ErrorIcon>
                    <ErrorTitle>Application Submission Issue</ErrorTitle>
                  </ErrorHeader>
                  <ErrorContent>
                    <ErrorMessage>{submitError}</ErrorMessage>
                    <ErrorGuidance>
                      <GuidanceTitle>What you can do:</GuidanceTitle>
                      <GuidanceList>
                        <li>Please check your internet connection and try again</li>
                        <li>Ensure all required fields are completed</li>
                        <li>Verify your resume file is under 5MB and in PDF, DOC, or DOCX format</li>
                        <li>If the issue persists, email your application directly to <a href="mailto:apply@preciseanalytics.io">apply@preciseanalytics.io</a></li>
                      </GuidanceList>
                    </ErrorGuidance>
                    <ErrorActions>
                      <RetryButton onClick={() => setSubmitError(null)}>
                        Try Again
                      </RetryButton>
                      <EmailButton href="mailto:apply@preciseanalytics.io">
                        Email Application Instead
                      </EmailButton>
                    </ErrorActions>
                  </ErrorContent>
                </ProfessionalErrorMessage>
              )}
              
              <Form onSubmit={handleSubmit}>
                <FormGrid>
                  <FormField>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      placeholder="Enter your first name"
                      required
                    />
                    {formErrors.firstName && <ErrorText>{formErrors.firstName}</ErrorText>}
                  </FormField>
                  
                  <FormField>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      placeholder="Enter your last name"
                      required
                    />
                    {formErrors.lastName && <ErrorText>{formErrors.lastName}</ErrorText>}
                  </FormField>
                </FormGrid>

                <FormField>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    required
                  />
                  {formErrors.email && <ErrorText>{formErrors.email}</ErrorText>}
                </FormField>

                <FormField>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    required
                  />
                  <PhoneNote>US phone number required for contact purposes</PhoneNote>
                  {formErrors.phone && <ErrorText>{formErrors.phone}</ErrorText>}
                </FormField>

                <FormField>
                  <label htmlFor="position">Position of Interest *</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    autoComplete="organization-title"
                    required
                  >
                    <option value="">Select a position...</option>
                    {jobs.map((job, index) => (
                      <option key={index} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                  {formErrors.position && <ErrorText>{formErrors.position}</ErrorText>}
                </FormField>

                <FileUploadGrid>
                  <FileUploadWrapper>
                    <label htmlFor="resume">Resume/CV *</label>
                    <FileInput
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      required
                    />
                    <FileNote>PDF, DOC, or DOCX (max 5MB)</FileNote>
                    {formErrors.resume && <ErrorText>{formErrors.resume}</ErrorText>}
                  </FileUploadWrapper>
                  
                  <FileUploadWrapper>
                    <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                    <FileInput
                      type="file"
                      id="coverLetter"
                      name="coverLetter"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                    />
                    <FileNote>PDF, DOC, or DOCX (max 5MB)</FileNote>
                    {formErrors.coverLetter && <ErrorText>{formErrors.coverLetter}</ErrorText>}
                  </FileUploadWrapper>
                </FileUploadGrid>

                <FormField>
                  <label htmlFor="message">Why are you interested in this role? *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interest in this position and what you'd bring to our team..."
                    minLength={50}
                    required
                  />
                  <MessageNote>Please provide at least 50 characters describing your interest</MessageNote>
                  {formErrors.message && <ErrorText>{formErrors.message}</ErrorText>}
                </FormField>

                <SubmitBtn type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </SubmitBtn>

                <ContactInfo>
                  <p>Questions about the position? Contact us at <a href="mailto:apply@preciseanalytics.io">apply@preciseanalytics.io</a></p>
                </ContactInfo>
                
                <CompanyCommitment>
                  <CommitmentTitle>Our Commitment to You</CommitmentTitle>
                  <CommitmentText>
                    At Precise Analytics, we believe every candidate deserves respect and transparency. 
                    We commit to reviewing your application thoroughly, providing timely communication, 
                    and offering constructive feedback regardless of the outcome. Your time and interest 
                    in our company are valued, and we strive to make this process as positive as possible.
                  </CommitmentText>
                </CompanyCommitment>
              </Form>
            </FormWrapper>
          </ApplicationSection>
        </Container>
      </PageWrapper>
    </>
  );
}

// === Styled Components ===
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 1rem;

  ${mq('<=tablet', 'font-size: 3.6rem;')}
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(var(--text), 0.8);
`;

// Application Form Styles
const ApplicationSection = styled.section`
  margin-bottom: 8rem;
`;

const FormWrapper = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  max-width: 80rem;
  margin: 0 auto;

  ${mq('<=tablet', `
    padding: 3rem 2rem;
  `)}
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const FormSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(var(--text), 0.7);
`;

const ApplicationProcess = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border: 2px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 15px rgba(255, 125, 0, 0.1);
`;

const ProcessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  
  ${mq('<=tablet', `
    flex-direction: column;
    gap: 1rem;
  `)}
`;

const ProcessIcon = styled.div`
  font-size: 2.5rem;
  background: rgba(255, 125, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 125, 0, 0.3);
`;

const ProcessTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin: 0;
  
  ${mq('<=tablet', `
    font-size: 2rem;
  `)}
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    gap: 1rem;
  `)}
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(var(--cardBackground), 0.8);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(var(--cardBackground), 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.15);
  }
`;

const StepNumber = styled.div`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const StepText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  line-height: 1.4;
`;

const ProcessNote = styled.div`
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.5;
  text-align: center;
  
  strong {
    color: rgb(34, 197, 94);
    font-weight: 600;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const FileUploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type='text'],
  input[type='email'],
  input[type='tel'],
  select,
  textarea {
    padding: 1.5rem;
    font-size: 1.6rem;
    border: 2px solid rgba(var(--text), 0.2);
    border-radius: 1rem;
    background: rgba(var(--background), 0.9);
    color: rgb(var(--text));
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: rgb(255, 125, 0);
    }

    &:invalid {
      border-color: #ff6b6b;
    }
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgb(var(--text), 0.8);
    margin-bottom: 0.5rem;
  }
`;

const FileInput = styled.input`
  padding: 1rem !important;
  border: 2px dashed rgba(var(--text), 0.3) !important;
  background: rgba(var(--background), 0.5) !important;

  &::-webkit-file-upload-button {
    background: rgb(255, 125, 0);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-right: 1rem;
  }
`;

const FileNote = styled.small`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  margin-top: 0.5rem;
`;

const ErrorText = styled.span`
  font-size: 1.2rem;
  color: #ff6b6b;
  margin-top: 0.5rem;
`;

const SubmitBtn = styled.button`
  margin-top: 1rem;
  padding: 1.8rem;
  font-size: 1.8rem;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.p<{ success?: boolean; error?: boolean }>`
  font-size: 1.6rem;
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  
  ${props => props.success && `
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    color: #28a745;
  `}
  
  ${props => props.error && `
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.3);
    color: #dc3545;
  `}
`;

const PhoneNote = styled.small`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  margin-top: 0.5rem;
  font-style: italic;
`;

const MessageNote = styled.small`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  margin-top: 0.5rem;
  font-style: italic;
`;

const ContactInfo = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  
  p {
    font-size: 1.4rem;
    color: rgb(var(--text), 0.7);
  }
  
  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CompanyCommitment = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.2rem;
  padding: 2.5rem;
  margin-top: 2.5rem;
  text-align: center;
`;

const CommitmentTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 1.5rem;
`;

const CommitmentText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin: 0;
  font-style: italic;
`;

// Professional Success Message Components
const ProfessionalSuccessMessage = styled.div`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 1.5rem;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
  
  ${mq('<=tablet', `
    padding: 2rem;
    margin: 1rem 0 3rem 0;
  `)}
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(34, 197, 94, 0.2);
  
  ${mq('<=tablet', `
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  `)}
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  background: rgba(34, 197, 94, 0.1);
  padding: 1.5rem;
  border-radius: 50%;
  border: 2px solid rgba(34, 197, 94, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  min-height: 6rem;
`;

const SuccessTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(34, 197, 94);
  margin: 0;
  
  ${mq('<=tablet', `
    font-size: 2.4rem;
  `)}
`;

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const WelcomeMessage = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text));
  margin: 0;
  font-weight: 500;
  
  strong {
    color: rgb(255, 125, 0);
    font-weight: 600;
  }
  
  ${mq('<=tablet', `
    font-size: 1.6rem;
  `)}
`;

const ProcessTimeline = styled.div`
  background: rgba(var(--cardBackground), 0.7);
  border-radius: 1.2rem;
  padding: 2.5rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const TimelineTitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  text-align: center;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  
  ${mq('<=tablet', `
    flex-direction: column;
    align-items: center;
    text-align: center;
  `)}
`;

const TimelineStep = styled.div`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 0.3rem;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineLabel = styled.h5`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 0.8rem;
`;

const TimelineDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.5;
  margin: 0;
`;

const ContactSection = styled.div`
  background: rgba(255, 125, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 125, 0, 0.2);
`;

const ContactTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  ${mq('>=tablet', `
    flex-direction: row;
    justify-content: space-around;
  `)}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  
  ${mq('<=tablet', `
    flex-direction: column;
    gap: 0.5rem;
  `)}
`;

const ContactIcon = styled.span`
  font-size: 1.6rem;
`;

const ContactText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  
  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AdditionalInfo = styled.div`
  border-top: 1px solid rgba(var(--text), 0.1);
  padding-top: 2rem;
`;

const InfoTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  
  ${mq('>=tablet', `
    grid-template-columns: 1fr 1fr;
  `)}
`;

const InfoItem = styled.div`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.4;
`;

const SubmitAnotherBtn = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  padding: 1.4rem 2.8rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 125, 0, 0.3);
  }
  
  ${mq('<=tablet', `
    width: 100%;
  `)}
`;

// Professional Error Message Components
const ProfessionalErrorMessage = styled.div`
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.05));
  border: 2px solid rgba(220, 38, 38, 0.3);
  border-radius: 1.5rem;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
  
  ${mq('<=tablet', `
    padding: 2rem;
    margin: 1rem 0 3rem 0;
  `)}
`;

const ErrorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(220, 38, 38, 0.2);
  
  ${mq('<=tablet', `
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  `)}
`;

const ErrorIcon = styled.div`
  font-size: 2.5rem;
  background: rgba(220, 38, 38, 0.1);
  padding: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(220, 38, 38, 0.3);
`;

const ErrorTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(220, 38, 38);
  margin: 0;
  
  ${mq('<=tablet', `
    font-size: 2.2rem;
  `)}
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  color: rgb(220, 38, 38);
  margin: 0;
  font-weight: 500;
  text-align: center;
  padding: 1.5rem;
  background: rgba(220, 38, 38, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
`;

const ErrorGuidance = styled.div`
  background: rgba(var(--cardBackground), 0.7);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const GuidanceTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const GuidanceList = styled.ul`
  margin: 0;
  padding-left: 2rem;
  
  li {
    font-size: 1.4rem;
    color: rgb(var(--text), 0.8);
    line-height: 1.5;
    margin-bottom: 0.8rem;
    
    a {
      color: rgb(255, 125, 0);
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  
  ${mq('<=tablet', `
    flex-direction: column;
  `)}
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 125, 0, 0.3);
  }
`;

const EmailButton = styled.a`
  background: transparent;
  color: rgb(255, 125, 0);
  border: 2px solid rgb(255, 125, 0);
  padding: 1.2rem 2.4rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgb(255, 125, 0);
    color: white;
    transform: translateY(-2px);
  }
`;

// Positions Section Styles
const PositionsSection = styled.section`
  margin-top: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const SectionSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);
`;

const JobCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const JobCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const JobCardHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(var(--text), 0.1);
`;

const JobTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: rgb(255, 125, 0);
`;

const JobLocation = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 125, 0, 0.1);
  border-radius: 2rem;
  color: rgb(255, 125, 0);
`;

const JobDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);
`;

const RequirementsSection = styled.div`
  margin-top: 2rem;
`;

const RequirementsTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RequirementItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  padding-left: 2rem;
  position: relative;
  color: rgb(var(--text), 0.8);

  &:before {
    content: '•';
    color: rgb(255, 125, 0);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ApplyButton = styled.button`
  margin-top: 2rem;
  padding: 1.2rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: transparent;
  color: rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(255, 125, 0);
    color: white;
    transform: translateY(-2px);
  }
`;
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

      setSubmitSuccess('Your application has been submitted successfully! You should receive a confirmation email shortly.');
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
              
              {submitSuccess && (
                <StatusMessage success>{submitSuccess}</StatusMessage>
              )}

              {submitError && (
                <StatusMessage error>{submitError}</StatusMessage>
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
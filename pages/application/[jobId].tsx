// pages/application/[jobId].tsx - Temporarily disable authentication
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { mq } from 'utils/media';

// ATS API Configuration
const ATS_BASE_URL = 'https://precise-analytics-ats.vercel.app';

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  benefits?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  summary: string;
}

interface ApplicationFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  workAuthorized: string;
  visaSponsorship: string;
  openToRemote: string;
  preferredWorkLocation: string;
  totalExperience: string;
  highestEducation: string;
  positionApplyingFor: string;
  availableStartDate: string;
  expectedSalaryRange: string;
  interviewAvailability: string;
  gender: string;
  raceEthnicity: string;
  veteranStatus: string;
  disabilityStatus: string;
  certificationConsent: boolean;
  signature: string;
  whyInterested: string;
  resume: File | null;
  coverLetter: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function ApplicationPage() {
  const router = useRouter();
  const { jobId } = router.query;

  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    workAuthorized: '',
    visaSponsorship: '',
    openToRemote: '',
    preferredWorkLocation: '',
    totalExperience: '',
    highestEducation: '',
    positionApplyingFor: '',
    availableStartDate: '',
    expectedSalaryRange: '',
    interviewAvailability: '',
    gender: '',
    raceEthnicity: '',
    veteranStatus: '',
    disabilityStatus: '',
    certificationConsent: false,
    signature: '',
    whyInterested: '',
    resume: null,
    coverLetter: null,
  });

  const fetchJobDetails = useCallback(async (id: string) => {
  try {
    setLoading(true);
    setError(null);
    console.log(`🔄 Fetching job details for ID: ${id}`);
    
    // FIXED: Try individual job endpoint first, then fall back to all jobs
    const endpoints = [
      `${ATS_BASE_URL}/api/jobs/${id}`,  // NEW: Individual job endpoint
      `${ATS_BASE_URL}/api/jobs`,        // Fallback to all jobs
    ];
      
      let jobData = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`📊 API Response from ${endpoint}:`, data);
          
          if (endpoint.includes(`/${id}`)) {
            // Individual job endpoint response
            if (data.success && data.job) {
              jobData = data.job;
              break;
            }
          } else {
            // All jobs endpoint - find the specific job
            const jobs = data.success ? data.jobs : (Array.isArray(data) ? data : []);
            jobData = jobs.find((job: any) => job.id === id);
            if (jobData) break;
          }
        }
      } catch (err) {
        console.log(`❌ Endpoint ${endpoint} failed:`, err);
        continue;
      }
    }
    
    if (!jobData) {
      throw new Error('Job not found in any endpoint');
    }

      const processedJob: Position = {
        id: jobData.id,
        title: jobData.title || 'Unknown Position',
        department: jobData.department || '',
        location: jobData.location || '',
        employment_type: jobData.type || jobData.employment_type || 'full_time', // Handle both field names
        description: jobData.description || '',
        requirements: typeof jobData.requirements === 'string' 
          ? jobData.requirements.split('\n').filter((req: string) => req.trim()) 
          : jobData.requirements || [],
        // FIXED: Parse salary_range string into min/max numbers
        salary_min: parseSalaryRange(jobData.salary_range)?.min,
        salary_max: parseSalaryRange(jobData.salary_range)?.max,
        benefits: jobData.benefits || ''
      };

      console.log('✅ Processed job data:', processedJob);
      setPosition(processedJob);
      
      setFormData(prev => ({ 
        ...prev, 
        positionApplyingFor: processedJob.title 
      }));
      
    } catch (error) {
      console.error('❌ Error fetching job details:', error);
      setError(error instanceof Error ? error.message : 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (router.isReady && jobId) {
      console.log('🔍 Router ready, fetching job details');
      fetchJobDetails(jobId as string);
    }
  }, [router.isReady, jobId, fetchJobDetails]);

  // Work Experience Management
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      summary: ''
    };
    setWorkExperiences([...workExperiences, newExperience]);
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setWorkExperiences(workExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
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

    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    
    if (!formData.workAuthorized) errors.workAuthorized = 'Work authorization status is required';
    if (!formData.visaSponsorship) errors.visaSponsorship = 'Visa sponsorship question is required';
    if (!formData.totalExperience) errors.totalExperience = 'Total experience is required';
    if (!formData.highestEducation) errors.highestEducation = 'Education level is required';
    if (!formData.availableStartDate) errors.availableStartDate = 'Start date is required';
    if (!formData.whyInterested.trim()) errors.whyInterested = 'Please tell us why you are interested in this role';
    if (!formData.certificationConsent) errors.certificationConsent = 'You must certify the information is accurate';
    if (!formData.signature.trim()) errors.signature = 'Digital signature is required';
    
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (formData.resume.size > 10 * 1024 * 1024) {
      errors.resume = 'Resume file must be under 10MB';
    }

    if (formData.coverLetter && formData.coverLetter.size > 10 * 1024 * 1024) {
      errors.coverLetter = 'Cover letter file must be under 10MB';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // FIXED: Add this salary parser function
  const parseSalaryRange = (salaryRange: string): { min: number; max: number } | null => {
    if (!salaryRange) return null;
    
    // Extract numbers from strings like "$70,000 – $90,000/year" or "$110,000 – $140,000 per year (DOE)"
    const numbers = salaryRange.match(/\$[\d,]+/g);
    if (numbers && numbers.length >= 2) {
      const min = parseInt(numbers[0].replace(/[$,]/g, ''));
      const max = parseInt(numbers[1].replace(/[$,]/g, ''));
      return { min, max };
    }
    
    // Single number case
    if (numbers && numbers.length === 1) {
      const amount = parseInt(numbers[0].replace(/[$,]/g, ''));
      return { min: amount, max: amount };
    }
    
    return null;
  };



  const uploadFile = async (file: File, type: string): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('type', type);

    const response = await fetch(`${ATS_BASE_URL}/api/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'File upload failed');
    }
    
    return result.url;
  };

  const handleChange = (e: any) => {
    const { name, value, files, type, checked } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      let processedValue = value;
      
      if (name === 'phone') {
        processedValue = formatPhoneNumber(value);
      }

      setFormData({ ...formData, [name]: processedValue });
    }

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !position) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('🚀 Starting comprehensive application submission...');
      
      // Upload files
      let resumeUrl = '';
      let coverLetterUrl = '';

      if (formData.resume) {
        resumeUrl = await uploadFile(formData.resume, 'resume');
      }

      if (formData.coverLetter) {
        coverLetterUrl = await uploadFile(formData.coverLetter, 'cover_letter');
      }

      const applicationData = {
        job_id: position.id,
        first_name: formData.firstName.trim(),
        middle_name: formData.middleName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        linkedin_url: formData.linkedinUrl.trim(),
        portfolio_url: formData.portfolioUrl.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zipCode.trim(),
        country: formData.country.trim(),
        work_authorized: formData.workAuthorized,
        visa_sponsorship: formData.visaSponsorship,
        open_to_remote: formData.openToRemote,
        preferred_work_location: formData.preferredWorkLocation,
        total_experience: formData.totalExperience,
        highest_education: formData.highestEducation,
        position_applying_for: formData.positionApplyingFor,
        available_start_date: formData.availableStartDate,
        expected_salary_range: formData.expectedSalaryRange,
        interview_availability: formData.interviewAvailability,
        gender: formData.gender,
        race_ethnicity: formData.raceEthnicity,
        veteran_status: formData.veteranStatus,
        disability_status: formData.disabilityStatus,
        signature: formData.signature.trim(),
        why_interested: formData.whyInterested.trim(),
        resume_url: resumeUrl,
        cover_letter_url: coverLetterUrl,
        work_experiences: JSON.stringify(workExperiences),
        submission_date: new Date().toISOString()
      };

      console.log('📤 Submitting application data:', applicationData);

      const response = await fetch(`${ATS_BASE_URL}/api/applications`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      setSubmitSuccess(true);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'comprehensive_application_submitted', {
          'job_position': position.title,
          'job_id': position.id,
          'application_source': 'comprehensive_application_page',
          'application_id': result.application?.id,
          'work_experiences_count': workExperiences.length
        });
      }

    } catch (error) {
      console.error('❌ Application submission error:', error);
      
      let errorMessage = 'An unexpected error occurred. Please try again or contact us directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          errorMessage = 'The selected position is no longer available.';
        } else if (error.message.includes('upload')) {
          errorMessage = 'File upload failed. Please check your files and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Application - {EnvVars.SITE_NAME}</title>
        </Head>
        <AnimatedHeader />
        <PageWrapper>
          <Container>
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>Loading job details...</LoadingText>
              <DebugInfo>
                <p><strong>JobId:</strong> {jobId}</p>
                <p><strong>API Base:</strong> {ATS_BASE_URL}</p>
              </DebugInfo>
            </LoadingContainer>
          </Container>
        </PageWrapper>
      </>
    );
  }

  // Error state
  if (error || !position) {
    return (
      <>
        <Head>
          <title>Job Not Found - {EnvVars.SITE_NAME}</title>
        </Head>
        <AnimatedHeader />
        <PageWrapper>
          <Container>
            <ErrorContainer>
              <ErrorIcon>❌</ErrorIcon>
              <ErrorTitle>Job Not Found</ErrorTitle>
              <ErrorText>{error || 'The requested position could not be found.'}</ErrorText>
              <DebugInfo>
                <h4>Debug Information:</h4>
                <p><strong>JobId:</strong> {jobId}</p>
                <p><strong>API Base URL:</strong> {ATS_BASE_URL}</p>
                <p><strong>Error:</strong> {error}</p>
                <p><strong>Trying endpoints:</strong></p>
                <ul>
                  <li>{ATS_BASE_URL}/api/jobs/{jobId}</li>
                  <li>{ATS_BASE_URL}/api/job/{jobId}</li>
                  <li>{ATS_BASE_URL}/api/jobs?id={jobId}</li>
                </ul>
              </DebugInfo>
              <BackButton onClick={() => router.push('/careers')}>
                ← Back to Careers
              </BackButton>
            </ErrorContainer>
          </Container>
        </PageWrapper>
      </>
    );
  }

  // Success state
  if (submitSuccess) {
    return (
      <>
        <Head>
          <title>Application Submitted - {EnvVars.SITE_NAME}</title>
        </Head>
        <AnimatedHeader />
        <PageWrapper>
          <Container>
            <SuccessContainer>
              <SuccessIcon>✅</SuccessIcon>
              <SuccessTitle>Application Successfully Submitted!</SuccessTitle>
              <SuccessMessage>
                Thank you for your comprehensive application for <strong>{position.title}</strong>. 
                We have received all your information and will review it carefully.
              </SuccessMessage>
              <SuccessDetails>
                <p><strong>What happens next:</strong></p>
                <ul>
                  <li>You&apos;ll receive a confirmation email within 5 minutes</li>
                  <li>Our team will review your application within 1-3 business days</li>
                  <li>We&apos;ll contact you with next steps within 5 business days</li>
                </ul>
              </SuccessDetails>
              <ContactInfo>
                Questions? Contact us at <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a>
              </ContactInfo>
              <BackButton onClick={() => window.close()}>
                Close Window
              </BackButton>
            </SuccessContainer>
          </Container>
        </PageWrapper>
      </>
    );
  }

  const salaryRange = position.salary_min && position.salary_max 
    ? `$${position.salary_min.toLocaleString()} - $${position.salary_max.toLocaleString()}`
    : '';

  return (
    <>
      <Head>
        <title>Apply for {position.title} - {EnvVars.SITE_NAME}</title>
        <meta name="description" content={`Apply for ${position.title} position at Precise Analytics`} />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          {/* Complete Job Details */}
          <JobDetailsSection>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <JobDetailsHeader>
                <JobDetailsIcon>📋</JobDetailsIcon>
                <JobDetailsHeaderText>Complete Job Details</JobDetailsHeaderText>
              </JobDetailsHeader>
              <JobTitle>{position.title}</JobTitle>
              <JobMeta>
                {position.department && (
                  <JobMetaItem>🏢 {position.department}</JobMetaItem>
                )}
                {position.location && (
                  <JobMetaItem>📍 {position.location}</JobMetaItem>
                )}
                {position.employment_type && (
                  <JobMetaItem>💼 {position.employment_type.replace('_', ' ').toUpperCase()}</JobMetaItem>
                )}
                {salaryRange && (
                  <JobMetaItem>💰 {salaryRange}</JobMetaItem>
                )}
              </JobMeta>
              <JobDescription>{position.description}</JobDescription>
              
              {/* Job Overview */}
              <JobOverviewSection>
                <JobOverviewTitle>Position Overview</JobOverviewTitle>
                <JobOverviewGrid>
                  <OverviewItem>
                    <OverviewLabel>Department</OverviewLabel>
                    <OverviewValue>{position.department || 'Not specified'}</OverviewValue>
                  </OverviewItem>
                  <OverviewItem>
                    <OverviewLabel>Location</OverviewLabel>
                    <OverviewValue>{position.location || 'Location TBD'}</OverviewValue>
                  </OverviewItem>
                  <OverviewItem>
                    <OverviewLabel>Employment Type</OverviewLabel>
                    <OverviewValue>{position.employment_type?.replace('_', ' ').toUpperCase() || 'Full-time'}</OverviewValue>
                  </OverviewItem>
                  <OverviewItem>
                    <OverviewLabel>Salary Range</OverviewLabel>
                    <OverviewValue>
                      {position.salary_min && position.salary_max 
                        ? `${position.salary_min.toLocaleString()} - ${position.salary_max.toLocaleString()}`
                        : 'Competitive salary'
                      }
                    </OverviewValue>
                  </OverviewItem>
                </JobOverviewGrid>
              </JobOverviewSection>
              
              {/* Requirements Section */}
              {position.requirements && position.requirements.length > 0 && (
                <JobRequirementsSection>
                  <RequirementsSectionTitle>Requirements & Qualifications</RequirementsSectionTitle>
                  <JobRequirementsList>
                    {position.requirements.map((req, index) => (
                      <JobRequirementItem key={index}>{req}</JobRequirementItem>
                    ))}
                  </JobRequirementsList>
                </JobRequirementsSection>
              )}

              {/* Benefits Section */}
              {position.benefits && (
                <JobBenefitsSection>
                  <BenefitsSectionTitle>Benefits & Compensation</BenefitsSectionTitle>
                  <JobBenefitsText>{position.benefits}</JobBenefitsText>
                </JobBenefitsSection>
              )}

              {/* Ready to Apply CTA */}
              <ReadyToApplySection>
                <ReadyToApplyIcon>🚀</ReadyToApplyIcon>
                <ReadyToApplyText>
                  Ready to join our mission-driven team? Complete the application below to get started!
                </ReadyToApplyText>
              </ReadyToApplySection>
            </motion.div>
          </JobDetailsSection>

          {/* Application Form */}
          <ApplicationSection>
            <FormTitle>Complete Your Application</FormTitle>
            <FormSubtitle>
              Please fill out all required fields marked with an asterisk (*). 
              We review every application personally and will respond within 5 business days.
            </FormSubtitle>

            {submitError && (
              <ErrorMessage>
                <ErrorIcon>⚠️</ErrorIcon>
                <ErrorText>{submitError}</ErrorText>
                <RetryButton onClick={() => setSubmitError(null)}>Try Again</RetryButton>
              </ErrorMessage>
            )}

            <ApplicationForm onSubmit={handleSubmit}>
              {/* 1. Personal Information */}
              <SectionHeader>
                <SectionIcon>👤</SectionIcon>
                <SectionTitle>1. Personal Information</SectionTitle>
              </SectionHeader>
              
              <FormGrid>
                <FormField>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.firstName && <FieldError>{formErrors.firstName}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </FormField>
                
                <FormField>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.lastName && <FieldError>{formErrors.lastName}</FieldError>}
                </FormField>
              </FormGrid>

              <FormGrid>
                <FormField>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={14}
                    required
                  />
                  {formErrors.phone && <FieldError>{formErrors.phone}</FieldError>}
                </FormField>
              </FormGrid>

              <FormGrid>
                <FormField>
                  <label htmlFor="linkedinUrl">LinkedIn Profile</label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </FormField>
                
                <FormField>
                  <label htmlFor="portfolioUrl">Portfolio / GitHub / Website</label>
                  <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                  />
                </FormField>
              </FormGrid>

              {/* 2. Location & Work Eligibility */}
              <SectionHeader>
                <SectionIcon>📍</SectionIcon>
                <SectionTitle>2. Location & Work Eligibility</SectionTitle>
              </SectionHeader>

              <FormField>
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {formErrors.address && <FieldError>{formErrors.address}</FieldError>}
              </FormField>

              <FormGrid>
                <FormField>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.city && <FieldError>{formErrors.city}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="state">State/Province *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.state && <FieldError>{formErrors.state}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="zipCode">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.zipCode && <FieldError>{formErrors.zipCode}</FieldError>}
                </FormField>
              </FormGrid>

              <FormField>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>

              <FormGrid>
                <FormField>
                  <label htmlFor="workAuthorized">Are you authorized to work in the United States? *</label>
                  <select
                    id="workAuthorized"
                    name="workAuthorized"
                    value={formData.workAuthorized}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {formErrors.workAuthorized && <FieldError>{formErrors.workAuthorized}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="visaSponsorship">Will you now or in the future require visa sponsorship? *</label>
                  <select
                    id="visaSponsorship"
                    name="visaSponsorship"
                    value={formData.visaSponsorship}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {formErrors.visaSponsorship && <FieldError>{formErrors.visaSponsorship}</FieldError>}
                </FormField>
              </FormGrid>

              <FormGrid>
                <FormField>
                  <label htmlFor="openToRemote">Are you open to remote work?</label>
                  <select
                    id="openToRemote"
                    name="openToRemote"
                    value={formData.openToRemote}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </FormField>
                
                <FormField>
                  <label htmlFor="preferredWorkLocation">Preferred Work Location</label>
                  <select
                    id="preferredWorkLocation"
                    name="preferredWorkLocation"
                    value={formData.preferredWorkLocation}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="remote">Remote</option>
                    <option value="on_site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </FormField>
              </FormGrid>

              {/* 3. Employment Information */}
              <SectionHeader>
                <SectionIcon>💼</SectionIcon>
                <SectionTitle>3. Employment Information</SectionTitle>
              </SectionHeader>

              <FormGrid>
                <FormField>
                  <label htmlFor="totalExperience">Total Years of Professional Experience *</label>
                  <select
                    id="totalExperience"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {formErrors.totalExperience && <FieldError>{formErrors.totalExperience}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="highestEducation">Highest Level of Education *</label>
                  <select
                    id="highestEducation"
                    name="highestEducation"
                    value={formData.highestEducation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="high_school">High School</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate/PhD</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.highestEducation && <FieldError>{formErrors.highestEducation}</FieldError>}
                </FormField>
              </FormGrid>

              {/* Work Experience Section */}
              <WorkExperienceSection>
                <WorkExperienceHeader>
                  <h4>Work Experience</h4>
                  <AddButton type="button" onClick={addWorkExperience}>
                    <span>+</span> Add Experience
                  </AddButton>
                </WorkExperienceHeader>
                
                {workExperiences.map((experience, index) => (
                  <WorkExperienceCard key={experience.id}>
                    <WorkExperienceTitle>
                      <span>Experience {index + 1}</span>
                      <RemoveButton type="button" onClick={() => removeWorkExperience(experience.id)}>
                        Remove
                      </RemoveButton>
                    </WorkExperienceTitle>
                    
                    <FormGrid>
                      <FormField>
                        <label>Company *</label>
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                          placeholder="Company name"
                        />
                      </FormField>
                      
                      <FormField>
                        <label>Job Title *</label>
                        <input
                          type="text"
                          value={experience.jobTitle}
                          onChange={(e) => updateWorkExperience(experience.id, 'jobTitle', e.target.value)}
                          placeholder="Your job title"
                        />
                      </FormField>
                    </FormGrid>
                    
                    <FormGrid>
                      <FormField>
                        <label>Start Date *</label>
                        <input
                          type="month"
                          value={experience.startDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                        />
                      </FormField>
                      
                      <FormField>
                        <label>End Date</label>
                        <input
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          disabled={experience.currentJob}
                        />
                      </FormField>
                    </FormGrid>
                    
                    <CheckboxField>
                      <input
                        type="checkbox"
                        checked={experience.currentJob}
                        onChange={(e) => updateWorkExperience(experience.id, 'currentJob', e.target.checked)}
                      />
                      <label>This is my current job</label>
                    </CheckboxField>
                    
                    <FormField>
                      <label>Summary of responsibilities and achievements *</label>
                      <textarea
                        rows={4}
                        value={experience.summary}
                        onChange={(e) => updateWorkExperience(experience.id, 'summary', e.target.value)}
                        placeholder="Describe what you did in this role, key responsibilities, and major achievements..."
                      />
                    </FormField>
                  </WorkExperienceCard>
                ))}
              </WorkExperienceSection>

              {/* File Uploads */}
              <SectionHeader>
                <SectionIcon>📎</SectionIcon>
                <SectionTitle>Resume & Cover Letter</SectionTitle>
              </SectionHeader>

              <FileUploadGrid>
                <FormField>
                  <label htmlFor="resume">Resume/CV *</label>
                  <FileInput
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    required
                  />
                  <FileNote>PDF, DOC, or DOCX (max 10MB)</FileNote>
                  {formErrors.resume && <FieldError>{formErrors.resume}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                  <FileInput
                    type="file"
                    id="coverLetter"
                    name="coverLetter"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                  />
                  <FileNote>PDF, DOC, or DOCX (max 10MB)</FileNote>
                  {formErrors.coverLetter && <FieldError>{formErrors.coverLetter}</FieldError>}
                </FormField>
              </FileUploadGrid>

              {/* 4. Job Preferences */}
              <SectionHeader>
                <SectionIcon>💰</SectionIcon>
                <SectionTitle>4. Job Preferences</SectionTitle>
              </SectionHeader>

              <FormField>
                <label htmlFor="positionApplyingFor">Position You're Applying For</label>
                <input
                  type="text"
                  id="positionApplyingFor"
                  name="positionApplyingFor"
                  value={formData.positionApplyingFor}
                  onChange={handleChange}
                  readOnly
                />
              </FormField>

              <FormGrid>
                <FormField>
                  <label htmlFor="availableStartDate">Available Start Date *</label>
                  <input
                    type="date"
                    id="availableStartDate"
                    name="availableStartDate"
                    value={formData.availableStartDate}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.availableStartDate && <FieldError>{formErrors.availableStartDate}</FieldError>}
                </FormField>
                
                <FormField>
                  <label htmlFor="expectedSalaryRange">Expected Salary Range</label>
                  <input
                    type="text"
                    id="expectedSalaryRange"
                    name="expectedSalaryRange"
                    value={formData.expectedSalaryRange}
                    onChange={handleChange}
                    placeholder="e.g., $75,000 - $85,000"
                  />
                </FormField>
              </FormGrid>

              <FormField>
                <label htmlFor="interviewAvailability">Availability for Interviews</label>
                <textarea
                  id="interviewAvailability"
                  name="interviewAvailability"
                  rows={3}
                  value={formData.interviewAvailability}
                  onChange={handleChange}
                  placeholder="Please let us know your general availability for interviews (days of week, time preferences, etc.)"
                />
              </FormField>

              {/* Why Interested */}
              <SectionHeader>
                <SectionIcon>✍️</SectionIcon>
                <SectionTitle>Why This Role?</SectionTitle>
              </SectionHeader>

              <FormField>
                <label htmlFor="whyInterested">Why are you interested in this role? *</label>
                <textarea
                  id="whyInterested"
                  name="whyInterested"
                  rows={5}
                  value={formData.whyInterested}
                  onChange={handleChange}
                  placeholder="Tell us what excites you about this opportunity and what you'd bring to our team..."
                  required
                />
                {formErrors.whyInterested && <FieldError>{formErrors.whyInterested}</FieldError>}
              </FormField>

              {/* 5. Equal Opportunity (Optional) */}
              <SectionHeader>
                <SectionIcon>♿</SectionIcon>
                <SectionTitle>5. Equal Opportunity Information (Optional & Confidential)</SectionTitle>
              </SectionHeader>
              
              <EqualOpportunityNote>
                The following information is requested for equal opportunity monitoring purposes only. 
                Completion is voluntary and will not affect your application.
              </EqualOpportunityNote>

              <FormGrid>
                <FormField>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to answer</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>
                
                <FormField>
                  <label htmlFor="raceEthnicity">Race/Ethnicity</label>
                  <select
                    id="raceEthnicity"
                    name="raceEthnicity"
                    value={formData.raceEthnicity}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to answer</option>
                    <option value="american_indian">American Indian or Alaska Native</option>
                    <option value="asian">Asian</option>
                    <option value="black">Black or African American</option>
                    <option value="hispanic">Hispanic or Latino</option>
                    <option value="pacific_islander">Native Hawaiian or Pacific Islander</option>
                    <option value="white">White</option>
                    <option value="two_or_more">Two or more races</option>
                  </select>
                </FormField>
              </FormGrid>

              <FormGrid>
                <FormField>
                  <label htmlFor="veteranStatus">Veteran Status</label>
                  <select
                    id="veteranStatus"
                    name="veteranStatus"
                    value={formData.veteranStatus}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to answer</option>
                    <option value="veteran">Veteran</option>
                    <option value="not_veteran">Not a veteran</option>
                  </select>
                </FormField>
                
                <FormField>
                  <label htmlFor="disabilityStatus">Disability Status</label>
                  <select
                    id="disabilityStatus"
                    name="disabilityStatus"
                    value={formData.disabilityStatus}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to answer</option>
                    <option value="yes">Yes, I have a disability</option>
                    <option value="no">No, I do not have a disability</option>
                  </select>
                </FormField>
              </FormGrid>

              {/* 6. Consent & Submission */}
              <SectionHeader>
                <SectionIcon>✅</SectionIcon>
                <SectionTitle>6. Consent & Submission</SectionTitle>
              </SectionHeader>

              <CheckboxField>
                <input
                  type="checkbox"
                  id="certificationConsent"
                  name="certificationConsent"
                  checked={formData.certificationConsent}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="certificationConsent">
                  I certify that the information provided is true and complete to the best of my knowledge. 
                  I understand that any false information may lead to rejection of my application or termination of employment.
                </label>
                {formErrors.certificationConsent && <FieldError>{formErrors.certificationConsent}</FieldError>}
              </CheckboxField>

              <FormGrid>
                <FormField>
                  <label htmlFor="signature">Digital Signature (Type your full name) *</label>
                  <input
                    type="text"
                    id="signature"
                    name="signature"
                    value={formData.signature}
                    onChange={handleChange}
                    placeholder="Type your full legal name"
                    required
                  />
                  {formErrors.signature && <FieldError>{formErrors.signature}</FieldError>}
                </FormField>
                
                <FormField>
                  <label>Date of Submission</label>
                  <input
                    type="date"
                    value={new Date().toISOString().split('T')[0]}
                    readOnly
                  />
                </FormField>
              </FormGrid>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>📤</span>
                    Submitting Application...
                  </>
                ) : (
                  'Submit Complete Application'
                )}
              </SubmitButton>

              <FormFooter>
                <p>
                  By submitting this application, you agree to our privacy policy and 
                  consent to background checks as required for government contracting positions.
                </p>
                <p>
                  Questions? Contact us at <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a>
                </p>
              </FormFooter>
            </ApplicationForm>
          </ApplicationSection>
        </Container>
      </PageWrapper>
    </>
  );
}

// All the styled components remain the same...
// (I'll include them at the end to save space in the main code)

const PageWrapper = styled.div`
  padding: 2rem 0 4rem 0;
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 3px solid rgba(255, 125, 0, 0.1);
  border-top: 3px solid rgb(255, 125, 0);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text), 0.7);
`;

const DebugInfo = styled.div`
  background: rgba(255, 125, 0, 0.1);
  border: 1px solid rgba(255, 125, 0, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: left;
  max-width: 50rem;
  
  h4 {
    margin: 0 0 1rem 0;
    color: rgb(255, 125, 0);
  }
  
  p {
    margin: 0.5rem 0;
    font-size: 1.3rem;
    font-family: monospace;
    color: rgb(var(--text), 0.8);
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      font-size: 1.2rem;
      font-family: monospace;
      color: rgb(var(--text), 0.7);
      margin: 0.5rem 0;
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  gap: 2rem;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  color: rgb(var(--text));
`;

const ErrorText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.7);
  max-width: 50rem;
`;

const JobDetailsSection = styled.section`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 2rem;
  padding: 4rem;
  margin-bottom: 4rem;
  box-shadow: var(--shadow-lg);
  ${mq('<=tablet', 'padding: 3rem 2rem;')}
`;

const JobDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const JobDetailsIcon = styled.div`
  font-size: 2.4rem;
`;

const JobDetailsHeaderText = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text), 0.7);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const JobTitle = styled.h1`
  font-size: 3.6rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin-bottom: 2rem;
  text-align: center;
  ${mq('<=tablet', 'font-size: 2.8rem;')}
`;

const JobMeta = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  ${mq('<=tablet', 'flex-direction: column; align-items: center;')}
`;

const JobMetaItem = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const JobDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 3rem auto;
`;

const JobOverviewSection = styled.div`
  margin: 3rem 0;
  padding: 2.5rem;
  background: rgba(255, 125, 0, 0.05);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 125, 0, 0.2);
`;

const JobOverviewTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 2rem;
  text-align: center;
`;

const JobOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const OverviewItem = styled.div`
  background: rgba(var(--background), 0.7);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.1);
  }
`;

const OverviewLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text), 0.6);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const OverviewValue = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const JobRequirementsSection = styled.div`
  margin-top: 3rem;
  padding: 2.5rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const RequirementsSectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  padding-bottom: 1rem;
`;

const JobRequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
`;

const JobRequirementItem = styled.li`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  padding: 1rem 0 1rem 3rem;
  position: relative;
  background: rgba(var(--background), 0.5);
  border-radius: 0.8rem;
  border-left: 4px solid rgb(255, 125, 0);
  
  &:before {
    content: '✓';
    color: rgb(34, 197, 94);
    font-weight: bold;
    font-size: 1.8rem;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const JobBenefitsSection = styled.div`
  margin-top: 3rem;
  padding: 2.5rem;
  background: rgba(34, 197, 94, 0.05);
  border-radius: 1.5rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
`;

const BenefitsSectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(34, 197, 94);
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 2px solid rgba(34, 197, 94, 0.2);
  padding-bottom: 1rem;
`;

const JobBenefitsText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  text-align: center;
  max-width: 70rem;
  margin: 0 auto;
`;

const ReadyToApplySection = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border-radius: 1.5rem;
  border: 2px solid rgba(255, 125, 0, 0.3);
  text-align: center;
`;

const ReadyToApplyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ReadyToApplyText = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin: 0;
  line-height: 1.5;
`;

const ApplicationSection = styled.section`
  background: rgba(var(--cardBackground), 0.95);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: var(--shadow-lg);
  ${mq('<=tablet', 'padding: 3rem 2rem;')}
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const FormSubtitle = styled.p`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  ${mq('<=tablet', 'justify-content: center; text-align: center;')}
`;

const SectionIcon = styled.div`
  font-size: 2.4rem;
  background: rgba(255, 125, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 125, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin: 0;
`;

const ApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input, select, textarea {
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

    &:disabled {
      background: rgba(var(--text), 0.1);
      cursor: not-allowed;
    }
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgb(var(--text), 0.8);
    margin-bottom: 0.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
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

const CheckboxField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 1rem 0;

  input[type="checkbox"] {
    margin-top: 0.2rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  label {
    font-size: 1.4rem;
    line-height: 1.5;
    cursor: pointer;
  }
`;

const WorkExperienceSection = styled.div`
  margin: 3rem 0;
`;

const WorkExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h4 {
    font-size: 2rem;
    font-weight: 600;
    color: rgb(var(--text));
    margin: 0;
  }
`;

const AddButton = styled.button`
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
  }
  
  span {
    font-size: 1.6rem;
    margin-right: 0.5rem;
  }
`;

const WorkExperienceCard = styled.div`
  background: rgba(var(--background), 0.5);
  border: 2px solid rgba(var(--text), 0.1);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 125, 0, 0.3);
  }
`;

const WorkExperienceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  span {
    font-size: 1.8rem;
    font-weight: 600;
    color: rgb(255, 125, 0);
  }
`;

const RemoveButton = styled.button`
  background: rgba(220, 38, 38, 0.1);
  color: rgb(220, 38, 38);
  border: 1px solid rgba(220, 38, 38, 0.3);
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(220, 38, 38, 0.2);
  }
`;

const EqualOpportunityNote = styled.p`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.5;
  font-style: italic;
  margin-bottom: 2rem;
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

const FieldError = styled.span`
  font-size: 1.2rem;
  color: #ff6b6b;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  margin-top: 3rem;
  padding: 2rem;
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
    box-shadow: 0 8px 25px rgba(255, 125, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  
  p {
    font-size: 1.3rem;
    color: rgb(var(--text), 0.6);
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  
  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(220, 38, 38, 0.1);
  border: 2px solid rgba(220, 38, 38, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const RetryButton = styled.button`
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: rgb(230, 100, 0);
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  max-width: 60rem;
  margin: 0 auto;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const SuccessTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(34, 197, 94);
  margin-bottom: 2rem;
`;

const SuccessMessage = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  
  strong {
    color: rgb(255, 125, 0);
  }
`;

const SuccessDetails = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
  
  p {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 2rem;
      
      &:before {
        content: '✓';
        color: rgb(34, 197, 94);
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
`;

const ContactInfo = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin: 2rem 0;
  
  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackButton = styled.button`
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
  }
`;
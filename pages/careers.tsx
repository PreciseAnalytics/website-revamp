
// pages/careers.tsx
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { mq } from 'utils/media';

// ATS API Configuration
const ATS_BASE_URL = 'https://precise-analytics-ats.vercel.app';

// Dynamic positions interface
interface Position {
  id: number;
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

interface FormErrors {
  [key: string]: string;
}

// NEW: Authentication interfaces
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface NotificationBannerProps {
  success?: boolean;
}

export default function CareersPage() {
  const [isClient, setIsClient] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    positionId: '',
    message: '',
    resume: null as File | null,
    coverLetter: null as File | null,
    linkedinUrl: '',
    portfolioUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedInfo, setSubmittedInfo] = useState<{position: string; email: string; applicationId?: string} | null>(null);

  // NEW: Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  
  const [authData, setAuthData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    setIsClient(true);
    fetchPositions();
    checkExistingAuth(); // NEW: Check for existing authentication
  }, []);

  useEffect(() => {
    // Check for verification or error messages in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const verified = urlParams.get('verified');
      const error = urlParams.get('error');
      
      if (verified === 'success') {
        setAuthSuccess('🎉 Email verified successfully! Welcome to Precise Analytics. You can now apply for positions.');
        window.history.replaceState({}, document.title, '/careers');
        checkExistingAuth();
      } else if (verified === 'already') {
        setAuthSuccess('✅ Your email is already verified. You can sign in normally.');
        window.history.replaceState({}, document.title, '/careers');
      } else if (error) {
        let errorMessage = 'Email verification failed. Please try again.';
        
        switch (error) {
          case 'missing_token':
            errorMessage = 'Invalid verification link - token missing.';
            break;
          case 'invalid_token':
            errorMessage = 'Invalid or expired verification link. Please request a new verification email.';
            break;
          case 'invalid_link':
            errorMessage = 'Invalid verification link format.';
            break;
          case 'user_not_found':
            errorMessage = 'User account not found. Please create a new account.';
            break;
          case 'verification_failed':
            errorMessage = 'Email verification failed. Please try again or contact support.';
            break;
          case 'server_error':
            errorMessage = 'Server error during verification. Please try again later.';
            break;
        }
        
        setAuthError(errorMessage);
        window.history.replaceState({}, document.title, '/careers');
      }
    }
  }, []);

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const pendingApplication = sessionStorage.getItem('pendingApplication');
      if (pendingApplication) {
        try {
          const { jobId, jobTitle, timestamp } = JSON.parse(pendingApplication);
          
          const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
          if (timestamp > thirtyMinutesAgo) {
            console.log('🎯 Redirecting to pending application:', jobTitle);
            
            sessionStorage.removeItem('pendingApplication');
            
            const applicationUrl = `/application/${jobId}`;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
              window.location.href = applicationUrl;
            } else {
              window.open(applicationUrl, '_blank', 'noopener,noreferrer');
            }
            
            setAuthSuccess(`Welcome back! Redirecting you to apply for ${jobTitle}...`);
          } else {
            sessionStorage.removeItem('pendingApplication');
          }
        } catch (error) {
          console.error('Error processing pending application:', error);
          sessionStorage.removeItem('pendingApplication');
        }
      }
    }
  }, [user]);

  const checkExistingAuth = async () => {
    try {
      const response = await fetch(`${ATS_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.user) {
          setUser({
            id: result.user.id,
            email: result.user.email,
            firstName: result.user.first_name || result.user.name?.split(' ')[0] || '',
            lastName: result.user.last_name || result.user.name?.split(' ')[1] || '',
            token: 'cookie'
          });
        }
      }
    } catch (error) {
      console.log('No existing authentication found');
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      let endpoint = '';
      let payload = {};

      switch (authMode) {
        case 'login':
          endpoint = '/api/auth/login';
          payload = {
            email: authData.email,
            password: authData.password
          };
          break;
          
        case 'register':
          endpoint = '/api/auth/register';
          payload = {
            email: authData.email,
            password: authData.password,
            confirmPassword: authData.confirmPassword,
            firstName: authData.firstName,
            lastName: authData.lastName
          };
          break;
          
        case 'forgot':
          endpoint = '/api/auth/forgot-password';
          payload = {
            email: authData.email
          };
          break;
      }

      const response = await fetch(`${ATS_BASE_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Authentication failed');
      }

      if (authMode === 'forgot') {
        setAuthSuccess('Password reset email sent! Check your inbox.');
        return;
      }

      const userData = {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.first_name || result.user.name?.split(' ')[0] || '',
        lastName: result.user.last_name || result.user.name?.split(' ')[1] || '',
        token: 'cookie'
      };

      setUser(userData);
      
      setShowAuthModal(false);
      
      setAuthData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      });

      if (authMode === 'register') {
        setAuthSuccess('Account created successfully! Welcome to Precise Analytics.');
      }

    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${ATS_BASE_URL}/api/auth/login`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setUser(null);
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const validateAuthForm = (): boolean => {
    if (authMode === 'forgot') {
      return authData.email.includes('@');
    }
    
    if (authMode === 'register') {
      return authData.email.includes('@') && 
             authData.password.length >= 6 && 
             authData.password === authData.confirmPassword &&
             authData.firstName.trim().length >= 2 &&
             authData.lastName.trim().length >= 2;
    }
    
    return authData.email.includes('@') && authData.password.length >= 6;
  };

  const fetchPositions = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching positions from ATS...');
      
      const response = await fetch(`${ATS_BASE_URL}/api/jobs?active_only=true`);
      const data = await response.json();
      
      console.log('📊 ATS API Response:', data);
      
      const jobsArray = data.success ? data.jobs : (Array.isArray(data) ? data : []);
      
      const processedPositions = jobsArray.map((pos: any) => ({
        ...pos,
        requirements: typeof pos.requirements === 'string' 
          ? pos.requirements.split('\n').filter((req: string) => req.trim()) 
          : pos.requirements || []
      }));

      console.log('✅ Processed positions:', processedPositions);
      setPositions(processedPositions);
      
    } catch (error) {
      console.error('❌ Error fetching positions:', error);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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

    if (!formData.positionId) {
      errors.position = 'Please select a position';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please tell us why you are interested in this role';
    }

    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      errors.resume = 'Resume file must be under 5MB';
    }

    if (formData.coverLetter && formData.coverLetter.size > 5 * 1024 * 1024) {
      errors.coverLetter = 'Cover letter file must be under 5MB';
    }

    if (formData.linkedinUrl && !isValidUrl(formData.linkedinUrl)) {
      errors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    if (formData.portfolioUrl && !isValidUrl(formData.portfolioUrl)) {
      errors.portfolioUrl = 'Please enter a valid portfolio/website URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadFile = async (file: File, type: 'resume' | 'cover_letter'): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('type', type);

    const response = await fetch(`${ATS_BASE_URL}/api/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok && response.status !== 201) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'File upload failed');
    }
    
    return result.url;
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      let processedValue = value;
      
      if (name === 'phone') {
        processedValue = formatPhoneNumber(value);
      }

      if (name === 'position') {
        const selectedPosition = positions.find(p => p.id.toString() === value);
        setFormData({ 
          ...formData, 
          positionId: value,
          position: selectedPosition?.title || ''
        });
      } else {
        setFormData({ ...formData, [name]: processedValue });
      }
    }

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
      console.log('🚀 Starting application submission to ATS...');
      
      let resumeUrl = '';
      let coverLetterFileUrl = '';

      if (formData.resume) {
        resumeUrl = await uploadFile(formData.resume, 'resume');
      }

      if (formData.coverLetter) {
        coverLetterFileUrl = await uploadFile(formData.coverLetter, 'cover_letter');
      }

      const applicationData = {
        job_id: formData.positionId,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        resume_url: resumeUrl,
        cover_letter: coverLetterFileUrl,
        ...(user && { user_id: user.id })
      };

      const response = await fetch(`${ATS_BASE_URL}/api/applications`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok || !result.application) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      setSubmitSuccess('application-submitted');
      setSubmittedInfo({
        position: formData.position,
        email: formData.email,
        applicationId: result.application.id
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        positionId: '',
        message: '',
        resume: null,
        coverLetter: null,
        linkedinUrl: '',
        portfolioUrl: '',
      });

      const resumeInput = document.getElementById('resume') as HTMLInputElement;
      const coverLetterInput = document.getElementById('coverLetter') as HTMLInputElement;
      if (resumeInput) resumeInput.value = '';
      if (coverLetterInput) coverLetterInput.value = '';

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'application_submitted', {
          'job_position': formData.position,
          'application_source': 'main_website',
          'application_id': result.application.id,
          'user_authenticated': !!user
        });
      }

    } catch (error) {
      console.error('❌ Application submission error:', error);
      
      let errorMessage = 'An unexpected error occurred. Please try again or contact us directly at careers@preciseanalytics.io';
      
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          errorMessage = 'The selected position is no longer available. Please refresh the page and try again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error occurred. Please try again or email careers@preciseanalytics.io';
        } else if (error.message.includes('upload')) {
          errorMessage = 'File upload failed. Please check your files and try again.';
        } else {
          errorMessage = `Submission failed: ${error.message}`;
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyClick = (position: Position) => {
    if (!user) {
      console.log('🔐 User not authenticated, showing auth modal');
      setShowAuthModal(true);
      
      sessionStorage.setItem('pendingApplication', JSON.stringify({
        jobId: position.id,
        jobTitle: position.title,
        timestamp: Date.now()
      }));
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'apply_blocked_auth_required', {
          'job_position': position.title,
          'job_id': position.id,
        });
      }
      return;
    }

    const applicationUrl = `/application/${position.id}`;
    
    console.log('✅ User authenticated, navigating to application');
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = applicationUrl;
    } else {
      window.open(applicationUrl, '_blank', 'noopener,noreferrer');
    }
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'apply_button_clicked', {
        'job_position': position.title,
        'job_id': position.id,
        'application_source': 'careers_page',
        'user_authenticated': true,
        'user_id': user.id
      });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Careers`}</title>
        <meta name="description" content="Join the Precise Analytics team and help drive data transformation in mission-driven sectors." />
      </Head>

      <AnimatedHeader />

      <AuthHeaderExtension>
        <Container>
          <AuthSection>
            {user ? (
              <UserMenu>
                <UserInfo>
                  Welcome back, {user.firstName}! 👋
                </UserInfo>
                <LogoutButton onClick={handleLogout}>
                  Logout
                </LogoutButton>
              </UserMenu>
            ) : (
              <LoginButton onClick={() => setShowAuthModal(true)}>
                Sign In / Create Account
              </LoginButton>
            )}
          </AuthSection>
        </Container>
      </AuthHeaderExtension>
      
      <PageWrapper>
        <Container>
          {(authSuccess || authError) && (
            <NotificationBanner success={!!authSuccess}>
              <span style={{ fontSize: '2rem' }}>
                {authSuccess ? '✅' : '⚠️'}
              </span>
              <span>{authSuccess || authError}</span>
              <CloseNotification onClick={() => {
                setAuthSuccess(null);
                setAuthError(null);
              }}>
                ×
              </CloseNotification>
            </NotificationBanner>
          )}  

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Join Our Team</PageTitle>
            <PageSubtitle>Empowering missions through data—together.</PageSubtitle>
          </motion.div>

          <WelcomeSection>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <WelcomeCard>
                <WelcomeIcon>🚀</WelcomeIcon>
                <WelcomeTitle>Join Our Mission-Driven Team</WelcomeTitle>
                <WelcomeText>
                  At Precise Analytics, we&apos;re more than just a data company—we&apos;re a team of passionate professionals 
                  dedicated to transforming how government and enterprise organizations leverage data for mission-critical decisions.
                  As a <strong>Veteran-Owned Small Business (VOSB)</strong> and <strong>Service-Disabled Veteran-Owned Small Business (SDVOSB)</strong>, 
                  we bring unique perspectives and unwavering commitment to excellence.
                </WelcomeText>
                
                <WelcomeFeatures>
                  <FeatureItem>
                    <FeatureIcon>💡</FeatureIcon>
                    <FeatureText><strong>Innovative Work:</strong> Tackle complex data challenges for federal agencies</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🌟</FeatureIcon>
                    <FeatureText><strong>Growth Opportunities:</strong> Advance your career in a supportive environment</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🤝</FeatureIcon>
                    <FeatureText><strong>Team Culture:</strong> Collaborate with industry experts and veterans</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🎯</FeatureIcon>
                    <FeatureText><strong>Meaningful Impact:</strong> Your work directly supports national priorities</FeatureText>
                  </FeatureItem>
                </WelcomeFeatures>
                
                <ApplicationProcess>
                  <ProcessTitle>How to Apply</ProcessTitle>
                  <WelcomeProcessSteps>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>1</WelcomeStepNumber>
                      <WelcomeStepText>{user ? 'Browse our open positions below' : 'Sign in or create an account above'}</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>2</WelcomeStepNumber>
                      <WelcomeStepText>Browse our open positions below</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>3</WelcomeStepNumber>
                      <WelcomeStepText>Click &quot;Apply Now&quot; on your preferred role</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>4</WelcomeStepNumber>
                      <WelcomeStepText>{user ? 'Track your application status in real-time' : 'Complete application & track status'}</WelcomeStepText>
                    </WelcomeProcessStep>
                  </WelcomeProcessSteps>
                </ApplicationProcess>
              </WelcomeCard>
            </motion.div>
          </WelcomeSection>

          <PositionsSection>
            <SectionTitle>Open Positions</SectionTitle>
            <SectionSubtitle>
              Explore opportunities to grow your career with us
              {!loading && positions.length > 0 && (
                <PositionCount>{positions.length} open position{positions.length !== 1 ? 's' : ''}</PositionCount>
              )}
            </SectionSubtitle>
            
            {loading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Loading career opportunities...</LoadingText>
              </LoadingContainer>
            ) : positions.length === 0 ? (
              <NoPositionsMessage>
                <NoPositionsIcon>📋</NoPositionsIcon>
                <NoPositionsTitle>No Open Positions</NoPositionsTitle>
                <NoPositionsText>
                  We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals to join our team.
                  Feel free to send your resume to <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a> and we&apos;ll keep you in mind for future opportunities.
                </NoPositionsText>
              </NoPositionsMessage>
            ) : (
              <JobListContainer>
                <JobListHeader>
                  <HeaderCell className="title">Position</HeaderCell>
                  <HeaderCell className="department">Department</HeaderCell>
                  <HeaderCell className="location">Location</HeaderCell>
                  <HeaderCell className="type">Type</HeaderCell>
                  <HeaderCell className="salary">Salary</HeaderCell>
                  <HeaderCell className="action">Apply</HeaderCell>
                </JobListHeader>

                {positions.map((position) => (
                  <JobListRow key={position.id}>
                    <JobCell className="title">
                      <JobTitle>{position.title}</JobTitle>
                      <JobPreview>{position.description.substring(0, 120)}...</JobPreview>
                    </JobCell>
                    
                    <JobCell className="department">
                      <DepartmentTag>{position.department}</DepartmentTag>
                    </JobCell>
                    
                    <JobCell className="location">
                      <LocationText>{position.location || 'Location TBD'}</LocationText>
                    </JobCell>
                    
                    <JobCell className="type">
                      <TypeBadge>
                        {position.employment_type?.replace('_', ' ').toUpperCase() || 'FULL-TIME'}
                      </TypeBadge>
                    </JobCell>
                    
                    <JobCell className="salary">
                      <SalaryText>
                        {position.salary_min && position.salary_max 
                          ? `$${position.salary_min.toLocaleString()} - $${position.salary_max.toLocaleString()}`
                          : 'Competitive'
                        }
                      </SalaryText>
                    </JobCell>
                    
                    <JobCell className="action">
                      <CompactApplyButton onClick={() => handleApplyClick(position)}>
                        Apply Now
                      </CompactApplyButton>
                    </JobCell>
                  </JobListRow>
                ))}
              </JobListContainer>
            )}
          </PositionsSection>
        </Container>
      </PageWrapper>

      <AnimatePresence>
        {showAuthModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  {authMode === 'login' && 'Welcome Back'}
                  {authMode === 'register' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </ModalTitle>
                <CloseButton onClick={() => setShowAuthModal(false)}>×</CloseButton>
              </ModalHeader>

              <AuthForm onSubmit={handleAuthSubmit}>
                {authError && (
                  <ErrorAlert>
                    <ErrorIcon>⚠️</ErrorIcon>
                    {authError}
                  </ErrorAlert>
                )}

                {authSuccess && (
                  <SuccessAlert>
                    <SuccessIcon>✅</SuccessIcon>
                    {authSuccess}
                  </SuccessAlert>
                )}

                {authMode === 'register' && (
                  <NameFields>
                    <AuthField>
                      <AuthLabel>First Name</AuthLabel>
                      <AuthInput
                        type="text"
                        name="firstName"
                        value={authData.firstName}
                        onChange={handleAuthChange}
                        required
                        placeholder="Enter your first name"
                      />
                    </AuthField>
                    <AuthField>
                      <AuthLabel>Last Name</AuthLabel>
                      <AuthInput
                        type="text"
                        name="lastName"
                        value={authData.lastName}
                        onChange={handleAuthChange}
                        required
                        placeholder="Enter your last name"
                      />
                    </AuthField>
                  </NameFields>
                )}

                <AuthField>
                  <AuthLabel>Email Address</AuthLabel>
                  <AuthInput
                    type="email"
                    name="email"
                    value={authData.email}
                    onChange={handleAuthChange}
                    required
                    placeholder="Enter your email"
                  />
                </AuthField>

                {authMode !== 'forgot' && (
                  <AuthField>
                    <AuthLabel>Password</AuthLabel>
                    <AuthInput
                      type="password"
                      name="password"
                      value={authData.password}
                      onChange={handleAuthChange}
                      required
                      placeholder="Enter your password"
                      minLength={6}
                    />
                  </AuthField>
                )}

                {authMode === 'register' && (
                  <AuthField>
                    <AuthLabel>Confirm Password</AuthLabel>
                    <AuthInput
                      type="password"
                      name="confirmPassword"
                      value={authData.confirmPassword}
                      onChange={handleAuthChange}
                      required
                      placeholder="Confirm your password"
                      minLength={6}
                    />
                  </AuthField>
                )}

                <AuthButton 
                  type="submit" 
                  disabled={authLoading || !validateAuthForm()}
                >
                  {authLoading ? (
                    <span>
                      <Spinner />
                      {authMode === 'login' && 'Signing In...'}
                      {authMode === 'register' && 'Creating Account...'}
                      {authMode === 'forgot' && 'Sending Email...'}
                    </span>
                  ) : (
                    <>
                      {authMode === 'login' && 'Sign In'}
                      {authMode === 'register' && 'Create Account'}
                      {authMode === 'forgot' && 'Send Reset Email'}
                    </>
                  )}
                </AuthButton>

                <AuthLinks>
                  {authMode === 'login' && (
                    <>
                      <AuthLink onClick={() => setAuthMode('forgot')}>
                        Forgot Password?
                      </AuthLink>
                      <AuthDivider>•</AuthDivider>
                      <AuthLink onClick={() => setAuthMode('register')}>
                        Create Account
                      </AuthLink>
                    </>
                  )}

                  {authMode === 'register' && (
                    <>
                      Already have an account?
                      <AuthLink onClick={() => setAuthMode('login')}>
                        Sign In
                      </AuthLink>
                    </>
                  )}

                  {authMode === 'forgot' && (
                    <>
                      Remember your password?
                      <AuthLink onClick={() => setAuthMode('login')}>
                        Sign In
                      </AuthLink>
                    </>
                  )}
                </AuthLinks>
              </AuthForm>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

// NEW: Auth Header Components
const AuthHeaderExtension = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border-bottom: 1px solid rgba(255, 125, 0, 0.1);
  padding: 1rem 0;
`;

const NotificationBanner = styled.div<NotificationBannerProps>`
  background: ${props => props.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)'};
  border: 1px solid ${props => props.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(220, 38, 38, 0.3)'};
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.success ? 'rgb(34, 197, 94)' : 'rgb(220, 38, 38)'};
  font-size: 1.5rem;
  font-weight: 500;
  position: relative;
`;

const CloseNotification = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const AuthSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserInfo = styled.span`
  font-size: 1.6rem;
  color: rgb(var(--text));
  font-weight: 500;
`;

const LoginButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }
`;

const LogoutButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  background: transparent;
  color: rgb(var(--text), 0.7);
  border: 1px solid rgba(var(--text), 0.3);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--text), 0.1);
    color: rgb(var(--text));
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(var(--background), 0.98);
  border-radius: 2rem;
  padding: 0;
  max-width: 65rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--text), 0.1);
  
  ${mq('<=tablet', `
    max-width: 95vw;
    margin: 1rem;
    border-radius: 1.5rem;
  `)}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 4rem 0 4rem;
  margin-bottom: 3rem;
`;

const ModalTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 3rem;
  color: rgb(var(--text), 0.5);
  cursor: pointer;
  padding: 0;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--text), 0.1);
    color: rgb(var(--text));
  }
`;

const AuthForm = styled.form`
  padding: 0 4rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const NameFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const AuthField = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text), 0.8);
  margin-bottom: 1rem;
`;

const AuthInput = styled.input`
  padding: 2rem;
  font-size: 1.7rem;
  border: 2px solid rgba(var(--text), 0.2);
  border-radius: 1.2rem;
  background: rgba(var(--background), 0.9);
  color: rgb(var(--text));
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 4px rgba(255, 125, 0, 0.1);
  }

  &::placeholder {
    color: rgb(var(--text), 0.5);
  }
`;

const AuthButton = styled.button`
  padding: 2.2rem;
  font-size: 1.7rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

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

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin-top: 1rem;
`;

const AuthLink = styled.button`
  background: none;
  border: none;
  color: rgb(255, 125, 0);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthDivider = styled.span`
  color: rgb(var(--text), 0.4);
`;

const ErrorAlert = styled.div`
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: rgb(220, 38, 38);
  font-size: 1.5rem;
  font-weight: 500;
`;

const SuccessAlert = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: rgb(34, 197, 94);
  font-size: 1.5rem;
  font-weight: 500;
`;

const ErrorIcon = styled.span`
  font-size: 1.8rem;
`;

const SuccessIcon = styled.span`
  font-size: 1.8rem;
`;

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

const WelcomeSection = styled.section`
  margin: 4rem 0 6rem 0;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border: 2px solid rgba(255, 125, 0, 0.2);
  border-radius: 2rem;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 125, 0, 0.1);
  ${mq('<=tablet', 'padding: 3rem 2rem;')}
`;

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin-bottom: 2rem;
  ${mq('<=tablet', 'font-size: 2.8rem;')}
`;

const WelcomeText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin-bottom: 3rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  
  strong {
    color: rgb(255, 125, 0);
    font-weight: 600;
  }
  
  ${mq('<=tablet', 'font-size: 1.6rem;')}
`;

const WelcomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  ${mq('<=tablet', 'grid-template-columns: 1fr; gap: 1.5rem;')}
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(255, 125, 0, 0.15);
    border-color: rgba(255, 125, 0, 0.3);
  }
  
  ${mq('<=tablet', 'flex-direction: column; text-align: center;')}
`;

const FeatureIcon = styled.div`
  font-size: 2.4rem;
  flex-shrink: 0;
`;

const FeatureText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.4;
  
  strong {
    color: rgb(var(--text));
    font-weight: 600;
  }
  
  ${mq('<=tablet', 'font-size: 1.5rem; text-align: center;')}
`;

const ApplicationProcess = styled.div`
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.5rem;
  padding: 3rem;
  border: 1px solid rgba(var(--text), 0.1);
  ${mq('<=tablet', 'padding: 2rem;')}
`;

const ProcessTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  text-align: center;
`;

const WelcomeProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const WelcomeProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 125, 0, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 125, 0, 0.2);
  
  ${mq('<=tablet', 'justify-content: center; text-align: center;')}
`;

const WelcomeStepNumber = styled.div`
  background: rgb(255, 125, 0);
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
`;

const WelcomeStepText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  line-height: 1.4;
`;

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

const SectionSubtitle = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PositionCount = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
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
  font-weight: 500;
`;

const NoPositionsMessage = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 2rem;
  border: 2px dashed rgba(var(--text), 0.2);
`;

const NoPositionsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const NoPositionsTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const NoPositionsText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.6;
  max-width: 50rem;
  margin: 0 auto;

  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const JobListContainer = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(var(--text), 0.1);
`;

const JobListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 1fr 0.8fr;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  padding: 1.5rem 2rem;
  font-weight: 700;
  
  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    display: none;
  `)}
`;

const HeaderCell = styled.div`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.title { justify-self: start; }
  &.department { justify-self: center; }
  &.location { justify-self: center; }
  &.type { justify-self: center; }
  &.salary { justify-self: center; }
  &.action { justify-self: end; }
`;

const JobListRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 1fr 0.8fr;
  padding: 2rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 125, 0, 0.03);
    border-left: 4px solid rgb(255, 125, 0);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 2rem 1.5rem;
    border-left: none !important;
    
    &:hover {
      background: rgba(255, 125, 0, 0.05);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 125, 0, 0.15);
    }
  `)}
`;

const JobCell = styled.div`
  &.title { justify-self: start; }
  &.department { justify-self: center; }
  &.location { justify-self: center; }
  &.type { justify-self: center; }
  &.salary { justify-self: center; }
  &.action { justify-self: end; }
  
  ${mq('<=tablet', `
    justify-self: start !important;
    width: 100%;
  `)}
`;

const JobTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgb(255, 125, 0);
  line-height: 1.3;
  
  ${mq('<=tablet', 'font-size: 2rem; margin-bottom: 0.8rem;')}
`;

const JobPreview = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin: 0;
  line-height: 1.4;
  
  ${mq('<=tablet', `
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  `)}
`;

const DepartmentTag = styled.span`
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
  white-space: nowrap;
  
  ${mq('<=tablet', `
    font-size: 1.4rem;
    padding: 0.8rem 1.5rem;
  `)}
`;

const LocationText = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '📍';
    margin-right: 0.5rem;
  }
  
  ${mq('<=tablet', `
    justify-content: flex-start;
    font-size: 1.5rem;
  `)}
`;

const TypeBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  
  ${mq('<=tablet', `
    font-size: 1.3rem;
    padding: 0.8rem 1.5rem;
  `)}
`;

const SalaryText = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.9);
  font-weight: 600;
  text-align: center;
  
  ${mq('<=tablet', `
    text-align: left;
    font-size: 1.5rem;
  `)}
`;

const CompactApplyButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: rgb(255, 125, 0);
  color: white;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  position: relative;
  z-index: 10;

  &:hover {
    background: rgb(230, 100, 0);
    border-color: rgb(230, 100, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${mq('<=tablet', `
    width: 100%;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
    min-height: 44px;
    margin-top: 1rem;
  `)}
`;

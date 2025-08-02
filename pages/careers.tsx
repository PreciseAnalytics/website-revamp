// pages/careers.tsx - Updated with better UX and login integration
import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { mq } from 'utils/media';
import { Loader2, AlertCircle, CheckCircle, Link } from 'lucide-react';

// ATS API Configuration
const ATS_BASE_URL = process.env.NEXT_PUBLIC_ATS_API_URL || 'https://precise-analytics-ats.vercel.app';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/* 
 * CORS Fix for Production:
 * To fix the CORS issue in production, update your ATS API server to include:
 * 
 * app.use(cors({
 *   origin: [
 *     'https://preciseanalytics.io',
 *     'http://localhost:3000',  // Add this for development
 *     'http://localhost:3001',  // Add other development ports as needed
 *   ],
 *   credentials: true
 * }));
 * 
 * Or set the Access-Control-Allow-Origin header to include localhost domains
 */

// Development mode authentication fallback
const mockAuthForDevelopment = {
  login: async (email: string, password: string) => {
    // Simple mock authentication for development
    if (email && password) {
      const mockUser = {
        id: 'dev-user-' + Date.now(),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email
      };
      const mockToken = 'dev-token-' + Date.now();
      return { success: true, user: mockUser, token: mockToken };
    }
    throw new Error('Please enter valid credentials');
  },
  
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    // Simple mock registration for development
    if (firstName && lastName && email && password) {
      return { success: true, message: 'Registration successful! You can now login.' };
    }
    throw new Error('Please fill in all required fields');
  },
  
  resetPassword: async (email: string) => {
    if (email) {
      return { success: true, message: 'Password reset link sent!' };
    }
    throw new Error('Please enter a valid email address');
  }
};

// Interface to match actual API response
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
  salary_range?: string;
  benefits?: string;
  status?: string;
  posted?: boolean;
}

export default function CareersPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    department: 'All',
    location: 'All',
    employment_type: 'All',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const positionsSectionRef = useRef<HTMLDivElement>(null);
  const departmentCounterRef = useRef<HTMLDivElement>(null);

  // Parse salary range
  const parseSalaryRange = (salaryRange: string | undefined): { min: number; max: number } | null => {
    if (!salaryRange) return null;
    const numbers = salaryRange.match(/\$[\d,]+/g);
    if (numbers && numbers.length >= 2) {
      const min = parseInt(numbers[0].replace(/[$,]/g, ''));
      const max = parseInt(numbers[1].replace(/[$,]/g, ''));
      return { min, max };
    }
    if (numbers && numbers.length === 1) {
      const amount = parseInt(numbers[0].replace(/[$,]/g, ''));
      return { min: amount, max: amount };
    }
    return null;
  };

  // Check login status
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      try {
        const parsed = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsed);
        console.log('✅ User logged in:', parsed);
      } catch (error) {
        console.error('Invalid user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Fetch positions from ATS API
  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching positions from ATS:', ATS_BASE_URL);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        setError('Request timed out. Please try again later.');
      }, 10000);

      const response = await fetch(`${ATS_BASE_URL}/api/jobs?status=published&posted=true`, {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 ATS API Response:', JSON.stringify(data, null, 2));

      if (!data.success || !Array.isArray(data.jobs)) {
        throw new Error('Invalid API response format');
      }

      const processedPositions = data.jobs.map((job: any) => {
        const salaryParsed = parseSalaryRange(job.salary_range);
        const processedJob = {
          id: job.id || crypto.randomUUID(),
          title: job.title || 'Untitled Position',
          department: job.department?.trim().toLowerCase() || 'general',
          location: job.location?.trim().toLowerCase() || 'location tbd',
          employment_type: job.type?.trim().toLowerCase() || job.employment_type?.trim().toLowerCase() || 'full_time',
          description: job.description || 'Job description coming soon.',
          requirements: typeof job.requirements === 'string'
            ? job.requirements.split('\n').filter((req: string) => req.trim())
            : Array.isArray(job.requirements)
              ? job.requirements
              : [],
          salary_min: salaryParsed?.min,
          salary_max: salaryParsed?.max,
          salary_range: job.salary_range || 'Competitive',
          benefits: job.benefits || '',
          status: job.status || 'published',
          posted: job.posted ?? true,
        };
        console.log('🔧 Processed job:', processedJob);
        return processedJob;
      });

      console.log('✅ Processed positions:', processedPositions);
      setPositions(processedPositions);
      setFilteredPositions(processedPositions);

      const uniqueDepartments = Array.from(
        new Set(processedPositions.map((pos) => pos.department).filter((dept) => dept && dept !== 'general'))
      ).sort();
      const uniqueLocations = Array.from(
        new Set(processedPositions.map((pos) => pos.location).filter((loc) => loc && loc !== 'location tbd'))
      ).sort();
      const uniqueEmploymentTypes = Array.from(
        new Set(processedPositions.map((pos) => pos.employment_type).filter((type) => type))
      ).sort();

      setDepartments(['All', ...uniqueDepartments]);
      setLocations(['All', ...uniqueLocations]);
      setEmploymentTypes(['All', ...uniqueEmploymentTypes]);
    } catch (error: any) {
      console.error('❌ Error fetching positions:', error.message);
      setError(error.message || 'Failed to load job listings. Please try again later.');
      setPositions([]);
      setFilteredPositions([]);
      setDepartments(['All']);
      setLocations(['All']);
      setEmploymentTypes(['All']);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  // Apply filters
  useEffect(() => {
    console.log('🔍 Applying filters:', filters);
    let result = [...positions];
    if (filters.department !== 'All') {
      result = result.filter((pos) => pos.department === filters.department.toLowerCase());
    }
    if (filters.location !== 'All') {
      result = result.filter((pos) => pos.location === filters.location.toLowerCase());
    }
    if (filters.employment_type !== 'All') {
      result = result.filter((pos) => pos.employment_type === filters.employment_type.toLowerCase());
    }
    setFilteredPositions(result);
  }, [filters, positions]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'department' && value !== 'All') {
      const normalizedValue = value.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setTimeout(() => {
        const element = document.getElementById(`category-${normalizedValue}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.style.animation = 'highlight 1.5s ease';
          setTimeout(() => {
            element.style.animation = '';
          }, 1500);
        }
      }, 100);
    }
  };

  const handleDepartmentCounterClick = (department: string) => {
    setFilters((prev) => ({ ...prev, department }));
    // Scroll to the positions section
    setTimeout(() => {
      if (positionsSectionRef.current) {
        positionsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBackToAllJobs = () => {
    setFilters((prev) => ({ ...prev, department: 'All' }));
    if (positionsSectionRef.current) {
      positionsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group positions by department
  const groupedPositions = filteredPositions.reduce((acc, pos) => {
    const dept = pos.department || 'general';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(pos);
    return acc;
  }, {} as Record<string, Position[]>);

  // Handle login
  const handleLogin = async () => {
    try {
      setAuthError(null);
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify(loginData),
        });
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API returned non-JSON response (likely 404)');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Login failed');
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setLoginData({ email: '', password: '' });
        console.log('✅ Login successful:', data.user);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'login', { method: 'email' });
        }
      } catch (apiError: any) {
        // If API fails, use mock auth in development
        if (IS_DEVELOPMENT) {
          console.log('🔄 API failed, using development mock authentication');
          const mockResult = await mockAuthForDevelopment.login(loginData.email, loginData.password);
          localStorage.setItem('token', mockResult.token);
          localStorage.setItem('user', JSON.stringify(mockResult.user));
          setUser(mockResult.user);
          setIsLoggedIn(true);
          setShowLoginModal(false);
          setLoginData({ email: '', password: '' });
          console.log('✅ Mock login successful:', mockResult.user);
          alert('✅ Development Mode: Login successful! (Using mock authentication)');
        } else {
          throw apiError;
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message || 'Login failed');
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    }
    
    if (!registerData.firstName.trim()) {
      setAuthError('First name is required');
      return;
    }
    
    if (!registerData.lastName.trim()) {
      setAuthError('Last name is required');
      return;
    }
    
    try {
      setAuthError(null);
      
      // Combine first and last name for the API
      const fullName = `${registerData.firstName.trim()} ${registerData.lastName.trim()}`;
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify({
            name: fullName,
            email: registerData.email,
            password: registerData.password,
          }),
        });
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API returned non-JSON response (likely 404)');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Registration failed');
        }
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        alert('Registration successful! Please login with your credentials.');
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sign_up', { method: 'email' });
        }
      } catch (apiError: any) {
        // If API fails, use mock auth in development
        if (IS_DEVELOPMENT) {
          console.log('🔄 API failed, using development mock registration');
          const mockResult = await mockAuthForDevelopment.register(
            registerData.firstName, 
            registerData.lastName, 
            registerData.email, 
            registerData.password
          );
          setShowRegisterModal(false);
          setShowLoginModal(true);
          setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
          alert('✅ Development Mode: Registration successful! You can now login. (Using mock authentication)');
        } else {
          throw apiError;
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthError(error.message || 'Registration failed');
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    try {
      setAuthError(null);
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify({ email: resetEmail }),
        });
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API returned non-JSON response (likely 404)');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Password reset failed');
        }
        setShowResetModal(false);
        setResetEmail('');
        alert('Password reset link sent to your email.');
      } catch (apiError: any) {
        // If API fails, use mock auth in development
        if (IS_DEVELOPMENT) {
          console.log('🔄 API failed, using development mock password reset');
          const mockResult = await mockAuthForDevelopment.resetPassword(resetEmail);
          setShowResetModal(false);
          setResetEmail('');
          alert('✅ Development Mode: Password reset link sent! (Using mock authentication)');
        } else {
          throw apiError;
        }
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      setAuthError(error.message || 'Password reset failed');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    console.log('✅ User logged out');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'logout', { method: 'email' });
    }
  };

  // Handle learn more
  const handleLearnMore = (position: Position) => {
    setSelectedPosition(position);
    setShowJobModal(true);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'learn_more_clicked', {
        job_position: position.title,
        job_id: position.id,
        source: 'careers_page',
      });
    }
  };

  // Handle apply click - Enhanced with login state passing
  const handleApplyClick = (position: Position) => {
    const baseApplicationUrl = `/application/${position.id}`;
    
    // Add user context if logged in
    const applicationUrl = isLoggedIn && user 
      ? `${baseApplicationUrl}?user=${encodeURIComponent(JSON.stringify(user))}&token=${encodeURIComponent(localStorage.getItem('token') || '')}`
      : baseApplicationUrl;
    
    console.log('🚀 Navigating to application page:', applicationUrl);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = applicationUrl;
    } else {
      window.open(applicationUrl, '_blank', 'noopener,noreferrer');
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'apply_now_clicked', {
        job_position: position.title,
        job_id: position.id,
        source: showJobModal ? 'job_details_modal' : 'careers_page',
        user_logged_in: isLoggedIn,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Careers`}</title>
        <meta
          name="description"
          content="Join the Precise Analytics team and help drive data transformation in mission-driven sectors."
        />
      </Head>

      <AnimatedHeader />
      <PageWrapper>
        <Container>
          {/* Simplified Header Section */}
          <HeaderSection>
            <HeaderContent>
              <LogoWrapper>
                <img src="/logo.png" alt="Precise Analytics Logo" />
              </LogoWrapper>
              <BadgesWrapper>
                <Badge>VOSB</Badge>
                <Badge>SDVOSB</Badge>
                <Badge>MBE</Badge>
                {isLoggedIn ? (
                  <AuthContainer>
                    <UserGreeting>Welcome back, {user?.name}!</UserGreeting>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                  </AuthContainer>
                ) : (
                  <LoginButton onClick={() => setShowLoginModal(true)}>Login</LoginButton>
                )}
              </BadgesWrapper>
            </HeaderContent>
          </HeaderSection>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Join Our Team</PageTitle>
            <PageSubtitle>
              Empowering missions through data—together.
            </PageSubtitle>
          </motion.div>

          <WelcomeSection>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <WelcomeCard>
                <WelcomeIcon>🚀</WelcomeIcon>
                <WelcomeTitle>Join Our Mission-Driven Team</WelcomeTitle>
                <WelcomeText>
                  At Precise Analytics, we&apos;re more than just a data company—we&apos;re a team of passionate professionals
                  dedicated to transforming how government and enterprise organizations leverage data for mission-critical decisions.
                  As a <strong>Veteran-Owned Small Business (VOSB)</strong> and{' '}
                  <strong>Service-Disabled Veteran-Owned Small Business (SDVOSB)</strong>, we bring unique perspectives and
                  unwavering commitment to excellence.
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
                      <WelcomeStepText>Browse our open positions below</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>2</WelcomeStepNumber>
                      <WelcomeStepText>Click job title or &quot;Learn More&quot; for details</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>3</WelcomeStepNumber>
                      <WelcomeStepText>Click job title or &quot;Apply Now&quot; to apply</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>4</WelcomeStepNumber>
                      <WelcomeStepText>Complete and submit your application</WelcomeStepText>
                    </WelcomeProcessStep>
                  </WelcomeProcessSteps>
                </ApplicationProcess>
              </WelcomeCard>
            </motion.div>
          </WelcomeSection>

          {/* Department Counter Section - Moved here */}
          <DepartmentCounterSection ref={departmentCounterRef}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CounterWrapper>
                <JobCounter>
                  <TotalCount>
                    {loading ? (
                      <CounterSkeleton>Loading positions...</CounterSkeleton>
                    ) : (
                      `${filteredPositions.length} Open Position${filteredPositions.length !== 1 ? 's' : ''}`
                    )}
                  </TotalCount>
                  {!loading && !error && filteredPositions.length > 0 && (
                    <DepartmentCounts>
                      {Object.entries(
                        filteredPositions.reduce((acc, pos) => {
                          const dept = pos.department || 'general';
                          acc[dept] = (acc[dept] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      )
                        .filter(([dept]) => dept !== 'general')
                        .map(([dept, count]) => (
                          <DepartmentCount
                            key={dept}
                            onClick={() => handleDepartmentCounterClick(dept)}
                          >
                            <CountBadge>{count}</CountBadge>
                            <DeptName>{dept.charAt(0).toUpperCase() + dept.slice(1)}</DeptName>
                          </DepartmentCount>
                        ))}
                      {filteredPositions.some(pos => pos.department === 'general') && (
                        <DepartmentCount
                          onClick={() => handleDepartmentCounterClick('general')}
                        >
                          <CountBadge>
                            {filteredPositions.filter(pos => pos.department === 'general').length}
                          </CountBadge>
                          <DeptName>General</DeptName>
                        </DepartmentCount>
                      )}
                    </DepartmentCounts>
                  )}
                </JobCounter>
              </CounterWrapper>
            </motion.div>
          </DepartmentCounterSection>

          <PositionsSection ref={positionsSectionRef}>
            <SectionTitle>Open Positions</SectionTitle>
            <FilterContainer>
              <FilterGroup>
                <FilterLabel>Department</FilterLabel>
                <FilterSelect
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept.charAt(0).toUpperCase() + dept.slice(1)}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Location</FilterLabel>
                <FilterSelect
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Type</FilterLabel>
                <FilterSelect
                  value={filters.employment_type}
                  onChange={(e) => handleFilterChange('employment_type', e.target.value)}
                >
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>
            </FilterContainer>

            {loading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Loading career opportunities...</LoadingText>
              </LoadingContainer>
            ) : error ? (
              <NoPositionsMessage>
                <NoPositionsIcon><AlertCircle size={40} /></NoPositionsIcon>
                <NoPositionsTitle>Error Loading Jobs</NoPositionsTitle>
                <NoPositionsText>
                  {error} Please try refreshing the page or contact{' '}
                  <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a> for assistance.
                </NoPositionsText>
              </NoPositionsMessage>
            ) : Object.keys(groupedPositions).length === 0 ? (
              <NoPositionsMessage>
                <NoPositionsIcon>📋</NoPositionsIcon>
                <NoPositionsTitle>No Open Positions</NoPositionsTitle>
                <NoPositionsText>
                  We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals to join our team.
                  Feel free to send your resume to <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a> and we&apos;ll keep you in mind for future opportunities.
                </NoPositionsText>
              </NoPositionsMessage>
            ) : (
              Object.entries(groupedPositions)
                .sort(([deptA], [deptB]) => (deptA === 'general' ? 1 : deptA.localeCompare(deptB)))
                .map(([department, deptPositions]) => (
                  <JobCategory key={department} id={`category-${department.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                    <CategoryHeader>
                      <CategoryTitle>{department.charAt(0).toUpperCase() + department.slice(1)}</CategoryTitle>
                      {filters.department !== 'All' && (
                        <BackToAllJobsButton onClick={handleBackToAllJobs}>
                          Back to All Jobs
                        </BackToAllJobsButton>
                      )}
                    </CategoryHeader>
                    <JobListContainer>
                      <JobListHeader>
                        <HeaderCell className="title">Position</HeaderCell>
                        <HeaderCell className="department">Department</HeaderCell>
                        <HeaderCell className="location">Location</HeaderCell>
                        <HeaderCell className="type">Type</HeaderCell>
                        <HeaderCell className="salary">Salary</HeaderCell>
                        <HeaderCell className="action">Apply</HeaderCell>
                      </JobListHeader>
                      {deptPositions.map((position) => (
                        <JobListRow key={position.id}>
                          <JobCell className="title">
                            <JobTitle onClick={() => handleApplyClick(position)}>{position.title}</JobTitle>
                            <JobPreview>{position.description.substring(0, 120)}...</JobPreview>
                          </JobCell>
                          <JobCell className="department">
                            <DepartmentTag>{position.department}</DepartmentTag>
                          </JobCell>
                          <JobCell className="location">
                            <LocationText>{position.location}</LocationText>
                          </JobCell>
                          <JobCell className="type">
                            <TypeBadge>{position.employment_type.replace('_', ' ').toUpperCase()}</TypeBadge>
                          </JobCell>
                          <JobCell className="salary">
                            <SalaryText>{position.salary_range}</SalaryText>
                          </JobCell>
                          <JobCell className="action">
                            <JobActions>
                              <LearnMoreButton onClick={() => handleLearnMore(position)}>Learn More</LearnMoreButton>
                              <CompactApplyButton onClick={() => handleApplyClick(position)}>Apply Now</CompactApplyButton>
                            </JobActions>
                          </JobCell>
                        </JobListRow>
                      ))}
                    </JobListContainer>
                  </JobCategory>
                ))
            )}
          </PositionsSection>
        </Container>
      </PageWrapper>

      {/* All Modals remain the same */}
      {/* Job Details Modal */}
      <AnimatePresence>
        {showJobModal && selectedPosition && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJobModal(false)}
          >
            <JobModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <JobModalHeader>
                <JobModalTitle onClick={() => handleApplyClick(selectedPosition)}>
                  {selectedPosition.title}
                </JobModalTitle>
                <CloseButton onClick={() => setShowJobModal(false)}>×</CloseButton>
              </JobModalHeader>
              <JobModalBody>
                <JobModalMeta>
                  <JobModalMetaItem>🏢 {selectedPosition.department}</JobModalMetaItem>
                  <JobModalMetaItem>📍 {selectedPosition.location}</JobModalMetaItem>
                  <JobModalMetaItem>💼 {selectedPosition.employment_type.replace('_', ' ').toUpperCase()}</JobModalMetaItem>
                  {selectedPosition.salary_range && (
                    <JobModalMetaItem>💰 {selectedPosition.salary_range}</JobModalMetaItem>
                  )}
                </JobModalMeta>
                <JobModalSection>
                  <JobModalSectionTitle>Job Description</JobModalSectionTitle>
                  <JobModalText>{selectedPosition.description}</JobModalText>
                </JobModalSection>
                {selectedPosition.requirements && selectedPosition.requirements.length > 0 && (
                  <JobModalSection>
                    <JobModalSectionTitle>Requirements & Qualifications</JobModalSectionTitle>
                    <RequirementsList>
                      {selectedPosition.requirements.map((req, index) => (
                        <RequirementItem key={index}>{req}</RequirementItem>
                      ))}
                    </RequirementsList>
                  </JobModalSection>
                )}
                {selectedPosition.benefits && (
                  <JobModalSection>
                    <JobModalSectionTitle>Benefits</JobModalSectionTitle>
                    <JobModalText>{selectedPosition.benefits}</JobModalText>
                  </JobModalSection>
                )}
                <JobModalActions>
                  <SecondaryButton onClick={() => setShowJobModal(false)}>Keep Browsing</SecondaryButton>
                  <PrimaryButton onClick={() => handleApplyClick(selectedPosition)}>
                    Apply for This Position
                  </PrimaryButton>
                </JobModalActions>
              </JobModalBody>
            </JobModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginModal(false)}
          >
            <AuthModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AuthModalHeader>
                <AuthModalTitle>Login</AuthModalTitle>
                <CloseButton onClick={() => setShowLoginModal(false)}>×</CloseButton>
              </AuthModalHeader>
              <AuthModalBody>
                {authError && <ErrorText>{authError}</ErrorText>}
                <InputGroup>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Password</InputLabel>
                  <Input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </InputGroup>
                <AuthLink onClick={() => { setShowLoginModal(false); setShowResetModal(true); }}>
                  Forgot Password?
                </AuthLink>
                <AuthModalActions>
                  <SecondaryButton onClick={() => setShowLoginModal(false)}>Cancel</SecondaryButton>
                  <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}>
                  Don't have an account? Register here
                </AuthLink>
              </AuthModalBody>
            </AuthModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRegisterModal(false)}
          >
            <AuthModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AuthModalHeader>
                <AuthModalTitle>Register</AuthModalTitle>
                <CloseButton onClick={() => setShowRegisterModal(false)}>×</CloseButton>
              </AuthModalHeader>
              <AuthModalBody>
                {authError && <ErrorText>{authError}</ErrorText>}
                <InputGroup>
                  <InputLabel>First Name</InputLabel>
                  <Input
                    type="text"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    placeholder="Enter your first name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Last Name</InputLabel>
                  <Input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    placeholder="Enter your last name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Password</InputLabel>
                  <Input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Confirm Password</InputLabel>
                  <Input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                  />
                </InputGroup>
                <AuthModalActions>
                  <SecondaryButton onClick={() => setShowRegisterModal(false)}>Cancel</SecondaryButton>
                  <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}>
                  Already have an account? Login here
                </AuthLink>
              </AuthModalBody>
            </AuthModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Password Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetModal(false)}
          >
            <AuthModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AuthModalHeader>
                <AuthModalTitle>Reset Password</AuthModalTitle>
                <CloseButton onClick={() => setShowResetModal(false)}>×</CloseButton>
              </AuthModalHeader>
              <AuthModalBody>
                {authError && <ErrorText>{authError}</ErrorText>}
                <InputGroup>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </InputGroup>
                <AuthModalActions>
                  <SecondaryButton onClick={() => setShowResetModal(false)}>Cancel</SecondaryButton>
                  <PrimaryButton onClick={handleResetPassword}>Send Reset Link</PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowResetModal(false); setShowLoginModal(true); }}>
                  Back to Login
                </AuthLink>
              </AuthModalBody>
            </AuthModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

// Updated Styled Components
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const HeaderSection = styled.header`
  margin-bottom: 2rem;
`;

const DevelopmentBanner = styled.div`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border-radius: ${props => IS_DEVELOPMENT ? '0 0 1rem 1rem' : '1rem'};
  border: 1px solid rgba(var(--text), 0.1);
  flex-wrap: wrap;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  img {
    height: 40px;
    width: auto;
  }
`;

const BadgesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Badge = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserGreeting = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
`;

const LoginButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: transparent;
  color: rgb(255, 125, 0);
  border: 2px solid rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
  }
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

const PageSubtitle = styled.div`
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

// NEW: Department Counter Section Styles
const DepartmentCounterSection = styled.section`
  margin: 6rem 0 4rem 0;
  padding: 0 2rem;
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const JobCounter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  padding: 3rem 4rem;
  border-radius: 2rem;
  border: 2px solid rgba(255, 125, 0, 0.2);
  box-shadow: 0 8px 32px rgba(255, 125, 0, 0.1);
  max-width: 90rem;
  width: 100%;
  ${mq('<=tablet', 'padding: 2rem;')}
`;

const TotalCount = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  text-align: center;
  ${mq('<=tablet', 'font-size: 2.4rem;')}
`;

const CounterSkeleton = styled.div`
  background: rgba(255, 125, 0, 0.2);
  border-radius: 0.5rem;
  height: 2.8rem;
  width: 20rem;
  animation: pulse 1.5s ease-in-out infinite alternate;
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;

const DepartmentCounts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  ${mq('<=tablet', 'gap: 1rem;')}
`;

const DepartmentCount = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 8rem;
  
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    border-color: rgb(255, 125, 0);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 125, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  ${mq('<=tablet', 'min-width: 6rem; padding: 1rem 1.5rem;')}
`;

const CountBadge = styled.div`
  background: rgb(255, 125, 0);
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 125, 0, 0.3);
  ${mq('<=tablet', 'width: 3rem; height: 3rem; font-size: 1.6rem;')}
`;

const DeptName = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--text), 0.8);
  text-align: center;
  line-height: 1.2;
  ${mq('<=tablet', 'font-size: 1.2rem;')}
`;

const PositionsSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 8rem;
    height: 3px;
    background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
    border-radius: 2px;
  }
  
  ${mq('<=tablet', 'font-size: 2.8rem; margin-bottom: 3rem;')}
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 4rem;
  justify-content: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 1rem;
  font-size: 1.4rem;
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 0.8rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: rgb(255, 125, 0);
  }
  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 8px rgba(255, 125, 0, 0.3);
  }
`;

const JobCategory = styled.div`
  margin-bottom: 4rem;
  scroll-margin-top: 100px;
  @keyframes highlight {
    0% { border: 3px solid rgba(255, 125, 0, 0); }
    50% { border: 3px solid rgba(255, 125, 0, 0.8); }
    100% { border: 3px solid rgba(255, 125, 0, 0); }
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  ${mq('<=tablet', 'flex-direction: column; align-items: flex-start; gap: 1rem;')}
`;

const CategoryTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
`;

const BackToAllJobsButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: transparent;
  color: rgb(255, 125, 0);
  border: 2px solid rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
  }
  ${mq('<=tablet', 'width: 100%; text-align: center;')}
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
  ${mq('<=tablet', 'grid-template-columns: 1fr; display: none;')}
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
  ${mq('<=tablet', 'justify-self: start !important; width: 100%;')}
`;

const JobTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgb(255, 125, 0);
  line-height: 1.3;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    color: rgb(230, 100, 0);
    text-decoration: underline;
    transform: translateX(4px);
  }
  &:hover::after {
    content: '→';
    position: absolute;
    right: -2rem;
    opacity: 0.7;
    font-size: 1.4rem;
    animation: pulse 1s infinite;
  }
  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  ${mq('<=tablet', 'font-size: 2rem; margin-bottom: 0.8rem;')}
`;

const JobPreview = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin: 0;
  line-height: 1.4;
  ${mq('<=tablet', 'font-size: 1.5rem; margin-bottom: 1rem; line-height: 1.5;')}
`;

const DepartmentTag = styled.span`
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
  white-space: nowrap;
  ${mq('<=tablet', 'font-size: 1.4rem; padding: 0.8rem 1.5rem;')}
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
  ${mq('<=tablet', 'justify-content: flex-start; font-size: 1.5rem;')}
`;

const TypeBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  ${mq('<=tablet', 'font-size: 1.3rem; padding: 0.8rem 1.5rem;')}
`;

const SalaryText = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.9);
  font-weight: 600;
  text-align: center;
  ${mq('<=tablet', 'text-align: left; font-size: 1.5rem;')}
`;

const JobActions = styled.div`
  display: flex;
  gap: 1rem;
  ${mq('<=tablet', 'flex-direction: column; width: 100%; margin-top: 1rem;')}
`;

const LearnMoreButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: transparent;
  color: rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.2);
  }
  ${mq('<=tablet', 'width: 100%; padding: 1.2rem 2rem; font-size: 1.6rem;')}
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
  ${mq('<=tablet', 'width: 100%; padding: 1.2rem 2rem; font-size: 1.6rem; min-height: 44px; margin-top: 1rem;')}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
`;

const LoadingSpinner = styled(Loader2)`
  width: 4rem;
  height: 4rem;
  color: rgb(255, 125, 0);
  animation: spin 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  margin-top: 1rem;
`;

const NoPositionsMessage = styled.div`
  text-align: center;
  padding: 4rem;
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  border: 1px solid rgba(var(--text), 0.1);
  box-shadow: var(--shadow-md);
`;

const NoPositionsIcon = styled.div`
  font-size: 4rem;
  color: rgb(255, 125, 0);
  margin-bottom: 1rem;
`;

const NoPositionsTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const NoPositionsText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  max-width: 60rem;
  margin: 0 auto;
  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Modal Styled Components (unchanged)
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

const JobModalContent = styled(motion.div)`
  background: rgba(var(--background), 0.98);
  border-radius: 2rem;
  padding: 0;
  max-width: 80rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--text), 0.1);
  ${mq('<=tablet', 'max-width: 95vw; margin: 1rem; border-radius: 1.5rem;')}
`;

const JobModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem 0 4rem;
  margin-bottom: 2rem;
  ${mq('<=tablet', 'padding: 2rem 3rem 0 3rem;')}
`;

const JobModalTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: rgb(230, 100, 0);
    text-decoration: underline;
  }
  ${mq('<=tablet', 'font-size: 2.4rem;')}
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

const JobModalBody = styled.div`
  padding: 0 4rem 4rem 4rem;
  ${mq('<=tablet', 'padding: 0 3rem 3rem 3rem;')}
`;

const JobModalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
  ${mq('<=tablet', 'flex-direction: column; gap: 1rem;')}
`;

const JobModalMetaItem = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const JobModalSection = styled.div`
  margin-bottom: 3rem;
`;

const JobModalSectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  padding-bottom: 1rem;
`;

const JobModalText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin: 0;
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RequirementItem = styled.li`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: rgb(255, 125, 0);
    font-size: 1.8rem;
  }
`;

const JobModalActions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  ${mq('<=tablet', 'flex-direction: column;')}
`;

const PrimaryButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }
  ${mq('<=tablet', 'width: 100%;')}
`;

const SecondaryButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  background: transparent;
  color: rgb(255, 125, 0);
  border: 2px solid rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.2);
  }
  ${mq('<=tablet', 'width: 100%;')}
`;

const AuthModalContent = styled(motion.div)`
  background: rgba(var(--background), 0.98);
  border-radius: 2rem;
  padding: 3rem;
  max-width: 50rem;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--text), 0.1);
  ${mq('<=tablet', 'max-width: 95vw; margin: 1rem; padding: 2rem;')}
`;

const AuthModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AuthModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
`;

const AuthModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.4rem;
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 0.8rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 8px rgba(255, 125, 0, 0.3);
  }
`;

const AuthLink = styled.button`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  &:hover {
    text-decoration: underline;
    color: rgb(230, 100, 0);
  }
`;

const AuthModalActions = styled.div`
  display: flex;
  gap: 1.5rem;
  ${mq('<=tablet', 'flex-direction: column;')}
`;

const ErrorText = styled.p`
  font-size: 1.4rem;
  color: rgb(239, 68, 68);
  margin: 0;
  text-align: center;
`;
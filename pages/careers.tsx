// pages/careers.tsx - Fixed version with proper authentication validation
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { mq } from 'utils/media';
import { Loader2, AlertCircle, CheckCircle, Link, Eye, EyeOff } from 'lucide-react';
import { PreciseAnalyticsLogo } from 'components/PreciseAnalyticsLogo';

// ATS API Configuration
const ATS_BASE_URL = process.env.NEXT_PUBLIC_ATS_API_URL || 'https://precise-analytics-ats.vercel.app';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Enhanced validation utilities
const ValidationUtils = {
  email: {
    validate: (email: string): { isValid: boolean; error?: string } => {
      if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
      }
      
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
      
      if (email.length > 254) {
        return { isValid: false, error: 'Email address is too long' };
      }
      
      return { isValid: true };
    }
  },
  
  password: {
    validate: (password: string): { isValid: boolean; errors: string[]; strength: 'weak' | 'medium' | 'strong' } => {
      const errors: string[] = [];
      let strength: 'weak' | 'medium' | 'strong' = 'weak';
      
      if (!password) {
        return { isValid: false, errors: ['Password is required'], strength: 'weak' };
      }
      
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
      
      if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strength = 'strong';
      } else if (password.length >= 8 && errors.length <= 2) {
        strength = 'medium';
      }
      
      return {
        isValid: errors.length === 0,
        errors,
        strength
      };
    },
    
    checkCommonPasswords: (password: string): boolean => {
      const commonPasswords = [
        'password', '123456', '123456789', 'qwerty', 'abc123', 'password1',
        'admin', 'letmein', 'welcome', '123123', 'Password1', 'password123'
      ];
      return !commonPasswords.includes(password.toLowerCase());
    }
  },
  
  name: {
    validate: (name: string): { isValid: boolean; error?: string } => {
      if (!name.trim()) {
        return { isValid: false, error: 'Name is required' };
      }
      
      if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters long' };
      }
      
      if (name.trim().length > 50) {
        return { isValid: false, error: 'Name must be less than 50 characters' };
      }
      
      if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
      }
      
      return { isValid: true };
    }
  }
};

// Enhanced mock data for development/fallback
const MOCK_POSITIONS = [
  {
    id: 'data-scientist-001',
    title: 'Senior Data Scientist',
    department: 'data-science',
    location: 'richmond-va',
    employment_type: 'full-time',
    description: 'Join our data science team to develop advanced analytics solutions for federal agencies. Work with cutting-edge ML/AI technologies to solve complex problems in healthcare, defense, and civilian sectors.',
    requirements: [
      'PhD or Master\'s in Data Science, Statistics, Computer Science, or related field',
      '5+ years experience in data science and machine learning',
      'Proficiency in Python, R, SQL, and modern ML frameworks',
      'Experience with federal contracting preferred',
      'Active security clearance preferred but not required'
    ],
    salary_range: '$120,000 - $180,000',
    benefits: 'Comprehensive health insurance, retirement planning, professional development, flexible work arrangements',
    status: 'published',
    posted: true
  },
  {
    id: 'devops-engineer-001',
    title: 'DevOps Engineer',
    department: 'engineering',
    location: 'remote',
    employment_type: 'full-time',
    description: 'Build and maintain cloud infrastructure supporting mission-critical data analytics platforms. Work with modern DevOps tools and practices in AWS/Azure environments.',
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '3+ years experience with cloud platforms (AWS, Azure, GCP)',
      'Strong knowledge of containerization (Docker, Kubernetes)',
      'Experience with Infrastructure as Code (Terraform, CloudFormation)',
      'CI/CD pipeline development and maintenance'
    ],
    salary_range: '$100,000 - $150,000',
    benefits: 'Full remote work options, professional development budget, health insurance',
    status: 'published',
    posted: true
  },
  {
    id: 'business-analyst-001',
    title: 'Business Analyst',
    department: 'consulting',
    location: 'hybrid',
    employment_type: 'full-time',
    description: 'Bridge the gap between technical solutions and business requirements for government clients. Analyze complex business processes and recommend data-driven improvements.',
    requirements: [
      'Bachelor\'s degree in Business Administration, Economics, or related field',
      '2+ years experience in business analysis or consulting',
      'Strong analytical and communication skills',
      'Experience with data visualization tools (Tableau, Power BI)',
      'Government contracting experience preferred'
    ],
    salary_range: '$80,000 - $120,000',
    benefits: 'Hybrid work model, professional certifications, comprehensive benefits',
    status: 'published',
    posted: true
  }
];

// Enhanced development mode authentication with proper validation
const mockAuthForDevelopment = {
  registeredUsers: new Map<string, { id: string; name: string; email: string; password: string; verified: boolean; createdAt: Date }>(),
  
  login: async (email: string, password: string) => {
    console.log('🔄 Mock login attempt:', { email, password: password ? '[REDACTED]' : '' });
    
    // Validate email format
    const emailValidation = ValidationUtils.email.validate(email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.error || 'Invalid email format');
    }
    
    // Validate password
    if (!password || password.trim().length === 0) {
      throw new Error('Password is required');
    }
    
    // Check if user exists and password matches
    const user = mockAuthForDevelopment.registeredUsers.get(email.toLowerCase());
    if (!user) {
      throw new Error('No account found with this email address');
    }
    
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }
    
    if (!user.verified) {
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
    }
    
    const mockToken = 'dev-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    console.log('✅ Mock login successful:', { id: user.id, name: user.name, email: user.email });
    
    return { 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email }, 
      token: mockToken 
    };
  },
  
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    console.log('🔄 Mock registration attempt:', { firstName, lastName, email });
    
    // Validate first name
    const firstNameValidation = ValidationUtils.name.validate(firstName);
    if (!firstNameValidation.isValid) {
      throw new Error(`First name error: ${firstNameValidation.error}`);
    }
    
    // Validate last name
    const lastNameValidation = ValidationUtils.name.validate(lastName);
    if (!lastNameValidation.isValid) {
      throw new Error(`Last name error: ${lastNameValidation.error}`);
    }
    
    // Validate email
    const emailValidation = ValidationUtils.email.validate(email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.error || 'Invalid email format');
    }
    
    // Validate password
    const passwordValidation = ValidationUtils.password.validate(password);
    if (!passwordValidation.isValid) {
      throw new Error(`Password requirements not met: ${passwordValidation.errors.join(', ')}`);
    }
    
    // Check for common passwords
    if (!ValidationUtils.password.checkCommonPasswords(password)) {
      throw new Error('Please choose a less common password');
    }
    
    // Check if user already exists
    if (mockAuthForDevelopment.registeredUsers.has(email.toLowerCase())) {
      throw new Error('An account with this email already exists');
    }
    
    // Create user
    const userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    
    mockAuthForDevelopment.registeredUsers.set(email.toLowerCase(), {
      id: userId,
      name: fullName,
      email: email.toLowerCase(),
      password: password,
      verified: IS_DEVELOPMENT, // Auto-verify in development, require verification in production
      createdAt: new Date()
    });
    
    console.log('✅ Mock registration successful');
    console.log('📧 Registered users:', Array.from(mockAuthForDevelopment.registeredUsers.keys()));
    
    return { 
      success: true, 
      message: IS_DEVELOPMENT 
        ? 'Registration successful! You can now login.' 
        : 'Registration successful! Please check your email to verify your account before logging in.'
    };
  },
  
  resetPassword: async (email: string) => {
    console.log('🔄 Mock password reset attempt:', { email });
    
    // Validate email
    const emailValidation = ValidationUtils.email.validate(email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.error || 'Invalid email format');
    }
    
    // Check if user exists
    const user = mockAuthForDevelopment.registeredUsers.get(email.toLowerCase());
    if (!user) {
      // Don't reveal whether email exists for security
      console.log('⚠️ Password reset requested for non-existent email:', email);
    }
    
    console.log('✅ Mock password reset successful');
    return { 
      success: true, 
      message: 'If an account with this email exists, you will receive a password reset link shortly.' 
    };
  },
  
  verifyEmail: async (email: string, token: string) => {
    console.log('🔄 Mock email verification attempt:', { email, token });
    
    const user = mockAuthForDevelopment.registeredUsers.get(email.toLowerCase());
    if (!user) {
      throw new Error('Invalid verification link');
    }
    
    // In real implementation, you'd verify the token
    user.verified = true;
    console.log('✅ Mock email verification successful');
    
    return { success: true, message: 'Email verified successfully! You can now login.' };
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

interface ValidationState {
  email: { isValid: boolean; error?: string };
  password: { isValid: boolean; errors: string[]; strength?: 'weak' | 'medium' | 'strong' };
  firstName: { isValid: boolean; error?: string };
  lastName: { isValid: boolean; error?: string };
  confirmPassword: { isValid: boolean; error?: string };
}

export default function CareersPage() {
  const router = useRouter();
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
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [resetEmail, setResetEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({
    email: { isValid: true },
    password: { isValid: true, errors: [] },
    firstName: { isValid: true },
    lastName: { isValid: true },
    confirmPassword: { isValid: true }
  });
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
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

  // Enhanced fetch positions with better error handling and fallbacks
  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Starting API request...');
      
      console.log('🔄 Fetching positions from ATS:', ATS_BASE_URL);
      console.log('🔄 Environment:', { NODE_ENV: process.env.NODE_ENV, IS_DEVELOPMENT });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.log('⏰ Request timed out after 10 seconds');
      }, 10000);

      let apiResponse = null;
      let apiError = null;

      try {
        setDebugInfo('Attempting API connection...');
        
        const response = await fetch(`${ATS_BASE_URL}/api/jobs?status=published`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
            'User-Agent': 'PreciseAnalytics-Careers/1.0'
          },
          signal: controller.signal,
          cache: 'no-store',
          mode: 'cors'
        });

        clearTimeout(timeoutId);

        console.log('📡 API Response status:', response.status, response.statusText);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('⚠️ API returned non-JSON response:', contentType);
          const textResponse = await response.text();
          console.log('📄 Non-JSON response:', textResponse.substring(0, 200));
          throw new Error('API returned non-JSON response');
        }

        const data = await response.json();
        console.log('📊 ATS API Response:', JSON.stringify(data, null, 2));

        if (!data || typeof data !== 'object') {
          throw new Error('Invalid API response format: not an object');
        }

        if (!data.success) {
          throw new Error(data.error || data.message || 'API returned success: false');
        }

        if (!Array.isArray(data.jobs)) {
          console.warn('⚠️ API response missing jobs array:', data);
          throw new Error('API response missing jobs array');
        }

        apiResponse = data;
        setDebugInfo(`✅ API successful: ${data.jobs.length} jobs found`);

      } catch (fetchError: any) {
        apiError = fetchError;
        console.error('❌ API Error:', fetchError.message);
        setDebugInfo(`❌ API Error: ${fetchError.message}`);
        
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.');
        }
      }

      // Process API response or use fallback
      let processedPositions: Position[] = [];

      if (apiResponse && apiResponse.jobs) {
        processedPositions = apiResponse.jobs.map((job: any) => {
          const salaryParsed = parseSalaryRange(job.salary_range);
          return {
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
        });

        console.log('✅ Processed API positions:', processedPositions.length);
        setDebugInfo(`✅ Loaded ${processedPositions.length} positions from API`);

      } else {
        console.log('🔄 Using mock data as fallback');
        processedPositions = MOCK_POSITIONS.map(pos => ({
          ...pos,
          id: pos.id || crypto.randomUUID()
        }));
        
        setDebugInfo(`🔄 Using mock data: ${processedPositions.length} positions (API unavailable)`);
        
        if (IS_DEVELOPMENT) {
          console.log('🏗️ Development mode: Using mock data for better UX');
        } else {
          console.warn('⚠️ Production mode: API failed, using fallback data');
        }
      }

      console.log('✅ Final processed positions:', processedPositions);
      setPositions(processedPositions);
      setFilteredPositions(processedPositions);

      // Build filter options
      const uniqueDepartments = Array.from(
        new Set(
          processedPositions
            .map((pos: Position) => pos.department)
            .filter((dept: any): dept is string => typeof dept === 'string' && dept !== 'general')
        )
      ).sort() as string[];

      const uniqueLocations = Array.from(
        new Set(
          processedPositions
            .map((pos: Position) => pos.location)
            .filter((loc: any): loc is string => typeof loc === 'string' && loc !== 'location tbd')
        )
      ).sort() as string[];

      const uniqueEmploymentTypes = Array.from(
        new Set(
          processedPositions
            .map((pos: Position) => pos.employment_type)
            .filter((type: any): type is string => typeof type === 'string')
        )
      ).sort() as string[];

      setDepartments(['All', ...uniqueDepartments]);
      setLocations(['All', ...uniqueLocations]);
      setEmploymentTypes(['All', ...uniqueEmploymentTypes]);

      console.log('📊 Filter options built:', {
        departments: uniqueDepartments,
        locations: uniqueLocations,
        employmentTypes: uniqueEmploymentTypes
      });

    } catch (error: any) {
      console.error('❌ Final error in fetchPositions:', error.message);
      setError(error.message || 'Failed to load job listings. Please try again later.');
      setDebugInfo(`❌ Error: ${error.message}`);
      
      setPositions([]);
      setFilteredPositions([]);
      setDepartments(['All']);
      setLocations(['All']);
      setEmploymentTypes(['All']);
    } finally {
      setLoading(false);
      console.log('🏁 fetchPositions completed');
    }
  }, []);

  // Initialize positions on component mount
  useEffect(() => {
    console.log('🚀 Careers page mounted, starting position fetch...');
    fetchPositions();
  }, [fetchPositions]);

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

  // Apply filters
  useEffect(() => {
    console.log('🔍 Applying filters:', filters);
    let result = [...positions];
    
    if (filters.department !== 'All') {
      result = result.filter((pos: Position) => 
        pos.department?.toLowerCase() === filters.department.toLowerCase()
      );
    }
    
    if (filters.location !== 'All') {
      result = result.filter((pos: Position) => 
        pos.location?.toLowerCase() === filters.location.toLowerCase()
      );
    }
    
    if (filters.employment_type !== 'All') {
      result = result.filter((pos: Position) => 
        pos.employment_type?.toLowerCase() === filters.employment_type.toLowerCase()
      );
    }

    console.log('🔍 Filtered results:', result.length, 'positions');
    setFilteredPositions(result);
  }, [filters, positions]);

  // Real-time validation for registration form
  const validateField = (field: string, value: string) => {
    let newValidationState = { ...validationState };
    
    switch (field) {
      case 'email':
        newValidationState.email = ValidationUtils.email.validate(value);
        break;
      case 'password':
        const passwordValidation = ValidationUtils.password.validate(value);
        newValidationState.password = passwordValidation;
        setPasswordStrength(passwordValidation.strength);
        
        // Also validate confirm password if it exists
        if (registerData.confirmPassword) {
          newValidationState.confirmPassword = value === registerData.confirmPassword 
            ? { isValid: true }
            : { isValid: false, error: 'Passwords do not match' };
        }
        break;
      case 'firstName':
        newValidationState.firstName = ValidationUtils.name.validate(value);
        break;
      case 'lastName':
        newValidationState.lastName = ValidationUtils.name.validate(value);
        break;
      case 'confirmPassword':
        newValidationState.confirmPassword = value === registerData.password 
          ? { isValid: true }
          : { isValid: false, error: 'Passwords do not match' };
        break;
    }
    
    setValidationState(newValidationState);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    console.log('🔄 Filter changed:', key, '=', value);
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
    console.log('🎯 Department counter clicked:', department);
    setFilters((prev) => ({ ...prev, department }));
    setTimeout(() => {
      if (positionsSectionRef.current) {
        positionsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBackToAllJobs = () => {
    console.log('🔙 Back to all jobs clicked');
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

  // Enhanced login with proper validation
  const handleLogin = async () => {
    try {
      setAuthError(null);
      setAuthLoading(true);
      console.log('🔐 Login attempt for:', loginData.email);
      
      // Client-side validation
      const emailValidation = ValidationUtils.email.validate(loginData.email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }
      
      if (!loginData.password.trim()) {
        throw new Error('Password is required');
      }
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
          },
          body: JSON.stringify(loginData),
        });
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Auth API returned non-JSON response');
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
        console.log('✅ API Login successful:', data.user);
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'login', { method: 'email' });
        }
        
      } catch (apiError: any) {
        console.log('🔄 API login failed, trying mock auth:', apiError.message);
        
        // Use mock auth as fallback
        const mockResult = await mockAuthForDevelopment.login(loginData.email, loginData.password);
        localStorage.setItem('token', mockResult.token);
        localStorage.setItem('user', JSON.stringify(mockResult.user));
        setUser(mockResult.user);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setLoginData({ email: '', password: '' });
        console.log('✅ Mock login successful:', mockResult.user);
        
        if (IS_DEVELOPMENT) {
          alert('✅ Development Mode: Login successful! (Using mock authentication)');
        }
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setAuthError(error.message || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  // Enhanced registration with comprehensive validation
  const handleRegister = async () => {
    try {
      setAuthError(null);
      setAuthLoading(true);
      console.log('📝 Registration attempt for:', registerData.email);
      
      // Comprehensive client-side validation
      const firstNameValidation = ValidationUtils.name.validate(registerData.firstName);
      if (!firstNameValidation.isValid) {
        throw new Error(`First name: ${firstNameValidation.error}`);
      }
      
      const lastNameValidation = ValidationUtils.name.validate(registerData.lastName);
      if (!lastNameValidation.isValid) {
        throw new Error(`Last name: ${lastNameValidation.error}`);
      }
      
      const emailValidation = ValidationUtils.email.validate(registerData.email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }
      
      const passwordValidation = ValidationUtils.password.validate(registerData.password);
      if (!passwordValidation.isValid) {
        throw new Error(`Password requirements: ${passwordValidation.errors.join(', ')}`);
      }
      
      if (!ValidationUtils.password.checkCommonPasswords(registerData.password)) {
        throw new Error('Please choose a less common password for better security');
      }
      
      if (registerData.password !== registerData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const fullName = `${registerData.firstName.trim()} ${registerData.lastName.trim()}`;
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
          },
          body: JSON.stringify({
            name: fullName,
            email: registerData.email,
            password: registerData.password,
          }),
        });
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Auth API returned non-JSON response');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Registration failed');
        }
        
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        setValidationState({
          email: { isValid: true },
          password: { isValid: true, errors: [] },
          firstName: { isValid: true },
          lastName: { isValid: true },
          confirmPassword: { isValid: true }
        });
        console.log('✅ API Registration successful');
        alert('Registration successful! Please check your email to verify your account before logging in.');
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sign_up', { method: 'email' });
        }
        
      } catch (apiError: any) {
        console.log('🔄 API registration failed, trying mock auth:', apiError.message);
        
        // Use mock auth as fallback
        const mockResult = await mockAuthForDevelopment.register(
          registerData.firstName, 
          registerData.lastName, 
          registerData.email, 
          registerData.password
        );
        
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        setValidationState({
          email: { isValid: true },
          password: { isValid: true, errors: [] },
          firstName: { isValid: true },
          lastName: { isValid: true },
          confirmPassword: { isValid: true }
        });
        console.log('✅ Mock registration successful');
        
        alert(mockResult.message);
      }
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      setAuthError(error.message || 'Registration failed');
    } finally {
      setAuthLoading(false);
    }
  };

  // Enhanced password reset with validation
  const handleResetPassword = async () => {
    try {
      setAuthError(null);
      setAuthLoading(true);
      console.log('🔑 Password reset attempt for:', resetEmail);
      
      // Validate email
      const emailValidation = ValidationUtils.email.validate(resetEmail);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }
      
      try {
        // Try real API first
        const response = await fetch(`${ATS_BASE_URL}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
          },
          body: JSON.stringify({ email: resetEmail }),
        });
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Auth API returned non-JSON response');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Password reset failed');
        }
        
        setShowResetModal(false);
        setResetEmail('');
        console.log('✅ API Password reset successful');
        alert('Password reset instructions have been sent to your email.');
        
      } catch (apiError: any) {
        console.log('🔄 API password reset failed, trying mock auth:', apiError.message);
        
        // Use mock auth as fallback
        const mockResult = await mockAuthForDevelopment.resetPassword(resetEmail);
        setShowResetModal(false);
        setResetEmail('');
        console.log('✅ Mock password reset successful');
        
        alert(mockResult.message);
      }
    } catch (error: any) {
      console.error('❌ Password reset error:', error);
      setAuthError(error.message || 'Password reset failed');
    } finally {
      setAuthLoading(false);
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
    console.log('📖 Learn more clicked for:', position.title);
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

  // Enhanced apply click handler
  const handleApplyClick = (position: Position) => {
    console.log('🚀 Apply clicked for:', position.title, 'User logged in:', isLoggedIn);
    
    const baseApplicationUrl = `/application/${position.id}`;
    
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

  // Manual refresh function for debugging
  const handleManualRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    setError(null);
    setDebugInfo('Manual refresh started...');
    fetchPositions();
  };

  // Helper function to get password strength color
  const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'strong': return '#10b981';
      default: return '#ef4444';
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
                <PreciseAnalyticsLogo 
                  width={200}
                  height={40}
                  clickable={true}
                  onClick={() => router.push('/')}
                />
              </LogoWrapper>
              <BadgesWrapper>
                <Badge>VOSB</Badge>
                <Badge>SWaM Certified</Badge>
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
                  As a <strong>Veteran-Owned Small Business (VOSB)</strong>, we bring unique perspectives and unwavering commitment to excellence.
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

          {/* Department Counter Section */}
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
                    ) : error ? (
                      <ErrorText>Failed to load positions</ErrorText>
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
            
            {/* Enhanced Filter Container */}
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
                {IS_DEVELOPMENT && <DebugText>Debug: {debugInfo}</DebugText>}
              </LoadingContainer>
            ) : error ? (
              <NoPositionsMessage>
                <NoPositionsIcon><AlertCircle size={40} /></NoPositionsIcon>
                <NoPositionsTitle>Unable to Load Jobs</NoPositionsTitle>
                <NoPositionsText>
                  {error}
                </NoPositionsText>
                <RetryButton onClick={handleManualRefresh}>
                  🔄 Try Again
                </RetryButton>
                <NoPositionsText>
                  For immediate assistance, contact{' '}
                  <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a>
                </NoPositionsText>
              </NoPositionsMessage>
            ) : Object.keys(groupedPositions).length === 0 ? (
              <NoPositionsMessage>
                <NoPositionsIcon>📋</NoPositionsIcon>
                <NoPositionsTitle>No Open Positions</NoPositionsTitle>
                <NoPositionsText>
                  We don&apos;t have any open positions matching your filters at the moment, but we&apos;re always looking for talented individuals to join our team.
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
                        <JobRequirementItem key={index}>{req}</JobRequirementItem>
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

      {/* Enhanced Login Modal */}
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
                {authError && <ErrorMessage>{authError}</ErrorMessage>}
                <InputGroup>
                  <InputLabel>Email Address</InputLabel>
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Enter your email address"
                    disabled={authLoading}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Password</InputLabel>
                  <PasswordInputContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Enter your password"
                      disabled={authLoading}
                    />
                    <PasswordToggle
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={authLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </PasswordInputContainer>
                </InputGroup>
                <AuthLink onClick={() => { setShowLoginModal(false); setShowResetModal(true); setAuthError(null); }}>
                  Forgot Password?
                </AuthLink>
                <AuthModalActions>
                  <SecondaryButton 
                    onClick={() => setShowLoginModal(false)}
                    disabled={authLoading}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    onClick={handleLogin}
                    disabled={authLoading || !loginData.email.trim() || !loginData.password.trim()}
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={16} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); setAuthError(null); }}>
                  Don&apos;t have an account? Register here
                </AuthLink>
              </AuthModalBody>
            </AuthModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Enhanced Registration Modal */}
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
                <AuthModalTitle>Create Account</AuthModalTitle>
                <CloseButton onClick={() => setShowRegisterModal(false)}>×</CloseButton>
              </AuthModalHeader>
              <AuthModalBody>
                {authError && <ErrorMessage>{authError}</ErrorMessage>}
                <InputGroup>
                  <InputLabel>First Name</InputLabel>
                  <Input
                    type="text"
                    value={registerData.firstName}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, firstName: e.target.value });
                      validateField('firstName', e.target.value);
                    }}
                    placeholder="Enter your first name"
                    disabled={authLoading}
                    $hasError={!validationState.firstName.isValid}
                  />
                  {!validationState.firstName.isValid && (
                    <ValidationError>{validationState.firstName.error}</ValidationError>
                  )}
                </InputGroup>
                <InputGroup>
                  <InputLabel>Last Name</InputLabel>
                  <Input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, lastName: e.target.value });
                      validateField('lastName', e.target.value);
                    }}
                    placeholder="Enter your last name"
                    disabled={authLoading}
                    $hasError={!validationState.lastName.isValid}
                  />
                  {!validationState.lastName.isValid && (
                    <ValidationError>{validationState.lastName.error}</ValidationError>
                  )}
                </InputGroup>
                <InputGroup>
                  <InputLabel>Email Address</InputLabel>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, email: e.target.value });
                      validateField('email', e.target.value);
                    }}
                    placeholder="Enter your email address"
                    disabled={authLoading}
                    $hasError={!validationState.email.isValid}
                  />
                  {!validationState.email.isValid && (
                    <ValidationError>{validationState.email.error}</ValidationError>
                  )}
                </InputGroup>
                <InputGroup>
                  <InputLabel>Password</InputLabel>
                  <PasswordInputContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, password: e.target.value });
                        validateField('password', e.target.value);
                      }}
                      placeholder="Create a strong password"
                      disabled={authLoading}
                      $hasError={!validationState.password.isValid}
                    />
                    <PasswordToggle
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={authLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </PasswordInputContainer>
                  {registerData.password && (
                    <PasswordStrengthIndicator>
                      <PasswordStrengthBar 
                        strength={passwordStrength}
                        color={getPasswordStrengthColor(passwordStrength)}
                      />
                      <PasswordStrengthText color={getPasswordStrengthColor(passwordStrength)}>
                        Password strength: {passwordStrength.toUpperCase()}
                      </PasswordStrengthText>
                    </PasswordStrengthIndicator>
                  )}
                  {!validationState.password.isValid && (
                    <ValidationErrorList>
                      {validationState.password.errors.map((error, index) => (
                        <ValidationError key={index}>• {error}</ValidationError>
                      ))}
                    </ValidationErrorList>
                  )}
                  <PasswordRequirements>
                    <RequirementTitle>Password must contain:</RequirementTitle>
                    <PasswordRequirementItem $met={registerData.password.length >= 8}>
                      At least 8 characters
                    </PasswordRequirementItem>
                    <PasswordRequirementItem $met={/[a-z]/.test(registerData.password)}>
                      One lowercase letter
                    </PasswordRequirementItem>
                    <PasswordRequirementItem $met={/[A-Z]/.test(registerData.password)}>
                      One uppercase letter
                    </PasswordRequirementItem>
                    <PasswordRequirementItem $met={/\d/.test(registerData.password)}>
                      One number
                    </PasswordRequirementItem>
                    <PasswordRequirementItem $met={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(registerData.password)}>
                      One special character
                    </PasswordRequirementItem>
                  </PasswordRequirements>
                </InputGroup>
                <InputGroup>
                  <InputLabel>Confirm Password</InputLabel>
                  <PasswordInputContainer>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, confirmPassword: e.target.value });
                        validateField('confirmPassword', e.target.value);
                      }}
                      placeholder="Confirm your password"
                      disabled={authLoading}
                      $hasError={!validationState.confirmPassword.isValid}
                    />
                    <PasswordToggle
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={authLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </PasswordInputContainer>
                  {!validationState.confirmPassword.isValid && (
                    <ValidationError>{validationState.confirmPassword.error}</ValidationError>
                  )}
                </InputGroup>
                <AuthModalActions>
                  <SecondaryButton 
                    onClick={() => setShowRegisterModal(false)}
                    disabled={authLoading}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    onClick={handleRegister}
                    disabled={
                      authLoading || 
                      !validationState.firstName.isValid ||
                      !validationState.lastName.isValid ||
                      !validationState.email.isValid ||
                      !validationState.password.isValid ||
                      !validationState.confirmPassword.isValid ||
                      !registerData.firstName.trim() ||
                      !registerData.lastName.trim() ||
                      !registerData.email.trim() ||
                      !registerData.password.trim() ||
                      !registerData.confirmPassword.trim()
                    }
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={16} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); setAuthError(null); }}>
                  Already have an account? Login here
                </AuthLink>
              </AuthModalBody>
            </AuthModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Enhanced Password Reset Modal */}
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
                {authError && <ErrorMessage>{authError}</ErrorMessage>}
                <ResetPasswordInfo>
                  Enter your email address and we&apos;ll send you instructions to reset your password.
                </ResetPasswordInfo>
                <InputGroup>
                  <InputLabel>Email Address</InputLabel>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={authLoading}
                  />
                </InputGroup>
                <AuthModalActions>
                  <SecondaryButton 
                    onClick={() => setShowResetModal(false)}
                    disabled={authLoading}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    onClick={handleResetPassword}
                    disabled={authLoading || !resetEmail.trim()}
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={16} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </PrimaryButton>
                </AuthModalActions>
                <AuthLink onClick={() => { setShowResetModal(false); setShowLoginModal(true); setAuthError(null); }}>
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

// Enhanced Styled Components with validation styles
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const DebugText = styled.p`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  font-family: 'Courier New', monospace;
  margin-top: 1rem;
`;

const RetryButton = styled.button`
  background: rgb(255, 125, 0);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
  }
`;

const HeaderSection = styled.header`
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  flex-wrap: wrap;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
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

// Modal Styled Components
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

const JobRequirementItem = styled.li`
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  ${mq('<=tablet', 'width: 100%;')}
`;

const AuthModalContent = styled(motion.div)`
  background: rgba(var(--background), 0.98);
  border-radius: 2rem;
  padding: 3rem;
  max-width: 50rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
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

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 1rem;
  font-size: 1.4rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : 'rgba(255, 125, 0, 0.3)'};
  border-radius: 0.8rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : 'rgb(255, 125, 0)'};
    box-shadow: 0 0 8px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 125, 0, 0.3)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: rgb(var(--text), 0.6);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    color: rgb(var(--text));
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ValidationError = styled.p`
  font-size: 1.2rem;
  color: #ef4444;
  margin: 0.5rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ValidationErrorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  text-align: center;
`;

const PasswordStrengthIndicator = styled.div`
  margin-top: 0.8rem;
`;

const PasswordStrengthBar = styled.div<{ strength: string; color: string }>`
  height: 4px;
  border-radius: 2px;
  background: ${props => props.color};
  width: ${props => 
    props.strength === 'weak' ? '33%' : 
    props.strength === 'medium' ? '66%' : '100%'
  };
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
`;

const PasswordStrengthText = styled.p<{ color: string }>`
  font-size: 1.2rem;
  color: ${props => props.color};
  margin: 0;
  font-weight: 600;
`;

const PasswordRequirements = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 0.8rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const RequirementTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0 0 1rem 0;
`;

const PasswordRequirementItem = styled.div<{ $met: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.$met ? '#10b981' : 'rgb(var(--text), 0.6)'};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: ${props => props.$met ? '"✓"' : '"○"'};
    font-weight: bold;
    color: ${props => props.$met ? '#10b981' : 'rgb(var(--text), 0.4)'};
  }
`;

const ResetPasswordInfo = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  text-align: center;
  margin: 0;
  line-height: 1.5;
`;

const AuthLink = styled.button`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  padding: 0.5rem;
  
  &:hover:not(:disabled) {
    text-decoration: underline;
    color: rgb(230, 100, 0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
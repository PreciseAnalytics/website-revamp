import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Hero from 'views/ContactPage/Hero';

// Enhanced Contact Form Component
function EnhancedContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for auto-advancing
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Validate phone number
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes with auto-advancing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, nextRef?: React.RefObject<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Phone number formatting
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
      
      // Auto-advance when phone is complete
      if (processedValue.length === 14 && nextRef?.current) {
        setTimeout(() => nextRef.current?.focus(), 100);
      }
      
      // Validate phone
      if (processedValue.length === 14) {
        if (!validatePhone(processedValue)) {
          setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
        } else {
          setErrors(prev => ({ ...prev, phone: '' }));
        }
      }
    }

    // Email validation
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    // Auto-advance is only used for phone numbers, not names

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
            jobTitle: formData.jobTitle.trim(),
            projectType: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            message: formData.message.trim()
          })
        });

        const result = await response.json();

        if (result.success) {
          setSubmitSuccess(true);
          setFormData({
            firstName: '', lastName: '', email: '', phone: '', company: '',
            jobTitle: '', projectType: '', budget: '', timeline: '', message: ''
          });
          setErrors({});
        } else {
          // Handle API errors
          if (result.errors && Array.isArray(result.errors)) {
            const apiErrors: { [key: string]: string } = {};
            result.errors.forEach((error: string) => {
              if (error.includes('First name')) apiErrors.firstName = error;
              else if (error.includes('Last name')) apiErrors.lastName = error;
              else if (error.includes('Email') || error.includes('email')) apiErrors.email = error;
              else if (error.includes('Phone') || error.includes('phone')) apiErrors.phone = error;
              else if (error.includes('Message')) apiErrors.message = error;
            });
            setErrors(apiErrors);
          } else {
            setErrors({ general: result.message || 'Failed to send message. Please try again.' });
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      }
    }

    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <SuccessMessage
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessIcon>✨</SuccessIcon>
        <SuccessTitle>Thank You!</SuccessTitle>
        <SuccessText>
          🎉 Fantastic! Your detailed project information is on its way to our team! We&apos;re excited to dive deep into your requirements and will reach out within 24 hours with a comprehensive plan tailored just for you. Get ready for some amazing analytics transformation! ✨
        </SuccessText>
        <ResetButton onClick={() => setSubmitSuccess(false)}>
          Send Another Message
        </ResetButton>
      </SuccessMessage>
    );
  }

  return (
    <FormContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormTitle>Contact Us</FormTitle>
      <FormSubtitle>
        Ready to transform your data strategy? Let&apos;s discuss your project.
      </FormSubtitle>

      <StyledForm onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <FormSection>
          <SectionTitle>Personal Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>First Name *</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, lastNameRef)}
                placeholder="Enter your first name"
                $hasError={!!errors.firstName}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name *</FormLabel>
              <FormInput
                ref={lastNameRef}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, emailRef)}
                placeholder="Enter your last name"
                $hasError={!!errors.lastName}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
          </FormRow>
        </FormSection>

        {/* Contact Information Section */}
        <FormSection>
          <SectionTitle>Contact Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Email Address *</FormLabel>
              <FormInput
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, phoneRef)}
                placeholder="your.email@company.com"
                $hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone Number *</FormLabel>
              <FormInput
                ref={phoneRef}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange(e, companyRef)}
                placeholder="(555) 123-4567"
                maxLength={14}
                $hasError={!!errors.phone}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>
          </FormRow>
        </FormSection>

        {/* Company Information Section */}
        <FormSection>
          <SectionTitle>Company Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Company/Organization</FormLabel>
              <FormInput
                ref={companyRef}
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange(e, jobTitleRef)}
                placeholder="Your company name"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Job Title</FormLabel>
              <FormInput
                ref={jobTitleRef}
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange(e)}
                placeholder="Your job title"
              />
            </FormGroup>
          </FormRow>
        </FormSection>

        {/* Project Details Section */}
        <FormSection>
          <SectionTitle>Project Details</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Project Type</FormLabel>
              <FormSelect
                name="projectType"
                value={formData.projectType}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select project type</option>
                <option value="data-analytics">Data Analytics & BI</option>
                <option value="software-development">Software Development</option>
                <option value="ai-ml">AI/ML Solutions</option>
                <option value="consulting">Data Consulting</option>
                <option value="other">Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Budget Range</FormLabel>
              <FormSelect
                name="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select budget range</option>
                <option value="under-25k">Under $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="over-250k">Over $250,000</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormGroup>
            <FormLabel>Timeline</FormLabel>
            <FormSelect
              name="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="planning">Still planning</option>
            </FormSelect>
          </FormGroup>
        </FormSection>

        {/* Message Section */}
        <FormSection>
          <SectionTitle>Your Message</SectionTitle>
          <FormGroup>
            <FormLabel>Project Description *</FormLabel>
            <FormTextarea
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange(e)}
              placeholder="Tell us about your project, goals, challenges, and any specific requirements..."
              rows={6}
              $hasError={!!errors.message}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        {/* General Error Display */}
        {errors.general && (
          <GeneralErrorMessage>
            {errors.general}
          </GeneralErrorMessage>
        )}

        {/* Submit Button */}
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              Sending Message...
            </>
          ) : (
            'Send Message'
          )}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Contact Us`}</title>
        <meta
          name="description"
          content="Contact Precise Analytics for data analytics, ETL, custom dashboards, and AI/ML solutions. Get in touch with our experts today."
        />
        <meta
          name="keywords" 
          content="contact precise analytics, data analytics consulting, data solutions, analytics experts, get a quote"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <EnhancedContentWrapper>
          <Hero />
          <ContactFormWrapper>
            <ContactFormIntro
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FormIntroTitle>Prefer to Send a Message?</FormIntroTitle>
              <FormIntroText>
                Use the form below if you have detailed questions or simply prefer 
                written communication. We&apos;ll respond within 24 hours.
              </FormIntroText>
              <FormBenefits>
                <BenefitItem>
                  <BenefitIcon>📋</BenefitIcon>
                  <BenefitText>Detailed project requirements and specifications</BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>💬</BenefitIcon>
                  <BenefitText>Ask detailed questions about our services</BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>✉️</BenefitIcon>
                  <BenefitText>Get a written response you can reference later</BenefitText>
                </BenefitItem>
              </FormBenefits>
              
              <SocialMediaSection>
                <SocialMediaIcons>
                  <SocialIcon href="https://www.linkedin.com/company/103138904/admin/dashboard" target="_blank" rel="noopener noreferrer">
                    <SocialIconImage src="/linkedin.svg" alt="LinkedIn" />
                    <SocialText>LinkedIn</SocialText>
                  </SocialIcon>
                  <SocialIcon href="https://www.facebook.com/PreciseAnalytics.io" target="_blank" rel="noopener noreferrer">
                    <SocialIconImage src="/facebook.svg" alt="Facebook" />
                    <SocialText>Facebook</SocialText>
                  </SocialIcon>
                  <SocialIcon href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
                    <SocialIconImage src="/github.svg" alt="GitHub" />
                    <SocialText>GitHub</SocialText>
                  </SocialIcon>
                </SocialMediaIcons>
              </SocialMediaSection>
              
              <FormContainerWrapper>
                <EnhancedContactForm />
              </FormContainerWrapper>
            </ContactFormIntro>
          </ContactFormWrapper>
        </EnhancedContentWrapper>
      </PageWrapper>
      
    </>
  );
}

// Existing styled components for the page layout
const PageWrapper = styled.div`
  position: relative;
  background: rgb(var(--background));
  min-height: 100vh;
`;

const EnhancedContentWrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(var(--accent), 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(var(--accent), 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const ContactFormWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContactFormIntro = styled.div`
  max-width: 140rem;
  margin: 0 auto 4rem;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border-radius: 2rem;
  border: 1px solid rgba(var(--accent), 0.1);
  box-shadow: 0 8px 25px rgba(255, 125, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    max-width: 100%;
  }
`;

const FormIntroTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  color: rgb(var(--accent));
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(255, 125, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const FormIntroText = styled.p`
  font-size: 1.9rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.9;
  margin-bottom: 3rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const FormBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1.2rem;
  border: 2px solid rgba(var(--accent), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(var(--cardBackground), 1);
    border-color: rgba(var(--accent), 0.3);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 125, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.4rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(255, 125, 0, 0.2));
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BenefitText = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text));
  margin: 0;
  text-align: left;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }
`;

const SocialMediaSection = styled.div`
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(var(--accent), 0.2);
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border-radius: 1.5rem;
  padding: 3rem 2rem;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1.5rem;
  border: 2px solid rgba(var(--accent), 0.1);
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 12rem;
  
  &:hover {
    background: rgba(var(--cardBackground), 1);
    border-color: rgba(var(--accent), 0.4);
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(255, 125, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    min-width: 10rem;
    padding: 1.5rem;
  }
`;

const SocialIconImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
  filter: brightness(0.8);
  transition: all 0.3s ease;
  
  ${SocialIcon}:hover & {
    filter: brightness(1) drop-shadow(0 4px 8px rgba(255, 125, 0, 0.3));
    transform: scale(1.15);
  }
  
  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const SocialText = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  transition: color 0.3s ease;
  
  ${SocialIcon}:hover & {
    color: rgb(var(--accent));
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FormContainerWrapper = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid rgba(var(--accent), 0.2);
  width: 100%;
  display: flex;
  justify-content: center;
`;

// Enhanced Contact Form Styled Components
const FormContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem;
  background: rgba(var(--cardBackground), 0.95);
  border-radius: 2rem;
  border: 2px solid rgba(255, 125, 0, 0.2);
  box-shadow: 0 12px 40px rgba(255, 125, 0, 0.1);
  backdrop-filter: blur(20px);
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 0 1rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

const FormSubtitle = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text));
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FormLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const FormInput = styled.input<{ $hasError?: boolean }>`
  padding: 1.2rem 1.6rem;
  border: 2px solid ${props => props.$hasError ? 'rgb(220, 38, 38)' : 'rgba(255, 125, 0, 0.2)'};
  border-radius: 0.8rem;
  font-size: 1.5rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.1);
  }
  
  &::placeholder {
    color: rgba(var(--text), 0.5);
  }
`;

const FormSelect = styled.select`
  padding: 1.2rem 1.6rem;
  border: 2px solid rgba(255, 125, 0, 0.2);
  border-radius: 0.8rem;
  font-size: 1.5rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.1);
  }
`;

const FormTextarea = styled.textarea<{ $hasError?: boolean }>`
  padding: 1.2rem 1.6rem;
  border: 2px solid ${props => props.$hasError ? 'rgb(220, 38, 38)' : 'rgba(255, 125, 0, 0.2)'};
  border-radius: 0.8rem;
  font-size: 1.5rem;
  background: rgba(var(--cardBackground), 0.8);
  color: rgb(var(--text));
  transition: all 0.3s ease;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
    box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.1);
  }
  
  &::placeholder {
    color: rgba(var(--text), 0.5);
  }
`;

const ErrorMessage = styled.span`
  color: rgb(220, 38, 38);
  font-size: 1.2rem;
  font-weight: 500;
`;

const GeneralErrorMessage = styled.div`
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: rgb(220, 38, 38);
  padding: 1.5rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  margin: 2rem 0;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  padding: 1.6rem 3rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 125, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 4rem;
  background: rgba(var(--cardBackground), 0.95);
  border-radius: 2rem;
  border: 2px solid rgba(34, 197, 94, 0.3);
  max-width: 60rem;
  margin: 0 auto;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const SuccessTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(34, 197, 94);
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 125, 0, 0.3);
  }
`;
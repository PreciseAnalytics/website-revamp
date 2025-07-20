import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';
import StructuredData from 'components/StructuredData';
import ThemeToggle from '@/components/ThemeToggle';

const services = [
  {
    title: 'Data Analytics',
    icon: '📊',
    description: 'Transform raw data into actionable insights that drive informed decision-making for mission-critical operations.',
    features: [
      'Advanced statistical analysis',
      'Predictive modeling and forecasting',
      'Real-time data processing',
      'Custom analytics solutions',
    ],
    buttonText: 'Unlock Your Data Insights',
  },
  {
    title: 'Business Intelligence',
    icon: '📈',
    description: 'Custom dashboards and reporting solutions that provide real-time visibility into your business performance.',
    features: [
      'Interactive dashboards',
      'Automated reporting systems',
      'KPI tracking and monitoring',
      'Executive decision support',
    ],
    buttonText: 'Build Smart Dashboards',
  },
  {
    title: 'AI/ML Solutions',
    icon: '🤖',
    description: 'Advanced machine learning models and artificial intelligence solutions for predictive analytics and automation.',
    features: [
      'Machine learning algorithms',
      'Natural language processing',
      'Computer vision applications',
      'Automated decision systems',
    ],
    buttonText: 'Explore AI Solutions',
  },
  {
    title: 'Data Engineering',
    icon: '⚙️',
    description: 'Robust data pipeline architecture and infrastructure solutions that ensure reliable, scalable data flow.',
    features: [
      'ETL/ELT pipeline development',
      'Cloud data architecture',
      'Data warehouse design',
      'Real-time streaming solutions',
    ],
    buttonText: 'Engineer Your Data Pipeline',
  },
];

const industries = [
  {
    name: 'Government & Federal',
    description: 'Specialized analytics solutions for government agencies with security clearance and compliance expertise.',
    icon: '🏛️',
  },
  {
    name: 'Healthcare & Life Sciences',
    description: 'HIPAA-compliant analytics for medical data, patient outcomes, and operational efficiency.',
    icon: '🏥',
  },
  {
    name: 'Financial Services',
    description: 'Risk analysis, fraud detection, and regulatory compliance solutions for financial institutions.',
    icon: '🏦',
  },
  {
    name: 'Manufacturing',
    description: 'Operational efficiency optimization and supply chain analytics for manufacturing companies.',
    icon: '🏭',
  },
];

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

export default function HomePage() {
  const router = useRouter();
  const [contactData, setContactData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [isMounted, setIsMounted] = useState(false);
  const contactFormRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateForm = useCallback((data: ContactFormData): Partial<ContactFormData> => {
    const errors: Partial<ContactFormData> = {};
    if (!data.firstName.trim()) errors.firstName = 'First name is required';
    if (!data.lastName.trim()) errors.lastName = 'Last name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!data.company.trim()) errors.company = 'Company/Organization is required';
    return errors;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [formErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(contactData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);
    setFormErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Submitted:', contactData);
      setSubmitSuccess(`Thank you! We'll be in touch within 24 hours to discuss your project.`);
      setContactData(initialFormData);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitSuccess('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [contactData, validateForm]);

  const handleGetStartedClick = useCallback((serviceTitle: string) => {
    setContactData(prev => ({ ...prev, service: serviceTitle }));
    if (isMounted && contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isMounted]);

  const handleLearnMoreClick = useCallback(() => {
    router.push('/about-us');
  }, [router]);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <>
      <Head>
        <StructuredData />
        <title>{`${EnvVars.SITE_NAME} - Data Analytics Solutions`}</title>
        <meta
          name="description"
          content="Veteran-owned data analytics company providing comprehensive solutions for government and commercial clients. VOSB and SWaM certified."
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroSection>
              <HeroContent>
                <HeroTitle>Welcome to Precise Analytics</HeroTitle>
                <HeroSubtitle>Experts in Data Engineering, Analytics, Consulting & Hardware Solutions</HeroSubtitle>
                <HeroDescription>
                  Veteran-owned data analytics company specializing in comprehensive solutions for government and commercial clients. 
                  We turn complex data into actionable insights that drive informed decision-making across all technology domains.
                </HeroDescription>
                <HeroButtons>
                  <PrimaryButton onClick={() => handleGetStartedClick('Consultation')}>
                    Get Started Today
                  </PrimaryButton>
                  <SecondaryButtonLink onClick={handleLearnMoreClick}>
                    Learn More About Us
                  </SecondaryButtonLink>
                </HeroButtons>
              </HeroContent>
            </HeroSection>
          </motion.div>

          {/* Services Section */}
          <ServicesSection>
            <SectionTitle>Our Services</SectionTitle>
            <SectionSubtitle>Comprehensive data analytics solutions tailored to your mission</SectionSubtitle>
            
            <ServiceCardsGrid>
              {services.map((service) => (
                <ServiceCard key={service.title}>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  
                  <FeaturesSection>
                    <FeaturesTitle>Key Capabilities:</FeaturesTitle>
                    <FeaturesList>
                      {service.features.map((feature, i) => (
                        <FeatureItem key={i}>{feature}</FeatureItem>
                      ))}
                    </FeaturesList>
                  </FeaturesSection>

                  <LearnMoreButton onClick={() => handleGetStartedClick(service.title)}>
                    {service.buttonText}
                  </LearnMoreButton>
                </ServiceCard>
              ))}
            </ServiceCardsGrid>
          </ServicesSection>

          {/* Certifications Section */}
          <CertificationsSection>
            <SectionTitle>Certifications & Qualifications</SectionTitle>
            <SectionSubtitle>Trusted partner for government and commercial projects</SectionSubtitle>
            
            <CertGrid>
              <CertCard>
                <CertLogo>
                  <Image 
                    src="/Veteran-Owned-Certified.png" 
                    alt="VOSB Certified" 
                    width={150}
                    height={100}
                    style={{
                      objectFit: 'contain',
                      maxHeight: '10rem',
                      maxWidth: '15rem'
                    }}
                  />
                </CertLogo>
                <CertTitle>Veteran-Owned Small Business</CertTitle>
                <CertDescription>
                  SBA certified VOSB with extensive federal contracting experience and security clearance capabilities.
                </CertDescription>
                <CertFeatures>
                  <li>Federal contracting experience</li>
                  <li>Security clearance projects</li>
                  <li>GSA Schedule holder</li>
                  <li>NAICS compliance</li>
                </CertFeatures>
                <CertLink 
                  href="https://dsbs.sba.gov/search/dsp_profile.cfm?SAM_UEI=ZRCYVLWCXL57"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View SBA Certification
                </CertLink>
              </CertCard>
              
              <CertCard>
                <CertLogo>
                  <Image 
                    src="/SWAM_LOGO.jpg" 
                    alt="SWaM Certified" 
                    width={150}
                    height={100}
                    style={{
                      objectFit: 'contain',
                      maxHeight: '10rem',
                      maxWidth: '15rem'
                    }}
                  />
                </CertLogo>
                <CertTitle>SWaM Certified</CertTitle>
                <CertDescription>
                  Virginia Small, Women-owned, and Minority-owned business certification for state and local projects.
                </CertDescription>
                <CertFeatures>
                  <li>Virginia state certification</li>
                  <li>Local government projects</li>
                  <li>Minority-owned business</li>
                  <li>SWAM compliance</li>
                </CertFeatures>
                <CertLink 
                  href="https://directory.sbsd.virginia.gov/#/directory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View SWaM Directory
                </CertLink>
              </CertCard>
            </CertGrid>
          </CertificationsSection>

          {/* Industries Section */}
          <IndustriesSection>
            <SectionTitle>Industries We Serve</SectionTitle>
            <SectionSubtitle>Specialized expertise across key sectors</SectionSubtitle>
            
            <IndustriesGrid>
              {industries.map((industry) => (
                <IndustryCard key={industry.name}>
                  <IndustryIcon>{industry.icon}</IndustryIcon>
                  <IndustryName>{industry.name}</IndustryName>
                  <IndustryDescription>{industry.description}</IndustryDescription>
                </IndustryCard>
              ))}
            </IndustriesGrid>
          </IndustriesSection>

          {/* Contact Form Section */}
          <ContactSection id="contact-form" ref={contactFormRef}>
            <FormWrapper>
              <FormTitle>Start Your Project</FormTitle>
              <FormSubtitle>Ready to transform your data? Let&apos;s discuss your specific needs and goals.</FormSubtitle>
              
              {submitSuccess && (
                <StatusMessage success={submitSuccess.includes('Thank you')}>
                  {submitSuccess}
                </StatusMessage>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                <FormGrid>
                  <FormField>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={contactData.firstName}
                      onChange={handleChange}
                      required
                      aria-invalid={!!formErrors.firstName}
                      aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                    />
                    {formErrors.firstName && (
                      <ErrorMessage id="firstName-error">{formErrors.firstName}</ErrorMessage>
                    )}
                  </FormField>
                  
                  <FormField>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={contactData.lastName}
                      onChange={handleChange}
                      required
                      aria-invalid={!!formErrors.lastName}
                      aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                    />
                    {formErrors.lastName && (
                      <ErrorMessage id="lastName-error">{formErrors.lastName}</ErrorMessage>
                    )}
                  </FormField>
                </FormGrid>

                <FormGrid>
                  <FormField>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      required
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {formErrors.email && (
                      <ErrorMessage id="email-error">{formErrors.email}</ErrorMessage>
                    )}
                  </FormField>

                  <FormField>
                    <label htmlFor="company">Company/Organization *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={contactData.company}
                      onChange={handleChange}
                      required
                      aria-invalid={!!formErrors.company}
                      aria-describedby={formErrors.company ? "company-error" : undefined}
                    />
                    {formErrors.company && (
                      <ErrorMessage id="company-error">{formErrors.company}</ErrorMessage>
                    )}
                  </FormField>
                </FormGrid>

                <FormField>
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={contactData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Hardware Solutions">Hardware Solutions</option>
                    <option value="Consulting Services">Consulting Services</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>

                <FormField>
                  <label htmlFor="message">Project Details & Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your data challenges, goals, and what you're hoping to achieve..."
                  />
                </FormField>

                <SubmitBtn type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Start the Conversation'}
                </SubmitBtn>
              </Form>
            </FormWrapper>
          </ContactSection>
        </Container>
      </PageWrapper>
    </>
  );
}

// === Styled Components ===
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0 8rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05) 0%, rgba(255, 165, 0, 0.02) 100%);
  border-radius: 2rem;
  margin-bottom: 8rem;
`;

const HeroContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;

  ${media.desktop(`
    font-size: 4.8rem;
  `)}

  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const HeroSubtitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;

  ${media.tablet(`
    font-size: 2rem;
  `)}
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin-bottom: 3rem;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  ${media.tablet(`
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  `)}
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.3);
  }

  ${media.tablet(`
    padding: 1.2rem 2.5rem;
    font-size: 1.6rem;
  `)}
`;

const SecondaryButtonLink = styled.div`
  background: transparent;
  color: rgb(255, 125, 0);
  padding: 1.5rem 3rem;
  border: 2px solid rgb(255, 125, 0);
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(255, 125, 0);
    color: white;
    transform: translateY(-2px);
  }

  ${media.tablet(`
    padding: 1.2rem 2.5rem;
    font-size: 1.6rem;
  `)}
`;

const ServicesSection = styled.section`
  margin-bottom: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 2.8rem;
  `)}
`;

const SectionSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const ServiceCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 2rem;
  `)}
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;

  ${media.tablet(`
    font-size: 3rem;
  `)}
`;

const ServiceTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(255, 125, 0);

  ${media.tablet(`
    font-size: 2rem;
  `)}
`;

const ServiceDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);

  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;

const FeaturesSection = styled.div`
  margin: 2rem 0;
  text-align: left;
  flex-grow: 1;
`;

const FeaturesTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: 1.4rem;
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

  ${media.tablet(`
    font-size: 1.2rem;
  `)}
`;

const LearnMoreButton = styled.button`
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

  ${media.tablet(`
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
  `)}
`;

const CertificationsSection = styled.section`
  margin-bottom: 8rem;
  padding: 6rem 0;
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 2rem;

  ${media.tablet(`
    padding: 4rem 0;
  `)}
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 3rem;
  max-width: 100rem;
  margin: 0 auto;

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 2rem;
  `)}
`;

const CertCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const CertLogo = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CertTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;

const CertDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);

  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;

const CertFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  text-align: left;

  li {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    padding-left: 2rem;
    position: relative;
    color: rgb(var(--text), 0.8);

    &:before {
      content: '✓';
      color: rgb(255, 125, 0);
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    ${media.tablet(`
      font-size: 1.2rem;
    `)}
  }
`;

const CertLink = styled.a`
  color: rgb(255, 125, 0);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.6rem;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(255, 165, 0);
    text-decoration: underline;
  }

  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;

const IndustriesSection = styled.section`
  margin-bottom: 8rem;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2.5rem;

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 2rem;
  `)}
`;

const IndustryCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const IndustryIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;

  ${media.tablet(`
    font-size: 2.5rem;
  `)}
`;

const IndustryName = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;

const IndustryDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);

  ${media.tablet(`
    font-size: 1.3rem;
  `)}
`;

const ContactSection = styled.section`
  margin-bottom: 8rem;
`;

const FormWrapper = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  max-width: 80rem;
  margin: 0 auto;

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 2.4rem;
  `)}
`;

const FormSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(var(--text), 0.7);

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 1.5rem;
  `)}
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type='text'],
  input[type='email'],
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

    &[aria-invalid="true"] {
      border-color: #dc3545;
    }

    ${media.tablet(`
      padding: 1.2rem;
      font-size: 1.4rem;
    `)}
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgb(var(--text), 0.8);
    margin-bottom: 0.5rem;
    display: block;

    ${media.tablet(`
      font-size: 1.2rem;
    `)}
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  display: block;
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
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${media.tablet(`
    padding: 1.5rem;
    font-size: 1.6rem;
  `)}
`;

const StatusMessage = styled.p<{ success: boolean }>`
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem;
  background: ${props => props.success ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  border: 1px solid ${props => props.success ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
  border-radius: 0.8rem;
  color: ${props => props.success ? 'green' : 'red'};
  margin-bottom: 2rem;

  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;
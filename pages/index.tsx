import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

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

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => setIsClient(true), []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);

    // Simulate async submission
    setTimeout(() => {
      console.log('Submitted:', contactData);
      setIsSubmitting(false);
      setSubmitSuccess('Thank you! We\'ll be in touch within 24 hours to discuss your project.');
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
    }, 2000);
  };

  const handleGetStartedClick = (serviceTitle: string) => {
    setContactData({ ...contactData, service: serviceTitle });
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Data Analytics Solutions`}</title>
        <meta
          name="description"
          content="Veteran-owned data analytics company providing comprehensive solutions for government and commercial clients. VOSB and SWaM certified."
        />
        <meta
          name="keywords"
          content="data analytics, business intelligence, VOSB, veteran owned, government contracting, data science, machine learning"
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroSection>
              <HeroContent>
                <HeroTitle>Precise Analytics</HeroTitle>
                <HeroSubtitle>Transforming Data Into Mission Success</HeroSubtitle>
                <HeroDescription>
                  Veteran-owned data analytics company specializing in comprehensive solutions for government and commercial clients. 
                  We turn complex data into actionable insights that drive informed decision-making.
                </HeroDescription>
                <HeroButtons>
                  <PrimaryButton onClick={() => handleGetStartedClick('Consultation')}>
                    Get Started Today
                  </PrimaryButton>
                  <SecondaryButton href="/about-us">Learn More About Us</SecondaryButton>
                </HeroButtons>
              </HeroContent>
            </HeroSection>
          </motion.div>

          {/* Services Section */}
          <ServicesSection>
            <SectionTitle>Our Services</SectionTitle>
            <SectionSubtitle>Comprehensive data analytics solutions tailored to your mission</SectionSubtitle>
            
            <ServiceCardsGrid>
              {services.map((service, index) => (
                <ServiceCard key={index}>
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
                    Learn More
                  </LearnMoreButton>
                </ServiceCard>
              ))}
            </ServiceCardsGrid>
          </ServicesSection>

          {/* Certifications Section */}
          <CertificationsSection>
            <SectionTitle>Certified & Qualified</SectionTitle>
            <SectionSubtitle>Trusted partner for government and commercial projects</SectionSubtitle>
            
            <CertGrid>
              <CertCard>
                <CertLogo>
                  <img src="/Veteran-Owned-Certified.png" alt="VOSB Certified" />
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
                  <img src="/SWAM_LOGO.jpg" alt="SWaM Certified" />
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
              {industries.map((industry, index) => (
                <IndustryCard key={index}>
                  <IndustryIcon>{industry.icon}</IndustryIcon>
                  <IndustryName>{industry.name}</IndustryName>
                  <IndustryDescription>{industry.description}</IndustryDescription>
                </IndustryCard>
              ))}
            </IndustriesGrid>
          </IndustriesSection>

          {/* Contact Form Section */}
          <ContactSection id="contact-form">
            <FormWrapper>
              <FormTitle>Start Your Project</FormTitle>
              <FormSubtitle>Ready to transform your data? Let's discuss your specific needs and goals.</FormSubtitle>
              
              {submitSuccess && (
                <StatusMessage>{submitSuccess}</StatusMessage>
              )}
              
              <Form onSubmit={handleSubmit}>
                <FormGrid>
                  <div>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={contactData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={contactData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGrid>

                <FormGrid>
                  <div>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company">Company/Organization *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={contactData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGrid>

                <div>
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={contactData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message">Project Details & Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your data challenges, goals, and what you're hoping to achieve..."
                  />
                </div>

                <SubmitBtn type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Start the Conversation'}
                </SubmitBtn>
              </Form>
            </FormWrapper>
          </ContactSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// === Styled Components ===
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

// Hero Section Styles
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

  ${media.tablet} {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;

  ${media.tablet} {
    font-size: 2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin-bottom: 3rem;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet} {
    font-size: 1.6rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
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
`;

const SecondaryButton = styled.a`
  background: transparent;
  color: rgb(255, 125, 0);
  padding: 1.5rem 3rem;
  border: 2px solid rgb(255, 125, 0);
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(255, 125, 0);
    color: white;
    transform: translateY(-2px);
  }
`;

// Services Section Styles
const ServicesSection = styled.section`
  margin-bottom: 8rem;
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

const ServiceCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(255, 125, 0);
`;

const ServiceDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);
`;

const FeaturesSection = styled.div`
  margin: 2rem 0;
  text-align: left;
`;

const FeaturesTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
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
`;

// Certifications Section
const CertificationsSection = styled.section`
  margin-bottom: 8rem;
  padding: 6rem 0;
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 2rem;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 3rem;
  max-width: 100rem;
  margin: 0 auto;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
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
`;

const CertLogo = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  
  img {
    max-height: 10rem;
    max-width: 15rem;
    object-fit: contain;
  }
`;

const CertTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
`;

const CertDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);
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
`;

// Industries Section
const IndustriesSection = styled.section`
  margin-bottom: 8rem;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2.5rem;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
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
`;

const IndustryIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const IndustryName = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const IndustryDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
`;

// Contact Form Styles (matching your other pages)
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

  ${media.tablet} {
    padding: 3rem 2rem;
  }
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

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
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
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgb(var(--text), 0.8);
    margin-bottom: 0.5rem;
    display: block;
  }
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.p`
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 0.8rem;
  color: green;
  margin-bottom: 2rem;
`;
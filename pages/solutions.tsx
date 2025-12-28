import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const solutions = [
  {
    title: 'ETL & Data Integration',
    category: 'Data Pipeline | Enterprise',
    description: 'Seamless data pipeline solutions that connect, transform, and load data from multiple sources into unified systems for comprehensive analytics.',
    features: [
      'Real-time data processing and streaming',
      'Multi-source integration (APIs, databases, files)',
      'Data quality assurance and validation',
      'Automated workflow orchestration',
    ],
    icon: '📊',
  },
  {
    title: 'Custom Dashboards',
    category: 'Visualization | Interactive',
    description: 'Interactive, real-time dashboards tailored to your specific business needs and KPIs, providing actionable insights at a glance.',
    features: [
      'Real-time data visualization',
      'Interactive reporting and filtering',
      'Mobile-responsive design',
      'Role-based access controls',
    ],
    icon: '📈',
  },
  {
    title: 'AI/ML Solutions',
    category: 'Artificial Intelligence | Predictive',
    description: 'Advanced machine learning models and artificial intelligence solutions for predictive analytics, automation, and intelligent decision-making.',
    features: [
      'Predictive modeling and forecasting',
      'Pattern recognition and anomaly detection',
      'Automated insights and recommendations',
      'Custom algorithm development',
    ],
    icon: '🤖',
  },
  {
    title: 'Business Intelligence',
    category: 'Analytics | Strategic',
    description: 'Comprehensive BI solutions that provide deep insights into your business performance, trends, and strategic opportunities.',
    features: [
      'Strategic planning and analysis',
      'KPI tracking and performance metrics',
      'Trend analysis and market intelligence',
      'Executive decision support systems',
    ],
    icon: '🎯',
  },
  {
    title: 'Cloud Analytics',
    category: 'Cloud Infrastructure | Scalable',
    description: 'Scalable cloud-based analytics solutions that grow with your business needs, ensuring performance and cost-effectiveness.',
    features: [
      'Scalable cloud infrastructure (AWS, Azure)',
      'Cost optimization and resource management',
      'Enterprise security and compliance',
      '24/7 monitoring and support',
    ],
    icon: '☁️',
  },
  {
    title: 'Data Consulting',
    category: 'Strategy | Implementation',
    description: 'Expert consultation services to help you develop and implement effective data strategies that align with your business objectives.',
    features: [
      'Data strategy development and roadmapping',
      'Technology selection and architecture',
      'Implementation planning and support',
      'Team training and knowledge transfer',
    ],
    icon: '🔧',
  },
];

const industries = [
  {
    name: 'Government & Federal',
    description: 'Specialized analytics solutions for government agencies with VOSB and SWaM certifications',
    expertise: ['Federal compliance', 'Security clearance projects', 'Grant management analytics', 'Policy impact analysis'],
  },
  {
    name: 'Healthcare & Life Sciences',
    description: 'HIPAA-compliant analytics for medical data, patient outcomes, and operational efficiency',
    expertise: ['Patient analytics', 'Clinical trial data', 'Healthcare operations', 'Regulatory compliance'],
  },
  {
    name: 'Financial Services',
    description: 'Risk analysis, fraud detection, and regulatory compliance solutions for financial institutions',
    expertise: ['Risk modeling', 'Fraud detection', 'Regulatory reporting', 'Customer analytics'],
  },
  {
    name: 'Manufacturing & Supply Chain',
    description: 'Operational efficiency optimization and supply chain analytics for manufacturing companies',
    expertise: ['Production optimization', 'Supply chain analytics', 'Quality control', 'Predictive maintenance'],
  },
];

export default function SolutionsPage() {
  const [isClient, setIsClient] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    solution: '',
    message: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick client-side validation
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.solution) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch('/api/solutions-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          company: contactData.company,
          solution: contactData.solution,
          timeline: contactData.timeline,
          message: contactData.message
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - show modal and clear form
        setShowSuccessModal(true);
        setContactData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          solution: '',
          message: '',
          timeline: '',
        });
      } else {
        // Error - show alert with option to email directly
        alert(data.message || 'There was an error submitting your request. Please try again or email us at contact@preciseanalytics.io');
        setIsError(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please email us directly at contact@preciseanalytics.io');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetStartedClick = (solutionTitle: string) => {
    setContactData({ ...contactData, solution: solutionTitle });
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      const yOffset = -100; // Offset for header
      const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Data Analytics Solutions`}</title>
        <meta name="description" content="Comprehensive data analytics solutions including ETL, custom dashboards, AI/ML, and business intelligence for government and commercial clients." />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Analytics Solutions</PageTitle>
            <PageSubtitle>Transforming data into actionable insights that drive mission success.</PageSubtitle>
          </motion.div>

          <SolutionsSection>
            <SectionTitle>Our Solutions</SectionTitle>
            <SectionSubtitle>Comprehensive analytics tools and technologies tailored to your needs</SectionSubtitle>
            
            <SolutionCardsGrid>
              {solutions.map((solution, index) => (
                <SolutionCard key={index}>
                  <SolutionCardHeader>
                    <SolutionIcon>{solution.icon}</SolutionIcon>
                    <SolutionTitle>{solution.title}</SolutionTitle>
                    <SolutionCategory>{solution.category}</SolutionCategory>
                  </SolutionCardHeader>
                  
                  <SolutionDescription>{solution.description}</SolutionDescription>
                  
                  <FeaturesSection>
                    <FeaturesTitle>Key Features:</FeaturesTitle>
                    <FeaturesList>
                      {solution.features.map((feature, i) => (
                        <FeatureItem key={i}>{feature}</FeatureItem>
                      ))}
                    </FeaturesList>
                  </FeaturesSection>

                  <GetStartedButton onClick={() => handleGetStartedClick(solution.title)}>
                    Get Started
                  </GetStartedButton>
                </SolutionCard>
              ))}
            </SolutionCardsGrid>
          </SolutionsSection>

          <IndustriesSection>
            <SectionTitle>Industries We Serve</SectionTitle>
            <SectionSubtitle>Specialized expertise across key sectors</SectionSubtitle>
            
            <IndustriesGrid>
              {industries.map((industry, index) => (
                <IndustryCard key={index}>
                  <IndustryHeader>
                    <IndustryName>{industry.name}</IndustryName>
                  </IndustryHeader>
                  
                  <IndustryDescription>{industry.description}</IndustryDescription>
                  
                  <ExpertiseSection>
                    <ExpertiseTitle>Our Expertise:</ExpertiseTitle>
                    <ExpertiseList>
                      {industry.expertise.map((item, i) => (
                        <ExpertiseItem key={i}>{item}</ExpertiseItem>
                      ))}
                    </ExpertiseList>
                  </ExpertiseSection>
                </IndustryCard>
              ))}
            </IndustriesGrid>
          </IndustriesSection>

          <ContactSection id="contact-form">
            <FormWrapper>
              <FormTitle>Start Your Project</FormTitle>
              <FormSubtitle>Ready to transform your data? Let&apos;s discuss your specific needs and goals.</FormSubtitle>
              
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

                <FormGrid>
                  <div>
                    <label htmlFor="solution">Solution of Interest *</label>
                    <select
                      id="solution"
                      name="solution"
                      value={contactData.solution}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a solution...</option>
                      {solutions.map((solution, index) => (
                        <option key={index} value={solution.title}>
                          {solution.title}
                        </option>
                      ))}
                      <option value="Custom Solution">Custom Solution</option>
                      <option value="Not Sure">Not Sure - Need Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline">Project Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={contactData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select timeline...</option>
                      <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                      <option value="Short-term (1-3 months)">Short-term (1-3 months)</option>
                      <option value="Medium-term (3-6 months)">Medium-term (3-6 months)</option>
                      <option value="Long-term (6+ months)">Long-term (6+ months)</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                </FormGrid>

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

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSuccessModal(false)}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <SuccessIcon>✓</SuccessIcon>
              <ModalTitle>Message Sent Successfully!</ModalTitle>
            </ModalHeader>
            
            <ModalBody>
              <ModalText>
                Your message has been successfully submitted. Thank you for trusting Precise Analytics with your analytics and data needs. One of our specialists will review your request and contact you soon to discuss how we can support your objectives with tailored, data-driven solutions.
              </ModalText>
              <ModalText>
                We appreciate the opportunity to work with you!
              </ModalText>
            </ModalBody>
            
            <ModalFooter>
              <CloseButton onClick={() => setShowSuccessModal(false)}>
                Close
              </CloseButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      
    </>
  );
}

// Styled Components with fixed media queries
const PageWrapper = styled.div`
  padding: 4rem 0 6rem;
  min-height: 100vh;
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

  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(var(--text), 0.8);
`;

const SolutionsSection = styled.section`
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

const SolutionCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${media.tablet(`
    grid-template-columns: 1fr;
  `)}
`;

const SolutionCard = styled.div`
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

const SolutionCardHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(var(--text), 0.1);
  text-align: center;
`;

const SolutionIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const SolutionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: rgb(255, 125, 0);
`;

const SolutionCategory = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 125, 0, 0.1);
  border-radius: 2rem;
  color: rgb(255, 125, 0);
`;

const SolutionDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);
`;

const FeaturesSection = styled.div`
  margin-top: 2rem;
`;

const FeaturesTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
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

const GetStartedButton = styled.button`
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

const IndustriesSection = styled.section`
  margin-top: 8rem;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2.5rem;

  ${media.tablet(`
    grid-template-columns: 1fr;
  `)}
`;

const IndustryCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
`;

const IndustryHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(var(--text), 0.1);
`;

const IndustryName = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const IndustryDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: rgb(var(--text), 0.8);
`;

const ExpertiseSection = styled.div`
  margin-top: 1.5rem;
`;

const ExpertiseTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const ExpertiseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExpertiseItem = styled.li`
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
  padding-left: 1.5rem;
  position: relative;
  color: rgb(var(--text), 0.8);

  &:before {
    content: '✓';
    color: rgb(255, 125, 0);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ContactSection = styled.section`
  margin-top: 8rem;
  margin-bottom: 10rem;
  padding: 0 0 6rem;
  min-height: 80vh;
`;

const FormWrapper = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  max-width: 80rem;
  margin: 0 auto;

  ${media.tablet(`
    padding: 3rem 2rem;
    margin: 0 2rem;
  `)}
  
  ${media.phone(`
    padding: 2rem 1.5rem;
    margin: 0 1rem;
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

  ${media.tablet(`
    grid-template-columns: 1fr;
  `)}
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

// Modal Styled Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  background: rgb(var(--cardBackground));
  border-radius: 2rem;
  max-width: 60rem;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 125, 0, 0.3);
  overflow: hidden;

  ${media.tablet(`
    max-width: 50rem;
  `)}

  ${media.phone(`
    max-width: 95%;
    margin: 0 1rem;
  `)}
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  padding: 3rem;
  text-align: center;
  position: relative;
`;

const SuccessIcon = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: white;
  color: rgb(255, 125, 0);
  font-size: 5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0;

  ${media.tablet(`
    font-size: 2.4rem;
  `)}
`;

const ModalBody = styled.div`
  padding: 3rem;
  text-align: center;

  ${media.phone(`
    padding: 2rem 1.5rem;
  `)}
`;

const ModalText = styled.p`
  font-size: 1.7rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin: 0 0 2rem 0;

  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    color: rgb(255, 125, 0);
  }

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const ModalFooter = styled.div`
  padding: 2rem 3rem 3rem;
  display: flex;
  justify-content: center;

  ${media.phone(`
    padding: 1.5rem 1.5rem 2rem;
  `)}
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  padding: 1.5rem 4rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 125, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 125, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.phone(`
    padding: 1.2rem 3rem;
    font-size: 1.6rem;
  `)}
`;
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

const HealthcarePage = () => {
  const handleConsultationClick = () => {
    // Scroll to contact form or redirect to contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no contact form on page, redirect to home page contact form
      window.location.href = '/#contact-form';
    }
  };

  return (
    <>
      <Head>
        <title>Healthcare Analytics Solutions | {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="HIPAA-compliant healthcare analytics for federal agencies including VA, CDC, NIH, and FDA. Transforming healthcare data into actionable insights."
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          {/* Hero Section */}
          <HeroSection>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTitle>Healthcare Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Transforming healthcare data into actionable insights for federal agencies and healthcare organizations
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          {/* Content Section */}
          <ContentSection>
            <SectionTitle>Our Healthcare Expertise</SectionTitle>
            
            {/* Services Grid */}
            <ServicesGrid>
              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ServiceIcon>🏥</ServiceIcon>
                <ServiceTitle>Clinical Data Analytics</ServiceTitle>
                <ServiceDescription>
                  Advanced analytics for clinical outcomes, patient safety metrics, and quality improvement initiatives. 
                  HIPAA-compliant solutions for federal healthcare agencies.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ServiceIcon>📊</ServiceIcon>
                <ServiceTitle>Population Health Management</ServiceTitle>
                <ServiceDescription>
                  Comprehensive population health analytics, epidemiological studies, and public health surveillance 
                  systems for VA, CDC, and other federal health agencies.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ServiceIcon>🔬</ServiceIcon>
                <ServiceTitle>Research & Development Analytics</ServiceTitle>
                <ServiceDescription>
                  Support for NIH, FDA, and other research institutions with clinical trial analytics, 
                  biostatistics, and regulatory compliance reporting.
                </ServiceDescription>
              </ServiceCard>
            </ServicesGrid>

            {/* Compliance Section */}
            <ComplianceSection>
              <SubSectionTitle>Healthcare Compliance & Security</SubSectionTitle>
              <ComplianceGrid>
                <ComplianceCard>
                  <ComplianceIcon>🛡️</ComplianceIcon>
                  <ComplianceTitle>HIPAA Compliance</ComplianceTitle>
                  <ComplianceDescription>Full HIPAA compliance for protected health information</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>🔒</ComplianceIcon>
                  <ComplianceTitle>NIST Cybersecurity</ComplianceTitle>
                  <ComplianceDescription>Implementation of NIST cybersecurity framework</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>✅</ComplianceIcon>
                  <ComplianceTitle>FDA 21 CFR Part 11</ComplianceTitle>
                  <ComplianceDescription>Electronic records and signatures compliance</ComplianceDescription>
                </ComplianceCard>
              </ComplianceGrid>
            </ComplianceSection>

            {/* Federal Clients Section */}
            <ClientsSection>
              <SubSectionTitle>Federal Healthcare Clients</SubSectionTitle>
              <ClientsGrid>
                {[
                  'Department of Veterans Affairs (VA)',
                  'Centers for Disease Control and Prevention (CDC)',
                  'National Institutes of Health (NIH)',
                  'Food and Drug Administration (FDA)',
                  'Centers for Medicare & Medicaid Services (CMS)',
                  'Department of Health and Human Services (HHS)'
                ].map((client, index) => (
                  <ClientCard key={index}>{client}</ClientCard>
                ))}
              </ClientsGrid>
            </ClientsSection>

            {/* Capabilities Section */}
            <CapabilitiesSection>
              <SubSectionTitle>Technical Capabilities</SubSectionTitle>
              <CapabilitiesGrid>
                {[
                  'Electronic Health Records (EHR) Integration',
                  'Clinical Decision Support Systems',
                  'Predictive Analytics for Patient Outcomes',
                  'Healthcare Cost Analysis and Optimization',
                  'Medical Device Data Integration',
                  'Telemedicine Analytics',
                  'Pharmaceutical Supply Chain Analytics',
                  'Public Health Emergency Response Systems'
                ].map((capability, index) => (
                  <CapabilityCard key={index}>{capability}</CapabilityCard>
                ))}
              </CapabilitiesGrid>
            </CapabilitiesSection>

            {/* CTA Section */}
            <CTASection>
              <CTATitle>Ready to Transform Your Healthcare Data?</CTATitle>
              <CTADescription>
                Partner with Precise Analytics for compliant, secure, and actionable healthcare analytics solutions.
              </CTADescription>
              <CTAButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultationClick}
              >
                Schedule a Consultation
              </CTAButton>
            </CTASection>
          </ContentSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
};

// Styled Components
const PageWrapper = styled.div`
  padding: 4rem 0;
  min-height: 100vh;
  background: rgb(var(--background));
  color: rgb(var(--text));
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0 8rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-radius: 2rem;
  margin-bottom: 8rem;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;

  ${media.tablet`
    font-size: 4rem;
  `}
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 80rem;
  margin: 0 auto;

  ${media.tablet`
    font-size: 1.8rem;
  `}
`;

const ContentSection = styled.section`
  padding: 0;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(34, 197, 94);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(34, 197, 94);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(34, 197, 94, 0.5);
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const ServiceTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(16, 185, 129);
`;

const ServiceDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.9;
`;

const ComplianceSection = styled.div`
  margin-bottom: 8rem;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
`;

const ComplianceCard = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
`;

const ComplianceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ComplianceTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(16, 185, 129);
`;

const ComplianceDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text));
  opacity: 0.8;
`;

const ClientsSection = styled.div`
  margin-bottom: 8rem;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
`;

const ClientCard = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(var(--text));
`;

const CapabilitiesSection = styled.div`
  margin-bottom: 8rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1.5rem;
`;

const CapabilityCard = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: rgb(var(--text));
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-radius: 2rem;
  padding: 4rem;
`;

const CTATitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgb(34, 197, 94);
`;

const CTADescription = styled.p`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: rgb(var(--text));
  opacity: 0.9;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
  color: white;
  border: none;
  border-radius: 5rem;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }
`;

export default HealthcarePage;
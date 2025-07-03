import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

const ManufacturingPage = () => {
  const handleConsultationClick = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-form';
    }
  };

  return (
    <>
      <Head>
        <title>Manufacturing Analytics Solutions | {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="ITAR/EAR compliant manufacturing analytics for defense contractors and federal agencies. Advanced IoT, supply chain, and quality analytics."
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
              <HeroTitle>Manufacturing Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Advanced analytics for defense manufacturing, industrial operations, and supply chain optimization
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          {/* Content Section */}
          <ContentSection>
            <SectionTitle>Manufacturing Excellence Through Data</SectionTitle>
            
            {/* Services Grid */}
            <ServicesGrid>
              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ServiceIcon>🏭</ServiceIcon>
                <ServiceTitle>Industrial IoT Analytics</ServiceTitle>
                <ServiceDescription>
                  Real-time monitoring and predictive analytics for manufacturing equipment, production lines, 
                  and quality control systems. ITAR/EAR compliant solutions for defense contractors.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ServiceIcon>⚙️</ServiceIcon>
                <ServiceTitle>Supply Chain Analytics</ServiceTitle>
                <ServiceDescription>
                  Comprehensive supply chain visibility, risk assessment, and optimization for federal procurement 
                  and defense manufacturing operations.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ServiceIcon>📈</ServiceIcon>
                <ServiceTitle>Quality & Compliance Analytics</ServiceTitle>
                <ServiceDescription>
                  Advanced quality management systems, regulatory compliance reporting, and continuous improvement 
                  analytics for defense and federal manufacturing standards.
                </ServiceDescription>
              </ServiceCard>
            </ServicesGrid>

            {/* Defense Section */}
            <ComplianceSection>
              <SubSectionTitle>Defense Manufacturing Expertise</SubSectionTitle>
              <ComplianceGrid>
                <ComplianceCard>
                  <ComplianceIcon>🛡️</ComplianceIcon>
                  <ComplianceTitle>ITAR/EAR Compliance</ComplianceTitle>
                  <ComplianceDescription>Full compliance with International Traffic in Arms Regulations</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>🔒</ComplianceIcon>
                  <ComplianceTitle>CMMI Level 5</ComplianceTitle>
                  <ComplianceDescription>Capability Maturity Model Integration certified processes</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>✅</ComplianceIcon>
                  <ComplianceTitle>AS9100 Standards</ComplianceTitle>
                  <ComplianceDescription>Aerospace and defense quality management systems</ComplianceDescription>
                </ComplianceCard>
              </ComplianceGrid>
            </ComplianceSection>

            {/* Federal Clients Section */}
            <ClientsSection>
              <SubSectionTitle>Federal Manufacturing Clients</SubSectionTitle>
              <ClientsGrid>
                {[
                  'Department of Defense (DoD)',
                  'Defense Logistics Agency (DLA)',
                  'Naval Sea Systems Command (NAVSEA)',
                  'Air Force Materiel Command (AFMC)',
                  'Army Materiel Command (AMC)',
                  'Defense Contract Management Agency (DCMA)',
                  'General Services Administration (GSA)',
                  'Department of Energy (DOE)'
                ].map((client, index) => (
                  <ClientCard key={index}>{client}</ClientCard>
                ))}
              </ClientsGrid>
            </ClientsSection>

            {/* Capabilities Section */}
            <CapabilitiesSection>
              <SubSectionTitle>Manufacturing Analytics Capabilities</SubSectionTitle>
              <CapabilitiesGrid>
                {[
                  'Predictive Maintenance Analytics',
                  'Production Optimization & Planning',
                  'Quality Control & Six Sigma Analytics',
                  'Supply Chain Risk Assessment',
                  'Energy Management & Sustainability',
                  'Inventory Optimization',
                  'Workforce Analytics & Safety',
                  'Cost Accounting & Profitability Analysis',
                  'Digital Twin Implementation',
                  'Lean Manufacturing Analytics'
                ].map((capability, index) => (
                  <CapabilityCard key={index}>{capability}</CapabilityCard>
                ))}
              </CapabilitiesGrid>
            </CapabilitiesSection>

            {/* Industries Section */}
            <IndustriesSection>
              <SubSectionTitle>Manufacturing Sectors We Serve</SubSectionTitle>
              <IndustriesGrid>
                <IndustryCard>
                  <IndustryIcon>✈️</IndustryIcon>
                  <IndustryName>Aerospace & Defense</IndustryName>
                  <IndustryDesc>Advanced analytics for aircraft, spacecraft, and defense systems manufacturing</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>🚗</IndustryIcon>
                  <IndustryName>Automotive</IndustryName>
                  <IndustryDesc>Production optimization and quality control for automotive manufacturing</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>⚡</IndustryIcon>
                  <IndustryName>Electronics</IndustryName>
                  <IndustryDesc>Semiconductor and electronics manufacturing process optimization</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>🏗️</IndustryIcon>
                  <IndustryName>Heavy Equipment</IndustryName>
                  <IndustryDesc>Industrial machinery and construction equipment analytics</IndustryDesc>
                </IndustryCard>
              </IndustriesGrid>
            </IndustriesSection>

            {/* CTA Section */}
            <CTASection>
              <CTATitle>Optimize Your Manufacturing Operations</CTATitle>
              <CTADescription>
                Partner with Precise Analytics for secure, compliant, and data-driven manufacturing solutions.
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
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%);
  border-radius: 2rem;
  margin-bottom: 8rem;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 165, 0), rgb(239, 68, 68));
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
  color: rgb(255, 165, 0);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(255, 165, 0);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(255, 165, 0, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 165, 0, 0.5);
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
  color: rgb(239, 68, 68);
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
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.2);
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
  color: rgb(239, 68, 68);
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
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
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
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: rgb(var(--text));
`;

const IndustriesSection = styled.div`
  margin-bottom: 8rem;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
`;

const IndustryCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(255, 165, 0, 0.2);
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 165, 0, 0.5);
    box-shadow: var(--shadow-md);
  }
`;

const IndustryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const IndustryName = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(239, 68, 68);
`;

const IndustryDesc = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1.5;
  color: rgb(var(--text));
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%);
  border-radius: 2rem;
  padding: 4rem;
`;

const CTATitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgb(255, 165, 0);
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
  background: linear-gradient(135deg, rgb(255, 165, 0), rgb(239, 68, 68));
  color: white;
  border: none;
  border-radius: 5rem;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 165, 0, 0.3);
  }
`;

export default ManufacturingPage;
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

const FinancePage = () => {
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
        <title>Financial Analytics Solutions | {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="SOX compliant financial analytics for federal agencies including Treasury, Federal Reserve, SEC, and CFTC. Risk management and regulatory compliance solutions."
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
              <HeroTitle>Financial Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Secure, compliant financial analytics for federal agencies, regulatory compliance, and risk management
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          {/* Content Section */}
          <ContentSection>
            <SectionTitle>Financial Expertise & Solutions</SectionTitle>
            
            {/* Services Grid */}
            <ServicesGrid>
              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ServiceIcon>💰</ServiceIcon>
                <ServiceTitle>Federal Financial Management</ServiceTitle>
                <ServiceDescription>
                  Advanced analytics for federal budget management, appropriations tracking, and financial reporting. 
                  SOX compliant solutions for Treasury, OMB, and other federal financial agencies.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ServiceIcon>🛡️</ServiceIcon>
                <ServiceTitle>Risk Management & Compliance</ServiceTitle>
                <ServiceDescription>
                  Comprehensive risk analytics, regulatory compliance monitoring, and fraud detection systems 
                  for banking regulators, CFTC, SEC, and financial oversight agencies.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ServiceIcon>📊</ServiceIcon>
                <ServiceTitle>Economic & Market Analytics</ServiceTitle>
                <ServiceDescription>
                  Economic forecasting, market surveillance, and financial stability analysis 
                  for Federal Reserve, FDIC, and other economic policy institutions.
                </ServiceDescription>
              </ServiceCard>
            </ServicesGrid>

            {/* Compliance Section */}
            <ComplianceSection>
              <SubSectionTitle>Financial Compliance & Security</SubSectionTitle>
              <ComplianceGrid>
                <ComplianceCard>
                  <ComplianceIcon>🔒</ComplianceIcon>
                  <ComplianceTitle>SOX Compliance</ComplianceTitle>
                  <ComplianceDescription>Sarbanes-Oxley Act compliance for financial reporting</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>🏦</ComplianceIcon>
                  <ComplianceTitle>Basel III/IV</ComplianceTitle>
                  <ComplianceDescription>International banking regulatory framework compliance</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>✅</ComplianceIcon>
                  <ComplianceTitle>FISMA Authorization</ComplianceTitle>
                  <ComplianceDescription>Federal cybersecurity compliance for financial systems</ComplianceDescription>
                </ComplianceCard>
              </ComplianceGrid>
            </ComplianceSection>

            {/* Federal Clients Section */}
            <ClientsSection>
              <SubSectionTitle>Federal Financial Clients</SubSectionTitle>
              <ClientsGrid>
                {[
                  'Department of Treasury',
                  'Federal Reserve System',
                  'Securities and Exchange Commission (SEC)',
                  'Commodity Futures Trading Commission (CFTC)',
                  'Federal Deposit Insurance Corporation (FDIC)',
                  'Office of the Comptroller of the Currency (OCC)',
                  'Consumer Financial Protection Bureau (CFPB)',
                  'Financial Crimes Enforcement Network (FinCEN)',
                  'Office of Management and Budget (OMB)'
                ].map((client, index) => (
                  <ClientCard key={index}>{client}</ClientCard>
                ))}
              </ClientsGrid>
            </ClientsSection>

            {/* Capabilities Section */}
            <CapabilitiesSection>
              <SubSectionTitle>Financial Analytics Capabilities</SubSectionTitle>
              <CapabilitiesGrid>
                {[
                  'Anti-Money Laundering (AML) Analytics',
                  'Credit Risk Assessment & Modeling',
                  'Market Risk Analysis',
                  'Operational Risk Management',
                  'Regulatory Reporting Automation',
                  'Fraud Detection & Prevention',
                  'Stress Testing & Scenario Analysis',
                  'Portfolio Performance Analytics',
                  'Liquidity Risk Management',
                  'Capital Adequacy Assessment',
                  'Trading Surveillance Systems',
                  'Economic Capital Modeling',
                  'CECL Implementation',
                  'Real-time Transaction Monitoring',
                  'Regulatory Capital Optimization'
                ].map((capability, index) => (
                  <CapabilityCard key={index}>{capability}</CapabilityCard>
                ))}
              </CapabilitiesGrid>
            </CapabilitiesSection>

            {/* Financial Sectors */}
            <IndustriesSection>
              <SubSectionTitle>Financial Sectors We Serve</SubSectionTitle>
              <IndustriesGrid>
                <IndustryCard>
                  <IndustryIcon>🏛️</IndustryIcon>
                  <IndustryName>Central Banking</IndustryName>
                  <IndustryDesc>Monetary policy analytics and financial stability monitoring</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>🏦</IndustryIcon>
                  <IndustryName>Commercial Banking</IndustryName>
                  <IndustryDesc>Credit risk, regulatory compliance, and performance analytics</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>📈</IndustryIcon>
                  <IndustryName>Capital Markets</IndustryName>
                  <IndustryDesc>Trading analytics, market surveillance, and risk management</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>🛡️</IndustryIcon>
                  <IndustryName>Insurance</IndustryName>
                  <IndustryDesc>Actuarial analytics, claims processing, and risk assessment</IndustryDesc>
                </IndustryCard>
              </IndustriesGrid>
            </IndustriesSection>

            {/* CTA Section */}
            <CTASection>
              <CTATitle>Secure Your Financial Data Analytics</CTATitle>
              <CTADescription>
                Partner with Precise Analytics for compliant, secure, and actionable financial analytics solutions 
                that meet the highest federal standards.
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
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
  border-radius: 2rem;
  margin-bottom: 8rem;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(59, 130, 246), rgb(99, 102, 241));
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
  color: rgb(59, 130, 246);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(59, 130, 246);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
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
  color: rgb(99, 102, 241);
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
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
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
  color: rgb(99, 102, 241);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 120rem;
  margin: 0 auto;

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

const ClientCard = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
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
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
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
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
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
  color: rgb(99, 102, 241);
`;

const IndustryDesc = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1.5;
  color: rgb(var(--text));
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
  border-radius: 2rem;
  padding: 4rem;
`;

const CTATitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgb(59, 130, 246);
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
  background: linear-gradient(135deg, rgb(59, 130, 246), rgb(99, 102, 241));
  color: white;
  border: none;
  border-radius: 5rem;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
`;

export default FinancePage;
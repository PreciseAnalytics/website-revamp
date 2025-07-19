import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

export default function FinancePage() {
  return (
    <>
      <Head>
        <title>Finance Analytics Solutions | {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Compliant and intelligent analytics for federal financial agencies, banks, and insurers. Empowering fraud detection, risk modeling, and regulatory reporting."
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <BackLink href="/sectors">
            <Arrow>⬅</Arrow> Back to All Sectors
          </BackLink>

          <HeroSection>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTitle>Finance Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Data-driven solutions for public finance, fraud detection, risk modeling, and regulatory compliance across the federal and commercial sectors.
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          <SectionTitle>Analytics for Financial Integrity</SectionTitle>

          <ServicesGrid>
            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ServiceIcon>📊</ServiceIcon>
              <ServiceTitle>Fraud Detection & Prevention</ServiceTitle>
              <ServiceDescription>
                Machine learning models to detect suspicious activity, enhance internal controls, and prevent financial fraud.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <ServiceIcon>📉</ServiceIcon>
              <ServiceTitle>Risk Modeling & Forecasting</ServiceTitle>
              <ServiceDescription>
                Credit risk, market exposure, and capital adequacy forecasting for public finance agencies and lenders.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <ServiceIcon>🧾</ServiceIcon>
              <ServiceTitle>Regulatory Compliance Analytics</ServiceTitle>
              <ServiceDescription>
                Compliance with SOX, GLBA, Dodd-Frank, and other financial reporting mandates through automated audits and alerts.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>

          <SubSectionTitle>Federal Financial Clients</SubSectionTitle>
          <ClientsGrid>
            {[
              'U.S. Department of the Treasury',
              'Federal Reserve System',
              'Federal Deposit Insurance Corporation (FDIC)',
              'Securities and Exchange Commission (SEC)',
              'Government Accountability Office (GAO)',
              'Internal Revenue Service (IRS)',
              'Office of Management and Budget (OMB)',
            ].map((agency, i) => (
              <ClientCard key={i}>{agency}</ClientCard>
            ))}
          </ClientsGrid>

          <SubSectionTitle>Core Capabilities</SubSectionTitle>
          <CapabilitiesGrid>
            {[
              'Fraud & Anomaly Detection',
              'Audit Automation & Forensics',
              'Financial Forecasting & Modeling',
              'Public Spending Transparency Dashboards',
              'Credit & Lending Analytics',
              'Tax Compliance & Revenue Analytics',
              'Financial NLP & Document Mining',
              'Real-Time Treasury Monitoring',
              'Banking Data Pipelines & APIs',
            ].map((item, i) => (
              <CapabilityCard key={i}>{item}</CapabilityCard>
            ))}
          </CapabilitiesGrid>

          <SubSectionTitle>Industries We Support</SubSectionTitle>
          <IndustriesGrid>
            <IndustryCard>
              <IndustryIcon>🏛️</IndustryIcon>
              <IndustryName>Federal Financial Agencies</IndustryName>
              <IndustryDesc>Regulatory reporting, oversight, and public trust dashboards</IndustryDesc>
            </IndustryCard>
            <IndustryCard>
              <IndustryIcon>🏦</IndustryIcon>
              <IndustryName>Banks & Credit Unions</IndustryName>
              <IndustryDesc>Risk scoring, loan analytics, and customer segmentation</IndustryDesc>
            </IndustryCard>
            <IndustryCard>
              <IndustryIcon>📈</IndustryIcon>
              <IndustryName>Insurance & Actuarial</IndustryName>
              <IndustryDesc>Policy pricing, risk pools, and claims analytics</IndustryDesc>
            </IndustryCard>
          </IndustriesGrid>

          <CTASection>
            <CTATitle>Make Data Your Most Valuable Asset</CTATitle>
            <CTADescription>
              Partner with Precise Analytics for transparent, compliant, and intelligent finance analytics solutions.
            </CTADescription>
            <NextLink href="/schedule-consult" passHref>
              <CTAButton as={motion.a} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Schedule a Consultation
              </CTAButton>
            </NextLink>
          </CTASection>

          <RelatedSection>
            <RelatedTitle>Explore Related Sectors</RelatedTitle>
            <RelatedGrid>
              <RelatedCard href="/sectors/healthcare">🏥 Healthcare</RelatedCard>
              <RelatedCard href="/sectors/retail">🛍️ Retail</RelatedCard>
              <RelatedCard href="/sectors/manufacturing">🏭 Manufacturing</RelatedCard>
            </RelatedGrid>
          </RelatedSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// === Styled Components === (same structure as others)

const PageWrapper = styled.div`
  padding: 4rem 0;
  background: rgb(var(--background));
`;

const BackLink = styled(NextLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.7rem;
  font-weight: 600;
  color: orange;
  margin-bottom: 3.5rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: darkorange;
    transform: translateX(-4px);
  }
`;

const Arrow = styled.span`
  font-size: 2rem;
  transform: translateY(-1px);
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0 8rem;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 2rem;
  margin-bottom: 6rem;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(56, 189, 248), rgb(59, 130, 246));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  color: rgba(var(--text), 0.85);
  max-width: 80rem;
  margin: 2rem auto 0;
`;

const SectionTitle = styled.h2`
  font-size: 3.4rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(56, 189, 248);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin: 5rem 0 3rem;
  color: rgb(56, 189, 248);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const ServiceCard = styled.div`
  padding: 3rem;
  border-radius: 1.5rem;
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(56, 189, 248, 0.2);
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(56, 189, 248, 0.4);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(59, 130, 246);
`;

const ServiceDescription = styled.p`
  font-size: 1.6rem;
  opacity: 0.85;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ClientCard = styled.div`
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  font-size: 1.6rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 5rem;
`;

const CapabilityCard = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
`;

const IndustryCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(56, 189, 248, 0.4);
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
  color: rgb(59, 130, 246);
`;

const IndustryDesc = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1.5;
`;

const CTASection = styled.section`
  text-align: center;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 2rem;
  padding: 5rem 2rem;
  margin-top: 6rem;
`;

const CTATitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgb(56, 189, 248);
`;

const CTADescription = styled.p`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, rgb(56, 189, 248), rgb(59, 130, 246));
  color: white;
  padding: 1.4rem 3rem;
  border-radius: 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:hover {
    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
  }
`;

const RelatedSection = styled.section`
  margin-top: 6rem;
`;

const RelatedTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
  gap: 2rem;
`;

const RelatedCard = styled(NextLink)`
  background: rgba(var(--cardBackground), 0.9);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(var(--accent), 0.15);
  font-size: 1.8rem;
  text-align: center;
  text-decoration: none;
  color: rgb(var(--text));
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--cardBackground), 1);
    border-color: rgba(var(--accent), 0.3);
    transform: translateY(-4px);
  }
`;

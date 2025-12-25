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

export default function ManufacturingPage() {
  return (
    <>
      <Head>
        <title>
          Manufacturing Analytics Solutions for Defense & Federal Agencies | {EnvVars.SITE_NAME}
        </title>

        <meta
          name="description"
          content="ITAR and EAR compliant manufacturing analytics for defense contractors and federal agencies. Industrial IoT analytics, supply chain intelligence, quality management, and compliance reporting."
        />

        <link
          rel="canonical"
          href="https://preciseanalytics.io/sectors/manufacturing"
        />
        <meta name="robots" content="index, follow" />
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
              <HeroTitle>Manufacturing Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Advanced analytics for defense manufacturing, industrial operations, and supply chain optimization
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          <SectionTitle>Manufacturing Excellence Through Data</SectionTitle>

          <SectionIntro>
            <strong>Precise Analytics</strong> provides advanced manufacturing analytics solutions
            for <strong>defense manufacturers, federal production facilities, and regulated
            industrial organizations</strong>. We help manufacturing leaders transform operational,
            supply chain, quality, and compliance data into actionable intelligence that improves
            efficiency, resilience, and mission readiness.
            <br /><br />
            Our manufacturing analytics capabilities support highly regulated environments where
            security, traceability, and compliance are non-negotiable. From ITAR/EAR-controlled
            production data to industrial IoT telemetry and supplier risk analytics, we enable
            organizations to modernize manufacturing operations while meeting strict federal and
            defense requirements.
          </SectionIntro>

          <ServicesGrid>
            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ServiceIcon>🏭</ServiceIcon>
              <ServiceTitle>Industrial IoT Analytics</ServiceTitle>
              <ServiceDescription>
                Real-time monitoring and predictive analytics for manufacturing equipment, production lines, and quality control systems. ITAR/EAR compliant solutions for defense contractors.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <ServiceIcon>⚙️</ServiceIcon>
              <ServiceTitle>Supply Chain Analytics</ServiceTitle>
              <ServiceDescription>
                Comprehensive supply chain visibility, risk assessment, and optimization for federal procurement and defense manufacturing operations.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard as={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <ServiceIcon>📈</ServiceIcon>
              <ServiceTitle>Quality & Compliance Analytics</ServiceTitle>
              <ServiceDescription>
                Advanced quality management systems, regulatory compliance reporting, and continuous improvement analytics for defense and federal manufacturing standards.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>

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
              'Department of Energy (DOE)',
            ].map((client, i) => (
              <ClientCard key={i}>{client}</ClientCard>
            ))}
          </ClientsGrid>

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
              'Lean Manufacturing Analytics',
            ].map((cap, i) => (
              <CapabilityCard key={i}>{cap}</CapabilityCard>
            ))}
          </CapabilitiesGrid>

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

          <CTASection>
            <CTATitle>Optimize Your Manufacturing Operations</CTATitle>
            <CTADescription>
              Partner with Precise Analytics for secure, compliant, and data-driven manufacturing solutions.
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
              <RelatedCard href="/sectors/finance">💰 Finance</RelatedCard>
            </RelatedGrid>
          </RelatedSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// === Styled Components ===

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
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1), rgba(239, 68, 68, 0.1));
  border-radius: 2rem;
  margin-bottom: 6rem;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 165, 0), rgb(239, 68, 68));
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
  color: rgb(255, 165, 0);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin: 5rem 0 3rem;
  color: rgb(255, 165, 0);
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
  border: 1px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 165, 0, 0.4);
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
  color: rgb(239, 68, 68);
`;

const ServiceDescription = styled.p`
  font-size: 1.6rem;
  opacity: 0.85;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
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
  opacity: 0.85;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
`;

const ClientCard = styled.div`
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
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
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
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
`;

const CTASection = styled.section`
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1), rgba(239, 68, 68, 0.1));
  border-radius: 2rem;
  padding: 5rem 2rem;
  margin-top: 6rem;
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
  opacity: 0.9;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 165, 0), rgb(239, 68, 68));
  color: white;
  padding: 1.4rem 3rem;
  border-radius: 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 165, 0, 0.3);
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


const SectionIntro = styled.p`
  max-width: 90rem;
  margin: 0 auto 6rem;
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  text-align: center;
`;

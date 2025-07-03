import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

const RetailPage = () => {
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
        <title>Retail Analytics Solutions | {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Advanced retail analytics for federal commissaries, exchanges, and government retail operations. Customer analytics, inventory optimization, and performance insights."
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
              <HeroTitle>Retail Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Advanced retail analytics for federal commissaries, exchanges, and government retail operations
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          {/* Content Section */}
          <ContentSection>
            <SectionTitle>Retail Analytics & Intelligence</SectionTitle>
            
            {/* Services Grid */}
            <ServicesGrid>
              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ServiceIcon>🛒</ServiceIcon>
                <ServiceTitle>Customer Analytics & Insights</ServiceTitle>
                <ServiceDescription>
                  Advanced customer behavior analytics, loyalty program optimization, and personalization 
                  for military exchanges, commissaries, and federal retail operations.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ServiceIcon>📦</ServiceIcon>
                <ServiceTitle>Inventory & Supply Chain</ServiceTitle>
                <ServiceDescription>
                  Real-time inventory optimization, demand forecasting, and supply chain analytics 
                  for efficient federal retail operations and cost management.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ServiceIcon>💰</ServiceIcon>
                <ServiceTitle>Revenue & Performance Analytics</ServiceTitle>
                <ServiceDescription>
                  Comprehensive sales analytics, pricing optimization, and performance dashboards 
                  for maximizing revenue in government retail environments.
                </ServiceDescription>
              </ServiceCard>
            </ServicesGrid>

            {/* Federal Retail Section */}
            <ComplianceSection>
              <SubSectionTitle>Federal Retail Expertise</SubSectionTitle>
              <ComplianceGrid>
                <ComplianceCard>
                  <ComplianceIcon>🏪</ComplianceIcon>
                  <ComplianceTitle>Military Exchanges</ComplianceTitle>
                  <ComplianceDescription>Analytics for Army, Navy, Air Force, and Marine Corps exchanges</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>🥫</ComplianceIcon>
                  <ComplianceTitle>Commissary Operations</ComplianceTitle>
                  <ComplianceDescription>Grocery and commissary analytics for military families</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard>
                  <ComplianceIcon>🏛️</ComplianceIcon>
                  <ComplianceTitle>Federal Facilities</ComplianceTitle>
                  <ComplianceDescription>Retail analytics for federal buildings and facilities</ComplianceDescription>
                </ComplianceCard>
              </ComplianceGrid>
            </ComplianceSection>

            {/* Federal Clients Section */}
            <ClientsSection>
              <SubSectionTitle>Federal Retail Clients</SubSectionTitle>
              <ClientsGrid>
                {[
                  'Army & Air Force Exchange Service (AAFES)',
                  'Navy Exchange Service Command (NEXCOM)', 
                  'Marine Corps Exchange (MCX)',
                  'Defense Commissary Agency (DeCA)',
                  'Coast Guard Exchange (CGX)',
                  'Department of Veterans Affairs (VA)',
                  'General Services Administration (GSA)',
                  'Smithsonian Institution'
                ].map((client, index) => (
                  <ClientCard key={index}>{client}</ClientCard>
                ))}
              </ClientsGrid>
            </ClientsSection>

            {/* Capabilities Section */}
            <CapabilitiesSection>
              <SubSectionTitle>Retail Analytics Capabilities</SubSectionTitle>
              <CapabilitiesGrid>
                {[
                  'Point of Sale (POS) Analytics',
                  'Customer Segmentation & Profiling',
                  'Price Optimization & Elasticity',
                  'Promotional Campaign Analytics',
                  'Store Performance Benchmarking',
                  'Foot Traffic & Conversion Analysis',
                  'Cross-sell & Upsell Analytics',
                  'Seasonal Demand Forecasting',
                  'Product Mix Optimization',
                  'Loss Prevention Analytics',
                  'Mobile & E-commerce Analytics',
                  'Loyalty Program Analytics'
                ].map((capability, index) => (
                  <CapabilityCard key={index}>{capability}</CapabilityCard>
                ))}
              </CapabilitiesGrid>
            </CapabilitiesSection>

            {/* Retail Categories */}
            <IndustriesSection>
              <SubSectionTitle>Retail Categories We Serve</SubSectionTitle>
              <IndustriesGrid>
                <IndustryCard>
                  <IndustryIcon>🍎</IndustryIcon>
                  <IndustryName>Grocery & Food</IndustryName>
                  <IndustryDesc>Commissary and food service analytics for military families</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>👕</IndustryIcon>
                  <IndustryName>Apparel & Accessories</IndustryName>
                  <IndustryDesc>Fashion and clothing analytics for military exchanges</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>💻</IndustryIcon>
                  <IndustryName>Electronics</IndustryName>
                  <IndustryDesc>Consumer electronics and technology retail analytics</IndustryDesc>
                </IndustryCard>
                <IndustryCard>
                  <IndustryIcon>🎁</IndustryIcon>
                  <IndustryName>General Merchandise</IndustryName>
                  <IndustryDesc>Home goods, gifts, and general retail analytics</IndustryDesc>
                </IndustryCard>
              </IndustriesGrid>
            </IndustriesSection>

            {/* CTA Section */}
            <CTASection>
              <CTATitle>Enhance Your Retail Operations</CTATitle>
              <CTADescription>
                Partner with Precise Analytics for data-driven retail solutions that improve customer experience 
                and operational efficiency in federal retail environments.
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
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%);
  border-radius: 2rem;
  margin-bottom: 8rem;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
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
  color: rgb(147, 51, 234);
`;

const SubSectionTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(147, 51, 234);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
`;

const ServiceCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(147, 51, 234, 0.5);
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
  color: rgb(219, 39, 119);
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
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.2);
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
  color: rgb(219, 39, 119);
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
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.3);
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
  background: rgba(219, 39, 119, 0.1);
  border: 1px solid rgba(219, 39, 119, 0.2);
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
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(147, 51, 234, 0.5);
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
  color: rgb(219, 39, 119);
`;

const IndustryDesc = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1.5;
  color: rgb(var(--text));
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%);
  border-radius: 2rem;
  padding: 4rem;
`;

const CTATitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgb(147, 51, 234);
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
  background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
  color: white;
  border: none;
  border-radius: 5rem;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(147, 51, 234, 0.3);
  }
`;

export default RetailPage;
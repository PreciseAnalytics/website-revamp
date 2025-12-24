import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import AnimatedHeader from '../../components/AnimatedHeader';
import AnimatedFooter from '../../components/AnimatedFooter';
import Container from '../../components/Container';
import { EnvVars } from '../../env';

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
        <title>
          Retail Analytics Solutions for Federal & Government Operations | {EnvVars.SITE_NAME}
        </title>

        <meta
          name="description"
          content="Federal retail analytics solutions for military exchanges, commissaries, and government retail operations. Customer analytics, inventory optimization, POS insights, and performance intelligence."
        />

        <link rel="canonical" href="https://preciseanalytics.io/sectors/retail" />
        <meta name="robots" content="index, follow" />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <BackNavigation
            href="/sectors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -8, scale: 1.02 }}
          >
            <BackIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
            </BackIcon>
            <BackText>
              <BackLabel>Back to</BackLabel>
              <BackDestination>All Sectors</BackDestination>
            </BackText>
          </BackNavigation>

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

          <IntroLinks>
            Explore how our retail analytics capabilities connect with other regulated sectors,
            including{' '}
            <NextLink href="/sectors/healthcare">healthcare analytics</NextLink>,{' '}
            <NextLink href="/sectors/manufacturing">manufacturing analytics</NextLink>, and{' '}
            <NextLink href="/sectors/finance">financial analytics</NextLink>.
          </IntroLinks>
          {/* SEO AUTHORITY INTRO */}
          <SectionIntro>
            <strong>Precise Analytics</strong> delivers specialized retail analytics solutions for
            <strong> federal commissaries, military exchanges, and government-operated retail environments</strong>.
            Our retail analytics capabilities support data-driven decision-making across customer behavior analysis,
            inventory optimization, pricing strategy, and operational performance measurement.

            <br /><br />

            We work with highly regulated retail organizations that operate at national scale, including
            military exchange systems, commissary agencies, and federal facilities. Our analytics solutions
            transform point-of-sale (POS), supply chain, merchandising, and customer engagement data into
            actionable intelligence that improves efficiency, reduces waste, and enhances the customer experience.

            <br /><br />

            From demand forecasting and inventory planning to customer segmentation and revenue performance
            dashboards, Precise Analytics helps government retail organizations modernize their data
            infrastructure and unlock measurable operational value.
          </SectionIntro>

          

          {/* Content Section */} 
          <ContentSection>

          
          <h2 style={{ display: 'none' }}>
            Federal Retail Analytics Solutions for Military Exchanges and Commissaries
          </h2>

            <SectionTitle>Retail Analytics & Intelligence</SectionTitle>
            
            {/* Services Grid */}
            <ServicesGrid>
              <ServiceCard
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <ServiceHeader>
                  <ServiceIcon>🛒</ServiceIcon>
                  <ServiceBadge>Customer</ServiceBadge>
                </ServiceHeader>
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
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <ServiceHeader>
                  <ServiceIcon>📦</ServiceIcon>
                  <ServiceBadge>Inventory</ServiceBadge>
                </ServiceHeader>
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
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <ServiceHeader>
                  <ServiceIcon>💰</ServiceIcon>
                  <ServiceBadge>Revenue</ServiceBadge>
                </ServiceHeader>
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
                <ComplianceCard
                  as={motion.div}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ComplianceIcon>🏪</ComplianceIcon>
                  <ComplianceTitle>Military Exchanges</ComplianceTitle>
                  <ComplianceDescription>Analytics for Army, Navy, Air Force, and Marine Corps exchanges</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard
                  as={motion.div}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ComplianceIcon>🥫</ComplianceIcon>
                  <ComplianceTitle>Commissary Operations</ComplianceTitle>
                  <ComplianceDescription>Grocery and commissary analytics for military families</ComplianceDescription>
                </ComplianceCard>
                <ComplianceCard
                  as={motion.div}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
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
                  <ClientCard 
                    key={index}
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                  >
                    {client}
                  </ClientCard>
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
                  <CapabilityCard 
                    key={index}
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {capability}
                  </CapabilityCard>
                ))}
              </CapabilitiesGrid>
            </CapabilitiesSection>

            {/* Retail Categories */}
            <IndustriesSection>
              <SubSectionTitle>Retail Categories We Serve</SubSectionTitle>
              <IndustriesGrid>
                <IndustryCard
                  as={motion.div}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <IndustryIcon>🍎</IndustryIcon>
                  <IndustryName>Grocery & Food</IndustryName>
                  <IndustryDesc>Commissary and food service analytics for military families</IndustryDesc>
                </IndustryCard>
                <IndustryCard
                  as={motion.div}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <IndustryIcon>👕</IndustryIcon>
                  <IndustryName>Apparel & Accessories</IndustryName>
                  <IndustryDesc>Fashion and clothing analytics for military exchanges</IndustryDesc>
                </IndustryCard>
                <IndustryCard
                  as={motion.div}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <IndustryIcon>💻</IndustryIcon>
                  <IndustryName>Electronics</IndustryName>
                  <IndustryDesc>Consumer electronics and technology retail analytics</IndustryDesc>
                </IndustryCard>
                <IndustryCard
                  as={motion.div}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
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
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultationClick}
              >
                Schedule a Consultation
              </CTAButton>
            </CTASection>

            {/* Related Sectors Section */}
            <RelatedSection>
              <RelatedTitle>Explore Related Sectors</RelatedTitle>
              <RelatedGrid>
                <RelatedCard 
                  href="/sectors/healthcare"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <RelatedIcon>🏥</RelatedIcon>
                  <RelatedName>Healthcare</RelatedName>
                </RelatedCard>
                <RelatedCard 
                  href="/sectors/manufacturing"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <RelatedIcon>🏭</RelatedIcon>
                  <RelatedName>Manufacturing</RelatedName>
                </RelatedCard>
                <RelatedCard 
                  href="/sectors/finance"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <RelatedIcon>💰</RelatedIcon>
                  <RelatedName>Finance</RelatedName>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>
          </ContentSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
};

// Enhanced Styled Components
const PageWrapper = styled.div`
  padding: 3rem 0 4rem;
  min-height: 100vh;
  background: rgb(var(--background));
  color: rgb(var(--text));
`;

const BackNavigation = styled(motion(NextLink))`
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.8rem 3rem;
  background: rgba(255, 165, 0, 0.1);
  border: 2px solid rgba(255, 165, 0, 0.3);
  border-radius: 1.6rem;
  color: rgb(255, 140, 0);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  margin-bottom: 4rem;
  backdrop-filter: blur(10px);
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);

  &:hover {
    background: rgba(255, 165, 0, 0.15);
    border-color: rgba(255, 165, 0, 0.5);
    box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 1rem;
  background: rgba(255, 165, 0, 0.2);
  transition: all 0.3s ease;
  
  svg {
    width: 2.2rem;
    height: 2.2rem;
    transition: transform 0.3s ease;
  }

  ${BackNavigation}:hover & {
    background: rgba(255, 165, 0, 0.3);
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const BackText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const BackLabel = styled.span`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1;
  font-weight: 500;
`;

const BackDestination = styled.span`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 8rem 0 10rem;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.08), rgba(219, 39, 119, 0.08));
  border-radius: 2.4rem;
  margin-bottom: 8rem;
  border: 1px solid rgba(147, 51, 234, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(4rem, 6vw, 6rem);
  font-weight: 700;
  background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2.4rem;
  line-height: 1.1;
  position: relative;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  max-width: 85rem;
  margin: 0 auto;
  font-weight: 400;
`;

const ContentSection = styled.section`
  padding: 0;
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(147, 51, 234);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 8rem;
    height: 4px;
    background: linear-gradient(90deg, rgb(147, 51, 234), rgb(219, 39, 119));
    border-radius: 2px;
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

const IntroLinks = styled.p`
  max-width: 90rem;
  margin: 2rem auto 4rem;
  font-size: 1.6rem;
  line-height: 1.6;
  text-align: center;
  color: rgba(var(--text), 0.8);

  a {
    color: rgb(147, 51, 234);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(147, 51, 234);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3.6rem;
  margin-bottom: 8rem;
`;

const ServiceCard = styled.div`
  padding: 3.6rem 3.2rem;
  border-radius: 2rem;
  background: rgba(var(--cardBackground), 0.95);
  border: 1px solid rgba(147, 51, 234, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(147, 51, 234, 0.3);
    box-shadow: 0 20px 40px rgba(147, 51, 234, 0.12);
    background: rgba(var(--cardBackground), 1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2));
`;

const ServiceBadge = styled.span`
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1));
  color: rgb(147, 51, 234);
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: 1px solid rgba(147, 51, 234, 0.2);
  backdrop-filter: blur(5px);
`;

const ServiceTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
  color: rgb(219, 39, 119);
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  font-weight: 400;
`;

const ComplianceSection = styled.div`
  margin-bottom: 8rem;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.8rem;
`;

const ComplianceCard = styled.div`
  background: rgba(147, 51, 234, 0.08);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 1.6rem;
  padding: 2.4rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    border-color: rgba(147, 51, 234, 0.4);
    box-shadow: 0 8px 24px rgba(147, 51, 234, 0.15);
    background: rgba(147, 51, 234, 0.12);
  }
`;

const ComplianceIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2));
`;

const ComplianceTitle = styled.h4`
  font-size: 1.9rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: rgb(219, 39, 119);
`;

const ComplianceDescription = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.5;
`;

const ClientsSection = styled.div`
  margin-bottom: 8rem;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 2.4rem;
`;

const ClientCard = styled.div`
  background: rgba(147, 51, 234, 0.08);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 1.2rem;
  padding: 2.4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(var(--text));
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    border-color: rgba(147, 51, 234, 0.4);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.1);
    background: rgba(147, 51, 234, 0.12);
  }
`;

const CapabilitiesSection = styled.div`
  margin-bottom: 8rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2rem;
`;

const CapabilityCard = styled.div`
  background: rgba(219, 39, 119, 0.08);
  border: 1px solid rgba(219, 39, 119, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  font-size: 1.5rem;
  text-align: center;
  color: rgb(var(--text));
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    border-color: rgba(219, 39, 119, 0.4);
    box-shadow: 0 6px 18px rgba(219, 39, 119, 0.1);
    background: rgba(219, 39, 119, 0.12);
  }
`;

const IndustriesSection = styled.div`
  margin-bottom: 8rem;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.8rem;
`;

const IndustryCard = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  border: 1px solid rgba(147, 51, 234, 0.15);
  border-radius: 1.6rem;
  padding: 3rem;
  text-align: center;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(147, 51, 234, 0.3);
    box-shadow: 0 16px 32px rgba(147, 51, 234, 0.1);
    background: rgba(var(--cardBackground), 1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IndustryIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.8rem;
  filter: drop-shadow(0 4px 8px rgba(147, 51, 234, 0.15));
`;

const IndustryName = styled.h4`
  font-size: 1.9rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: rgb(219, 39, 119);
`;

const IndustryDesc = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.6;
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.08), rgba(219, 39, 119, 0.08));
  border-radius: 2.4rem;
  padding: 6rem 3rem;
  border: 1px solid rgba(147, 51, 234, 0.15);
  position: relative;
  overflow: hidden;
  margin-bottom: 8rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.04) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CTATitle = styled.h3`
  font-size: 3.4rem;
  font-weight: 700;
  margin-bottom: 2.4rem;
  color: rgb(147, 51, 234);
  position: relative;
`;

const CTADescription = styled.p`
  font-size: 1.9rem;
  margin-bottom: 4rem;
  color: rgba(var(--text), 0.8);
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
  color: white;
  border: none;
  border-radius: 3rem;
  padding: 1.8rem 4rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(147, 51, 234, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    box-shadow: 0 12px 32px rgba(147, 51, 234, 0.35);
    transform: translateY(-2px);
  }

  &:hover::before {
    left: 100%;
  }
`;

const BottomNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(var(--text), 0.1);
`;

const RelatedSection = styled.section`
  margin-top: 10rem;
`;

const RelatedTitle = styled.h4`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 4rem;
  text-align: center;
  color: rgb(147, 51, 234);
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.8rem;
`;

const RelatedCard = styled(motion(NextLink))`
  background: rgba(var(--cardBackground), 0.9);
  padding: 3rem 2.4rem;
  border-radius: 1.8rem;
  border: 1px solid rgba(147, 51, 234, 0.12);
  text-decoration: none;
  color: rgb(var(--text));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(var(--cardBackground), 1);
    border-color: rgba(147, 51, 234, 0.3);
    box-shadow: 0 16px 32px rgba(147, 51, 234, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const RelatedIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.8rem;
  filter: drop-shadow(0 4px 8px rgba(147, 51, 234, 0.15));
`;

const RelatedName = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  color: rgb(147, 51, 234);
`;

export default RetailPage;
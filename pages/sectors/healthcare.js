import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import AnimatedHeader from '../../components/AnimatedHeader';
import Container from '../../components/Container';
import { EnvVars } from '../../env';
import { media } from '../../utils/media';

export default function HealthcarePage() {
  return (
    <>
      <Head>
        <title>
          Healthcare Analytics Solutions for Federal Agencies | {EnvVars.SITE_NAME}
        </title>

        <meta
          name="description"
          content="Federal healthcare analytics solutions for VA, CDC, NIH, FDA, and public health agencies. HIPAA-compliant clinical analytics, population health insights, and regulatory reporting."
        />

        <link
          rel="canonical"
          href="https://preciseanalytics.io/sectors/healthcare"
        />
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

          <HeroSection> 
            <IntroLinks>
              Our healthcare analytics capabilities integrate with other regulated sectors,
              including{' '}
              <NextLink href="/sectors/retail">federal retail analytics</NextLink>,{' '}
              <NextLink href="/sectors/manufacturing">manufacturing analytics</NextLink>, and{' '}
              <NextLink href="/sectors/finance">financial analytics</NextLink>.
            </IntroLinks>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTitle>Healthcare Analytics Solutions</HeroTitle>
              <HeroSubtitle>
                Transforming healthcare data into actionable insights for federal agencies and healthcare organizations.
              </HeroSubtitle>
            </motion.div>
          </HeroSection>

          <SectionIntro>
            Precise Analytics delivers healthcare analytics solutions designed for highly regulated, data-intensive
            environments where accuracy, compliance, and security are critical. We support federal agencies, public
            health organizations, and healthcare institutions in transforming complex clinical, claims, and population
            health data into actionable insights.
            <br /><br />
            Our healthcare expertise spans HIPAA-compliant analytics, public health reporting, clinical research
            analytics, and regulatory data support for agencies such as the VA, CDC, NIH, and FDA. By combining deep
            domain knowledge with advanced analytics and modern data platforms, we enable healthcare organizations to
            improve outcomes, meet compliance requirements, and drive measurable impact.
          </SectionIntro>


          <SectionTitle>Our Healthcare Expertise</SectionTitle>

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
                <ServiceIcon>🏥</ServiceIcon>
                <ServiceBadge>Clinical</ServiceBadge>
              </ServiceHeader>
              <ServiceTitle>Clinical Data Analytics</ServiceTitle>
              <ServiceDescription>
                Advanced analytics for clinical outcomes, patient safety metrics, and quality improvement initiatives.
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
                <ServiceIcon>📊</ServiceIcon>
                <ServiceBadge>Population</ServiceBadge>
              </ServiceHeader>
              <ServiceTitle>Population Health Management</ServiceTitle>
              <ServiceDescription>
                Comprehensive public health analytics, epidemiological research, and data insights for policy and care delivery.
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
                <ServiceIcon>🔬</ServiceIcon>
                <ServiceBadge>Research</ServiceBadge>
              </ServiceHeader>
              <ServiceTitle>Research & Development</ServiceTitle>
              <ServiceDescription>
                Clinical trial analytics, biostatistics, and compliance reporting for FDA, NIH, and other institutions.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>

          <CTASection>
            <CTATitle>Ready to Transform Your Healthcare Data?</CTATitle>
            <CTADescription>
              Partner with Precise Analytics for compliant, secure, and actionable healthcare analytics solutions.
            </CTADescription>
            <CTAButton 
              href="/schedule-consult"
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </CTAButton>
          </CTASection>

          <RelatedSection>
            <RelatedTitle>Explore Related Sectors</RelatedTitle>
            <RelatedGrid>
              <RelatedCard 
                href="/sectors/manufacturing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <RelatedIcon>🏭</RelatedIcon>
                <RelatedName>Manufacturing</RelatedName>
              </RelatedCard>
              <RelatedCard 
                href="/sectors/retail"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <RelatedIcon>🛍️</RelatedIcon>
                <RelatedName>Retail</RelatedName>
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
        </Container>
      </PageWrapper>

    </>
  );
}

// Enhanced Styled Components

const PageWrapper = styled.div`
  padding: 3rem 0 4rem;
  background: rgb(var(--background));
  min-height: 100vh;
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
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.06), rgba(16, 185, 129, 0.06));
  border-radius: 2.4rem;
  margin-bottom: 8rem;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(4rem, 6vw, 6rem);
  font-weight: 700;
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2.4rem;
  line-height: 1.1;
  position: relative;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  color: rgba(var(--text), 0.8);
  max-width: 85rem;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(34, 197, 94);
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 8rem;
    height: 4px;
    background: linear-gradient(90deg, rgb(34, 197, 94), rgb(16, 185, 129));
    border-radius: 2px;
  }
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
  border: 1px solid rgba(34, 197, 94, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 20px 40px rgba(34, 197, 94, 0.12);
    background: rgba(var(--cardBackground), 1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
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
  filter: drop-shadow(0 4px 8px rgba(34, 197, 94, 0.2));
`;

const ServiceBadge = styled.span`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
  color: rgb(34, 197, 94);
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: 1px solid rgba(34, 197, 94, 0.2);
  backdrop-filter: blur(5px);
`;

const ServiceTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
  color: rgb(16, 185, 129);
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  font-weight: 400;
`;

const CTASection = styled.section`
  text-align: center;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.08));
  border-radius: 2.4rem;
  padding: 6rem 3rem;
  margin-top: 8rem;
  border: 1px solid rgba(34, 197, 94, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CTATitle = styled.h3`
  font-size: 3.4rem;
  font-weight: 700;
  margin-bottom: 2.4rem;
  color: rgb(34, 197, 94);
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
  margin: 0 auto 4rem;
  font-size: 1.6rem;
  line-height: 1.6;
  text-align: center;
  color: rgba(var(--text), 0.8);

  a {
    color: rgb(34, 197, 94);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const CTAButton = styled(motion(NextLink))`
  display: inline-block;
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
  color: white;
  padding: 1.8rem 4rem;
  border-radius: 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    box-shadow: 0 12px 32px rgba(34, 197, 94, 0.35);
    transform: translateY(-2px);
  }

  &:hover::before {
    left: 100%;
  }
`;

const RelatedSection = styled.section`
  margin-top: 10rem;
`;

const RelatedTitle = styled.h4`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 4rem;
  text-align: center;
  color: rgb(34, 197, 94);
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
  border: 1px solid rgba(34, 197, 94, 0.12);
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
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 16px 32px rgba(34, 197, 94, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129));
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
  filter: drop-shadow(0 4px 8px rgba(34, 197, 94, 0.15));
`;

const RelatedName = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  color: rgb(34, 197, 94);
`;
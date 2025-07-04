import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';

const industries = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    title: 'Healthcare Analytics Solutions',
    description: 'Transform patient care with data-driven insights, compliance reporting, and operational efficiency solutions.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    title: 'Manufacturing Analytics',
    description: 'Optimize production, reduce costs, and improve quality with advanced manufacturing analytics and IoT integration.'
  },
  {
    id: 'finance',
    name: 'Finance',
    title: 'Financial Technology Solutions',
    description: 'Risk management, fraud detection, regulatory compliance, and customer insights for financial institutions.'
  },
  {
    id: 'retail',
    name: 'Retail',
    title: 'Retail Analytics Solutions',
    description: 'Customer behavior analysis, inventory optimization, and sales forecasting for retail excellence.'
  },
  {
    id: 'government',
    name: 'Government',
    title: 'Public Sector Analytics',
    description: 'Data-driven governance, citizen services optimization, and transparency solutions for federal and state agencies.'
  },
  {
    id: 'energy',
    name: 'Energy',
    title: 'Energy & Utilities Analytics',
    description: 'Smart grid optimization, predictive maintenance, and sustainability analytics for the energy sector.'
  }
];

export default function IndustriesPage() {
  return (
    <>
      <Head>
        <title>Industries We Serve | Precise Analytics</title>
        <meta name="description" content="Discover how Precise Analytics delivers specialized data solutions across healthcare, manufacturing, finance, retail, government, and energy sectors." />
        <meta name="keywords" content="data analytics, healthcare analytics, manufacturing analytics, financial technology, retail analytics, government analytics, energy analytics" />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <HeroSection>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HeroTitle>Industries We Serve</HeroTitle>
              <HeroDescription>
                We deliver specialized data solutions tailored to your industry's unique challenges,
                regulatory requirements, and growth opportunities.
              </HeroDescription>
            </motion.div>
          </Container>
        </HeroSection>

        <IndustriesSection>
          <Container>
            <SectionTitle>Our Expertise Across Industries</SectionTitle>
            <IndustryGrid>
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <IndustryCard href={`/industries/${industry.id}`}>
                    <IndustryHeader>
                      <IndustryName>{industry.name}</IndustryName>
                      <ArrowIcon>→</ArrowIcon>
                    </IndustryHeader>
                    <IndustryTitle>{industry.title}</IndustryTitle>
                    <IndustryDescription>{industry.description}</IndustryDescription>
                  </IndustryCard>
                </motion.div>
              ))}
            </IndustryGrid>
          </Container>
        </IndustriesSection>

        <CTASection>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CTATitle>Ready to Transform Your Industry with Data?</CTATitle>
              <CTADescription>
                Let's discuss how our industry-specific expertise can drive your organization forward.
              </CTADescription>
              <CTAButton href="/contact">
                Get Started Today
              </CTAButton>
            </motion.div>
          </Container>
        </CTASection>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 12rem 0 8rem;
  background: linear-gradient(
    135deg,
    rgba(var(--primary), 0.05) 0%,
    rgba(var(--accent), 0.05) 100%
  );
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 5.6rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: rgb(var(--text));

  ${media.desktop`
    font-size: 4.8rem;
  `}

  ${media.tablet`
    font-size: 3.6rem;
  `}
`;

const HeroDescription = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  max-width: 80rem;
  margin: 0 auto;

  ${media.tablet`
    font-size: 1.8rem;
  `}
`;

const IndustriesSection = styled.section`
  padding: 10rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(var(--text));

  ${media.tablet`
    font-size: 2.8rem;
    margin-bottom: 4rem;
  `}
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 2rem;
  `}
`;

const IndustryCard = styled(NextLink)`
  display: block;
  padding: 4rem 3rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1.2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -10px rgba(var(--primary), 0.3);
    border-color: rgba(var(--accent), 0.3);
  }
`;

const IndustryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const IndustryName = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const ArrowIcon = styled.span`
  font-size: 2rem;
  color: rgb(var(--accent));
  transition: transform 0.3s ease;

  ${IndustryCard}:hover & {
    transform: translateX(5px);
  }
`;

const IndustryTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(var(--accent));
  margin-bottom: 1.5rem;
`;

const IndustryDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
`;

const CTASection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(
    135deg,
    rgb(var(--accent)) 0%,
    rgb(var(--primary)) 100%
  );
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 2rem;

  ${media.tablet`
    font-size: 2.8rem;
  `}
`;

const CTADescription = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  margin-bottom: 4rem;
  opacity: 0.9;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    font-size: 1.8rem;
  `}
`;

const CTAButton = styled(NextLink)`
  display: inline-block;
  padding: 1.8rem 4rem;
  background: white;
  color: rgb(var(--accent));
  border-radius: 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';

const sectors = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    title: 'Healthcare Analytics Solutions',
    description:
      'Transform patient care with data-driven insights, compliance reporting, and operational efficiency solutions.',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    title: 'Manufacturing Analytics',
    description:
      'Optimize production, reduce costs, and improve quality with advanced manufacturing analytics and IoT integration.',
  },
  {
    id: 'finance',
    name: 'Finance',
    title: 'Financial Technology Solutions',
    description:
      'Risk management, fraud detection, regulatory compliance, and customer insights for financial institutions.',
  },
  {
    id: 'retail',
    name: 'Retail',
    title: 'Retail Analytics Solutions',
    description:
      'Customer behavior analysis, inventory optimization, and sales forecasting for retail excellence.',
  },
];

export default function SectorsPage() {
  return (
    <>
      <Head>
        <title>Sectors We Serve | Precise Analytics</title>
        <meta
          name="description"
          content="Discover how Precise Analytics delivers specialized data analytics and decision intelligence solutions across healthcare, manufacturing, finance, and retail sectors."
        />
        <meta
          name="keywords"
          content="sector analytics, healthcare analytics, retail analytics, manufacturing analytics, financial data solutions"
        />
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
              <HeroTitle>Sectors We Serve</HeroTitle>
              <HeroDescription>
                Our tailored analytics solutions help government and enterprise clients solve critical challenges in the
                healthcare, finance, retail, and manufacturing sectors.
              </HeroDescription>
            </motion.div>
          </Container>
        </HeroSection>

        {/* ✅ NEW: Sector Overview Content (Indexing Signal Boost) */}
        <IntroSection>
          <Container>
            <IntroText>
              Precise Analytics partners with organizations operating in highly regulated, data-intensive environments
              where accuracy, compliance, and actionable insight are critical to success. Each sector we serve presents
              unique operational challenges, regulatory requirements, and decision-making pressures. Our approach
              combines advanced analytics, domain expertise, and scalable data platforms to deliver solutions that are
              purpose-built for each industry.
              <br />
              <br />
              In healthcare, we support payers, providers, and public agencies with analytics that improve outcomes,
              enhance compliance, and optimize resource utilization. Manufacturing clients leverage our solutions to
              gain visibility into production performance, supply chains, and quality metrics. Financial institutions
              rely on our analytics to strengthen risk management, regulatory reporting, and customer intelligence,
              while retail organizations use our data-driven insights to forecast demand, optimize inventory, and better
              understand consumer behavior.
              <br />
              <br />
              By aligning analytics strategy with industry-specific needs, Precise Analytics enables organizations to
              make confident, data-informed decisions that drive measurable results.
            </IntroText>
          </Container>
        </IntroSection>

        <IndustriesSection>
          <Container>
            <SectionTitle>Explore Our Sector Expertise</SectionTitle>
            <IndustryGrid>
              {sectors.map((sector, index) => (
                <motion.div
                  key={sector.id}
                  style={{ display: 'flex', justifyContent: 'center' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CardWrapper
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <IndustryCard href={`/sectors/${sector.id}`}>
                      <IndustryHeader>
                        <IndustryName>{sector.name}</IndustryName>
                        <ArrowIcon>→</ArrowIcon>
                      </IndustryHeader>
                      <IndustryTitle>{sector.title}</IndustryTitle>
                      <IndustryDescription>{sector.description}</IndustryDescription>
                    </IndustryCard>
                  </CardWrapper>
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
              <CTATitle>Ready to Accelerate Your Sector&apos;s Success?</CTATitle>
              <CTADescription>
                Discover how Precise Analytics can help transform your data into measurable outcomes.
              </CTADescription>
              <CTAButton href="/schedule-consult">Get Started Today</CTAButton>
            </motion.div>
          </Container>
        </CTASection>
      </PageWrapper>
    </>
  );
}

/* =======================
   Styled Components
======================= */

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

  ${media.desktop(`
    font-size: 4.8rem;
  `)}

  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const HeroDescription = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  max-width: 80rem;
  margin: 0 auto;

  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;

/* NEW */
const IntroSection = styled.section`
  padding: 6rem 0;
`;

const IntroText = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  max-width: 90rem;
  margin: 0 auto;
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

  ${media.tablet(`
    font-size: 2.8rem;
    margin-bottom: 4rem;
  `)}
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  justify-items: center;
  align-items: stretch;

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 3rem;
  `)}
`;

const CardWrapper = styled(motion.div)`
  width: 100%;
  max-width: 50rem;
`;

const IndustryCard = styled(NextLink)`
  display: block;
  padding: 4rem 3rem;
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(var(--accent), 0.3);
    box-shadow: 0 20px 40px -10px rgba(var(--primary), 0.3);
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
  background: linear-gradient(135deg, rgba(var(--primary), 0.08), rgba(var(--accent), 0.08));
  text-align: center;
  color: rgb(var(--text));
`;

const CTATitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 2rem;

  ${media.tablet(`
    font-size: 2.8rem;
  `)}
`;

const CTADescription = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  margin-bottom: 4rem;
  opacity: 0.9;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;

const CTAButton = styled(NextLink)`
  display: inline-block;
  padding: 1.8rem 4rem;
  background: rgb(var(--accent));
  color: white;
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

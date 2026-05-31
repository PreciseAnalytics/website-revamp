import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedBackground from 'components/AnimatedBackground';

const sectors = [
  {
    id: 'federal-government',
    name: 'Federal Government',
    color: '#4a9eff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
    headline: 'GSA Schedule · Clearance-Ready',
    stats: [
      { value: '12+', label: 'Federal Clients' },
      { value: 'GSA', label: 'Contract Vehicle' },
      { value: 'FISMA', label: 'Compliant' },
    ],
    capabilities: ['Data modernization', 'FISMA / FedRAMP compliance', 'Agency reporting & dashboards', 'AI/ML for mission ops'],
    href: '/sectors/federal-government',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#39ff14',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    headline: 'HIPAA · HL7 · FHIR',
    stats: [
      { value: 'HIPAA', label: 'Compliant' },
      { value: '40%', label: 'Avg Latency Cut' },
      { value: 'FHIR', label: 'Integration' },
    ],
    capabilities: ['Patient outcome analytics', 'Claims & billing intelligence', 'Operational efficiency', 'Compliance reporting'],
    href: '/sectors/healthcare',
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    color: '#ff8c2b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    headline: 'SOC 2 · Risk · Regulatory',
    stats: [
      { value: 'SOC 2', label: 'Type II Ready' },
      { value: 'Real-time', label: 'Risk Models' },
      { value: 'AML', label: 'Fraud Detection' },
    ],
    capabilities: ['Risk management & modeling', 'Regulatory reporting', 'Fraud & AML analytics', 'Customer intelligence'],
    href: '/sectors/finance',
  },
  {
    id: 'defense-intel',
    name: 'Defense & Intel',
    color: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    headline: 'ITAR · EAR · Clearance',
    stats: [
      { value: 'ITAR', label: 'Compliant' },
      { value: 'CUI', label: 'Data Handling' },
      { value: 'SC', label: 'Cleared Staff' },
    ],
    capabilities: ['Classified data pipelines', 'OSINT & signal analytics', 'Mission-system integration', 'Geospatial intelligence'],
    href: '/sectors/federal-government',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    color: '#39ff14',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v4M10 14h4"/>
      </svg>
    ),
    headline: 'IoT · OEE · Supply Chain',
    stats: [
      { value: 'OEE', label: 'Optimization' },
      { value: 'IoT', label: 'Integration' },
      { value: 'SPC', label: 'Quality Control' },
    ],
    capabilities: ['Production analytics & OEE', 'Supply chain visibility', 'Predictive maintenance', 'Quality control SPC'],
    href: '/sectors/manufacturing',
  },
  {
    id: 'ai-platforms',
    name: 'AI Platforms',
    color: '#ff4da6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        <circle cx="12" cy="12" r="2.5"/>
        <line x1="12" y1="7" x2="12" y2="9.5"/><line x1="10" y1="13.5" x2="6.5" y2="17.2"/>
        <line x1="14" y1="13.5" x2="17.5" y2="17.2"/>
      </svg>
    ),
    headline: 'RLHF · Annotation · STEM',
    stats: [
      { value: '98%', label: 'IAA Score' },
      { value: 'RLHF', label: 'Specialists' },
      { value: 'Multi', label: 'Domain Teams' },
    ],
    capabilities: ['Expert AI training labor', 'RLHF & preference data', 'Domain annotation (STEM, legal)', 'QA & inter-annotator QC'],
    href: '/ai-training',
  },
];

export default function SectorsPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <title>Sectors We Serve | Precise Analytics</title>
        <meta
          name="description"
          content="Specialized analytics for federal government, healthcare, finance, defense, manufacturing, and AI platforms — production-ready solutions by Precise Analytics."
        />
        <meta name="keywords" content="sector analytics, federal analytics, healthcare data, defense intelligence, financial risk, manufacturing IoT, AI training" />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        {/* Hero */}
        <HeroSection>
          <BgLayer><AnimatedBackground variant="particles" /></BgLayer>
          <Container>
            <HeroLayout>
              <HeroLeft>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                  <Overline>Where We Operate</Overline>
                  <HeroTitle>6 Sectors.<br /><AccentSpan>One Delivery Standard.</AccentSpan></HeroTitle>
                  <HeroSub>
                    Federal agencies, healthcare systems, financial institutions, defense contractors,
                    manufacturers, and AI platforms — each with unique constraints, all demanding production-grade results.
                  </HeroSub>
                  <HeroActions>
                    <PrimaryBtn href="/schedule-consult">Talk to Our Team →</PrimaryBtn>
                    <OutlineBtn href="/work">See Case Studies</OutlineBtn>
                  </HeroActions>
                </motion.div>
              </HeroLeft>
              <HeroRight>
                {[
                  { icon: '🏛️', label: 'Federal Government' },
                  { icon: '🏥', label: 'Healthcare' },
                  { icon: '💰', label: 'Financial Services' },
                  { icon: '🛡️', label: 'Defense & Intel' },
                  { icon: '🏭', label: 'Manufacturing' },
                  { icon: '🤖', label: 'AI Platforms' },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>
                    <SectorPill>{s.icon} {s.label}</SectorPill>
                  </motion.div>
                ))}
              </HeroRight>
            </HeroLayout>
          </Container>
        </HeroSection>

        {/* Sector cards */}
        <CardsSection>
          <Container>
            <SectorGrid>
              {sectors.map((sector, i) => (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <SectorCard href={sector.href} $color={sector.color}>
                    <CardTop>
                      <SectorIcon $color={sector.color}>{sector.icon}</SectorIcon>
                      <SectorMeta>
                        <SectorName>{sector.name}</SectorName>
                        <SectorHeadline $color={sector.color}>{sector.headline}</SectorHeadline>
                      </SectorMeta>
                    </CardTop>

                    <StatsRow>
                      {sector.stats.map((s) => (
                        <StatCell key={s.label}>
                          <StatVal $color={sector.color}>{s.value}</StatVal>
                          <StatLabel>{s.label}</StatLabel>
                        </StatCell>
                      ))}
                    </StatsRow>

                    <CapList>
                      {sector.capabilities.map((c) => (
                        <CapItem key={c} $color={sector.color}>
                          <CapDot $color={sector.color} />
                          {c}
                        </CapItem>
                      ))}
                    </CapList>

                    <CardArrow $color={sector.color}>Explore →</CardArrow>
                  </SectorCard>
                </motion.div>
              ))}
            </SectorGrid>
          </Container>
        </CardsSection>

        {/* Compact CTA */}
        <CtaBanner>
          <Container>
            <CtaInner>
              <CtaText>
                <CtaTitle>Ready to see results in your sector?</CtaTitle>
                <CtaSub>Free 30-minute consultation — we diagnose your data stack on the first call.</CtaSub>
              </CtaText>
              <CtaActions>
                <CtaBtn href="/schedule-consult">Schedule a Consultation →</CtaBtn>
                <CtaSecondary href="/capabilities-statement">View Capabilities</CtaSecondary>
              </CtaActions>
            </CtaInner>
          </Container>
        </CtaBanner>
      </PageWrapper>
    </>
  );
}

/* ── Styles ── */

const PageWrapper = styled.div`min-height: 100vh;`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 13rem 0 7rem;
  border-bottom: 1px solid rgba(var(--text), 0.07);
`;

const BgLayer = styled.div`
  position: absolute; inset: 0; z-index: 0; opacity: 0.18;
`;

const HeroLayout = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 28rem;
  gap: 6rem;
  align-items: center;

  ${media.desktop(`grid-template-columns: 1fr 22rem; gap: 4rem;`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 3rem;`)}
`;

const HeroLeft = styled.div``;

const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  ${media.tablet(`flex-direction: row; flex-wrap: wrap;`)}
`;

const SectorPill = styled.div`
  background: rgba(var(--cardBackground), 0.6);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 0.8rem;
  padding: 1rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--text), 0.85);
`;

const Overline = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #ff8c2b;
  margin-bottom: 1.4rem;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  color: rgb(var(--text));
  margin-bottom: 1.8rem;
  letter-spacing: -0.02em;

  ${media.tablet(`font-size: 3.8rem;`)}
`;

const AccentSpan = styled.span`color: rgb(var(--accent));`;

const HeroSub = styled.p`
  font-size: 1.75rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.72);
  margin-bottom: 2.8rem;
  max-width: 60rem;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(NextLink)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.6rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 125, 0, 0.35); }
`;

const OutlineBtn = styled(NextLink)`
  display: inline-block;
  color: rgb(var(--text));
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.2rem 2.6rem;
  border-radius: 0.8rem;
  text-decoration: none;
  border: 1.5px solid rgba(var(--text), 0.18);
  transition: all 0.2s;

  &:hover { border-color: #ff8c2b; color: #ff8c2b; }
`;

const CardsSection = styled.section`
  padding: 8rem 0 10rem;
`;

const SectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 1.8rem;`)}
`;

const SectorCard = styled(NextLink)<{ $color: string }>`
  display: block;
  background: rgba(var(--cardBackground), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  padding: 2.8rem;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: ${(p) => p.$color}55;
    box-shadow: 0 8px 28px ${(p) => p.$color}18;
    transform: translateY(-4px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2rem;
`;

const SectorIcon = styled.div<{ $color: string }>`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background: ${(p) => p.$color}18;
  border: 1px solid ${(p) => p.$color}33;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: ${(p) => p.$color};
  }
`;

const SectorMeta = styled.div``;

const SectorName = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 0.3rem;
  line-height: 1.2;
`;

const SectorHeadline = styled.p<{ $color: string }>`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(p) => p.$color};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border: 1px solid rgba(var(--text), 0.07);
  border-radius: 0.8rem;
  overflow: hidden;
`;

const StatCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  border-right: 1px solid rgba(var(--text), 0.07);

  &:last-child { border-right: none; }
`;

const StatVal = styled.div<{ $color: string }>`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${(p) => p.$color};
  line-height: 1;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(var(--text), 0.5);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CapList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const CapItem = styled.li<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size: 1.4rem;
  color: rgba(var(--text), 0.8);
  font-weight: 500;
`;

const CapDot = styled.span<{ $color: string }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const CardArrow = styled.span<{ $color: string }>`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

/* CTA Banner */
const CtaBanner = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(var(--background), 1) 0%, rgba(15, 25, 50, 0.98) 100%);
  border-top: 1px solid rgba(var(--text), 0.07);
`;

const CtaInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
`;

const CtaText = styled.div``;

const CtaTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 0.6rem;
  line-height: 1.2;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const CtaSub = styled.p`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.65);
`;

const CtaActions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const CtaBtn = styled(NextLink)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.6rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 125, 0, 0.35); }
`;

const CtaSecondary = styled(NextLink)`
  display: inline-block;
  color: rgb(var(--text));
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.2rem 2.6rem;
  border-radius: 0.8rem;
  text-decoration: none;
  border: 1.5px solid rgba(var(--text), 0.18);
  transition: all 0.2s;

  &:hover { border-color: #ff8c2b; color: #ff8c2b; }
`;

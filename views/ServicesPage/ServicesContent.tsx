import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from 'react';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

type ServiceCard = {
  id: string;
  title: string;
  image: string; // photorealistic hero bg
  description: string; // readable, sentence-style (no bullets)
};

const services: ServiceCard[] = [
  {
    id: 'data-strategy',
    title: 'Data Strategy and Consulting',
    image: '/images/services/data-strategy.jpg',
    description:
      'Define a clear enterprise data strategy that aligns governance, architecture, and execution so analytics delivers measurable outcomes.',
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Reporting',
    image: '/images/services/business-intelligence.jpg',
    description:
      'Build trusted executive dashboards and a consistent KPI layer so leaders can make decisions from one version of the truth.',
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    image: '/images/services/predictive-analytics.jpg',
    description:
      'Forecast demand, identify risk early, and deploy interpretable models that drive real operational decisions—not notebook demos.',
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    image: '/images/services/data-visualization.jpg',
    description:
      'Turn complex systems into intuitive, decision-centric dashboard experiences built for clarity, adoption, and action.',
  },
  {
    id: 'data-warehousing',
    title: 'Data Warehousing & Integration',
    image: '/images/services/data-warehousing.jpg',
    description:
      'Unify fragmented systems into a scalable analytics foundation with reliable pipelines, clean models, and cloud-ready architecture.',
  },
  {
    id: 'data-quality',
    title: 'Data Quality Management',
    image: '/images/services/data-quality.jpg',
    description:
      'Improve trust in reporting through continuous validation, monitoring, and remediation workflows that prevent downstream surprises.',
  },

  // These 4 were the ones that commonly get “left out” in shorter versions:
  {
    id: 'custom-solutions',
    title: 'Custom Analytics Solutions',
    image: '/images/services/custom-solutions.jpg',
    description:
      'When off-the-shelf tools don’t fit, we build secure, scalable analytics apps tailored to mission-critical workflows and users.',
  },
  {
    id: 'training-support',
    title: 'Training & Enablement',
    image: '/images/services/training-support.jpg',
    description:
      'Upskill teams with role-based training and adoption playbooks so analytics is used consistently, correctly, and confidently.',
  },
  {
    id: 'agentic-ai',
    title: 'Advanced Analytics & Agentic AI',
    image: '/images/services/agentic-ai.jpg',
    description:
      'Design governed agent-based AI systems that monitor signals, reason over context, and support actions with human oversight.',
  },
  {
    id: 'decision-intelligence',
    title: 'Decision Intelligence & Automation',
    image: '/images/services/decision-intelligence.jpg',
    description:
      'Embed analytics into workflows using scenario modeling, recommendations, and controlled automation that stays auditable.',
  },
  {
    id: 'real-time-analytics',
    title: 'Real-Time & Streaming Analytics',
    image: '/images/services/real-time-analytics.jpg',
    description:
      'Enable real-time awareness and response with event-driven pipelines, low-latency metrics, alerting, and operational dashboards.',
  },
  {
    id: 'governance-risk',
    title: 'Data Governance, Risk & Compliance',
    image: '/images/services/governance-risk.jpg',
    description:
      'Make analytics and AI secure and compliant with governance frameworks, access controls, auditability, lineage, and policy controls.',
  },
];

const FALLBACK_BG = '/images/services/data-strategy.jpg';

export default function ServicesContent() {
  const openServiceDetail = useCallback((serviceId: string) => {
    // Open detail pages in a NEW tab (user request)
    if (typeof window !== 'undefined') {
      window.open(`/services/${serviceId}`, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <AnimatedReveal>
          <SectionTitle>Comprehensive Data Analytics Services</SectionTitle>
        </AnimatedReveal>

        <AnimatedReveal direction="up" delay={0.15}>
          <Intro>
            Precise Analytics delivers enterprise-grade analytics, decision intelligence, and AI systems designed for real
            operations. Each service includes practical implementation detail and visuals to help you understand exactly
            what you’re buying—and why it works.
          </Intro>
        </AnimatedReveal>

        <Grid>
          {services.map((service, index) => (
            <Card
              key={service.id}
              role="link"
              tabIndex={0}
              aria-label={`Open ${service.title} details in a new tab`}
              $bg={service.image || FALLBACK_BG}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
              onClick={() => openServiceDetail(service.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openServiceDetail(service.id);
                }
              }}
            >
              <CardContent>
                <CardTitle>{service.title}</CardTitle>
                <CardText>{service.description}</CardText>
              </CardContent>

              <Actions>
                {/* Leave Learn More styling as-is, but make it functional (opens detail page in new tab) */}
                <LearnMore
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${service.title} (opens in a new tab)`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openServiceDetail(service.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openServiceDetail(service.id);
                    }
                  }}
                >
                  Learn More
                </LearnMore>

                {/* Schedule consult should be orange + open in new tab */}
                <Schedule
                  href={`/schedule-consult?service=${service.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Schedule a Consult
                </Schedule>
              </Actions>
            </Card>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  padding: 10rem 0;
`;

const Intro = styled.p`
  max-width: 92rem;
  margin: 0 auto 5rem;
  text-align: center;
  font-size: 1.85rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.82);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  ${media.desktop(`grid-template-columns: repeat(3, 1fr);`)}
  ${media.tablet(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.phone(`grid-template-columns: 1fr;`)}

`;

const Card = styled(motion.div)<{ $bg: string }>`
  min-height: 34rem;
  border-radius: 2rem;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Photorealistic background image + readability gradient */
  background-image:
    linear-gradient(to bottom, rgba(11, 18, 32, 0.22), rgba(11, 18, 32, 0.92)),
    url(${(p) => p.$bg});
  background-size: cover;
  background-position: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  outline: none;

  &:hover {
    border-color: rgba(255, 140, 43, 0.65);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(57, 255, 20, 0.25);
  }
`;

const CardContent = styled.div`
  padding: 3rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 1.2rem;
  font-size: 2.2rem;

  /* Neon green title (user request) */
  color: #39ff14;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
`;

const Actions = styled.div`
  padding: 2.4rem 3rem;
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const LearnMore = styled.div`
  background: #ffffff;
  color: #ff8c2b;
  padding: 1rem 1.4rem;
  border-radius: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.2rem;
  user-select: none;

  &:hover {
    opacity: 0.96;
  }
`;

const Schedule = styled(Link)`
  background: #ff8c2b; /* orange */
  color: #ffffff;
  padding: 1rem 1.4rem;
  border-radius: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    opacity: 0.95;
  }
`;

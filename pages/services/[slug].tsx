import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import Button from 'components/Button';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const SERVICES: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
    content: string[];
  }
> = {
  'data-strategy': {
    title: 'Data Strategy & Consulting',
    image: '/images/services/data-strategy.jpg',
    description:
      'Data Strategy & Consulting focuses on aligning data capabilities with real organizational objectives.',
    content: [
      'Precise Analytics works with leadership and technical stakeholders to assess current data maturity, define governance and operating models, and design practical roadmaps that translate strategy into execution.',
      'Our engagements emphasize clarity around priorities, ownership, and outcomes, ensuring data initiatives are grounded in measurable business value rather than disconnected experimentation.',
      'By aligning analytics investments with mission goals and operational realities, organizations gain a clear path from strategy to execution while managing risk and complexity effectively.',
    ],
  },

  'business-intelligence': {
    title: 'Business Intelligence & Reporting',
    image: '/images/services/business-intelligence.jpg',
    description:
      'Business Intelligence & Reporting delivers trusted, decision-ready insights across the organization.',
    content: [
      'Precise Analytics designs executive and operational dashboards that establish a consistent metrics layer and serve as a single source of truth for decision-makers.',
      'We focus on usability, performance, and adoption so reporting systems integrate naturally into daily workflows rather than existing as static or underutilized reports.',
      'This approach enables faster decision cycles, reduced ambiguity, and greater confidence in the data that leaders rely on to guide strategy and operations.',
    ],
  },

  'predictive-analytics': {
    title: 'Predictive Analytics',
    image: '/images/services/predictive-analytics.jpg',
    description:
      'Predictive Analytics enables organizations to anticipate outcomes rather than react to them.',
    content: [
      'Precise Analytics develops forecasting and predictive models that surface emerging trends, risks, and opportunities across operational and strategic domains.',
      'Our models are designed for interpretability and operational deployment, ensuring outputs can be understood, trusted, and acted upon by business leaders.',
      'By embedding predictive insights directly into workflows, organizations can make proactive decisions that improve resilience, efficiency, and long-term performance.',
    ],
  },

  'data-visualization': {
    title: 'Data Visualization',
    image: '/images/services/data-visualization.jpg',
    description:
      'Data Visualization transforms complex data into intuitive, decision-focused narratives.',
    content: [
      'Precise Analytics designs visual experiences that prioritize clarity, context, and action, helping users quickly understand what matters most.',
      'We apply principles of visual hierarchy, storytelling, and user experience to ensure dashboards communicate insight rather than overwhelm audiences.',
      'The result is higher adoption, stronger engagement, and visual tools that become integral to daily decision-making across the organization.',
    ],
  },

  'data-warehousing': {
    title: 'Data Warehousing & Integration',
    image: '/images/services/data-warehousing.jpg',
    description:
      'Data Warehousing & Integration provides the foundation for scalable analytics.',
    content: [
      'Precise Analytics designs and implements modern, cloud-ready data platforms that unify fragmented systems into a cohesive analytics architecture.',
      'We emphasize reliable pipelines, clean data models, and performance optimization to support both current needs and future growth.',
      'This foundation enables organizations to scale analytics capabilities confidently without introducing unnecessary complexity or technical debt.',
    ],
  },

  'data-quality': {
    title: 'Data Quality Management',
    image: '/images/services/data-quality.jpg',
    description:
      'Data Quality Management ensures analytics outputs can be trusted.',
    content: [
      'Precise Analytics implements continuous validation, monitoring, and remediation frameworks that identify data issues early in the pipeline.',
      'We embed quality controls into governance and operational processes so issues are addressed systematically rather than reactively.',
      'This approach protects decision integrity and builds long-term confidence in the organization’s data ecosystem.',
    ],
  },

  'custom-solutions': {
    title: 'Custom Analytics Solutions',
    image: '/images/services/custom-solutions.jpg',
    description:
      'Custom Analytics Solutions address mission-critical needs that off-the-shelf tools cannot support.',
    content: [
      'Precise Analytics designs and builds secure, scalable analytics applications tailored to specific workflows, users, and regulatory environments.',
      'Our solutions integrate seamlessly with existing systems, ensuring insights are delivered where and when they are needed most.',
      'By focusing on real operational requirements, custom solutions provide targeted value without unnecessary features or complexity.',
    ],
  },

  'training-support': {
    title: 'Training & Enablement',
    image: '/images/services/training-support.jpg',
    description:
      'Training & Enablement ensures analytics investments translate into sustained value.',
    content: [
      'Precise Analytics provides role-based training and practical guidance tailored to the needs of executives, analysts, and operational teams.',
      'We focus on real use cases and applied learning rather than abstract theory, enabling teams to build confidence quickly.',
      'This approach strengthens internal capability, increases adoption, and reduces long-term reliance on external support.',
    ],
  },

  'agentic-ai': {
    title: 'Advanced Analytics & Agentic AI',
    image: '/images/services/agentic-ai.jpg',
    description:
      'Advanced Analytics & Agentic AI augments human decision-making through governed intelligence.',
    content: [
      'Precise Analytics designs agent-based systems that monitor signals, reason over context, and support informed action with transparency.',
      'We emphasize human-in-the-loop design, auditability, and explainability to ensure AI systems remain aligned with organizational values.',
      'This enables responsible adoption of advanced analytics and AI while maintaining trust, control, and compliance.',
    ],
  },

  'decision-intelligence': {
    title: 'Decision Intelligence & Automation',
    image: '/images/services/decision-intelligence.jpg',
    description:
      'Decision Intelligence & Automation embeds analytics directly into operational workflows.',
    content: [
      'Precise Analytics combines scenario modeling, recommendations, and controlled automation to support complex decisions.',
      'We design systems that balance speed with oversight, ensuring automation enhances decision-making rather than replacing accountability.',
      'This approach allows organizations to move from insight to action efficiently while maintaining transparency and control.',
    ],
  },

  'real-time-analytics': {
    title: 'Real-Time & Streaming Analytics',
    image: '/images/services/real-time-analytics.jpg',
    description:
      'Real-Time & Streaming Analytics enables immediate awareness and response.',
    content: [
      'Precise Analytics builds event-driven pipelines and low-latency dashboards that surface critical signals as they occur.',
      'These systems support monitoring, alerting, and rapid response in environments where timing is critical.',
      'Real-time analytics empowers organizations to act decisively and mitigate risk before issues escalate.',
    ],
  },

  'governance-risk': {
    title: 'Data Governance, Risk & Compliance',
    image: '/images/services/governance-risk.jpg',
    description:
      'Data Governance, Risk & Compliance ensures analytics and AI systems operate securely and responsibly.',
    content: [
      'Precise Analytics designs governance frameworks that establish ownership, access controls, lineage, and auditability across data assets.',
      'We embed compliance considerations directly into analytics architecture rather than treating them as an afterthought.',
      'This enables organizations to innovate confidently while meeting security, privacy, and regulatory obligations.',
    ],
  },
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== 'string' || !SERVICES[slug]) {
    return null;
  }

  const service = SERVICES[slug];

  return (
    <>
      <Head>
        <title>{`${service.title} | ${EnvVars.SITE_NAME}`}</title>
        <meta name="description" content={service.description} />
      </Head>

      <AnimatedHeader />

      <Hero style={{ backgroundImage: `url(${service.image})` }}>
        <Overlay />
        <HeroContent>
          <HeroInner>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
          </HeroInner>
        </HeroContent>
      </Hero>

      <Section>
        <Container>
          {service.content.map((paragraph, index) => (
            <Paragraph key={index}>{paragraph}</Paragraph>
          ))}

          <Actions>
            <NeonButton
              onClick={() => router.push(`/schedule-consult?service=${slug}`)}
            >
              Schedule a Consultation
            </NeonButton>

            <BackToServices onClick={() => router.push('/services')}>
              BACK TO SERVICES
            </BackToServices>
          </Actions>
        </Container>
      </Section>
    </>
  );
}

/* ================= STYLES ================= */

const Hero = styled.section`
  position: relative;
  min-height: 65vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.85)
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroInner = styled.div`
  max-width: 90rem;
  padding: 0 3rem;
  color: white;

  h1 {
    font-size: 5rem;
    margin-bottom: 2.4rem;
    color: #39ff14;
    font-weight: 800;
  }

  p {
    font-size: 2.2rem;
    line-height: 1.7;
    max-width: 72rem;
    margin: 0 auto;
  }

  ${media.tablet(`
    h1 { font-size: 3.6rem; }
    p { font-size: 1.9rem; }
  `)}
`;

const Section = styled.section`
  padding: 8rem 0;
`;

const Paragraph = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin-bottom: 3rem;
  max-width: 90rem;
`;

const Actions = styled.div`
  margin-top: 5rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const NeonButton = styled(Button)`
  background: #39ff14 !important;
  color: #ff8c2b !important;
  font-weight: 700;
  font-size: 1.6rem;
  padding: 1.4rem 3rem;

  &:hover {
    background: #2dd10d !important;
  }
`;

const BackToServices = styled.button`
  background: #ff8c2b;
  color: #ffffff;
  font-family: 'Aptos', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1.4rem 3rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:hover {
    background: #ff7a00;
  }
`;

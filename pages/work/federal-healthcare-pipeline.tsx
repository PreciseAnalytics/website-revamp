import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function FederalHealthcarePipeline() {
  return (
    <>
      <Head>
        <title>Federal Healthcare Pipeline Modernization | Precise Analytics | VOSB Data Engineering</title>
        <meta
          name="description"
          content="How Precise Analytics rebuilt a federal health agency's ETL pipeline, reducing latency by 40% while maintaining full HIPAA compliance. Cloud-native, AWS, production deployed."
        />
        <meta property="og:title" content="Federal Healthcare Pipeline Modernization | Precise Analytics" />
        <meta property="og:description" content="40% latency reduction. Cloud-native AWS pipeline. Full HIPAA compliance. Real-time clinical reporting across 12 regional offices." />
        <meta property="og:type" content="article" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <BackNav>
            <BackLink href="/work">← All Case Studies</BackLink>
          </BackNav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <CaseHeader>
              <CategoryBadge>Federal Healthcare</CategoryBadge>
              <CaseTitle>Federal Healthcare Data Pipeline Modernization</CaseTitle>
              <CaseSubtitle>
                Cloud-native migration from legacy on-premise ETL to real-time streaming — deployed across 12 regional offices with full HIPAA compliance.
              </CaseSubtitle>
              <MetricsRow>
                <MetricBox>
                  <MetricValue>40%</MetricValue>
                  <MetricDesc>Reduction in pipeline latency</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>12</MetricValue>
                  <MetricDesc>Regional offices on real-time reporting</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>100%</MetricValue>
                  <MetricDesc>HIPAA compliance maintained</MetricDesc>
                </MetricBox>
              </MetricsRow>
            </CaseHeader>
          </motion.div>

          <ContentGrid>
            <MainContent>
              <Section>
                <SectionLabel>The Challenge</SectionLabel>
                <SectionTitle>A Legacy System That Couldn&apos;t Keep Up</SectionTitle>
                <SectionText>
                  A federal health agency was operating a decade-old on-premise ETL pipeline that processed clinical data in overnight batch jobs. By the time decision-makers accessed reports each morning, the data was already 12 to 18 hours stale.
                </SectionText>
                <SectionText>
                  With 12 regional offices relying on this data for clinical reporting, the latency wasn&apos;t just an inconvenience — it was a compliance risk and an operational bottleneck. The agency needed real-time visibility, but any solution had to maintain strict HIPAA compliance throughout the migration and in production.
                </SectionText>
                <SectionText>
                  The additional complexity: the agency had minimal internal cloud expertise and needed a partner who could deliver a production system — not a proof of concept.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Approach</SectionLabel>
                <SectionTitle>Cloud-Native Streaming on AWS</SectionTitle>
                <SectionText>
                  Precise Analytics designed and deployed a cloud-native streaming architecture on AWS, replacing the nightly batch jobs with continuous, event-driven data processing. The migration was executed in phases to avoid disruption to ongoing clinical operations.
                </SectionText>
                <SectionText>
                  HIPAA compliance was built into the architecture from the start — not retrofitted. This included end-to-end encryption, access controls, audit logging, and data residency requirements. Every component was reviewed against HIPAA Security Rule requirements before deployment.
                </SectionText>
                <SectionText>
                  The new architecture used a combination of AWS Kinesis for streaming ingestion, AWS Glue for transformation, and Amazon Redshift for clinical reporting — all within a HIPAA-eligible services boundary.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Results</SectionLabel>
                <SectionTitle>40% Latency Reduction. 12 Offices. Production Day One.</SectionTitle>
                <SectionText>
                  The new pipeline delivered a <strong>40% reduction in data pipeline latency</strong>, transforming overnight batch reports into real-time clinical dashboards accessible by all 12 regional offices simultaneously.
                </SectionText>
                <SectionText>
                  Clinical staff gained access to patient flow, resource utilization, and outcome data in near real-time — enabling faster decisions at every level of the organization. The agency maintained full HIPAA compliance throughout the migration and continues to operate in a fully compliant state.
                </SectionText>
                <SectionText>
                  The engagement went from scoping to production deployment in under 90 days.
                </SectionText>
              </Section>

              <TechStackSection>
                <SectionLabel>Tech Stack</SectionLabel>
                <TagsRow>
                  {['AWS', 'Amazon Kinesis', 'AWS Glue', 'Amazon Redshift', 'Data Engineering', 'HIPAA Compliance', 'Cloud-Native Streaming'].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TagsRow>
              </TechStackSection>
            </MainContent>

            <Sidebar>
              <PullQuote>
                <QuoteIcon>&ldquo;</QuoteIcon>
                <QuoteText>
                  What our client said
                </QuoteText>
                <QuoteAttribution>
                  <strong>Director of Data Engineering</strong><br />
                  Federal Health Agency<br />
                  <QuoteNote>(Full testimonial coming soon — client approval in progress.)</QuoteNote>
                </QuoteAttribution>
              </PullQuote>

              <SidebarCtaCard>
                <SidebarCtaTitle>Need similar results?</SidebarCtaTitle>
                <SidebarCtaText>
                  Schedule a free consultation to discuss your data pipeline modernization project.
                </SidebarCtaText>
                <SidebarCtaButton href="/schedule-consult?case=federal-healthcare">
                  Schedule a Consultation →
                </SidebarCtaButton>
              </SidebarCtaCard>

              <RelatedLinks>
                <RelatedTitle>Related Work</RelatedTitle>
                <RelatedLink href="/work/financial-services-reporting">Financial Services Reporting →</RelatedLink>
                <RelatedLink href="/work/ai-training-at-scale">AI Training at Scale →</RelatedLink>
              </RelatedLinks>
            </Sidebar>
          </ContentGrid>

          <BottomCta>
            <BottomCtaTitle>Need similar results for your agency?</BottomCtaTitle>
            <BottomCtaLink href="/schedule-consult?case=federal-healthcare">
              Schedule a consultation →
            </BottomCtaLink>
          </BottomCta>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  padding: 3rem 0 8rem;
`;

const BackNav = styled.div`
  margin-bottom: 3rem;
`;

const BackLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const CaseHeader = styled.div`
  max-width: 90rem;
  margin-bottom: 6rem;
`;

const CategoryBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(255, 125, 0);
  display: block;
  margin-bottom: 1.2rem;
`;

const CaseTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.15;
  margin-bottom: 1.6rem;

  ${media.tablet(`font-size: 3.2rem;`)}
`;

const CaseSubtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.7);
  max-width: 75rem;
  margin-bottom: 3rem;

  ${media.tablet(`font-size: 1.7rem;`)}
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const MetricValue = styled.div`
  font-size: 4.4rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MetricDesc = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(var(--text), 0.65);
  max-width: 18rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 34rem;
  gap: 5rem;
  align-items: start;

  ${media.desktop(`
    grid-template-columns: 1fr;
  `)}
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Section = styled.div``;

const SectionLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.8rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;
  line-height: 1.3;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const SectionText = styled.p`
  font-size: 1.7rem;
  line-height: 1.75;
  color: rgba(var(--text), 0.8);
  margin-bottom: 1.4rem;

  strong { color: rgb(var(--text)); }
`;

const TechStackSection = styled.div``;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  border: 1px solid rgba(255, 125, 0, 0.25);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: sticky;
  top: 10rem;

  ${media.desktop(`position: static;`)}
`;

const PullQuote = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-left: 4px solid rgb(255, 125, 0);
  border-radius: 0 1rem 1rem 0;
  padding: 2.4rem;
`;

const QuoteIcon = styled.div`
  font-size: 5rem;
  line-height: 1;
  color: rgb(255, 125, 0);
  margin-bottom: 0.8rem;
`;

const QuoteText = styled.p`
  font-size: 1.8rem;
  font-style: italic;
  line-height: 1.65;
  color: rgba(var(--text), 0.8);
  margin-bottom: 1.4rem;
`;

const QuoteAttribution = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.65);
  line-height: 1.5;
`;

const QuoteNote = styled.span`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.4);
  font-style: italic;
`;

const SidebarCtaCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border: 1px solid rgba(255, 125, 0, 0.25);
  border-radius: 1.2rem;
  padding: 2.4rem;
`;

const SidebarCtaTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const SidebarCtaText = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 1.6rem;
  line-height: 1.5;
`;

const SidebarCtaButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.1rem 2rem;
  border-radius: 0.7rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 125, 0, 0.3);
  }
`;

const RelatedLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RelatedTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--text), 0.45);
  margin-bottom: 0.4rem;
`;

const RelatedLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const BottomCta = styled.div`
  margin-top: 6rem;
  padding: 4rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1.4rem;
  border: 1px solid rgba(var(--text), 0.1);
  text-align: center;
`;

const BottomCtaTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.4rem;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const BottomCtaLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: rgb(255, 165, 0);
  }
`;

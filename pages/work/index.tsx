import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

const caseStudies = [
  {
    slug: 'federal-healthcare-pipeline',
    category: 'Federal Healthcare',
    metric: '40%',
    metricLabel: 'Reduction in pipeline latency',
    headline: 'Federal Healthcare Data Pipeline Modernization',
    excerpt:
      'Rebuilt a legacy ETL pipeline for a federal health agency, migrating to cloud-native streaming on AWS. Delivered real-time clinical reporting across 12 regional offices with full HIPAA compliance.',
    tags: ['Data Engineering', 'AWS', 'HIPAA'],
  },
  {
    slug: 'financial-services-reporting',
    category: 'Financial Services',
    metric: '3×',
    metricLabel: 'Faster regulatory reporting cycle',
    headline: 'Financial Services Automated Reporting Platform',
    excerpt:
      'Replaced manual spreadsheet workflows with a live Power BI dashboard suite. Reduced monthly close reporting from 15 days to 5 days.',
    tags: ['Business Intelligence', 'Power BI', 'Automation'],
  },
  {
    slug: 'ai-training-at-scale',
    category: 'AI Workforce',
    metric: '98%',
    metricLabel: 'Inter-annotator agreement rate',
    headline: 'AI Training & RLHF Annotation at Scale',
    excerpt:
      'Deployed domain-expert annotators for 50,000+ RLHF preference comparisons across STEM, legal, and coding domains — with industry-leading quality scores.',
    tags: ['RLHF', 'AI Training', 'Quality Assurance'],
  },
];

export default function WorkIndex() {
  return (
    <>
      <Head>
        <title>Case Studies & Deployed Work | Precise Analytics | Data Engineering & AI</title>
        <meta
          name="description"
          content="Production results Precise Analytics has shipped for government and commercial clients. Federal healthcare, financial services, and AI training case studies."
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageHeader>
              <OverTitle>Our Work</OverTitle>
              <PageTitle>Deployed. Not Deckware.</PageTitle>
              <PageSubtitle>
                Production results we&apos;ve shipped for government and commercial clients.
                No slide decks — just working systems.
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          <CaseStudyGrid>
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <CaseStudyCard>
                  <CaseTag>{cs.category}</CaseTag>
                  <Metric>{cs.metric}</Metric>
                  <MetricLabel>{cs.metricLabel}</MetricLabel>
                  <CaseHeadline>{cs.headline}</CaseHeadline>
                  <CaseExcerpt>{cs.excerpt}</CaseExcerpt>
                  <TagsRow>
                    {cs.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagsRow>
                  <ReadMore href={`/work/${cs.slug}`}>Read the full case study →</ReadMore>
                </CaseStudyCard>
              </motion.div>
            ))}
          </CaseStudyGrid>

          <CtaSection>
            <CtaTitle>Need Results Like These?</CtaTitle>
            <CtaSubtitle>Schedule a free consultation and let&apos;s scope your project.</CtaSubtitle>
            <CtaButton href="/schedule-consult">Schedule a Consultation →</CtaButton>
          </CtaSection>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  padding: 4rem 0 8rem;
`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 6rem;
`;

const OverTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 1.2rem;
`;

const PageTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.6rem;

  ${media.tablet(`font-size: 3.6rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.7);

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 6rem;

  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const CaseStudyCard = styled.article`
  background: rgba(var(--cardBackground), 0.85);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: rgba(255, 125, 0, 0.4);
    box-shadow: 0 8px 28px rgba(255, 125, 0, 0.1);
  }
`;

const CaseTag = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgb(255, 125, 0);
`;

const Metric = styled.div`
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MetricLabel = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 0.4rem;
`;

const CaseHeadline = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  line-height: 1.35;
`;

const CaseExcerpt = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.75);
  flex: 1;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.4rem;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.3rem 0.9rem;
  border-radius: 0.4rem;
  background: rgba(var(--text), 0.07);
  color: rgba(var(--text), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
`;

const ReadMore = styled(Link)`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;
  margin-top: 0.4rem;

  &:hover {
    text-decoration: underline;
    color: rgb(255, 165, 0);
  }
`;

const CtaSection = styled.div`
  text-align: center;
  padding: 5rem 3rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.6rem;
`;

const CtaTitle = styled.h3`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;

  ${media.tablet(`font-size: 2.4rem;`)}
`;

const CtaSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 2.4rem;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.4rem 3.2rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.35);
  }
`;

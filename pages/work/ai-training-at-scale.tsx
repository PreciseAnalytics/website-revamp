import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function AiTrainingAtScale() {
  return (
    <>
      <Head>
        <title>RLHF Annotation & AI Training at Scale | Precise Analytics | 98% Agreement Rate</title>
        <meta
          name="description"
          content="Precise Analytics deployed domain-expert annotators for 50,000+ RLHF preference comparisons with a 98% inter-annotator agreement rate across STEM, legal, and coding."
        />
        <meta property="og:title" content="RLHF Annotation & AI Training at Scale | Precise Analytics" />
        <meta property="og:description" content="98% inter-annotator agreement. 50,000+ RLHF comparisons. Domain experts in STEM, legal, and coding." />
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
              <CategoryBadge>AI Workforce</CategoryBadge>
              <CaseTitle>AI Training &amp; RLHF Annotation at Scale</CaseTitle>
              <CaseSubtitle>
                Domain-expert annotators deployed for 50,000+ RLHF preference comparisons across STEM, legal, and coding — with industry-leading quality scores.
              </CaseSubtitle>
              <MetricsRow>
                <MetricBox>
                  <MetricValue>98%</MetricValue>
                  <MetricDesc>Inter-annotator agreement rate</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>50K+</MetricValue>
                  <MetricDesc>RLHF preference comparisons</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>3</MetricValue>
                  <MetricDesc>Domain verticals: STEM, legal, coding</MetricDesc>
                </MetricBox>
              </MetricsRow>
            </CaseHeader>
          </motion.div>

          <ContentGrid>
            <MainContent>
              <Section>
                <SectionLabel>The Challenge</SectionLabel>
                <SectionTitle>High-Volume, High-Stakes RLHF Annotation Across Specialized Domains</SectionTitle>
                <SectionText>
                  A large language model developer needed a scalable supply of high-quality RLHF preference comparisons to improve model alignment. The challenge wasn&apos;t just volume — it was domain depth. The model&apos;s target use cases included STEM problem-solving, legal document analysis, and software coding. Generic crowd-sourced annotation would not produce the quality required.
                </SectionText>
                <SectionText>
                  The client had tried a gig-economy annotation platform previously and experienced inter-annotator agreement rates below 80% — too low to produce reliable RLHF signal. They needed a new approach: fewer annotators, more expertise, and rigorous quality assurance built into every step.
                </SectionText>
                <SectionText>
                  The engagement needed to scale to 50,000+ comparisons while maintaining consistency across months of work.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Approach</SectionLabel>
                <SectionTitle>Recruit for Domain Expertise. Train for Consistency. QA Everything.</SectionTitle>
                <SectionText>
                  Precise Analytics recruited annotators with verified domain expertise — graduate-level STEM professionals, licensed attorneys and paralegals, and software engineers — rather than sourcing from general crowd-work pools. Each annotator completed a structured training program aligned to the client&apos;s specific annotation guidelines and the model&apos;s intended use cases.
                </SectionText>
                <SectionText>
                  Quality assurance was built into the workflow, not bolted on at the end. Every batch included calibration samples, overlap comparisons between annotators, and statistical agreement scoring. Annotators whose scores drifted from team benchmarks received targeted feedback and retraining before being returned to production work.
                </SectionText>
                <SectionText>
                  We maintained a dedicated quality lead throughout the engagement who reviewed daily agreement metrics and managed annotator performance — functioning as an embedded QA layer for the client&apos;s RLHF pipeline.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Results</SectionLabel>
                <SectionTitle>98% Agreement. 50,000+ Comparisons. Industry-Leading Quality.</SectionTitle>
                <SectionText>
                  The engagement achieved a <strong>98% inter-annotator agreement rate</strong> across all domains — a significant improvement over the industry average of 80–85% for RLHF annotation. This level of agreement means the training signal fed into the model was consistent, reliable, and statistically robust.
                </SectionText>
                <SectionText>
                  Over 50,000 RLHF preference comparisons were delivered across the STEM, legal, and coding verticals. The client&apos;s model team reported that the Precise Analytics annotation cohort consistently produced cleaner RLHF batches than any prior vendor.
                </SectionText>
                <SectionText>
                  The engagement has expanded to additional domain verticals, and Precise Analytics continues to supply annotation labor for ongoing model training cycles.
                </SectionText>
              </Section>

              <TechStackSection>
                <SectionLabel>Domain & Process Stack</SectionLabel>
                <TagsRow>
                  {['RLHF', 'Preference Comparisons', 'AI Training', 'Quality Assurance', 'STEM Domain', 'Legal Domain', 'Coding Domain', 'Inter-Annotator Agreement'].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TagsRow>
              </TechStackSection>
            </MainContent>

            <Sidebar>
              <PullQuote>
                <QuoteIcon>&ldquo;</QuoteIcon>
                <QuoteText>What our client said</QuoteText>
                <QuoteAttribution>
                  <strong>Head of RLHF Operations</strong><br />
                  AI Platform Company<br />
                  <QuoteNote>(Full testimonial coming soon — client approval in progress.)</QuoteNote>
                </QuoteAttribution>
              </PullQuote>

              <SidebarCtaCard>
                <SidebarCtaTitle>Need expert annotators?</SidebarCtaTitle>
                <SidebarCtaText>
                  Schedule a free consultation to discuss your annotation and AI training requirements.
                </SidebarCtaText>
                <SidebarCtaButton href="/schedule-consult?case=ai-training">
                  Schedule a Consultation →
                </SidebarCtaButton>
              </SidebarCtaCard>

              <RelatedLinks>
                <RelatedTitle>Related</RelatedTitle>
                <RelatedLink href="/services/ai-training-annotation">AI Training Services →</RelatedLink>
                <RelatedLink href="/work/federal-healthcare-pipeline">Federal Healthcare Pipeline →</RelatedLink>
              </RelatedLinks>
            </Sidebar>
          </ContentGrid>

          <BottomCta>
            <BottomCtaTitle>Need expert annotators for your AI training pipeline?</BottomCtaTitle>
            <BottomCtaLink href="/schedule-consult?case=ai-training">
              Schedule a consultation →
            </BottomCtaLink>
          </BottomCta>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 3rem 0 8rem;`;
const BackNav = styled.div`margin-bottom: 3rem;`;
const BackLink = styled(Link)`font-size: 1.5rem; font-weight: 600; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; }`;
const CaseHeader = styled.div`max-width: 90rem; margin-bottom: 6rem;`;
const CategoryBadge = styled.span`font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(255, 125, 0); display: block; margin-bottom: 1.2rem;`;
const CaseTitle = styled.h1`font-size: 4.8rem; font-weight: 800; color: rgb(var(--text)); line-height: 1.15; margin-bottom: 1.6rem; ${media.tablet(`font-size: 3.2rem;`)}`;
const CaseSubtitle = styled.p`font-size: 2rem; line-height: 1.6; color: rgba(var(--text), 0.7); max-width: 75rem; margin-bottom: 3rem; ${media.tablet(`font-size: 1.7rem;`)}`;
const MetricsRow = styled.div`display: flex; gap: 3rem; flex-wrap: wrap;`;
const MetricBox = styled.div`display: flex; flex-direction: column; gap: 0.4rem;`;
const MetricValue = styled.div`font-size: 4.4rem; font-weight: 900; line-height: 1; background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`;
const MetricDesc = styled.div`font-size: 1.4rem; font-weight: 500; color: rgba(var(--text), 0.65); max-width: 18rem;`;
const ContentGrid = styled.div`display: grid; grid-template-columns: 1fr 34rem; gap: 5rem; align-items: start; ${media.desktop(`grid-template-columns: 1fr;`)}`;
const MainContent = styled.div`display: flex; flex-direction: column; gap: 4rem;`;
const Section = styled.div``;
const SectionLabel = styled.p`font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgb(255, 125, 0); margin-bottom: 0.8rem;`;
const SectionTitle = styled.h2`font-size: 2.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.6rem; line-height: 1.3; ${media.tablet(`font-size: 2.2rem;`)}`;
const SectionText = styled.p`font-size: 1.7rem; line-height: 1.75; color: rgba(var(--text), 0.8); margin-bottom: 1.4rem; strong { color: rgb(var(--text)); }`;
const TechStackSection = styled.div``;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1rem;`;
const TechTag = styled.span`font-size: 1.3rem; font-weight: 600; padding: 0.5rem 1.2rem; border-radius: 0.5rem; background: rgba(255, 125, 0, 0.1); color: rgb(255, 125, 0); border: 1px solid rgba(255, 125, 0, 0.25);`;
const Sidebar = styled.div`display: flex; flex-direction: column; gap: 2.4rem; position: sticky; top: 10rem; ${media.desktop(`position: static;`)}`;
const PullQuote = styled.div`background: rgba(var(--cardBackground), 0.9); border-left: 4px solid rgb(255, 125, 0); border-radius: 0 1rem 1rem 0; padding: 2.4rem;`;
const QuoteIcon = styled.div`font-size: 5rem; line-height: 1; color: rgb(255, 125, 0); margin-bottom: 0.8rem;`;
const QuoteText = styled.p`font-size: 1.8rem; font-style: italic; line-height: 1.65; color: rgba(var(--text), 0.8); margin-bottom: 1.4rem;`;
const QuoteAttribution = styled.div`font-size: 1.4rem; color: rgba(var(--text), 0.65); line-height: 1.5;`;
const QuoteNote = styled.span`font-size: 1.2rem; color: rgba(var(--text), 0.4); font-style: italic;`;
const SidebarCtaCard = styled.div`background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05)); border: 1px solid rgba(255, 125, 0, 0.25); border-radius: 1.2rem; padding: 2.4rem;`;
const SidebarCtaTitle = styled.h3`font-size: 1.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 0.8rem;`;
const SidebarCtaText = styled.p`font-size: 1.5rem; color: rgba(var(--text), 0.7); margin-bottom: 1.6rem; line-height: 1.5;`;
const SidebarCtaButton = styled(Link)`display: inline-block; background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0)); color: white; font-size: 1.5rem; font-weight: 700; padding: 1.1rem 2rem; border-radius: 0.7rem; text-decoration: none; transition: all 0.2s ease; &:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(255, 125, 0, 0.3); }`;
const RelatedLinks = styled.div`display: flex; flex-direction: column; gap: 0.8rem;`;
const RelatedTitle = styled.p`font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(var(--text), 0.45); margin-bottom: 0.4rem;`;
const RelatedLink = styled(Link)`font-size: 1.5rem; font-weight: 600; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; }`;
const BottomCta = styled.div`margin-top: 6rem; padding: 4rem; background: rgba(var(--cardBackground), 0.8); border-radius: 1.4rem; border: 1px solid rgba(var(--text), 0.1); text-align: center;`;
const BottomCtaTitle = styled.h3`font-size: 2.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.4rem; ${media.tablet(`font-size: 2.2rem;`)}`;
const BottomCtaLink = styled(Link)`font-size: 1.8rem; font-weight: 700; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; color: rgb(255, 165, 0); }`;

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

const faqs = [
  {
    q: 'What makes Precise Analytics different from other data consultancies?',
    a: "We don't just recommend — we deploy. Every engagement is built around getting your data infrastructure, dashboards, or AI models into production. We're security-clearance ready, and we price against deployment milestones, not billable hours.",
  },
  {
    q: 'Do you work with classified or sensitive government data?',
    a: 'Yes. We are a GSA Schedule contractor with experience on federal projects requiring security clearances. We maintain full compliance with HIPAA, FISMA, and other regulatory frameworks as required.',
  },
  {
    q: 'What does your AI training labor service include?',
    a: 'We supply domain-expert annotation teams for RLHF, preference comparisons, and model training. Our annotators are recruited for domain expertise (STEM, legal, coding), trained on your specific guidelines, and QA\'d by data professionals — delivering a 98% inter-annotator agreement rate.',
  },
  {
    q: 'How quickly can you deploy a production pipeline?',
    a: 'Most engagements move from scoping to production deployment in weeks, not months. Our federal healthcare client saw a 40% latency reduction in their new cloud-native pipeline, deployed across 12 regional offices.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Government and federal agencies, healthcare and life sciences, financial services, and manufacturing. We also serve AI platform companies through our AI training labor services.',
  },
  {
    q: 'What contract vehicles do you hold?',
    a: 'We hold an active GSA Schedule and maintain NAICS compliance for federal contracting. We have active federal contract experience and can provide contract vehicle details on request.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>FAQ | Precise Analytics | Data Engineering & AI</title>
        <meta
          name="description"
          content="Frequently asked questions about Precise Analytics — data engineering, BI, AI training labor, federal contracting, and deployment timelines."
        />
        <meta property="og:title" content="FAQ | Precise Analytics" />
        <meta property="og:description" content="Answers to the most common questions about our data engineering, BI, and AI training services." />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageHeader>
              <OverTitle>FAQ</OverTitle>
              <PageTitle>Frequently Asked Questions</PageTitle>
              <PageSubtitle>
                Answers to the questions we hear most from government agencies, financial institutions, and AI platform companies.
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          <FaqLayout>
            {/* Left — accordion */}
            <FaqCol>
              <FaqList>
                {faqs.map((faq, i) => (
                  <FaqItem key={i}>
                    <FaqQuestion
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      aria-expanded={openIndex === i}
                    >
                      <FaqQuestionText>{faq.q}</FaqQuestionText>
                      <FaqChevron $open={openIndex === i}>{openIndex === i ? '−' : '+'}</FaqChevron>
                    </FaqQuestion>
                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <FaqAnswer>{faq.a}</FaqAnswer>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FaqItem>
                ))}
              </FaqList>
            </FaqCol>

            {/* Right — sticky sidebar */}
            <Sidebar>
              <CtaSection>
                <CtaTitle>Still have questions?</CtaTitle>
                <CtaSubtitle>Schedule a free 30-minute consultation — we&apos;ll answer anything specific to your project.</CtaSubtitle>
                <CtaButton href="/schedule-consult">Schedule a Consultation →</CtaButton>
                <AltLinks>
                  <AltLink href="/compare">See how we compare →</AltLink>
                  <AltLink href="/work">View our case studies →</AltLink>
                </AltLinks>
              </CtaSection>

              <QuickFacts>
                <QuickFactsTitle>Quick Facts</QuickFactsTitle>
                {[
                  { label: 'Response time', value: '< 4 business hours' },
                  { label: 'Contract vehicle', value: 'GSA Schedule' },
                  { label: 'Clearance', value: 'Clearance-ready staff' },
                  { label: 'Avg. deployment', value: 'Weeks, not months' },
                  { label: 'Satisfaction', value: '98% client retention' },
                ].map((f) => (
                  <FactRow key={f.label}>
                    <FactLabel>{f.label}</FactLabel>
                    <FactValue>{f.value}</FactValue>
                  </FactRow>
                ))}
              </QuickFacts>
            </Sidebar>
          </FaqLayout>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 4rem 0 8rem;`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 100rem;
  margin: 0 auto 5rem;
`;

const FaqLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 36rem;
  gap: 4rem;
  align-items: start;

  ${media.desktop(`grid-template-columns: 1fr 32rem;`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 3rem;`)}
`;

const FaqCol = styled.div``;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: sticky;
  top: 10rem;
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
  font-size: 4.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.6rem;

  ${media.tablet(`font-size: 3.2rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.7);

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  overflow: hidden;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid rgba(var(--text), 0.08);

  &:last-child { border-bottom: none; }
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.4rem 2.8rem;
  background: rgba(var(--cardBackground), 0.85);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;

  &:hover { background: rgba(var(--cardBackground), 1); }
`;

const FaqQuestionText = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
  color: rgb(var(--text));
  line-height: 1.4;
`;

const FaqChevron = styled.span<{ $open: boolean }>`
  font-size: 2.4rem;
  font-weight: 300;
  color: rgb(255, 125, 0);
  flex-shrink: 0;
  transition: transform 0.2s;
`;

const FaqAnswer = styled.div`
  padding: 0.4rem 2.8rem 2.4rem;
  font-size: 1.6rem;
  line-height: 1.75;
  color: rgba(var(--text), 0.8);
  background: rgba(var(--cardBackground), 0.5);
`;

const CtaSection = styled.div`
  text-align: center;
  padding: 3rem 2.4rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.4rem;
`;

const CtaTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const CtaSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 1.8rem;
  line-height: 1.55;
`;

const CtaButton = styled(Link)`
  display: block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1.2rem 2rem;
  border-radius: 0.9rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  margin-bottom: 1.4rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 125, 0, 0.35);
  }
`;

const AltLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const AltLink = styled(Link)`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  text-decoration: none;
  font-weight: 600;

  &:hover { text-decoration: underline; }
`;

const QuickFacts = styled.div`
  background: rgba(var(--cardBackground), 0.6);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  padding: 2.4rem;
`;

const QuickFactsTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const FactRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(var(--text), 0.06);

  &:last-child { border-bottom: none; }
`;

const FactLabel = styled.span`
  font-size: 1.35rem;
  color: rgba(var(--text), 0.5);
  font-weight: 500;
`;

const FactValue = styled.span`
  font-size: 1.35rem;
  color: rgb(var(--text));
  font-weight: 700;
  text-align: right;
`;

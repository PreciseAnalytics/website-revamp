import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

const processSteps = [
  {
    step: '01',
    title: 'Recruit for Domain Expertise',
    description: 'We source annotators with verified credentials in your target domain — graduate-level STEM, licensed legal professionals, or senior engineers — not general crowd workers.',
  },
  {
    step: '02',
    title: 'Train on Your Guidelines',
    description: 'Every annotator completes a structured onboarding aligned to your specific annotation guidelines, edge cases, and model behavior goals before touching production data.',
  },
  {
    step: '03',
    title: 'QA Every Batch',
    description: 'Calibration samples, overlap scoring, and statistical agreement checks are built into every workflow. Annotators who drift from benchmarks receive targeted feedback before continuing.',
  },
  {
    step: '04',
    title: 'Scale and Report',
    description: 'Daily agreement metrics, batch-level quality reports, and dedicated QA oversight keep your RLHF pipeline running clean at any volume.',
  },
];

const domains = [
  { icon: '🔬', name: 'STEM', detail: 'Mathematics, physics, biology, chemistry, engineering — annotators with graduate-level expertise.' },
  { icon: '⚖️', name: 'Legal', detail: 'Contract analysis, legal reasoning, case law — annotators with JDs and paralegal credentials.' },
  { icon: '💻', name: 'Coding', detail: 'Code review, algorithm correctness, debugging — annotators who are working software engineers.' },
  { icon: '📝', name: 'General Knowledge', detail: 'Factual accuracy, instruction following, safety evaluation — trained generalist annotators.' },
];

export default function AiTrainingAnnotation() {
  return (
    <>
      <Head>
        <title>AI Training & Annotation Services | Precise Analytics | RLHF Experts</title>
        <meta
          name="description"
          content="Domain-expert AI training labor with 98% inter-annotator agreement. RLHF, preference comparisons, and model training annotation. Built for foundation model builders."
        />
        <meta property="og:title" content="AI Training & Annotation Services | Precise Analytics" />
        <meta property="og:description" content="98% inter-annotator agreement. Domain experts in STEM, legal, and coding. Built for AI platform companies and foundation model builders." />
        <meta property="og:type" content="website" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroSection>
              <OverTitle>AI Training &amp; Annotation</OverTitle>
              <HeroTitle>Skilled AI Training Labor.<br />Industry-Leading Quality.</HeroTitle>
              <HeroSubtitle>
                Domain-expert annotation teams for RLHF, preference comparisons, and model training — managed end-to-end by data professionals who care about quality as much as you do.
              </HeroSubtitle>
              <HeroCta href="/schedule-consult?service=ai-training">
                Scale Your Annotation Team →
              </HeroCta>
            </HeroSection>
          </motion.div>

          {/* Agreement Rate Hero Stat */}
          <AgreementSection>
            <AgreementStat>
              <AgreementNumber>98%</AgreementNumber>
              <AgreementLabel>Inter-Annotator Agreement Rate</AgreementLabel>
            </AgreementStat>
            <AgreementContext>
              The industry average for RLHF annotation is 80–85%. Our domain-expert teams consistently hit 98% — because we recruit for expertise, not just availability.
            </AgreementContext>
          </AgreementSection>

          {/* What is RLHF */}
          <ExplainerSection>
            <SectionLabel>What Is RLHF Annotation?</SectionLabel>
            <SectionTitle>Making AI Learn What &ldquo;Better&rdquo; Means</SectionTitle>
            <ExplainerText>
              Reinforcement Learning from Human Feedback (RLHF) is how leading AI models learn to be helpful, accurate, and safe. At its core, it requires human annotators to compare pairs of AI-generated responses and indicate which one is better — and why.
            </ExplainerText>
            <ExplainerText>
              The quality of those comparisons determines the quality of the model. If the annotators don&apos;t deeply understand the domain — if they can&apos;t evaluate whether a mathematical proof is correct, whether a legal argument is sound, or whether code will actually compile — the training signal is noise.
            </ExplainerText>
            <ExplainerText>
              That&apos;s why domain expertise isn&apos;t a nice-to-have. It&apos;s the difference between a model that reasons well and one that sounds reasonable but is wrong.
            </ExplainerText>
          </ExplainerSection>

          {/* Domain Expertise */}
          <DomainsSection>
            <SectionLabel>Domain Expertise</SectionLabel>
            <SectionTitle>Specialists, Not Generalists</SectionTitle>
            <DomainsGrid>
              {domains.map((d) => (
                <DomainCard key={d.name}>
                  <DomainIcon>{d.icon}</DomainIcon>
                  <DomainName>{d.name}</DomainName>
                  <DomainDetail>{d.detail}</DomainDetail>
                </DomainCard>
              ))}
            </DomainsGrid>
          </DomainsSection>

          {/* Process */}
          <ProcessSection>
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>Recruit. Train. QA. Scale.</SectionTitle>
            <ProcessGrid>
              {processSteps.map((step) => (
                <ProcessCard key={step.step}>
                  <ProcessStep>{step.step}</ProcessStep>
                  <ProcessTitle>{step.title}</ProcessTitle>
                  <ProcessText>{step.description}</ProcessText>
                </ProcessCard>
              ))}
            </ProcessGrid>
          </ProcessSection>

          {/* Target Buyer */}
          <BuyerSection>
            <BuyerIcon>🎯</BuyerIcon>
            <BuyerTitle>Built for AI Platform Companies and Foundation Model Builders</BuyerTitle>
            <BuyerText>
              If you&apos;re training or fine-tuning a large language model and need reliable, scalable annotation labor — with quality you can actually measure — we built this for you.
            </BuyerText>
            <DifferentiatorText>
              Unlike gig-economy annotation platforms, our teams are trained, managed, and QA&apos;d by data professionals. You get a dedicated quality lead, daily metrics, and annotation output you can trust to feed your RLHF pipeline.
            </DifferentiatorText>
          </BuyerSection>

          {/* CTA */}
          <CtaSection>
            <CtaTitle>Scale Your Annotation Team</CtaTitle>
            <CtaSubtitle>
              Tell us about your annotation volume, domain, and timeline — we&apos;ll scope a team that fits.
            </CtaSubtitle>
            <CtaButton href="/schedule-consult?service=ai-training">
              Scale Your Annotation Team →
            </CtaButton>
            <CtaSecondary href="/work/ai-training-at-scale">
              See the case study →
            </CtaSecondary>
          </CtaSection>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 4rem 0 8rem;`;

const HeroSection = styled.div`
  text-align: center;
  max-width: 85rem;
  margin: 0 auto 6rem;
  padding: 4rem 0;
`;

const OverTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 1.4rem;
`;

const HeroTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 2rem;

  ${media.tablet(`font-size: 3.6rem;`)}
`;

const HeroSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.75);
  margin-bottom: 3rem;

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const HeroCta = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.5rem 3.5rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 125, 0, 0.35);
  }
`;

const AgreementSection = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border: 1px solid rgba(255, 125, 0, 0.25);
  border-radius: 1.6rem;
  padding: 4rem;
  margin-bottom: 6rem;

  ${media.tablet(`flex-direction: column; gap: 2rem; padding: 2.5rem 2rem;`)}
`;

const AgreementStat = styled.div`
  text-align: center;
  flex-shrink: 0;
`;

const AgreementNumber = styled.div`
  font-size: 7rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AgreementLabel = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-top: 0.6rem;
`;

const AgreementContext = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const SectionLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 0.8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  line-height: 1.25;

  ${media.tablet(`font-size: 2.6rem;`)}
`;

const ExplainerSection = styled.div`margin-bottom: 6rem;`;
const ExplainerText = styled.p`font-size: 1.7rem; line-height: 1.75; color: rgba(var(--text), 0.8); margin-bottom: 1.4rem; max-width: 85rem;`;

const DomainsSection = styled.div`margin-bottom: 6rem;`;
const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
  margin-top: 2rem;

  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;
const DomainCard = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  padding: 2.4rem;
  text-align: center;
  transition: border-color 0.2s;

  &:hover { border-color: rgba(255, 125, 0, 0.35); }
`;
const DomainIcon = styled.div`font-size: 3.5rem; margin-bottom: 1rem;`;
const DomainName = styled.h3`font-size: 2rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 0.8rem;`;
const DomainDetail = styled.p`font-size: 1.4rem; line-height: 1.6; color: rgba(var(--text), 0.7);`;

const ProcessSection = styled.div`margin-bottom: 6rem;`;
const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
  margin-top: 2rem;

  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;
const ProcessCard = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1.2rem;
  padding: 2.4rem;
`;
const ProcessStep = styled.div`
  font-size: 3.6rem;
  font-weight: 900;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;
const ProcessTitle = styled.h3`font-size: 1.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 0.8rem;`;
const ProcessText = styled.p`font-size: 1.4rem; line-height: 1.65; color: rgba(var(--text), 0.7);`;

const BuyerSection = styled.div`
  background: rgba(var(--cardBackground), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.6rem;
  padding: 4rem;
  margin-bottom: 6rem;

  ${media.tablet(`padding: 2.5rem;`)}
`;
const BuyerIcon = styled.div`font-size: 3.5rem; margin-bottom: 1.2rem;`;
const BuyerTitle = styled.h2`font-size: 2.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.4rem; line-height: 1.3; ${media.tablet(`font-size: 2.2rem;`)}`;
const BuyerText = styled.p`font-size: 1.7rem; line-height: 1.7; color: rgba(var(--text), 0.8); margin-bottom: 1.2rem;`;
const DifferentiatorText = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  padding: 1.6rem 2rem;
  border-left: 3px solid rgb(255, 125, 0);
  background: rgba(255, 125, 0, 0.05);
  border-radius: 0 0.8rem 0.8rem 0;
`;

const CtaSection = styled.div`
  text-align: center;
  padding: 5rem 3rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.6rem;
`;
const CtaTitle = styled.h2`font-size: 3.4rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.2rem; ${media.tablet(`font-size: 2.6rem;`)}`;
const CtaSubtitle = styled.p`font-size: 1.8rem; color: rgba(var(--text), 0.7); margin-bottom: 2.8rem;`;
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
  margin-right: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.35);
  }

  ${media.tablet(`margin-right: 0; margin-bottom: 1.2rem; display: block;`)}
`;
const CtaSecondary = styled(Link)`
  display: inline-block;
  font-size: 1.7rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

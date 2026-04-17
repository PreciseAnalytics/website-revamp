import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    problem: 'Inconsistent output quality across contributors',
    solution: 'Every batch goes through multi-layer QA with inter-annotator agreement checks before delivery.',
  },
  {
    problem: 'Contractors who disappear mid-project',
    solution: 'We are a managed team with a dedicated project lead — not a freelancer. You have one accountable point of contact.',
  },
  {
    problem: 'Slow ramp-up eating into your timeline',
    solution: 'We onboard in days, not weeks. Our team is pre-vetted and platform calibration-ready.',
  },
  {
    problem: 'Generic workers with no domain depth',
    solution: 'Our contributors hold advanced degrees in STEM, business, healthcare, and finance — matched to your task type.',
  },
];

const DELIVERABLES = [
  {
    icon: '🧠',
    title: 'RLHF & Preference Ranking',
    desc: 'Pairwise comparisons, response ranking, and quality scoring across instruction-following, reasoning, chain-of-thought, and creative tasks.',
    tags: ['Preference Datasets', 'Response Ranking', 'Safety Feedback'],
  },
  {
    icon: '💻',
    title: 'Code Review & Correction',
    desc: 'Code-literate reviewers verify, debug, and rewrite AI-generated code in Python, SQL, JavaScript, and R — with documented reasoning and ground-truth solutions.',
    tags: ['Python / SQL / JS / R', 'Bug Fixes', 'Ground-Truth Solutions'],
  },
  {
    icon: '✍️',
    title: 'Prompt & Response Writing',
    desc: 'High-quality instruction-response pairs, adversarial prompts, and multi-turn conversations built to your schema and quality rubric.',
    tags: ['Instruction Datasets', 'Adversarial Prompts', 'Multi-turn Dialogues'],
  },
  {
    icon: '🏷️',
    title: 'Data Annotation & Labeling',
    desc: 'Precision annotation for NER, sentiment classification, structured data extraction, and multi-modal content — at production throughput.',
    tags: ['NER / Classification', 'Sentiment & Intent', 'Multi-modal'],
  },
  {
    icon: '🔍',
    title: 'Model Evaluation & Red-Teaming',
    desc: 'Systematic audits for hallucination, factual accuracy, bias, and safety failures — with structured rubrics and actionable reports.',
    tags: ['Hallucination Audits', 'Bias & Safety Testing', 'Structured Rubrics'],
  },
  {
    icon: '📋',
    title: 'Managed Delivery & QA',
    desc: 'Full project management, throughput reporting, calibration against gold standards, and SLA tracking — so you get human-verified output, not excuses.',
    tags: ['SLA Tracking', 'IAA Monitoring', 'Gold Standard Calibration'],
  },
];

const STATS = [
  { value: 'Expert', label: 'Contributors', sub: 'STEM · Business · Healthcare · Finance' },
  { value: 'RLHF-Native', label: 'Workflows', sub: 'Preference ranking, SFT, red-teaming' },
  { value: 'Multi-Domain', label: 'Depth', sub: 'Not a crowd-sourced platform' },
  { value: 'Same-Week', label: 'Deployment', sub: 'Ready to pilot in days' },
];

const DIFFERENTIATORS = [
  {
    icon: '🎓',
    title: 'Not a Crowd. A Vetted Team.',
    body: 'Our contributors hold advanced degrees — STEM, MBAs, and licensed professionals in healthcare and finance. You get domain expertise matched to your task type, not random workers racing to hit volume quotas.',
  },
  {
    icon: '🏛️',
    title: 'One Point of Contact. Full Accountability.',
    body: 'Precise Analytics is a registered US company with a real leadership team behind every engagement. We sign MSAs and NDAs, and when something needs attention, someone picks up the phone.',
  },
  {
    icon: '🔬',
    title: 'Human-Verified Output. Every Batch.',
    body: 'We run internal quality checks, inter-annotator agreement scoring, and calibration against your gold standards before anything leaves our hands. Systematic errors should never reach your review queue.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: '30-Min Discovery Call',
    desc: 'Tell us your task type, volume, domain, and quality bar. We will tell you exactly how we can deliver and who on our team is the right match.',
  },
  {
    step: '02',
    title: 'Paid Pilot Batch',
    desc: 'We complete a small paid batch against your rubrics. You evaluate output quality before committing to volume — zero long-term risk.',
  },
  {
    step: '03',
    title: 'Team Match & Calibration',
    desc: 'We assign contributors by domain expertise, run calibration against your gold standards, and align on scoring before production begins.',
  },
  {
    step: '04',
    title: 'Production Delivery',
    desc: 'Ongoing delivery with throughput reporting, QA dashboards, and a dedicated project manager you can reach directly at any time.',
  },
];

const PLATFORMS = [
  'Outlier AI', 'Scale AI', 'Remotasks', 'Surge HQ', 'Appen', 'DataAnnotation.tech', 'Toloka', 'Other',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AITrainingPage() {
  return (
    <>
      <Head>
        <title>AI Workforce Solutions | Precise Analytics</title>
        <meta
          name="description"
          content="Precise Analytics provides vetted, platform-ready contributors for RLHF, data annotation, code review, prompt writing, and model evaluation. Purpose-built for Outlier AI, Scale AI, Remotasks, Surge, and similar AI training platforms."
        />
        <meta
          name="keywords"
          content="AI training contributors, RLHF labor contractor, data annotation team, Outlier AI vendor, Remotasks contractor, Scale AI partner, human feedback AI training, AI data labeling company, platform-ready annotators"
        />
        <meta property="og:title" content="AI Workforce Solutions | Precise Analytics" />
        <meta
          property="og:description"
          content="Vetted, domain-expert contributors for RLHF, annotation, code review, and model evaluation. Purpose-built for AI training platforms."
        />
      </Head>

      <AnimatedHeader />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroBg aria-hidden="true" />
        <Container>
          <HeroLayout>
            <HeroLeft>
              <HeroBadge
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                🤝 AI Workforce Solutions
              </HeroBadge>

              <HeroHeadline
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Skilled Contributors
                <br />
                <GreenText>for AI Training Platforms</GreenText>
              </HeroHeadline>

              <HeroBody
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Precise Analytics supplies vetted, performance-proven contributors for RLHF,
                data annotation, prompt writing, code review, and model evaluation —
                purpose-built for platforms like Outlier AI, Scale AI, Remotasks, and Surge.
              </HeroBody>

              <HeroActions
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <PrimaryBtn href="#pilot-form">Deploy a Contributor Team →</PrimaryBtn>
                <SecondaryBtn href="#how-it-works">See How It Works</SecondaryBtn>
              </HeroActions>

              <TrustRow
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <TrustItem>✅ Expert Contributors</TrustItem>
                <TrustItem>✅ US-Based Team</TrustItem>
                <TrustItem>✅ NDA-Ready</TrustItem>
                <TrustItem>✅ Human-Verified Output</TrustItem>
              </TrustRow>
            </HeroLeft>

            <HeroRight
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <StatCard>
                {STATS.map((s) => (
                  <StatItem key={s.label}>
                    <StatValue>{s.value}</StatValue>
                    <StatLabel>{s.label}</StatLabel>
                    <StatSub>{s.sub}</StatSub>
                  </StatItem>
                ))}
              </StatCard>
            </HeroRight>
          </HeroLayout>
        </Container>
      </HeroSection>

      {/* ── PLATFORMS STRIP ──────────────────────────────────────────────── */}
      <PlatformStrip>
        <Container>
          <PlatformLabel>Platform-Ready Contributors For</PlatformLabel>
          <PlatformRow>
            {PLATFORMS.map((p) => (
              <PlatformBadge key={p}>{p}</PlatformBadge>
            ))}
          </PlatformRow>
        </Container>
      </PlatformStrip>

      {/* ── PAIN → SOLUTION ──────────────────────────────────────────────── */}
      <PainSection>
        <Container>
          <PainHeading>What AI Platforms Tell Us They&apos;re Tired Of</PainHeading>
          <PainGrid>
            {PAIN_POINTS.map((p, i) => (
              <PainCard
                key={p.problem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <PainProblem>❌ &ldquo;{p.problem}&rdquo;</PainProblem>
                <PainDivider />
                <PainSolution>✅ {p.solution}</PainSolution>
              </PainCard>
            ))}
          </PainGrid>
        </Container>
      </PainSection>

      {/* ── DELIVERABLES ─────────────────────────────────────────────────── */}
      <DeliverablesSection>
        <Container>
          <CenteredHeader>
            <SectionLabel>Services</SectionLabel>
            <SectionHeading>The Human Layer Behind High-Performance AI</SectionHeading>
            <SectionSub>
              Full-stack AI training data services — managed end-to-end with one point
              of accountability and human-verified output on every delivery.
            </SectionSub>
          </CenteredHeader>

          <DeliverablesGrid>
            {DELIVERABLES.map((d, i) => (
              <DeliverableCard
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <DIcon>{d.icon}</DIcon>
                <DTitle>{d.title}</DTitle>
                <DDesc>{d.desc}</DDesc>
                <DTagRow>
                  {d.tags.map((t) => (
                    <DTag key={t}>{t}</DTag>
                  ))}
                </DTagRow>
              </DeliverableCard>
            ))}
          </DeliverablesGrid>
        </Container>
      </DeliverablesSection>

      {/* ── DIFFERENTIATORS ──────────────────────────────────────────────── */}
      <DiffSection>
        <Container>
          <CenteredHeader>
            <SectionLabel>Why Precise Analytics</SectionLabel>
            <SectionHeading>Task-Aligned Teams. Not Crowd-Sourced Guesswork.</SectionHeading>
            <SectionSub>
              We are not a marketplace. We are a managed services firm — which means
              accountability, consistency, and output quality that scales without degrading.
            </SectionSub>
          </CenteredHeader>
          <DiffGrid>
            {DIFFERENTIATORS.map((d, i) => (
              <DiffCard
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <DiffIcon>{d.icon}</DiffIcon>
                <DiffTitle>{d.title}</DiffTitle>
                <DiffBody>{d.body}</DiffBody>
              </DiffCard>
            ))}
          </DiffGrid>
        </Container>
      </DiffSection>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <HowSection id="how-it-works">
        <Container>
          <CenteredHeader>
            <SectionLabel>Process</SectionLabel>
            <SectionHeading>From First Email to First Delivery</SectionHeading>
            <SectionSub>
              We reduce your risk by starting small. A paid pilot lets you evaluate
              contributor quality before you commit to volume.
            </SectionSub>
          </CenteredHeader>

          <StepsRow>
            {HOW_IT_WORKS.map((s, i) => (
              <StepCard
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <StepNum>{s.step}</StepNum>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepCard>
            ))}
          </StepsRow>

          <PilotCallout>
            <PilotCalloutText>
              <strong>Start with a Paid Pilot.</strong> No long-term commitment.
              No upfront retainer. We earn your trust batch by batch.
            </PilotCalloutText>
            <PilotCalloutBtn href="/schedule-consult">Put Our Contributors to Work →</PilotCalloutBtn>
          </PilotCallout>
        </Container>
      </HowSection>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <CtaSection>
        <Container>
          <CtaBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CtaHeading>Ready to Deploy a Contributor Team?</CtaHeading>
            <CtaBody>
              Schedule a 30-minute discovery call. No sales pitch — just a direct
              conversation about your pipeline needs and whether we are the right fit.
            </CtaBody>
            <CtaActions>
              <CtaPrimary href="/schedule-consult">Schedule a Consultation →</CtaPrimary>
              <CtaSecondaryLink href="mailto:contact@preciseanalytics.io">
                📧 contact@preciseanalytics.io
              </CtaSecondaryLink>
            </CtaActions>
          </CtaBox>
        </Container>
      </CtaSection>

      {/* ── BOTTOM STRIP ─────────────────────────────────────────────────── */}
      <BottomStrip>
        <Container>
          <BottomStripInner>
            <BottomStripText>
              Looking for our enterprise analytics &amp; data services?
            </BottomStripText>
            <BottomLinks>
              <Link href="/services">Analytics Services</Link>
              <Link href="/capabilities-statement">Capabilities Statement</Link>
              <Link href="/contact">Contact</Link>
            </BottomLinks>
          </BottomStripInner>
        </Container>
      </BottomStrip>
    </>
  );
}

// ─── Animations ───────────────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { opacity: 0.18; transform: scale(1); }
  50%       { opacity: 0.28; transform: scale(1.04); }
`;

// ─── Styles ───────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  position: relative;
  background: #060d1a;
  padding: 9rem 0 8rem;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 50%, rgba(57, 255, 20, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 50%, rgba(255, 140, 43, 0.06) 0%, transparent 60%);
  animation: ${pulse} 6s ease-in-out infinite;
`;

const HeroLayout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: center;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const HeroLeft = styled.div``;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(57, 255, 20, 0.1);
  border: 1px solid rgba(57, 255, 20, 0.3);
  color: #39ff14;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.55rem 1.4rem;
  border-radius: 10rem;
  margin-bottom: 2.4rem;
`;

const HeroHeadline = styled(motion.h1)`
  font-size: clamp(3.8rem, 5.5vw, 6.2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 2.4rem;
`;

const GreenText = styled.span`color: #39ff14;`;

const HeroBody = styled(motion.p)`
  font-size: 1.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  max-width: 58rem;
  margin: 0 0 3.6rem;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
  margin-bottom: 3.6rem;
`;

const PrimaryBtn = styled.a`
  background: #ff8c2b;
  color: #fff;
  font-weight: 800;
  font-size: 1.7rem;
  padding: 1.4rem 3rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  &:hover { opacity: 0.9; transform: translateY(-2px); }
`;

const SecondaryBtn = styled.a`
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-weight: 700;
  font-size: 1.7rem;
  padding: 1.4rem 3rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(255, 255, 255, 0.5); }
`;

const TrustRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.4rem;
`;

const TrustItem = styled.span`
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 600;
`;

const HeroRight = styled(motion.div)`
  ${media.tablet(`display: none;`)}
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  padding: 3.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 2rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  color: #39ff14;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
`;

const StatSub = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.4;
`;

/* PLATFORMS STRIP */
const PlatformStrip = styled.section`
  padding: 3.5rem 0;
  background: #08101e;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const PlatformLabel = styled.p`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 2rem;
`;

const PlatformRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const PlatformBadge = styled.span`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.65);
  font-size: 1.35rem;
  font-weight: 700;
  padding: 0.55rem 1.4rem;
  border-radius: 0.6rem;
`;

/* PAIN */
const PainSection = styled.section`
  padding: 8rem 0;
  background: #060d1a;
`;

const PainHeading = styled.h2`
  font-size: clamp(2.4rem, 3.5vw, 3.4rem);
  font-weight: 900;
  color: rgba(255,255,255,0.9);
  text-align: center;
  margin-bottom: 5rem;
`;

const PainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const PainCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.6rem;
  padding: 3rem;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(57,255,20,0.25); }
`;

const PainProblem = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgba(255,80,80,0.9);
  margin: 0 0 1.6rem;
  line-height: 1.5;
`;

const PainDivider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin-bottom: 1.6rem;
`;

const PainSolution = styled.p`
  font-size: 1.55rem;
  color: rgba(255,255,255,0.8);
  margin: 0;
  line-height: 1.6;
`;

/* DELIVERABLES */
const DeliverablesSection = styled.section`
  padding: 10rem 0;
  background: #08101e;
`;

const CenteredHeader = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const SectionLabel = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #39ff14;
  margin-bottom: 1rem;
`;

const SectionHeading = styled.h2`
  font-size: clamp(2.8rem, 4vw, 4.2rem);
  font-weight: 900;
  color: #fff;
  margin-bottom: 1.6rem;
`;

const SectionSub = styled.p`
  font-size: 1.8rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.6);
  max-width: 68rem;
  margin: 0 auto;
`;

const DeliverablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.8rem;
  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const DeliverableCard = styled(motion.div)`
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 1.6rem;
  padding: 3.2rem 2.8rem;
  transition: border-color 0.2s, transform 0.2s;
  &:hover { border-color: rgba(255,140,43,0.45); transform: translateY(-4px); }
`;

const DIcon = styled.div`font-size: 3rem; margin-bottom: 1.2rem;`;

const DTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: #39ff14;
  margin-bottom: 1rem;
`;

const DDesc = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.8rem;
`;

const DTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const DTag = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255,140,43,0.9);
  background: rgba(255,140,43,0.1);
  border: 1px solid rgba(255,140,43,0.25);
  border-radius: 0.5rem;
  padding: 0.3rem 0.9rem;
`;

/* DIFFERENTIATORS */
const DiffSection = styled.section`
  padding: 10rem 0;
  background: #060d1a;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const DiffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const DiffCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.4rem;
  padding: 3rem 2.8rem;
`;

const DiffIcon = styled.div`font-size: 2.8rem; margin-bottom: 1rem;`;

const DiffTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
`;

const DiffBody = styled.p`
  font-size: 1.5rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.62);
`;

/* HOW IT WORKS */
const HowSection = styled.section`
  padding: 10rem 0;
  background: #08101e;
`;

const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.8rem;
  margin-bottom: 5rem;
  ${media.desktop(`grid-template-columns: repeat(2, 1fr);`)}
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const StepCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.4rem;
  padding: 3rem 2.6rem;
`;

const StepNum = styled.div`
  font-size: 5rem;
  font-weight: 900;
  color: #39ff14;
  opacity: 0.25;
  line-height: 1;
  margin-bottom: 1.2rem;
`;

const StepTitle = styled.h3`
  font-size: 1.85rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.9rem;
`;

const StepDesc = styled.p`
  font-size: 1.45rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.62);
`;

const PilotCallout = styled.div`
  background: linear-gradient(135deg, rgba(57,255,20,0.07) 0%, rgba(255,140,43,0.07) 100%);
  border: 1px solid rgba(57,255,20,0.2);
  border-radius: 1.4rem;
  padding: 3.2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  flex-wrap: wrap;
`;

const PilotCalloutText = styled.p`
  font-size: 1.7rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.5;
  strong { color: #fff; }
`;

const PilotCalloutBtn = styled.a`
  background: #ff8c2b;
  color: #fff;
  font-weight: 800;
  font-size: 1.6rem;
  padding: 1.2rem 2.8rem;
  border-radius: 0.9rem;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

/* FORM */
const CtaSection = styled.section`
  padding: 8rem 0;
  background: #08101e;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const CtaBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(57,255,20,0.07) 0%, rgba(255,140,43,0.07) 100%);
  border: 1px solid rgba(57,255,20,0.2);
  border-radius: 2rem;
  padding: 6rem;
  text-align: center;
  ${media.tablet(`padding: 4rem 2.4rem;`)}
`;

const CtaHeading = styled.h2`
  font-size: clamp(3rem, 4.5vw, 4.8rem);
  font-weight: 900;
  color: #fff;
  margin-bottom: 1.6rem;
`;

const CtaBody = styled.p`
  font-size: 1.8rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.7);
  max-width: 60rem;
  margin: 0 auto 3.6rem;
`;

const CtaActions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CtaPrimary = styled.a`
  background: #ff8c2b;
  color: #fff;
  font-weight: 800;
  font-size: 1.8rem;
  padding: 1.4rem 3.2rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  &:hover { opacity: 0.9; transform: translateY(-2px); }
`;

const CtaSecondaryLink = styled.a`
  background: rgba(255,255,255,0.07);
  color: #fff;
  font-weight: 700;
  font-size: 1.8rem;
  padding: 1.4rem 3.2rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(255,255,255,0.2);
  text-decoration: none;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(255,255,255,0.5); }
`;

/* BOTTOM STRIP */
const BottomStrip = styled.section`
  padding: 3.5rem 0;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const BottomStripInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`;

const BottomStripText = styled.p`
  font-size: 1.5rem;
  color: rgba(255,255,255,0.45);
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2.8rem;
  flex-wrap: wrap;
  a {
    font-size: 1.45rem;
    font-weight: 700;
    color: #ff8c2b;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

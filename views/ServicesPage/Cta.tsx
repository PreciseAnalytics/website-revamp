import NextLink from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

const INDUSTRIES = [
  'Federal Government',
  'Defense & Intel',
  'Healthcare',
  'Financial Services',
  'State & Local Gov',
  'Manufacturing',
];

const TRUST_POINTS = [
  { icon: '✓', text: 'VOSB Certified' },
  { icon: '✓', text: 'DSBSD Certified' },
  { icon: '✓', text: 'Industry Expertise' },
  { icon: '✓', text: 'Proven Outcomes' },
];

export default function Cta() {
  return (
    <CtaSection>
      <GradientOrb $x="15%" $y="20%" $color="rgba(57,255,20,0.12)" />
      <GradientOrb $x="75%" $y="60%" $color="rgba(255,140,43,0.12)" />

      <Container>
        <Inner>
          <AnimatedReveal direction="up" delay={0.1}>
            <Eyebrow>Let&apos;s Build Something</Eyebrow>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.22}>
            <Headline>
              Ready to Turn Data Into <AccentText>Strategic Advantage?</AccentText>
            </Headline>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.35}>
            <Body>
              Precise Analytics helps government agencies and commercial organizations build the data
              foundations, intelligence systems, and AI capabilities that drive measurable outcomes —
              not just reports.
            </Body>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.48}>
            <Actions>
              <NextLink href="/contact" passHref legacyBehavior>
                <PrimaryBtn>Contact Us Today →</PrimaryBtn>
              </NextLink>
              <NextLink href="/schedule-consult" passHref legacyBehavior>
                <SecondaryBtn>Schedule a Consult</SecondaryBtn>
              </NextLink>
            </Actions>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.58}>
            <TrustRow>
              {TRUST_POINTS.map((t) => (
                <TrustChip key={t.text}>
                  <TrustMark>{t.icon}</TrustMark>
                  {t.text}
                </TrustChip>
              ))}
            </TrustRow>
          </AnimatedReveal>

          <Divider />

          <AnimatedReveal direction="up" delay={0.65}>
            <IndustryLabel>Industries We Serve</IndustryLabel>
            <IndustryRow>
              {INDUSTRIES.map((ind, i) => (
                <IndustryTag
                  key={ind}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  {ind}
                </IndustryTag>
              ))}
            </IndustryRow>
          </AnimatedReveal>
        </Inner>
      </Container>
    </CtaSection>
  );
}

const CtaSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 12rem 0;
  background: linear-gradient(
    135deg,
    rgba(var(--background), 1) 0%,
    rgba(15, 25, 50, 0.98) 100%
  );
  border-top: 1px solid rgba(var(--text), 0.07);
`;

const GradientOrb = styled.div<{ $x: string; $y: string; $color: string }>`
  position: absolute;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  background: radial-gradient(circle, ${(p) => p.$color} 0%, transparent 70%);
  left: ${(p) => p.$x};
  top: ${(p) => p.$y};
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const Inner = styled.div`
  text-align: center;
  max-width: 80rem;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #ff8c2b;
  margin-bottom: 1.8rem;
`;

const Headline = styled.h2`
  font-size: 4.8rem;
  font-weight: 800;
  line-height: 1.12;
  color: rgb(var(--text));
  margin-bottom: 2.4rem;
  letter-spacing: -0.02em;

  ${media.tablet(`font-size: 3.4rem;`)}
  ${media.phone(`font-size: 2.8rem;`)}
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const Body = styled.p`
  font-size: 1.85rem;
  line-height: 1.75;
  color: rgba(var(--text), 0.72);
  margin-bottom: 4rem;
  max-width: 66rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet(`font-size: 1.7rem;`)}
`;

const Actions = styled.div`
  display: flex;
  gap: 1.4rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3.6rem;
`;

const PrimaryBtn = styled.a`
  display: inline-block;
  background: #ff8c2b;
  color: #fff;
  font-size: 1.65rem;
  font-weight: 700;
  padding: 1.5rem 3.4rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: #e67a1e;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255, 140, 43, 0.4);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-block;
  background: rgba(57, 255, 20, 0.12);
  color: #39ff14;
  font-size: 1.65rem;
  font-weight: 700;
  padding: 1.5rem 3.4rem;
  border-radius: 0.9rem;
  text-decoration: none;
  border: 1.5px solid rgba(57, 255, 20, 0.35);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(57, 255, 20, 0.2);
    border-color: rgba(57, 255, 20, 0.6);
    transform: translateY(-2px);
  }
`;

const TrustRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const TrustChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(var(--cardBackground), 0.5);
  border: 1px solid rgba(var(--text), 0.1);
  padding: 0.8rem 1.8rem;
  border-radius: 10rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--text), 0.85);
`;

const TrustMark = styled.span`
  color: rgb(var(--accent));
  font-weight: 800;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(var(--text), 0.08);
  margin: 4.5rem 0;
`;

const IndustryLabel = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(var(--text), 0.45);
  margin-bottom: 2rem;
`;

const IndustryRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const IndustryTag = styled(motion.span)`
  font-size: 1.35rem;
  font-weight: 600;
  color: rgba(var(--text), 0.65);
  background: rgba(var(--cardBackground), 0.4);
  border: 1px solid rgba(var(--text), 0.08);
  padding: 0.6rem 1.4rem;
  border-radius: 0.6rem;
`;

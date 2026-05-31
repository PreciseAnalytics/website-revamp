import styled from 'styled-components';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import Container from 'components/Container';
import AnimatedBackground from 'components/AnimatedBackground';
import { media } from 'utils/media';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Federal Clients' },
  { value: '12',  label: 'Service Areas' },
  { value: '98%', label: 'Client Satisfaction' },
];

const CATEGORIES = [
  { label: 'Data Foundation',       count: 4, color: '#39ff14' },
  { label: 'Business Intelligence', count: 4, color: '#ff8c2b' },
  { label: 'AI & Automation',       count: 4, color: '#39ff14' },
];

export default function Hero() {
  return (
    <HeroSection>
      <BgLayer>
        <AnimatedBackground variant="particles" />
      </BgLayer>

      <Container>
        <Layout>
          {/* Left — text */}
          <TextCol>
            <Overline>Our Services</Overline>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              <HeadingWhite>Data &amp; AI Services</HeadingWhite>
              <HeadingGreen>Built to Perform.</HeadingGreen>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CatRow>
                {CATEGORIES.map((c) => (
                  <CatChip key={c.label} $color={c.color}>
                    <CatDot $color={c.color} />
                    {c.count} {c.label}
                  </CatChip>
                ))}
              </CatRow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              <Buttons>
                <NextLink href="#services-grid" passHref legacyBehavior>
                  <GreenBtn>Browse All 12 Services ↓</GreenBtn>
                </NextLink>
                <NextLink href="/schedule-consult" passHref legacyBehavior>
                  <OutlineBtn>Schedule a Consult →</OutlineBtn>
                </NextLink>
              </Buttons>
            </motion.div>
          </TextCol>

          {/* Right — stats */}
          <StatsCol>
            {STATS.map((s, i) => (
              <StatBlock
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <StatVal>{s.value}</StatVal>
                <StatLbl>{s.label}</StatLbl>
              </StatBlock>
            ))}
          </StatsCol>
        </Layout>
      </Container>
    </HeroSection>
  );
}

/* ─── Styles ─── */

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 14rem 0 6rem;
  border-bottom: 1px solid rgba(var(--text), 0.08);

  ${media.tablet(`padding: 12rem 0 5rem;`)}
`;

const BgLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.22;
`;

const Layout = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 28rem;
  gap: 6rem;
  align-items: center;

  ${media.desktop(`grid-template-columns: 1fr 24rem; gap: 4rem;`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 3.5rem;`)}
`;

const TextCol = styled.div`
  h1 { margin: 0 0 2rem; }
`;

const Overline = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #ff8c2b;
  margin-bottom: 1.4rem;
`;

const HeadingWhite = styled.span`
  display: block;
  font-size: 5.4rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: rgb(var(--text));

  ${media.tablet(`font-size: 4rem;`)}
  ${media.phone(`font-size: 3.2rem;`)}
`;

const HeadingGreen = styled.span`
  display: block;
  font-size: 5.4rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #39ff14;

  ${media.tablet(`font-size: 4rem;`)}
  ${media.phone(`font-size: 3.2rem;`)}
`;

const CatRow = styled.div`
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-bottom: 2.8rem;
`;

const CatChip = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(var(--text), 0.75);
  background: rgba(var(--cardBackground), 0.55);
  border: 1px solid rgba(var(--text), 0.1);
  padding: 0.5rem 1.2rem;
  border-radius: 10rem;
`;

const CatDot = styled.span<{ $color: string }>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const GreenBtn = styled.a`
  display: inline-block;
  background: #39ff14;
  color: #000;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.8rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`;

const OutlineBtn = styled.a`
  display: inline-block;
  background: transparent;
  color: rgb(var(--text));
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.2rem 2.8rem;
  border-radius: 0.8rem;
  text-decoration: none;
  border: 1.5px solid rgba(var(--text), 0.18);
  transition: all 0.2s;

  &:hover {
    border-color: #ff8c2b;
    color: #ff8c2b;
  }
`;

/* Stats */
const StatsCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;

  ${media.tablet(`grid-template-columns: repeat(4, 1fr);`)}
  ${media.phone(`grid-template-columns: repeat(2, 1fr);`)}
`;

const StatBlock = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.55);
  border: 1px solid rgba(var(--text), 0.09);
  border-radius: 1.2rem;
  padding: 2.2rem 1.8rem;
  text-align: center;
`;

const StatVal = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #39ff14;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const StatLbl = styled.div`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.55);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

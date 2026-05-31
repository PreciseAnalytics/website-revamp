import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from 'components/Container';
import { media } from 'utils/media';
import AnimatedBackground from 'components/AnimatedBackground';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Federal Clients' },
  { value: '12',  label: 'Service Areas' },
  { value: '98%', label: 'Client Satisfaction' },
];

const TRUST = [
  'GSA Schedule Holder',
  'Clearance-Ready Staff',
  'NIST · HIPAA · FedRAMP',
  'Production Deployments Only',
];

export default function AboutUsHero() {
  return (
    <HeroWrapper>
      <BgLayer>
        <AnimatedBackground variant="particles" />
      </BgLayer>

      <Container>
        <Layout>
          {/* Left — text */}
          <TextCol>
            <Overline>About Precise Analytics</Overline>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              <HeadingWhite>Transforming Data into</HeadingWhite>
              <HeadingAccent>Strategic Insight.</HeadingAccent>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Description>
                A full-service data engineering and AI firm serving federal agencies, healthcare organizations,
                financial institutions, and commercial enterprises. We hold an active GSA Schedule and
                clearance-ready staff — and we deploy to production, not just decks.
              </Description>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <TrustRow>
                {TRUST.map((t) => (
                  <TrustChip key={t}>{t}</TrustChip>
                ))}
              </TrustRow>

              <Buttons>
                <PrimaryBtn href="/schedule-consult">Schedule a Consultation →</PrimaryBtn>
                <OutlineBtn href="/work">See Our Work</OutlineBtn>
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
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
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

const HeadingAccent = styled.span`
  display: block;
  font-size: 5.4rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: rgb(var(--accent));

  ${media.tablet(`font-size: 4rem;`)}
  ${media.phone(`font-size: 3.2rem;`)}
`;

const Description = styled.span`
  display: block;
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.75);
  margin-bottom: 2.4rem;
`;

const TrustRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2.4rem;
`;

const TrustChip = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(var(--text), 0.72);
  background: rgba(var(--cardBackground), 0.55);
  border: 1px solid rgba(var(--text), 0.1);
  padding: 0.45rem 1.1rem;
  border-radius: 10rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.8rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 125, 0, 0.35);
  }
`;

const OutlineBtn = styled(Link)`
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
  color: rgb(var(--accent));
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

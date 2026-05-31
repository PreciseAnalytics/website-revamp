import NextLink from 'next/link';
import styled from 'styled-components';
import { media } from 'utils/media';

const TRUST_POINTS = [
  'GSA Schedule Holder',
  'Security Clearance Ready',
  'Weeks to Production',
  'Proven Outcomes',
];

export default function Cta() {
  return (
    <CtaSection>
      <Inner>
        <LeftCol>
          <Eyebrow>Let&apos;s Build Something</Eyebrow>
          <Headline>
            Ready to Turn Data Into <AccentText>Strategic Advantage?</AccentText>
          </Headline>
          <TrustRow>
            {TRUST_POINTS.map((t) => (
              <TrustChip key={t}>✓ {t}</TrustChip>
            ))}
          </TrustRow>
        </LeftCol>

        <RightCol>
          <Body>
            We deploy production pipelines, not decks. Federal clients, financial institutions,
            and AI platforms — measurable outcomes, weeks not months.
          </Body>
          <Actions>
            <NextLink href="/contact" passHref legacyBehavior>
              <PrimaryBtn>Contact Us Today →</PrimaryBtn>
            </NextLink>
            <NextLink href="/schedule-consult" passHref legacyBehavior>
              <SecondaryBtn>Schedule a Consult</SecondaryBtn>
            </NextLink>
          </Actions>
        </RightCol>
      </Inner>
    </CtaSection>
  );
}

const CtaSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(var(--background), 1) 0%, rgba(15, 25, 50, 0.98) 100%);
  border-top: 1px solid rgba(var(--text), 0.07);
`;

const Inner = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  ${media.desktop(`gap: 3.5rem;`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 2.4rem; padding: 0 2rem;`)}
`;

const LeftCol = styled.div``;

const RightCol = styled.div``;

const Eyebrow = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #ff8c2b;
  margin-bottom: 1rem;
`;

const Headline = styled.h2`
  font-size: 3.6rem;
  font-weight: 800;
  line-height: 1.15;
  color: rgb(var(--text));
  margin-bottom: 1.8rem;
  letter-spacing: -0.02em;

  ${media.tablet(`font-size: 2.8rem;`)}
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const TrustRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const TrustChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(var(--cardBackground), 0.5);
  border: 1px solid rgba(var(--text), 0.1);
  padding: 0.55rem 1.2rem;
  border-radius: 10rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(var(--text), 0.85);
`;

const Body = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.72);
  margin-bottom: 2.4rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.a`
  display: inline-block;
  background: #ff8c2b;
  color: #fff;
  font-size: 1.55rem;
  font-weight: 700;
  padding: 1.3rem 2.8rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: #e67a1e;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 140, 43, 0.4);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-block;
  background: rgba(57, 255, 20, 0.12);
  color: #39ff14;
  font-size: 1.55rem;
  font-weight: 700;
  padding: 1.3rem 2.8rem;
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

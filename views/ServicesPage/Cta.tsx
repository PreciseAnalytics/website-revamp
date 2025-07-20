import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import AnimatedReveal from 'components/AnimatedReveal';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function Cta() {
  return (
    <CtaWrapper>
      <DarkOverlay />
      <Container>
        <ContentStack>
          <AnimatedReveal>
            <StyledSectionTitle>Ready to Get Started?</StyledSectionTitle>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.2}>
            <Description>
              At Precise Analytics, we are committed to helping you turn your data into a strategic asset. 
              Contact us today to explore how our data analytics consultancy services can propel your business to new heights.
            </Description>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.4}>
            <ButtonGroup>
              <NextLink href="/contact" passHref>
                <PrimaryButton>
                  Contact Us Today <Arrow>&rarr;</Arrow>
                </PrimaryButton>
              </NextLink>
              <NextLink href="/schedule-consult" passHref>
                <SecondaryButton>
                  Schedule a Consult <Arrow>&rarr;</Arrow>
                </SecondaryButton>
              </NextLink>
            </ButtonGroup>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.6}>
            <TrustBadges>
              {['Industry Expertise', 'Tailored Solutions', 'Proven Results'].map((badge) => (
                <TrustBadge
                  key={badge}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Checkmark viewBox="0 0 24 24">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </Checkmark>
                  <BadgeText>{badge}</BadgeText>
                </TrustBadge>
              ))}
            </TrustBadges>
          </AnimatedReveal>
        </ContentStack>
      </Container>
    </CtaWrapper>
  );
}

// Styled Components
const CtaWrapper = styled.section`
  position: relative;
  background: 
    linear-gradient(135deg, rgba(8, 20, 40, 0.95) 0%, rgba(15, 35, 75, 0.95) 100%),
    url('/images/subtle-grid.png');
  background-size: cover;
  overflow: hidden;
  padding: 10rem 0;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
`;

const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  color: white;

  & > *:not(:first-child) {
    margin-top: 3rem;
  }

  ${media.tablet(`
    & > *:not(:first-child) {
      margin-top: 2rem;
    }
  `)}
`;

const StyledSectionTitle = styled(SectionTitle)`
  color: white;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  max-width: 70rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const PrimaryButton = styled(Button)`
  background: rgb(255, 125, 0);
  color: white;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(230, 110, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Arrow = styled.span`
  margin-left: 0.8rem;
  transition: transform 0.2s ease;
  
  ${PrimaryButton}:hover &, ${SecondaryButton}:hover & {
    transform: translateX(3px);
  }
`;

const TrustBadges = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  justify-content: center;

  ${media.tablet(`
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 3rem;
  `)}
`;

const TrustBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 1rem 2rem;
  border-radius: 3rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${media.tablet(`
    padding: 0.8rem 1.8rem;
    font-size: 1.3rem;
  `)}
`;

const Checkmark = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  color: white;
  margin-right: 0.8rem;
`;

const BadgeText = styled.span`
  color: white;
  font-weight: 600;
`;
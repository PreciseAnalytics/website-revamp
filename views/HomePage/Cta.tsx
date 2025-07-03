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
      <GradientBackground />
      <Container>
        <Stack>
          <AnimatedReveal>
            <SectionTitle>Ready to Transform Your Data into Strategic Insights?</SectionTitle>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.2}>
            <Description>
              Partner with Precise Analytics to gain actionable insights from your most valuable asset - your data.
              Our team of experts is ready to help you implement cutting-edge solutions tailored to your needs.
            </Description>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.4}>
            <ButtonGroup>
              <NextLink href="/contact" passHref>
                <Button orange>
                  Contact Us Today <span>&rarr;</span>
                </Button>
              </NextLink>
              <NextLink href="/services" passHref>
                <OutlinedButton transparent>
                  Explore Services <span>&rarr;</span>
                </OutlinedButton>
              </NextLink>
            </ButtonGroup>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.6}>
            <TrustSignals>
              <TrustBadge
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckmarkIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </CheckmarkIcon>
                <span>Certified Experts</span>
              </TrustBadge>
              
              <TrustBadge
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckmarkIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </CheckmarkIcon>
                <span>Secure Solutions</span>
              </TrustBadge>
              
              <TrustBadge
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckmarkIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </CheckmarkIcon>
                <span>Flexible Plans</span>
              </TrustBadge>
            </TrustSignals>
          </AnimatedReveal>
        </Stack>
      </Container>
    </CtaWrapper>
  );
}

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.8);
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12.5rem 0;
  color: rgb(var(--textSecondary));
  text-align: center;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    max-width: 80%;
    margin-top: 4rem;
  }

  ${media.tablet`
    text-align: center;

    & > *:not(:first-child) {
      max-width: 100%;
      margin-top: 2rem;
    }
  `}
`;

const OutlinedButton = styled(Button)`
  border: 1px solid rgba(var(--textSecondary), 0.8);
  color: rgb(var(--textSecondary));
  
  &:hover {
    border-color: rgb(var(--textSecondary));
  }
`;

const CtaWrapper = styled.div`
  background: rgb(var(--accent));
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
  z-index: 0;
`;

const TrustSignals = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 4rem;
  
  ${media.tablet`
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 3rem;
  `}
`;

const TrustBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-radius: 3rem;
  color: rgb(var(--textSecondary));
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  
  span {
    margin-left: 0.8rem;
  }
  
  ${media.tablet`
    font-size: 1.3rem;
    padding: 0.8rem 1.8rem;
  `}
`;

const CheckmarkIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  color: rgb(var(--textSecondary));
`;
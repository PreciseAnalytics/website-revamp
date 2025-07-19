import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

export default function WhyChooseUs() {
  return (
    <WhyChooseUsWrapper>
      <Container>
        <AnimatedReveal>
          <SectionTitle>Why Choose Precise Analytics?</SectionTitle>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.2}>
          <Subtitle>
            Mission-Driven. Data-Focused. Results-Oriented.
          </Subtitle>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.3}>
          <Description>
            At Precise Analytics, we combine deep technical expertise with a commitment to delivering
            measurable outcomes. As a Veteran-Owned Small Business (VOSB), we bring discipline,
            precision, and a sense of mission to every project.
          </Description>
        </AnimatedReveal>
        
        <SubTitle>What Sets Us Apart:</SubTitle>
        
        <FeatureGrid>
          <AnimatedReveal direction="up" delay={0.4}>
            <FeatureItem>
              <FeatureIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </FeatureIcon>
              <div>
                <FeatureTitle>Expertise You Can Trust</FeatureTitle>
                <FeatureDescription>
                  Proven experience in data analytics, dashboard development, automation, and decision
                  support systems.
                </FeatureDescription>
              </div>
            </FeatureItem>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.5}>
            <FeatureItem>
              <FeatureIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </FeatureIcon>
              <div>
                <FeatureTitle>Tailored Solutions</FeatureTitle>
                <FeatureDescription>
                  We don't do one-size-fits-all. Every engagement is built around your unique data
                  challenges and business goals.
                </FeatureDescription>
              </div>
            </FeatureItem>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.6}>
            <FeatureItem>
              <FeatureIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </FeatureIcon>
              <div>
                <FeatureTitle>Federal & Commercial Ready</FeatureTitle>
                <FeatureDescription>
                  From federal contracts to private sector growth, our team understands compliance,
                  security, and results.
                </FeatureDescription>
              </div>
            </FeatureItem>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.7}>
            <FeatureItem>
              <FeatureIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </FeatureIcon>
              <div>
                <FeatureTitle>End-to-End Support</FeatureTitle>
                <FeatureDescription>
                  From strategy to implementation—we guide you through every phase of your data journey.
                </FeatureDescription>
              </div>
            </FeatureItem>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.8}>
            <FeatureItem>
              <FeatureIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </FeatureIcon>
              <div>
                <FeatureTitle>Veteran-Owned Values</FeatureTitle>
                <FeatureDescription>
                  Integrity, accountability, and mission-focus are at the heart of everything we do.
                </FeatureDescription>
              </div>
            </FeatureItem>
          </AnimatedReveal>
        </FeatureGrid>
        
        <AnimatedReveal direction="up" delay={0.9}>
          <ClosingStatement>
            Your data has a story. We help you tell it—with clarity, insight, and impact.
          </ClosingStatement>
        </AnimatedReveal>
      </Container>
    </WhyChooseUsWrapper>
  );
}

const WhyChooseUsWrapper = styled.section`
  padding: 15rem 0;
  background: linear-gradient(
    180deg,
    rgba(var(--background), 1) 0%,
    rgba(var(--background), 0.8) 100%
  );
  position: relative;
  z-index: 1;
  
  ${media.tablet`
    padding: 10rem 0;
  `}
`;

const Subtitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  text-align: center;
  margin: 3rem 0 2rem;
  
  ${media.desktop`
    font-size: 2.6rem;
  `}
  
  ${media.tablet`
    font-size: 2.4rem;
  `}
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 5rem;
  
  ${media.tablet`
    font-size: 1.8rem;
    max-width: 100%;
  `}
`;

const SubTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  text-align: center;
  margin-bottom: 4rem;
  
  ${media.tablet`
    font-size: 2.2rem;
  `}
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  max-width: 120rem;
  margin: 0 auto;
  
  ${media.desktop`
    gap: 4rem;
  `}
  
  ${media.tablet`
    grid-template-columns: 1fr;
    max-width: 55rem;
    gap: 3rem;
  `}
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const FeatureIcon = styled.svg`
  width: 5rem;
  height: 5rem;
  color: rgb(255, 125, 0);
  flex-shrink: 0;
  
  ${media.tablet`
    width: 4.5rem;
    height: 4.5rem;
  `}
`;

const FeatureTitle = styled.h5`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
  
  ${media.tablet`
    font-size: 2rem;
  `}
`;

const FeatureDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
`;

const ClosingStatement = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
  font-style: italic;
  color: rgb(var(--text));
  text-align: center;
  margin-top: 6rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  
  ${media.tablet`
    font-size: 2rem;
    margin-top: 4rem;
  `}
`;
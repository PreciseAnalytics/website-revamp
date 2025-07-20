import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

export default function Hero() {
  return (
    <HeroWrapper>
      <Container>
        <ContentWrapper>
          <AnimatedReveal direction="up" delay={0.2}>
            <TagLine>Our Services</TagLine>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.4}>
            <Heading>Comprehensive Data Analytics Services</Heading>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.6}>
            <Description>
              Transform your data into actionable insights with our comprehensive suite of data analytics services. 
              From strategic consulting to advanced predictive analytics, we empower businesses to make informed 
              decisions and achieve strategic growth through the power of data.
            </Description>
          </AnimatedReveal>
        </ContentWrapper>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
  padding: 15rem 0 8rem;
  background: linear-gradient(
    135deg,
    rgba(var(--background), 1) 0%,
    rgba(var(--background), 0.9) 100%
  );
  position: relative;
  text-align: center;
  
  ${media.tablet(`
    padding: 12rem 0 6rem;
  `)}
`;

const ContentWrapper = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`;

const TagLine = styled.h2`
  font-size: 1.8rem;
  color: rgb(var(--accent));
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  
  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const Heading = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  color: rgb(var(--text));
  margin-bottom: 3rem;
  
  ${media.desktop(`
    font-size: 5rem;
  `)}
  
  ${media.tablet(`
    font-size: 3.8rem;
  `)}
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  max-width: 80rem;
  margin: 0 auto;
  
  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;
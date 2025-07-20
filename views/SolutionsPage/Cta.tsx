import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import NextLink from 'next/link';
import Button from 'components/Button';
import { media } from 'utils/media';

export default function SolutionsCta() {
  return (
    <CtaWrapper>
      <Container>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Title>Ready to transform your data strategy?</Title>
            <Description>
              Schedule a consultation with our experts to discover how Precise Analytics can help you turn
              your data into a competitive advantage.
            </Description>
            
            <ButtonsGroup>
              <NextLink href="/contact" passHref>
                <CtaButton accent>Schedule a Consultation</CtaButton>
              </NextLink>
              <NextLink href="/resources/capabilities-statement" passHref>
                <CtaButton transparent>Download Capabilities Statement</CtaButton>
              </NextLink>
            </ButtonsGroup>
          </motion.div>
          
          <BackgroundElements>
            <GradientCircle position="top-left" color="var(--primary)" />
            <GradientCircle position="bottom-right" color="var(--accent)" />
          </BackgroundElements>
        </ContentWrapper>
      </Container>
    </CtaWrapper>
  );
}

const CtaWrapper = styled.div`
  padding: 10rem 0;
  background: linear-gradient(180deg, rgba(var(--background), 1) 0%, rgba(var(--background), 0.8) 100%);
`;

const ContentWrapper = styled.div`
  position: relative;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 2rem;
  padding: 6rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--accent), 0.2);
  box-shadow: 0 30px 60px -15px rgba(var(--accent), 0.15);
  overflow: hidden;
  
  ${media.tablet(`
    padding: 4rem 2rem;
  `)}
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: rgb(var(--text));
  position: relative;
  z-index: 1;
  
  ${media.tablet(`
    font-size: 3rem;
  `)}
`;

const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  margin: 0 auto 4rem;
  max-width: 70rem;
  color: rgb(var(--text));
  opacity: 0.8;
  position: relative;
  z-index: 1;
  
  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  ${media.phone(`
    flex-direction: column;
    align-items: center;
  `)}
`;

const CtaButton = styled(Button)`
  min-width: 20rem;
  
  ${media.phone(`
    width: 100%;
  `)}
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
`;

const GradientCircle = styled.div<{
  position: 'top-left' | 'bottom-right';
  color: string;
}>`
  position: absolute;
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${(p) => `rgba(${p.color}, 0.15)`} 0%,
    transparent 70%
  );
  
  ${(p) =>
    p.position === 'top-left'
      ? `
    top: -20rem;
    left: -20rem;
  `
      : `
    bottom: -20rem;
    right: -20rem;
  `}
`;
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Button from 'components/Button';
import NextLink from 'next/link';
import { media } from 'utils/media';

import AnimatedBackground from 'components/AnimatedBackground';

export default function SolutionsHero() {
  return (
    <HeroWrapper>
      <AnimatedBackground variant="flow" />
      <Container>
        <ContentWrapper>
          <LeftSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StyledOverTitle>Data-Driven Solutions</StyledOverTitle>
              <Title>
                Transforming <AccentText>Data</AccentText> Into <br />
                Strategic <AccentText>Insights</AccentText>
              </Title>
              <Description>
                Our analytics solutions combine cutting-edge technology with industry expertise to 
                help businesses extract maximum value from their data at every step of the journey.
              </Description>
              <ButtonGroup>
                <NextLink href="/contact" passHref>
                  <Button accent>Request a Demo</Button>
                </NextLink>
                <NextLink href="/resources" passHref>
                  <Button transparent>Explore Resources</Button>
                </NextLink>
              </ButtonGroup>
            </motion.div>
          </LeftSection>

          <RightSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <HeroImageContainer>
                <DataJourneyWrapper>
                  <JourneyStep className="collect">
                    <StepIcon>📊</StepIcon>
                    <StepTitle>Collect</StepTitle>
                  </JourneyStep>
                  <JourneyArrow>➡️</JourneyArrow>
                  <JourneyStep className="process">
                    <StepIcon>⚙️</StepIcon>
                    <StepTitle>Process</StepTitle>
                  </JourneyStep>
                  <JourneyArrow>➡️</JourneyArrow>
                  <JourneyStep className="analyze">
                    <StepIcon>🔍</StepIcon>
                    <StepTitle>Analyze</StepTitle>
                  </JourneyStep>
                  <JourneyArrow>➡️</JourneyArrow>
                  <JourneyStep className="visualize">
                    <StepIcon>📈</StepIcon>
                    <StepTitle>Visualize</StepTitle>
                  </JourneyStep>
                  <JourneyArrow>➡️</JourneyArrow>
                  <JourneyStep className="act">
                    <StepIcon>🚀</StepIcon>
                    <StepTitle>Act</StepTitle>
                  </JourneyStep>
                </DataJourneyWrapper>
                <GlowEffect />
              </HeroImageContainer>
            </motion.div>
          </RightSection>
        </ContentWrapper>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  min-height: 60rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12rem 0 8rem;

  ${media.desktop`
    padding-top: 8rem;
  `}

  ${media.tablet`
    min-height: auto;
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  ${media.desktop`
    flex-direction: column;
  `}
`;

const LeftSection = styled.div`
  flex: 0 0 50%;

  ${media.desktop`
    flex: 0 0 100%;
    text-align: center;
    margin-bottom: 6rem;
  `}
`;

const RightSection = styled.div`
  flex: 0 0 50%;
  display: flex;
  justify-content: center;

  ${media.desktop`
    flex: 0 0 100%;
  `}
`;

const StyledOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;

  ${media.desktop`
    margin-left: auto;
    margin-right: auto;
  `}
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2.5rem;
  color: rgb(var(--text));

  ${media.desktop`
    font-size: 4.6rem;
  `}

  ${media.tablet`
    font-size: 4rem;
  `}

  ${media.phone`
    font-size: 3.4rem;
  `}
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 3.5rem;
  max-width: 50rem;

  ${media.desktop`
    max-width: 60rem;
    margin-left: auto;
    margin-right: auto;
  `}

  ${media.tablet`
    font-size: 1.8rem;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;

  ${media.desktop`
    justify-content: center;
  `}

  ${media.phone`
    flex-direction: column;
  `}
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 50rem;
  padding: 3rem;
  border-radius: 2rem;
  background: rgba(var(--cardBackground), 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--accent), 0.2);
  overflow: hidden;

  ${media.tablet`
    padding: 2rem;
    max-width: 45rem;
  `}

  ${media.phone`
    padding: 1.5rem;
  `}
`;

const DataJourneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;

  ${media.tablet`
    gap: 1.5rem;
  `}
`;

const JourneyStep = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(var(--secondBackground), 0.8);
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &.collect {
    border-left: 3px solid rgb(0, 120, 255);
  }

  &.process {
    border-left: 3px solid rgb(0, 200, 83);
    margin-left: 2rem;
  }

  &.analyze {
    border-left: 3px solid rgb(255, 153, 0);
    margin-left: 4rem;
  }

  &.visualize {
    border-left: 3px solid rgb(247, 37, 133);
    margin-left: 6rem;
  }

  &.act {
    border-left: 3px solid rgb(114, 9, 183);
    margin-left: 8rem;
  }

  ${media.tablet`
    padding: 1.2rem 1.5rem;

    &.process { margin-left: 1.5rem; }
    &.analyze { margin-left: 3rem; }
    &.visualize { margin-left: 4.5rem; }
    &.act { margin-left: 6rem; }
  `}

  ${media.phone`
    &.process { margin-left: 1rem; }
    &.analyze { margin-left: 2rem; }
    &.visualize { margin-left: 3rem; }
    &.act { margin-left: 4rem; }
  `}
`;

const StepIcon = styled.div`
  font-size: 2.4rem;
  margin-right: 1.5rem;

  ${media.phone`
    font-size: 2rem;
    margin-right: 1rem;
  `}
`;

const StepTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));

  ${media.phone`
    font-size: 1.6rem;
  `}
`;

const JourneyArrow = styled.div`
  font-size: 2rem;
  margin-left: 4rem;
  opacity: 0.5;

  ${media.tablet`
    margin-left: 3rem;
  `}

  ${media.phone`
    margin-left: 2rem;
  `}
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 30rem;
  background: radial-gradient(
    circle,
    rgba(var(--accent), 0.15) 0%,
    transparent 70%
  );
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
`;

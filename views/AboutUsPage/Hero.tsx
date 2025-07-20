import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';
import AnimatedBackground from 'components/AnimatedBackground';

export default function AboutUsHero() {
  return (
    <HeroWrapper>
      <AnimatedBackground variant="particles" />
      
      <Container>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StyledOverTitle>About Precise Analytics</StyledOverTitle>
            <Title>
              Transforming Data into <AccentText>Strategic</AccentText> Insight
            </Title>
            <Description>
              Founded on the belief that data holds the key to business transformation, 
              Precise Analytics combines cutting-edge technology with domain expertise to 
              help organizations unlock the full potential of their data.
            </Description>
          </motion.div>
        </Content>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  padding: 12rem 0 6rem;
  overflow: hidden;
  
  ${media.tablet(`
    padding: 10rem 0 6rem;
  `)}
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const StyledOverTitle = styled(OverTitle)`
  font-size: 2.4rem !important;
  color: #ff8c00 !important;
  font-weight: 600;
  
  ${media.desktop(`
    font-size: 2.2rem !important;
  `)}
  
  ${media.tablet(`
    font-size: 2rem !important;
  `)}
  
  @media (max-width: 480px) {
    font-size: 1.8rem !important;
  }
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 1rem 0 2.5rem;
  color: rgb(var(--text));
  
  ${media.desktop(`
    font-size: 4.6rem;
  `)}
  
  ${media.tablet(`
    font-size: 4rem;
  `)}
  
  @media (max-width: 480px) {
    font-size: 3.4rem;
  }
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  margin: 0 auto 4rem;
  max-width: 80rem;
  
  ${media.tablet(`
    font-size: 1.8rem;
    max-width: 60rem;
  `)}
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6rem;
  margin-top: 6rem;
  
  ${media.desktop(`
    gap: 4rem;
  `)}
  
  ${media.tablet(`
    flex-wrap: wrap;
    gap: 3rem;
  `)}
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 4.5rem;
  font-weight: 700;
  color: rgb(var(--accent));
  line-height: 1;
  
  ${media.desktop(`
    font-size: 4rem;
  `)}
  
  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const StatLabel = styled.div`
  font-size: 1.8rem;
  color: rgb(var(--text));
  margin-top: 1rem;
  
  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;
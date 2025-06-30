import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';

export default function ContactHero() {
  return (
    <HeroWrapper>
      <BackgroundGlow />
      <Container>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OverTitle>Get In Touch</OverTitle>
            <Title>
              Let's Start a <AccentText>Conversation</AccentText>
            </Title>
            <Description>
              Whether you have a question about our solutions, need a demo, or want to explore 
              how we can transform your data strategy, our team is ready to help.
            </Description>
          </motion.div>
        </Content>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  padding: 15rem 0 5rem;
  overflow: hidden;
  
  ${media('<=tablet')} {
    padding: 12rem 0 5rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 80rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 1rem 0 2.5rem;
  color: rgb(var(--text));
  
  ${media('<=desktop')} {
    font-size: 4.6rem;
  }
  
  ${media('<=tablet')} {
    font-size: 4rem;
  }
  
  ${media('<=phone')} {
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
  margin: 0 auto;
  max-width: 70rem;
  
  ${media('<=tablet')} {
    font-size: 1.8rem;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -20rem;
  right: -15rem;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--accent), 0.15) 0%,
    transparent 70%
  );
  z-index: 0;
`;

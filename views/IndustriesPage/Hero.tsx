import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';
import AnimatedBackground from 'components/AnimatedBackground';

export default function IndustriesHero() {
  return (
    <HeroWrapper>
      <AnimatedBackground 
        variant="particles"
      />
      <ContentWrapper>
        <Container>
          <Content>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <OverTitle>Industries We Serve</OverTitle>
              <Title>
                Transforming <AccentText>Industries</AccentText> Through <br/>
                Data-Driven Innovation
              </Title>
              <Description>
                Every industry has unique data challenges. We combine deep industry knowledge with cutting-edge 
                technology to deliver tailored analytics solutions that drive measurable business outcomes.
              </Description>
            </motion.div>
            
            <HighlightCardsWrapper>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <HighlightCard>
                  <HighlightIcon>🏢</HighlightIcon>
                  <HighlightText>
                    <span>30+</span> Enterprise Clients
                  </HighlightText>
                </HighlightCard>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <HighlightCard>
                  <HighlightIcon>🌐</HighlightIcon>
                  <HighlightText>
                    <span>5+</span> Industries Served
                  </HighlightText>
                </HighlightCard>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <HighlightCard>
                  <HighlightIcon>📊</HighlightIcon>
                  <HighlightText>
                    <span>99.9%</span> Data Accuracy
                  </HighlightText>
                </HighlightCard>
              </motion.div>
            </HighlightCardsWrapper>
          </Content>
        </Container>
      </ContentWrapper>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  min-height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 0;
  overflow: hidden;
  
  ${media('<=tablet')} {
    min-height: 50rem;
    padding: 8rem 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  text-align: center;
  max-width: 90rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, rgb(var(--text)) 0%, rgba(var(--primary), 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  ${media('<=tablet')} {
    font-size: 4rem;
  }
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
  -webkit-text-fill-color: rgb(var(--accent));
`;

const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  margin: 0 auto 4rem;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 70rem;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
  }
`;

const HighlightCardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  
  ${media('<=tablet')} {
    gap: 2rem;
  }
  
  ${media('<=phone')} {
    flex-direction: column;
    align-items: center;
  }
`;

const HighlightCard = styled.div`
  background: rgba(var(--cardBackground), 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  width: 18rem;
  border: 1px solid rgba(var(--accent), 0.2);
  box-shadow: 0 10px 30px -15px rgba(var(--accent), 0.25);
  
  ${media('<=phone')} {
    width: 24rem;
  }
`;

const HighlightIcon = styled.div`
  font-size: 3.2rem;
  margin-bottom: 1rem;
`;

const HighlightText = styled.div`
  font-size: 1.6rem;
  
  span {
    display: block;
    font-size: 2.4rem;
    font-weight: 700;
    color: rgb(var(--accent));
    margin-bottom: 0.5rem;
  }
`;
